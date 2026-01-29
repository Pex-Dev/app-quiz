import Layout from "@/components/Layout";
import { Results, User } from "@/types/quiz";
import { Head, Link } from "@inertiajs/react";
import QuizCard from "@/components/quiz/QuizCard";

const Likes = (props: { user: User; results: Results }) => {
    const { results, user } = props;

    const replaceSymbol = (symbol: string): string => {
        if (symbol.includes("&raquo;")) {
            return symbol.replace("&raquo;", "»");
        }
        if (symbol.includes("&laquo;")) {
            return symbol.replace("&laquo;", "«");
        }
        if (symbol.includes("&nbsp;")) {
            return symbol.replace("&nbsp;", " ");
        }
        return symbol;
    };

    return (
        <div className="w-full px-3 max-w-[1440px] mx-auto mt-10">
            <Head title={`Quizim | Me gustas de ${user.name}`} />
            <h2 className="text-xl text-left md:text-xl font-roboto text-white uppercase font-semibold mb-3">
                {`Me gustas de ${user.name}`}
            </h2>
            <section className="max-w-[1440px] mx-auto min-h-[600px] mt-7">
                <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5 w-full max-w-[1440px] mx-auto">
                    {results.data.length > 0 ? (
                        results.data.map((quiz) => (
                            <QuizCard key={quiz.id} quiz={quiz} />
                        ))
                    ) : (
                        <div className="flex flex-1 justify-center items-center h-full">
                            <p className="text-white/80 text-3xl text-center">
                                No hay resultados :(
                            </p>
                        </div>
                    )}
                </ul>
            </section>
            {/* Botones de paginación */}
            <footer className="mx-auto my-4">
                <nav className="flex gap-3 md:gap-4">
                    {results.links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url ? link.url : "#"}
                            disabled={link.active}
                            className={`border-b-4 px-3 py-2 rounded-md font-nunito ${
                                link.active
                                    ? "bg-amber-400 border-b-amber-700"
                                    : "bg-white border-b-neutral-500"
                            } ${
                                !link.url
                                    ? "pointer-events-none opacity-50"
                                    : "cursor-pointer"
                            }`}
                        >
                            {replaceSymbol(link.label)}
                        </Link>
                    ))}
                </nav>
            </footer>
        </div>
    );
};

Likes.layout = (page: React.ReactElement) => <Layout>{page}</Layout>;

export default Likes;
