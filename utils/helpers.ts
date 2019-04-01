export function pick<T, K extends keyof T> (obj: T, ...keys: K[]): Pick<T, K> {
  const copy = {} as Pick<T, K>
  keys.forEach((key) => { copy[key] = obj[key] })
  return copy
}

export function isNumeric (n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

export function isPlainObject (obj: any): Boolean {
  return obj === Object(obj)
}

export function isEmptyObject (obj: object): Boolean {
  return isPlainObject(obj) && Object.getOwnPropertyNames(obj).length === 0
}
