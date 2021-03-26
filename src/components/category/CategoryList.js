// I want to try having a dropdown menu render and a Category appear based on that choice
// Create Category, and pass a value on that choice

import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { CategoryContext } from "./CategoryProvider.js"
import "./Category.css"

export const CategoryList = (props) => {
    // This state changes when `getCategorys()` is invoked below
    const { categories, getCategories } = useContext(CategoryContext)

    /*
        What's the effect this is reponding to? Component was
        "mounted" to the DOM. React renders blank HTML first,
        then gets the data, then re-renders.
    */
    useEffect(() => {
        console.log("CategoryList: Initial render before data")
        getCategories()
    }, [])

    /*
        This effect is solely for learning purposes. The effect
        it is responding to is that the Category state changed.
    */
    // useEffect(() => {
    //     console.log("CategoryList: Category state changed")
    //     console.log(Categorys)
    // }, [Categorys])

    return (
        <article className="categoriesWindow">

            {
                categories.map(category => {
                    return (
                    <div className="categoryCard" key={category.id}>
                            <h2>Category: {category.id}</h2>
                            <h3>{category.category_label}</h3>
                    </div>
                    )
                })}
        </article>
    )
}