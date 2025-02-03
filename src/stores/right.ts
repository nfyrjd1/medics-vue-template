import { defineStore } from 'pinia';
import type { Ref } from 'vue';
import { computedAsync } from '@vueuse/core';
import { getRights } from '@/api';
import type { Right } from '@/types/right';
import useNoticeStore from './notice';
import useLoading from '@/composables/useLoading';

/** Право на изменение категорий документов */
export const NAME_RIGHT: Right = {
  component: 'medics-vue-template',
  right: 'right_name',
};

/** Список используемых прав */
const rights: Right[] = [NAME_RIGHT];

export const useRightStore = defineStore('right', () => {
  const { showError } = useNoticeStore();

  const { data, load } = useLoading(() => getRights(rights), [], {
    shallow: true,
    cacheTime: 60 * 60,
    onError: (e) => showError(`Не удалось загрузить список прав пользователя: ${e}`),
  });

  /**
   * Определяет имеет пользователь переданное право или нет
   *
   * @param {Right} right Требуемое право
   * @returns {Promise<boolean>}
   */
  async function has(right: Right): Promise<boolean> {
    await load();
    const loadedRight = data.value.find(
      (r) => r.component == right.component && r.right == right.right,
    );
    return loadedRight?.can ?? right.can ?? false;
  }

  /**
   * Асинхронное вычисляемое свойство: имеет ли пользователь переданное право
   *
   * @param {Right} right Требуемое право
   * @returns {Ref<boolean>}
   */
  const hasComputed = (right: Right): Ref<boolean> =>
    computedAsync(() => has(right), false, { lazy: true });

  return { has, hasComputed };
});

export default useRightStore;
