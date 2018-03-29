const express = require('express')
const bodyParser = require('body-parser')   //解析post请求体转换成json  req.body
const cookieParser = require('cookie-parser')

const app = express()
const model = require('./model')
const Chat = model.getModel('chat')

//配置socket.io
const server = require('http').Server(app)
const io = require('socket.io')(server)
/*Chat.remove({}, function (err,doc) {

})*/
io.on('connection', function (socket) {
	console.log('user login')
	socket.on('sendmsg', function (data) {
		console.log(data)
		//io.emit('recvmsg',data)
		const {from,to,msg} = data
		const chatid = [from,to].sort().join(' ')
		Chat.create({chatid,from,to,content:msg}, function (err,doc) {
			io.emit('recvmsg',Object.assign({}, doc._doc))
			console.log(doc)
		})


	})
})

const userRouter = require('./user')


//新建app

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)

//express没加socket
/*app.listen(9093,function() {
	console.log('node app start at port 9093');
})*/

//加socket
server.listen(9093, function () {
	console.log('Node app start at port 9093')
})

