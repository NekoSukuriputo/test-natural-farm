<template>
  <NuxtLayout>
    <v-app>
      <AppBar />
      <v-main>
        <NuxtPage />
      </v-main>
      <!-- <AppFooter /> -->
    </v-app>
  </NuxtLayout>
</template>
<script setup lang="ts"></script>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
