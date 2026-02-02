import ProductsList from "../components/ProductsList";

export function Products() {
    return (
        <div className="container mt-5">
            <h1 className="text-center text-primary mb-4">Our Products</h1>
            <div className="d-flex justify-content-end mb-3">
                <input
                    type="text"
                    placeholder="Search products..."
                    className="form-control w-25"
                    style={{ borderRadius: '8px' }}
                />
            </div>
            <ProductsList />
        </div>
    )
}
