util = require('../../common/util')
appconfig = require('../../config/appconfig').appconfig
csrf = require('csurf')

exports.init = (app) ->
	app.get '/app/' , csrf({ cookie: true }),(request,response) ->
		console.log "CSRF Token is"
		console.log request.csrfToken()
		response.render('app.html.ejs',{csrf: request.csrfToken()})


