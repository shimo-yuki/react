const path = require('path')
const fs = require('fs')

const SVM_MODEL = path.join(__dirname, 'database', 'image-model.svm')
const portNo = 3001

const express = require('express')
const app = express()
app.listen(portNo, () => {
  console.log('起動しました', `http://localhost:${portNo}`)
})

const svm = require('node-svm')
const modelJSON = fs.readFileSync(SVM_MODEL, 'utf-8')
const model = JOSN.parse(modelJSON)
const clf = svm.restore(model)

app.get('/apo/predict', (req, res) => {
  const px = req.query.px
  if(!px) {
    res.json({status: false})
    return
  }
  const pxa = px.split('').map(v => parseInt('0x' + v) * 16)
  console.log('受信:', pxa.join(':'))
  clf.predict(pxa).then((label) => {
    res.json({status: true, label})
    console.log('分類:', label)
  })
})

app.use('/', express.static('./public'))