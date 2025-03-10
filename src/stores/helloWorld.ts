import { useHelloWorldApi } from '@/api/helloWorld';
import { useLoading, useNotice } from '@medics/medics-vue-components';
import { defineStore } from 'pinia';
import { computed } from 'vue';

export const useHelloWorldStore = defineStore('helloWorld', () => {
  const { getHelloWorldList } = useHelloWorldApi();
  const { showError } = useNotice();
  const { isReady, data, isLoading, load } = useLoading(() => getHelloWorldList(), [], {
    shallow: true,
    onError: (e) => showError(`Не удалось загрузить данные: ${e}`),
  });

  return {
    isReady,
    isLoading: computed(() => isLoading.value),
    items: computed(() => data.value),
    load,
  };
});

export default useHelloWorldStore;
