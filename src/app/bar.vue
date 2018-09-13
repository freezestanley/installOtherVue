<template>
  <div class="sign">
    this bar
    <router-link tag="div" to="/cc">
      <a>/cc</a>
    </router-link><br/><br/>
    <div :is="cmp"></div>
  </div>
</template>
<script>
import Vue from 'vue'
import CC from './cc'
Vue.component('tab-home', {
  template: '<div>Home component</div>'
})
export default {
  data () {
    return {
      cmp: 'tab-home'
    }
  },
  name: "bar",
  created () {
    var _this = this
    this.$router.addRoutes([{ path: '/cc', component: CC }])
    var runtime = document.createElement('script')
    runtime.src = '../otherapp/dist/runtimeChunk.js'
    document.body.appendChild(runtime)
    runtime.onload = function () {
      var vendor = document.createElement('script')
      vendor.src = '../otherapp/dist/vendors.js'
      document.body.appendChild(vendor)
      vendor.onload = function () {
        var application = document.createElement('script')
        application.src = '../otherapp/dist/application.js'
        document.body.appendChild(application)
        application.onload = function () {
          Vue.component('otherapp', window.application.default)
          _this.cmp = 'otherapp'
        }
      }
    }
    console.log('this is created')
  },
  mounted () {
  },
  props: {
  },
  components: {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
</style>
