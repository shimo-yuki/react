import React from 'react'

export class SimpleForm extends React.Component{
  constructor (props) {
    super(props)
    this.state = { value: ''}
  }

  doChange (e){
    const newValue = e.target.value
    this.setState({value: newValue})
  }
  doSubmit (e) {
    window.alert('値を送信: ' + this.state.value)
    e.prevenDefault()
  }
  render (){
    const doSubmit = (e) => this.doSubmit(e)
    const doChange = (e) => this.doChange(e)
    return (
      <form onSubmit={doSubmit}>
      <input type='text' 
        value={this.state.value}
        onChange={doChange} />
        <input type='submit' value='送信' />
      </form>
    )
  }
}