
export const toggleCompleted = todo =>
  ({...todo, completed: !todo.completed})

export const create = (id, text) => ({
  id,
  text,
  completed: false
})

export default {toggleCompleted, create}
