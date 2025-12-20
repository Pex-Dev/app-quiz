import { Quiz } from "@/types/quiz";
import { router, usePage } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { route } from "ziggy-js";

export default function useSearch() {
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<Quiz[] | null>(null);

    const searchDyanmicResults = async (searchText: string) => {
        setLoading(true);
        if (searchText.length < 3) {
            setResults(null);
            setLoading(false);
            return;
        }
        try {
            const response = await axios(route("search.dynamic", searchText));
            const quizzes: Quiz[] = response.data;
            setResults(quizzes);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return { searchDyanmicResults, results, loading };
}
