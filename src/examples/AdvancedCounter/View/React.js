import React from 'react'
import {Action} from '../Model'

export default (signal, model) => (
  <div>
    <button onClick={signal(Action.Decrement)}>-</button>
    <div>{model}</div>
    <button onClick={signal(Action.Increment)}>+</button>
  </div>
)
