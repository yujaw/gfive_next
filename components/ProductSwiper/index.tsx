import { Fragment, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper/types'
import { API_URL } from '@/utilities/constants'

const ProductSwiper = ({ images }: { images: string[] }) => {
    const [productImage, setProductImage] = useState<SwiperType | null>(null)

    return (
        <Fragment>
            <div className='preview'>
                <Swiper
                    loop={images?.length > 0}
                    spaceBetween={10}
                    direction='vertical'
                    thumbs={{ swiper: productImage && !productImage.destroyed ? productImage : null }}
                    modules={[FreeMode, Thumbs, Navigation]}
                    className="product-image-swiper"
                >
                    {images?.map((src) => (
                        <SwiperSlide key={src}>
                            <img src={`${API_URL}${src}`} alt="product_img" />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="swiper-nav">
                    <Swiper
                        onSwiper={(swiper) => setProductImage(swiper)}
                        direction='vertical'
                        spaceBetween={10}
                        slidesPerView={3.5}
                        freeMode={true}
                        loop={false}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="product-image-thumb-swiper"
                    >
                        {images?.map((src) => (
                            <SwiperSlide key={src}>
                                <div className="pane">
                                    <img src={`${API_URL}${src}`} alt="thumb_product_img" />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </Fragment>
    )
}

export default ProductSwiper
