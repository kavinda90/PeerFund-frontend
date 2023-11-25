<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "LoanDetails",
  props: ['id'],
})
</script>

<template>
  <div>Loan details for {{ id }}</div>
</template>

<style scoped lang="scss">

</style>
