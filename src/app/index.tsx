import './css.config'
import { webFrame } from 'electron'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { cssRule } from 'typestyle'
import {store} from './store'
import {App} from './containers/App'


// Basic body style reset
cssRule('html, body, #coglite-app-root', {
  height: '100%',
  width: '100%',
  padding: 0,
  margin: 0,
  // Disable text selection
  '-webkit-user-select': 'none'
})

// Disable zoom
webFrame.setVisualZoomLevelLimits(1.0, 1.0)


ReactDOM.render(<App store={store}/>, document.getElementById('coglite-app-root'));

