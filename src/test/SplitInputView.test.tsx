import { fireEvent, render } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { SplitInputView } from "../tip/components/SplitInputView";

describe("SplitInputView", () => {
  test("should render the labels 'Split' and 'the total'", () => {
    const { getByText } = render(
      <SplitInputView
        split={1}
        onIncrementClick={vi.fn()}
        onDecrementClick={vi.fn()}
      />,
    );
    expect(getByText("Split")).toBeInTheDocument();
    expect(getByText("the total")).toBeInTheDocument();
  });

  test("should render increment (+) and decrement (-) buttons", () => {
    const { getByText } = render(
      <SplitInputView
        split={1}
        onIncrementClick={vi.fn()}
        onDecrementClick={vi.fn()}
      />,
    );
    expect(getByText("+")).toBeInTheDocument();
    expect(getByText("-")).toBeInTheDocument();
  });

  test("should display the current split value", () => {
    const { getByText } = render(
      <SplitInputView
        split={3}
        onIncrementClick={vi.fn()}
        onDecrementClick={vi.fn()}
      />,
    );
    expect(getByText("3")).toBeInTheDocument();
  });

  test("should display split value of 1", () => {
    const { getByText } = render(
      <SplitInputView
        split={1}
        onIncrementClick={vi.fn()}
        onDecrementClick={vi.fn()}
      />,
    );
    expect(getByText("1")).toBeInTheDocument();
  });

  test("should display large split value", () => {
    const { getByText } = render(
      <SplitInputView
        split={10}
        onIncrementClick={vi.fn()}
        onDecrementClick={vi.fn()}
      />,
    );
    expect(getByText("10")).toBeInTheDocument();
  });

  test("should call onIncrementClick when + button is clicked", () => {
    const onIncrementClick = vi.fn();
    const { getByText } = render(
      <SplitInputView
        split={1}
        onIncrementClick={onIncrementClick}
        onDecrementClick={vi.fn()}
      />,
    );
    fireEvent.click(getByText("+"));
    expect(onIncrementClick).toHaveBeenCalledTimes(1);
  });

  test("should call onDecrementClick when - button is clicked", () => {
    const onDecrementClick = vi.fn();
    const { getByText } = render(
      <SplitInputView
        split={2}
        onIncrementClick={vi.fn()}
        onDecrementClick={onDecrementClick}
      />,
    );
    fireEvent.click(getByText("-"));
    expect(onDecrementClick).toHaveBeenCalledTimes(1);
  });

  test("should call onIncrementClick multiple times on multiple clicks", () => {
    const onIncrementClick = vi.fn();
    const { getByText } = render(
      <SplitInputView
        split={1}
        onIncrementClick={onIncrementClick}
        onDecrementClick={vi.fn()}
      />,
    );
    fireEvent.click(getByText("+"));
    fireEvent.click(getByText("+"));
    fireEvent.click(getByText("+"));
    expect(onIncrementClick).toHaveBeenCalledTimes(3);
  });

  test("should call onDecrementClick multiple times on multiple clicks", () => {
    const onDecrementClick = vi.fn();
    const { getByText } = render(
      <SplitInputView
        split={5}
        onIncrementClick={vi.fn()}
        onDecrementClick={onDecrementClick}
      />,
    );
    fireEvent.click(getByText("-"));
    fireEvent.click(getByText("-"));
    expect(onDecrementClick).toHaveBeenCalledTimes(2);
  });

  test("should not call onDecrementClick when + is clicked", () => {
    const onDecrementClick = vi.fn();
    const { getByText } = render(
      <SplitInputView
        split={1}
        onIncrementClick={vi.fn()}
        onDecrementClick={onDecrementClick}
      />,
    );
    fireEvent.click(getByText("+"));
    expect(onDecrementClick).not.toHaveBeenCalled();
  });

  test("should not call onIncrementClick when - is clicked", () => {
    const onIncrementClick = vi.fn();
    const { getByText } = render(
      <SplitInputView
        split={2}
        onIncrementClick={onIncrementClick}
        onDecrementClick={vi.fn()}
      />,
    );
    fireEvent.click(getByText("-"));
    expect(onIncrementClick).not.toHaveBeenCalled();
  });

  test("should match snapshot", () => {
    const { container } = render(
      <SplitInputView
        split={2}
        onIncrementClick={vi.fn()}
        onDecrementClick={vi.fn()}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
