
import React from 'react'
import {easeOutBounce} from 'easing-js'
import {tickEffect} from '../elmar'

export const init = (color = '#60B5CC', ease = easeOutBounce) =>
  [{angle: 0, anim: null, color, ease}, []]

const duration = 1000

const rotateStep = 90

export const Action = {
  Spin: model => model.anim
    ? [model, []]
    : [model, [tickEffect(Action.Tick)]],

  Tick: (time, model) => {
    const elapsed = model.anim
      ? model.anim.elapsed + (time - model.anim.time)
      : 0
    if (elapsed > duration) {
      return [{...model, angle: model.angle + rotateStep, anim: null}, []]
    } else {
      return [{...model, angle: model.angle, anim: {elapsed, time}}, [tickEffect(Action.Tick)]]
    }
  }

}

const update = (action, model) => action(model)

const toOffset = (anim, ease) =>
  anim ? ease(anim.elapsed, 0, rotateStep, duration) : 0

const transform = ({angle, anim, ease}) =>
  'translate(100, 100) rotate('+(angle + toOffset(anim, ease))+')'

const view = (signal, model) => (
  <svg width="150" height="150" viewBox="0 0 200 200" style={{cursor:'pointer'}}>
    <g transform={transform(model)}
       onClick={signal(Action.Spin)}>
       <rect x="-75" y="-75"
             width="150" height="150"
             rx="15" ry="15"
             style={{fill: model.color}}/>
       <text fill="white" style={{fontSize:'1.5em'}} textAnchor="middle">Click me!</text>
    </g>
  </svg>
)

export default {init, update, view, Action}
