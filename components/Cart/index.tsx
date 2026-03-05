'use client'

import React, { Fragment, ReactHTMLElement, useEffect } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CartProduct from './product'
import { useShoppingCart } from '../../hooks/useShoppingCart'
import formatCurrency from '@/utilities/formatCurrency'

const Cart = () => {
    const { closeCart, isOpen, cartItems, cartQuantity, clearCart } = useShoppingCart()

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'scroll'
    }, [isOpen])

    useEffect(() => {
        let handler = (e: MouseEvent) => {
            if ((e.target as HTMLElement).className === 'cart-overlay') {
                closeCart()
            }
        }

        document.addEventListener("click", handler)
    }, [closeCart])

    return (
        isOpen ? (
            <Fragment>
                <div className='cart-overlay'>
                    <div className='product-cart'>
                        <Card className='cart-container'>
                            <CardContent className='cart-wrapper'>
                                <nav className='cart_nav'>
                                    <div className='topic'>Cart</div>
                                    <button className='remove_btn' onClick={clearCart}>Remove all</button>
                                </nav>
                                {cartQuantity ?
                                    <div className='contents'>
                                        {
                                            cartItems.map(item => (
                                                <CartProduct key={item.id} {...item} />
                                            ))
                                        }
                                    </div> :
                                    <div className='contents-errno'>
                                        <span>
                                            No Items in Cart
                                        </span>
                                    </div>
                                }
                                <footer className='cart_footer'>
                                    <div className='foot'>
                                        <div className='info'>
                                            <div className='left'>
                                                <div className='cont'>Sub-Total</div>
                                                <div className='sub_cont'>{cartQuantity} items</div>
                                            </div>
                                            <div className='right'>
                                                <div className='amount'>
                                                    {
                                                        formatCurrency(
                                                            cartItems.reduce((total, item) => {
                                                                return total + (item?.price || 0) * item?.quantity
                                                            }, 0)
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <button className='checkout'>Checkout</button>
                                    </div>
                                </footer>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </Fragment>
        ) : null
    )
}

export default Cart