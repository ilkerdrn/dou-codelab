export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(
    {
      service: "dou-codelab",
      status: "ok",
      version: process.env.APP_VERSION ?? "development",
      environment: process.env.APP_ENV ?? "prototype",
      timestamp: new Date().toISOString(),
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
