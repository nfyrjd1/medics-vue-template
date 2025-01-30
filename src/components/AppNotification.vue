<script setup lang="ts">
import useNoticeStore from '@/stores/notice';
import { useToastController } from 'bootstrap-vue-next';
import { watch } from 'vue';

const { show } = useToastController();
const { list } = useNoticeStore();

watch(list, () => {
  if (list.length > 0 && show) {
    list.forEach((notice) => show(notice));
    list.splice(0, list.length);
  }
});
</script>

<template>
  <BToastOrchestrator />
</template>

<style></style>
