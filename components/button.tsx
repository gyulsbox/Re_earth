import { setClassName } from "@libs/client/utils";

interface ButtonProps {
  large?: boolean;
  text: string;
  [key: string]: any;
}

export default function Button({
  large = false,
  onClick,
  text,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={setClassName(
        "w-full bg-amber-800 hover:bg-amber-700 text-white  px-4 border border-transparent rounded-md shadow-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 focus:outline-none",
        large ? "py-3 text-base" : "py-2 text-sm ",
      )}
    >
      {text}
    </button>
  );
}
