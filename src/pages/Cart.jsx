import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, clearCart } from '../store/slices/cartSlice';
import { Link } from 'react-router-dom';

export function Cart() {
    const dispatch = useDispatch();
    const { items, totalAmount, totalQuantity } = useSelector((state) => state.cart);

    const handleIncrement = (item) => {
        dispatch(addItem(item));
    };

    const handleDecrement = (itemId) => {
        dispatch(removeItem(itemId));
    };

    const handleClearCart = () => {
        if (window.confirm('Are you sure you want to clear all items from cart?')) {
            dispatch(clearCart());
        }
    };

    if (items.length === 0) {
        return (
            <div className="container mt-5">
                <div className="text-center">
                    <i className="bi bi-cart-x" style={{ fontSize: '5rem', color: '#6c757d' }}></i>
                    <h2 className="mt-3">Your Cart is Empty</h2>
                    <p className="text-muted">Start adding some products to your cart!</p>
                    <Link to="/products" className="btn btn-primary mt-3">
                        Browse Products
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="text-primary">
                    Shopping Cart
                    <span className="badge bg-primary ms-3">{totalQuantity} items</span>
                </h1>
                <button 
                    onClick={handleClearCart} 
                    className="btn btn-outline-danger"
                >
                    <i className="bi bi-trash me-2"></i>
                    Clear Cart
                </button>
            </div>

            <div className="row">
                <div className="col-lg-8">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            {items.map((item) => (
                                <div key={item.id} className="row align-items-center border-bottom py-3">
                                    <div className="col-md-2">
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="img-fluid rounded"
                                                style={{ maxHeight: '80px', objectFit: 'cover' }}
                                            />
                                        ) : (
                                            <div 
                                                className="bg-light rounded d-flex align-items-center justify-content-center"
                                                style={{ height: '80px' }}
                                            >
                                                <i className="bi bi-image text-muted" style={{ fontSize: '2rem' }}></i>
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-md-4">
                                        <h5 className="mb-1">{item.name}</h5>
                                        <p className="text-muted mb-0">
                                            <small>Price: ${item.price}</small>
                                        </p>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="input-group" style={{ maxWidth: '140px' }}>
                                            <button 
                                                className="btn btn-outline-secondary"
                                                onClick={() => handleDecrement(item.id)}
                                            >
                                                <i className="bi bi-dash"></i>
                                            </button>
                                            <input 
                                                type="text" 
                                                className="form-control text-center" 
                                                value={item.quantity}
                                                readOnly
                                            />
                                            <button 
                                                className="btn btn-outline-secondary"
                                                onClick={() => handleIncrement(item)}
                                            >
                                                <i className="bi bi-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-md-2 text-end">
                                        <h5 className="text-primary mb-0">
                                            ${item.totalPrice.toFixed(2)}
                                        </h5>
                                    </div>
                                    <div className="col-md-1 text-end">
                                        <button 
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => {
                                                for (let i = 0; i < item.quantity; i++) {
                                                    dispatch(removeItem(item.id));
                                                }
                                            }}
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h4 className="card-title mb-4">Order Summary</h4>
                            
                            <div className="d-flex justify-content-between mb-2">
                                <span>Subtotal:</span>
                                <span>${totalAmount.toFixed(2)}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                                <span>Shipping:</span>
                                <span className="text-success">Free</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                                <span>Tax:</span>
                                <span>${(totalAmount * 0.1).toFixed(2)}</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between mb-4">
                                <strong>Total:</strong>
                                <strong className="text-primary">
                                    ${(totalAmount * 1.1).toFixed(2)}
                                </strong>
                            </div>
                            
                            <button className="btn btn-primary w-100 mb-2">
                                <i className="bi bi-credit-card me-2"></i>
                                Proceed to Checkout
                            </button>
                            <Link to="/products" className="btn btn-outline-secondary w-100">
                                <i className="bi bi-arrow-left me-2"></i>
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
