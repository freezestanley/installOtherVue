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
    <!-- <img :src="asrc"/> -->
    <div class="sign_drawBox">
      <signtxt :txt = "txt" :idx = "txt_idx" :font.sync="font"/>
    </div>
    <div class="sign_drawTxt">
      <div class="sign_listBox">
        <div class="sign_drawElement" 
          v-for="(item, index) in signed"
          :style="{backgroundImage: 'url(' + item.data + ')'}" 
          :key='index'>
        </div>
      </div>
      <div class="sign_listDele"  @click="remove">
        <img src="./img/left-remove.png">
      </div>
    </div>
    <div class="sign_drawCanvas">
      <div class="sign_drawTable">
        <div class="sign_drawState">
          <div class="sign_drawAtom" :alt="font">
            <canvas id="canvas"/>
          </div>
          <div class="sign_drawtips">请在此签名</div>
        </div>
        <div class="sign_drawMenu">
          <div @click="clear" class="sign_drawMenuClear">
            <img src="./img/rewrite.png">
          </div>
          <div @click="decide" class="sign_drawMenuOk">
            <img src="./img/make-sure.png">
          </div>
        </div>
      </div>
    </div>
    <div class="sign_Menu">
      <div @click="back">{{cancelTxt}}</div>
      <div @click="submit">{{submitTxt}}</div>
    </div>
  </div>
</template>
<script>
import Draw from './lib/draw'
import signtxt from './signtxt'
import Zip from './lib/zip'
export default {
  data () {
    return {
      txt_idx: 0,
      font: '',
      signed: [],
      havepen: false,
      canvas: null,
      asrc: null
    }
  },
  name: "sign",
  created () {
    this.font = this.txt[this.txt_idx]
  },
  mounted () {
    this.canvas = new Draw('canvas', this.drawW, this.drawH, this.haspan)
    this.canvas.init()
  },
  props: {
    txt: {
      type: String,
      default: ''
    },
    drawW: {
      type: Number,
      default: 200
    },
    drawH: {
      type: Number,
      default: 200
    },
    wordWrap: {
      type: Number,
      default: 21
    },
    cancelTxt: {
      type: String,
      default: '返回'
    },
    submitTxt: {
      type: String,
      default: '确定'
    }
  },
  components: {
    signtxt
  },
  methods: {
    haspan: function (e) {
      this.havepen = e
    },
    clear: function () {
      this.havepen = false
      this.canvas.clear()
    },
    remove: function () {
      if (this.txt_idx <= 0) return
      this.signed.pop()
      this.txt_idx = this.txt_idx <= 0 ? 0 : this.txt_idx - 1
    },
    decide: function () {
      if (!this.havepen) {
        alert('请签字')
        return
      }
      if (this.txt_idx == this.txt.length) return
      this.txt_idx = this.txt_idx >= (this.txt.length - 1) ? this.txt_idx : this.txt_idx + 1
      var data = this.canvas.save()
      this.signed.push(data)
      this.clear()
    },
    submit () {
      this.txt_idx = 0
      var result = Draw.createMap(this.drawW, this.drawH, this.wordWrap, this.signed)
      this.asrc = result
    },
    back () {
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="less" scoped>
.sign {
  background:#dce0e4;
  // position: absolute;
  // top: 0;
  // left: 0;
  // right: 0;
  // bottom: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  .sign_drawBox{
    flex: 0;
    .sign_content{
      margin: 10px;
      & > span {
        &.seled{
          font-size: 18px;
          color: #f00;
        }
        font-size: 16px;
      }
    }
  }
  .sign_drawTxt{
    flex: 0;
    margin: 10px;
    position: relative;
    .sign_listBox{
      background: #efefef;
      border-radius: 5px;
      padding:3px;
      min-height: 100px;
      margin-right: 80px;
      overflow: hidden;
      overflow-y: auto;
      height: 8rem;
      .sign_drawElement{
        display: inline-block;
        width: 30px;
        height: 30px;
        background-size: 100% 100%;
      }
    }
    .sign_listDele{
      position: absolute;
      top: 0;
      right: 0;
      width: 70px;
      background: darkgray;
      color: #333;
      text-align: center;
      border-radius: 18px;
      img{
        width: 30px;
        height: 20px;
      }
    }
  }
  .sign_drawCanvas{
    flex: 1;
    .sign_drawTable{
      display:table;
      margin: 10px;
      .sign_drawMenu{
        display:table-cell;
        vertical-align: top;
        padding-left: 15px;
        .sign_drawMenuOk{
          background: dodgerblue;
          border-radius: 20px;
          border:1px solid transparent;
          color: #fff;
          display: block;
          padding: 2px 15px;
          img{
            width: 20px;
            height: 20px;
          }
        }
        .sign_drawMenuClear{
          background: orangered;
          border-radius: 20px;
          color: #fff;
          display: block;
          padding: 2px 15px;
          border:1px solid transparent;
          margin-top: 10px;
          margin-bottom: 15px;
          img{
            width: 20px;
            height: 20px;
          }
        }
      }
      .sign_drawState{
        display:table-cell;
        vertical-align: top;
        .sign_drawtips{
          color: #333;
          text-align: center;
        }
        .sign_drawAtom{
          position: relative;
          background: #eee;
          border: 1px solid #ccc;
          background: url(data:image/png;base64,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) no-repeat;
          background-size: 100%;
          &:after{
            content: attr(alt);
            position: absolute;
            font-size: 100pt;
            color: #ccc;
            width: 100%;
            height: 100%;
            line-height: 140pt;
            vertical-align: middle;
            text-align: center;
            top:0px;
            left:0px;
            z-index: 1;
          }
          & > canvas{
            margin: 0;
            padding: 0;
            display: block;
            position: relative;
            z-index: 10;
          }
        }
      }
    }
  }
  .sign_Menu{
    display: table;
    background:#eee;
    width:100%;
    div{
      display: table-cell;
      text-align: center;
      color:#000;
      line-height: 40px;
      height: 40px;
    }
    &>div:last-child{
      background: dodgerblue;
      color:#fff;
    }
  }
}
</style>
