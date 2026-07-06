import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { ResultView } from "../tip/components/ResultView";

describe("ResultView", () => {
  test("should render the ResultView component", () => {
    const { container } = render(
      <ResultView totalTip={10} totalBill={100} totalPerPerson={25} />,
    );
    expect(container).toMatchSnapshot();
  });

  test("should display totalPerPerson formatted with 2 decimals", () => {
    const { getByText } = render(
      <ResultView totalTip={5} totalBill={50} totalPerPerson={27.5} />,
    );
    expect(getByText("$27.50")).toBeInTheDocument();
  });

  test("should display totalBill formatted with 2 decimals", () => {
    const { getByText } = render(
      <ResultView totalTip={5} totalBill={99.9} totalPerPerson={10} />,
    );
    expect(getByText("$99.90")).toBeInTheDocument();
  });

  test("should display totalTip formatted with 2 decimals", () => {
    const { getByText } = render(
      <ResultView totalTip={12.5} totalBill={100} totalPerPerson={10} />,
    );
    expect(getByText("$12.50")).toBeInTheDocument();
  });

  test("should display all values as zero when props are 0", () => {
    const { getAllByText } = render(
      <ResultView totalTip={0} totalBill={0} totalPerPerson={0} />,
    );
    const zeros = getAllByText("$0.00");
    expect(zeros).toHaveLength(3);
  });

  test("should render labels for total bill, total tip and total per person", () => {
    const { getByText } = render(
      <ResultView totalTip={10} totalBill={100} totalPerPerson={25} />,
    );
    expect(getByText("Total p/person")).toBeInTheDocument();
    expect(getByText("Total bill")).toBeInTheDocument();
    expect(getByText("Total tip")).toBeInTheDocument();
  });
});
