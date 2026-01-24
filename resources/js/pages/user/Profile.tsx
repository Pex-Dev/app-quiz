import Layout from "@/components/Layout";
import backgroundsImages from "@/utilities/BackgroundCategories";
import { Quiz, User } from "@/types/quiz";
import { Form, Link, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";

const Profile = (props: { user: User }) => {
    const { user } = props;
    const { auth } = usePage().props;
    console.log(user);

    const quizLink = (quiz: Quiz, key: number) => {
        return (
            <Link
                href={route("quiz", {
                    quiz: quiz.id,
                    slug: quiz.slug,
                })}
                key={key}
                className="h-fit"
            >
                <img
                    src={
                        quiz.image
                            ? `/uploads/${quiz.image}`
                            : backgroundsImages[Number(quiz.category_id) - 1]
                    }
                    alt={quiz.name}
                    className="w-full rounded aspect-video"
                />
                <h3 className="mt-1 text-sm md:text-base">{quiz.name}</h3>
            </Link>
        );
    };

    const sectionHeader = (
        title: string,
        count: number,
        type: "quizzes" | "likes",
    ) => {
        return (
            <header className="flex justify-between mb-4">
                <Link
                    href={
                        type === "quizzes"
                            ? route("profile.quizzes", user.name)
                            : route("profile.likes", user.name)
                    }
                >
                    <h2 className="text-lg font-roboto text-neutral-700 hover:text-cyan-700 transition-colors font-semibold">
                        {title}
                    </h2>
                </Link>

                <Link
                    href={
                        type === "quizzes"
                            ? route("profile.quizzes", user.name)
                            : route("profile.likes", user.name)
                    }
                    className="text-neutral-700 hover:text-cyan-700 transition-colors "
                >{`(${count})`}</Link>
            </header>
        );
    };

    const logoutButton = () => {
        if (auth?.user && auth.user.id == user.id) {
            return (
                <Form action={route("logout")} method="post">
                    <button
                        type="submit"
                        className="flex justify-center items-center gap-2 bg-amber-500 hover:bg-red-500 hover:border-b-4-red-700 transition-colors duration-700 hover:shadow-2xl border-b-4 border-b-amber-700 border-t border-t-neutral-50 text-center px-3 py-2 rounded-md text-white text-shadow-lg font-semibold w-full min-w-[150px] md:w-fit hover:cursor-pointer"
                    >
                        <span>Cerrar Sesión</span>
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
                            <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                            <path d="M9 12h12l-3 -3" />
                            <path d="M18 15l3 -3" />
                        </svg>
                    </button>
                </Form>
            );
        } else {
            return <div></div>;
        }
    };

    const editProfileButton = () => {
        if (auth?.user && auth.user.id == user.id) {
            return (
                <Link
                    href={route("profile.edit", user.name)}
                    className="w-fit flex justify-center items-center gap-2 bg-cyan-100 hover:bg-cyan-300 hover:border-b-4-red-700 transition-colors duration-700 hover:shadow-2xl border-b-4 border-b-cyan-400 border-t border-t-neutral-50 text-center px-3 py-2 rounded-md text-neutral-600 text-shadow-sm font-semibold min-w-[150px] md:w-fit hover:cursor-pointer"
                >
                    <span>Editar perfil</span>
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
                        <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                        <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                        <path d="M16 5l3 3" />
                    </svg>
                </Link>
            );
        } else {
            return <div></div>;
        }
    };

    return (
        <div className="bg-white flex-1 md:flex-none md:rounded-2xl p-3 md:p-5 border-neutral-500 border-b-3 md:border-b-4 shadow-2xl w-full md:max-w-[840px]">
            {/* Información principal del usuario */}
            <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mt-4 md:mt-0">
                <div className="flex gap-4">
                    <img
                        src={
                            user.image
                                ? `/uploads/${user.image}`
                                : "/images/icons/icon_user.png"
                        }
                        alt={`Imagen de perfil de ${user.name}`}
                        className="w-16 rounded-full border border-neutral-600 aspect-square"
                    />
                    <div>
                        <h2 className="uppercase font-roboto font-semibold text-lg text-neutral-800">
                            {user.name}
                        </h2>
                        <p className="text-sm text-neutral-600">
                            Se unio:{" "}
                            <span className="font-semibold text-neutral-800">
                                {user.created_at}
                            </span>
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                    {editProfileButton()}
                    {logoutButton()}
                </div>
            </header>
            {user.biography && (
                <p className="py-0.5 px-1.5 border-2 rounded-md border-dotted border-neutral-300 text-neutral-700 mt-6 min-h-24">
                    {user.biography}
                </p>
            )}
            <main className="mt-10">
                {/* Quizzes creadas por el usuario */}
                <section>
                    {sectionHeader(
                        `Quizz creadas por ${user.name}`,
                        user.quizzes_count,
                        "quizzes",
                    )}
                    {user.quizzes.length > 0 ? (
                        <div className="rounded-md grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                            {user.quizzes.map((quiz) =>
                                quizLink(quiz, Number(quiz.id)),
                            )}
                        </div>
                    ) : (
                        <p className="py-10 text-center text-neutral-500">{`${user.name} no ha creado ningún quiz aún`}</p>
                    )}
                </section>
                <hr className="text-neutral-300 my-5" />
                {/* Me gusta del usuario */}
                <section>
                    {sectionHeader(
                        `Me gustas de ${user.name}`,
                        user.liked_quizzes_count,
                        "likes",
                    )}
                    {user.liked_quizzes.length > 0 ? (
                        <div className="rounded-md grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                            {user.liked_quizzes.map((quiz) =>
                                quizLink(quiz, Number(quiz.id)),
                            )}
                        </div>
                    ) : (
                        <p className="py-10 text-center text-neutral-500">{`${user.name} no ha dado me gusta a ningún quiz aún`}</p>
                    )}
                </section>
            </main>
        </div>
    );
};

Profile.layout = (page: React.ReactElement) => <Layout>{page}</Layout>;

export default Profile;
