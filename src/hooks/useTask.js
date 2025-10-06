import { useContext } from "react";
import { TaskContext } from "../provider/TaskProvider/TaskContext";

export function useTask() {
    const context = useContext(TaskContext);
    if(!context) throw new Error("useAuth must be used within a TaskContext");
    return context;
}