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


exports.appconfig = new Appconfig()
