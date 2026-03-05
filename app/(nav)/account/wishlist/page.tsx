'use client'

import { Fragment, useState, useEffect } from 'react'
import { useFavourites } from '@/hooks/useFavourites'
import { useShoppingCart } from '@/hooks/useShoppingCart'
import axios from '@/api/axios'
import { API_URL } from '@/utilities/constants'

interface Item {
    id: string,
    images: string[],
    name: string,
    price: number
}

const Product = ({ id }: { id: string }) => {

    const { toggleFav } = useFavourites()
    const { increaseCartQuantity } = useShoppingCart()

    const [item, setItem] = useState<Item | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.get(`/api/products/${id}`)
                    .then((res) => {
                        setItem(res.data)
                        setIsLoading(false)
                    })
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [id])

    return (

        <div className='wish-wrapper' key={item?.id}>
            {
                isLoading ? (
                    <div className='wish_container'>
                        <div className="img_container skeleton">

                        </div>
                        <div className="desc">
                            <div className="title">
                                <div className="skeleton skeleton-title"></div>
                                <div className="skeleton skeleton-text"></div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='wish_container'>
                        <div className="img_container">
                            <img src={`${API_URL}${item?.images[0]}`} alt='product' />
                        </div>
                        <div className="desc">
                            <div className="title">{item?.name}</div>
                            <div className="buttons">
                                <button onClick={() => increaseCartQuantity(item?.id || '', item?.price || 0)} className="btn primary">Add to Cart</button>
                                <button onClick={() => toggleFav(item?.id || '')} className="btn secondary">Remove from List</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

const Wish = () => {
    const { favItems } = useFavourites()

    return (
        <Fragment>
            <div className='account-desc'>
                <div className='title header'>
                    <div className="utils">
                        <div className="ico" />
                        <div className="ico" />
                        <div className="ico" />
                    </div>
                    Wishlist
                </div>
                <div className='container wish_cont'>
                    {
                        favItems?.length > 0 ?
                            favItems.map((items, index) => (
                                <Product key={items} id={items} />
                            ))
                            : (
                                <div className="empty">
                                    <span>Wishlist is Empty</span>
                                </div>
                            )
                    }
                </div>
            </div>
        </Fragment >
    )
}

export default Wish