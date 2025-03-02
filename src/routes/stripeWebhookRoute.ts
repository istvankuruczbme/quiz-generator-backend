import express from "express";
import { Router } from "express";
import stripeWebhookHandlerMW from "../middlewares/stripeWebhook/stripeWebhookHandlerMW";

const router = Router();

router.post("/", express.json({ type: "application/json" }), stripeWebhookHandlerMW);

export { router as stripeWebhookRoute };
