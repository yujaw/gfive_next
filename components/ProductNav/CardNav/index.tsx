'use client'

import { Fragment, useState, useEffect } from 'react'
import { useFilter } from '@/hooks/useFilter'
import { Select, styled, MenuItem, SelectChangeEvent } from '@mui/material'
import { useWindow } from '@/hooks/useWindow'

const CardNav = () => {

    const { clearChip, toggleChip, chip, sort, setSort, toggleOrder } = useFilter()
    const { isWide } = useWindow()

    const handleSort = (e: SelectChangeEvent<unknown>) => {
        setSort({ ...sort, name: e.target?.value as string })
    }

    const StyledSelect = styled(Select)({
        height: '80%',
        width: '50%',
        borderRadius: '.2rem',
        fontSize: '.9rem',
        border: '1px solid #00684a',
        padding: '.5rem',
    })

    const StyledMenuItem = styled(MenuItem)({
        fontSize: '.9rem',
    })

    return (
        <Fragment>
            {
                isWide && (
                    <Fragment>
                        <div className="chip_nav">
                            {
                                chip?.map((items, index) => (
                                    <div className="chip secondary" key={index}>
                                        {items}
                                        <button className="icon" onClick={() => toggleChip(items)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="20px" width="20px" viewBox="0 0 24 24" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" /></svg>
                                        </button>
                                    </div>
                                ))
                            }
                            {
                                chip?.length <= 0 &&
                                (
                                    <button className="chip primary" onClick={clearChip}>
                                        Clear All
                                    </button>
                                )
                            }
                        </div>
                    </Fragment >
                )
            }
            <div className="top_nav">
                <div className="sort">
                    <span>Sort By :</span>
                    <StyledSelect
                        value={sort?.name}
                        onChange={handleSort}
                        variant='standard'
                        disableUnderline
                    >
                        <StyledMenuItem value={'name'}>Product Name</StyledMenuItem>
                        <StyledMenuItem value={'rating'}>Rating</StyledMenuItem>
                        <StyledMenuItem value={'price'}>Price</StyledMenuItem>
                    </StyledSelect>
                    <button className="flow" onClick={toggleOrder}>
                        {
                            sort?.order != 1
                                ? (

                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" height='18px'>
                                        <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                                    </svg>
                                ) : (

                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" height='18px'>
                                        <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                                    </svg>
                                )
                        }
                    </button>
                </div>
            </div>
        </Fragment >
    )
}

export default CardNav