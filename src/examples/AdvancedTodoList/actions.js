import {ActionType} from './constants'

export default {
  Form: formAction => ({type: ActionType.Form, formAction}),

  SetFilter: show => ({show, type: ActionType.SetFilter}),

  ToggleCompleted: id => ({id, type: ActionType.ToggleCompleted}),

  AddTodo: text => ({text, type: ActionType.AddTodo})
}
