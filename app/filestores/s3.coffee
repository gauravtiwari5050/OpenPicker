util = require('../common/util')
fs = require('fs-extra')
AWS = require('aws-sdk')
appconfig = require('../config/appconfig').appconfig
AWS.config.update({accessKeyId: appconfig.getProperty("AWS_ACCESS_KEY_ID"), secretAccessKey: appconfig.getProperty("AWS_SECRET_ACCESS_KEY")});
AWS.config.update({region: appconfig.getProperty("AWS_REGION")});

exports.upload = (file,destinationFileName,subDirectoryPath,callback) ->
	console.log file
	s3bucket = new AWS.S3({params: {Bucket: appconfig.getProperty("S3_BUCKET")}});
	params = 
		Key: if subDirectoryPath == '' then destinationFileName else subDirectoryPath+'/'+destinationFileName
		Body: fs.readFileSync(file.path)
		ACL: 'public-read',
		ContentType:file.headers['content-type']
	s3bucket.upload params ,(err,data) ->
		if err?
			console.log err
			callback(err)
		else
      fullPath = if subDirectoryPath == '' then destinationFileName else subDirectoryPath+'/'+destinationFileName
      s3FileUrl = 'https://s3.'+appconfig.getProperty("AWS_REGION")+'.amazonaws.com/'+ appconfig.getProperty("S3_BUCKET")+'/'+fullPath
      callback(null,s3FileUrl)
	