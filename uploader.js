import utils from './utils'
import xhr from './xhr'

export function Uploader(element, options) {
  const _defaultConfig = {
    name: 'file',
    disabled: false,
    headers: {},
    multiple: false,
    withCredentials: false,
  }
  const config = Object.assign({}, _defaultConfig, options)
  const { action, accept, name, disabled, headers, multiple, withCredentials, customRequest, onChange, onProgress, onSuccess, onError } = config

  /* 校验参数 */
  function _validate() {
    if (!(action && utils.isString(action))) utils.boom('action is not a string!')
    if (accept && !utils.isString(accept)) utils.boom('accept is not a string!')
    if (name && !utils.isString(name)) utils.boom('name is not a string!')
    if (disabled && !utils.isBoolean(disabled)) utils.boom('disabled is not a boolean!')
    if (headers && !utils.isObject(headers)) utils.boom('headers is not a object!')
    if (multiple && !utils.isBoolean(multiple)) utils.boom('multiple is not a boolean!')
    if (withCredentials && !utils.isBoolean(withCredentials)) utils.boom('withCredentials is not a boolean!')
    if (customRequest && !utils.isFunction(customRequest)) utils.boom('customRequest is not a function!')
    if (onChange && !utils.isFunction(onChange)) utils.boom('onChange is not a function!')
    if (onProgress && !utils.isFunction(onProgress)) utils.boom('onProgress is not a function!')
    if (onSuccess && !utils.isFunction(onSuccess)) utils.boom('onSuccess is not a function!')
    if (onError && !utils.isFunction(onError)) utils.boom('onError is not a function!')
  }

  /* 挂载节点 */
  function _attach(element) {
    const upload = document.createElement('input')
    upload.id = 'uploader'
    upload.style.display = 'none'
    upload.setAttribute('type', 'file')
    if (accept) upload.setAttribute('accept', accept)
    if (disabled) upload.setAttribute('disabled', disabled)
    if (multiple) upload.setAttribute('multiple', multiple)
    upload.addEventListener('change', (event) => _change(event))
    element.appendChild(upload)
    element.addEventListener('click', () => upload.click())
  }

  function _change(event) {
    const files = event.target.files
    if (!files) return
    let fileList = Array.prototype.slice.call(files)
    _uploadFiles(fileList)
    onChange(fileList)
  }

  function _uploadFiles(files) {
    if (customRequest) return customRequest(files)
    for (const file of files) {
      _upload(file)
    }
  }

  function _upload(file) {
    const options = {
      action,
      file,
      filename: name,
      headers,
      withCredentials,
      onProgress: (e) => {
        onProgress(e, file)
      },
      onSuccess: (e) => {
        onSuccess(e, file)
      },
      onError: (e) => {
        onError(e, file)
      },
    }
    xhr(options)
  }

  function _update(key, value, isSetAttribute) {
    if (config.hasOwnProperty(key)) config[key] = value
    _validate()
    if (isSetAttribute) {
      const upload = document.querySelector('#uploader')
      upload.setAttribute(key, value)
    }
  }

  try {
    _validate()
    _attach(element)
  } catch (error) {
    console.error(error)
  }

  return {
    /* 需要更新其他值另外添加 */
    get disabled() {
      return config.disabled
    },

    set disabled(value) {
      _update('disabled', value, true)
    },
  }
}
