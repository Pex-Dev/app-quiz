import { User } from "@/types/quiz";
import { useForm } from "@inertiajs/react";
import { route } from "ziggy-js";

interface FormData {
    id: string | number;
    name: string;
    biography: string | null;
    image: string | null;
}

export default function useProfile(user: User) {
    const form = useForm<FormData>({
        id: user.id,
        name: user.name,
        biography: user.biography,
        image: user.image,
    });

    const submitForm = () => {
        const { post } = form;

        post(route("profile.update", user.id));
    };

    return { form, submitForm };
}
