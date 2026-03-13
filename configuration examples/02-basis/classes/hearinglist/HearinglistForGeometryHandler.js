import DetailsHandlerDef from "@septima/septima-search/details/DetailsHandlerDef.js"
import DetailItemsList from "@septima/septima-search/details/DetailItemsList.js"
import GeoJSONReader from "jsts/org/locationtech/jts/io/GeoJSONReader.js"
import {BufferOp} from "jsts/org/locationtech/jts/operation/buffer.js"
import * as reproject from "@septima/septima-search/util/reproject.js"
import GeoJSONWriter from "jsts/org/locationtech/jts/io/GeoJSONWriter.js"
 

export default class HearinglistForGeometryHandler extends DetailsHandlerDef {
  constructor(options = {}) {
    let defaultOptions = {
      buttonText: "Høringliste",
      mode: "ejere"
    }
    super(Object.assign({}, defaultOptions, options))
    if (options.fetcher)
      this.fetcher = options.fetcher
    else
      throw "Hearinglist needs options.fetcher"

    if (options.logger)
      this.logger = options.logger

    if (options.mode)
      this.mode = options.mode
    if (options.mock)
      this.mock = options.mock

    this.geoJSONReader = new GeoJSONReader()
    this.geoJSONWriter = new GeoJSONWriter()

    this.handlerFunction = this.myHandler
  }

