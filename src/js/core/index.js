import * as debounce from 'lodash/debounce'
import * as ScrollMagic from 'scrollmagic'
// 
import { config } from './config'
import { eventBus } from './event-bus'
import { scrollController } from './scroll-controller'

class Core {
  constructor() {

  }

  init() {
    this.addScrollScenes()
    this.addEventListeners()
  }

  addScrollScenes() {
    this.sceneScrolledTop = new ScrollMagic.Scene({
      offset: 20
    }).addTo(scrollController)
  
    this.sceneScrolledTop.on('enter', (event) => {
      eventBus.$emit('scrolled-from-top')
    })
  
    this.sceneScrolledTop.on('leave', (event) => {
      eventBus.$emit('scrolled-to-top')
    })

    this.sceneScrolledBottom = new ScrollMagic.Scene({
      offset: document.body.clientHeight - window.innerHeight
    }).addTo(scrollController)
  
    this.sceneScrolledBottom.on('enter', (event) => {
      eventBus.$emit('scrolled-to-bottom')
    })
  
    this.sceneScrolledBottom.on('leave', (event) => {
      eventBus.$emit('scrolled-from-bottom')
    })
  }

  addEventListeners() {
    eventBus.$once('init', () => {
      console.log('loaded')
    })
    
    window.addEventListener(
      'resize',
      debounce((event) => {
        eventBus.$emit('window-resized', event)
      }, 400)
    )
    if (document.readyState === "complete") {
      eventBus.$emit('init', event)
      console.log('already loaded')
    } else {
      console.log('loading...')
      window.addEventListener('DOMContentLoaded', (event) => {
        eventBus.$emit('init', event)
      })
    }
  }
}

const core = new Core()

export { core, config, eventBus, scrollController }
