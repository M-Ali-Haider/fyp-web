import { SVGProps } from "@/types/svg";
import * as React from "react";
const LogoutSVG = (props: SVGProps) => (
  <svg
    width={32}
    height={33}
    viewBox="0 0 32 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M20 4.5H25.3333C26.0406 4.5 26.7189 4.78095 27.219 5.28105C27.719 5.78115 28 6.45942 28 7.16667V25.8333C28 26.5406 27.719 27.2189 27.219 27.719C26.7189 28.219 26.0406 28.5 25.3333 28.5H20M13.3333 23.1667L20 16.5M20 16.5L13.3333 9.83333M20 16.5H4"
      stroke="#0077CC"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default LogoutSVG;
