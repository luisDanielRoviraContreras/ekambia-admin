<template>
  <div class="viewImage">
    <button @click="handleClick">
      <i class='bx bx-x' ></i>
    </button>
    <img :src="src" alt="">
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class viewImage extends Vue {
  @Prop({}) src: any

  handleClick() {
    this.$emit('close')
  }
}
</script>
<style lang="sass" scoped>
.viewImage
  position: absolute
  width: 100%
  height: 100%
  background: rgba(255,255,255,.7)
  left: 0px
  top: 0px
  z-index: 20000
  display: flex
  align-items: center
  justify-content: center
  overflow: auto
  padding: 50px
  img
    max-width: 100%
    max-height: 100%
  button
    position: absolute
    top: 0px
    right: 0px
    width: 50px
    height: 50px
    display: flex
    align-items: center
    justify-content: center
    background: transparent
    border: 0px
    margin: 20px
    background: #fff
    border-radius: 14px
    cursor: pointer
    box-shadow: 0px 0px 30px 0px rgba(0,0,0,.1)
    i
      font-size: 2rem
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
