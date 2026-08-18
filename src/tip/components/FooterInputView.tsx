import { CustomButton } from "../../shared/components/CustomButton";

interface FooterInputViewProps {
  onReset: () => void;
  onSave: () => void;
  isSaveDisabled?: boolean;
}

export const FooterInputView = ({
  onReset,
  onSave,
  isSaveDisabled,
}: FooterInputViewProps) => {
  return (
    <div className="flex flex-col gap-3 p-4">
      <CustomButton onClick={onReset}>Restablecer valores</CustomButton>
      <CustomButton onClick={onSave} disabled={isSaveDisabled}>
        Guardar en registro
      </CustomButton>
    </div>
  );
};
