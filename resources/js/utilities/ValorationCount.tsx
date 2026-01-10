import { Like } from "@/types/quiz";

export const valorationsCount = (
    likesList: Like[] | undefined,
    valoration: "like" | "dislike"
): number => {
    let vCount = 0;

    if (likesList === undefined) return 0;

    likesList.forEach((l) => {
        if (l.like && valoration === "like") {
            vCount++;
        }
        if (!l.like && valoration === "dislike") {
            vCount++;
        }
    });

    return vCount;
};
