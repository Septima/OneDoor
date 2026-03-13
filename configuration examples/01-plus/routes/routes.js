import express from "express"
import httpProxy from 'http-proxy';

export default function (service) {
  const router = express.Router()
  const proxy = httpProxy.createProxyServer();

  router.use('/ogc', (req, res, next) => {
    proxy.web(req, res, {
        target: 'http://10.10.1.36/qgis-ltr/qgis_mapserv.fcgi.exe', //onedoor-hpfqgwegd2adbeef.a01.azurefd.net/custom/organisations/silkeborg/configurations/standard/ogc/?SERVICE=WFS&REQUEST=getcapabilities
        preserveQuery: true 
    }, (err) => {
      if (err) {
        next(err);
      }
    });
  });

  return router
}


