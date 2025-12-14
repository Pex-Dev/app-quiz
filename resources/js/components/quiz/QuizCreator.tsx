import { Quiz } from "@/types/quiz";
import { Link } from "@inertiajs/react";
import React from "react";
import { route } from "ziggy-js";

export default function QuizCreator({ quiz }: { quiz: Quiz }) {
    if (!quiz.user) return;
    const { user } = quiz;

    return (
        <div className="flex px-3 pb-3 md:px-4 md:pb-3 gap-3 md:gap-4 items-center">
            <Link
                aria-label={`Visitar perfil de ${user.name}`}
                href={route("profile", user.name)}
            >
                <img
                    src="/images/icons/icon_user.png"
                    alt="Icono de usuario"
                    className="min-w-12 w-12 aspect-square rounded-full overflow-hidden border border-gray-500 "
                />
            </Link>
            <div className="flex flex-col">
                <p>
                    Creado por{" "}
                    <Link
                        href={route("profile", user.name)}
                        className="font-semibold text-neutral-800 hover:text-neutral-700"
                    >
                        {user.name}
                    </Link>
                </p>
                <small>
                    {quiz.created_at ? quiz.created_at : "En algún momento"}
                </small>
            </div>
        </div>
    );
}
