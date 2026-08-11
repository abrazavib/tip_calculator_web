import { useEffect, useState } from "react";
import { CustomLabel } from "../../shared/components/CustomLabel";

interface BillInputProps {
  bill?: number;
  handleBillChange?: (bill: number) => void;
}

export const BillInput = ({ bill = 0, handleBillChange }: BillInputProps) => {
  const [amount, setAmount] = useState("");

  useEffect(() => {
    setAmount(bill === 0 ? "" : bill.toString());
  }, [bill]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleBillChange?.(parseFloat(amount.replace(",", ".")) || 0);
    }
  };

  return (
    <div className="flex items-center gap-4 p-4">
      <CustomLabel label="Enter" value="your bill" />
      <input
        type="text"
        inputMode="decimal"
        className="border border-gray-200 rounded-md p-2 placeholder-orange-500"
        placeholder="$"
        value={amount}
        onChange={(event) => {
          const val = event.target.value;
          if (/^[0-9]*[.,]?[0-9]*$/.test(val)) {
            setAmount(val);
          }
        }}
        onBlur={() =>
          handleBillChange?.(parseFloat(amount.replace(",", ".")) || 0)
        }
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};
