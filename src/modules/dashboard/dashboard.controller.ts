import { Request, Response } from "express";
import { buildDashboardData } from "./dashboard.service";
import { asyncHandler } from "../../core/utils/async-handler";
import { sendSuccess } from "../../core/views/api-response.view";
import { dashboardView } from "./dashboard.view";
import { constants } from "../../core/utils/constants";

export const getAll = asyncHandler(async (req: Request, res: Response) => {
  const data = await buildDashboardData();
  return sendSuccess(res, constants.HTTP_STATUS.OK, dashboardView(data), "Dashboard obtenido correctamente");
});
