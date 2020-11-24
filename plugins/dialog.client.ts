import Vue from 'vue'
import dialogBase from '@/components/common/dialog.vue'

const dialogConstructor = Vue.extend(dialogBase)

// dialogConstructor.prototype.close = function () {
//   this.isVisible = false
// }

const dialog: any = (params: any = {}) => {
  // eslint-disable-next-line new-cap
  const instance = new dialogConstructor()
  params.title && (instance.$data.title = params.title)
  params.text && (instance.$data.text = params.text)
  params.success && (instance.$data.success = params.success)
  params.cancel && (instance.$data.cancel = params.cancel)
  params.bounce && (instance.$data.bounce = params.bounce)
  params.textCancel && (instance.$data.textCancel = params.textCancel)
  params.textSuccess && (instance.$data.textSuccess = params.textSuccess)
  params.input && (instance.$data.input = params.input)
  params.placeholder && (instance.$data.placeholder = params.placeholder)
  params.center && (instance.$data.center = params.center)
  params.code && (instance.$data.code = params.code)

  document.body.appendChild(instance.$mount().$el)

  Vue.nextTick(() => {
    instance.$data.isVisible = true
  })

  // setTimeout(() => {
  //   (instance as any).close()
  // }, 4000)
}

Vue.prototype.$dialog = dialog
