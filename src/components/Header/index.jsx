import { RouterLinks } from "../RouterLinks";

export function Header() {
    return(
        <ul className="flex justify-center gap-4">
            <RouterLinks href={'/'}>
                Home
            </RouterLinks>

             <RouterLinks href={'/login'}>
                Login
            </RouterLinks>
        </ul>
    );
}