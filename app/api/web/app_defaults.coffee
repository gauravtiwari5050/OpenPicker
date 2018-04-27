util = require('../../common/util')
appconfig = require('../../config/appconfig').appconfig
moment = require('moment')

exports.init = (app) ->
	app.get '/app_defaults/' , (request,response) ->
		channels = []
		my_computer =
			unique_id : "MY_COMPUTER"
			name: "My Computer"
			fa_icon: "desktop"
		web_link = 
			unique_id : "WEB_LINK"
			name: "Web Link"
			fa_icon: "link"
		screenshot =
			unique_id : "SCREENSHOT"
			name: "Url Screenshot"
			fa_icon: "camera"

		channels.push(my_computer)
		channels.push(web_link)
		channels.push(screenshot)

		
		responseObject =
			channels: channels

		options = 
			mimetypes:"image/*",
			multiple: false,
			cropRatio: 2/1,
			channels: ['MY_COMPUTER'],
			conversions: []

		responseObject.options = options
		responseObject.limits = appconfig.getFileLimits()
			


		util.sendJSONPResponse request,response,responseObject
		


