import { Fragment, useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { Rating } from '@mui/material'
import axios from '../../api/axios'
import { useAuth } from '../../hooks/useAuth'
import Edit from './edit'
import Add from './add'

const UPLOAD_URI = '/reviews'

const Description = ({ id }: { id: string }) => {
    const [isSelected, setSelected] = useState<number>()
    const [reviews, setReviews] = useState<Review[]>([])
    const [add, setAdd] = useState(false)
    const [edit, setEdit] = useState(false);
    const [selectedReview, setSelectedReview] = useState<Review>();

    interface Review {
        id: string;
        rating: string;
        comment: string;
        user_id: string;
        firstname?: string;
        lastname?: string;
        createdat: string;
        images?: string[];
    }

    const openEdit = (review: Review): void => {
        setSelectedReview(review);
        setEdit(true);
    };

    const { auth } = useAuth()

    useEffect(() => {
        setSelected(0)
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${UPLOAD_URI}?product_id=${id}`)
                setReviews(res.data)
            } catch (err: any) {
                if (err.status !== 404) {
                    console.log(err.message)
                }
            }
        }
        fetchData()
    }, [id, add, edit])

    return (
        <Fragment>
            <div className="description-wrapper">
                <div className="description">
                    <div className="desc-nav">
                        <button onClick={() => setSelected(0)} className={`item ${isSelected === 0 ? 'selected' : ''}`}>
                            <span>Specification</span>
                        </button>
                        <button onClick={() => setSelected(1)} className={`item ${isSelected === 1 ? 'selected' : ''}`}>
                            <span>Description</span>
                        </button>
                        <button onClick={() => setSelected(2)} className={`item ${isSelected === 2 ? 'selected' : ''}`}>
                            <span>Reviews</span>
                        </button>
                    </div>
                    {
                        isSelected === 0
                            ? (
                                <div className="spec-container">
                                    <div className="content">
                                        <div className="item">
                                            6.1-inch Super Retina XDR display
                                        </div>
                                        <div className="item">
                                            A14 Bionic chip processor
                                        </div>
                                        <div className="item">
                                            5G mmWave and sub-6GHz
                                        </div>
                                        <div className="item">
                                            Ceramic Shield protection with four times better drop performance
                                        </div>
                                        <div className="item">
                                            OLED Super Retina XDR
                                        </div>
                                        <div className="item">
                                            Dual camera (12MP) with an f2.4 ultra wide and  f1.6 wide, Night Mode available on all cameras and night time lapse
                                        </div>
                                        <div className="item">
                                            Wireless charging
                                        </div>
                                        <div className="item">
                                            6.1-inch Super Retina XDR display
                                        </div>
                                    </div>
                                </div>
                            ) : null
                    }
                    {
                        isSelected === 1
                            ? (
                                <div className="desc-container">
                                    <div className="content">
                                        Brand new factory-sealed Apple M2 MacBook Air 2022 13.6" Retina Display with LED Backlight, Second-generation Apple M2 Chip, Octa-core (8-core) CPU, 10-core GPU, 16-core Neural Engine, 8GB unified Memory, 512GB SSD Storage, Stereo speakers, FacTime HD Camera, Backlit Keyboard, Up to 18 hours of battery life, 0.63-inch, 1.29KG Weight, Comes with 1-year warranty
                                    </div>
                                </div>
                            ) : null
                    }
                    {isSelected === 2 ? (
                        <div className="review-container">
                            {add && <Add setAdd={setAdd} setReviews={setReviews} id={id} />}

                            <div className="content">
                                {auth?.username && (
                                    <div className="utils">
                                        <button className="add_btn" onClick={() => setAdd(!add)}>
                                            <span>Add Review</span>
                                        </button>
                                    </div>
                                )}

                                <div className="rating-container">
                                    {reviews?.length > 0 ? (
                                        reviews.map((item) => (
                                            <div className="item" key={item.id}>
                                                <div className="desc">
                                                    <div className="title">
                                                        <Rating
                                                            className="ratings"
                                                            value={parseInt(item.rating)}
                                                            precision={0.5}
                                                            icon={<FaStar className='icon selected' />}
                                                            emptyIcon={<FaStar className='icon unselected' />}
                                                            readOnly
                                                        />
                                                        {auth?.username === item?.user_id && (
                                                            <div className="edit">
                                                                {/* Open edit for THIS specific review */}
                                                                <button className='edit' onClick={() => openEdit(item)}>
                                                                    edit
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="cont">{item?.comment}</div>
                                                </div>

                                                {item.images && item.images.length > 0 && (
                                                    <div className="image-container">
                                                        {item.images.map((img, index) => (
                                                            <img key={index} src={`http://localhost:4000${img}`} alt="review" />
                                                        ))}
                                                    </div>
                                                )}

                                                <div className="rev-footer">
                                                    <div className="name">
                                                        {item?.firstname && item?.lastname
                                                            ? `${item.firstname} ${item.lastname}`
                                                            : item?.user_id}
                                                    </div>
                                                    <span>{new Date(item?.createdat).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <Fragment>
                                            <h1>No Reviews Found</h1>
                                        </Fragment>
                                    )}
                                </div>
                            </div>

                            {/* Single Edit modal – outside the loop */}
                            {edit && selectedReview && (
                                <Edit
                                    setEdit={setEdit}
                                    setReviews={setReviews}
                                    id={selectedReview.id}
                                    product_id={id} // ← use the product id here
                                    comment={selectedReview.comment}
                                    rating={parseInt(selectedReview.rating)}
                                    images={selectedReview.images || []}
                                />
                            )}
                        </div>
                    ) : null}
                </div>
            </div>
        </Fragment>
    )
}

export default Description