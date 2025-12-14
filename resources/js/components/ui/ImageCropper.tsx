import React, { useId, useRef, useState } from "react";
import { Cropper, ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import ErrorText from "../common/TextError";

export default function ImageCropper({
    handleCroppedImage,
    currentImage,
}: {
    handleCroppedImage: (croppImage: string) => void;
    currentImage: string | null;
}) {
    const [image, setImage] = useState<string | null>(null);
    const [croppedImage, setCroppedImage] = useState<string | null>(
        currentImage
    );
    const [error, setError] = useState<string | null>(null);

    const inputFileCroppId = useId();

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (!files) return;

        const maxSizeInBytes = 2 * 1024 * 1024;

        if (files[0].size > maxSizeInBytes) {
            setError(
                "El archivo seleccionado es demasiado grande (Máximo 2MB)"
            );
            return;
        }

        setImage(URL.createObjectURL(files[0]));
    };

    const cropperRef = useRef<ReactCropperElement>(null);

    const onCrop = () => {
        const cropper = cropperRef.current?.cropper;
        if (!cropper) return;
        const croppedImage = cropper.getCroppedCanvas().toDataURL();
        handleCroppedImage(croppedImage);
        setCroppedImage(croppedImage);
        setImage(null);
    };

    return (
        <div>
            <label
                htmlFor={inputFileCroppId}
                className="bg-white border-b-4 border-b-neutral-500 rounded-md py-1 px-2 mt-3 md:mt-4 items-center w-fit text-neutral-800 flex gap-2"
            >
                <span>Imagen</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1d0b0b"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M15 8h.01" />
                    <path d="M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12z" />
                    <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5" />
                    <path d="M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3" />
                </svg>
            </label>
            <input
                type="file"
                id={inputFileCroppId}
                accept="image/png, image/jpeg, .png, .jpg, .jpeg"
                className="hidden"
                onChange={(e) => handleOnChange(e)}
            />
            {error && <ErrorText>{error}</ErrorText>}
            {image && (
                <div className="fixed flex justify-center items-center bg-black/80 w-full h-full left-0 top-0 z-10">
                    <div className="flex flex-col bg-white md:border-b-5 md:border-b-neutral-400 p-3 md:p-4 md:rounded-2xl w-fit h-full md:h-auto md:max-h-10/12 shadow-2xl shadow-black">
                        <Cropper
                            className="rounded-lg overflow-hidden h-full"
                            src={image}
                            background={false}
                            style={{
                                minHeight: 350,
                                minWidth: 350,
                                maxWidth: 700,
                                maxHeight: "100%",
                            }}
                            initialAspectRatio={16 / 9}
                            aspectRatio={16 / 9}
                            guides={false}
                            minCropBoxHeight={150}
                            minCropBoxWidth={150}
                            viewMode={1}
                            ref={cropperRef}
                        />
                        <div className="mt-3 h-fit">
                            <button
                                type="button"
                                onClick={onCrop}
                                className="bg-amber-500 border-b-amber-600 text-white hover:bg-amber-400 hover:border-b-amber-500 hover:cursor-pointer transition-colors border-b-5 font-semibold px-10 py-2 rounded-lg"
                            >
                                Aceptar
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {croppedImage && (
                <img
                    src={croppedImage}
                    alt="Imagen para el quiz"
                    className="rounded-md overflow-hidden mt-3 w-full aspect-video bg-neutral-800"
                />
            )}
        </div>
    );
}
