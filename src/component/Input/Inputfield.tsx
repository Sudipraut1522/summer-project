import React from "react";

interface InputFieldProps {
  type: string;
  placeholder: string;
  labelname: string;
  register?: any;
  name: string;
  [x: string]: any;
  leftIcon?: React.ReactElement;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  labelname,
  name,
  register,
  leftIcon,
  ...rest
}) => {
  return (
    <div className="flex flex-col">
      <br />
      <label>{labelname}</label>
      <br />
      <input
        name={name}
        type={type}
        {...register(name)}
        placeholder={placeholder}
        className="text-l p-2 border-2 border-red-600 rounded-md"
        {...rest}
      />
    </div>
  );
};

export default InputField;
