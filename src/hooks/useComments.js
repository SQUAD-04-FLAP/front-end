import { useContext } from "react";
import { CommentsContext } from "../provider/CommentsProvider/CommentsContext";

export function useComments() {
    const context = useContext(CommentsContext);
    if(!context) throw new Error("useComments must be used within a CommentsContext");
    return context;
}