import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import fs from 'fs'
import path from 'path'
import Mastodon from 'mastodon-api'
import {styles} from './styles.js'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.apiUri = 'https://pawoo.net/api/v1/'
    this.loadInfo()
    this.state = {
      tootdate: '',
      timelines: []
    }
  }

  componentWillMount () {
    this.loadTimelines()
    setInterval(() => {
      this.loadTimelines()
    }, 1000 * 30)
  }

  loadInfo () {
    const f = path.join('token.json')
    try {
      fs.statSync(f)
    } catch (err) {
      window.alert('先にアクセストークンを取得してください')
      window.close()
      return
    }
    this.token = fs.readFileSync(f)
    this.mstdn = new Mastodon({
      access_token: this.token,
      timeout_ms: 60 * 1000,
      api_url: this.apiUri
    })
  }

  loadTimelines () {
    this.mstdn.get('timelines/home', {})
    .then(res => {
      this.setState({timelines: res.data})
    })
  }

  handleText(e) {
    this.setState({tootdata: e.target.value})
  }

  toot (e) {
    this.mstdn.post(
      'statuses',
      {status: this.state.tootdata},
      (err, data, res) => {
        if (err) {
          console.log(err)
          return
        }
        this.setState({tootdata: ''})
        this.loadTimelines()
      }
    )
  }

  render () {
    return (<div>
      <div style={styles.editorPad}>
        <h1 style={styles.title}>マストドンのクライアント</h1>
        <textarea
          style={styles.editor}
          value={this.state.tootdata}
          onChange={e => this.handleText(e)} />
        <div>
          <button onClick={e => this.toot(e)}>トゥート</button>
        </div>
      </div>
      <div style={{marginTop:120}} />
      {this.renderTimelines()}
    </div>)
  }

  renderTimelines(){
    const lines = this.state.timelines.map(e => {
      console.log(e)
      let memo = null
      if(e.reblog) {
        memo = (<p style={styles.reblog}>
        {e.account.display_name}さんがブーストしました
        </p>)
        e = e.reblog
      }
      return (<div key={e.id} style={styles.content}>
        <img style={styles.avatar}
        src={e.account.avatar} />
        <div style={styles.ctext}>
        {memo}{e.account.display_name}
          <span dangerouslySetInnerHTML={{
            __html: e.content}} />
        </div>
        <div style={{clear: 'both'}} />
      </div>)
    })
    return (<div>
      <h2 style={styles.title}>タイムライン</h2>
      {lines}
    </div>)
  }
}

ReactDOM.render(<App />,
  document.getElementById('root'))
