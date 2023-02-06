import { Link } from "react-router-dom";

function Navigation() {
    return (
        <nav className="user-navigation">
            <h1 className="app-title">NC-Games</h1>
            <ul className="user-navigation_links">
                <li>New Review</li>
                <li><Link to="/">Home</Link></li>
                <li>User</li>
            </ul>
        </nav>
    );
}

export default Navigation;