<template>
  <div class="user">
    <nav-bar @click="$router.push('/admin/users')" back />
    <div class="con-user">
      operacion
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class user extends Vue {}
</script>
<style lang="sass" scoped>
.user
  width: 100%
  .con-user
    width: 100%
    max-width: 1000px
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
