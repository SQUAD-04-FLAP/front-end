import { useContext } from "react";
import { SectorProvider } from "../provider/SectorProvider";
import { SectorContext } from "../provider/SectorProvider/SectorContext";

export function useSectors() {
    const context = useContext(SectorContext);
    if(!context) throw new Error("useSectors must be used within a SectorProvider");
    return context;
}