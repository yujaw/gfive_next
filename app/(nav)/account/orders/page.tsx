import { Fragment } from 'react'

const Orders = () => {
    return (
        <Fragment>
            <div className='account-desc'>
                <div className='title header'>
                    <div className="utils">
                        <div className="ico" />
                        <div className="ico" />
                        <div className="ico" />
                    </div>
                    Orders
                </div>
                <div className='container wish_cont'>
                    {/* {
                        StoreItems.map(items => (
                            <div key={items.id}>
                                {
                                    favItems.some(f => items.id === f) ?
                                        <div className='wish_container'>
                                            {
                                                <Fragment>
                                                    <div className="img_container">
                                                        <img src={items.productImg[0]} alt='product' />
                                                    </div>
                                                    <div className="desc">
                                                        <div className="title">{items.name}</div>
                                                        <div className="buttons">
                                                            <button onClick={() => increaseCartQuantity(items.id)} className="btn primary">Add to Cart</button>
                                                            <button onClick={() => toggleFav(items.id)} className="btn secondary">Remove from List</button>
                                                        </div>
                                                    </div>
                                                </Fragment>
                                            }
                                        </div> : null
                                }
                            </div>
                        ))
                    } */}
                </div>
            </div>
        </Fragment>
    )
}

export default Orders