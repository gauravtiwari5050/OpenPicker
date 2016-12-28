#include all the required dependencies
util = require('../../common/util')
appconfig = require('../../config/appconfig').appconfig
moment = require('moment')
multiparty = require('connect-multiparty')
fs = require('fs')
request = require('request')
csrf = require('csurf')
async = require('async')
tmpDir = appconfig.getTemporaryDirectory()
fileLimits = appconfig.getFileLimits()
filestores = {}
responseObject = {}

exports.init = (app) ->
	
	app.post '/fetch/',(req,res) ->
		#check request came
		console.log "Request recieved"
		#request body
		console.log req.body
		#set file name from req.body
		fileName = req.body.fileName
		#if file name doesn't exist 
		if !fileName?
			fileName = ""

		#Remove unnecessary characters and spaces in the file
		fileName = fileName.replace(/@[^0-9a-z\.]+@i/g, "-")
		fileName = fileName.replace(/\ +/g, "-")
		#give file a unique id ending with the file name , provided it has one.
		fileName = "#{util.uniqueId()}-#{fileName}.jpeg"
		reqURL = [req.body.url]
		#First GET request for Headers
		fetchImage = (reqURL, callback) -> 
			request(reqURL,{method : 'HEAD'}, (err, res) ->
				if err
					console.error(err)
				else
					console.log "got headers"
					content_type = res.headers["content-type"]
					content_size = parseInt(res.headers["content-length"])
					if content_type.match(/.(?:jpe?g|png|gif|svg)$/)
						console.log "header match"
						if content_size <= fileLimits.maxSize
							console.log "content within size"
							request(reqURL,{method : 'GET'}).pipe fs.createWriteStream(tmpDir+'/'+fileName).on('close', () -> 
									console.log "file written"
									responseObject = 
									  name: fileName
									  path: tmpDir
									callback(null)
							)
						else
							console.log("Maximum Upload Size Exceeded")
							responseObject = 
								error: true
								message: "Maximum Upload Size Exceeded"
							callback(null)
					else
						console.log("Content-Type not image")
						responseObject = 
							error: true
							message: "Content-Type not image"
						callback(null)
			)
		async.each reqURL, fetchImage, () ->
			console.log responseObject
			util.sendJSONPResponse req, res, responseObject


