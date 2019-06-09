import { Dictionary } from '@/types';

export function isScalar (value: any) {
  if (value === null) {
    return true
  }

  return /string|number|boolean|undefined/.test(typeof value)
}

export const Objects = Object.freeze({
  equals (o1: Dictionary, o2: Dictionary) {
    if (isScalar(o1)) {
      return o1 === o2
    }

    const keys1 = Object.keys(o1)

    if (keys1.length !== Object.keys(o2).length) {
      return false
    }

    return !keys1.some((key) => !o2.hasOwnProperty(key) || o1[key] !== o2[key])
  },

  assign (dest: Dictionary, src: Dictionary) {
    Object.keys(src).forEach((key) => {
      const value = src[key]

      if (isScalar(value)) {
        dest[key] = value
      } else if (value instanceof Array) {
        dest[key] = [ ...value ]
      } else if (value instanceof Function) {
        dest[key] = value
      } else {
        if (!dest[key]) {
          dest[key] = {}
        }

        this.assign(dest[key], value)
      }
    })

    return dest
  },

  clone (object: Dictionary) {
    return this.assign({}, object)
  },

  clear (object: Dictionary) {
    for (const key in object) {
      delete object[key];
    }
  },

  isEmpty (object: Dictionary) {
    for (const key in object) {
      return false
    }

    return true
  }
});
