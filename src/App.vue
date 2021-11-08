<template style="common">
  <n-config-provider :theme="darkTheme">
    <n-notification-provider>
      <router-view />
    </n-notification-provider>
  </n-config-provider>
</template>

<script setup>
import { NNotificationProvider, NConfigProvider, darkTheme } from "naive-ui";
</script>

<style>
body,
html {
  padding: 0;
  margin: 0;
}

#app {
  height: 100vh;
}
</style>
