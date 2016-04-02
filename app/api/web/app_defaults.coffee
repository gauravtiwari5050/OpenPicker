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
		link =
			unique_id : "URL"
			name: "Direct Link To File"
			fa_icon: "link"

		channels.push(my_computer)
		channels.push(link)
		
		responseObject =
			channels: channels

		options = 
			mimetypes:"image/*",
			multiple: false,
			cropRatio: 2/1,
			channels: ['MY_COMPUTER','URL'],
			conversions: []

		responseObject.options = options


		util.sendJSONPResponse request,response,responseObject
		


