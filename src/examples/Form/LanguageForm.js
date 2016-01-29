import React from 'react'

const languages = ['Clojure', 'Haskell', 'Elm', 'PureScript', 'Pixie', 'Agda', 'Idris']

export const init = (langs = []) => langs

export const update = (action, model) => action(model)

const Toggle = lang => model => model.indexOf(lang) === -1
  ? model.concat(lang)
  : model.filter(elem => elem !== lang)

export const isValid = model => model.length > 0

const viewLang = (signal, model) => (lang, index) => (
  <div key={index}>
    <input type="checkbox"
           checked={model.indexOf(lang) !== -1}
           onChange={signal(Toggle(lang))}/>
    <label>{lang}</label>
  </div>
)

const viewError = model =>
  !isValid(model)
    ? <p style={{color:'red'}}>Choose at least one.</p>
    : null

export const view = (signal, model) => (
  <div>
    {languages.map(viewLang(signal, model))}
    {viewError(model)}
  </div>
)

export default {init, update, view, isValid}
