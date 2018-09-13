import Vue from 'vue'
import VueRouter from 'vue-router'
import Bar from './app/bar'
import Foo from './app/foo'
Vue.use(VueRouter)

let app = new Vue({
  data: {
    message: 'Hello Vue.js!',
    cmp: 'Foo'
  },
  template: `<div style="position:absolute;top:0;bottom:0;left:0;right:0;">
              this is App!!!!
              <br/>
              <br/>
              <router-link tag="div" to="/bar">
                <a>install other app</a>
              </router-link><br/><br/>
              <router-view></router-view>
              <br/>
              <br/>
             </div>`,
  router: new VueRouter({
    routes: [
      { path: '/foo', component: Foo },
      { path: '/bar', component: Bar }
    ]
  }),
  components: {
    Foo,
    Bar
  }
})

app.$mount('#content')
export default app