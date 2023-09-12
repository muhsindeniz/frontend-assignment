import React, { useState, useRef, useEffect } from "react";
import DropdownMenu from "./DropdownMenu";

interface DropdownProps {
  menu: {
    items: {
      key: string;
      label: React.ReactNode;
      href?: string;
      disabled?: boolean;
    }[];
  };
  children: React.ReactNode;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ menu, children, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div className={`relative inline-block text-left cursor-pointer`} ref={ref}>
      <div onClick={() => setIsOpen(!isOpen)} className={`${className}`}>
        {children}
      </div>

      {isOpen && <DropdownMenu items={menu.items} />}
    </div>
  );
};

export default Dropdown;
