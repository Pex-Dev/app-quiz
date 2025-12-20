import { Quiz } from "@/types/quiz";
import backgroundsImages from "@/utilities/BackgroundCategories";
import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function SearchResults({
    results,
    setText,
}: {
    results: Quiz[];
    setText: React.Dispatch<React.SetStateAction<string>>;
}) {
    return (
        <>
            {results.length > 0 ? (
                <ul className="absolute flex flex-col gap-2 md:gap-3 w-full bg-white shadow-md shadow-black/80 mt-2 rounded-md p-2 md:p-3">
                    {results.map((quiz) => (
                        <li key={quiz.id}>
                            <Link
                                href={route("quiz", quiz.id)}
                                onClick={() => setText("")}
                                className="flex gap-2"
                            >
                                <img
                                    src={
                                        quiz.image
                                            ? `/uploads/${quiz.image}`
                                            : backgroundsImages[
                                                  Number(quiz.category_id) - 1
                                              ]
                                    }
                                    alt={`Imagen de ${quiz.name}`}
                                    className={`w-16 aspect-video ${
                                        quiz.image ? "" : "opacity-40"
                                    }`}
                                />
                                <h5 className="text-black">{quiz.name}</h5>
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <ul className="absolute flex flex-col gap-2 md:gap-3 w-full bg-white shadow-md shadow-black/80 mt-2 rounded-md p-2 md:p-3">
                    <li className="flex gap-2">
                        <p className="text-neutral-600">No hay resultados</p>
                    </li>
                </ul>
            )}
        </>
    );
}
