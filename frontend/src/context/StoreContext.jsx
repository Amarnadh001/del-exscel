import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = "https://del-exscel-backend8.onrender.com";
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);

    // Cart operations with error handling
    const addToCart = async (itemId) => {
        const newCart = { ...cartItems };
        newCart[itemId] = (newCart[itemId] || 0) + 1;
        setCartItems(newCart);
        
        if (token) {
            try {
                await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
            } catch (error) {
                console.error("Add to cart error:", error.response?.data);
            }
        }
    };

    const removeFromCart = async (itemId) => {
        const newCart = { ...cartItems };
        if (newCart[itemId] > 0) {
            newCart[itemId] -= 1;
            setCartItems(newCart);
            
            if (token) {
                try {
                    await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
                } catch (error) {
                    console.error("Remove from cart error:", error.response?.data);
                }
            }
        }
    };

    // Calculate total with null safety
    const getTotalCartAmount = () => {
        return food_list.reduce((total, item) => {
            const quantity = cartItems[item._id] || 0;
            return total + (item.price || 0) * quantity;
        }, 0);
    };

    // Data fetching functions
    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            setFoodList(response.data.data);
        } catch (error) {
            console.error("Food list fetch error:", error);
        }
    };

    const loadCartData = async (currentToken) => {
        try {
            const response = await axios.post(`${url}/api/cart/get`, {}, { 
                headers: { token: currentToken } 
            });
            setCartItems(response.data.cartData || {});
        } catch (error) {
            console.error("Cart load error:", error.response?.data);
            if (error.response?.status === 401) {
                handleInvalidToken();
            }
        }
    };

    // Token management
    const handleInvalidToken = () => {
        setToken("");
        localStorage.removeItem("token");
        setCartItems({});
    };

    // Effect hooks
    useEffect(() => {
        fetchFoodList();
    }, []);

    useEffect(() => {
        const initializeAuth = async () => {
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
                await loadCartData(storedToken);
            }
        };
        initializeAuth();
    }, []);

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
            loadCartData(token);
        }
    }, [token]);

    // Context value
    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        handleInvalidToken
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
