import React from "react";

type ContainerProps = {
    children: React.ReactNode;
    variant?: "primary" | "secondary";
    className?: string;
    title?: string;
};

export default function Container({
    children,
    variant = "primary",
    className,
    title,
}: ContainerProps) {
    const bgVariant = () => {
        return variant === "primary"
            ? "bg-neutral-700 border-b-neutral-900/90"
            : "bg-white border-b-neutral-600";
    };

    return (
        <div
            className={`p-3 md:p-4 border-b-5 rounded-2xl md:rounded-3xl w-full max-w-xs md:max-w-sm font-nunito shadow-xl shadow-black/30 ${bgVariant()} ${
                className && className
            }`}
        >
            {title && (
                <h2
                    className={`uppercase text-center mb-2 font-roboto font-semibold ${
                        variant === "primary"
                            ? "text-white"
                            : "text-neutral-800"
                    }`}
                >
                    {title}
                </h2>
            )}
            {children}
        </div>
    );
}
