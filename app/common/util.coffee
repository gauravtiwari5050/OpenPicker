async = require('async')
readChunk = require('read-chunk');
fileType = require('file-type');
sizeOfImage = require('image-size');
ffprobe = require('ffprobe');
checksum = require('checksum');
appconfig = require("../config/appconfig").appconfig

unless String::trim then String::trim = -> @replace /^\s+|\s+$/g, ""

exports.sendJSONPResponse = (request,response,responseObj) ->
	callbackFunction = request.query.jsonp || request.query.callback
	if callbackFunction
		response.set('Content-Type', 'application/javascript');
		response.send("#{callbackFunction}(#{JSON.stringify(responseObj)})")
	else
		response.send(responseObj)

exports.sendError = (response, msg, err) ->
	errMsg = if err then ' = ' + err else ''
	console.log msg + errMsg
	response.status(400).send error: msg + errMsg

exports.base64EncodedCompleteUrl = (req) ->
	fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl
	return new Buffer(fullUrl).toString('base64')

exports.uniqueId = (length=8) ->
  id = ""
  id += Math.random().toString(36).substr(2) while id.length < length
  id.substr 0, length

exports.fileChecksum = (file, callback) => 
	checksum.file file, callback

exports.imageInfo = (file, object, callback) =>
	dimensions = sizeOfImage(file.path)
	object.height = dimensions.height
	object.width = dimensions.width
	callback null, object

exports.videoInfo = (file, object, callback) => 
	pathObject = 
		path: '/usr/bin/ffprobe'
	
	ffprobe file.path, pathObject, (err, info) -> 
		if err
			info = {}
		object.details = info
		callback null, object

exports.fileInfo = (file, callback) =>
	buffer = readChunk.sync(file.path, 0, fileType.minimumBytes)
	object = fileType(buffer)
	exports.fileChecksum file.path, (err, checksum) =>
		object.checksum = checksum
		if object && object.mime.includes('image')
			return exports.imageInfo file, object, callback
		else if object && object.mime.includes('video')
			return exports.videoInfo file, object, callback


				

