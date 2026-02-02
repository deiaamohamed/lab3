
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Products } from "../pages/Products";
import { ProductDetails } from "../pages/ProductDetails";
import { ProductForm } from "../pages/ProductForm";
import { NotFound } from "../pages/NotFound";
import { Sharedlayout } from "./Sharedlayout";



export default function Mainlayout() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Sharedlayout />} >
                    <Route index element={<Home />} />
                    <Route path="products" element={<Products />} />
                    <Route path="products/:id" element={<ProductDetails />} />
                    <Route path="products/:id/edit" element={<ProductForm />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}
