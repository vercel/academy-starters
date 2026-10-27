export interface Spring {
  id: string;
  name: string;
  description: string;
  location: {
    region: string;
    country: string;
    lat: number;
    lng: number;
  };
  temperature: {
    min: number;
    max: number;
  };
  type: "wild" | "developed" | "resort";
  features: string[];
  elevation: number;
  imageUrl: string;
}
