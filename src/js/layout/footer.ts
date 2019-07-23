// import { easing, tween, ColdSubscription } from 'popmotion';
import { eventBus, config } from '../core';
import { documentOffset } from '../utilities';

class Footer {
  element: HTMLElement;
  wrapper: HTMLElement;
  // animation: ColdSubscription;

  constructor() {}

  init(element: HTMLElement, wrapper: HTMLElement) {
    this.element = element;
    this.wrapper = wrapper;

    this.wrapper.style.minHeight = this.element.clientHeight + 'px';

    this.addEventListeners();
  }

  pin() {
    this.element.classList.add('pinned');
    this.element.style.position = 'fixed';
    this.element.style.bottom = '0';
  }

  unpin() {
    this.element.classList.remove('pinned');
    this.element.removeAttribute('style');
  }

  slideIn() {
    console.log('slideIn(): add anime.js animation')
  }

  slideOut() {
    console.log('slideOut(): add anime.js animation')
  }

  addEventListeners() {
    eventBus.$on('toggle-footer', (event) => {
      // return if it's already animating
      if (this.element.classList.contains('animating')) {
        return;
      }

      if (this.element.classList.contains('pinned')) {
        this.slideOut();
      } else {
        this.slideIn();
      }
    });

    eventBus.$on('scrolled-to-bottom', (event) => {
      this.unpin()
    })
  }
}

export const footer = new Footer();
