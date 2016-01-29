import R from 'ramda'
import React from 'react'
import {view as viewForm} from './Form'
import {Show} from './constants'
import {Form as UpdateForm, SetFilter, ToggleCompleted} from './actions'
import {forward} from '../../elmar'

const filters = {
  [Show.All]: _ => true,
  [Show.Active]: x => !x.completed,
  [Show.Completed]: x => x.completed
}

const todoStyle = todo => ({
  textDecoration: todo.completed ? 'line-through' : 'none',
  cursor: 'pointer'
})

const viewTodo = (signal, todo) => (
  <li key={todo.id}>
    <span onClick={signal(ToggleCompleted(todo.id))}
          style={todoStyle(todo)}>{todo.text}</span>
  </li>
)

export default (signal, model) => (
  <div>
    {viewForm(forward(signal, UpdateForm), model.form)}
    <ul>{model.todos.filter(filters[model.show]).map(R.partial(viewTodo, [signal]))}</ul>
    <p>
      <button onClick={signal(SetFilter(Show.All))}>Show All</button>
      <br/>
      <button onClick={signal(SetFilter(Show.Active))}>Show Active</button>
      <br/>
      <button onClick={signal(SetFilter(Show.Completed))}>Show Completed</button>
    </p>
  </div>
)
