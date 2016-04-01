util = require('../common/util')
fs = require('fs-extra')
AWS = require('aws-sdk')
appconfig = require('../config/appconfig').appconfig
AWS.config.update({accessKeyId: appconfig.getProperty("AWS_ACCESS_KEY_ID"), secretAccessKey: appconfig.getProperty("AWS_SECRET_ACCESS_KEY")});
AWS.config.update({region: appconfig.getProperty("AWS_REGION")});

exports.upload = (file,destinationFileName,callback) ->
	console.log file
	s3bucket = new AWS.S3({params: {Bucket: appconfig.getProperty("S3_BUCKET")}});
	params = 
		Key: destinationFileName
		Body: fs.readFileSync(file.path)
		ACL: 'public-read',
		ContentType:file.headers['content-type']
	s3bucket.upload params ,(err,data) ->
		if err?
			console.log err
			callback(err)
		else
			console.log data
			callback(null)
	