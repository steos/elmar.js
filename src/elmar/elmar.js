export const compose2 = (f, g) => (...xs) => f(g(...xs))

const wrapSimple = x => [x, []]

export const init = ({init, update, view}, ...args) => {
  const [model, effects] = init(...args)
  return {model, effects, update, view}
}

export const simple = component => ({
  ...component,
  init: compose2(wrapSimple, component.init),
  update: compose2(wrapSimple, component.update)
})

export const initSimple = (component, ...args) => init(simple(component), ...args)

export const forward = (signal, f) => a => signal(f(a))

export const targetValue = e => e.target.value

export const message = (signal, f) => e => signal(f(e))()

export const mapEffect = (f, effect) => () => effect().then(x => f(x))

export const mapEffects = (f, effects) => effects.map(fx => mapEffect(f, fx))

export const runEffects = (signal, fx) => fx.forEach(e => e().then(a => signal(a)()))

const animate = () => new Promise(resolve => requestAnimationFrame(t => resolve(t)))

export const tickEffect = a => () => animate().then(t => model => a(t, model))
