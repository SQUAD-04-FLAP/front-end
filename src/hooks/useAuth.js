import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider/AuthContext";

export function useAuth() {
    const context = useContext(AuthContext);
    if(!context) throw new Error("useAuth must be used within a AuthProvider");
    return context;
}