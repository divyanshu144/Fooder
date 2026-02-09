import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json({ limit: "1mb" }));

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.post("/api/recommendations", async (req, res) => {
  try {
    const { items = [], profile = {} } = req.body || {};

    if (!OPENAI_API_KEY) {
      return res.status(200).json({
        reasons: {},
        note: "OPENAI_API_KEY not set. Returning empty reasons.",
      });
    }

    const prompt = [
      "You are a product assistant for a food discovery app.",
      "Return JSON only. Do not include markdown.",
      "Given a user profile and a list of restaurants, write a short, friendly recommendation reason for each item.",
      "Rules:",
      "- Output JSON object with key 'reasons' mapping item id to a short sentence.",
      "- Keep each reason under 140 characters.",
      "- If profile is sparse, use rating, delivery time, or cuisine to justify.",
      "",
      `Profile: ${JSON.stringify(profile)}`,
      `Items: ${JSON.stringify(items)}`,
    ].join("\n");

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        input: prompt,
        text: {
          format: { type: "json_object" },
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(500).json({ error: "OpenAI error", detail: errorText });
    }

    const data = await response.json();
    const outputText =
      data.output
        ?.flatMap((item) => item.content || [])
        ?.map((c) => c.text || "")
        ?.join("") || "";

    let parsed = {};
    try {
      parsed = JSON.parse(outputText);
    } catch (err) {
      parsed = { reasons: {} };
    }

    res.json(parsed);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
