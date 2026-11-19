export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }
  const body = req.body || {};
  return res.status(200).json({
    ok: true,
    telegramNotified: false,
    code: body.code || "XL-DEMO",
    receivedAt: new Date().toISOString(),
  });
}
