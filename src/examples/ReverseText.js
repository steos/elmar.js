import R from 'ramda'
import React from 'react'
import {message, targetValue} from '../elmar'

export const init = () => ''

export const update = (newStr, oldStr) => newStr

export const view = (signal, model) => (
  <div>
    <input type="text"
           value={model}
           placeholder="enter text"
           onChange={message(signal, targetValue)} />
    <br/>
    <input type="text" disabled={true} readOnly={true} value={R.reverse(model)}/>
    <button onClick={signal('')}>Clear</button>
  </div>
)

export default {init, update, view}
