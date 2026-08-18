import { NavLink } from "react-router-dom";
import { Calculator, History, User } from "lucide-react";

export const BottomNav = () => {
  const navItems = [
    { path: "/calculator", label: "Tip Calculator", icon: Calculator },
    { path: "/history", label: "History", icon: History },
    { path: "/profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="flex h-16 w-full items-center justify-around bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => {
        const IconComponent = item.icon;

        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full transition-colors ${
                isActive ? "text-blue-600" : "text-gray-400 hover:text-gray-600"
              }`
            }
          >
            <IconComponent className="h-6 w-6 mb-1" strokeWidth={2} />

            <span className="text-xs font-medium">{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};
