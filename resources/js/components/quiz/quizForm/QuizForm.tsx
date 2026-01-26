import { useQuizForm } from "@/context/QuizFormContext";
import { useEffect, useId, useState } from "react";
import InputText from "@/components/ui/InputText";
import InputSelect from "@/components/ui/InputSelect";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";
backgroundsImages;

import { alertWithRedirect } from "@/utilities/SweetAlert";

import ErrorText from "@/components/common/TextError";
import QuestionListContainer from "./QuestionListContainer";
import ImageCropper from "@/components/ui/ImageCropper";
import { usePage } from "@inertiajs/react";
import backgroundsImages from "@/utilities/BackgroundCategories";

export default function QuizForm({ title }: { title: string }) {
    const { submitForm, form } = useQuizForm();
    const { errors, setData, data, processing } = form;
    const { props } = usePage();

    const nameId = useId();

    const visibiltyOptions = [
        { label: "Publico", value: "1" },
        { label: "Privado", value: "0" },
    ];

    const categoriesOptions = [
        { label: "Conocimiento General", value: "1" },
        { label: "Cine y Series", value: "2" },
        { label: "Videojuegos", value: "3" },
        { label: "Geografía", value: "4" },
        { label: "Literatura", value: "5" },
        { label: "Música", value: "6" },
        { label: "Ciencia y Naturaleza", value: "7" },
        { label: "Deportes", value: "8" },
        { label: "Lógica y Adivinanzas", value: "9" },
        { label: "Tecnología", value: "10" },
        { label: "Comida y Gastronomía", value: "11" },
        { label: "Otros / Miscelánea", value: "12" },
    ];

    const handleCroppedImage = (croppedImage: string) => {
        setData("image", croppedImage);
    };

    useEffect(() => {
        if (props.flash.success) {
            alertWithRedirect("Listo", "/", props.flash.success);
        }
    }, [props]);

    return (
        <div className="bg-white border-b-5 border-b-neutral-400 md:rounded-2xl w-full md:max-w-2xl lg:max-w-6xl font-nunito shadow-xl shadow-black-60 overflow-hidden md:my-7 lg:my-10">
            <header
                className="relative min-h-[100px] bg-center bg-repeat bg-size-[80%] md:bg-size-[50%] "
                style={{
                    backgroundImage: `url(${
                        backgroundsImages[Number(data.category) - 1]
                    })`,
                }}
            >
                <div className="absolute w-full h-full bg-linear-to-t from-white to-white/50 p-3 md:p-4 lg:p-5">
                    <h2 className="text-white uppercase font-semibold text-xl md:text-2xl text-shadow-lg text-shadow-black/80">
                        {title}
                    </h2>
                </div>
            </header>
            <form
                method="post"
                className="p-2 md:p-3 lg:p-5"
                onSubmit={(e) => {
                    e.preventDefault();
                    submitForm();
                }}
            >
                <div className="flex flex-col lg:flex-row-reverse gap-4">
                    <div className="w-full">
                        <div className="flex flex-col gap-1">
                            <label htmlFor={nameId}>Nombre del quiz</label>
                            <InputText
                                type="text"
                                name="name"
                                id={nameId}
                                value={data.name}
                                required={true}
                                maxLength={30}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="bg-neutral-200"
                            />
                            {errors.name && (
                                <ErrorText>{errors.name}</ErrorText>
                            )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
                            <div className="flex flex-col gap-1">
                                <label htmlFor={nameId}>Categoría</label>
                                <InputSelect
                                    name="category"
                                    ariaLabel="Categoría"
                                    search={false}
                                    value={String(data.category)}
                                    onChange={(e, value) => {
                                        setData("category", value);
                                    }}
                                    options={categoriesOptions}
                                />
                                {errors.category && (
                                    <ErrorText>{errors.category}</ErrorText>
                                )}
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor={nameId}>Visibilidad</label>
                                <InputSelect
                                    name="is_public"
                                    ariaLabel="Visibilidad"
                                    search={false}
                                    value={data.public ? "1" : "0"}
                                    onChange={(e, value) =>
                                        setData(
                                            "public",
                                            value === "1" ? true : false,
                                        )
                                    }
                                    options={visibiltyOptions}
                                />
                                {errors.category && (
                                    <ErrorText>{errors.category}</ErrorText>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col gap-1 mt-4">
                            <label htmlFor={nameId}>
                                Descripción del quiz
                                <span className="text-neutral-400">
                                    {" "}
                                    (Opcional)
                                </span>
                            </label>
                            <TextArea
                                maxLength={500}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                className="bg-neutral-200"
                            />
                            {errors.description && (
                                <ErrorText>{errors.description}</ErrorText>
                            )}
                        </div>
                    </div>
                    <div className="w-full lg:max-w-md">
                        <ImageCropper
                            handleCroppedImage={handleCroppedImage}
                            currentImage={
                                data.image ? `/uploads/${data.image}` : null
                            }
                            className="bg-neutral-50 mt-3 hover:cursor-pointer hover:bg-white outline outline-neutral-400 border-b-3 border-b-neutral-300 py-1 px-3 flex items-center gap-1 w-fit rounded-md"
                        />
                        {errors.image && <ErrorText>{errors.image}</ErrorText>}
                    </div>
                </div>
                <QuestionListContainer />
                <div className="flex mt-5 pt-3">
                    <Button
                        type="submit"
                        disabled={processing}
                        variant="secondary"
                    >
                        {title}
                    </Button>
                </div>
            </form>
        </div>
    );
}
