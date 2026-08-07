import { CustomHeader } from "../../shared/components/CustomHeader";
import { BillInput } from "./BillInput";
import { ResultView } from "./ResultView";
import { SplitInputView } from "./SplitInputView";
import { TipInputView } from "./TipInputView";
import { useTip } from "../hooks/useTip";

export const CalculatorView = () => {
  const {
    split,
    totalTip,
    totalAmount,
    amountPerPerson,
    handleTipClicked,
    handleIncrementClick,
    handleDecrementClick,
    handleBillChange,
  } = useTip();
  return (
    <>
      <div className="rounded-2x1 bg-white shadow-lg pt-8">
        {/* Header */}
        <CustomHeader title="Tip" subtitle="Calculator" />
        {/* Show results */}
        <ResultView
          totalTip={totalTip}
          totalBill={totalAmount}
          totalPerPerson={amountPerPerson}
        />
        {/* Enter your bill amount */}
        <BillInput handleBillChange={handleBillChange} />
        {/* Select a tip */}
        <TipInputView onTipSelected={handleTipClicked} />
        {/* Split the bill */}
        <SplitInputView
          split={split}
          onIncrementClick={handleIncrementClick}
          onDecrementClick={handleDecrementClick}
        />
      </div>
    </>
  );
};
