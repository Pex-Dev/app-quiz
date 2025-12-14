import clsx from "clsx";
import { useState, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

interface Option {
    value: string;
    label: string;
}

interface SelectInputProps {
    options: Option[];
    value?: string;
    onChange?: (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        value: string
    ) => void;
    variant?: "primary" | "secondary";
    sizeVariant?: "sm" | "md" | "lg";
    rounded?: boolean;
    name: string;
    id?: string;
    disabled?: boolean;
    search?: boolean;
    className?: string;
    ariaLabel?: string;
}

export default function InputSelect({
    options,
    value,
    onChange,
    name,
    id,
    variant = "primary",
    sizeVariant = "md",
    rounded = false,
    disabled = false,
    search = true,
    className,
    ariaLabel = `Selecciona ${name}`,
}: SelectInputProps) {
    const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
    const [showList, setShowList] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>("");
    const [selectedValue, setSelectedValue] = useState<Option | null>(
        value ? options.find((opt) => opt.value === value) ?? null : null
    );
    const ref = useRef<HTMLDivElement>(null);

    //Manejar el cambio del valor y options desde las props
    useEffect(() => {
        if (value !== undefined) {
            setSelectedValue(
                options.find((opt) => opt.value === value) ?? null
            );
        }
    }, [value, options]);

    //Manejar clicks fuera del componente
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setFilteredOptions(options);
                setShowList(false);
                setSearchValue("");
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    //Seleccionar opción
    const handleSelectOption = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        option: Option
    ) => {
        setSelectedValue(option);
        if (onChange) onChange(e, option.value);

        setTimeout(() => {
            setFilteredOptions(options);
            setShowList(false);
        }, 0);
    };

    //Filtrar opciones
    const handleFilterOptions = (label: string) => {
        setSearchValue(label);
        const newFilteredOptions: Option[] = options.filter((option) =>
            option.label.toLowerCase().includes(label.toLowerCase())
        );

        setFilteredOptions(newFilteredOptions);
    };

    const sizes = {
        sm: "px-1 py-0.5  text-sm",
        md: "px-2 py-1 text-base",
        lg: "px-2.5 py-1.5 text-lg",
    };

    const buttonBase = `flex items-center justify-between w-full ${
        disabled ? "cursor-default" : "cursor-pointer"
    }`;

    const butttonVariants = {
        primary: `transition-all bg-white border border-gray-400 outline-0  focus-visible:border-blue-800 ${
            rounded ? "rounded-full" : "rounded-md"
        }`,
        secondary: `transition-all bg-white border-b-2 border-b-neutral-300 focus-visible:outline  focus-visible:outline-blue-800 ${
            rounded ? "rounded-full" : ""
        }`,
    };

    const optionsContainerVariants = {
        primary: `absolute shadow-md backdrop-blur-md bg-white/80 border border-neutral-400 mt-2  overflow-hidden w-full z-10 ${
            rounded ? "rounded-lg" : "rounded-md"
        }`,
        secondary: `absolute shadow-md backdrop-blur-md bg-white/80 border border-neutral-200 mt-2 overflow-hidden w-full z-10 ${
            rounded ? "rounded-lg" : ""
        }`,
    };

    const searchBarVariants = {
        primary: `w-full bg-gray-200 border-b border-b-gray-400 focus:outline-0 px-2 py-1`,
        secondary: `w-full bg-gray-100 border-b border-b-gray-200 focus:outline-0 px-2 py-1`,
    };

    const optionsVariants = {
        primary: `w-full text-left hover:bg-gray-200 focus:outline-0 focus-visible:bg-gray-200`,
        secondary: `w-full text-left backdrop-blur-md hover:bg-gray-200 focus:outline-0 focus-visible:bg-gray-200 `,
    };
    const buttonFinalClassName = twMerge(
        clsx(
            buttonBase,
            butttonVariants[variant],
            sizes[sizeVariant],
            className
        )
    );

    const arrowDown = (
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
            <path d="M6 9l6 6l6 -6" />
        </svg>
    );

    const arrowUp = (
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
            <path d="M6 15l6 -6l6 6" />
        </svg>
    );

    return (
        <div ref={ref} className="relative">
            <input
                type="hidden"
                name={name}
                id={id ? id : ""}
                value={selectedValue ? selectedValue.value : ""}
            />
            {/* Botón de selección */}
            <button
                type="button"
                disabled={disabled}
                aria-haspopup="listbox"
                aria-expanded={showList}
                aria-label={ariaLabel}
                onClick={() => setShowList((prev) => !prev)}
                className={buttonFinalClassName}
            >
                <span className={!selectedValue ? "opacity-50" : ""}>
                    {selectedValue
                        ? selectedValue.label
                        : `Selecciona ${ariaLabel}`}
                </span>
                {showList ? arrowUp : arrowDown}
            </button>
            {showList && (
                <div className={`${optionsContainerVariants[variant]}`}>
                    {search && (
                        // Barra de búsqueda
                        <input
                            type="search"
                            autoComplete="off"
                            autoFocus
                            id="|buscador|"
                            value={searchValue}
                            onChange={(e) =>
                                handleFilterOptions(e.target.value)
                            }
                            placeholder={`Buscar ${name}`}
                            className={`${searchBarVariants[variant]} ${sizes[sizeVariant]}`}
                        />
                    )}
                    {/* Lista de opciones */}
                    <ul className="flex flex-col max-h-[290px] overflow-y-auto">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                                <li key={option.value}>
                                    <button
                                        type="button"
                                        onClick={(e) =>
                                            handleSelectOption(e, option)
                                        }
                                        className={`${optionsVariants[variant]} ${sizes[sizeVariant]}`}
                                    >
                                        {option.label}
                                    </button>
                                </li>
                            ))
                        ) : (
                            <p className="px-2 py-1 text-gray-700 dark:text-gray-400">
                                No hay resultados
                            </p>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}
