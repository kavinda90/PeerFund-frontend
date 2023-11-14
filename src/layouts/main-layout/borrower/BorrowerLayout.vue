<template>
    <div>
      <!-- You can add a header or other common elements if needed -->
      <router-view />
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'BorrowerLayout',
    });
</script>