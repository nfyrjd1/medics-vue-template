# Установка

1. `npx degit https://github.com/nfyrjd1/medics-vue-template medicsVueTemplate`
2. `cd medicsVueTemplate`
3. `npm install`
4. Заменить `medics-vue-template` в проекте на название вашего компонента
5. Удалить эти строки

# Компонент: medics-vue-template

## Команды

Устанавливает нужную ноду и пакеты (нужен [nvm](https://github.com/nvm-sh/nvm)):  
`npm run app-install`

Если установлено и нужно только переключить ноду (нужен [nvm](https://github.com/nvm-sh/nvm)):  
`npm run set-node`

Сервер для разработки:  
`npm run serve`

Сборка:  
`npm run build`

Линтер + Форматировщик:  
`npm run lf`

Обновление пакетов:  
`npm run check-updates`

## Пакеты:

- `vue` - Vue 3. [Документация](https://vuejs.org/). Необходимо поставить расширение в vscode [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- `vue-router` - Роутер. [Документация](https://router.vuejs.org/guide/)
- `pinia` - State-менеджер. [Документация](https://pinia.vuejs.org/)
- `@vueuse/core` - Набор функций для Vue. [Документация](https://vueuse.org/guide/)
- `axios` - Запросы на api. [Документация](https://axios-http.com/docs/intro)
- UI-библиотека:
  - `bootstrap-vue-next` - Новая версия bootstrap-vue. [Документация](https://bootstrap-vue-next.github.io/bootstrap-vue-next/)
  - `bootstrap` - Бутстрап 5. [Документация](https://getbootstrap.com/)
  - `unplugin-vue-components` - Автоматически регистрирует используемые компоненты бутстрапа (неиспользованные не идут в билд)
- Иконки:
  - `unplugin-icons` - Позволяет использовать иконки из разных библиотек, автоматически подгрузит иконку и добавит в билд. [Список иконок](https://icon-sets.iconify.design). [Документация (простая)](https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/icons.html), [Документация (полная)](https://iconify.design/docs/)
- Линтер и форматировщик:
  - `eslint` - Линтер. Необходимо поставить расширение в vscode [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - `prettier` - Форматировщик. Необходимо поставить расширение в vscode [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  - `prettier-plugin-organize-imports` - Форматирование порядка импортов
  - `eslint-plugin-vue` - Официальный плагин ESLint для Vue.js
  - `eslint-config-prettier`
  - `@vue/eslint-config-typescript`
- Тайпскрипт:
  - `typescript`
  - `@vue/tsconfig`
  - `vue-tsc`
  - `@types/node`
  - `jiti`
- Сборщик:
  - `@vitejs/plugin-vue`
  - `vite`
- `npm-run-all2` - Запуск нескольких скриптов в параллели (используется в скрипте npm run build)
- `vite-plugin-vue-devtools` - Дебагер
- `rollup-plugin-visualizer` - Формирует отчет по созданному бандлу
