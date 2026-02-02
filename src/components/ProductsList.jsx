
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteProduct, getAllProduct } from "../api/productApi";

export default function ProductsList() {

    const [products, setProducts] = useState([])
    const [error, setErrors] = useState({})

    useEffect(() => {
        getAllProduct().then(response => {
            setProducts(response.data)
        }).catch(console.log)
    }, [])

    const deleteHandler = (productId) => {
        deleteProduct(productId).then(response => {
            const filteredProducts = products.filter(product => product.id != productId)
            setProducts(filteredProducts)
        }).catch((e) => {
            setErrors(e)
        })
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
                                    <div className="mt-auto d-flex justify-content-around pt-3 border-top">
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
                    )
                })}
            </div>
        </div>
    )
}
