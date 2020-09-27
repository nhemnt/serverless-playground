import stripePackage from 'stripe';
import handler from "./libs/handler-lib";
import { calculateCost } from "./libs/billing-lib";

const Currency = {
  USD: "usd"
};
export const main = handler(async (event, context) => {
  const { storage, source } = JSON.parse(event.body);
  const amount = calculateCost(storage);
  const description = "Scratch charge";
  const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);
  await stripe.charges.create({
    shipping: {
      name: "hemant",
      address: {
        line1: "510 Townsend St",
        postal_code: "98140",
        city: "San Francisco",
        state: "CA",
        country: "US",
      },
    },
    source,
    amount,
    description,
    currency: Currency.USD
    });
  return { status: true };
});