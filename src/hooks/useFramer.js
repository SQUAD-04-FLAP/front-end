import { useContext } from "react";
import { FramerContext } from '../provider/FramerProvider/FramerContext';

export function useFramer() {
    const context = useContext(FramerContext);
    if(!context) throw new Error("useSectors must be used within a FramerProvider");
    return context;
}