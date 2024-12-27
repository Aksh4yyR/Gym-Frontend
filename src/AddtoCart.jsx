import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { viewCartAPI, editCartAPI, deleteCartAPI, addOrderAPI } from './services/allAPI';
import './App.css';
import Header from './HeadFoot/Header';
import { FaTrash } from 'react-icons/fa'; // Font Awesome Trash Icon
import { deleteFullCart } from './services/allAPI';
const AddtoCart = () => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate(); // Initialize useNavigate

    // Fetch cart items
    const fetchCart = async () => {
        try {
            const token = sessionStorage.getItem('token');
            const reqHeader = { Authorization: `Bearer ${token}` };
            const response = await viewCartAPI(reqHeader);
    
            if (response) {
                const validCart = response.data.cart.filter(item => item?.product && item.product.price);
                setCart(validCart);
                calculateTotal(validCart);
            } else {
                setCart([]);
                setTotalPrice(0);
            }
        } catch (err) {
            console.error('Error fetching cart:', err);
            setError('Failed to fetch cart. Please try again later.');
        } finally {
            setLoading(false);
        }
    };
    

    // Calculate total price
    const calculateTotal = (cartItems) => {
        const total = cartItems.reduce((acc, item) => {
            if (item?.product && item.product.price) {
                return acc + item.product.price * item.quantity;
            }
            return acc; // Skip items with invalid product data
        }, 0);
        setTotalPrice(total.toFixed(2));
    };

    // Update quantity
    const updateQuantity = async (productId, newQuantity) => {
        if (newQuantity < 1) return; // Prevent invalid quantities

        try {
            const token = sessionStorage.getItem('token');
            const reqHeader = { Authorization: `Bearer ${token}` };
            const reqBody = { productId, quantity: newQuantity };
            const response = await editCartAPI(reqHeader, productId, reqBody);

            if (response.status === 200) {
                fetchCart();
            } else {
                setError('Failed to update cart. Please try again.');
            }
        } catch (err) {
            console.error('Error updating cart:', err);
            setError('Failed to update cart. Please try again later.');
        }
    };

    // Delete cart item
    const handleDelete = async (productId) => {
        try {
            const token = sessionStorage.getItem('token');
            const reqHeader = { Authorization: `Bearer ${token}` };
            const response = await deleteCartAPI(reqHeader, productId);

            if (response.status === 200) {
                fetchCart();
            } else {
                setError('Failed to remove product from cart. Please try again.');
            }
        } catch (err) {
            console.error('Error deleting product:', err);
            setError('Failed to remove product from cart. Please try again later.');
        }
    };

    // Place order
    const handlePlaceOrder = async () => {
        try {
            const token = sessionStorage.getItem('token');
            const reqHeader = { Authorization: `Bearer ${token}` };
            const orderProducts = cart.map((item) => ({
                productId: item.product._id,
                quantity: item.quantity,
            }));
    
            // Place the order
            const response = await addOrderAPI(reqHeader, { products: orderProducts });
    
            if (response.status === 201) {
                alert('Order placed successfully');
                
                // Clear the cart after successful order
                const userId = sessionStorage.getItem('user_id');  // Ensure this is correctly set
                await deleteFullCart(reqHeader, { userId });
    
                setCart([]); // Reset the cart state
                navigate('/order-success'); // Redirect to order success page
            } else {
                setError(response.message || 'Failed to place order. Please try again.');
            }
        } catch (err) {
            console.error('Error placing order:', err);
            setError('Failed to place order. Please try again later.');
        }
    };
    

    useEffect(() => {
        fetchCart();
    }, []);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <>
            <Header />
            <div className="cart-container">
                <h2 className="fw-bolder">Your Cart</h2>
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item) => (
                                <tr key={item?.product?._id}>
                                    <td>
                                        <img
                                            src={`http://localhost:3000/uploads/${item?.product?.image}`}
                                            alt={item?.product?.name}
                                            className="cart-item-image"
                                        />
                                        <span>{item?.product?.name}</span>
                                    </td>
                                    <td>
                                        <button
                                            className="quantity-btn"
                                            onClick={() => updateQuantity(item?.product?._id, item?.quantity - 1)}>
                                            -
                                        </button>
                                        <span className="quantity">{item?.quantity}</span>
                                        <button
                                            className="quantity-btn"
                                            onClick={() => updateQuantity(item?.product?._id, item?.quantity + 1)}>
                                            +
                                        </button>
                                    </td>
                                    <td> ₹{item?.product?.price}</td>
                                    <td>
                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDelete(item?.product?._id)}>
                                            <FaTrash className="delete-icon" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <div className="order-summary">
                    <span className="total-price">Total:  ₹{totalPrice}</span>
                    <button className="place-order-btn" onClick={handlePlaceOrder}>
                        Place Order
                    </button>
                </div>
            </div>
        </>
    );
};

export default AddtoCart;
