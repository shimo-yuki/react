import React from 'react'
import ReactDOM from 'react-dom'

class TextAreaForm extends React.Component {
  constructor(props){
    super(props)
    this.state = { value: 'Hello'}
  }

  render(){
    return (<div>
      <form onSubmit={e => this.doSubmit(e)}>
        <textarea
        onChange={e => this.doChange(e)}
        value={this.state.value}
        /><br />
        <input type='submit' value='決定' />
      </form>
    </div>)
  }

  doChange (e) {
    this.setState({ value: e.target.value})
  }

  doSubmit (e) {
    e.preventDefault()
    window.alert(this.state.value)
  }
}

ReactDOM.render(
  <TextAreaFrom />,
  document.getElementById('root')
)