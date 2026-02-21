import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { AddListingForm } from "../AddListingForm";
import { Listing } from "../../types";

const mockListing: Listing = {
  id: 1,
  address: "123 Main St",
  price: 0,
  sqft: 0,
  commutes: {},
  laundry: "none",
  beds: 0,
  gym: false,
  available: "",
  posted: "",
  notes: "",
  link: ""
};

const mockListingWithScam: Listing = {
  ...mockListing,
  suspectedScam: true,
  scamReason: "Too good to be true"
};

describe("AddListingForm Labels", () => {
  const defaultProps = {
    newListing: mockListing,
    setNewListing: vi.fn(),
    importText: "",
    setImportText: vi.fn(),
    isImporting: false,
    isEstimating: false,
    destinations: [{ id: '1', name: 'Work', address: '123 Work St' }],
    newListingPPSQFT: 0,
    handleSmartImport: vi.fn(),
    handleEstimateCommutes: vi.fn(),
    handleAddListing: vi.fn(),
    setActiveTab: vi.fn(),
  };

  it("contains domain-specific language instead of AI/Gemini specific labels", () => {
    const { rerender } = render(<AddListingForm {...defaultProps} newListing={mockListing} />);
    
    // Check for absence of AI/Gemini specific labels
    expect(screen.queryByText(/Gemini/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/AI Smart Fill/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Estimate with AI/i)).not.toBeInTheDocument();
    
    // Check for presence of domain-specific labels
    expect(screen.getByText(/Smart Import/i)).toBeInTheDocument();
    expect(screen.getByText(/Estimate Travel Times/i)).toBeInTheDocument();

    // Check scam alert label
    rerender(<AddListingForm {...defaultProps} newListing={mockListingWithScam} />);
    expect(screen.queryByText(/AI Scam Alert/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Scam Alert/i)).toBeInTheDocument();
  });

  it("calls handleSmartImport when the extract button is clicked", () => {
    const handleSmartImport = vi.fn();
    render(<AddListingForm {...defaultProps} handleSmartImport={handleSmartImport} importText="test description" />);
    
    const extractButton = screen.getByRole("button", { name: /Extract/i });
    fireEvent.click(extractButton);
    
    expect(handleSmartImport).toHaveBeenCalledTimes(1);
  });
});
