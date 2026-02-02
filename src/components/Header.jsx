import { Container, Nav, Navbar, Badge } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);

    return (
        <Navbar bg="light" data-bs-theme="light">
            <Container>
                <Navbar.Brand href="#home">Shop</Navbar.Brand>
                <Nav className="ms-auto">
                    <NavLink className={({ isActive }) => isActive ? 'nav-link text-danger ' : 'nav-link'} to="/">Home</NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'nav-link text-danger ' : 'nav-link'} to="/products">Products</NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'nav-link text-danger position-relative' : 'nav-link position-relative'} to="/cart">
                        <i className="bi bi-cart3"></i> Cart
                        {totalQuantity > 0 && (
                            <Badge 
                                bg="danger" 
                                pill 
                                className="position-absolute top-0 start-100 translate-middle"
                                style={{ fontSize: '0.7rem' }}
                            >
                                {totalQuantity}
                            </Badge>
                        )}
                    </NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'nav-link text-danger ' : 'nav-link'} to="/login">Login</NavLink>
                </Nav>
            </Container>
        </Navbar>
    )
}
