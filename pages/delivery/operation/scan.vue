<template>
  <div class="scan">
    <qr :verified="verified" @decode="handleDecode" />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from '~/plugins/axios'
@Component({
  layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
})
export default class scan extends Vue {
  data: any = null
  verified: any = false

  getOperation() {
    axios.get(`/operation-show/${this.$route.query.id}`).then(({data}: any) => {
      this.data = data.info
      console.log(this.data)
    })
  }

  mounted() {
    this.getOperation()
  }

  handleDecode(qrCode) {
    axios.post(`/qrcode_${this.$route.query.type == 'out' ? 'out' : 'in' }_check`, {
      value: qrCode
    }).then((data: any) => {
      if (qrCode.trim() == this.data[`qrcode_${this.$route.query.type == 'out' ? 'out' : 'in' }`].trim()) {
        this.verified = true
        if (this.$route.query.type == 'in-out' && !this.$route.query.finish) {
          this.verified = false
          this.$router.push({
            query: {
              id: this.$route.query.id,
              type: 'out',
              finish: 'true'
            }
          })
        } else {
          setTimeout(() => {
            this.$notification({
              title: 'Operación verificada',
              text: 'La operación se finalizo con éxito',
            })
            this.$router.push('/delivery/')
          }, 4000);
        }
      }
    })
  }
}
</script>
<style lang="sass" scoped>
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
