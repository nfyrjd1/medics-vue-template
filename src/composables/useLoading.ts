import { computed, ref, shallowRef, type ComputedRef, type Ref, type UnwrapRef } from 'vue';
import { useAsyncState } from '@vueuse/core';

interface UseLoadingOptions<Shallow extends boolean> {
  /**
   * Время жизни кэша в секундах (при отрицательных значениях - бессрочно)
   * @default -1
   */
  cacheTime?: number;

  /** Использовать shallowRef для объекта data
   * @default true
   */
  shallow?: Shallow;

  /** Кидать ошибку
   * @default false
   */
  throwError?: boolean;

  /** Колбек в случае ошибки */
  onError?: (e: unknown) => void;
}

type UseLoadingReturn<Data, Params extends any[], Shallow extends boolean> = {
  /** Данные */
  data: Shallow extends true ? Ref<Data> : Ref<UnwrapRef<Data>>;

  /** Признак загрузки */
  isLoading: Ref<boolean>;

  /** Признак что данные загружены */
  isReady: Ref<boolean>;

  /** Промис загрузки */
  loadingPromise: ComputedRef<Promise<Data> | null>;

  /** Функция загрузки данных */
  load: (reload?: boolean, ...args: Params) => Promise<Data>;
};

/**
 * Загрузка с кэшированием данных
 *
 * @param callback Колбек с загрузкой данных
 * @param initialState Первоначальное значение (пустое)
 * @param options Параметры
 */
export function useLoading<Data, Params extends any[] = [], Shallow extends boolean = true>(
  callback: (...args: Params) => Promise<Data>,
  initialState: Data,
  options?: UseLoadingOptions<Shallow>,
): UseLoadingReturn<Data, Params, Shallow> {
  const { cacheTime = -1, shallow = false, throwError = false, onError = () => {} } = options ?? {};

  /** Признак что данные загружены */
  const isReady = ref(false);

  /** Признак загрузки */
  const isLoading = ref(false);

  /** Время последней загрузки Date.Now() */
  const loadedAt = ref(0);

  /** Промис загрузки */
  const loadingPromise = shallowRef<Promise<Data> | null>(null);

  const { state: data, execute: _execute } = useAsyncState(callback, initialState, {
    shallow,
    throwError: true,
    immediate: false,
  });

  /** Вызывает загрузку */
  async function execute(...args: Params) {
    try {
      isReady.value = false;
      isLoading.value = true;

      loadingPromise.value = _execute(0, ...args);
      await loadingPromise.value;
      loadedAt.value = Date.now();

      isReady.value = true;
    } catch (error) {
      onError(error);

      if (throwError) {
        throw error;
      }
    } finally {
      loadingPromise.value = null;
      isLoading.value = false;
    }
  }

  /** Функция проверки прогорел ли кеш */
  function isCacheExpired(): boolean {
    return !loadedAt.value || (cacheTime > 0 && Date.now() - loadedAt.value > cacheTime * 1000);
  }

  /**
   * Загрузка данных
   *
   * @param {boolean} reload Загрузить данные заново
   * @param {...Params} args Аргументы для функции получения данных
   * @returns {Promise<Data>}
   */
  async function load(reload?: boolean, ...args: Params): Promise<Data> {
    if (isCacheExpired()) {
      isReady.value = false;
    }

    if (reload || !isReady.value) {
      // Если в данный момент не идет загрузка, то загружаем
      if (!isLoading.value) {
        execute(...args);
      }

      await loadingPromise.value;
    }

    return data.value as Data;
  }

  return {
    isLoading,
    isReady,
    loadingPromise: computed(() => loadingPromise.value),
    data: data as Shallow extends true ? Ref<Data> : Ref<UnwrapRef<Data>>,
    load,
  };
}

export default useLoading;
