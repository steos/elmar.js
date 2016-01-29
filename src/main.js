import {render} from 'react-dom'
import {simple} from './elmar'
import {start, startApp} from './elmar/react'
import renderVDOM, {start as startVDOM} from './elmar/virtual-dom'

import Counter from './examples/SimpleCounter'
import AdvancedCounter from './examples/AdvancedCounter'
import CounterPair from './examples/CounterPair'
import CounterPairPair from './examples/CounterPairPair'
import CounterList from './examples/CounterList'
import ReverseText from './examples/ReverseText'
import RandomGifViewer from './examples/RandomGifViewer'
import TodoList from './examples/TodoList'
import RandomGifList from './examples/RandomGifList'
import TimeTravel from './examples/TimeTravel'
import AdvancedTodoList from './examples/AdvancedTodoList'
import Animation from './examples/Animation'
import AnimationGrid from './examples/AnimationGrid'
import Form from './examples/Form'

render(start(Counter, 7), window.mountSimpleCounter)

render(start(AdvancedCounter.React, 1), window.mountAdvanced)

renderVDOM(startVDOM(AdvancedCounter.VDOM, 3), window.mountAdvancedVDOM)

render(start(CounterPair, 1, 2), window.mountPair)
render(start(CounterPairPair), window.mountPairPair)
render(start(CounterList), window.mountList)
render(start(ReverseText), window.mountReverseText)
render(startApp(RandomGifViewer, 'funny dogs'), window.mountRandomGif)
render(startApp(TimeTravel(simple(TodoList))), window.mountTodoList)
render(startApp(TimeTravel(RandomGifList)), window.mountGifList)
render(startApp(TimeTravel(TimeTravel(simple(AdvancedTodoList)))), window.mountAdvancedTodoList)

render(startApp(Animation), window.mountAnimation)

render(startApp(AnimationGrid, 3), window.mountAnimationGrid)

render(start(Form), window.mountForm)
