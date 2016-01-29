import React from 'react'
import Counter from './SimpleCounter'
import {forward} from '../elmar'
import {Map, List} from 'immutable'

export const init = () => ({counters: List(), nextId: 0})

const Action = {
  Insert(model) {
    const id = model.nextId + 1
    return {nextId: id, counters: model.counters.push({id, model: Counter.init(0)})}
  },

  Remove(model) {
    return {...model, counters: model.counters.pop()}
  },

  Modify: (index) => (counterAction) => (model) => {
    const update = counter => ({...counter, model: Counter.update(counterAction, counter.model)})
    return {...model, counters: model.counters.update(index, update)}
  }
}

export const update = (action, model) => action(model)

const viewCounter = (signal, {id, model}, index) =>
  <div key={id}>{Counter.view(forward(signal, Action.Modify(index)), model)}</div>

export const view = (signal, model) => (
  <div>
    <button onClick={signal(Action.Remove)}>Remove</button>
    <button onClick={signal(Action.Insert)}>Insert</button>
    {model.counters.map(viewCounter.bind(null, signal))}
  </div>
)

export default {init, update, view}
