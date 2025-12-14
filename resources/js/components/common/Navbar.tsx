import { useState } from "react";
import { Form, Link, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function Navbar() {
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const { auth } = usePage().props;

    return (
        <>
            <header
                className={`z-10 p-3 bg-neutral-700/60 border-b-5 border-b-neutral-800/50 backdrop-blur-md fixed w-full overflow-hidden transition-all shadow-xl shadow-black/20 ${
                    showMenu ? "max-h-[188px]" : "max-h-16"
                }`}
            >
                <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between md:items-center">
                    <div className="flex flex-col md:flex-row gap-5 md:items-end">
                        <div className="flex justify-between">
                            <Link href="/" onClick={() => setShowMenu(false)}>
                                <h1 className="text-3xl font-bold text-white text-shadow-md text-shadow-white/40">
                                    <span className="text-amber-400">Pex</span>
                                    Quizzes
                                </h1>
                            </Link>
                            <button
                                aria-label="menu"
                                onClick={() => setShowMenu((prev) => !prev)}
                                className="text-white hover:cursor-pointer md:hidden"
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
                        </div>
                        <nav className="mb-4 md:mb-0">
                            <ul className="flex flex-col jus md:flex-row gap-1 md:gap-5">
                                <li className="text-white text-center">
                                    <Link
                                        href="#"
                                        onClick={() => setShowMenu(false)}
                                        tabIndex={showMenu ? 0 : -1}
                                    >
                                        Quizzes Nuevos
                                    </Link>
                                </li>
                                <li className="text-white text-center">
                                    <Link
                                        href="#"
                                        onClick={() => setShowMenu(false)}
                                        tabIndex={showMenu ? 0 : -1}
                                    >
                                        Quizzes populares
                                    </Link>
                                </li>
                                {auth && auth.user && (
                                    <li className="text-white text-center">
                                        <Link
                                            href={route("quiz.create")}
                                            onClick={() => setShowMenu(false)}
                                            tabIndex={showMenu ? 0 : -1}
                                        >
                                            Crear quiz
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </nav>
                    </div>

                    <div className="flex gap-2">
                        {auth && auth.user ? (
                            <Link
                                href={route("profile", auth.user.name)}
                                className="bg-white border-b-4 border-b-neutral-600 flex items-center gap-2 px-2 py-1.5 rounded-md font-nunito text-neutral-900"
                            >
                                <img
                                    src={
                                        auth.user.image
                                            ? ""
                                            : "/images/icons/icon_user.png"
                                    }
                                    alt={`Imagen de perfil de ${auth.user.name}`}
                                    className="w-7 rounded-full border border-neutral-600 aspect-square"
                                />
                                {auth.user.name}
                            </Link>
                        ) : (
                            <Link
                                href={route("login")}
                                className="bg-white border-b-4 border-b-neutral-600 flex items-center gap-2 px-2 py-1.5 rounded-md font-nunito text-neutral-900"
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
