import { ErrorRequestHandler } from "express";
import { isHttpError } from "../utils/http-error";
import { sendError } from "../views/api-response.view";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err?.message ?? err);

  if (res.headersSent) {
    return next(err);
  }

  if (isHttpError(err)) {
    return sendError(res, err.statusCode, err.message, err.details);
  }

  return sendError(res, 500, "Error interno del servidor");
};
