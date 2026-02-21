import { LucideIcon } from "lucide-react";

export interface Destination {
  id: string;
  name: string;
  address: string;
}

export interface Listing {
  id: number;
  address: string;
  price: number;
  sqft: number;
  commutes: Record<string, number | string>;
  laundry: string;
  beds: number;
  gym: boolean;
  available: string;
  posted: string;
  notes: string;
  link: string;
  isScam?: boolean;
  scamReason?: string;
  suspectedScam?: boolean;
  score?: string;
  ppsqft?: string;
}

export interface Criteria {
  label: string;
  icon: LucideIcon;
  desc: string;
  isDynamic?: boolean;
}

export interface AnalysisResult {
  pros: string[];
  cons: string[];
  verdict: string;
  scam_warning: string | null;
}
