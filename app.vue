<template>
  <NuxtLayout>
    <ModrinthLoadingIndicator />
    <Notifications />
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
import ModrinthLoadingIndicator from '~/components/ui/modrinth-loading-indicator'
import Notifications from '~/components/ui/Notifications.vue'
</script>
