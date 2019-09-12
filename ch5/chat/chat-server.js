
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const portNo = 3001
server.listen(portNo, ()=>{
  console.log('起動しました', 'http://localhost:' + portNo)
})

app.use('/public', express.static('./public'))
app.get('/', (req, res) => {
  res.redirect(302, '/public')
})
//WebSocketのサーバーを起動
const socketio = require('socket.io')
const io = socketio.listen(server)

//WebSocketのクライアントが接続してきたときの処理
io.on('connection', (socket) => {
  console.log('ユーザが接続:', socket.client.id)
  //クライアントがメッセージを受信したときの処理
  socket.on('chat-msg', (msg) => {
    //特定のメッセージを受信したときの処理をここに記述
    console.log('メッセージ', msg)
    io.emit('chat-msg', msg)
  })
})