import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-16">
      <div className="mx-auto max-w-xl flex flex-col">
        <div className="flex gap-4 justify-start w-full items-center">
          <span className="text-4xl">🌿</span>
          <h1 className="text-3xl font-bold tracking-tight">Forager's Guild</h1>
        </div>
        <p className="text-3xl lg:text-4xl !leading-tight mt-4">
          Your field guide to{" "}
          <span className="font-bold">wild edibles</span>,{" "}
          <span className="font-bold">mushrooms</span>, and{" "}
          <span className="font-bold">survival knowledge</span>
        </p>
        <p className="text-muted-foreground mt-4">
          Join the guild to access our database of edible plants, mushroom identification guides,
          seasonal foraging calendars, and expert survival tips. From Scout to Elder,
          unlock the wisdom of the wild.
        </p>
        <div className="flex gap-[8px] mt-4">
          <Button asChild className="mt-4 w-fit">
            <Link href="/sign-in">Sign in</Link>
          </Button>
          <Button variant="outline" asChild className="mt-4 w-fit">
            <Link href="/sign-up">Join the Guild</Link>
          </Button>
        </div>
        <div className="h-[1px] w-full bg-border my-12" />
        <div className="grid grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">🍄 Mushroom Database</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Identify edible vs toxic species with our comprehensive field guide.
            </p>
            <Button variant="secondary" asChild size="sm">
              <Link href="/sign-up">Get Access</Link>
            </Button>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">🌱 Seasonal Calendar</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Know what to forage and when, based on your region.
            </p>
            <Button variant="secondary" asChild size="sm">
              <Link href="/sign-up">Get Access</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
