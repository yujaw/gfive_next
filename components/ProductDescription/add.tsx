'use client'

import { Fragment, useState, useRef } from 'react'
import { FaStar } from 'react-icons/fa'
import { Rating } from '@mui/material'
import axios from '@/api/axios'
import { useToast } from '@/hooks/useToast'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'

const UPLOAD_URI = '/reviews'

const Add = ({ setReviews, setAdd, id }: { setReviews: (reviews: any) => void, setAdd: (add: boolean) => void, id: string }) => {
    const imageRef = useRef<HTMLInputElement>(null)
    const axiosPrivate = useAxiosPrivate()
    const { successNotification, errorNotification } = useToast()

    const [custreview, setCustreview] = useState<Review>({
        rating: 0,
        images: [],
        comment: ''
    })

    const setRating = (value: number) => {
        setCustreview(prev => ({ ...prev, rating: value }))
    }

    const setComment = (value: string) => {
        setCustreview(prev => ({ ...prev, comment: value }))
    }

    interface Review {
        rating: number
        images: File[]
        comment: string
    }

    type ImageUpdater = (prev: File[]) => File[]

    const setImages = (updater: ImageUpdater | File[]): void => {
        setCustreview(prev => ({
            ...prev,
            images: typeof updater === 'function'
                ? (updater as ImageUpdater)(prev.images)
                : updater
        }))
    }

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number): void => {
        e.dataTransfer.setData('text/plain', String(index))
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
        e.preventDefault()
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetIndex: number): void => {
        e.preventDefault()

        // Handle file drop
        const files = e.dataTransfer.files
        if (files && files.length > 0) {
            handleFileSelection(files)
            return
        }

        // Handle reordering
        const draggedIndex = Number(e.dataTransfer.getData('text/plain'))
        if (!isNaN(draggedIndex)) {
            setImages(prev => {
                const updated = [...prev]
                const [dragged] = updated.splice(draggedIndex, 1)
                updated.splice(targetIndex, 0, dragged)
                return updated
            })
        }
    }

    const handleFileSelection = (files: FileList): void => {
        const allowedTypes: string[] = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
        const maxSize: number = 2 * 1024 * 1024 // 2MB

        const validFiles: File[] = Array.from(files).filter((file: File) => {
            if (!allowedTypes.includes(file.type)) {
                errorNotification(`${file.name} is not a valid image type`)
                return false
            }
            if (file.size > maxSize) {
                errorNotification(`${file.name} exceeds 2MB limit`)
                return false
            }
            return true
        })

        if (validFiles.length > 0) {
            setImages(prev => [...prev, ...validFiles])
        }
    }

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const files = e.target.files
        if (files && files.length > 0) {
            handleFileSelection(files)
        }
        // Reset input to allow selecting the same file again
        e.target.value = ''
    }

    const removeImage = (index: number): void => {
        setImages((prev: File[]) => prev.filter((_: File, i: number) => i !== index))
    }

    const submitData = async () => {
        try {
            // Validation
            if (!custreview.rating) {
                errorNotification('Please provide a rating')
                return
            }
            if (!custreview.comment.trim()) {
                errorNotification('Please provide a comment')
                return
            }

            const formData = new FormData()
            formData.append('product_id', id)
            formData.append('comment', custreview.comment)
            formData.append('rate', String(custreview.rating))

            // Append each image file
            custreview.images.forEach((file) => {
                formData.append('images', file)
            })

            await axiosPrivate.post(UPLOAD_URI, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            // Reset form
            setCustreview({
                rating: 0,
                images: [],
                comment: ''
            })

            setAdd(false)
            successNotification('Review submitted successfully')

            // Refresh reviews
            const res = await axios.get(`${UPLOAD_URI}?product_id=${id}`)
            setReviews(res.data)

        } catch (err: any) {
            console.error('Submit error:', err)
            errorNotification(err?.response?.data?.message || 'Failed to submit review')
        }
    }

    return (
        <Fragment>
            <div className="review-overlay" onClick={() => setAdd(false)} />
            <div className="review-wrapper">
                <div className="rev_navbar">
                    <div className="title">
                        Add Product Review
                    </div>
                </div>
                <div className="container">
                    <div className="input rating">
                        <Rating
                            className="ratings"
                            defaultValue={0}
                            value={custreview.rating}
                            onChange={(e, newRating) => {
                                setRating(newRating ?? 0)
                            }}
                            icon={<FaStar className='icon selected' />}
                            emptyIcon={<FaStar className='icon unselected' />}
                        />
                    </div>
                    <div className="input comment">
                        <textarea name="comment" placeholder='Write your review...' value={custreview.comment} onChange={(e) => setComment(e.target.value)}></textarea>
                    </div>
                    <div className="input file">
                        <input
                            type="file"
                            accept='image/jpeg,image/jpg,image/png,image/gif,image/webp'
                            multiple
                            hidden
                            ref={imageRef}
                            onChange={handleFileInputChange}
                        />
                        {
                            custreview?.images?.length > 0 && (
                                <div className="image_list" onDragOver={handleDragOver}>
                                    <Fragment>
                                        {
                                            custreview?.images?.map((file, index) => (
                                                <div
                                                    key={index}
                                                    className={`image-container-a`}
                                                    draggable
                                                    onDragStart={(e) => handleDragStart(e, index)}
                                                    onDrop={(e) => handleDrop(e, index)}
                                                >
                                                    <img
                                                        width={200}
                                                        src={URL.createObjectURL(file)}
                                                        alt={`Preview ${index}`}
                                                    />
                                                    <button className="remove" onClick={() => removeImage(index)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
                                                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            ))
                                        }
                                        <button onClick={() => imageRef.current?.click()}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="1rem">
                                                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                                            </svg>
                                        </button>
                                    </Fragment>
                                </div>
                            )}
                        {
                            !(custreview?.images?.length > 0) && (
                                <Fragment>
                                    <div className="image_upload">
                                        <div
                                            className="input_area"
                                            onDragOver={handleDragOver}
                                            onDrop={(e) => handleDrop(e, custreview.images.length)}
                                        >
                                            <div className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                                    <path d="M288 109.3V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V109.3l-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352H192c0 35.3 28.7 64 64 64s64-28.7 64-64H448c35.3 0 64 28.7 64 64v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V416c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
                                                </svg>
                                            </div>
                                            <div className="msg">Drag & drop images here</div>
                                            <div className="sub">
                                                or <button onClick={() => imageRef.current?.click()}>browse images</button> from device
                                            </div>
                                        </div>
                                    </div>
                                </Fragment>
                            )
                        }
                    </div>
                    <div className="input submit">
                        <button className="submit_btn" onClick={submitData}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Add
