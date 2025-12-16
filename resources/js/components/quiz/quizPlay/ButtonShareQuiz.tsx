import notify from "@/utilities/SimpleNotify";

export default function ButtonShareQuiz() {
    const copyToClipBoard = async () => {
        await navigator.clipboard.writeText(document.URL);
        notify("Listo", "Enlace copiado al portapapeles");
    };

    return (
        <button
            type="button"
            onClick={() => copyToClipBoard()}
            className="mx-auto bg-neutral-500 rounded-r-full py-2 px-5 flex gap-2 items-center font-semibold
                         border-b-4 md:border-b-5 border-b-neutral-700 text-white transition-colors hover:bg-neutral-400 hover:border-b-neutral-600 hover:cursor-pointer"
        >
            <span>Compartir</span>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                <path d="M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                <path d="M8.7 10.7l6.6 -3.4" />
                <path d="M8.7 13.3l6.6 3.4" />
            </svg>
        </button>
    );
}
