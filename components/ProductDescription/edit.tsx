import { Fragment, useEffect, useState, useRef, Dispatch } from 'react';
import { FaStar } from 'react-icons/fa';
import { Rating } from '@mui/material';
import axios from '@/api/axios';
import { useToast } from '@/hooks/useToast';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { API_URL } from '@/utilities/constants';

const UPLOAD_URI = '/reviews';

const Edit = ({ setReviews, setEdit, id, product_id, comment, rating, images: initialImages }: { setReviews: any, setEdit: any, id: string, product_id: string, comment: string, rating: number, images: string[] }) => {
    const imageRef = useRef<HTMLInputElement>(null);
    const axiosPrivate = useAxiosPrivate();
    const { successNotification, errorNotification } = useToast();

    const [ratingValue, setRatingValue] = useState<number>(0);
    const [commentValue, setCommentValue] = useState<string>('');
    const [images, setImages] = useState<(string | File)[]>([]);

    useEffect(() => {
        setRatingValue(rating || 0);
        setCommentValue(comment || '');

        const existing = Array.isArray(initialImages) ? initialImages : [];
        setImages([...existing]);
    }, [rating, comment, initialImages]);

    useEffect(() => {
        return () => {
            images.forEach(img => {
                if (img instanceof File) {
                    const url = URL.createObjectURL(img);
                    URL.revokeObjectURL(url);
                }
            });
        };
    }, [images]);

    const handleFiles = (files: File[]) => {
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        const maxSize = 2 * 1024 * 1024;

        const validFiles = Array.from(files).filter(file => {
            if (!allowedTypes.includes(file.type)) {
                errorNotification(`${file.name} is not a valid image type`);
                return false;
            }
            if (file.size > maxSize) {
                errorNotification(`${file.name} exceeds 2MB limit`);
                return false;
            }
            return true;
        });

        if (validFiles.length > 0) {
            setImages(prev => [...prev, ...validFiles]);
        }
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            handleFiles(Array.from(e.target.files));
        }
        e.target.value = '';
    };

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const deleteData = async () => {
        if (!window.confirm("Are you sure?")) return;
        try {
            await axiosPrivate.delete(`${UPLOAD_URI}/${id}`)

            setEdit(false)
            successNotification("Review Deleted Successfully")

            // Refresh reviews
            const res = await axios.get(`${UPLOAD_URI}?product_id=${product_id}`)
            setReviews(res?.data)
        } catch (error: any) {
            if (error?.response?.status === 404) { return setReviews([]) }
            errorNotification(error?.response?.data?.message || 'Failed to delete review')
        }
    }

    const submitData = async () => {
        if (!ratingValue) {
            errorNotification('Please provide a rating');
            return;
        }
        if (!commentValue.trim()) {
            errorNotification('Please provide a comment');
            return;
        }

        try {
            const formData = new FormData();

            formData.append('comment', String(commentValue));
            formData.append('rate', String(ratingValue));

            images.forEach(item => {
                if (typeof item === 'string') {
                    formData.append('existingImages', item);
                } else if (item instanceof File) {
                    formData.append('images', item);
                }
            });

            await axiosPrivate.patch(`${UPLOAD_URI}/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            successNotification('Review updated successfully');
            setEdit(false);

            // Refresh reviews using correct product_id
            const res = await axios.get(`${UPLOAD_URI}?product_id=${product_id}`);
            setReviews(res?.data);
        } catch (err: any) {
            console.error('Update error:', err);
            errorNotification(err.response?.data?.message || 'Failed to update review');
        }
    };

    return (
        <Fragment>
            <div className="review-overlay" onClick={() => setEdit(false)} />

            <div className="review-wrapper">
                <div className="rev_navbar">
                    <div className="title">Edit Review</div>
                </div>

                <div className="container">
                    <div className="input rating">
                        <Rating
                            className="ratings"
                            value={ratingValue}
                            onChange={(_, newValue: number | null) => newValue !== null && setRatingValue(newValue)}
                            icon={<FaStar className="icon selected" />}
                            emptyIcon={<FaStar className="icon unselected" />}
                        />
                    </div>

                    <div className="input comment">
                        <textarea
                            value={commentValue}
                            onChange={(e) => setCommentValue(e.target.value)}
                            placeholder="Update your review..."
                        />
                    </div>

                    <div className="input file">
                        <input
                            type="file"
                            multiple
                            accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                            hidden
                            ref={imageRef}
                            onChange={handleFileInputChange}
                        />

                        {images.length > 0 ? (
                            <div className="image_list">
                                {images.map((item, index) => {
                                    const src =
                                        typeof item === 'string'
                                            ? `${API_URL}${item}`
                                            : URL.createObjectURL(item);

                                    return (
                                        <div
                                            key={index}
                                            className="image-container-a"
                                        >
                                            <img
                                                width={200}
                                                src={src}
                                                alt={`Review image ${index + 1}`}
                                                onError={(e: any) => {
                                                    console.error('Image failed to load:', src);
                                                    e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"/>';
                                                }}
                                            />
                                            <button
                                                className="remove"
                                                onClick={() => removeImage(index)}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
                                                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                                                </svg>
                                            </button>

                                            {typeof item === 'string' && (
                                                <div
                                                    className="image-type-badge"
                                                    style={{
                                                        position: 'absolute',
                                                        top: '8px',
                                                        left: '8px',
                                                        background: 'rgba(33, 150, 243, 0.9)',
                                                        color: 'white',
                                                        padding: '4px 8px',
                                                        borderRadius: '4px',
                                                        fontSize: '10px',
                                                        fontWeight: 'bold'
                                                    }}
                                                >
                                                    SAVED
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}

                                <button
                                    type="button"
                                    onClick={() => imageRef.current?.click()}
                                    className="add-more-btn"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="1rem">
                                        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                                    </svg>
                                </button>
                            </div>
                        ) : (
                            <div className="image_upload">
                                <div className="input_area">
                                    <div className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                            <path d="M288 109.3V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V109.3l-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352H192c0 35.3 28.7 64 64 64s64-28.7 64-64H448c35.3 0 64 28.7 64 64v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V416c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
                                        </svg>
                                    </div>
                                    <div className="msg">Drag & drop images here</div>
                                    <div className="sub">
                                        or <button type="button" onClick={() => imageRef.current?.click()}>browse images</button> from device
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="input submit">
                        <button className="submit_btn" onClick={submitData}>
                            Submit
                        </button>
                        <button className="delete_btn" onClick={deleteData}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Edit;