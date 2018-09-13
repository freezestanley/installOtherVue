import Sign from './sign.vue'
import Vue from 'vue'

Vue.component('tab-home', {
  template: '<div>Home component</div>'
})
Vue.component('tab-posts', {
  template: '<div>Posts component</div>'
})
Vue.component('tab-archive', {
  template: '<div id="content">Archive component</div>'
})

new Vue({
  el: '#content',
  data: {
    message: 'Hello Vue.js!',
    cmp: 'tab-archive'
  },
  template: `<div>
              <div :is='cmp'></div>
              <div @click="changehandle">change</div>
             </div>`,
  methods: {
    changehandle () {
      var _this = this
      function loadjs () {
        var script = document.createElement('script')
        script.src = './otherapp.73a12d4.js'
        document.head.appendChild(script)
        script.onload = function () {
          debugger
          Vue.component('other', window.otherapp.default)
          _this.cmp = 'other'
        }
      }
      // this.cmp = 'sign'
      loadjs()
    }
  },
  components: {
  }
})
export default Sign