import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import InputPassword from "./InputPassword";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    value?: string;
    className?: string;
    variant?: "primary" | "secondary";
    rounded?: boolean;
    sizeVariant?: "sm" | "md" | "lg";
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputText({
    value,
    type = "text",
    onChange,
    className,
    variant = "primary",
    rounded = false,
    sizeVariant = "md",
    ...props
}: TextInputProps) {
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

    const textInputBase = `text-black font-nunito`;

    const variants = {
        primary: `bg-white border border-transparent px-2 focus:outline-0 focus:border-blue-800 ${
            rounded ? "rounded-full" : "rounded-md "
        }`,
        secondary: `bg-white border-b-2 border-b-neutral-300 px-2 focus:outline focus:outline-blue-800 ${
            rounded ? "rounded-full" : ""
        }`,
    };

    const sizes = {
        sm: "px-2 py-1 text-sm",
        md: "px-2 py-1 md:py-1.5 text-base",
        lg: "px-3 py-2 text-lg",
    };

    const finalClassName = twMerge(
        clsx(textInputBase, variants[variant], sizes[sizeVariant], className)
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isControlled) {
            setInputValue(e.target.value);
            setInputLength(e.target.value.length);
        }

        if (onChange) {
            onChange(e);
        }
    };

    return (
        <>
            {type === "password" ? (
                <InputPassword
                    value={value}
                    variant={variant}
                    sizeVariant={sizeVariant}
                    rounded={rounded}
                    {...props}
                    className={className}
                />
            ) : (
                <div className=" flex flex-col">
                    <input
                        type={type}
                        value={inputCurrentValue}
                        onChange={handleChange}
                        autoComplete={
                            type === "email"
                                ? "on"
                                : props.autoComplete
                                ? props.autoComplete
                                : "off"
                        }
                        {...props}
                        className={finalClassName}
                    />
                    {props?.maxLength && type !== "number" && (
                        <small
                            className={`text-right font-normal ${
                                inputLength >= props?.maxLength
                                    ? "text-red-400 dark:text-red-500"
                                    : "text-gray-700 dark:text-gray-500"
                            }`}
                        >{`${inputLength}/${props?.maxLength}`}</small>
                    )}
                </div>
            )}
        </>
    );
}
