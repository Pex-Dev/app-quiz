import React from "react";
import Layout from "../components/Layout.js";
import { Quiz } from "@/types/quiz.js";
import QuizCard from "@/components/quiz/QuizCard.js";
import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";
import FeatureCard from "@/components/ui/FeatureCard.js";

const Index = (props: { quizzes: Quiz[] }) => {
    const { quizzes } = props;
    return (
        <div className="w-full">
            <header className="relative flex flex-col justify-center items-center min-h-[330px] md:min-h-[400px] w-full py-10 px-3 md:px-5">
                <h2 className="text-white text-center text-4xl md:text-5xl lg:text-7xl font-roboto font-bold text-shadow-md text-shadow-white/40">
                    Crea y completa quizzes
                </h2>
                <div className="w-fit mx-auto mt-18 md:mt-20">
                    <Link className="transition-all duration-300 shadow-lg shadow-transparent hover:shadow-white/20 hover:border-b-neutral-300 hover:text-blue-300 bg-white text-blue-900 border-b-4 border-b-neutral-400  text-lg md:text-xl font-roboto font-semibold px-4 md:px-5 py-2 md:py-3 rounded-full">
                        Explorar quizzes
                    </Link>
                    <Link
                        href={route("quiz.create")}
                        className="transition-all duration-300 shadow-lg shadow-transparent hover:shadow-white/20 hover:border-b-neutral-300 hover:text-blue-300 ml-3 md:ml-4 bg-white text-blue-900 border-b-4 border-b-neutral-400  text-lg md:text-xl font-roboto font-semibold px-4 md:px-5 py-2 md:py-3 rounded-full"
                    >
                        Crear quiz
                    </Link>
                </div>
                <div
                    className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none"
                    style={{
                        background: `url("images/backgrounds/quizzes.png")`,
                        backgroundSize: "cover",
                        maskImage:
                            "linear-gradient(black 30%, transparent 100%)",
                    }}
                ></div>
            </header>
            <section className="md:max-w-[600px] lg:max-w-[1440px] md:mx-auto md:p-4 mx-3 mb-32 my-24">
                <h2 className="text-xl text-center md:text-2xl font-roboto text-white uppercase font-semibold">
                    ¿Qué puedes hacer acá?
                </h2>
                <ul className="grid grid-1 grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 mt-3">
                    <FeatureCard icon="create" title="Crea quizzes">
                        Crea quizzes personalizados con preguntas y respuestas a
                        tu ritmo. Diseña desafíos para poner a prueba
                        conocimientos o simplemente divertirte.
                    </FeatureCard>
                    <FeatureCard icon="search" title="Buscar Quizzes">
                        Encuentra rápidamente quizzes usando el buscador con
                        autocompletado. Descubre contenido creado por otros
                        usuarios en segundos.
                    </FeatureCard>
                    <FeatureCard icon="complete" title="Completa Quizzes">
                        Responde quizzes y márcalos como completados para llevar
                        un registro de tu progreso y los desafíos que ya
                        superaste.
                    </FeatureCard>
                    <FeatureCard icon="management" title="Gestiona tus quizzes">
                        Administra los quizzes que creaste: edítalos, revísalos
                        y controla cuáles están disponibles para otros usuarios.
                    </FeatureCard>
                </ul>
            </section>
            <section className="px-3 md:px-4 lg:px-5 max-w-[1440px] mx-auto">
                <h2 className="text-xl text-center md:text-left md:text-2xl font-roboto text-white uppercase font-semibold mb-3 my-24">
                    Ultimos Quizzes
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5 w-full max-w-[1440px] mx-auto">
                    {quizzes.map((quiz) => (
                        <QuizCard key={quiz.id} quiz={quiz} />
                    ))}
                </ul>
            </section>
            <section className="max-w-[1440px] md:mx-4 lg:mx-auto flex flex-col justify-center items-center border bg-linear-to-br from-white to-gray-200 md:border-b-neutral-500 md:border-b-4 py-14 md:py-30 overflow-hidden mt-50 md:mb-30 md:rounded-2xl">
                <h2 className="text-xl text-center md:text-3xl font-roboto text-gray-700 uppercase font-semibold mb-3 text-shadow-md text-shadow-black/30">
                    ¿Listo para comenzar a crear tus propios quizzes?
                </h2>
                <Link
                    href={route("quiz.create")}
                    className="mt-14 md:mt-24 transition-all duration-300 shadow-lg  hover:shadow-amber-500/50 hover:bg-amber-300 hover:border-b-amber-400 hover:text-amber-100  bg-amber-400 text-amber-900 border-b-4 border-b-amber-600 text-lg md:text-xl font-roboto font-semibold px-10 md:px-16 lg:px-24 py-2 md:py-3 rounded-full"
                >
                    Comenzar
                </Link>
            </section>
        </div>
    );
};

export default Index;

Index.layout = (page: React.ReactElement) => <Layout>{page}</Layout>;
