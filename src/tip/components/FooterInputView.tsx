import { CustomButton } from "../../shared/components/CustomButton";

interface FooterInputViewProps {
  onReset: () => void;
  onSave: () => void;
}

export const FooterInputView = ({ onReset, onSave }: FooterInputViewProps) => {
  return (
    <div className="flex flex-col gap-3 p-4">
      <CustomButton onClick={onReset}>Restablecer valores</CustomButton>
      <CustomButton onClick={onSave}>Guardar en registro</CustomButton>
    </div>
  );
};
