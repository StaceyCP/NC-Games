import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../api";

function CategoryNav() {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        getCategories().then((categoriesFromApi) => {
            setCategories(categoriesFromApi)
        })
    }, [])

    return (
        <div className="category-navigation">
            {categories.map(({slug}) => {
                return <span className="category-link" key={slug}><Link to={`/${slug}`}>{slug}</Link></span>
            })}
        </div>
    );
}

export default CategoryNav;