import { Form } from "@inertiajs/react";
import React, { useId } from "react";

export default function SearchBar({ tabIndex = 0 }: { tabIndex?: number }) {
    const searchId = useId();
    return (
        <Form className="w-full flex md:max-w-[500px] lg:max-w-[600px]">
            <input
                type="search"
                name="search_text"
                id={searchId}
                placeholder="Buscar"
                tabIndex={tabIndex}
                className="w-full font-nunito text-white bg-neutral-800 border-t-3 border-t-neutral-900 px-3 pt-1 pb-1.5 rounded-l-full focus:bg-gray-800 focus:outline-1
                 focus:outline-cyan-400"
            />
            <button
                type="submit"
                aria-label="Buscar"
                tabIndex={tabIndex}
                className="text-neutral-600 bg-amber-300 hover:bg-amber-200 hover:cursor-pointer transition-colors border-b-3 border-b-amber-600 pl-2 pr-2.5 border-l border-l-neutral-600 rounded-r-full focus:outline-1 focus:outline-cyan-400 focus:bg-amber-200"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                    <path d="M21 21l-6 -6" />
                </svg>
            </button>
        </Form>
    );
}
