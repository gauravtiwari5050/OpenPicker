util = require('../../common/util')
appconfig = require('../../config/appconfig').appconfig
moment = require('moment')
multiparty = require('connect-multiparty')
fs = require('fs')
csrf = require('csurf')
tmpDir = appconfig.getTemporaryDirectory()
multipartyMiddleware = multiparty({uploadDir: tmpDir })
async = require('async')
filestores = {}

exports.init = (app) ->
  app.post '/upload/' ,csrf({ cookie: true }), multipartyMiddleware,(request,response) ->

    file = request.files.file
    subDirectoryPath = request.body.subDirectory
    urlObject = {}
    fileName = file.name
    if !fileName?
      fileName = ""
    fileName = fileName.replace(/@[^0-9a-z\.]+@i/g, "-")
    fileName = fileName.replace(/\ +/g, "-")
    fileName = "#{util.uniqueId()}-#{fileName}"
    console.log "File Name would be #{fileName}"

    filestore_names = appconfig.getFileStores()
    uploadToStore = (filestore_name,callback) ->
      console.log "Using filestore #{filestore_name}"

      if !fs.existsSync("#{__dirname}/../../filestores/#{filestore_name}.coffee")
        console.log "../../filestores/#{filestore_name}.coffee"
        callback(null)
        return

      if !filestores[filestore_name]?
        filestores[filestore_name] = require("../../filestores/#{filestore_name}")

      filestores[filestore_name].upload file,fileName,subDirectoryPath, (err,data) ->
        urlObject[filestore_name] = data
        callback()


    async.eachSeries filestore_names, uploadToStore , (err,data) ->
      responseObject =
        url: urlObject
        name : file.name
        path : if subDirectoryPath == '' then fileName else subDirectoryPath+'/'+fileName
      fs.unlinkSync(file.path)
      util.sendJSONPResponse request,response,responseObject
