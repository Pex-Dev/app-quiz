import React from "react";

const iconLike = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="45"
        height="45"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3" />
    </svg>
);

const iconDislike = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="45"
        height="45"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <path d="M7 13v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2 -2l-1 -5a2 3 0 0 0 -2 -2h-7a3 3 0 0 0 -3 3" />
    </svg>
);

export default function ButtonLikeQuizz({
    icon,
    like,
    onClick,
}: {
    icon: "like" | "dislike";
    like: boolean | null;
    onClick: (like: boolean) => Promise<void>;
}) {
    const baseClassname = "transition-all hover:scale-110 hover:cursor-pointer";

    const likeClassname = `${
        like === null
            ? "text-neutral-400"
            : like
            ? "text-blue-300"
            : "text-red-400"
    }`;

    const label = `${
        like === null
            ? icon === "like"
                ? "Dar me gusta al quizz"
                : "Dar no me gusta al quizz"
            : like
            ? "Quitar me gusta al quiz"
            : "Quitar no me gusta al quiz"
    }`;

    return (
        <button
            aria-label={label}
            title={label}
            onClick={() => onClick(icon === "like" ? true : false)}
            className={`${baseClassname} ${likeClassname}`}
        >
            {icon === "like" ? iconLike : iconDislike}
        </button>
    );
}
