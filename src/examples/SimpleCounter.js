import React from 'react'

export const init = count => count

const Action = {
  Increment: x => x + 1,
  Decrement: x => x - 1
}

export const update = (action, model) => action(model)

export const view = (signal, model) => (
  <div>
    <button onClick={signal(Action.Decrement)}>-</button>
    <div>{model}</div>
    <button onClick={signal(Action.Increment)}>+</button>
  </div>
)

export default {init, update, view}
