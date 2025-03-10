import type { HelloWorld } from '@/types';
import { useApiClient } from '@medics/medics-vue-components';

export function useHelloWorldApi() {
  const apiClient = useApiClient();

  /**
   * Получение данных
   */
  async function getHelloWorldList(): Promise<HelloWorld[]> {
    return await apiClient.get(`hello/world`);
  }

  return {
    /**
     * Получение данных
     */
    getHelloWorldList,
  };
}

export default useHelloWorldApi;
