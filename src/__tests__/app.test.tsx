import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import App from "../app";
import * as extractionService from "../services/data-extraction";

vi.mock("../services/data-extraction", () => ({
  extractListingData: vi.fn(),
  login: vi.fn(),
}));

describe("App Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("updates form when smart import succeeds", async () => {
    const mockData = {
      address: "123 Smart St",
      price: 1234,
      beds: 3,
      sqft: 1200,
    };
    (extractionService.extractListingData as any).mockResolvedValue(mockData);

    render(<App />);
    
    // Switch to add tab
    const addTabButton = screen.getByRole('button', { name: /Add New/i });
    fireEvent.click(addTabButton);

    const input = screen.getByPlaceholderText(/Paste text like/i);
    fireEvent.change(input, { target: { value: "some listing text" } });
    
    const extractButton = screen.getByRole('button', { name: /Extract/i });
    fireEvent.click(extractButton);

    await waitFor(() => {
      expect(extractionService.extractListingData).toHaveBeenCalledWith("some listing text");
    });

    // Check if form is populated
    await waitFor(() => {
      expect(screen.getByDisplayValue("123 Smart St")).toBeInTheDocument();
      expect(screen.getByDisplayValue("1234")).toBeInTheDocument();
    });
  });
});
