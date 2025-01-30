import { reactive, type Reactive } from 'vue';
import { defineStore } from 'pinia';
import type { ToastOrchestratorShowParam, PublicOrchestratedToast } from 'bootstrap-vue-next';

export const useNoticeStore = defineStore('notice', () => {
  const list: Reactive<ToastOrchestratorShowParam[]> = reactive([]);

  /**
   * Выводит нотис
   *
   * @param {PublicOrchestratedToast} props Параметры нотиса
   */
  function showNotice(props: PublicOrchestratedToast) {
    list.push({
      props: {
        ...props,
        title: props.title ?? 'Уведомление',
        pos: props.pos ?? 'bottom-center',
        solid: true,
        progressProps: {},
        appendToast: true,
      },
    });
  }

  const value = 10000;

  /**
   * Выводит уведомление об ошибке
   *
   * @param {string} text Текст уведомления
   */
  function showError(text: string) {
    return showNotice({ body: text, variant: 'danger', title: 'Ошибка', value });
  }

  /**
   * Выводит уведомление о предупреждении
   *
   * @param {string} text Текст уведомления
   */
  function showWarning(text: string) {
    return showNotice({ body: text, variant: 'warning', title: 'Внимание', value });
  }

  /**
   * Выводит уведомление об успехе
   *
   * @param {string} text Текст уведомления
   */
  function showSuccess(text: string) {
    return showNotice({ body: text, variant: 'success', title: 'Уведомление', value });
  }

  /**
   * Выводит уведомление с информацией
   *
   * @param {string} text Текст уведомления
   */
  function showInfo(text: string) {
    return showNotice({ body: text, variant: 'info', title: 'Уведомление', value });
  }

  return { list, showNotice, showError, showWarning, showSuccess, showInfo };
});

export default useNoticeStore;
