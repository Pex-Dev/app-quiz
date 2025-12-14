import { useEffect, useState } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface PasswordInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    value?: string | undefined;
    className?: string;
    variant?: "primary" | "secondary";
    sizeVariant?: "sm" | "md" | "lg";
    rounded?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export default function InputPassword({
    value,
    onChange,
    variant = "primary",
    sizeVariant = "md",
    rounded = false,
    onFocus,
    onBlur,
    className,
    ...props
}: PasswordInputProps) {
    const [type, setType] = useState<"password" | "text">("password");
    const [inFocus, setInFocus] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>(value ? value : "");
    const isControlled = value !== undefined; //Comprobar si el valor es controlado por el padre
    const inputCurrentValue = isControlled ? value : inputValue;

    useEffect(() => {
        if (isControlled) {
            setInputValue(value ?? "");
        }
    }, [value]);

    const containerBase = "flex w-full overflow-hidden";

    const passwordInputBase =
        "w-full transition text-black font-nunito px-2 focus:outline-0 bg-white";

    const toggleButtonBase = `px-1 bg-gray-600 text-white border-l border-l-neutral-500 focus:outline-0 focus-visible:border focus-visible:border-blue-500 focus-visible:rounded-xs`;

    const variants = {
        primary: `border ${
            inFocus ? "border-blue-800" : "border-transparent"
        } ${rounded ? "rounded-full" : "rounded-md"}`,
        secondary: `border-b-2 border-b-neutral-300 ${
            inFocus ? "outline outline-blue-800" : ""
        } ${rounded && "rounded-full"}`,
    };

    const sizes = {
        sm: "px-2 py-1  text-sm",
        md: "px-2 py-1 md:py-1.5 text-base",
        lg: "px-3 py-2 text-lg",
    };

    const finalInputClassName = twMerge(
        clsx(passwordInputBase, sizes[sizeVariant], className)
    );

    const closedEye = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={`${sizeVariant === "sm" ? "25" : "32"}`}
            height={`${sizeVariant === "sm" ? "25" : "32"}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 9c-2.4 2.667 -5.4 4 -9 4c-3.6 0 -6.6 -1.333 -9 -4" />
            <path d="M3 15l2.5 -3.8" />
            <path d="M21 14.976l-2.492 -3.776" />
            <path d="M9 17l.5 -4" />
            <path d="M15 17l-.5 -4" />
        </svg>
    );

    const openEye = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={`${sizeVariant === "sm" ? "25" : "32"}`}
            height={`${sizeVariant === "sm" ? "25" : "32"}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
            <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
        </svg>
    );

    const handleOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setInFocus(true);
        if (onFocus) {
            onFocus(e);
        }
    };

    const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setInFocus(false);
        if (onBlur) {
            onBlur(e);
        }
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isControlled) setInputValue(e.target.value);
        if (onChange) onChange(e);
    };

    return (
        <div className={`${containerBase} ${variants[variant]}`}>
            <input
                type={type}
                value={inputCurrentValue}
                onChange={handleOnChange}
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
                autoComplete="off"
                {...props}
                className={finalInputClassName}
            />
            <button
                type="button"
                aria-label="Cambiar visibilidad de contraseña"
                onClick={() =>
                    setType(type === "password" ? "text" : "password")
                }
                className={`${toggleButtonBase}`}
            >
                {type === "password" ? closedEye : openEye}
            </button>
        </div>
    );
}
