import { Fragment } from 'react'

const ShippingInfo = () => {
    return (
        <Fragment>
            <div className='account-desc'>
                <div className='title header'>
                    <div className="utils">
                        <div className="ico" />
                        <div className="ico" />
                        <div className="ico" />
                    </div>Shipping Info
                </div>
                <div className='container'>
                    <div className='sub_container'>
                        <div className='title'>
                            Billed to
                        </div>
                        <div className='items'>
                            <input type='text' placeholder='First Name' value='' readOnly />
                            <input type='text' placeholder='Last Name' value='' readOnly />
                        </div>
                        <div className='items'>
                            <input type='text' placeholder='Address' value='' readOnly />
                            <input type='text' placeholder='Zip' value='66044' readOnly />
                        </div>
                        <div className='items'>
                            <input type='text' placeholder='City' value='Kathmandu' readOnly />
                        </div>
                    </div>
                    <div className='sub_container'>
                        <div className='title'>
                            Card Details
                        </div>
                        <div className='items'>
                            <input type='text' placeholder='Card Number' className='card_no' value='98881888888' readOnly />
                            <input type='text' placeholder='Exp info' className='exp_info' value='22/07' readOnly />
                            <input type='text' placeholder='card no.' className='card_reg' value='55400' readOnly />
                        </div>
                    </div>
                    <div className='button'>
                        <button className='secondary'>Reset</button>
                        <button className='primary'>Save</button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ShippingInfo