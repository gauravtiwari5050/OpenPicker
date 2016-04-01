util = require('../../common/util')
appconfig = require('../../config/appconfig').appconfig

exports.init = (app) ->
	app.get '/app/' , (request,response) ->
		response.render('app.html',{})


