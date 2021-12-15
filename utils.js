const boom = (text) => {
  throw new Error(text)
}

const isType = (value, type) => Object.prototype.toString.call(value) === type

const isString = (value) => isType(value, "[object String]")
const isNumber = (value) => isType(value, "[object Number]")
const isBoolean = (value) => isType(value, "[object Boolean]")
const isObject = (value) => isType(value, "[object Object]")
const isArray = (value) => isType(value, "[object Array]")
const isFunction = (value) => isType(value, "[object Function]")

export default {
  boom,
  isString,
  isNumber,
  isBoolean,
  isObject,
  isArray,
  isFunction
}