import React, { useId } from "react";
import Layout from "../../components/Layout";
import Container from "../../components/common/Container";
import { Form, Head, Link } from "@inertiajs/react";
import InputText from "@/components/ui/InputText";
import { route } from "ziggy-js";
import ErrorText from "@/components/common/TextError";
import Button from "@/components/ui/Button";

const Login = () => {
    const emailId = useId();
    const passwordId = useId();
    const rememberId = useId();

    return (
        <Container title="Iniciar Sesión">
            <Head title="Quizium | Iniciar sesión" />
            <Form
                action="/login"
                className="flex flex-col gap-2 mt-3"
                method="post"
            >
                {({ errors }) => (
                    <>
                        <div className="flex flex-col gap-1">
                            <label className="text-white" htmlFor={emailId}>
                                Email
                            </label>
                            <InputText
                                type="email"
                                id={emailId}
                                name="email"
                                required={true}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-white" htmlFor={passwordId}>
                                Contraseña
                            </label>
                            <InputText
                                type="password"
                                id={passwordId}
                                name="password"
                                required={true}
                            />
                        </div>
                        {errors.email && <ErrorText>{errors.email}</ErrorText>}
                        <div className="flex gap-2 items-center mt-2">
                            <label htmlFor={rememberId} className="text-white">
                                Manter sesión Iniciada
                            </label>
                            <input
                                type="checkbox"
                                name="remember"
                                id={rememberId}
                            />
                        </div>

                        <div className="w-full mt-4">
                            <Button type="submit" className={"lg:w-full"}>
                                Iniciar Sesión
                            </Button>
                        </div>
                    </>
                )}
            </Form>
            <div className="flex flex-col md:flex-row md:justify-between gap-3 mt-5">
                <Link
                    href={route("register")}
                    className="text-cyan-200 text-center"
                >
                    ¿No tienes una cuenta?
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

Login.layout = (page: React.ReactElement) => <Layout>{page}</Layout>;

export default Login;
