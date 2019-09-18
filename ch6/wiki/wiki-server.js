const path = require('path')
const NeDB = require('nedb')
//データベースの作成
const db = new NeDB({
  filename: path.join(__dirname, 'wiki.db'),
  autoload: true
})

const express = require('express')

const app = express()
const portNo = 3001
const bodyParser = require('body-parser')
//post通信を行う
app.use(bodyParser.urlencoded({extended: true}))
//配列型でデータの受取を行えるようにする
app.listen(portNo, () => {
  console.log('起動しました', `http://localhost:${portNo}`)
})
//APIの定義
//wikiのデータを返す
app.get('/api/get/:wikiname', (req, res) => {
  const wikiname = req.params.wikiname
  db.find({name: wikiname}, (err, docs) => {
    if(err) {
      res.json({status: false, msg: err})
      return
    }
    if(docs.length === 0) {
      docs = [{name: wikiname, body: ''}]
    }
    res.json({status: true, data: docs[0]})
  })
})


//wikiのデータを読み込む
app.post('/api/put/:wikiname', (req, res) => {
  const wikiname = req.params.wikiname
  console.log('/api/put/' + wikiname, req.body)
  //dbの中からパラメーターのwikinameがnameの中にあるか探す
  db.find({'name': wikiname}, (err, docs) => {
    if (err) {
      //エラーを返す
      res.json({status: false, msg: err})
      return
    }
    const body = req.body.body
    if (docs.length === 0) {
      //なかったら挿入する
      db.insert({name: wikiname, body})
    } else {
      //中身があれば更新を行う
      db.update({name: wikiname}, {name: wikiname, body})
    }
    res.json({status: true})
  })
})

//publicディレクトリを自動で返す
app.use('/wiki/:wikiname', express.static('./public'))
app.use('/edit/:wikiname', express.static('./public'))
app.get('/', (req, res) => {
  res.redirect(302, '/wiki/FrontPage')
})