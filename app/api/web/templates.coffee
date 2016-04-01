util = require('../../common/util')
appconfig = require('../../config/appconfig').appconfig
moment = require('moment')
fs = require("fs")
async = require('async')

exports.init = (app) ->
	files = fs.readdirSync "./website/views/templates"

	async.eachSeries files, (template,callback) ->
		if ! template || ! template[0]
			callback()
		else
			app.get "/templates/#{template}" , (request,response) ->
				response.render("templates/#{template}",{})
			callback()


