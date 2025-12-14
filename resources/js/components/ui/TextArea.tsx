import { useEffect, useState } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface TextAreaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
    value?: string;
    className?: string;
    variant?: "primary" | "secondary";
    sizeVariant?: "sm" | "md" | "lg";
    rounded?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextArea({
    value,
    variant = "primary",
    sizeVariant = "md",
    rounded = false,
    className,
    onChange,
    ...props
}: TextAreaProps) {
    const [inputValue, setInputValue] = useState<string>(value ? value : "");
    const [inputLength, setInputLength] = useState<number>(
        value ? value.length : 0
    );
    const isControlled = value !== undefined; //Comprobar si el valor es controlado por el padre
    const inputCurrentValue = isControlled ? value : inputValue;

    useEffect(() => {
        if (isControlled) {
            setInputValue(value ?? "");
            setInputLength(value ? value.length : 0);
        }
    }, [value]);

    const base = "min-h-[150px] bg-white";

    const variants = {
        primary: `text-black border border-neutral-400 focus:outline-0 focus:border-blue-800 ${
            rounded ? "rounded-2xl" : "rounded-md"
        }`,
        secondary: `text-black border-b-2 border-b-neutral-300 focus:outline focus:outline-blue-800 ${
            rounded ? "rounded-2xl" : ""
        }`,
    };

    const sizes = {
        sm: "px-2 py-1 text-sm",
        md: "px-2 py-1.5 text-base",
        lg: "px-3 py-2 text-lg",
    };

    const finalClassName = twMerge(
        clsx(base, variants[variant], sizes[sizeVariant], className)
    );

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (!isControlled) {
            setInputValue(e.target.value);
            setInputLength(e.target.value.length);
        }

        if (onChange) onChange(e);
    };

    return (
        <div className=" flex flex-col">
            <textarea
                value={inputCurrentValue}
                onChange={handleChange}
                {...props}
                className={finalClassName}
            ></textarea>
            {props?.maxLength && (
                <small
                    className={` text-right font-normal ${
                        inputLength >= props?.maxLength
                            ? "text-red-400 dark:text-red-500"
                            : "text-gray-700 dark:text-gray-500"
                    }`}
                >{`${inputLength}/${props?.maxLength}`}</small>
            )}
        </div>
    );
}
