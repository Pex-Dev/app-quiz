import Notify from "simple-notify";
import { NotifyPosition } from "simple-notify";
import "simple-notify/dist/simple-notify.css";

export default function notify(
    title: string,
    text: string,
    position: NotifyPosition = "bottom right"
) {
    new Notify({
        title: title,
        text: text,
        position,
    });
}
