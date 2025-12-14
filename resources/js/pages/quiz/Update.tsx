import React from "react";
import Layout from "@/components/Layout";
import QuizForm from "@/components/quiz/quizForm/QuizForm";
import QuizProvider from "@/context/QuizFormContext";
import { Quiz } from "@/types/quiz";
import Container from "@/components/common/Container";

const Update = (props: { quiz: Quiz | null }) => {
    const { quiz } = props;

    if (!quiz) {
        return <Container title="El quiz no existe :/">:X</Container>;
    }

    return (
        <QuizProvider quiz={quiz}>
            <QuizForm title="Actualizar quiz"></QuizForm>
        </QuizProvider>
    );
};

Update.layout = (page: React.ReactElement) => <Layout>{page}</Layout>;

export default Update;
