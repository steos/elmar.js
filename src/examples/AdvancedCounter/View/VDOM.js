import h from 'virtual-dom/h'
import {Action} from '../Model'

export default (signal, model) =>
  h('div', [
    h('button', {onclick: signal(Action.Decrement)}, ['-']),
    h('div', [model]),
    h('button', {onclick: signal(Action.Increment)}, ['+']),
  ])
