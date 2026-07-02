import { ButtonTip } from "../../shared/ButtonTip";
import { LabelView } from "../../shared/LabelView";

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
      <LabelView label="Split " value="the total" />
      <ButtonTip onClick={onDecrementClick}>-</ButtonTip>
      <p className="flex w-12 text-lg font-semibold items-center justify-center">
        {split}
      </p>
      <ButtonTip onClick={onIncrementClick}>+</ButtonTip>
    </div>
  );
};
