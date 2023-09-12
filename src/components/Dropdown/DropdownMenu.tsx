import React from "react";

interface DropdownMenuProps {
  items: {
    key: string;
    label: React.ReactNode;
    href?: string;
    disabled?: boolean;
  }[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ items }) => {
  return (
    <div className="absolute right-0 mt-2 w-40 rounded border bg-white z-30">
      {items.map((item) => (
        <a
          key={item.key}
          href={item.href ?? "#"}
          className={`block px-2 py-1 hover:bg-gray-300 ${
            item.disabled ? "cursor-not-allowed text-gray-400" : ""
          }`}
          onClick={(e) => item.disabled && e.preventDefault()}
        >
          {item.label}
        </a>
      ))}
    </div>
  );
};

export default DropdownMenu;
