import { CustomLabel } from "./CustomLabel";

export interface SelectOption {
  id: string;
  name: string;
}

export const CustomSelect = ({
  label,
  placeholder,
  options,
  value,
  onChange,
  loading,
  maxWidth = "max-w-sm",
}: {
  label: string;
  placeholder?: string;
  options: SelectOption[];
  value: string | number;
  onChange: (val: string) => void;
  loading?: boolean;
  maxWidth?: string;
}) => {
  return (
    <div className="mb-4">
      <CustomLabel label={label} value={placeholder ?? ""} />
      {loading && options.length === 0 ? (
        <p className="text-sm text-gray-500">Cargando...</p>
      ) : (
        <div className={`relative w-full ${maxWidth}`}>
          <select
            className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-2.5 pl-4 pr-10 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none"
            value={String(value ?? "")}
            onChange={(e) => onChange(e.target.value)}
          >
            {options.map((o) => (
              <option key={o.id} value={o.id}>
                {o.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
