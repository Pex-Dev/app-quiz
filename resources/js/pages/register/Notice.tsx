import React from "react";
import Layout from "@/components/Layout";
import { Form, Head } from "@inertiajs/react";
import Container from "../../components/common/Container";
import TextSuccess from "@/components/common/TextSuccess";

const Notice = () => {
    return (
        <Container title="Verifica tu email">
            <Head title="Quizim | Verifica tu email" />
            <p className="text-neutral-300 text-sm text-center mt-2">
                Se ha enviado un enlace de verificación a tu email. Por favor,
                verifica tu cuenta para continuar.
            </p>
            <Form
                action={"/email/verification-notification"}
                method="post"
                className="flex flex-col justify-center items-center"
            >
                {({ errors, processing, wasSuccessful }) => (
                    <>
                        {errors.email && (
                            <p className="border border-red-500 px-2 py-1 text-red-500 rounded-sm mt-1 text-center">
                                {errors.email}
                            </p>
                        )}
                        {errors.throttle && (
                            <p className="border border-red-500 px-2 py-1 text-red-500 rounded-sm mt-1 text-center">
                                {errors.throttle}
                            </p>
                        )}
                        {wasSuccessful ? (
                            <TextSuccess>
                                Enlace de verificación enviado correctamente
                            </TextSuccess>
                        ) : (
                            <button
                                disabled={processing}
                                className={`px-3 py-1 rounded-md md:w-fit mt-5 ${
                                    processing
                                        ? "bg-white/70 hover:cursor-progress"
                                        : "bg-white hover:cursor-pointer "
                                }`}
                            >
                                Reenviar enlace de verificación
                            </button>
                        )}
                    </>
                )}
            </Form>
        </Container>
    );
};

Notice.layout = (page: React.ReactElement) => <Layout>{page}</Layout>;

export default Notice;
