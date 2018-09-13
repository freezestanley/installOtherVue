<!--
/*
 * name: Vue Multiple Character Sign
 * props: 
 *   name      type     default    
 *   txt      String     ''      传人被抄写文字  
 *   drawW    Number     200     签字画布宽
 *   drawH    Number     200     签字画布高
 *  wordWrap  Number     10      签字后生成的图片当行文字数
 *  cancelTxt String    返回      返回上一步按钮文字
 *  submitTxt String    确定      签字完成后提交按钮文字
 * event:
 *   name       param
 *  submit   imagebase64          签字完成后点击提交,将生成的图片base64传出
 *  cancel                        点击返回上一步按钮,放弃签名
 */
-->
<template>
  <div class="sign">
    this foo
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  name: "foo",
  created () {
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
