import React from 'react'
import * as CounterPair from './CounterPair'
import {forward} from '../elmar'

const Action = {
  Reset: model => init(),

  Left: (action) => model =>
    Object.assign({}, model, {left: CounterPair.update(action, model.left)}),

  Right: (action) => model =>
    Object.assign({}, model, {right: CounterPair.update(action, model.right)}),
}

export const init = () => ({
  left: CounterPair.init(0, 0),
  right: CounterPair.init(0, 0)
})

export const update = (action, model) => action(model)

export const view = (signal, model) => (
  <div>
    <div style={{float:'left'}}>
      {CounterPair.view(forward(signal, Action.Left), model.left)}
    </div>
    <div>
      {CounterPair.view(forward(signal, Action.Right), model.right)}
    </div>
    <button onClick={signal(Action.Reset)}>Reset Pairs</button>
  </div>
)

export default {init, update, view}
