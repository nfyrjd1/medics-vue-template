<script setup lang="ts">
const { code, text } = defineProps({
  code: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <BAlert :model-value="true" variant="danger" class="text-center">
    <h1 class="mb-0">Ошибка {{ code }}: {{ text }}</h1>
  </BAlert>
</template>

<style></style>
