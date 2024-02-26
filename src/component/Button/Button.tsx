import React from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, ...props }) => {
  return (
    <div className="text-white">
      <button
        {...props}
        onClick={onClick}
        className="text-l p-2 w-auto bg-red-600 border-2 rounded-md"
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
