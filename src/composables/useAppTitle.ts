import { useTitle } from '@vueuse/core';

const SEPARATOR = '/';
const HOSTNAME = 'Medics';
const currentTitle = useTitle();

/**
 * Изменяет заголовок страницы
 *
 * @param {?string} [title] Новый заголовок
 */
export function useAppTitle(title?: string) {
  currentTitle.value = title ? `${title} ${SEPARATOR} ${HOSTNAME}` : HOSTNAME;
}

export default useAppTitle;
