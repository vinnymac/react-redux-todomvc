import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import 'todomvc-app-css/index.css'

import App from './App'
import reducers from './reducers'

const store = createStore(reducers)

render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root')
)
