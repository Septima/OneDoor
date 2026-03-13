import express from "express"
import Targets from "@septima/septima-search/filter/Targets.js"
 
// Convert bbox to GeoJSON Polygon geometry
function bboxToGeoJSON(bbox) {
  const [minX, minY, maxX, maxY] = bbox.split(',').map(Number)
  return {
    type: "Polygon",
    coordinates: [[
      [minX, minY],
      [minX, maxY],
      [maxX, maxY],
      [maxX, minY],
      [minX, minY]
    ]],
    crs:  {"type": "name","properties": {"name": "epsg:25832"}
}
  }
}
 
export default function (service) {
  const router = express.Router()
  // http://test-furesoeg/custom/organisations/furesoe/configurations/kommune/servitutter/POLYGON((710851.6166522389%206187393.575916418%2C710851.6166522389%206187402.766185074%2C710860.8069208956%206187402.766185074%2C710860.8069208956%206187393.575916418%2C710851.6166522389%206187393.575916418))

  router.get("/arbejdsomraader/:bbox", async function (req, res, next) {
    try {
      let bbox = req.params.bbox
      console.log('Received bbox:', bbox)
      let geom = bboxToGeoJSON(bbox)
      console.log('Converted to GeoJSON:', JSON.stringify(geom))
      let searcher = service.configuration.searchers.qgis
      let targets = new Targets([{source: "gladsaxe", types : ['urn:gladsaxe:ds:arbejdsomraader']}])
      let reply = await searcher.sq({geometry: geom}, targets)
      let results = reply._results
      console.log('Results count:', results.length)
      res.send(results)
    } catch (error) {
      console.error('Error in arbejdsomraader route:', error)
      res.status(500).json({ error: error.message })
    }
  })
  return router
}