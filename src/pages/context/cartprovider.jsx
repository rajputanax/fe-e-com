// CONTEXT API IS GETTING USED HERE

import { createContext, useContext, useState, useEffect } from "react"
//-------------------------------------------------------------------------------------------------------------------------------------------
const cartContext = createContext()
const CartProvider = ({ children }) => {

    // .......................................................................................................................................
    // GET ITEMS FROM LOCAL STORAGE AND SET THEM TO CART STATE

    const [cart, setCart] = useState(() => {
        const stored = localStorage.getItem('cart')
        return stored ? JSON.parse(stored) : [];
    })


    // ADD ITEMS TO THE CART
    const addToCart = (product) => {
        console.log(product, '-product')
        setCart((prev) => {
            const IsExsist = prev.find((item) => item._id === product._id)
            if (IsExsist) {
                return prev.map((item) => item._id === product._id ? { ...item, qty: item.qty + 1 } : item)
            }

            return [...prev, { ...product, qty: 1 }];

        })

    }
    // SET ITEMS TO THE CART
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])
    // CLEAR ITEMS TO THE CART   
    const clearCart = () => {
        localStorage.removeItem("cart");
        setCart([]);
    };
    //  DELETE ITEM TO THE CART  
    const deleteItem = (id) => {
        console.log(id, 'delete')
        setCart((prev) => {
            return prev.filter((item) => item._id !== id)
        })

    }
    //  DELETE EVERY ITEM TO THE CART    
    const deleteAll = () => {
        setCart([])
    }


    // ....................................................................................................................................... 
    return (
        < cartContext.Provider value={{ cart, addToCart, deleteItem, deleteAll, setCart, clearCart }}>
            {children}
        </ cartContext.Provider>
    )
}
// custom hook 
export const useCartContext = () => {
    return useContext(cartContext)
}

export default CartProvider



