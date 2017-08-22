util = require('../common/util')
fs = require('fs-extra')
appconfig = require('../config/appconfig').appconfig
exports.upload = (file,destinationFileName,subDirectoryPath,callback) ->
	console.log "Uploading File to Disk from #{file.path} to #{destinationFileName}"
	fs.copy file.path, "#{appconfig.getUploadDirectory()}/#{subDirectoryPath}/#{destinationFileName}", (err) ->
		if err?
			callback(err)
		else
			callback(null,'hosturl') #change this disk to origin url