import CategoryNav from "./CategoryNav";
import Navigation from "./Navigation";

function Header() {
    return (
        <header className="nc-games-header">
            <Navigation/>
            <CategoryNav/>
        </header>
    );
}

export default Header;