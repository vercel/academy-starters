export default function CheckoutPage() {
  return (
    <div className="max-w-md">
      <h1 className="text-3xl font-bold text-pretzel-900">Checkout</h1>
      <p className="mt-3 text-pretzel-700">
        Mock checkout for the course. No real payment, no Stripe, no shipping
        labels.
      </p>

      <form className="mt-8 space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-pretzel-900">Name</span>
          <input
            type="text"
            placeholder="Donald Fagen"
            className="mt-1 block w-full rounded-md border border-pretzel-200 bg-white px-3 py-2 text-pretzel-900"
            readOnly
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-pretzel-900">
            Email
          </span>
          <input
            type="email"
            placeholder="aja@pretzellogic.example"
            className="mt-1 block w-full rounded-md border border-pretzel-200 bg-white px-3 py-2 text-pretzel-900"
            readOnly
          />
        </label>
        <button
          type="button"
          className="w-full rounded-md bg-pretzel-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-pretzel-900"
        >
          Place order (just kidding)
        </button>
      </form>
    </div>
  );
}
