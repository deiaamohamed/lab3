import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../api/productApi";

export function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState({})

    useEffect(() => {
        getProductById(id).then(response => {
            setProduct(response.data)
        }).catch(console.log)
    }, [])
    return (
        <div className="mt-5 container">
            <div className="row">
                <div className="col-md-5">
                    <div style={{
                        width: '100%',
                        height: '400px',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        backgroundColor: '#f8f9fa',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}>
                        {product?.image ? (
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
                                <i className="bi bi-image" style={{ fontSize: '6rem' }}></i>
                            </div>
                        )}
                    </div>
                </div>
                <div className="col-md-7">
                    <h1 className="mb-4">Product Details</h1>
                    <p className="lead mt-3">Product Name: <strong>{product?.name}</strong></p>
                    <p className="lead mt-3">Product price: <strong>{product?.price}</strong> $</p>
                    <p className="lead mt-3">Product Category: <strong>{product?.category}</strong></p>
                    <p className="lead mt-3">Product Description: <strong>{product?.description}</strong></p>
                    <p className="lead mt-3">Product Stock: <strong>{product?.stock}</strong></p>
                    <p className="lead mt-3">Product Rate: <strong>{product?.rate} / 5</strong></p>
                    <Link to="/products" className="btn btn-dark mt-2">Back to Products</Link>
                </div>
            </div>
        </div>
    )
}
