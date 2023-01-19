import reportService from "@/services/report-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getReport(req: Request, res: Response) {
  try {
    const report = await reportService.getReportToday();
    return res.status(httpStatus.OK).send({ report });
  } catch (error) {
    console.error(error);
  }
}
