_ = require('underscore')._
PropertiesReader = require('properties-reader')
fs = require('fs')

class Appconfig
	constructor: () ->
		propertiesFile = "#{process.cwd()}/properties.conf"
		if fs.existsSync(propertiesFile)
			console.log("Found a properties file at path #{propertiesFile}")
			@properties = PropertiesReader(propertiesFile)
		else
			console.log("No Properties file found at path #{propertiesFile}")
			@properties = PropertiesReader()

		@startTimeStamp = (new Date()).getTime()
		console.log "Server started at #{@startTimeStamp}"
		
		return
	getProperty: (key) ->
		return process.env[key] || @properties.get(key)

	getUploadDirectory: () ->
		key = "UPLOAD_DIRECTORY"
		uploadDirectory = this.getProperty(key)
		if !uploadDirectory?
			uploadDirectory = "#{process.cwd()}/.uploads"
		if !fs.existsSync(uploadDirectory)
			fs.mkdirSync(uploadDirectory)
		return uploadDirectory
		
	getFileStores: () ->
		key = "FILESTORES"
		filestores_list = this.getProperty(key)
		if !filestores_list?
			filestores_list = "disk"
		filestores = filestores_list.split ","
		return filestores

	getFileLimits: () ->
		key = "MIN_SIZE"
		minSize = this.getProperty(key)
		if !minSize?
			minSize = 0

		key = "MAX_SIZE"
		maxSize = this.getProperty(key)
		if !maxSize?
			maxSize = 5 * 1024 * 1024

		obj = 
			minSize : minSize
			maxSize : maxSize

		return obj

	getPort: ()->
		key = 'PORT'
		port = this.getProperty(key)
		if !port?
			port = 5050
		return port

	getServerStartTime: () ->
		return @startTimeStamp
		


exports.appconfig = new Appconfig()
