import { Request, Response } from "express";
import { buildDashboardData } from "./dashboard.service";
import { asyncHandler } from "../../core/utils/async-handler";
import { sendSuccess } from "../../core/views/api-response.view";
import { dashboardView } from "./dashboard.view";

export const getDashboardData = asyncHandler(async (req: Request, res: Response) => {
  const data = await buildDashboardData();
  return sendSuccess(res, 200, dashboardView(data), "Dashboard obtenido correctamente");
});
