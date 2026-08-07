export const CustomLabel = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div className="pr-4">
      <p className="text-lg font-semibold text-orange-500">{label}</p>
      <p className="text-base text-orange-500">{value}</p>
    </div>
  );
};
