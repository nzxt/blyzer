/* eslint-disable */
import { createDecorator, VueDecorator } from 'vue-class-component'
import { IAsyncComputedProperty } from 'vue-async-computed'

export function AsyncComputed<T> (
  computedOptions?: IAsyncComputedProperty<T>
): VueDecorator {
  return createDecorator((options, key) => {
    options.asyncComputed = options.asyncComputed || {}
    const method = options.methods![key]
        options.asyncComputed![key] = <IAsyncComputedProperty<T>>{
          get: method,
          ...computedOptions
        }
        delete options.methods![key]
  })
}
