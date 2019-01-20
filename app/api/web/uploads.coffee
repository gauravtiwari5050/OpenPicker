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
			
			filestores[filestore_name].upload file,fileName, (err,data) ->
				console.log(data)
				callback(null)

		async.eachSeries filestore_names, uploadToStore , () ->
			responseObject =
				name : file.name
				path : fileName

			util.fileInfo file, (err, info) -> 
				if err
					info = {}
				responseObject.info = info
				fs.unlinkSync(file.path)
				util.sendJSONPResponse request,response,responseObject

		
		


