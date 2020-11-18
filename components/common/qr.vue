<template>
  <div :class="{ verified }" class="qr">



    <div class="con-text">
      <button @click="$router.push('/delivery/')" class="close">
        <i class='bx bx-x'></i>
      </button>
      <div class="header">
        <h2>
          Escanear Código QR
        </h2>
      </div>
      <div class="scan">
        <div class="check">
          <i class='bx bx-check'></i>
        </div>
        <div class="line"></div>
        <div class="square square1"></div>
        <div class="square square2"></div>
        <div class="square square3"></div>
        <div class="square square4"></div>
      </div>

      <div class="footer">
        <p v-if="!verified">
          Escanea el código QR de el cliente <br> al entregar o recibir el dinero
        </p>
        <p v-else>
          Código QR escaneado con éxito
        </p>
      </div>
    </div>
    <qrcode-stream :track="repaint" :camera="camera" @decode="onDecode" @init="onInit" />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class qr extends Vue {
  result: string = ''
  error: string = ''
  camera: string = 'auto'
  // camera: string = 'front'
  noRearCamera: boolean = false
  noFrontCamera: boolean = false
  loading: boolean = false

  @Prop({ type: Boolean }) verified: boolean

  repaint (location, ctx) {
    const {
      topLeftCorner,
      topRightCorner,
      bottomLeftCorner,
      bottomRightCorner,
      // topLeftFinderPattern,
      // topRightFinderPattern,
      // bottomLeftFinderPattern
    } = location

    ctx.lineWidth  = 2 // instead of red
    ctx.strokeStyle = '#ffda1a' // instead of red

    ctx.beginPath()
    ctx.moveTo(topLeftCorner.x, topLeftCorner.y)
    ctx.lineTo(bottomLeftCorner.x, bottomLeftCorner.y)
    ctx.lineTo(bottomRightCorner.x, bottomRightCorner.y)
    ctx.lineTo(topRightCorner.x, topRightCorner.y)
    ctx.lineTo(topLeftCorner.x, topLeftCorner.y)
    ctx.closePath()

    ctx.fillStyle = "rgba(255,218,26, 0.15)";
    ctx.stroke()
    ctx.fill()
  }

  onDecode (result: any) {
    if (!result) {
      return
    }
    this.result = result
    // this.$notification({
    //   title: 'Código QR Escaneado',
    //   text: 'Operación finalizada con éxito',
    console.log(result)
    // })
    this.$emit('decode', result)
  }

  async onInit (promise: any) {
    this.loading = true
    try {
      await promise
    } catch (error) {
      const triedFrontCamera = this.camera === 'front'
      const triedRearCamera = this.camera === 'rear'

      const cameraMissingError = error.name === 'OverconstrainedError'

      if (triedRearCamera && cameraMissingError) {
        this.noRearCamera = true
      }

      if (triedFrontCamera && cameraMissingError) {
        this.noFrontCamera = true
      }
    } finally {
      this.loading = false
    }
  }
}
</script>
<style lang="sass" scoped>
.close
  position: absolute
  left: 0px
  top: 0px
  margin: 10px
  width: 50px
  height: 50px
  display: flex
  align-items: center
  justify-content: center
  color: #fff
  font-size: 1.7rem
  background: transparent
  border: 2px solid rgba(255,255,255,.15)
  z-index: 300
  border-radius: 20px
.con-text
  position: absolute
  left: 0px
  top: 0px
  width: 100%
  height: 100%
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
  z-index: 1000
  color: #ffffff
  background: rgba(0,0,0,.4)
  overflow: hidden
  .header
    position: absolute
    top: 0px
    z-index: 100
    h2
      text-align: center
      font-weight: normal
      padding: 25px
      font-size: 1rem
  .footer
    z-index: 100
    position: absolute
    bottom: 0px
    p
      padding: 25px
      font-size: 1rem
      text-align: center
      font-size: .7rem

@keyframes line
  0%
    top: 0px
    opacity: 0
  50%
    opacity: 1
  100%
    opacity: 0
    top: 300px


