import React, { useId } from "react";
import { Form } from "@inertiajs/react";
import Container from "../../components/common/Container";
import InputText from "@/components/ui/InputText";
import Button from "@/components/ui/Button";
import Layout from "@/components/Layout";
import { route } from "ziggy-js";
import ErrorText from "@/components/common/TextError";
import TextSuccess from "@/components/common/TextSuccess";

const Reset = (props: { token?: string; email?: string }) => {
    const passwordId = useId();
    const passwordConfirmationId = useId();

    return (
        <Container title="Reestablecer Contraseña">
            <Form action={route("password.update")} method="post">
                {({ errors, wasSuccessful }) => (
                    <>
                        {wasSuccessful ? (
                            <>
                                <TextSuccess>
                                    Contraseña reestablecida correctamente.
                                </TextSuccess>
                            </>
                        ) : (
                            <>
                                <input
                                    type="hidden"
                                    name="email"
                                    value={props.email}
                                />
                                <input
                                    type="hidden"
                                    name="token"
                                    value={props.token}
                                />
                                <div className="flex flex-col gap-1">
                                    <label
                                        className="text-white"
                                        htmlFor={passwordId}
                                    >
                                        Ingresa tu nueva contraseña
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
                                        Repite tu contraseña
                                    </label>
                                    <InputText
                                        type="password"
                                        name="password_confirmation"
                                        id={passwordConfirmationId}
                                        required={true}
                                    />
                                    {errors.password && (
                                        <ErrorText>{errors.password}</ErrorText>
                                    )}
                                </div>
                                {errors.email && (
                                    <ErrorText>{errors.email}</ErrorText>
                                )}
                                <Button type="submit" className="mt-2">
                                    Enviar enlace
                                </Button>
                            </>
                        )}
                    </>
                )}
            </Form>
        </Container>
    );
};

Reset.layout = (page: React.ReactElement) => <Layout>{page}</Layout>;

export default Reset;
