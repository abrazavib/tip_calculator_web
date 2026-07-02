import logo from "../assets/icCalculatorBW.png";

interface Props {
  title: string;
  subtitle?: string;
}

export const CustomHeader = ({ title, subtitle }: Props) => {
  return (
    <header className="flex justify-center pb-8">
      <div className="flex items-center gap-4">
        <img src={logo} className="w-24" />
        <div>
          <h1 className="text-6xl font-bold">{title}</h1>
          <p className="text-xl text-gray-400">{subtitle}</p>
        </div>
      </div>
    </header>
  );
};
