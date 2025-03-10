import { useAppTitle } from '@medics/medics-vue-components';
import { nextTick } from 'vue';
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

//Расширяем объект meta у роута
declare module 'vue-router' {
  interface RouteMeta {
    /** Не изменять заголовок при переходе на роут */
    preventUpdateTitle?: boolean;
    /** Изменить заголовок страницы на указанный */
    title?: string;
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
      path: '/',
      name: 'HelloWorld',
      component: () => import('@/views/HelloWorld.vue'),
      meta: {
        title: 'Hello World!',
      },
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
  ] satisfies RouteRecordRaw[],
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
