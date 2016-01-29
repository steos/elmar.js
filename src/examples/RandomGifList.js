import R from 'ramda'
import React from 'react'
import {message, targetValue, forward, mapEffects} from '../elmar'
import * as RandomGif from './RandomGifViewer'

const Action = {
  Topic: e => model => [{...model, topic: targetValue(e)}, []],
  Add: model => {
    const [gifModel, effects] = RandomGif.init(model.topic.trim())
    return [
      {...model, topic: '', gifList: [...model.gifList, gifModel]},
      mapEffects(Action.Gif(model.gifList.length), effects)
    ]
  },
  Gif: index => action => model => {
    const [gifModel, effects] = RandomGif.update(action, model.gifList[index])
    return [
      {...model, gifList: R.update(index, gifModel, model.gifList)},
      mapEffects(Action.Gif(index), effects)
    ]
  }
}

export const init = () => [{topic: '', gifList: []}, []]

export const update = (action, model) => action(model)

const viewRandomGif = (signal, model, index) => (
  <div key={index} style={{float:'left'}}>
  {RandomGif.view(forward(signal, Action.Gif(index)), model)}
  </div>
)

export const view = (signal, model) => (
  <div>
  <input type="text" value={model.topic} onChange={message(signal, Action.Topic)}/>
  <button onClick={signal(Action.Add)} disabled={model.topic.trim().length < 1}>Add</button>
  <br/>
  {model.gifList.map(viewRandomGif.bind(null, signal))}
  </div>
)

export default {init, update, view}
