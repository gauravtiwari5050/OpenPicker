util = require('../../common/util')
appconfig = require('../../config/appconfig').appconfig
moment = require('moment')

exports.init = (app) ->
	app.get '/script/v1.js' , (request,response) ->
		response.header("Content-Type", "application/x-javascript");
		obj = 
			url : request.headers.host
		response.render('v1.js.ejs',obj)


