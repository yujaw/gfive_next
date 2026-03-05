'use client'

import { Fragment, useState, useEffect } from 'react'
import { Rating } from '@mui/material'
import { FaStar } from 'react-icons/fa'
import { useShoppingCart } from '@/hooks/useShoppingCart'
import { useFavourites } from '@/hooks/useFavourites'
import { BsHeart, BsHeartFill } from 'react-icons/bs'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper/types'
import axios from '@/api/axios'
import Description from '@/components/ProductDescription'
import { API_URL } from '@/utilities/constants'
import formatCurrency from '@/utilities/formatCurrency'
import { useParams } from 'next/navigation'

interface ProductInterface {
    name: string,
    rating: number,
    price: number,
    images: string[]
}

const Product = async () => {

    const { increaseCartQuantity } = useShoppingCart()
    const { productId }: { productId: string } = useParams()
    const { toggleFav, favItems } = useFavourites()

    const [productImage, setProductImage] = useState<SwiperType | null>(null)

    const res = await axios.get(`/api/products/${productId}`)
    const product = res.data

    if (!product) return null

    return (
        <Fragment>
            <div className='product-page-container'>
                <div className='product'>
                    <div className='preview'>
                        {product && (
                            <Swiper
                                loop={true}
                                spaceBetween={10}
                                direction='vertical'
                                thumbs={{ swiper: productImage && !productImage.destroyed ? productImage : null }}
                                modules={[FreeMode, Thumbs, Navigation]}
                                className="product-image-swiper"
                                observer={false}
                                observeParents={false}
                            >
                                {product?.images?.map((src: string) => (
                                    <SwiperSlide key={src}>
                                        <img src={`${API_URL}${src}`} alt="product_img" />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )}
                        <div className="swiper-nav">
                            {product && (
                                <Swiper
                                    onSwiper={(swiper) => setProductImage(swiper)}
                                    direction='vertical'
                                    spaceBetween={10}
                                    slidesPerView={3.5}
                                    freeMode={true}
                                    watchSlidesProgress={true}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className="product-image-thumb-swiper"
                                    observer={false}
                                    observeParents={false}
                                >
                                    {product?.images?.map((src: string) => (
                                        <SwiperSlide key={src}>
                                            <div className="pane">
                                                <img src={`${API_URL}${src}`} alt="thumb_product_img" />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            )}
                        </div>
                    </div>
                    <div className='desc'>
                        <div className='title'>{product?.name}</div>
                        <div className='info'>
                            <div className='rating-container'>
                                <Rating
                                    className="ratings"
                                    defaultValue={product?.rating}
                                    value={Math.round(product?.rating)}
                                    precision={0.5}
                                    icon={<FaStar className='icon selected' />}
                                    emptyIcon={<FaStar className='icon unselected' />}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className='price'>{formatCurrency(product?.price)}</div>
                        <div className='checkouts'>
                            <button type='submit' className='buy primary' onClick={() => increaseCartQuantity(productId, product?.price)}>
                                Add to Cart
                            </button>
                            <button className='wish' onClick={() => toggleFav(productId)}>
                                {favItems.find(items => items === productId)
                                    ? <BsHeartFill style={{ fill: '#F63528' }} />
                                    : <BsHeart />
                                }
                            </button>
                        </div>
                    </div>
                </div>
                <Description productId={productId} />
            </div>
        </Fragment>
    )
}

export default Product