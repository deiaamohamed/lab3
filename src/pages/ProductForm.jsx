import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { addNewProduct, editProduct, getProductById } from "../api/productApi";
import { useNavigate, useParams } from "react-router-dom";

export function ProductForm() {
    const [product, setProduct] = useState({
        name: '',
        price: '',
        category: '',
        description: '',
        stock: '',
        rate: '',
        image: ''
    })

    const [imagePreview, setImagePreview] = useState(null);

    const navigate = useNavigate();
    const { id } = useParams()


    useEffect(() => {
        if (id != 0) {
            getProductById(id).then(response => {
                setProduct(response.data)
                if (response.data.image) {
                    setImagePreview(response.data.image)
                }
            }).catch(console.log)
        }
    }, [])

    const getProductValue = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
        })
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
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
                };
                img.src = reader.result;
            };
            reader.readAsDataURL(file);
        }
    }

    const productHandler = (e) => {
        e.preventDefault()
        if (id == 0) {
            addNewProduct(product).then(() => {
                navigate("/products")
            }).catch(() => { })
        } else {
            editProduct(id, product).then(() => {
                navigate("/products")
            }).catch(() => { })
        }

    }

    return (
        <div className="mt-5 container">
            <h1 className="text-center text-muted mb-4">Product Form</h1>
            <Form onSubmit={productHandler}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control name="name" onChange={getProductValue} value={product.name} type="text" placeholder="Enter Product Price" />
                    <Form.Text className="text-danger">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Product Price</Form.Label>
                    <Form.Control onChange={getProductValue} name="price" value={product.price} type="number" placeholder="Enter Product Price" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCategory">
                    <Form.Label>Category</Form.Label>
                    <Form.Select aria-label="Default select example" name="category" onChange={getProductValue} value={product.category}>
                        <option>Select Category</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Books">Books</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Heavy Tank">Heavy Tank</option>
                        <option value="TD">TD</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} onChange={getProductValue} name="description" value={product.description} placeholder="Enter Product Description" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicStock">
                    <Form.Label>Stock Quantity</Form.Label>
                    <Form.Control onChange={getProductValue} name="stock" value={product.stock} type="number" placeholder="Enter Stock Quantity" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicRate">
                    <Form.Label>Rate (1-5)</Form.Label>
                    <Form.Control onChange={getProductValue} name="rate" value={product.rate} type="number" min="0" max="5" placeholder="Enter Product Rate" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicImage">
                    <Form.Label>Product Image</Form.Label>
                    <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
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
                </Form.Group>

                <Button variant="dark" type="submit">
                    {id == 0 ? "Add New Product" : "Edit Product"}
                </Button>
            </Form>
        </div>
    )
}



