import React from "react";

export default function ErrorText({ children }: { children: React.ReactNode }) {
    return (
        <p className="border bg-red-600 border-white px-2 py-1 text-white rounded-sm mt-1">
            {children}
        </p>
    );
}
