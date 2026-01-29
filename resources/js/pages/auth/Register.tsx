import React, { useId } from "react";
import Layout from "../../components/Layout";
import { Form, Head, Link } from "@inertiajs/react";
import Container from "../../components/common/Container";
import InputText from "@/components/ui/InputText";
import { route } from "ziggy-js";
import ErrorText from "@/components/common/TextError";
import Button from "@/components/ui/Button";

const Register = () => {
    const nameId = useId();
    const emailId = useId();
    const passwordId = useId();
    const passwordConfirmationId = useId();

    return (
        <Container title="Crear Cuenta">
            <Head title="Quizium | Registrarse" />
            <Form
                action="/register"
                className="flex flex-col gap-2 mt-3"
                method="post"
            >
                {({ errors }) => {
                    return (
                        <>
                            <div className="flex flex-col gap-1">
                                <label className="text-white" htmlFor={nameId}>
                                    Nombre
                                </label>
                                <InputText
                                    type="text"
                                    name="name"
                                    id={nameId}
                                    required={true}
                                />
                            </div>
                            {errors.name && (
                                <ErrorText>{errors.name}</ErrorText>
                            )}
                            <div className="flex flex-col gap-1">
                                <label className="text-white" htmlFor={emailId}>
                                    Email
                                </label>
                                <InputText
                                    type="email"
                                    name="email"
                                    id={emailId}
                                    required={true}
                                />
                            </div>
                            {errors.email && (
                                <ErrorText>{errors.email}</ErrorText>
                            )}
                            <div className="flex flex-col gap-1">
                                <label
                                    className="text-white"
                                    htmlFor={passwordId}
                                >
                                    Contraseña
                                </label>
                                <InputText
                                    type="password"
                                    name="password"
                                    id={passwordId}
                                    required={true}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    className="text-white"
                                    htmlFor={passwordConfirmationId}
                                >
                                    Confirmar Contraseña
                                </label>
                                <InputText
                                    type="password"
                                    name="password_confirmation"
                                    id={passwordConfirmationId}
                                    required={true}
                                />
                            </div>
                            {errors.password && (
                                <ErrorText>{errors.password}</ErrorText>
                            )}
                            <div className="mt-4 w-full"></div>
                            <Button type="submit" className={"lg:w-full"}>
                                Registrarse
                            </Button>
                        </>
                    );
                }}
            </Form>
            <div className="flex flex-col md:flex-row md:justify-between gap-3 mt-5">
                <Link
                    href={route("login")}
                    className="text-cyan-200 text-center"
                >
                    ¿Ya tienes una cuenta?
                </Link>
                <Link
                    href={route("password.request")}
                    className="text-cyan-200 text-center"
                >
                    Olvide mi contraseña
                </Link>
            </div>
        </Container>
    );
};

Register.layout = (page: React.ReactElement) => <Layout>{page}</Layout>;

export default Register;
