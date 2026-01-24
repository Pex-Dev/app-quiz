import { User } from "@/types/quiz";
import { ChangeEvent, useEffect, useId, useState } from "react";
import ErrorText from "@/components/common/TextError";
import Layout from "@/components/Layout";
import InputText from "@/components/ui/InputText";
import Button from "@/components/ui/Button";
import ImageCropper from "@/components/ui/ImageCropper";
import TextArea from "@/components/ui/TextArea";
import useProfile from "@/hooks/useProfile";
import { alertWithRedirect } from "@/utilities/SweetAlert";
import { usePage } from "@inertiajs/react";
import { route } from "ziggy-js";

const EditProfile = (prop: { user: User }) => {
    const { user } = prop;
    const { props } = usePage();
    const { form, submitForm } = useProfile(user);
    const { errors, setData, data, processing } = form;

    const nameId = useId();
    const biographyId = useId();

    const [croppedImage, setCroppedImage] = useState<string | null>(null);

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData("name", e.target.value);
    };
    const handleBiographyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setData("biography", e.target.value.length > 0 ? e.target.value : null);
    };

    const handleCroppedImage = (croppedImage: string) => {
        setCroppedImage(croppedImage);
        setData("image", croppedImage);
    };

    const labelImageEditButton = () => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1d0b0b"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                <path d="M16 5l3 3" />
            </svg>
        );
    };

    useEffect(() => {
        if (props.flash.success) {
            alertWithRedirect(
                "Listo",
                route("profile", data.name),
                props.flash.success,
            );
        }
    }, [props]);

    return (
        <div className="bg-white flex-1 md:flex-none md:rounded-2xl p-3 md:p-5 border-neutral-500 border-b-3 md:border-b-4 shadow-2xl w-full md:max-w-[840px]">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    submitForm();
                }}
            >
                <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-10 mt-8 md:mt-0">
                    <div className="relative">
                        <img
                            src={
                                croppedImage
                                    ? croppedImage
                                    : user.image
                                      ? `/uploads/${user.image}`
                                      : "/images/icons/icon_user.png"
                            }
                            alt={`Imagen de perfil de ${user.name}`}
                            className="w-40 md:min-w-50 rounded-full border border-neutral-600 aspect-square"
                        />
                        <ImageCropper
                            handleCroppedImage={handleCroppedImage}
                            currentImage={
                                user.image ? `/uploads/${user.image}` : null
                            }
                            className="absolute bottom-0 right-0 bg-neutral-50 rounded-full p-1 border-b-4 border-b-neutral-300 shadow-sm outline outline-neutral-400 hover:cursor-pointer"
                            label={labelImageEditButton()}
                            displayImage={false}
                            aspectRatio={1}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="flex flex-col gap-1 w-full">
                            <label htmlFor={nameId}>Nombre de usuario</label>
                            <InputText
                                type="text"
                                name="name"
                                id={nameId}
                                value={data.name}
                                required={true}
                                maxLength={15}
                                className="bg-neutral-200"
                                onChange={handleNameChange}
                            />
                            {errors.name && (
                                <ErrorText>{errors.name}</ErrorText>
                            )}
                        </div>
                        <div className="flex flex-col gap-1 mt-4 w-full">
                            <label htmlFor={biographyId}>
                                Biografia
                                <span className="text-neutral-400">
                                    {" "}
                                    (Opcional)
                                </span>
                            </label>
                            <TextArea
                                maxLength={255}
                                className="bg-neutral-200"
                                onChange={handleBiographyChange}
                                id={biographyId}
                                value={data.biography ? data.biography : ""}
                            />
                            {errors.biography && (
                                <ErrorText>{errors.biography}</ErrorText>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex mt-5 pt-3 border-neutral-500 md:max-w-60">
                    <Button type="submit" variant="secondary">
                        Actualizar
                    </Button>
                </div>
            </form>
        </div>
    );
};

EditProfile.layout = (page: React.ReactElement) => <Layout>{page}</Layout>;

export default EditProfile;
