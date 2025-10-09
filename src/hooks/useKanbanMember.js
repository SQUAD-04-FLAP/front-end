import { useContext } from "react";
import { KanbanMemberContext } from '../provider/KanbanMemberProvider/KanbanMemberContext';

export function useKanbanMember() {
    const context = useContext(KanbanMemberContext);
    if(!context) throw new Error("useKanbanMemberContext must be used within a KanbanMemberContext");
    return context;
}