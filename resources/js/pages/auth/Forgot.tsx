import React, { useId } from "react";
import { Form } from "@inertiajs/react";
import Container from "../../components/common/Container";
import InputText from "@/components/ui/InputText";
import Button from "@/components/ui/Button";
import Layout from "@/components/Layout";
import { route } from "ziggy-js";
import ErrorText from "@/components/common/TextError";

const Forgot = () => {
    const emailId = useId();

    return (
        <Container title="Reestablecer Contraseña">
            <Form action={route("password.email")} method="post">
                {({ errors }) => (
                    <>
                        <label className="text-white" htmlFor={emailId}>
                            Ingresa tu email
                        </label>
                        <InputText
                            type="email"
                            name="email"
                            id={emailId}
                            required={true}
                        />
                        {errors.throttle && (
                            <ErrorText>{errors.throttle}</ErrorText>
                        )}
                        {errors.email && <ErrorText>{errors.email}</ErrorText>}
                        <Button type="submit" className="mt-5 py-3">
                            Enviar enlace
                        </Button>
                    </>
                )}
            </Form>
        </Container>
    );
};

Forgot.layout = (page: React.ReactElement) => <Layout>{page}</Layout>;

export default Forgot;
