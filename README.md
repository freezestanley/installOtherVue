# installOtherVue demo

````
installOtherVue demo
````
>> 1.this.$router.addRoutes([{ path: '/cc', component: CC }])
动态加载路由

>> 2.将项目发布成umd 
> 在项目内加载其他项目的打包js 
> umd 会在window 上挂载对应vue 对象
> 通过 Vue.component() 注册成全局
> 通过组建:is 来唤起组建
``````````````````````
let app = new Vue({
  data: {
    message: 'this is template',
  },
  template: `<div>this is template!!!!</div>`,
  router: new VueRouter({
    routes: [
      { path: '/foo', component: Foo },
    ]
  }),
  components: {
    Foo
  }
})

app.$mount('#content')
export default app
``````````````````````

> 打包的名不能重复
> 路由不能重复
