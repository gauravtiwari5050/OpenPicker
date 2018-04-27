#include all the required dependencies
util = require('../../common/util')
appconfig = require('../../config/appconfig').appconfig
fs = require('fs')
request = require('request')
csrf = require('csurf')
async = require('async')
prettysize = require('prettysize')
path = require('path')
puppeteer = require('puppeteer')
tmpDir = appconfig.getTemporaryDirectory()
fileLimits = appconfig.getFileLimits()
imageRegex = appconfig.getImageRegex()
mimeRegex = appconfig.getMimeRegex()

exports.init = (app) ->
	
	app.post '/screenshot/',  (req,res) ->

		#set file name from req.body
		fileName = path.basename(req.body.url)
		#Remove unnecessary characters and spaces in the file
		fileName = fileName.replace(/@[^0-9a-z\.]+@i/g, "-")
		fileName = fileName.replace(/\ +/g, "-")
		#give file a unique id ending with the file name , provided it has one.
		fileName = "#{util.uniqueId()}-#{fileName}.jpg"
		reqURL = req.body.url
		filePath = tmpDir + '/' + fileName
		#First GET request for Headers
		
		#responseObject = 
		#	name: fileName
		#	path: tmpDir
		#	size: prettysize(dataSize)
		#	type: content_type
        
		fetchFile = (reqURL, callback) -> 
			responseObject = {}
			trail = {}
			async.waterfall [
				(cb) =>
					puppeteer.launch().then(
						(browser) => 
							trail.browser = browser
							cb(null)
					).catch(
						(err) ->
							cb(err)
					)
				,
				(cb) =>
					console.log('Opening page')
					trail.browser.newPage().then(
						(page) -> 
							trail.page = page
							cb(null)
					).catch(
						(err) ->
							cb(err)
					)
				,
				(cb) =>
					console.log('Setting viewport')
					trail.page.setViewport({ width: 1440, height: 1080}).then(
						() -> 
							cb(null)
					).catch(
						(err) ->
							cb(err)
					)
				,
				(cb) =>
					console.log('Visting url', reqURL)
					trail.page.goto(reqURL, {"waitUntil" : "networkidle0"}).then(
						() -> 
							cb(null)
					).catch(
						(err) ->
							cb(err)
					)
				,
				(cb) =>
					console.log('Taking screenshot')
					trail.page.screenshot({ path: filePath }).then(
						() -> 
							cb(null)
					).catch(
						(err) ->
							cb(err)
					)
				,
				(cb) =>
					trail.browser.close().then(
						() ->
							cb(null)
						,
						(err) ->
							cb(err)
					)
			],
			(err) =>
				callback(err)

		fetchFile reqURL, (err, responseObject) ->
			responseObject = 
				name: fileName
				path: tmpDir
				type: "image/jpeg"

			if (err)
				console.log(err)
				responseObject = 
					error: true
					message: "Error taking screenshot"
			util.sendJSONPResponse req, res, responseObject
				
				

		
			


