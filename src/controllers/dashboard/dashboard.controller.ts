import { Request, Response } from "express";
import { buildDashboardData } from "../../services/dashboard.service";

export const getDashboardData = async (req: Request, res: Response) => {
  try {
    const data = await buildDashboardData();
    res.status(200).json(data);
  } catch (error: any) {
    console.error(error?.message);
    res.status(500).json({ mssg: "Error al obtener los datos del dashboard" });
  }
};
