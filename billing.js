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
      name: event.requestContext.profile.name,
      address: {
        line1: event.requestContext.profile.address.line1,
        postal_code: event.requestContext.profile.address.postal_code,
        city: event.requestContext.profile.address.city,
        state: event.requestContext.profile.address.state,
        country: event.requestContext.profile.address.country,
      },
    },
    source,
    amount,
    description,
    currency: Currency.USD
    });
  return { status: true };
});