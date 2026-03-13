import pgPromise from 'pg-promise'
import { getWKTParser } from "@septima/septima-search/util/getWKTParser.js"

export default class Fetcher {
  constructor(options) {
    let initOptions = {}
    const pgp = pgPromise(initOptions)
    this.postgres = pgp({
      host: options.host,
      port: options.port,
      database: options.database,
      user: options.user,
      password: options.password
    })
    this.wktParser = getWKTParser()
  }

  async query(geometry, mode, logger) {
      const validModes = ['otx_ejer', 'otx_beboer'];
    if (!validModes.includes(mode)) {
      throw new Error(`Unknown mode: ${mode}`);
    }


    let wktParser = getWKTParser()
    const queryWkt = wktParser.convert(geometry)
    let statement
    switch (mode) {
      case 'ejer':
        statement = `
        select
            null as bfenr,
            kommunekode as kommunenr,
            null as matrikelnr,
            null as ejerlavskode,
            null as ejerlavsnavn,
            null as cprcvr_ejer,
            adresseringsnavn as navn_ejer,
            null as conavn_ejer,
            standardadresse as adresse_ejer,
            postnr||' ' ||postdistrikt as postdistrikt_ejer,
            beskyttelseskode as adrbeskyt_ejer,
            null as ejerandel,
            null as primaerkontakt_t,
            null as adresse_ejendom,
            postdistrikt as postdistrikt_ejendom,
            vejnavn as vejnavn_ejendom,
            vejkode as vejkode_ejendom,
            husnr as husnr_ejendom,
            etagebetegnelse as etage_ejendom,
            doerbetegnelse as side_dornr_ejendom,
            adresseringsnavn,
            null as benytkodesenvur,
            null as benyttekstsenvur,
            ST_ASGEOJSON(geometri)
          from
            cpr.adresseringsgeoview limit 10;        `
        break;
      case 'otx_beboer':
        statement = `
            with inputgeom as (            
            select st_multi(st_geometryfromtext('${queryWkt}'))::geometry(multipolygon,25832) as geom
            )
            select
            ident,
            receiveraddress,
            overskrift,
            adressebeskyttelse,
            geometry
            FROM custom.mv_adresse_beboer_hoering_otx h
            join inputgeom on st_intersects(h.geometri_adgangspunkt, inputgeom.geom);        `
        break;
      case 'otx_ejer':
          statement = `
            with inputgeom as (
            select st_multi(st_geometryfromtext('${queryWkt}'))::geometry(multipolygon,25832) as geom
            )
            SELECT
            bfenummer,
            beliggenhed,
            jordstykker,
            ejere,
            ST_ASGEOJSON(geometri) as geometry
           FROM custom.mv_samletfastejendom_aktuel h
           join inputgeom on st_intersects(h.geometri, inputgeom.geom);
        `
        break;
      case 'ejer_full':
          statement = `
            with inputgeom as (
            select st_multi(st_geometryfromtext('${queryWkt}'))::geometry(multipolygon,25832) as geom
            )
            SELECT
            bfenummer,
            beliggenhed,
            jordstykker,
            ejere,
            ST_ASGEOJSON(geometri) as geometry
           FROM custom.mv_samletfastejendom_aktuel h
           join inputgeom on st_intersects(h.geometri, inputgeom.geom);
        `
        break;
      default:
        throw new Error(`Unknown mode: ${mode}`)
    }    
    let values = [geometry]
    let response = await this.postgres.manyOrNone(statement, values)
    return response
  }
}