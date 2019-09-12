const Mastdon = require('mastodon-api')
const fs = require('fs')
const path = require('path')
const readlineSync = require('readline-sync')
const file_cli_app = path.join(__dirname, 'cli-app.json')
const file_user = path.join(__dirname, 'token.json')
const instanceUri = 'https://pawoo.net'

const info = JSON.parse(fs.readFileSync(file_cli_app))

Mastdon.getAuthorizationUrl(
  info.client_id,
  info.client_secret,
  instanceUri)
  .then(url => {
    console.log("以下のURLのアクセスしてコードを取得してください")
    console.log(url)

    const code = readlineSync.question('コード: ')

    return Mastdon.getAccessToken(
      info.client_id,
      info.client_secret,
      code,
      instanceUri)
    })
    .then(token => {
      console.log('アクセストークン：', token)
      fs.writeFileSync(file_user, token)
    })