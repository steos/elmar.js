import React from 'react'
import {runEffects, init, initSimple, compose2} from './elmar'

export class AppContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {model: props.model}
  }
  componentDidMount() {
    runEffects(this.signal.bind(this), this.props.effects)
  }
  signal(action) {
    return () => {
      const [model, effects] = this.props.update(action, this.state.model)
      this.setState({model})
      runEffects(this.signal.bind(this), effects)
    }
  }
  render() {
    return this.props.view(this.signal.bind(this), this.state.model)
  }
}

export class PureContainer extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.model !== this.props.model
  }
  render() {
    const {signal, model, view} = this.props
    return view(signal, model)
  }
}

export const pure = React.createFactory(PureContainer)

export const app = React.createFactory(AppContainer)

export const start = compose2(app, initSimple)

export const startApp = compose2(app, init)

export default app
