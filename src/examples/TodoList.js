import R from 'ramda'
import React from 'react'
import {message, targetValue, forward} from '../elmar'
import Todo from './Todo'

const Form = {
  Action: {
    Submit: x => '',
    Change: e => _ => targetValue(e)
  },
  init: () => '',
  update: (action, model) => action(model),
  view: (signal, model) => (
    <div>
      <input type="text" value={model} onChange={message(signal, Form.Action.Change)}/>
      <button disabled={model.trim().length < 1}
              onClick={signal(Form.Action.Submit)}>Add</button>
    </div>
  )
}

const FilterAll = 'All'
const FilterCompleted = 'Completed'
const FilterActive = 'Active'

const Filter = {
  [FilterAll]: _ => true,
  [FilterCompleted]: x => x.completed,
  [FilterActive]: x => !x.completed
}

const Action = {
  Form: action => model => {
    const newTodo =
      action === Form.Action.Submit
        ? Todo.create(model.nextId, model.form)
        : null
    const form = Form.update(action, model.form)
    return ({
      ...model,
      form,
      nextId: newTodo ? model.nextId + 1 : model.nextId,
      todos: newTodo ? R.append(newTodo, model.todos) : model.todos
    })
  },

  SetFilter: filter => model => ({...model, filter: filter}),

  ToggleCompleted: id => model => ({
    ...model,
    todos: R.adjust(
      Todo.toggleCompleted,
      R.findIndex(R.propEq('id', id), model.todos),
      model.todos
    )
  })

}

export const init = () => (
  { todos: []
  , filter: FilterAll
  , nextId: 1
  , form: Form.init()
  }
)

export const update = (action, model) => action(model)

const todoStyle = todo => ({
  textDecoration: todo.completed ? 'line-through' : 'none',
  cursor: 'pointer'
})

const viewTodo = (signal, todo) => (
  <li key={todo.id}>
    <span onClick={signal(Action.ToggleCompleted(todo.id))}
          style={todoStyle(todo)}>{todo.text}</span>
  </li>
)

export const view = (signal, model) => (
  <div>
    {Form.view(forward(signal, Action.Form), model.form)}
    <ul>{model.todos.filter(Filter[model.filter]).map(R.partial(viewTodo, [signal]))}</ul>
    <p>
      <button onClick={signal(Action.SetFilter(FilterAll))}>Show All</button>
      <br/>
      <button onClick={signal(Action.SetFilter(FilterActive))}>Show Active</button>
      <br/>
      <button onClick={signal(Action.SetFilter(FilterCompleted))}>Show Completed</button>
    </p>
  </div>
)

export default {init, update, view}
