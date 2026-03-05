'use client'

import { Rating } from '@mui/material'
import { FaStar } from 'react-icons/fa'
import { BsHeart, BsHeartFill } from 'react-icons/bs'
import Link from 'next/link'
import formatCurrency from '@/utilities/formatCurrency'
import { useShoppingCart } from '@/hooks/useShoppingCart'
import { useFavourites } from '@/hooks/useFavourites'
import { API_URL } from '@/utilities/constants'

const ProductCard = ({ id, name, price, rating, fav, images }: { id: string, name: string, price: number, rating: number, fav: boolean, images: string[] }) => {

    const { increaseCartQuantity } = useShoppingCart()
    const { toggleFav } = useFavourites()
    return (
        <div className="product">
            <div
                className="wish"
                style={{ opacity: fav ? 1 : undefined }}
            >
                <button onClick={() => toggleFav(id)}>
                    {fav ? (
                        <BsHeartFill
                            style={{ fill: fav ? '#F63528' : undefined }}
                        />
                    ) : (
                        <BsHeart />
                    )}
                </button>
            </div>
            <Link href={`/products/${id}`} className="image">
                {images && (<img src={`${API_URL}${images[0]}`} alt="Product" />)}
            </Link>
            <div className="contents">
                <Link href={`/products/${id}`} className="desc">
                    <span>
                        {name}
                    </span>
                </Link>
                <div className="more">
                    <Rating
                        className="ratings"
                        defaultValue={Math.round(rating)}
                        precision={0.5}
                        icon={<FaStar className='icon selected' />}
                        emptyIcon={<FaStar className='icon unselected' />}
                        readOnly
                    />
                    <span className="price">{formatCurrency(price)}</span>
                    <button className="buy" onClick={() => increaseCartQuantity(id, price)}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
