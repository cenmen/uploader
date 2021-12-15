## 概述
满足小众场景的简单 upload 组件，极其适合HTML上使用，源码简单易读，可使用 dist/uploader.js 的打包的文件(可参考 demo.html)，或者拷贝主目录下的 uploader.js, utils.js, xhr.js 到你自己的工程目录下使用或进行二次开发。

## API
| Field              | Type                                 | Default              | Description                              |
| ------------------ | ------------------------------------ | ---------------------| ---------------------------------------- |
| `action`           | `string`                             | `-`                  | 上传的地址 |
| `accept?`          | `string`                             | `-`                  | 接受上传的文件类型 |
| `name?`            | `string`                             | `file`               | 上传的文件字段名 |
| `disabled?`        | `boolean`                            | `false`              | 是否禁用 |
| `headers?`         | `object`                             | `{}`                 | 设置上传的请求头部 |
| `multiple?`        | `boolean`                            | `false`              | 是否支持多选文件 |
| `withCredentials?` | `boolean`                            | `false`              | 上传请求时是否携带 cookie |
| `customRequest?`   | `function (files)`                   | `-`                  | 自定义自己的上传实现 |
| `onChange?`        | `function (e, file)`                 | `-`                  | 上传文件改变时的状态 |
| `onProgress?`      | `function (e, file)`                 | `-`                  | 文件上传进度 |
| `onSuccess?`       | `function (e, file)`                 | `-`                  | 文件上传成功回调 |
| `onError?`         | `function (e, file)`                 | `-`                  | 文件上传失败回调 |

## 使用
```javascript
const upload = new uploader.Uploader(document.querySelector('#upload'), {
  action: 'http://localhost:2000/upload',
  // name: 'custom',
  accept: '.jpeg,.png,.mp4',
  multiple: true,
  headers: { 'x-custom': 'custom' },
  onChange: (files) => console.log('==> onChange', files),
  onProgress: (e, file) => console.log('==> onProgress', e, file),
  onSuccess: (e, file) => console.log('==> onSuccess', e, file),
  onError: (e, file) => console.log('==> onError', e, file),
})
console.log(upload.disabled); // false
upload.disabled = true
console.log(upload.disabled); // true
```
## 写在最后
喜欢的可以点个 star✨，谢谢！