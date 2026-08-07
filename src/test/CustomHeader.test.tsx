import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { CustomHeader } from "../shared/components/CustomHeader";

describe("CustomHeader", () => {
  test("should render the custom header component", () => {
    const { container } = render(
      <CustomHeader title="Test Header" subtitle="Test Subtitle" />,
    );
    expect(container).toMatchSnapshot();
    expect(screen.getByText("Test Header")).toBeDefined();
    expect(screen.getByText("Test Subtitle")).toBeDefined();
  });
});
