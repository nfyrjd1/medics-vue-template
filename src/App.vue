<script setup lang="ts">
import AppContainer from './components/app/AppContainer.vue';
</script>

<template>
  <!-- Контейнер приложения -->
  <AppContainer />

  <!-- Вывод нотисов -->
  <BToastOrchestrator />

  <!-- Вывод модалок кодом -->
  <BModalOrchestrator />
</template>

<style></style>
