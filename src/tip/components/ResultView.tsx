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
        <p className="text-center text-lg font-bold text-orange-500">
          Total p/person
        </p>
        <p className="text-center text-6xl">${totalPerPerson.toFixed(2)}</p>
      </div>
      <div className="columns-2 w-full">
        <div className="p-4 pl-10 md:w-full">
          <p className="text-left text-lg text-orange-500">Total bill</p>
          <p className="text-left text-xl font-semibold">
            ${totalBill.toFixed(2)}
          </p>
        </div>
        <div className="p-4 pr-10 md:w-full">
          <p className="text-right text-lg text-orange-500">Total tip</p>
          <p className="text-right text-xl font-semibold">
            ${totalTip.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};
