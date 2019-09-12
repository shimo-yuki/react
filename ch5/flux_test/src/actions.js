import {appDispatcher} from './appDispatcher.js'

export const ActionType = {
  CHANGE_NAME: 'CHANGE_NAME',
  SUBMIT_NAME: 'SUBMIT_NAME'
}

export const Actions = {
  changeName: (name) => {
    if(name === null) return
    appDispatcher.dispatch({
      ActionType: ActionType.CHANGE_NAME,
      value: name
    })
  },
  submitName: () => {
    appDispatcher.dispatch({
      ActionType: ActionType.SUBMIT_NAME})
  }
}