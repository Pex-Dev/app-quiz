import React from "react";
import Navbar from "./common/Navbar";
import Logo from "./common/Logo";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-dvh flex flex-col">
            <Navbar />
            <main className="flex flex-col justify-center items-center flex-1 mt-16 font-nunito">
                {children}
            </main>
            <footer className="bg-neutral-900 py-10 px-3">
                <div className="mx-auto w-fit flex flex-col justify-center items-center mb-10">
                    <Logo />
                    <p className="text-white text-center">
                        Crea, juega y comparte quizzes con el mundo.
                    </p>
                </div>
                <div className="grid grid-cols-2 max-w-5xl mx-auto">
                    <div className="flex flex-col justify-center w-fit mx-auto">
                        <h4 className="text-white font-semibold mb-2">
                            Quizium
                        </h4>
                        <ul className="text-neutral-200 border-l-2 border-l-neutral-600 pl-2">
                            <li>
                                <a href="#">Explorar quizzes</a>
                            </li>
                            <li>
                                <a href="#">Crear quiz</a>
                            </li>
                            <li>
                                <a href="#">Sobre Quizium</a>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col justify-center w-fit mx-auto">
                        <h4 className="text-white font-semibold">Síguenos</h4>
                        <ul className="text-neutral-200 border-l-2 border-l-neutral-600 pl-2">
                            <li>
                                <a href="#" aria-label="Twitter">
                                    Twitter
                                </a>
                            </li>
                            <li>
                                <a href="#" aria-label="Instagram">
                                    Instagram
                                </a>
                            </li>
                            <li>
                                <a href="#" aria-label="Github">
                                    Github
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="w-fit mx-auto mt-10">
                    <p className="text-neutral-200 text-center">
                        © {new Date().getFullYear()} Quizium. Todos los derechos
                        reservados.
                    </p>
                </div>
            </footer>
        </div>
    );
}
