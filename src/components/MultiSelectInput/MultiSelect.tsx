// components/MultiSelectInput.tsx

import React, { useState, useRef, useEffect } from "react";

type MultiSelectInputProps = {
  options: string[];
  onChange: (selectedOptions: string[]) => void;
};

const MultiSelectInput: React.FC<MultiSelectInputProps> = ({
  options,
  onChange,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [filteredOptions, setFilteredOptions] = useState<string[]>(options);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFilteredOptions(
      options.filter((opt) =>
        opt.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  }, [searchTerm, options]);

  const handleSelect = (option: string) => {
    const newSelected = [...selected, option];
    setSelected(newSelected);
    onChange(newSelected);
    setSearchTerm("");
    inputRef.current?.focus();
  };

  const handleRemove = (option: string) => {
    const newSelected = selected.filter((item) => item !== option);
    setSelected(newSelected);
    onChange(newSelected);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        ref={inputRef}
        className="w-full rounded-md border p-2"
      />
      {searchTerm && (
        <ul className="absolute z-10 mt-2 w-full rounded-md border bg-white shadow-lg">
          {filteredOptions.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className="cursor-pointer p-2 hover:bg-gray-200"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-2 flex space-x-2">
        {selected.map((item) => (
          <span
            key={item}
            className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
          >
            {item}
            <button
              onClick={() => handleRemove(item)}
              className="ml-2 text-blue-700 hover:text-blue-900"
            >
              x
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default MultiSelectInput;
