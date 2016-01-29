import React from 'react'
import {message, targetValue, forward} from '../../elmar'
import LanguageForm from './LanguageForm'

const Action = {
  Update: (prop, f) => e => model =>
    ({...model, [prop]: f(e)}),

  LanguageForm: action => model =>
    ({...model, languages: LanguageForm.update(action, model.languages)})
}

const bind = (signal, model, prop, f = targetValue) =>
  ({value: model[prop], onChange: message(signal, Action.Update(prop, f))})

export const init = (person = {}) => ({
  firstName: person.firstName || '',
  lastName: person.lastName || '',
  languages: person.languages || []
})

export const update = (action, model) => action(model)

const isValid = model =>
     model.firstName.trim().length > 0
  && model.lastName.trim().length > 0
  && LanguageForm.isValid(model.languages)

export const view = (signal, model) => (
  <div>
    First Name: <input type="text" {...bind(signal, model, 'firstName')}/>
    Last Name: <input type="text" {...bind(signal, model, 'lastName')}/>
    {LanguageForm.view(forward(signal, Action.LanguageForm), model.languages)}
    <button disabled={!isValid(model)}>Save</button>
    <pre>{JSON.stringify(model)}</pre>
  </div>
)

export default {init, update, view}
