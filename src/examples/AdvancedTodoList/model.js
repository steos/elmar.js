import R from 'ramda'
import {Show, ActionType} from './constants'
import {AddTodo} from './actions'
import Todo from '../Todo'
import { ActionType as FormActionType
       , update as updateForm
       , init as initForm
       } from './Form'

export const init = () => (
  { todos: []
  , show: Show.All
  , nextId: 1
  , form: initForm()
  }
)

const actionHandlers = {
  [ActionType.SetFilter]: ({show}, model) => ({...model, show}),

  [ActionType.ToggleCompleted]: ({id}, model) => ({
    ...model,
    todos: R.adjust(
      Todo.toggleCompleted,
      R.findIndex(R.propEq('id', id), model.todos),
      model.todos
    )
  }),

  [ActionType.AddTodo]: (_, model) => ({
    ...model,
    nextId: model.nextId + 1,
    todos: R.append(Todo.create(model.nextId, model.form), model.todos)
  }),

  [ActionType.Form]: ({formAction}, model) =>
    formAction.type === FormActionType.Submit
      ? {...update(AddTodo(model.form), model),
          form: updateForm(formAction, model.form)}
      : {...model, form: updateForm(formAction, model.form)}

}

export const update = (action, model) => actionHandlers[action.type](action, model)
