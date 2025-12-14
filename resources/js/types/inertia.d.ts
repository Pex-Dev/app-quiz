import "@inertiajs/core";

declare module "@inertiajs/core" {
    interface PageProps {
        user: {
            id: number;
            name: string;
            email: string;
            created_at: string;
            updated_at: string;
        };
        jetstream: Record<string, boolean>;
        errorBags: unknown;
        errors: unknown;
        flash: {
            message: string | null;
            success: string | null;
            error: string | null;
        };
        auth?: {
            user: {
                id: number;
                name: string;
                email: string;
                image: string | null;
            } | null;
        };
    }
}
