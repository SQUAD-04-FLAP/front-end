import { RouterLinks } from "../RouterLinks"

export function IconSidebar({ children, href }) {
    return(
        <RouterLinks href={href}>
            {children}
        </RouterLinks>
    );
}