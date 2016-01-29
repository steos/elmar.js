import React from 'react'
import Counter from './SimpleCounter'
import {forward} from '../elmar'

const Action = {
  Reset: model => init(0, 0),
  Top: (action) => model => Object.assign({}, model, {top: Counter.update(action, model.top)}),
  Bottom: (action) => model => Object.assign({}, model, {bottom: Counter.update(action, model.bottom)}),
}

export const init = (top, bottom) => ({
  top: Counter.init(top),
  bottom: Counter.init(bottom)
})

export const update = (action, model) => action(model)

export const view = (signal, model) => (
  <div>
    {Counter.view(forward(signal, Action.Top), model.top)}
    {Counter.view(forward(signal, Action.Bottom), model.bottom)}
    <button onClick={signal(Action.Reset)}>Reset</button>
  </div>
)

export default {init, update, view}
