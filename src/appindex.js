import Vue from 'vue'
import VueRouter from 'vue-router'
import Bar from './other/bar'
import Foo from './other/foo'
Vue.use(VueRouter)

let app = new Vue({
  data: {
    message: 'Hello Vue.js!',
    cmp: 'Foo'
  },
  template: `<div style="position:absolute;top:0;bottom:0;left:0;right:0;">
              <div :is = "cmp"></div>
              this is otherApp!!!!<br/><br/>
              <router-view></router-view><br/><br/>
              <router-link tag="div" to="/foo">
                <a>/foo</a>
              </router-link><br/><br/>
              <router-link tag="div" to="/bar">
                <a>/bar</a>
              </router-link><br/><br/>
              <router-link tag="div" to="/cc">
                <a>/cc</a>
              </router-link>
             </div>`,
  router: new VueRouter({
    routes: [
      { path: '/footh', component: Foo },
      { path: '/barth', component: Bar }
    ]
  }),
  components: {
    Foo,
    Bar
  }
})

app.$mount('#content')
export default app