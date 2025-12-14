import React from "react";

export default function TextSuccess({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <p className="text-green-500 mt-2 border border-green-500 rounded-md px-3 py-2 text-center">
            {children}
        </p>
    );
}
