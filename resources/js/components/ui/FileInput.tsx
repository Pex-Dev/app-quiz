import { useId, useRef, useState } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";

interface FileInputProps {
    name: string;
    label?: string;
    variant?: "primary" | "secondary";
    sizeVariant?: "sm" | "md" | "lg";
    rounded?: boolean;
    maxFiles?: number;
    accept?: string;
    previewImages?: boolean;
    onFilesChange?: (files: File[]) => void;
}

export default function FileInput({
    name,
    label = "Archivo",
    variant = "primary",
    sizeVariant = "md",
    rounded = false,
    maxFiles = 1,
    accept,
    previewImages = true,
    onFilesChange,
}: FileInputProps) {
    const [previews, setPreviews] = useState<string[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [croppingImage, setCroppingImage] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);

    const id = useId();

    const base =
        "flex gap-2 w-fit items-center  bg-white dark:bg-neutral-700 dark:text-white outline-0";

    const variants = {
        primary: `border border-neutral-400 dark:border-neutral-600 focus-visible:border-blue-500 ${
            rounded ? "rounded-full" : "rounded"
        }`,
        secondary: `border-b-2 border-neutral-300 dark:border-neutral-600 focus-visible:outline focus-visible:outline-blue-500 ${
            rounded ? "rounded-full" : ""
        }`,
    };

    const sizes = {
        sm: "px-2 py-1  text-sm",
        md: "px-2 py-1.5 text-base",
        lg: "px-3 py-2 text-lg",
    };

    const finalClassName = twMerge(
        clsx(base, variants[variant], sizes[sizeVariant])
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let files = e.target.files; //Obtener archivos

        if (!files || !files[0]) {
            return;
        }
        setCroppingImage(URL.createObjectURL(files[0]));
        if (files.length > maxFiles) {
            if (inputRef.current) {
                inputRef.current.value = "";
                setError(`La cantidad máxima de archivos es ${maxFiles}`);
            }
            setPreviews(null);
            return;
        }

        setError(null);

        const imageFiles = Array.from(files).filter((file) =>
            file.type.startsWith("image/")
        );

        if (imageFiles.length !== files.length) {
            setError("Solo se permiten archivos de imagen.");
            setPreviews(null);
            return;
        }

        if (onFilesChange) onFilesChange(imageFiles);

        if (previewImages) {
            const readers: Promise<string>[] = imageFiles.map((file) => {
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        resolve(reader.result as string);
                    };
                    reader.readAsDataURL(file);
                });
            });

            Promise.all(readers).then((results) => {
                setPreviews(results);
            });
        }
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
                <label
                    className={`${finalClassName}`}
                    htmlFor={id}
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            document.getElementById(id)?.click();
                        }
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={sizeVariant === "sm" ? 24 : 26}
                        height={sizeVariant === "sm" ? 24 : 26}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                        <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                        <path d="M12 11v6" />
                        <path d="M9.5 13.5l2.5 -2.5l2.5 2.5" />
                    </svg>
                    {label}
                </label>
                {error && (
                    <small className="bg-red-600/20 border border-red-700 text-red-600 px-2 py-1">
                        {error}
                    </small>
                )}
            </div>

            <input
                type="file"
                name={name}
                ref={inputRef}
                id={id}
                tabIndex={-1}
                onChange={(e) => handleChange(e)}
                accept={accept ? accept : ""}
                multiple={maxFiles > 1 ? true : false}
                className="sr-only"
            />
            <div className="mt-2">
                {previews && previewImages && (
                    <div className="flex gap-2 flex-wrap">
                        {previews.map((src, index) => (
                            <img
                                key={previews[index] ?? index}
                                src={src}
                                alt={`preview imagen ${index}`}
                                className="max-w-[225px] max-h-[225px] rounded-md"
                            />
                        ))}
                    </div>
                )}
            </div>
            {croppingImage && (
                <Cropper
                    src={croppingImage}
                    background={false}
                    style={{
                        minHeight: 350,
                        minWidth: 350,
                        maxWidth: 700,
                        maxHeight: "100dvh",
                    }}
                    initialAspectRatio={1}
                    aspectRatio={1}
                    guides={false}
                    minCropBoxHeight={150}
                    minCropBoxWidth={150}
                    viewMode={1}
                />
            )}
        </div>
    );
}
