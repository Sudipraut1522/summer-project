import React from "react";

interface IHeader {
  className?: string;
  variant?: "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
}

const variantClassName = {
  sm: "text-xl",
  md: "text-2xl",
  lg: "lg:text-3xl text-2xl",
  xl: "text-4xl",
};

export const Header: React.FC<IHeader> = (props) => {
  const { className, variant = "md", children } = props;

  return (
    <h1
      className={`py-10 uppercase font-semibold leading-8 ${variantClassName[variant]} ${className}`}
    >
      {children}
    </h1>
  );
};
