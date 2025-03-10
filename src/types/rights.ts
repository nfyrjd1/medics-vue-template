import type { Right } from '@medics/medics-vue-components';

/** Право на просмотр сотового телефона */
export const PEOPLE_SHOW_USER_CELLPHONE_RIGHT: Right = {
  component: 'people',
  right: 'show_user_cellphone',
};

/** Список используемых прав */
export const RIGHTS: Right[] = [PEOPLE_SHOW_USER_CELLPHONE_RIGHT];
