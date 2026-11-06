import { OrderForm } from "@/components/order-form";

export default function OrderPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold">Office lunch</h1>
      <p className="mt-2">Feeding the whole floor? Order ahead and we&apos;ll have a box ready at the window.</p>
      <OrderForm />
    </div>
  );
}
