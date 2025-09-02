import "dotenv/config";
import express from "express";
import cors from "cors";
import { tremendous } from "./tremendous.js";

const app = express();
app.use(cors());
app.use(express.json());

const trem = tremendous(process.env.TREME_API_KEY);

app.post("/api/survey/complete", async (req, res) => {
  try {
    const {
      email = "demo@example.com",
      name = "Survey Tester",
      amountCents = 500,
      productId = "Q24BD9EZ332JT",
      externalId = `survey-${Date.now()}`
    } = req.body || {};

    const orderPayload = {
      external_id: externalId,
      payment: { funding_source_id: "balance" },
      reward: {
        value: { denomination: amountCents / 100, currency_code: "USD" },
        delivery: { method: "LINK" },
        recipient: { name, email },
        products: [productId]
      }
    };

    const created = await trem.createOrder(orderPayload);
    const rewardId = created?.order?.rewards?.[0]?.id;
    const linkResp = rewardId ? await trem.generateLink(rewardId) : null;

    res.json({
      ok: true,
      orderId: created?.order?.id,
      rewardId,
      link: linkResp?.link || created?.order?.rewards?.[0]?.delivery?.link || null
    });
  } catch (err) {
    const e = err?.response?.data || { message: err.message };
    console.error("Tremendous error:", e);
    res.status(500).json({ ok: false, error: e });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`EasyAsk backend running on :${port}`));
