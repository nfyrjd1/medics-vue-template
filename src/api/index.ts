import axios, { AxiosError } from 'axios';
import type { Right } from '../types';

//Расширяем объект config
declare module 'axios' {
  interface InternalAxiosRequestConfig {
    ignoreInterceptors?: boolean;
  }
}

const BASE_URL = '/api/';

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

interface ServerErrorResponse {
  error?: {
    data?: {
      text: string;
      field: string;
    }[];
    text?: string;
  };
}

function apiErrorHandler(error: AxiosError): Promise<never> {
  enum HttpStatusCode {
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    MethodNotAllowed = 405,
    RequestTimeout = 408,
    InternalServerError = 500,
    NotImplemented = 501,
  }

  const httpErrorMessages = {
    [HttpStatusCode.BadRequest]:
      'Неверный запрос: отклонено сервером в связи с неверным форматом данных',
    [HttpStatusCode.Unauthorized]: 'Требуется авторизация',
    [HttpStatusCode.Forbidden]: 'Доступ запрещен',
    [HttpStatusCode.NotFound]: 'Запрошена не существующая страница',
    [HttpStatusCode.MethodNotAllowed]: 'Метод не поддерживается',
    [HttpStatusCode.RequestTimeout]: 'Истекло время соединения',
    [HttpStatusCode.InternalServerError]: 'Внутренняя ошибка сервера',
    [HttpStatusCode.NotImplemented]: 'Запрошенный метод не поддерживается',
    default: 'Непредвиденная ошибка',
  };

  let errorText =
    httpErrorMessages[error.response?.status as HttpStatusCode] ?? httpErrorMessages.default;
  if (error.response?.data) {
    const errorResponse = error.response?.data as ServerErrorResponse;
    if (errorResponse.error) {
      if (errorResponse.error.data && errorResponse.error.data.length > 0) {
        errorText = errorResponse.error.data.map((err) => `${err.text} (${err.field})`).join(';\n');
      } else if (errorResponse.error.text) {
        errorText = errorResponse.error.text;
      }
    }
  }

  return Promise.reject(errorText);
}

/*
 * Перехватчик ответа axios, чтобы красиво выводить ошибки запросов пользователю
 *
 * Перехватчик экспортируется, чтобы при желании его можно было отключить
 */
export const apiResponseInterceptor = apiClient.interceptors.response.use(
  (response) => response.data,

  (error: AxiosError) => {
    if (error.config?.ignoreInterceptors) {
      return Promise.reject(error);
    }

    return apiErrorHandler(error);
  },
);

export default apiClient;

/** Только общие методы */

/** Список прав */
export const getRights = async (rights: Right[]): Promise<Right[]> => {
  const rightsStringified = rights.map((right) => `${right.component}:${right.right}`).join(';');
  return await apiClient.get(`rights/user?access=${rightsStringified}`);
};
