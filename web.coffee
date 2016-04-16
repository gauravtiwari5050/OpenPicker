#!/usr/bin/env coffee
if !process.env.NODE_ENV?
	console.log "NODE_ENV not set ,setting to production"
	process.env.NODE_ENV = 'production'
console.log "NODE_ENV is #{process.env.NODE_ENV}"
require('./app/start/web').startApis()
