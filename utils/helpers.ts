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

export function removeDuplicates (originalArray: Array<any>, objKey: string): Array<any> {
  const trimmedArray: Array<any> = []
  const values: Array<any> = []
  let value

  for (let i = 0; i < originalArray.length; i++) {
    value = originalArray[i][objKey]

    if (values.indexOf(value) === -1) {
      trimmedArray.push(originalArray[i])
      values.push(value)
    }
  }

  return trimmedArray
}

export function trimArray (arr: Array<any>, key: string): Array<any> {
  const values: object = {}
  return arr.filter(function (item: any) {
    const val: any = item[key]
    const exists: Boolean = !!values[val]
    values[val] = true
    return !exists
  })
}
