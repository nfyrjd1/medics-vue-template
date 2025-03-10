<script setup lang="ts">
import AppMenu from './AppMenu.vue';
</script>

<template>
  <BContainer class="fill-height" fluid>
    <BRow class="mb-2">
      <AppMenu />
    </BRow>

    <BRow class="fill-height">
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </BRow>
  </BContainer>
</template>

<style>
/** Анимация переходов */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
