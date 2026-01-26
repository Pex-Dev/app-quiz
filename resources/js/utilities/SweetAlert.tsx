import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { SweetAlertIcon } from "sweetalert2";
import { router } from "@inertiajs/react";

const MySwal = withReactContent(Swal);

const alertClass = {
    container: "!bg-black/70",
    popup: "!border-b-5 !border-b-neutral-400 !shadow-xl !shadow-black/50 !rounded-2xl",
    title: "!font-roboto",
    text: "!font-nunito",
    confirmButton:
        "!bg-green-500 !px-8 !py-2 !font-roboto !rounded-md !border-b-4 !border-b-green-600",
    cancelButton:
        "!bg-neutral-500 !px-8 !py-2 !text-white !border-b-4 !border-b-neutral-600 !rounded-md !font-roboto",

    denyButton:
        "!bg-red-500 !px-8 !py-2 !text-white !border-b-4 !border-b-red-600 !rounded-md !font-roboto",
};

export function alert(
    title: string,
    text: string | undefined = "",
    icon: SweetAlertIcon = "success",
) {
    MySwal.fire({
        title: title,
        text: text,
        icon: icon,
        allowOutsideClick: false,
        customClass: alertClass,
    });
}

export function alertWithRedirect(
    title: string,
    url: string,
    text: string | undefined = "",
    icon: SweetAlertIcon = "success",
) {
    MySwal.fire({
        title: title,
        icon: icon,
        text: text,
        confirmButtonText: "Ok",
        allowOutsideClick: false,
        customClass: alertClass,
    }).then((result) => {
        if (result.isConfirmed) {
            router.get(url);
        }
    });
}

export function alertWithCallback(
    title: string,
    callback: (...args: any[]) => any,
    text: string | undefined = "",
    icon: SweetAlertIcon = "success",
    cancelButton: boolean = false,
) {
    MySwal.fire({
        title: title,
        icon: icon,
        text: text,
        confirmButtonText: "Ok",
        allowOutsideClick: false,
        showCancelButton: cancelButton,
        cancelButtonText: "Cancelar",
        customClass: alertClass,
    }).then((result) => {
        if (result.isConfirmed) {
            callback();
        }
    });
}
