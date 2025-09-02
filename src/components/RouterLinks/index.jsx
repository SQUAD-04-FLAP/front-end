import { Link } from "react-router-dom";

export function RouterLinks({ children, href, ...props }) {
    return(
      <Link to={href} {...props}>
           {children}
      </Link>
    );
}