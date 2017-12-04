#include all the required dependencies
util = require('../../common/util')
appconfig = require('../../config/appconfig').appconfig
fs = require('fs')
request = require('request')
csrf = require('csurf')
async = require('async')
prettysize = require('prettysize')
path = require('path')
tmpDir = appconfig.getTemporaryDirectory()
fileLimits = appconfig.getFileLimits()
imageRegex = appconfig.getImageRegex()
mimeRegex = appconfig.getMimeRegex()

exports.init = (app) ->
	
	app.post '/fetch/', csrf({ cookie:true }), (req,res) ->

		#set file name from req.body
		fileName = path.basename(req.body.url)
		#Remove unnecessary characters and spaces in the file
		fileName = fileName.replace(/@[^0-9a-z\.]+@i/g, "-")
		fileName = fileName.replace(/\ +/g, "-")
		#give file a unique id ending with the file name , provided it has one.
		fileName = "#{util.uniqueId()}-#{fileName}"
		reqURL = [req.body.url]
		#First GET request for Headers
		responseObject = {}
		#Check user allowed Mime Types
		if req.body.allowedMimeTypes != "*/*"
			fileRegex = req.body.allowedMimeTypes
		else
			fileRegex = mimeRegex
        
		fetchFile = (reqURL, callback) -> 
			dataSize = 0
			request(reqURL,{method : 'HEAD'}, (err, res) ->
				if err
					console.error err
					responseObject =
						error: true
						message: err.message
					callback(null)
				else
					content_type = res.headers["content-type"]
					content_size = parseInt(res.headers["content-length"])
					#If Content-Type not found , set it to null
					if !content_type?
						content_type = if reqURL.match(imageRegex) then "image/jpeg" else ""
					#Content Type Validation. Checks URL with mimeRegex or content header with fileRegex
					if reqURL.match(mimeRegex) || content_type.match(fileRegex)
						#Content Size Validation
						if content_size <= fileLimits.maxSize || isNaN content_size
							finalReq = request(reqURL,{method : 'GET'})
							finalReq.on('data', (data) -> 
									dataSize += data.length
									if dataSize > fileLimits.maxSize
										finalReq.abort()
										fs.unlink(tmpDir+'/'+fileName)
										responseObject = 
											error: true
											message: "Maximum Upload Size Exceeded"
								).on('end', () -> 
										if dataSize <= fileLimits.maxSize
											responseObject = 
												name: fileName
												path: tmpDir
												size: prettysize(dataSize)
												type: content_type
										callback(null)									
								)
								.pipe(fs.createWriteStream(tmpDir+'/'+fileName))
						else
							responseObject = 
								error: true
								message: "Maximum Upload Size Exceeded"
							callback(null)
					else
						responseObject = 
							error: true
							message: "Invalid File Type"
						callback(null)
			)
		async.each reqURL, fetchFile, () ->
			util.sendJSONPResponse req, res, responseObject


