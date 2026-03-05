import React, { Fragment, useState, useEffect } from 'react'
import { Slider, Checkbox } from '@mui/material'
import { useFilter } from '@/hooks/useFilter'
import formatCurrency from '@/utilities/formatCurrency'
import { useWindow } from '@/hooks/useWindow'

const Sidenav = ({ availableBrands = [], availablePriceRange = { min: 0, max: 500000 } }) => {
    const { toggleChip, chip, setFiltermenu, priceRange, setPriceRange } = useFilter()

    const [localPrice, setLocalPrice] = useState([availablePriceRange.min, availablePriceRange.max])

    const { isWide } = useWindow()

    useEffect(() => {
        if (priceRange && priceRange.length === 2) {
            setLocalPrice(priceRange)
        }
    }, [priceRange])

    useEffect(() => {
        setLocalPrice([availablePriceRange.min, availablePriceRange.max])
    }, [availablePriceRange.min, availablePriceRange.max])

    const handleSliderChange = (_event: Event, newValue: number | number[]) => {
        setLocalPrice(newValue as number[])
    }

    const handleSliderCommitted = (_event: Event | React.SyntheticEvent, newValue: number | number[]) => {
    }

    const applyPriceFilter = () => {
        setPriceRange(localPrice)
    }

    return (
        <Fragment>
            <nav className="sidenav">
                {
                    !isWide ?
                        <div className="header">
                            <div className="title">Shopping Options</div>
                            <button className="close" onClick={() => setFiltermenu(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="1.75rem" viewBox="0 0 384 512">
                                    <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
                                </svg>
                            </button>
                        </div> :
                        <div className="title">Shopping Options</div>
                }

                <div className="component">
                    <div className="sub_title">Brands</div>
                    <div className="cont">
                        {availableBrands.length === 0 ? (
                            <div style={{ padding: '0.5rem', fontSize: '0.85rem', color: '#666' }}>
                                No brands available
                            </div>
                        ) : (
                            availableBrands.map((brand) => (
                                <button className="items" key={brand}>
                                    <Checkbox
                                        sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }}
                                        onClick={() => toggleChip(brand)}
                                        disableRipple
                                        checked={chip.includes(brand)}
                                    />
                                    {brand}
                                </button>
                            ))
                        )}
                    </div>
                </div>

                <div className="component">
                    <div className="sub_title">Price</div>
                    <div className="slider_container">
                        <Slider
                            className='slider'
                            size='small'
                            value={localPrice}
                            min={availablePriceRange.min}
                            step={1000}
                            max={availablePriceRange.max}
                            onChange={handleSliderChange}
                            onChangeCommitted={handleSliderCommitted}
                            valueLabelDisplay='off'
                            aria-labelledby="range-slider"
                        />
                    </div>
                    <div className="desc">
                        {formatCurrency(localPrice[0])} - {formatCurrency(localPrice[1])}
                    </div>
                    <div style={{
                        fontSize: '0.75rem',
                        color: '#666',
                        marginTop: '0.25rem',
                        textAlign: 'center'
                    }}>
                        Available: {formatCurrency(availablePriceRange.min)} - {formatCurrency(availablePriceRange.max)}
                    </div>
                    <button
                        onClick={applyPriceFilter}
                        style={{
                            marginTop: '0.5rem',
                            padding: '0.5rem 1rem',
                            backgroundColor: '#00ed64',
                            border: '1px solid #00684a',
                            borderRadius: '0.2rem',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            fontWeight: '500',
                            width: '100%',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseOver={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#00d458'}
                        onMouseOut={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#00ed64'}
                    >
                        Apply Price Filter
                    </button>
                </div>
            </nav>
        </Fragment>
    )
}

export default Sidenav