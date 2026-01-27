import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    variant?: "primary" | "secondary" | "danger";
    sizeVariant?: "sm" | "md" | "lg";
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    className?: string;
}
export default function Button({
    children,
    variant = "primary",
    sizeVariant = "md",
    disabled = false,
    type = "button",
    className,
    ...props
}: ButtonProps) {
    const base: string = `font-semibold transition outline-0 focus-visible:outline focus-visible:outline-blue-800 w-full lg:w-fit`;
    const sizes = {
        sm: "px-3 py-1 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-5 py-3 text-lg",
    };
    const variants = {
        primary: `${
            !disabled
                ? "text-black border-b-4 border-b-neutral-400 text-neutral-800 bg-white hover:bg-neutral-100 rounded-md cursor-pointer"
                : "bg-white/30 text-neutral-600 rounded-md cursor-default"
        }`,
        secondary: `${
            !disabled
                ? "text-neutral-700 bg-amber-400 text-white text-shadow-md text-shadow-black/40 hover:bg-amber-300 focus-visible:bg-amber-300 border-b-5 border-b-amber-600 cursor-pointer rounded-lg font-bold"
                : "bg-amber-400/30 text-white/30 rounded-md cursor-default"
        }`,
        danger: `${
            !disabled
                ? "text-white bg-red-600 hover:bg-red-700 focus-visible:bg-red-700 cursor-pointer rounded-md"
                : "bg-red-700/30 text-red-400 cursor-default rounded-md"
        }`,
    };
    const variantClass = variants[variant] ?? variants["primary"];

    const finalClassName = twMerge(
        clsx(base, sizes[sizeVariant], variantClass, className),
    );

    return (
        <button
            disabled={disabled}
            type={type}
            className={finalClassName}
            {...props}
        >
            {children}
        </button>
    );
}
