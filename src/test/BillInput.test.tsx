import { fireEvent, render } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { BillInput } from "../tip/components/BillInput";

describe("BillInput", () => {
  test("should render the input with placeholder", () => {
    const { getByPlaceholderText } = render(<BillInput />);
    expect(getByPlaceholderText("$")).toBeInTheDocument();
  });

  test("should render the labels 'Enter' and 'your bill'", () => {
    const { getByText } = render(<BillInput />);
    expect(getByText("Enter")).toBeInTheDocument();
    expect(getByText("your bill")).toBeInTheDocument();
  });

  test("should accept numeric input", () => {
    const { getByPlaceholderText } = render(<BillInput />);
    const input = getByPlaceholderText("$") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "50" } });
    expect(input.value).toBe("50");
  });

  test("should accept decimal input with period", () => {
    const { getByPlaceholderText } = render(<BillInput />);
    const input = getByPlaceholderText("$") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "50.75" } });
    expect(input.value).toBe("50.75");
  });

  test("should accept decimal input with comma", () => {
    const { getByPlaceholderText } = render(<BillInput />);
    const input = getByPlaceholderText("$") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "50,75" } });
    expect(input.value).toBe("50,75");
  });

  test("should reject non-numeric characters", () => {
    const { getByPlaceholderText } = render(<BillInput />);
    const input = getByPlaceholderText("$") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "abc" } });
    expect(input.value).toBe("");
  });

  test("should call handleBillChange with parsed value on Enter", () => {
    const handleBillChange = vi.fn();
    const { getByPlaceholderText } = render(
      <BillInput handleBillChange={handleBillChange} />,
    );
    const input = getByPlaceholderText("$") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "100" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(handleBillChange).toHaveBeenCalledWith(100);
  });

  test("should call handleBillChange with 0 on Enter when input is empty", () => {
    const handleBillChange = vi.fn();
    const { getByPlaceholderText } = render(
      <BillInput handleBillChange={handleBillChange} />,
    );
    const input = getByPlaceholderText("$") as HTMLInputElement;
    fireEvent.keyDown(input, { key: "Enter" });
    expect(handleBillChange).toHaveBeenCalledWith(0);
  });

  test("should call handleBillChange with parsed value on blur", () => {
    const handleBillChange = vi.fn();
    const { getByPlaceholderText } = render(
      <BillInput handleBillChange={handleBillChange} />,
    );
    const input = getByPlaceholderText("$") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "75.5" } });
    fireEvent.blur(input);
    expect(handleBillChange).toHaveBeenCalledWith(75.5);
  });

  test("should call handleBillChange with 0 on blur when input is empty", () => {
    const handleBillChange = vi.fn();
    const { getByPlaceholderText } = render(
      <BillInput handleBillChange={handleBillChange} />,
    );
    const input = getByPlaceholderText("$") as HTMLInputElement;
    fireEvent.blur(input);
    expect(handleBillChange).toHaveBeenCalledWith(0);
  });

  test("should convert comma decimal to number when pressing Enter", () => {
    const handleBillChange = vi.fn();
    const { getByPlaceholderText } = render(
      <BillInput handleBillChange={handleBillChange} />,
    );
    const input = getByPlaceholderText("$") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "99,99" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(handleBillChange).toHaveBeenCalledWith(99.99);
  });
});
