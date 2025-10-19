import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";

export const getErrorMessage = (
  error: FetchBaseQueryError | SerializedError | undefined,
): string => {
  if (!error) return "";

  // Обработка FetchBaseQueryError (ошибки от сервера)
  if ("status" in error) {
    if (typeof error.status === "number") {
      switch (error.status) {
        case 400:
          return "Неверный запрос";
        case 401:
          return "Не авторизован";
        case 403:
          return "Доступ запрещен";
        case 404:
          return "Ресурс не найден";
        case 500:
          return "Внутренняя ошибка сервера";
        default:
          return `Ошибка ${error.status}`;
      }
    }

    // Обработка текстовых статусов
    if (error.status === "FETCH_ERROR") {
      return "Ошибка соединения";
    }
    if (error.status === "PARSING_ERROR") {
      return "Ошибка парсинга ответа";
    }
    if (error.status === "TIMEOUT_ERROR") {
      return "Таймаут запроса";
    }
    if (error.status === "CUSTOM_ERROR") {
      return error.error || "Произошла ошибка";
    }

    if ("data" in error && typeof error["data"] === "object") {
      const errorData = error["data"];
      return (
        errorData["message"] ||
        errorData["error"]?.["name"] ||
        "Произошла ошибка"
      );
    }

    return "Произошла ошибка при запросе";
  }

  // Обработка SerializedError (ошибки клиента)
  if ("message" in error && error.message) {
    return error.message;
  }

  if ("name" in error && error.name) {
    return error.name;
  }

  return "Произошла неизвестная ошибка";
};
