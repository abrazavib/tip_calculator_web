import { useState } from "react";
import { CustomButton } from "../../shared/components/CustomButton";
import { CustomLabel } from "../../shared/components/CustomLabel";

interface TipInputViewProps {
  onTipSelected: (tip: number) => void;
}

export const TipInputView = ({ onTipSelected }: TipInputViewProps) => {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customTip, setCustomTip] = useState("");

  const selectTip = (tip: number) => {
    setShowCustomInput(false);
    setCustomTip("");
    onTipSelected(tip);
  };

  return (
    <div className="flex items-center gap-4 p-4">
      <CustomLabel label="Choose " value="your tip" />
      <div className="flex flex-wrap justify-left gap-4">
        <CustomButton onClick={() => selectTip(5)}>5%</CustomButton>
        <CustomButton onClick={() => selectTip(10)}>10%</CustomButton>
        <CustomButton onClick={() => selectTip(15)}>15%</CustomButton>
        <CustomButton onClick={() => setShowCustomInput(true)}>
          Other
        </CustomButton>
        {showCustomInput && (
          <input
            type="text"
            inputMode="numeric"
            value={customTip}
            placeholder="%"
            className="w-32 rounded-md border border-gray-200 p-2 placeholder-orange-500"
            onChange={(e) => {
              const val = e.target.value;
              if (/^[0-9]*$/.test(val)) {
                setCustomTip(val);
              }
            }}
            onBlur={() => onTipSelected(parseInt(customTip) || 0)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onTipSelected(parseInt(customTip) || 0);
              }
            }}
          />
        )}
      </div>
    </div>
  );
};
