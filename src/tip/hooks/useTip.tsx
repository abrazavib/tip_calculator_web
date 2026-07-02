import { useState } from "react";

export const useTip = () => {
  const [bill, setBill] = useState(0);
  const [tip, setTip] = useState(0);
  const [split, setSplit] = useState(1);

  const handleTipClicked = async (tip: number) => {
    console.log(`Tip clicked: ${tip}%`);
    setTip(tip);
  };

  const handleIncrementClick = () => {
    console.log("Increment clicked");
    setSplit((prevSplit) => prevSplit + 1);
  };

  const handleDecrementClick = () => {
    console.log("Decrement clicked");
    setSplit((prevSplit) => (prevSplit > 1 ? prevSplit - 1 : 1));
  };

  const handleBillChange = (bill: number) => {
    console.log(`Bill changed: $${bill}`);
    setBill(bill);
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
  };
};
