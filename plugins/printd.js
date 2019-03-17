import { Printd } from 'printd'

export default (app, inject) => {
  const d = new Printd()
  inject('d', d)
}