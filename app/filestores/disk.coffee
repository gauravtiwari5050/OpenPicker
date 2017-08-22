util = require('../common/util')
fs = require('fs-extra')
appconfig = require('../config/appconfig').appconfig
exports.upload = (file,destinationFileName,subDirectoryPath,callback) ->
	fs.copy file.path, "#{appconfig.getUploadDirectory()}/#{subDirectoryPath}/#{destinationFileName}", (err,data) ->
		if err?
   console.log(err)
			callback(err)
		else
			callback(null,'hosturl')