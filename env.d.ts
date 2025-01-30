/// <reference types="vite/client" />

// Дописываем интерфейс переменной окружения, чтобы подсказывала IDE
interface ImportMetaEnv {
  readonly VITE_APP_SERVER_URL: string;
  readonly VITE_APP_MYTOKEN: string;
  readonly VITE_APP_PUBLIC_PATH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
