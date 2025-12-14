import Container from "@/components/common/Container";
import Layout from "@/components/Layout";

import { User } from "@/types/quiz";
import { Form } from "@inertiajs/react";
import { route } from "ziggy-js";

const Profile = (props: { user: User }) => {
    const { user } = props;
    console.log(user);

    return (
        <Container variant="secondary">
            <header className="flex gap-4">
                <img
                    src={user.image ? "" : "/images/icons/icon_user.png"}
                    alt={`Imagen de perfil de ${user.name}`}
                    className="w-16 rounded-full border border-neutral-600"
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
            </header>
            <Form action={route("logout")} method="post">
                <button
                    type="submit"
                    className="bg-neutral-100 border-b-4 border-b-neutral-300 border-t border-t-neutral-50 mt-4 text-center px-3 py-2 rounded-md text-neutral-700 font-semibold w-full min-w-[150px] md:w-fit hover:cursor-pointer"
                >
                    Cerrar Sesión
                </button>
            </Form>
        </Container>
    );
};

Profile.layout = (page: React.ReactElement) => <Layout>{page}</Layout>;

export default Profile;
