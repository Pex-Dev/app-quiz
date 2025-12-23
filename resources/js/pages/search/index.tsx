import Layout from "@/components/Layout";
import { Results } from "@/types/quiz";
import QuizCard from "@/components/quiz/QuizCard";
import { Link } from "@inertiajs/react";

const Index = (props: { results: Results; searchText: string }) => {
    const { results } = props;
    console.log(results);

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
        <div className="flex flex-col w-full max-w-[1440px] flex-1 my-10 mx-auto">
            <header className="p-3 md:p-4">
                <h2 className="text-2xl font-roboto text-neutral-200">
                    Resutados:{" "}
                    <span className="font-nunito text-white">
                        {props.searchText}
                    </span>
                </h2>
            </header>
            {results.data.length > 0 ? (
                <div className="flex-1">
                    <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 p-3 md:p-4">
                        {results.data.map((quiz) => (
                            <QuizCard quiz={quiz} key={quiz.id} />
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="flex flex-1 justify-center items-center h-full">
                    <p className="text-white/80 px-3 md:px-4 text-3xl">
                        No hay resultados :(
                    </p>
                </div>
            )}
            <footer className="p-3 md:p-4">
                <nav className="flex gap-3 md:gap-4">
                    {results.links.map((link) => (
                        <Link
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

Index.layout = (page: React.ReactElement) => <Layout>{page}</Layout>;

export default Index;
