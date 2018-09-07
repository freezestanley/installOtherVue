var preHandler = function (e) {
  e.preventDefault()
}
export default class Draw {
  constructor (el, width, height, haspen) {
    this.el = el
    this.width = width
    this.height = height
    this.canvas = document.getElementById(this.el)
    this.canvas.width = width
    this.canvas.height = height
    this.cxt = this.canvas.getContext('2d')
    this.cxt.lineCap = 'round'
    this.cxt.shadowBlur = 5
    this.cxt.lineWidth = 5
    this.haspen = haspen
    this.stage_info = this.canvas.getBoundingClientRect()
    this.path = {
      beginX: 0,
      beginY: 0,
      endX: 0,
      endY: 0
    }
  }
  init (btn) {
    var that = this
    this.canvas.addEventListener('touchstart', function (event) {
      document.addEventListener('touchstart', preHandler, false)
      that.drawBegin(event)
    })
    this.canvas.addEventListener('touchend', function (event) {
      document.addEventListener('touchend', preHandler, false)
      that.drawEnd()
    })
    this.clear(btn)
  }
  drawBegin (e) {
    this.haspen(true)
    var that = this
    window.getSelection() ? window.getSelection().removeAllRanges() : document.selection.empty()
    this.cxt.strokeStyle = "#000"
    this.cxt.beginPath()
    this.cxt.moveTo(
      e.changedTouches[0].clientX - this.stage_info.left,
      e.changedTouches[0].clientY - this.stage_info.top
    )
    this.path.beginX = e.changedTouches[0].clientX - this.stage_info.left
    this.path.beginY = e.changedTouches[0].clientY - this.stage_info.top
    this.canvas.addEventListener("touchmove", function () {
      that.drawing(event)
    })
  }
  drawing (e) {
    this.cxt.lineTo(
      e.changedTouches[0].clientX - this.stage_info.left,
      e.changedTouches[0].clientY - this.stage_info.top
    )
    this.path.endX = e.changedTouches[0].clientX - this.stage_info.left
    this.path.endY = e.changedTouches[0].clientY - this.stage_info.top
    this.cxt.stroke()
    // this.cxt.rect(0, 0, this.width, this.height)
    // this.cxt.fillStyle = "green"
    // this.cxt.fill()
  }
  drawEnd () {
    document.removeEventListener('touchstart', preHandler, false)
    document.removeEventListener('touchend', preHandler, false)
    document.removeEventListener('touchmove', preHandler, false)
    //canvas.ontouchmove = canvas.ontouchend = null
  }
  clear (btn) {
    this.cxt.clearRect(0, 0, this.width, this.height)
    // this.cxt.rect(0, 0, this.width, this.height)
    // this.cxt.fillStyle = "#fff"
    // this.cxt.fill()
  }
  save () {
    var bak = this.create()
    bak.cxt.drawImage(this.canvas, 0, 0)
    return {
      data: bak.cvs.toDataURL("image/jpeg"),
      cvs: bak.cvs
    }
  }
  create (w, h) {
    var cvs = document.createElement('canvas')
    cvs.width = w || this.width
    cvs.height = h || this.height
    var cxt = cvs.getContext('2d')
    cxt.rect(0, 0, this.width, this.height)
    cxt.fillStyle = "#fff"
    cxt.fill()
    return {
      cvs,
      cxt
    }
  }
  static createMap (w, h, line, list) {
    var length = list.length
    var Ln = (length % line) > 0 ? Math.floor(length / line) + 1 : Math.floor(length / line)
    var cvs = document.createElement('canvas')
    cvs.width = w * line
    cvs.height = h * Ln
    var cxt = cvs.getContext('2d')
    cxt.rect(0, 0, cvs.width, cvs.height)
    cxt.fillStyle = "#fff"
    cxt.fill()
    for (var y = 0; y < Ln; y++) {
      for (var x = 0; x < line; x++) {
        if (list.length > 0) {
          var img = list.shift().cvs
          cxt.drawImage(img, x * w, y * h)
        }
      }
    }
    return cvs.toDataURL("image/jpeg", 0.4)
  }
}