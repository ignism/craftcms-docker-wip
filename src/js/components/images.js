import * as objectFitImages from 'object-fit-images'
import { eventBus } from '../core'

eventBus.$once('init', () => {
  objectFitImages()
})