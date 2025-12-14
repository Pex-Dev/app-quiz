import React from "react";
import Layout from "@/components/Layout";
import { Quiz } from "@/types/quiz";
import Container from "@/components/common/Container";
import QuizBoard from "@/components/quiz/quizPlay/QuizBoard";
import QuizPlayProvider from "@/context/QuizPlayContext";

const Play = (props: { quiz: Quiz | null; created_at: string | null }) => {
    const { quiz, created_at } = props;

    if (!quiz) {
        return <Container title="El quiz no existe :/">:X</Container>;
    }
    quiz.created_at = created_at ? created_at : quiz.created_at;

    return (
        <QuizPlayProvider quizProp={quiz}>
            <QuizBoard />
        </QuizPlayProvider>
    );
};

Play.layout = (page: React.ReactElement) => <Layout>{page}</Layout>;

export default Play;
