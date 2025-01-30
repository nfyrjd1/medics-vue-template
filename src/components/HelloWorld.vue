<script setup lang="ts">
import { useRightStore, NAME_RIGHT } from '@/stores/right';

const rightsStore = useRightStore();
const hasRight = rightsStore.hasComputed(NAME_RIGHT);
</script>

<template>
  <div>
    <h1>Hello World</h1>

    <h1 :class="[hasRight ? 'text-success' : 'text-danger']">
      Has right? {{ NAME_RIGHT.right }}: {{ hasRight }}
    </h1>
  </div>
</template>

<style scoped></style>
