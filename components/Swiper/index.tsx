import type { Swiper as SwiperType } from 'swiper/types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import { useState } from 'react'
import { API_URL } from '@/utilities/constants'

interface ProductInterface {
    name: string,
    rating: number,
    price: number,
    images: string[]
}

const Preview = (product: ProductInterface) => {

    const [productImage, setProductImage] = useState<SwiperType | null>(null)

    return (
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
    )
}

export default Preview
