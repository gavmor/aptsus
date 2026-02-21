import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Input } from "../Input";

describe("Input", () => {
  it("renders label correctly", () => {
    render(<Input label="Username" value="" onChange={() => {}} />);
    expect(screen.getByText("Username")).toBeInTheDocument();
  });

  it("calls onChange when value changes", () => {
    const handleChange = vi.fn();
    render(<Input value="" onChange={handleChange} placeholder="Type here" />);
    const input = screen.getByPlaceholderText("Type here");
    fireEvent.change(input, { target: { value: "hello" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("renders prefix and suffix", () => {
    render(
      <Input
        value=""
        onChange={() => {}}
        prefix={<span>$</span>}
        suffix={<span>sqft</span>}
      />
    );
    expect(screen.getByText("$")).toBeInTheDocument();
    expect(screen.getByText("sqft")).toBeInTheDocument();
  });
});
