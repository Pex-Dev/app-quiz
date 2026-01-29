import React from "react";
import Layout from "@/components/Layout";
import QuizForm from "@/components/quiz/quizForm/QuizForm";
import QuizProvider from "@/context/QuizFormContext";
import { Head } from "@inertiajs/react";

const Create = () => {
    return (
        <QuizProvider>
            <Head title="Quizium | Crear quiz" />
            <QuizForm title="Crear quiz"></QuizForm>
        </QuizProvider>
    );
};

Create.layout = (page: React.ReactElement) => <Layout>{page}</Layout>;

export default Create;
