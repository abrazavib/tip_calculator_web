import { CustomButton } from "../../shared/CustomButton";
import { CustomLabel } from "../../shared/CustomLabel";

interface SplitInputViewProps {
  split: number;
  onIncrementClick: () => void;
  onDecrementClick: () => void;
}

export const SplitInputView = ({
  split,
  onIncrementClick,
  onDecrementClick,
}: SplitInputViewProps) => {
  return (
    <div className="flex items-center gap-4 p-4">
      <CustomLabel label="Split " value="the total" />
      <CustomButton onClick={onDecrementClick}>-</CustomButton>
      <p className="flex w-12 text-lg font-semibold items-center justify-center text-orange-500">
        {split}
      </p>
      <CustomButton onClick={onIncrementClick}>+</CustomButton>
    </div>
  );
};
