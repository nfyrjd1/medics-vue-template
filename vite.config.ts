import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import type { UserConfig } from 'vite';

import vue from '@vitejs/plugin-vue';

import Components from 'unplugin-vue-components/vite';
import { BootstrapVueNextResolver } from 'bootstrap-vue-next';

import Icons from 'unplugin-icons/vite';
import IconsResolve from 'unplugin-icons/resolver';

import vueDevTools from 'vite-plugin-vue-devtools';

import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Подгружаем переменные окружения
  const env = Object.assign(process.env, loadEnv(mode, process.cwd(), ''));

  return {
    plugins: [
      vue(),
      // Подключение библиотек компонентов
      Components({
        resolvers: [BootstrapVueNextResolver(), IconsResolve()],
        dts: true,
      }),
      // Подключение иконок с возможность авто-загрузки используемых
      Icons({
        compiler: 'vue3',
        autoInstall: true,
      }),
      // Инструменты разработчика
      vueDevTools(),
      // Анализ размера бандлов
      visualizer()
    ],

    // Базовый путь приложения
    base: env.BASE_URL,

    experimental: {
      // Формируем ссылки на генерируемые скрипты/стили
      renderBuiltUrl(filename) {
        return `${env.VITE_APP_PUBLIC_PATH}/${filename}`;
      },
    },

    // Папка куда складываются генерируемые скрипты/стили/html'ка
    build: {
      outDir: '../static',
      emptyOutDir: true,
    },

    // Прокси сервер на api для обхода cors
    server: {
      proxy: {
        '/api': {
          target: env.VITE_APP_SERVER_URL ?? '/api',
          headers: {
            'x-access-token': env.VITE_APP_TOKEN,
          },
        },
      },
    },

    resolve: {
      alias: {
        // Позволяет использовать @ как элиас для корня приложения
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  } satisfies UserConfig;
});
