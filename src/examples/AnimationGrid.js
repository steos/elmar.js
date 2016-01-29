import R from 'ramda'
import React from 'react'
import easing from 'easing-js'
import Animation from './Animation'
import {mapEffects, mapEffect, forward, targetValue, message} from '../elmar'
import {pure} from '../elmar/react'

const randomInt = max => () => (Math.random() * max) | 0

const randomColor = () => 'rgb('+R.times(randomInt(255), 3).join(',')+')'

const easings = Object.keys(easing).filter(
  // can only use easing funcs with arity 4 and the -Expo funcs seem broken
  name => easing[name].length === 4 && R.takeLast(4, name) !== 'Expo'
)

const randomEasing = () => {
  const index = randomInt(easings.length - 1)
  return easing[easings[index()]]
}

const initAnimation = () => R.head(Animation.init(randomColor(), randomEasing()))

const initGrid = R.times(initAnimation)

const Action = {
  Cell: index => action => model => {
    const [cell, effects] = Animation.update(action, model.grid[index])
    return [
      {...model, grid: R.update(index, cell, model.grid)},
      mapEffects(Action.Cell(index), effects)
    ]
  },
  Resize: size => model =>
    [size == model.size ? model : ({...model, size, grid: initGrid(size*size)}), []],

  SpinAll: model => {
    return [model, R.flatten(model.grid.map((cell, index) =>
      mapEffects(Action.Cell(index), R.nth(1, Animation.update(Animation.Action.Spin, cell)))))]
  }

}

export const init = (size = 2) => [{
  size,
  grid: initGrid(size*size),
}, []]

export const update = (action, model) => action(model)

const viewCell = (signal, model) => (
  <div style={{display:'inline'}}>
    {Animation.view(signal, model)}
  </div>
)

const toInt = x => parseInt(x, 10)

export const view = (signal, model) => (
  <div>
    <input type="number"
           min="2"
           max="6"
           value={model.size}
           onChange={message(signal, R.compose(Action.Resize, toInt, targetValue))}/>
    <button onClick={signal(Action.SpinAll)}>Spin All</button>
    <div style={{width: (model.size * 150) + 'px'}}>
      {model.grid.map((cell, index) =>
        pure({key: index, model: cell, view: viewCell,
          signal: forward(signal, Action.Cell(index))}))}
    </div>
  </div>
)

export default {init, update, view}