  async myHandler(result) {
    let queryGeometry = this.prepareQueryGeometry(result.geometry)
    let rows
    if (this.mock) {
      rows = [
        { ident: 123, receiveraddress: "Anders And \n\nParadis Æblevej 111 \n\n2860 Andeby", overskrift: "Høring om bygning af nye pengetank", geometry: '{"type": "Point","crs": {"type": "name","properties": {"name": "EPSG:25832"}},"coordinates": [570035.87, 6204426.37 ]}' },
        { ident: 124, receiveraddress: "Joakim Von And \n\nBilbremsebakken 1 \n\n2860 Andeby", overskrift: "Høring om bygning af nye pengetank", geometry: '{"type": "Point","crs": {"type": "name","properties": {"name": "EPSG:25832"}},"coordinates": [570153.87, 6204426.37 ]}' }

      ]
    } else {
      rows = await this.fetcher.query(queryGeometry, this.mode, this.getLogger())
    }


    let infoItemsHeaders
    let header
    let detailItemsListOptions
    let detailItemsList
    //Ejere
    switch (this.mode) {
      // case 'ejer':
      // infoItemsHeaders = [
      //       {type: "labelvalue", label: "bfenr"},
      //       {type: "labelvalue", label: "kommunenr"},
      //       {type: "labelvalue", label: "matrikelnr"},
      //       {type: "labelvalue", label: "ejerlavskode"},
      //       {type: "labelvalue", label: "ejerlavsnavn"},
      //       {type: "labelvalue", label: "cprcvr_ejer"},
      //       {type: "labelvalue", label: "navn_ejer"},
      //       {type: "labelvalue", label: "conavn_ejer"},
      //       {type: "labelvalue", label: "adresse_ejer"},
      //       {type: "labelvalue", label: "postdistrikt_ejer"},
      //       {type: "labelvalue", label: "adrbeskyt_ejer"},
      //       {type: "labelvalue", label: "ejerandel"},
      //       {type: "labelvalue", label: "primaerkontakt_t"},
      //       {type: "labelvalue", label: "adresse_ejendom"},
      //       {type: "labelvalue", label: "postdistrikt_ejendom"},
      //       {type: "labelvalue", label: "vejnavn_ejendom"},
      //       {type: "labelvalue", label: "vejkode_ejendom"},
      //       {type: "labelvalue", label: "husnr_ejendom"},
      //       {type: "labelvalue", label: "etage_ejendom"},
      //       {type: "labelvalue", label: "side_dornr_ejendom"},
      //       {type: "labelvalue", label: "benytkodesenvur"},
      //       {type: "labelvalue", label: "benyttekstsenvur"}
      // ]
      // header = 'Ejere'
      // break;
      case 'otx_beboer':
        infoItemsHeaders = [
          { type: "labelvalue", label: "#ident" },
          { type: "labelvalue", label: "#receiveraddress" },
          { type: "labelvalue", label: "#overskrift" },
          { type: "labelvalue", label: "#adressebeskyttelse" },
          { type: "labelvalue", valueformat: "geometry", label: "Geografi" }]
        header = 'Beboer'
        detailItemsListOptions = {
          infoItemsHeaders: infoItemsHeaders,
          header: header,
          itemType: "labelvalue",
          isHomogenous: true
        }
        detailItemsList = new DetailItemsList(detailItemsListOptions)
        for (let row of rows) {

          let infoItems = [
            { type: "labelvalue", label: "#ident", value: row.ident },
            { type: "labelvalue", label: "#receiveraddress", value: row.receiveraddress },
            { type: "labelvalue", label: "#overskrift", value: row.overskrift },
            { type: "labelvalue", label: "#adressebeskyttelse", value: row.adressebeskyttelse },
            { type: "labelvalue", label: "Geografi", value: JSON.parse(row.geometry), valueformat: "geometry" }

          ]
          detailItemsList.append({
            type: "labelvalue",
            infoItems: infoItems
          })
        }
        break;
      case 'otx_ejer':
          infoItemsHeaders = [
          { type: "labelvalue", label: "#ident" },
          { type: "labelvalue", label: "#receiveraddress" },
          { type: "labelvalue", label: "#overskrift" },
          { type: "labelvalue", label: "#adressebeskyttelse" },
          { type: "labelvalue", valueformat: "geometry", label: "Geografi" }]
        header = 'Ejere'
        detailItemsListOptions = {
          infoItemsHeaders: infoItemsHeaders,
          header: header,
          itemType: "labelvalue",
          isHomogenous: true
        }
        detailItemsList = new DetailItemsList(detailItemsListOptions)
        for (let row of rows) {
          row.ejere = row.ejere ? row.ejere : [{"navn": "Ukendt ejer","beskyttelse": null}]
          if (row.ejere){    
          for (let e of row.ejere) {
              let ident
              if (this.mock)
                ident = row.ident
              if (e.cprnr)
                ident = e.cprnr  
              if (e.cvrnr)
                ident = e.cvrnr
              let receiveraddress
              if (this.mock)
                 receiveraddress = row.receiveraddress
              else
                 receiveraddress = `${e.navn}\n${row.beliggenhed.replace(', ', '\n')}`

              let infoItems = [
                { type: "labelvalue", label: "#ident", value: ident },
                { type: "labelvalue", label: "#receiveraddress", value: receiveraddress },
                { type: "labelvalue", label: "#overskrift", value: null },
                { type: "labelvalue", label: "#adressebeskyttelse", value: e.beskyttelse },
                { type: "labelvalue", label: "Geografi", value: JSON.parse(row.geometry), valueformat: "geometry" }

              ]
              detailItemsList.append({
                type: "labelvalue",
                infoItems: infoItems
              })
        }
        }
      }
        break;
      default:
        throw new Error(`Unknown mode: ${this.mode}`)
    }



    return [detailItemsList.asItem()]
  }
    prepareQueryGeometry(queryGeometry){
    if (queryGeometry.type === 'Point') {
      const queryGeometry25832 = reproject.reproject(queryGeometry, null, "EPSG:25832")
      let queryGeometryJstsGeom = this.geoJSONReader.read(queryGeometry25832)
      queryGeometryJstsGeom = BufferOp.bufferOp(queryGeometryJstsGeom, 1)
      let queryGeometryWithBuffer = this.geoJSONWriter.write(queryGeometryJstsGeom)
      queryGeometryWithBuffer.crs = {
        "type": "name",
        "properties": {
          "name": "epsg:25832"
        }
      }

      return queryGeometryWithBuffer
    }
    if (queryGeometry.type === 'Polygon') {
      const queryGeometry25832 = reproject.reproject(queryGeometry, null, "EPSG:25832")
      let queryGeometryJstsGeom = this.geoJSONReader.read(queryGeometry25832)
      queryGeometryJstsGeom = BufferOp.bufferOp(queryGeometryJstsGeom, -0.1)
      let queryGeometryWithBuffer = this.geoJSONWriter.write(queryGeometryJstsGeom)
      queryGeometryWithBuffer.crs = {
        "type": "name",
        "properties": {
          "name": "epsg:25832"
        }
      }

      return queryGeometryWithBuffer
    }
    return queryGeometry
  }
}