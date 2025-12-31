import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Form, Link, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import SearchBar from "../ui/SearchBar";

export default function Navbar() {
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
    const [device, setDevice] = useState<"mobile" | "desktop">("desktop");

    const { auth } = usePage().props;
    const headerRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        if (headerRef.current) {
            setDevice(window.innerWidth < 1024 ? "mobile" : "desktop");
        }
    });

    return (
        <>
            <header
                ref={headerRef}
                className="z-10 bg-neutral-700/95 border-b-5 border-b-neutral-800/50 backdrop-blur-md fixed w-full transition-all shadow-xl shadow-black/20"
            >
                <div className="flex flex-col lg:flex-row lg:gap-4 p-3 h-fit max-w-[1600px] mx-auto">
                    <div
                        className={
                            showSearchBar ? "flex gap-3 lg:hidden" : "hidden"
                        }
                    >
                        {/* Botón de cerrar barra de búsqueda */}
                        <button
                            onClick={() => setShowSearchBar(false)}
                            aria-label="Cerrar barra de busqueda"
                            className="text-white"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M5 12l14 0" />
                                <path d="M5 12l6 6" />
                                <path d="M5 12l6 -6" />
                            </svg>
                        </button>
                        <SearchBar />
                    </div>
                    <div
                        className={`text-white justify-between w-full lg:w-fit ${
                            showSearchBar ? "hidden lg:flex" : "flex"
                        }`}
                    >
                        {/* Botón de menú */}
                        <button
                            aria-label="menu"
                            onClick={() => setShowMenu((prev) => !prev)}
                            className="hover:cursor-pointer md:mr-4 lg:hidden"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M4 6l16 0" />
                                <path d="M4 12l16 0" />
                                <path d="M4 18l16 0" />
                            </svg>
                        </button>
                        <Link href="/" onClick={() => setShowMenu(false)}>
                            <h1 className="text-3xl font-bold text-white text-shadow-md text-shadow-white/40">
                                <span className="text-amber-400">Pex</span>
                                Quizzes
                            </h1>
                        </Link>
                        <div className="flex gap-3 text-white md:w-full lg:hidden">
                            <div className="pl-4 w-full hidden md:flex md:justify-center lg:hidden">
                                <SearchBar />
                            </div>
                            <button
                                onClick={() =>
                                    setShowSearchBar((prev) => !prev)
                                }
                                aria-label="Mostrar barra de busqueda"
                                className="hover:cursor-pointer md:hidden"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="28"
                                    height="28"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                                    <path d="M21 21l-6 -6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    {/* Menú */}
                    <div
                        className={`flex flex-col lg:flex-row lg:items-center lg:gap-4 absolute lg:static left-0 top-0 w-3/4 md:w-2/5 lg:w-full min-h-dvh lg:min-h-fit bg-neutral-800 lg:bg-transparent shadow-2xl shadow-black lg:shadow-none transition-all duration-500 ${
                            showMenu
                                ? "translate-x-0"
                                : "-translate-x-full lg:translate-0"
                        }`}
                    >
                        <header className="flex justify-around pr-5 my-3 lg:hidden">
                            <button
                                onClick={() => setShowMenu((prev) => !prev)}
                                aria-label="Cerrar menu"
                                tabIndex={showMenu ? 0 : -1}
                                className="text-white lg:hidden"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M5 12l14 0" />
                                    <path d="M5 12l6 6" />
                                    <path d="M5 12l6 -6" />
                                </svg>
                            </button>
                            <Link
                                href="/"
                                tabIndex={showMenu ? 0 : -1}
                                onClick={() => setShowMenu(false)}
                            >
                                <h1 className="text-3xl font-bold text-white text-shadow-md text-shadow-white/40">
                                    <span className="text-amber-400 w-full">
                                        Pex
                                    </span>
                                    Quizzes
                                </h1>
                            </Link>
                        </header>
                        <nav>
                            <ul className="flex flex-col jus lg:flex-row gap-3 lg:gap-5">
                                <li className="text-white text-center">
                                    <Link
                                        href="#"
                                        onClick={() => setShowMenu(false)}
                                        tabIndex={
                                            device === "desktop"
                                                ? 0
                                                : showMenu
                                                ? 0
                                                : -1
                                        }
                                        className="whitespace-nowrap"
                                    >
                                        Quizzes Nuevos
                                    </Link>
                                </li>
                                <li className="text-white text-center">
                                    <Link
                                        href="#"
                                        onClick={() => setShowMenu(false)}
                                        tabIndex={
                                            device === "desktop"
                                                ? 0
                                                : showMenu
                                                ? 0
                                                : -1
                                        }
                                        className="whitespace-nowrap"
                                    >
                                        Quizzes populares
                                    </Link>
                                </li>
                                {auth && auth.user && (
                                    <li className="text-white text-center">
                                        <Link
                                            href={route("quiz.create")}
                                            onClick={() => setShowMenu(false)}
                                            className="whitespace-nowrap"
                                            tabIndex={
                                                device === "desktop"
                                                    ? 0
                                                    : showMenu
                                                    ? 0
                                                    : -1
                                            }
                                        >
                                            Crear quiz
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </nav>
                        <div className="hidden lg:flex md:justify-center w-full">
                            <SearchBar />
                        </div>

                        {auth && auth.user ? (
                            <Link
                                href={route("profile", auth.user.name)}
                                tabIndex={
                                    device === "desktop" ? 0 : showMenu ? 0 : -1
                                }
                                className="flex items-center gap-2 max-w-full bg-white border-b-4 border-b-neutral-500 rpunded-md px-2 py-1.5 rounded-md w-fit mx-auto mt-3 lg:mt-0"
                            >
                                <img
                                    src={
                                        auth.user.image
                                            ? ""
                                            : "/images/icons/icon_user.png"
                                    }
                                    alt={`Imagen de perfil de ${auth.user.name}`}
                                    className="w-7 rounded-full border border-neutral-600 aspect-square block shrink-0"
                                />
                                <span className="max-w-[150px] truncate">
                                    {auth.user.name}
                                </span>
                            </Link>
                        ) : (
                            <Link
                                href={route("login")}
                                tabIndex={
                                    device === "desktop" ? 0 : showMenu ? 0 : -1
                                }
                                className="bg-white border-b-4 border-b-neutral-500 flex items-center gap-2 px-2 py-1.5 rounded-md font-nunito text-neutral-900 whitespace-nowrap w-fit mx-auto mt-3 lg:mt-0"
                            >
                                Iniciar Sesión
                            </Link>
                        )}
                    </div>
                </div>
            </header>
        </>
    );
}
