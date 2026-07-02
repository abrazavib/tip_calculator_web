import { useState } from "react";
import { ButtonTip } from "../../shared/ButtonTip";
import { LabelView } from "../../shared/LabelView";

interface TipInputViewProps {
  onTipSelected: (tip: number) => void;
}

export const TipInputView = ({ onTipSelected }: TipInputViewProps) => {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customTip, setCustomTip] = useState(0);

  const selectTip = (tip: number) => {
    setShowCustomInput(false);
    setCustomTip(0);
    onTipSelected(tip);
  };

  return (
    <div className="flex items-center gap-4 p-4">
      <LabelView label="Choose " value="your tip" />
      <div className="flex flex-wrap justify-left gap-4">
        <ButtonTip onClick={() => selectTip(5)}>5%</ButtonTip>
        <ButtonTip onClick={() => selectTip(10)}>10%</ButtonTip>
        <ButtonTip onClick={() => selectTip(15)}>15%</ButtonTip>
        <ButtonTip onClick={() => setShowCustomInput(true)}>Other</ButtonTip>
        {showCustomInput && (
          <input
            type="number"
            // min="0"
            // step="0"
            // value={customTip}
            placeholder="%"
            className="w-32 rounded-md border border-gray-200 p-2 placeholder-orange-500"
            onChange={(e) => setCustomTip(Number(e.target.value))}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onTipSelected(Number(customTip));
              }
            }}
          />
        )}
      </div>
    </div>
  );
};
