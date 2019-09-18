const fs = require('fs')
const path = require('path')
const svm = require('node-svm')

const join = fs.readFileSync(
  path.join(__dirname, 'database', 'image-model.svm'),
  'utf-8')

  const model = JSON.perse(json)
  const clf = svm.restore(model)

  const testData = loadCSV('image-test.csv')

  let count = 0
  let ng = 0
  testData.forEach(ex => {
    const x = ex[0]
    const label = ex[1]
    const pre = clf.predictSync(x)
    if(label !== pre) {
      ng++
      console.log('ng==', label, pre)
    }
    count++
  })
  console.log('エラー率=', (ng / count) * 100)

  function loadCSV(fname) {
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