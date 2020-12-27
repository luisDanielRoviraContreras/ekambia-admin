<template>
  <div class="users">
    <header class="header">
      <c-input block v-model="search" @input="handleInput" type="text">
        Buscar usuario
      </c-input>
    </header>
    <div class="con-users">
      <div @click="handleClickUser(user.id)" class="user" v-for="(user, i) in users" :key="i">
        <!-- {{ name }} -->
        <!-- {{ user }} -->
        <div class="text">
          {{ user.firstName }}
        </div>
        <div class="text">
          {{ user.lastName }}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from '~/plugins/axios'
@Component({
  layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
})
export default class users extends Vue {
  search: any = ''
  users: any = []

  handleClickUser(id) {
    this.$router.push({
      path: '/admin/user',
      query: {
        id
      }
    })
  }

  handleInput(val: any) {
    // console.log(val)
    // this.getData(val)
  }

  getData() {
    axios.get('/users').then(({data} : any) => {
      console.log(data.info.data)
      this.users = data.info.data
    })
  }

  mounted() {
    this.getData()
    this.$bounceClose()
  }
}
</script>
<style lang="sass" scoped>
.header
  display: flex
  align-items: center
  justify-content: center
  max-width: 700px
  width: 100%
.users
  width: 100%
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
.con-users
  width: 100%
  max-width: 700px
  .user
    display: flex
    align-items: center
    justify-content: flex-start
    width: 100%
    margin-top: 15px
    background: -color('gray')
    border-radius: 20px
    cursor: pointer
    transition: all .25s ease
    &:hover
      background: -color(gray-2)
    .text
      padding: 15px
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
