'use client'

import { Fragment, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, A11y } from 'swiper/modules'
import { useFavourites } from '@/hooks/useFavourites'
import Link from 'next/link'
import { useEffect } from 'react'
import axios from '@/api/axios'
import 'swiper/css/pagination'
import 'swiper/css'
import ProductCard from '@/components/ProductCard'
import { API_URL } from '@/utilities/constants'
import { useRouter } from 'next/navigation'

const Home = () => {

    interface ProductInterface {
        id: string,
        name: string,
        price: number,
        rating: number,
        fav: Object,
        images: string[],
        featured: boolean
    }

    const [product, setProduct] = useState<ProductInterface[]>([])
    const [ad, setAd] = useState<ProductInterface | null>(null)

    const { favItems } = useFavourites()
    const router = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios
                    .get('/api/products')
                    .then((res) => {
                        setProduct(res.data.data)
                        setAd(res.data.data[2])
                    })
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])

    return (
        <Fragment>
            <div className='offers'>
                <div className='back'>
                    <div className="filter">
                        <span>
                            G-Five
                        </span>
                    </div>
                </div>
            </div>
            <div className='features'>
                <Link href={'/products'} className='category'>
                    <div className='img_container'>
                        <img src='/images/microchip-solid.svg' alt='Category' />
                    </div>
                    <div className='desc'><span>Components</span></div>
                </Link>
                <Link href={'/products'} className='category'>
                    <div className='img_container'>
                        <img src='/images/laptop-solid.svg' alt='Category' />
                    </div>
                    <div className='desc'><span>Laptops</span></div>
                </Link>
                <Link href={'/products'} className='category'>
                    <div className='img_container'>
                        <img src='/images/headphones-simple-solid.svg' alt='Category' />
                    </div>
                    <div className='desc'><span>Accessories</span></div>
                </Link>
                <Link href={'/products'} className='category'>
                    <div className='img_container'>
                        <img src='/images/computer-solid.svg' alt='Category' />
                    </div>
                    <div className='desc'><span>Desktops</span></div>
                </Link>
            </div>
            {
                product?.length > 0 && (
                    <div className='store_banner'>
                        <div className='store'>
                            <div className='title'>Featured Products</div>
                            <div className='product_swiper product-swiper-one'>
                                <Swiper
                                    className='swiper-wrapper'
                                    breakpoints={{
                                        100: {
                                            slidesPerView: 2,
                                            slidesPerGroup: 1,
                                            spaceBetween: 20,
                                            centeredSlides: true
                                        }, 768: {
                                            slidesPerView: 4,
                                            slidesPerGroup: 4,
                                            spaceBetween: 40
                                        }
                                    }}
                                    modules={[Pagination, A11y]}
                                    direction='horizontal'
                                    speed={400}
                                    loop={false}
                                    slidesPerView={4}
                                    slidesPerGroup={4}
                                    spaceBetween={40}

                                    pagination={
                                        {
                                            el: '.swiper-pagination-one',
                                            type: 'bullets',
                                            clickable: true,
                                            dynamicBullets: true,
                                            dynamicMainBullets: 3,
                                        }
                                    }

                                >
                                    {
                                        product.map(item => (
                                            item?.featured ? (
                                                <SwiperSlide className='swiper-slide' key={item.id}>
                                                    {
                                                        favItems.find(items => items === item.id) ?
                                                            <ProductCard {...item} fav={true} /> :
                                                            <ProductCard {...item} fav={false} />
                                                    }
                                                </SwiperSlide>
                                            ) : null
                                        ))
                                    }
                                </Swiper>
                                <div className='swiper-pagination swiper-pagination-one'></div>
                            </div>
                        </div>
                    </div>
                )
            }

            {
                ad?.id && (
                    <div className='ad-container'>
                        <div className='ad'>
                            <div className='left'>
                                <div className='title'>{ad?.name}</div>
                                <div className='desc'>The iPhone 15 Pro Max: Exceptional performance, stunning camera capabilities, immersive display, and innovative features redefine smartphone excellence.</div>
                                <button className='btn' onClick={() => router.push(`/products/${ad?.id}`)}>View</button>
                            </div>
                            <div className='right'>
                                <img src={`${API_URL}${ad?.images[0]}`} alt='ad' />
                            </div>
                        </div>
                    </div>
                )
            }
            {
                product?.length > 0 && (
                    <div className='store_banner'>
                        <div className='store'>
                            <span className='title'>Best Selling Products</span>
                            <div className='product_swiper product-swiper-two'>
                                <Swiper
                                    className='swiper-wrapper'
                                    breakpoints={{
                                        100: {
                                            slidesPerView: 2,
                                            slidesPerGroup: 1,
                                            spaceBetween: 20,
                                            centeredSlides: true
                                        }, 768: {
                                            slidesPerView: 4,
                                            slidesPerGroup: 4,
                                            spaceBetween: 40
                                        }
                                    }}
                                    modules={[Pagination, A11y]}
                                    // mousewheel={true}
                                    direction='horizontal'
                                    speed={400}
                                    loop={false}
                                    slidesPerView={4}
                                    slidesPerGroup={4}
                                    spaceBetween={40}

                                    pagination={
                                        {
                                            el: '.swiper-pagination-two',
                                            type: 'bullets',
                                            clickable: true,
                                            dynamicBullets: true,
                                            dynamicMainBullets: 3,
                                        }
                                    }
                                >
                                    {
                                        product.map(item => (
                                            <SwiperSlide className='swiper-slide' key={item.id}>
                                                {
                                                    favItems.find(items => items === item.id) ?
                                                        <ProductCard {...item} fav={true} /> :
                                                        <ProductCard {...item} fav={false} />
                                                }
                                            </SwiperSlide>
                                        ))
                                    }
                                </Swiper>
                                <div className='swiper-pagination swiper-pagination-two'></div>
                            </div>
                        </div>
                    </div>
                )
            }
        </Fragment>
    )
}

export default Home