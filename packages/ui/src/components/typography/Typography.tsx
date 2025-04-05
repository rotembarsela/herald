import * as React from "react";

type TypographyVariant = "h1" | "h2" | "h3" | "p" | "span";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  className?: string;
  children: React.ReactNode;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = "p",
  children,
  ...rest
}) => {
  const Component = variant;
  return <Component {...rest}>{children}</Component>;
};
