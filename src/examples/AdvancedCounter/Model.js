export const Action = {
  Increment: x => x + 1,
  Decrement: x => x - 1
}

export const init = (count) => count

export const update = (action, model) => action(model)

export default {init, update, Action}
