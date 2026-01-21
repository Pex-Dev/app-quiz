import Layout from "@/components/Layout";
import QuizCard from "@/components/quiz/QuizCard";
import InputSelect from "@/components/ui/InputSelect";
import SearchBar from "@/components/ui/SearchBar";
import { Quiz, Results } from "@/types/quiz";
import getParam from "@/utilities/URLSearchParams";
import { Link, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { route } from "ziggy-js";

const Index = (props: { results: Results; searchText: string }) => {
    const [category, setCategory] = useState<number | null>(
        getParam("category") === null ? null : Number(getParam("category")),
    );
    const [order, setOrder] = useState<string>(getParam("order") ?? "new");
    const [search, setSearch] = useState<string>(getParam("search") ?? "");
    const [firstLoad, setFirstLoad] = useState(true);

    const { results } = props;

    const submit = (clearText = false) => {
        console.log(clearText);

        router.get(route("quiz.index"), {
            category,
            order,
            search: clearText ? "" : search,
        });
    };

    useEffect(() => {
        if (firstLoad) {
            setFirstLoad(false);
            return;
        }
        submit();
    }, [category, order]);

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

    const categoriesOptions = [
        { label: "Conocimiento General", value: "1" },
        { label: "Cine y Series", value: "2" },
        { label: "Videojuegos", value: "3" },
        { label: "Geografía", value: "4" },
        { label: "Literatura", value: "5" },
        { label: "Música", value: "6" },
        { label: "Ciencia y Naturaleza", value: "7" },
        { label: "Deportes", value: "8" },
        { label: "Lógica y Adivinanzas", value: "9" },
        { label: "Tecnología", value: "10" },
        { label: "Comida y Gastronomía", value: "11" },
        { label: "Otros / Miscelánea", value: "12" },
    ];

    return (
        <div className="w-full mt-10 md:my-20">
            <header className="px-3 md:px-4 lg:px-5 max-w-[1440px] mx-auto flex flex-col justify-between mb-5">
                {/* Título */}
                <h2 className="text-xl text-left md:text-2xl font-roboto text-white uppercase font-semibold mb-3">
                    Explora Quizzes
                </h2>
                <div className="flex flex-col md:flex-row gap-3 md:gap-4 w-full justify-between">
                    {/* Barra busqueda */}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            submit();
                        }}
                        className="flex w-full max-w-[800px] min-h-[42px] max-h-[42px] border border-neutral-700 rounded-md overflow-hidden"
                    >
                        <input
                            type="text"
                            placeholder="Buscar por nombre"
                            name="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-white w-full min-h-[42px] pl-3 pr-16"
                        />
                        <div className="relative">
                            {search.length > 0 && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearch("");
                                        submit(true);
                                    }}
                                    className="absolute right-1 top-2 text-neutral-500 hover:cursor-pointer hover:text-neutral-700"
                                >
                                    limpiar
                                </button>
                            )}
                        </div>
                        <button
                            aria-label="Buscar quiz por nombre"
                            className="px-2 bg-amber-400 hover:cursor-pointer hover:bg-amber-300 transition-colors"
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
                    {/* Filtros */}
                    <div className="flex gap-3 justify-between">
                        {/* Categoría */}
                        <div className="flex flex-col md:flex-row items-start gap-2">
                            <label htmlFor="order" className="text-white">
                                Categoría
                            </label>
                            <InputSelect
                                name="category"
                                ariaLabel="categoría"
                                search={false}
                                options={categoriesOptions}
                                value={
                                    category
                                        ? categoriesOptions.find(
                                              (c) =>
                                                  c.value === String(category),
                                          )?.value
                                        : undefined
                                }
                                onChange={(e, value) => {
                                    if (Number(value) === category) {
                                        setCategory(null);
                                        return;
                                    }
                                    setCategory(
                                        Number(value) < 1
                                            ? null
                                            : Number(value),
                                    );
                                }}
                            />
                        </div>
                        {/* Orden */}
                        <div className="flex flex-col md:flex-row items-start gap-2">
                            <label htmlFor="order" className="text-white">
                                Orden
                            </label>
                            <InputSelect
                                name="order"
                                ariaLabel="orden"
                                search={false}
                                value={order}
                                options={[
                                    { label: "Más nuevas", value: "new" },
                                    { label: "Más antiguas", value: "old" },
                                    { label: "Más likes", value: "like" },
                                    { label: "Más dislikes", value: "dislike" },
                                ]}
                                onChange={(e, value) => {
                                    if (
                                        value === "new" ||
                                        value === "old" ||
                                        value === "like" ||
                                        value === "dislike"
                                    ) {
                                        setOrder(value);
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </header>
            {/* Lista que quizzes */}
            <section className="px-3 md:px-4 lg:px-5 max-w-[1440px] mx-auto min-h-[600px] mt-12">
                <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5 w-full max-w-[1440px] mx-auto">
                    {results.data.length > 0 ? (
                        results.data.map((quiz) => (
                            <QuizCard key={quiz.id} quiz={quiz} />
                        ))
                    ) : (
                        <div className="flex flex-1 justify-center items-center h-full">
                            <p className="text-white/80 px-3 md:px-4 text-3xl">
                                No hay resultados :(
                            </p>
                        </div>
                    )}
                </ul>
            </section>
            {/* Botones de paginación */}
            <footer className="px-3 md:px-4 lg:px-5 max-w-[1440px] mx-auto mt-4">
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
