type ProgressBarProps = {
    current: number;
    total: number;
    barContainerClassname?: string;
    barClassname?: string;
};

export default function ProgressBar({
    current,
    total,
    barClassname,
    barContainerClassname,
}: ProgressBarProps) {
    const barSize = () => {
        if (current >= total) return 100;
        if (current <= 0) return 1;
        return (current / total) * 100;
    };

    return (
        <div
            className={
                barContainerClassname
                    ? barContainerClassname
                    : "bg-neutral-200 rounded-full p-1 w-full h-fit"
            }
        >
            <div
                className={
                    barClassname
                        ? barClassname
                        : "min-h-5 md:min-h-7 bg-green-500 rounded-full px-2 md:px-3 pt-1 transition-all duration-500"
                }
                style={{
                    width: `${barSize()}%`,
                }}
            >
                <div className=" block min-h-1 bg-white/50 rounded-full"></div>
            </div>
        </div>
    );
}
