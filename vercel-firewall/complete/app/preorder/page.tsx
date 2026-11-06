import { connection } from "next/server";
import { PreorderForm } from "@/components/preorder-form";
import { getRollsLeft } from "@/lib/store";

export default async function PreorderPage() {
  await connection();

  return (
    <div>
      <h1 className="text-4xl font-bold">Preorder a roll</h1>
      <p className="mt-2">One roll per phone number. Pick it up at the window with your confirmation code.</p>
      <PreorderForm initialRollsLeft={getRollsLeft()} />
    </div>
  );
}
