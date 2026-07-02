interface ResultViewProps {
  totalPerPerson: number;
  totalBill: number;
  totalTip: number;
}

export const ResultView = ({
  totalPerPerson,
  totalBill,
  totalTip,
}: ResultViewProps) => {
  return (
    <div className="flex flex-col items-center gap-4 bg-gray-100 pt-4">
      <div>
        <p className="text-center text-lg font-bold">Total p/person</p>
        <p className="text-center text-6xl">${totalPerPerson.toFixed(2)}</p>
      </div>
      <div className="columns-2">
        <div className="p-4">
          <p className="text-center text-lg">Total bill</p>
          <p className="text-left text-xl font-semibold">
            ${totalBill.toFixed(2)}
          </p>
        </div>
        <div className="p-4">
          <p className="text-center text-lg">Total tip</p>
          <p className="text-right text-xl font-semibold">
            ${totalTip.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};
