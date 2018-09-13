<template>
  <div class="sign_txt">
    <span v-for="(item, index) in txt" :class="[index <= idx ? 'seled' : '']" :key='index'>
      {{item}}
    </span>
  </div>
</template>
<script>
export default {
  name: "sign_txt",
  watch: {
    idx: function (newValue, oldValue) {
      this.$emit('update:font', this.txt[newValue])
    }
  },
  props: {
    txt: {
      type: String,
      default: ''
    },
    idx: {
      type: Number,
      default: 0
    },
    font: {
      type: String
    }
  }
}
</script>
<style lang="less" scoped>
.sign_txt {
  margin: 10px;
  & > span {
    &.seled{
      color: #f00;
    }
    font-size: 16px;
  }
}
</style>