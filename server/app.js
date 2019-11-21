const Koa = require('koa');
const parser = require('koa-bodyparser')
const InitManager = require('./core/init')
const catchError = require('./middlewares/exception')
const cors = require('koa2-cors');
const path = require('path')
const staticFiles = require('koa-static')
require('./app/models/user')
const app = new Koa()
app.use(staticFiles(path.join(__dirname + '/public/')))
app.use(catchError)
app.use(cors())
app.use(parser())
InitManager.initCore(app)

app.listen(3000)