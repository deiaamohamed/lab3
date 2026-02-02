import { useState } from "react";
import { addNewProduct } from "../api/productApi";
import { useNavigate } from "react-router-dom";

export function AddProductForm() {
    const [product, setProduct] = useState({
        name: '',
        price: '',
        category: '',
        description: '',
        stock: '',
        rate: '',
        image: ''
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value,
        });

        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
            if (!validTypes.includes(file.type)) {
                setErrors({
                    ...errors,
                    image: 'Please upload a valid image (JPEG, PNG, GIF, or WebP)'
                });
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                setErrors({
                    ...errors,
                    image: 'Image size should not exceed 5MB'
                });
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    let width = img.width;
                    let height = img.height;
                    const maxSize = 800;

                    if (width > height) {
                        if (width > maxSize) {
                            height = (height * maxSize) / width;
                            width = maxSize;
                        }
                    } else {
                        if (height > maxSize) {
                            width = (width * maxSize) / height;
                            height = maxSize;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;

                    ctx.drawImage(img, 0, 0, width, height);
                    const compressedImage = canvas.toDataURL('image/jpeg', 0.7);

                    setImagePreview(compressedImage);
                    setProduct({
                        ...product,
                        image: compressedImage
                    });
                    setErrors({
                        ...errors,
                        image: ''
                    });
                };
                img.src = reader.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!product.name.trim()) {
            newErrors.name = 'Product name is required';
        } else if (product.name.length < 3) {
            newErrors.name = 'Product name must be at least 3 characters';
        }

        if (!product.price) {
            newErrors.price = 'Price is required';
        } else if (product.price <= 0) {
            newErrors.price = 'Price must be greater than 0';
        }

        if (!product.category) {
            newErrors.category = 'Please select a category';
        }

        if (!product.stock) {
            newErrors.stock = 'Stock quantity is required';
        } else if (product.stock < 0) {
            newErrors.stock = 'Stock cannot be negative';
        }

        if (!product.rate) {
            newErrors.rate = 'Rating is required';
        } else if (product.rate < 1 || product.rate > 5) {
            newErrors.rate = 'Rating must be between 1 and 5';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        addNewProduct(product).then(() => {
            setProduct({
                name: '',
                price: '',
                category: '',
                description: '',
                stock: '',
                rate: '',
                image: ''
            });
            setImagePreview(null);
            navigate("/products");
        }).catch(error => {
            console.log(error);
            setErrors({ submit: 'Failed to add product. Please try again.' });
        });
    };

    return (
        <div className="container mt-4">
            <div className="card shadow-sm" style={{
                maxWidth: '600px',
                margin: '0 auto',
                borderRadius: '15px',
                border: 'none'
            }}>
                <div className="card-body p-4">
                    <h3 className="text-center text-primary mb-4">➕ Add New Product</h3>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label fw-semibold">Product Name</label>
                            <input
                                type="text"
                                name="name"
                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                placeholder="Enter product name"
                                value={product.name}
                                onChange={handleChange}
                                style={{ borderRadius: '8px', padding: '10px' }}
                            />
                            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Price ($)</label>
                                <input
                                    type="number"
                                    name="price"
                                    className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                                    placeholder="0.00"
                                    step="0.01"
                                    min="0"
                                    value={product.price}
                                    onChange={handleChange}
                                    style={{ borderRadius: '8px', padding: '10px' }}
                                />
                                {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Stock</label>
                                <input
                                    type="number"
                                    name="stock"
                                    className={`form-control ${errors.stock ? 'is-invalid' : ''}`}
                                    placeholder="0"
                                    min="0"
                                    value={product.stock}
                                    onChange={handleChange}
                                    style={{ borderRadius: '8px', padding: '10px' }}
                                />
                                {errors.stock && <div className="invalid-feedback">{errors.stock}</div>}
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-semibold">Category</label>
                            <select
                                name="category"
                                className={`form-select ${errors.category ? 'is-invalid' : ''}`}
                                value={product.category}
                                onChange={handleChange}
                                style={{ borderRadius: '8px', padding: '10px' }}
                            >
                                <option value="">Select Category</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Books">Books</option>
                                <option value="Clothing">Clothing</option>
                                <option value="Furniture">Furniture</option>
                                <option value="Heavy Tank">Heavy Tank</option>
                                <option value="TD">TD</option>
                            </select>
                            {errors.category && <div className="invalid-feedback">{errors.category}</div>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-semibold">Description</label>
                            <textarea
                                name="description"
                                className="form-control"
                                rows="3"
                                placeholder="Enter product description"
                                value={product.description}
                                onChange={handleChange}
                                style={{ borderRadius: '8px', padding: '10px' }}
                            ></textarea>
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-semibold">Rating (1-5)</label>
                            <input
                                type="number"
                                name="rate"
                                className={`form-control ${errors.rate ? 'is-invalid' : ''}`}
                                placeholder="5"
                                min="1"
                                max="5"
                                step="0.1"
                                value={product.rate}
                                onChange={handleChange}
                                style={{ borderRadius: '8px', padding: '10px' }}
                            />
                            {errors.rate && <div className="invalid-feedback">{errors.rate}</div>}
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-semibold">Product Image</label>
                            <input
                                type="file"
                                name="imageFile"
                                className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{ borderRadius: '8px', padding: '10px' }}
                            />
                            {errors.image && <div className="invalid-feedback">{errors.image}</div>}
                            {imagePreview && (
                                <div className="mt-3 text-center">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        style={{
                                            maxWidth: '200px',
                                            maxHeight: '200px',
                                            borderRadius: '8px',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        {errors.submit && (
                            <div className="alert alert-danger" role="alert">
                                {errors.submit}
                            </div>
                        )}

                        <div className="d-grid">
                            <button
                                type="submit"
                                className="btn btn-primary btn-lg"
                                style={{
                                    borderRadius: '8px',
                                    padding: '12px',
                                    fontWeight: '600'
                                }}
                            >
                                Add Product
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
