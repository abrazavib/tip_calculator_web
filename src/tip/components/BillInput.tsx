import { useState } from "react";
import { LabelView } from "../../shared/LabelView";

interface BillInputProps {
  handleBillChange?: (bill: number) => void;
}

export const BillInput = ({ handleBillChange }: BillInputProps) => {
  const [amount, setAmount] = useState(0);
  console.log("BillInput amount:", amount);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleBillChange?.(parseFloat((event.target as HTMLInputElement).value));
    }
  };

  return (
    <div className="flex items-center gap-4 p-4">
      <LabelView label="Enter" value="your bill" />
      <input
        type="text"
        className="border border-gray-200 rounded-md p-2 placeholder-orange-500"
        placeholder="$"
        value={amount === 0 ? "" : amount}
        onChange={(event) => setAmount(parseFloat(event.target.value) || 0)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};
