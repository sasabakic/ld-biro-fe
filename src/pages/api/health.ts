import type { NextApiRequest, NextApiResponse } from "next";

type HealthResponse = {
  status: "healthy" | "unhealthy";
  timestamp: string;
  uptime?: number;
  environment?: string;
  version?: string;
  error?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<HealthResponse>
) {
  // Only allow GET method
  if (req.method !== "GET") {
    return res.status(405).json({
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      error: "Method not allowed",
    });
  }

  try {
    const healthCheck: HealthResponse = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || "development",
      version: process.env.npm_package_version || "1.0.0",
    };

    return res.status(200).json(healthCheck);
  } catch (error) {
    console.error("Health check failed:", error);
    return res.status(500).json({
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      error: "Health check failed",
    });
  }
}
