# Cancellation routing exercise

This is the reference app for the Jev mini class. Start at `/contact` after following the setup steps in [README.md](./README.md).

## What changed

The contact policy in `lib/examples.ts` now assigns requests to stop a future renewal to `billing_invoices`, provided the customer is not asking to return money. `billing_refunds` handles a request to return an already collected payment. Account recovery still takes precedence when the customer asks to resolve that blocker first.

The `Cancel next renewal` sample fills in the form with Alex's request. Click **Route submission** to ask the model to choose a team. We expect Billing / Invoices, whose ID is `billing_invoices`.

`lib/router.test.ts` checks that every contact sample, including the added cancellation request, reaches both models with the same inputs. The tests replace the models with mocks that return fixed answers without making network calls.

The template's model selection, confidence threshold, destination IDs, and recipient registry are unchanged. The same routing criteria reach Jev and the fallback model.

## Walk through the change

1. Read the contact entries for `billing_invoices` and `support_technical` in `lib/examples.ts`.
2. Read the contact `instructions` and load `Cancel next renewal` in the form.
3. Submit the request and record the destination, deciding model, and available Jev statistics.
4. Compare a request for a refund with one asking to recover account access first.

Use the course's [exercise](../exercise.md) and [results worksheet](../results-worksheet.md) for the exact requests and labels. If **Email the receiving team** is visible, leave it unchecked.

## Check the implementation

From this folder, run the checks in a second terminal while the app stays running in the first:

```sh
pnpm validate
```

This runs the repository's formatting and lint checks, TypeScript, unused-code checks, and mocked tests. Submit the requests through the form to check how the models apply the routing rules.
