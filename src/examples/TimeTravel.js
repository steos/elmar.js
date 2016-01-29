import R from 'ramda'
import React from 'react'
import {forward, mapEffects, message, targetValue} from '../elmar'

const init = component => (...args) => {
  const [model, effects] = component.init(...args)
  return [{
    component: model,
    lastAction: performance.now(),
    history: [],
    future: [],
    time: 0,
    realtime: false,
    speed: 200
  }, mapEffects(Action.UpdateComponent(component), effects)]
}

const timeDelta = start => {
  const now = performance.now()
  return [now, now - start]
}

const Action = {
  UpdateComponent: component => action => model => {
    const [componentModel, effects] = component.update(action, model.component)
    const [now, elapsed] = timeDelta(model.lastAction)
    return [{...model,
      component: componentModel,
      history: R.append([elapsed, model.component], model.history),
      future: [],
      lastAction: now,
    }, mapEffects(Action.UpdateComponent(component), effects)]
  },
  Undo: model => {
    const [time, component] = R.last(model.history)
    return [{...model,
      component,
      time,
      future: R.append([model.time, model.component], model.future),
      history: R.dropLast(1, model.history),
      lastAction: performance.now()
    }, []]
  },
  Redo: model => {
    const [time, component] = R.last(model.future)
    return [{...model,
      component,
      time,
      future: R.dropLast(1, model.future),
      history: R.append([model.time, model.component], model.history),
      lastAction: performance.now()
    }, []]
  },
  Rewind: model => {
    const [time, component] = R.head(model.history)
    return [{...model,
      component,
      time,
      future: model.future.concat([[model.time, model.component]], R.drop(1, model.history).reverse()),
      history: [],
      lastAction: performance.now()
    }, []]
  },
  Replay: model => {
    if (model.future.length > 0) {
      const nextModel = R.head(update(Action.Redo, model))
      return [
        nextModel,
        [delayAction(Action.Replay, model.realtime ? nextModel.time : model.speed)]
      ]
    } else {
      return [model, []]
    }
  },
  ToggleRealtime: model => [{...model,
      lastAction: performance.now(),
      realtime: !model.realtime
    }, []],
  ChangeSpeed: value => model => [{...model,
      lastAction: performance.now(),
      speed: Math.max(100, Math.min(1000, parseInt(value, 10)))
    }, []]
}

const delayAction = (action, delay) => () =>
  new Promise(resolve => setTimeout(() => resolve(action), delay))

const update = (action, model) => action(model)

const view = component => (signal, model) => (
  <div>
    <div style={{background:'#ccc', padding:'.2em'}}>
      <strong>TimeTravelContainer</strong>
      <div>
        <button disabled={model.history.length < 1} onClick={signal(Action.Undo)}>Undo</button>
        <button disabled={model.future.length < 1} onClick={signal(Action.Redo)}>Redo</button>
        <button disabled={model.future.length < 1} onClick={signal(Action.Replay)}>Replay</button>
        <button disabled={model.history.length < 1} onClick={signal(Action.Rewind)}>Rewind</button>
        <label>Speed:</label>
        <input type="number" min="100" max="1000" step="100"
               value={model.realtime ? model.time : model.speed}
               disabled={model.realtime}
               onChange={message(signal, R.compose(Action.ChangeSpeed, targetValue))}/>
        <span>ms</span>
        <input type="checkbox"
               checked={model.realtime}
               onChange={signal(Action.ToggleRealtime)}/>
        <label>Realtime</label>
      </div>
    </div>
    <table width="100%" style={{borderSpacing:2}}>
      <tbody>
        <tr>
          <td width="50%" style={{border:'2px solid #999', verticalAlign:'top'}}>
            {component.view(forward(signal, Action.UpdateComponent(component)), model.component)}
          </td>
          <td style={{border:'2px solid #999', verticalAlign:'top'}}>
            <textarea spellCheck={false}
                      autoComplete={false}
                      rows={10}
                      value={JSON.stringify(model.component)}
                      readOnly={true}
                      style={{width:'99%', border:0}}/>
          </td>
        </tr>
      </tbody>
      </table>
  </div>
)

export default component => ({
  init: init(component),
  update,
  view: view(component)
})
