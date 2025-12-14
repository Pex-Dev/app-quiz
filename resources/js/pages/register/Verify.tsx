import React from "react";
import Layout from "@/components/Layout";
import { Link } from "@inertiajs/react";
import Container from "../../components/common/Container";

const Verify = () => {
    return (
        <Container title="Email Verificado">
            <p className="text-neutral-300 text-sm text-center mt-2">
                Tu email ha sido verificado correctamente. Ya puedes iniciar
                sesión y usar la aplicación con normalidad.
            </p>
            <Link
                href={"/login"}
                className="bg-white text-center px-3 py-2 rounded-md text-neutral-700 font-semibold w-full md:w-fit block mt-3 mx-auto"
            >
                Iniciar Sesión
            </Link>
        </Container>
    );
};

Verify.layout = (page: React.ReactElement) => <Layout>{page}</Layout>;

export default Verify;
