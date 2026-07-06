import { fireEvent, render } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { TipInputView } from "../tip/components/TipInputView";

describe("TipInputView", () => {
  test("should render the labels 'Choose' and 'your tip'", () => {
    const { getByText } = render(<TipInputView onTipSelected={vi.fn()} />);
    expect(getByText("Choose")).toBeInTheDocument();
    expect(getByText("your tip")).toBeInTheDocument();
  });

  test("should render the preset tip buttons 5%, 10%, 15% and Other", () => {
    const { getByText } = render(<TipInputView onTipSelected={vi.fn()} />);
    expect(getByText("5%")).toBeInTheDocument();
    expect(getByText("10%")).toBeInTheDocument();
    expect(getByText("15%")).toBeInTheDocument();
    expect(getByText("Other")).toBeInTheDocument();
  });

  test("should call onTipSelected with 5 when clicking 5%", () => {
    const onTipSelected = vi.fn();
    const { getByText } = render(
      <TipInputView onTipSelected={onTipSelected} />,
    );
    fireEvent.click(getByText("5%"));
    expect(onTipSelected).toHaveBeenCalledWith(5);
  });

  test("should call onTipSelected with 10 when clicking 10%", () => {
    const onTipSelected = vi.fn();
    const { getByText } = render(
      <TipInputView onTipSelected={onTipSelected} />,
    );
    fireEvent.click(getByText("10%"));
    expect(onTipSelected).toHaveBeenCalledWith(10);
  });

  test("should call onTipSelected with 15 when clicking 15%", () => {
    const onTipSelected = vi.fn();
    const { getByText } = render(
      <TipInputView onTipSelected={onTipSelected} />,
    );
    fireEvent.click(getByText("15%"));
    expect(onTipSelected).toHaveBeenCalledWith(15);
  });

  test("should not show custom input by default", () => {
    const { queryByPlaceholderText } = render(
      <TipInputView onTipSelected={vi.fn()} />,
    );
    expect(queryByPlaceholderText("%")).not.toBeInTheDocument();
  });

  test("should show custom input when clicking Other", () => {
    const { getByText, getByPlaceholderText } = render(
      <TipInputView onTipSelected={vi.fn()} />,
    );
    fireEvent.click(getByText("Other"));
    expect(getByPlaceholderText("%")).toBeInTheDocument();
  });

  test("should accept integer input in custom field", () => {
    const { getByText, getByPlaceholderText } = render(
      <TipInputView onTipSelected={vi.fn()} />,
    );
    fireEvent.click(getByText("Other"));
    const input = getByPlaceholderText("%") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "20" } });
    expect(input.value).toBe("20");
  });

  test("should reject non-numeric characters in custom field", () => {
    const { getByText, getByPlaceholderText } = render(
      <TipInputView onTipSelected={vi.fn()} />,
    );
    fireEvent.click(getByText("Other"));
    const input = getByPlaceholderText("%") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "abc" } });
    expect(input.value).toBe("");
  });

  test("should reject decimal input in custom field", () => {
    const { getByText, getByPlaceholderText } = render(
      <TipInputView onTipSelected={vi.fn()} />,
    );
    fireEvent.click(getByText("Other"));
    const input = getByPlaceholderText("%") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "12.5" } });
    expect(input.value).toBe("");
  });

  test("should call onTipSelected with parsed integer on Enter", () => {
    const onTipSelected = vi.fn();
    const { getByText, getByPlaceholderText } = render(
      <TipInputView onTipSelected={onTipSelected} />,
    );
    fireEvent.click(getByText("Other"));
    const input = getByPlaceholderText("%") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "20" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onTipSelected).toHaveBeenCalledWith(20);
  });

  test("should call onTipSelected with 0 on Enter when custom input is empty", () => {
    const onTipSelected = vi.fn();
    const { getByText, getByPlaceholderText } = render(
      <TipInputView onTipSelected={onTipSelected} />,
    );
    fireEvent.click(getByText("Other"));
    const input = getByPlaceholderText("%") as HTMLInputElement;
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onTipSelected).toHaveBeenCalledWith(0);
  });

  test("should call onTipSelected with parsed integer on blur", () => {
    const onTipSelected = vi.fn();
    const { getByText, getByPlaceholderText } = render(
      <TipInputView onTipSelected={onTipSelected} />,
    );
    fireEvent.click(getByText("Other"));
    const input = getByPlaceholderText("%") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "18" } });
    fireEvent.blur(input);
    expect(onTipSelected).toHaveBeenCalledWith(18);
  });

  test("should hide custom input and reset after selecting a preset tip", () => {
    const onTipSelected = vi.fn();
    const { getByText, queryByPlaceholderText } = render(
      <TipInputView onTipSelected={onTipSelected} />,
    );
    fireEvent.click(getByText("Other"));
    fireEvent.click(getByText("5%"));
    expect(queryByPlaceholderText("%")).not.toBeInTheDocument();
    expect(onTipSelected).toHaveBeenCalledWith(5);
  });
});
