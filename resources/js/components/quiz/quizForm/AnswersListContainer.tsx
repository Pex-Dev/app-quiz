import React, { useState } from "react";

export default function AnswersListContainer({
    children,
}: {
    children: React.ReactNode;
}) {
    const [showList, setShowList] = useState<boolean>(true);

    const arrowDown = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M6 9l6 6l6 -6" />
        </svg>
    );

    const arrowUp = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M6 15l6 -6l6 6" />
        </svg>
    );

    return (
        <div
            className={`overflow-hidden transition-all ${
                showList ? "max-h-[450px] " : "max-h-7 "
            }`}
        >
            <header className="flex w-full items-center">
                <h3 className="mb-1 text-black">Respuestas</h3>
                <span className="ml-2 block border-b w-full text-neutral-500"></span>
                <button
                    type="button"
                    title={
                        showList
                            ? "Ocultar lista de respuestas"
                            : "Mostrar lista de respuestas"
                    }
                    aria-label={
                        showList
                            ? "Ocultar lista de respuestas"
                            : "Mostrar lista de respuestas"
                    }
                    className="p-0.5 text-black"
                    onClick={() => setShowList((p) => !p)}
                >
                    {!showList ? arrowDown : arrowUp}
                </button>
            </header>
            {children}
        </div>
    );
}
