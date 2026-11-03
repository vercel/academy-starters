import Stripe from "stripe";

// TODO: Initialize the Stripe client with your secret key
// Use process.env.STRIPE_SECRET_KEY
// Set apiVersion to "2026-09-30.endive"
// Add appInfo with name: "Foragers Guild"

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  // TODO: Add configuration options here
});
