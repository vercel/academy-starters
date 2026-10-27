"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/utils/styles";

type ForageItem = {
  name: string;
  type: "plant" | "mushroom" | "berry";
  edibility: "edible" | "caution" | "poisonous-lookalike";
  season: string;
  habitat: string;
  description: string;
  image: string;
  tips: string;
};

export default function FieldGuideCard({ className }: { className?: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ForageItem | null>(null);

  async function handleDiscover() {
    setIsLoading(true);
    const response = await fetch("/api/field-guide", {
      method: "POST",
    });
    const item = await response.json();
    setData(item);
    setIsLoading(false);
  }

  const edibilityBadge = {
    edible: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    caution: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    "poisonous-lookalike": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };

  const typeEmoji = {
    plant: "🌿",
    mushroom: "🍄",
    berry: "🫐",
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <h2 className="font-medium">Discover Wild Edibles</h2>
      <p className="text-muted-foreground">
        Explore our database of forageable plants, mushrooms, and berries.
      </p>
      <Button className="mt-4" onClick={handleDiscover} disabled={isLoading}>
        <Spinner variant="primary" isLoading={isLoading} />
        {isLoading ? "Searching..." : "Discover Something New"}
      </Button>
      {data && (
        <div className="mt-8 border rounded-lg overflow-hidden">
          <div className="aspect-video bg-muted flex items-center justify-center text-6xl">
            {typeEmoji[data.type]}
          </div>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-semibold">{data.name}</h3>
              <span
                className={cn(
                  "text-xs px-2 py-1 rounded-full font-medium",
                  edibilityBadge[data.edibility]
                )}
              >
                {data.edibility === "poisonous-lookalike"
                  ? "Has toxic lookalikes"
                  : data.edibility}
              </span>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              {data.description}
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Season:</span>{" "}
                <span className="text-muted-foreground">{data.season}</span>
              </div>
              <div>
                <span className="font-medium">Habitat:</span>{" "}
                <span className="text-muted-foreground">{data.habitat}</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <span className="font-medium text-sm">💡 Foraging Tip:</span>
              <p className="text-sm text-muted-foreground mt-1">{data.tips}</p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
