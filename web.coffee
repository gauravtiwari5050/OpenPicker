#!/usr/bin/env coffee
#includes
path = require('path')
express = require('express')
consolidate = require('consolidate')
morgan = require('morgan')
bodyParser = require('body-parser')
compression = require('compression')
fs = require('fs')
appconfig = require('./app/config/appconfig').appconfig
web = require('./app/start/web')
console.log appconfig
web.startApis()
