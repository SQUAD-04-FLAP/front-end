import { useContext } from "react";
import { FilterContext } from "../provider/FilterProvider/FilterContext";

export function useFilter() {
    const context = useContext(FilterContext);
    if(!context) throw new Error("useAuth must be used within a FilterContext");
    return context;
}