import React, { useEffect, useId, useRef, useState } from "react";
import useSearch from "@/hooks/useSearch";
import SearchResults from "./SearchResults";
import { route } from "ziggy-js";

export default function SearchBar({ tabIndex = 0 }: { tabIndex?: number }) {
    const searchId = useId();
    const contRef = useRef<HTMLDivElement>(null);
    const [searchText, setSearchText] = useState<string>("");

    const { searchDyanmicResults, results, loading } = useSearch();

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            searchDyanmicResults(searchText);
        }, 400);

        return () => clearTimeout(delayDebounceFn);
    }, [searchText]);

    useEffect(() => {
        const handleMouseDown = (event: any) => {
            if (contRef.current && !contRef.current.contains(event.target)) {
                searchDyanmicResults("");
            }
        };

        document.addEventListener("mousedown", handleMouseDown);
        return () => {
            document.removeEventListener("mousedown", handleMouseDown);
        };
    }, [contRef]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    return (
        <div ref={contRef} className="w-full md:max-w-[500px] lg:max-w-[600px]">
            <form
                action={route("search.index", searchText)}
                onSubmit={(e) => {
                    if (searchText.length < 3) {
                        e.preventDefault();
                    }
                }}
                className="w-full flex"
            >
                <input
                    type="search"
                    name="search_text"
                    id={searchId}
                    value={searchText}
                    placeholder="Buscar"
                    autoComplete="off"
                    tabIndex={tabIndex}
                    onChange={handleInputChange}
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
            </form>
            {results && !loading && (
                <div className="relative w-full">
                    <SearchResults results={results} setText={setSearchText} />
                </div>
            )}
            {loading && (
                <div className="relative w-full">
                    <div className="absolute flex gap-2 md:gap-3 w-full bg-white shadow-md shadow-black/80 mt-2 rounded-md p-2 md:p-3">
                        <div className="w-16 aspect-video bg-neutral-200"></div>
                        <div className="h-3 w-full max-w-[300px] animate-pulse bg-neutral-200 rounded"></div>
                    </div>
                </div>
            )}
        </div>
    );
}
