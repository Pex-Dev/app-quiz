const svgCreate = (
    <svg
        className="text-white max-w-20 max-h-20 lg:max-h-max lg:max-w-max"
        xmlns="http://www.w3.org/2000/svg"
        width="130"
        height="130"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
        <path d="M9 12h6" />
        <path d="M12 9v6" />
    </svg>
);

const svgSearch = (
    <svg
        className="text-white max-w-20 max-h-20 lg:max-h-max lg:max-w-max"
        xmlns="http://www.w3.org/2000/svg"
        width="130"
        height="130"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
        <path d="M21 21l-6 -6" />
    </svg>
);

const svgComplete = (
    <svg
        className="text-white max-w-20 max-h-20 lg:max-h-max lg:max-w-max"
        xmlns="http://www.w3.org/2000/svg"
        width="130"
        height="130"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <path d="M5 12l5 5l10 -10" />
    </svg>
);

const svgManagement = (
    <svg
        className="text-white max-w-20 max-h-20 lg:max-h-max lg:max-w-max"
        xmlns="http://www.w3.org/2000/svg"
        width="130"
        height="130"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M6 9l6 0" />
        <path d="M4 5l4 0" />
        <path d="M6 5v11a1 1 0 0 0 1 1h5" />
        <path d="M12 7m0 1a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-6a1 1 0 0 1 -1 -1z" />
        <path d="M12 15m0 1a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-6a1 1 0 0 1 -1 -1z" />
    </svg>
);

export default function FeatureCard({
    icon,
    title,
    children,
}: {
    icon: "create" | "search" | "complete" | "management";
    title: string;
    children: React.ReactNode;
}) {
    const getIcon = (i: "create" | "search" | "complete" | "management") => {
        if (i === "create") {
            return svgCreate;
        }
    };

    return (
        <li className="bg-linear-to-br from-blue-700 to-blue-600 border-b-4 border-b-blue-900 p-3 md:p-4 rounded-xl md:rounded-2xl flex flex-col justify-center items-center shadow-xl">
            {icon === "create" && svgCreate}
            {icon === "complete" && svgComplete}
            {icon === "management" && svgManagement}
            {icon === "search" && svgSearch}
            <h3 className="text-lg font-roboto font-bold text-white text-center">
                {title}
            </h3>
            <p className="text-neutral-200 text-center text-sm md:text-base">
                {children}
            </p>
        </li>
    );
}