.scan
  position: relative
  width: 300px
  min-width: 300px
  height: 300px
  min-height: 300px
  z-index: 300
  border: 300px solid rgba(0,0,0,.5)
  box-sizing: content-box
  z-index: 10
  display: flex
  align-items: center
  justify-content: center
  transition: all .3s ease
  .check
    position: absolute
    opacity: 0
    transform: scale(.4)
    transition: all .3s ease
    i
      font-size: 5rem
      color: -color(color)
  .line
    position: absolute
    left: 5px
    top: 0px
    width: calc(100% - 10px)
    height: 2px
    background: -color(color)
    animation: line 2s linear infinite
    box-shadow: 0px 0px 25px 0px -color(color, .8)

  .square
    width: 26px
    height: 26px
    position: absolute
    &.square1
      left: 0px
      top: 0px
      border-left: 1px solid -color(color)
      border-top: 1px solid -color(color)
    &.square2
      right: 0px
      top: 0px
      border-right: 1px solid -color(color)
      border-top: 1px solid -color(color)
    &.square3
      right: 0px
      bottom: 0px
      border-right: 1px solid -color(color)
      border-bottom: 1px solid -color(color)
    &.square4
      left: 0px
      bottom: 0px
      border-left: 1px solid -color(color)
      border-bottom: 1px solid -color(color)
// responsive
.loading
  position: absolute
  width: 100vw
  display: flex
  align-items: center
  justify-content: center
  height: 100vh
.load
  display: block
  width: 40px
  height: 40px
  position: relative
  &:after
    content: ''
    position: absolute
    width: 100%
    height: 100%
    border-radius: 50%
    border: 3px solid -color('color', 1)
    border-top: 3px solid -color('bg', 0)
    border-left: 3px solid -color('bg', 0)
    border-bottom: 3px solid -color('bg', 0)
    box-sizing: border-box
    transition: all .25s ease
    display: block
    box-shadow: 0px 0px 0px 0px -color('color',1)
    animation: loading .6s ease infinite
  &:before
    content: ''
    position: absolute
    width: 100%
    height: 100%
    border-radius: 50%
    border: 3px dashed -color('color',1)
    border-top: 3px solid -color('bg', 0)
    border-left: 3px solid -color('bg', 0)
    border-bottom: 3px solid -color('bg', 0)
    box-sizing: border-box
    transition: all .25s ease
    display: block
    box-shadow: 0px 0px 0px 0px -color('color',1)
    animation: loading .6s linear infinite
.qr
  position: fixed
  top: 0px
  height: 100vh
  width: 100%
  z-index: 1000
  background: -color('bg')
  left: 0px
  display: flex
  align-items: center
  justify-content: center
  height: calc(var(--vh, 1vh) * 100)
  &.verified
    .check
      opacity: 1
      transform: scale(1)
    .scan
      min-width: 120px
      min-height: 120px
      width: 120px
      height: 120px
      border: 500px solid -color('color', .2)
      .line
        display: none
  header
    position: absolute
    top: 0px
    left: 0px
    width: 100%
    z-index: 100
    display: flex
    align-items: center
    justify-content: space-between
    background: -color('color')
    color: -color('bg')
    border-radius: 0px 0px 0px 25px
    button
      min-width: 50px !important
      max-width: 50px !important
      max-height: 50px !important
      min-height: 50px !important
    p
      padding: 20px
      b
        font-weight: bold
  footer
    width: 100%
    padding: 15px
    position: fixed
    bottom: 0px
    display: flex
    align-items: center
    justify-content: center
    padding-bottom: 50px
    button
      min-width: 50px !important
      max-width: 50px !important
      max-height: 50px !important
      min-height: 50px !important
    svg
      min-width: 24px
      fill: #fff
  .decode-result
    position: absolute
    bottom: 0px
    padding: 20px
    background: -color('bg')
    width: 100%
    z-index: 100
    border-radius: 20px 20px 0px 0px
    b
      font-size: .8rem
// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
