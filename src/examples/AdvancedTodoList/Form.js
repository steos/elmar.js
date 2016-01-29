import React from 'react'
import {message, targetValue} from '../../elmar'

export const ActionType = {
  Submit: 'submit-form',
  Change: 'change-form'
}

export const Action = {
  Submit: {type: ActionType.Submit},
  Change: e => ({type: ActionType.Change, value: targetValue(e)})
}

export const init = () => ''

export const update = (action, model) => {
  switch (action.type) {
    case ActionType.Submit:
      return ''

    case ActionType.Change:
      return action.value

    default:
      return model
  }
}

export const view = (signal, model) => (
  <div>
    <input type="text" value={model} onChange={message(signal, Action.Change)}/>
    <button disabled={model.trim().length < 1}
            onClick={signal(Action.Submit)}>Add</button>
  </div>
)
