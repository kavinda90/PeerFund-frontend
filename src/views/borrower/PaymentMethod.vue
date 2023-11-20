<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "BankDetails",
  props: ['id'],
})
</script>

<template>
<div>Payment method {{id}}</div>
</template>

<style scoped lang="scss">

</style>
