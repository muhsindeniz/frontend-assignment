import React, { ChangeEvent, useState } from "react";
import { AiOutlineFile, AiOutlineClose } from "react-icons/ai";
import { IoIosImages } from "react-icons/io";

type Props = {
  accept?: string;
  onChange?: (files: File[] | null) => void;
  className?: string;
  multiple?: boolean;
  type?: "single" | "multiple";
  defaultValue?: File | File[] | string;
};

const FileUpload: React.FC<Props> = ({
  accept,
  onChange,
  defaultValue,
  className,
  multiple,
  type = "single",
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>(() => {
    if (Array.isArray(defaultValue)) {
      return defaultValue;
    } else if (defaultValue instanceof File) {
      return [defaultValue];
    } else {
      return [];
    }
  });
  const [defaultImageUrl, setDefaultImageUrl] = useState<string>(() => {
    if (typeof defaultValue === "string") {
      return defaultValue;
    } else {
      return "";
    }
  });
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files && Array.from(event.target.files);
    if (uploadedFiles && uploadedFiles.length) {
      setSelectedFiles(uploadedFiles);
      onChange && onChange(uploadedFiles);
    }
  };

  const clearSelectedFile = (index: number) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        style={{ display: "none" }}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        multiple={type === "multiple" || multiple}
      />
      {type === "single" && (selectedFiles.length > 0 || defaultImageUrl) ? (
        <div className="relative w-max">
          <img
            src={
              selectedFiles.length > 0
                ? URL.createObjectURL(selectedFiles[0]!)
                : defaultImageUrl
            }
            alt="Preview"
            className="h-20 w-20 rounded-md object-cover"
          />
          <div className="absolute -right-2 -top-2 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-white text-black transition-all hover:bg-gray-300">
            <AiOutlineClose
              size={12}
              onClick={(e) => {
                setSelectedFiles([]);
                setDefaultImageUrl("");
                e.stopPropagation();
              }}
            />
          </div>
        </div>
      ) : selectedFiles.length === 0 ? (
        <div
          className="flex h-20 w-20 items-center justify-center rounded-md border border-gray-300 p-4 hover:cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <IoIosImages size={30} />
        </div>
      ) : (
        <label onClick={() => fileInputRef.current?.click()}>
          {`${selectedFiles.length} File${selectedFiles.length > 1 ? "s" : ""}`}
        </label>
      )}

      <div className="my-5 flex gap-3">
        {type === "multiple" &&
          selectedFiles.map((file, index) => (
            <div className="relative w-max" key={index}>
              {file.type.includes("image") ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="h-20 w-20 rounded-md object-cover"
                />
              ) : (
                <AiOutlineFile size={40} />
              )}
              <div className="absolute -right-2 -top-2 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-white text-black transition-all hover:bg-gray-300">
                <AiOutlineClose
                  size={12}
                  onClick={(e) => {
                    clearSelectedFile(index);
                    e.stopPropagation();
                  }}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FileUpload;
