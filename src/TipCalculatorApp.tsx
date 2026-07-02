import { CustomHeader } from "./shared/CustomHeader";
import { BillInput } from "./tip/components/BillInput";
import { ResultView } from "./tip/components/ResultView";
import { SplitInputView } from "./tip/components/SplitInputView";
import { TipInputView } from "./tip/components/TipInputView";
import { useTip } from "./tip/hooks/useTip";

export const TipCalculatorApp = () => {
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
