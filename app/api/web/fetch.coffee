#include all the required dependencies
util = require('../../common/util')
appconfig = require('../../config/appconfig').appconfig
fs = require('fs')
request = require('request')
csrf = require('csurf')
async = require('async')
prettysize = require('prettysize')
tmpDir = appconfig.getTemporaryDirectory()
fileLimits = appconfig.getFileLimits()
filestores = {}
mimeRegex = /.(jpe?g|png|gif|svg|avi|wmv|flv|mpg|3gp|mkv|mp4|mpeg|mpeg-1|mpeg-2|mpeg-3|mpeg-4|mp3|wav|xlsx?|zip|7z|docx?|pptx?|pdf)$/i

exports.init = (app) ->
	
	app.post '/fetch/', csrf({ cookie:true }), (req,res) ->
		#check request came
		console.log "Request recieved"
		#set file name from req.body
		fileName = req.body.fileName
		#if file name doesn't exist 
		if !fileName?
			fileName = ""

		#Remove unnecessary characters and spaces in the file
		fileName = fileName.replace(/@[^0-9a-z\.]+@i/g, "-")
		fileName = fileName.replace(/\ +/g, "-")
		#give file a unique id ending with the file name , provided it has one.
		fileName = "#{util.uniqueId()}-#{fileName}"
		reqURL = [req.body.url]
		#First GET request for Headers
		responseObject = {}
		fetchImage = (reqURL, callback) -> 
			dataSize = 0
			request(reqURL,{method : 'HEAD'}, (err, res) ->
				if err
					console.error(err)
				else
					console.log "got headers"
					console.log req.headers
					content_type = res.headers["content-type"]
					content_size = parseInt(res.headers["content-length"])
					if reqURL.match(mimeRegex) || content_type.match(mimeRegex)
						console.log "content-type is valid"
						extension = (reqURL.match(mimeRegex) || content_type.match(mimeRegex)).pop()
						fileName = fileName+'.'+extension
						if content_size <= fileLimits.maxSize || isNaN content_size
							console.log "content within size or no content-length header present"
							console.log content_size
							finalReq = request(reqURL,{method : 'GET'})
							finalReq.on('data', (data) -> 
									dataSize += data.length
									if dataSize > fileLimits.maxSize
										console.log "File Limit Exceeded while fetching, Download will be aborted"
										finalReq.abort()
										fs.unlink(tmpDir+'/'+fileName)
										responseObject = 
											error: true
											message: "Maximum Upload Size Exceeded"
								).on('end', () -> 
										if dataSize <= fileLimits.maxSize
											console.log "file written"
											responseObject = 
											  name: fileName
											  path: tmpDir
											  size: prettysize(dataSize)
											  type: content_type
										callback(null)									
								)
								.pipe(fs.createWriteStream(tmpDir+'/'+fileName))
						else
							console.log("Maximum Upload Size Exceeded")
							responseObject = 
								error: true
								message: "Maximum Upload Size Exceeded"
							callback(null)
					else
						console.log("Content-Type not valid")
						responseObject = 
							error: true
							message: "Content-Type not valid"
						callback(null)
			)
		async.each reqURL, fetchImage, () ->
			util.sendJSONPResponse req, res, responseObject


