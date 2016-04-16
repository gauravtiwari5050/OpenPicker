util = require('../../common/util')
appconfig = require('../../config/appconfig').appconfig
csrf = require('csurf')

exports.init = (app) ->
	app.get '/app/' , csrf({ cookie: true }),(request,response) ->
		response.render('app.html.ejs',{csrf: request.csrfToken()})

	app.get '/usage', (request,response) ->
		response.render('usage.html.ejs',{host: request.headers.host,timestamp: appconfig.getServerStartTime() })

	app.get '/' , (request,response) ->
		response.redirect(301,'/usage')


