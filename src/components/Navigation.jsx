import { Link } from "react-router-dom";

function Navigation() {
    return (
        <nav className="user-navigation">
            <h1 className="app-title"><Link className="app-title_link" to="/">Table Top</Link></h1>
            <ul className="user-navigation_links">
                <li>User</li>
            </ul>
        </nav>
    );
}

export default Navigation;