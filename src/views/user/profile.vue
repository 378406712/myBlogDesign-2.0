<template>
  <div class="profile-wrapper"></div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      currentDate: ''
    }
  },
  computed: {
    ...mapGetters(['name', 'avatar'])
  },
  created() {
    this.currentDate = new Date()
  }
}
</script>