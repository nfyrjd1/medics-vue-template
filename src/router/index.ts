import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import type { Right } from '@/types';
import { nextTick } from 'vue';
import useAppTitle from '@/composables/useAppTitle';

//Расширяем объект meta у роута
declare module 'vue-router' {
  interface RouteMeta {
    /** Не изменять заголовок при переходе на роут */
    preventUpdateTitle?: boolean;
    /** Изменить заголовок страницы на указанный */
    title?: string;
    /** Чтобы зайти на роут нужно иметь указанное право */
    right?: Right;
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/index.php',
      redirect: { path: '/', query: {} },
    },
    {
      path: '/error/403',
      name: 'Error403',
      component: () => import('@/views/ErrorView.vue'),
      props: { code: 403, text: 'Доступ запрещен' },
      meta: {
        title: 'Ошибка',
      },
    },
    {
      path: '/error/404',
      alias: '/:pathMatch(.*)*',
      name: 'Error404',
      component: () => import('@/views/ErrorView.vue'),
      props: { code: 404, text: 'Страница не найдена' },
      meta: {
        title: 'Ошибка',
      },
    },
  ] as RouteRecordRaw[],
});

//Изменение заголовка страницы
router.afterEach((to, from) => {
  if (to.meta.preventUpdateTitle) {
    return;
  }

  //nextTick чтобы правильно записывало в историю
  nextTick(() => {
    if (from.name !== to.name) {
      useAppTitle(to.meta.title);
    }
  });
});

export default router;
