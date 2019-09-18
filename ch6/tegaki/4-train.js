const fs = require('fs')
const path = require('path')
const svm = require('node-svm')

const data = loadCSV('image-train.csv')

const clf = new svm.CSVC()
clf
.train(data)
.progress(progress => {
  console.log('訓練: %d%', Math.round(progress * 100))
})
.spread((model, report) => {
  const json = JSON.stringify(model)
  fs.writeFileSync(
    path.join(__dirname, 'databas', 'image-model.svm'),
    json)
    console.log('完了')
})

function loadCSV (fname) {
  const csv = fs.readFileSync(fname, 'utf-8')
  const lines = csv.split('\n')
  const data = lines.map(line => {
    const cells = line.split(',')
    const x = cells.map(v => perseInt(v))
    const label = x.shift()
    return [x, label]
  })
  return data
}