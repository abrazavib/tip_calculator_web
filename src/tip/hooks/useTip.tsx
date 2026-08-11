import { useState } from "react";

export const useTip = () => {
  const [bill, setBill] = useState(0);
  const [tip, setTip] = useState(0);
  const [split, setSplit] = useState(1);

  const handleTipClicked = async (tip: number) => {
    setTip(tip);
  };

  const handleIncrementClick = () => {
    setSplit((prevSplit) => prevSplit + 1);
  };

  const handleDecrementClick = () => {
    setSplit((prevSplit) => (prevSplit > 1 ? prevSplit - 1 : 1));
  };

  const handleBillChange = (bill: number) => {
    setBill(bill);
  };

  const handleReset = () => {
    setBill(0);
    setTip(0);
    setSplit(1);
  };

  return {
    // Properties
    bill,
    tip,
    split,
    // Computed values
    totalTip: (bill * tip) / 100,
    totalAmount: bill + (bill * tip) / 100,
    amountPerPerson: (bill + (bill * tip) / 100) / split,

    // Methods
    handleTipClicked,
    handleIncrementClick,
    handleDecrementClick,
    handleBillChange,
    handleReset,
  };
};
