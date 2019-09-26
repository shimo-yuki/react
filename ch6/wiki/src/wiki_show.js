import React from 'react'
import request from 'superagent'
import WikiParser from './wiki_parser'
import styles from './styles'

class WikiShow extends React.Component {
  constructor (props) { //マウント（追加）時に実行されるメソッド。１度しか通らない
    super(props)
    const {params} = this.props.match //routerで渡ってくるidの部分をparamsに代入
    this.state = { //stateを初期化
      name:params.name, body: '', loaded: false 
    }
  }
  componentWillMount () { //ComponentがDOMツリーに追加される前に一度だけ呼ばれる
    request
    .get(`/api/get/${this.state.name}`)
    .end((err, res) => {
      if(err) return
      this.setState({
        body: res.body.data.body,
        loaded: true
      })
    })
  }
  render () { //１番呼ばれる必須のメソッド、propsやstateが更新されるたびに呼ばれる
    if(!this.state.loaded) return(<p>読み込み中</p>) //もしstateのloadedがfalseだったら読込中と表示する（初期値）
    const name = this.state.name 
    const body = this.state.body
    const html = this.convertText(body) //変数宣言 convertText関数の呼び出し
    return( //reternで返してる
      <div>
        <h1>{this.state.name}</h1> 
        <div style={styles.show}>{html}</div>
        <p style={styles.right}>
          <a href={`/edit/${name}`}>このページを編集</a>
        </p>
      </div>
    )
  }
  convertText(src) { //wiki記法をreactオブジェクトに変換する関数作成
    //wiki記法をパースして配列データに変換
    const nodes = WikiParser.parse(src)
    console.log(nodes)
    // 各要素をReactの要素に変換
    const lines = nodes.map((e, i) => {
//わからない↓
      if(e.tag === 'ul') {
        const lis = e.items.map(
          (s, j) => <li key={`node${i}_${j}`}>{s}</li>
        )
        return <ul key={`node${i}`}>{lis}</ul>
      }
      if (e.tag === 'a') {
        return (<div key={`node${i}`}>
          <a href={`/wiki/${e.label}`}>→{e.label}</a>
        </div>)
      }
      return React.createElement(
        e.tag, {key: 'node' + i}, e.label)
    })
    return lines
  }
}
export default WikiShow
