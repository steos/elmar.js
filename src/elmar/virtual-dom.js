import diff from 'virtual-dom/diff'
import patch from 'virtual-dom/patch'
import createElement from 'virtual-dom/create-element'
import {runEffects} from './elmar'

export {init as startApp, initSimple as start} from './elmar'

export default ({model, effects, update, view}, parent) => {
  let state = model
  let tree = null
  let root = null
  const signal = action => () => {
    const [nextModel, effects] = update(action, state)
    state = nextModel
    const newTree = view(signal, state)
    root = patch(root, diff(tree, newTree))
    tree = newTree
    runEffects(signal, effects)
  }
  tree = view(signal, state)
  root = createElement(tree)
  parent.appendChild(root)
  runEffects(signal, effects)
}
