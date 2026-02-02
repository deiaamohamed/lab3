
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts, removeProduct } from "../store/slices/productsSlice";
import { addItem } from "../store/slices/cartSlice";

export default function ProductsList() {

    const dispatch = useDispatch();
    const { products, isLoading, error } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const deleteHandler = async (productId) => {
        if (!window.confirm('Are you sure you want to delete this product?')) {
            return;
        }

        try {
            await dispatch(removeProduct(productId)).unwrap();
        } catch (error) {
            alert(`Failed to delete product: ${error}`);
        }
    };

    const handleAddToCart = (product) => {
        dispatch(addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
        }));
    };

    if (isLoading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger mt-4" role="alert">
                <h4>Error Loading Products</h4>
                <p>{error}</p>
                <button 
                    onClick={() => dispatch(fetchProducts())}
                    className="btn btn-danger"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="mt-4">
            <div className="row g-4">
                {products.map((product) => {
                    return (
                        <div key={product.id} className="col-md-4 col-sm-6">
                            <div className="card h-100 shadow-sm" style={{ borderRadius: '10px', transition: 'transform 0.2s' }}>
                                <div style={{
                                    height: '200px',
                                    overflow: 'hidden',
                                    borderTopLeftRadius: '10px',
                                    borderTopRightRadius: '10px',
                                    backgroundColor: '#f8f9fa'
                                }}>
                                    {product.image ? (
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                    ) : (
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            height: '100%',
                                            color: '#6c757d'
                                        }}>
                                            <i className="bi bi-image" style={{ fontSize: '4rem' }}></i>
                                        </div>
                                    )}
                                </div>

                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title text-primary">{product.name}</h5>
                                    <p className="card-text text-muted mb-2">
                                        <span className="badge bg-secondary">{product.category}</span>
                                    </p>
                                    <p className="card-text">
                                        <strong>Price:</strong> ${product.price}
                                    </p>
                                    <p className="card-text">
                                        <strong>Stock:</strong> {product.stock} units
                                    </p>
                                    <p className="card-text">
                                        <strong>Rating:</strong> ⭐ {product.rate} / 5
                                    </p>
                                    <div className="mt-auto pt-3 border-top">
                                        <button 
                                            onClick={() => handleAddToCart(product)}
                                            className="btn btn-primary w-100 mb-2"
                                        >
                                            <i className="bi bi-cart-plus me-2"></i>
                                            Add to Cart
                                        </button>
                                        <div className="d-flex justify-content-around">
                                            <Link to={`${product.id}/edit`} className="text-decoration-none">
                                                <i className="fs-4 text-info bi bi-pencil-square" title="Edit"></i>
                                            </Link>
                                            <Link to={`${product.id}`} className="text-decoration-none">
                                                <i className="fs-4 text-warning bi bi-eye-fill" title="View"></i>
                                            </Link>
                                            <i
                                                onClick={() => deleteHandler(product.id)}
                                                className="fs-4 text-danger bi bi-trash-fill"
                                                style={{ cursor: 'pointer' }}
                                                title="Delete"
                                            ></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
