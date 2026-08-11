import { useNavigate } from "react-router-dom";
import { CustomHeader } from "../../shared/components/CustomHeader";
import { BillInput } from "./BillInput";
import { FooterInputView } from "./FooterInputView";
import { ResultView } from "./ResultView";
import { SplitInputView } from "./SplitInputView";
import { TipInputView } from "./TipInputView";
import { useTip } from "../hooks/useTip";

export const CalculatorView = () => {
  const navigate = useNavigate();
  const {
    bill,
    split,
    totalTip,
    totalAmount,
    amountPerPerson,
    handleTipClicked,
    handleIncrementClick,
    handleDecrementClick,
    handleBillChange,
    handleReset,
  } = useTip();

  return (
    <div className="mx-auto max-w-xl rounded-2x1 bg-white shadow-lg pt-16">
      <div className="rounded-2x1 bg-white shadow-lg">
        {/* Header */}
        <CustomHeader title="Tip" subtitle="Calculator" />
        {/* Show results */}
        <ResultView
          totalTip={totalTip}
          totalBill={totalAmount}
          totalPerPerson={amountPerPerson}
        />
        {/* Enter your bill amount */}
        <BillInput bill={bill} handleBillChange={handleBillChange} />
        {/* Select a tip */}
        <TipInputView onTipSelected={handleTipClicked} />
        {/* Split the bill */}
        <SplitInputView
          split={split}
          onIncrementClick={handleIncrementClick}
          onDecrementClick={handleDecrementClick}
        />
        {/* Footer actions */}
        <FooterInputView
          onReset={handleReset}
          onSave={() =>
            navigate("/expense", { state: { totalPerPerson: amountPerPerson } })
          }
        />
      </div>
    </div>
  );
};
