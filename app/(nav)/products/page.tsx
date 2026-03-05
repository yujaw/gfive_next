'use client'

import { Fragment, useEffect, useState } from 'react';
import { useFavourites } from '@/hooks/useFavourites';
import { useFilter } from '@/hooks/useFilter';
import { useSearch } from '@/hooks/useSearch';
import { Pagination, styled } from '@mui/material';
import { useWindow } from '@/hooks/useWindow';

import Sidenav from '@/components/ProductNav/SideNav';
import CardNav from '@/components/ProductNav/CardNav';
// import ProductCard from '@/components/ProductCard';

import axios from '@/api/axios';
import dynamic from 'next/dynamic';


const MobileSideNav = () => {
    const { filtermenu } = useFilter();
    return filtermenu ? <Sidenav /> : null;
};

const SkeletonCard = () => (
    <div className="card">
        <div className="product">
            <div className="skeleton image"></div>
            <div className="contents">
                <div className="desc"></div>
                <div className="more">
                    {/* <div className="skeleton skeleton-crate"></div> */}
                    <div className="skeleton ratings"></div>
                    <div className="skeleton price"></div>
                    <div className="skeleton buy"></div>
                </div>
            </div>
        </div>
    </div>
)

interface ProductInterface {
    id: string,
    name: string,
    rating: number,
    price: number,
    images: string[]
}

const ProductCard = dynamic(() => import("@/components/ProductCard"), {
    loading: () => <SkeletonCard />,
    ssr: false
})

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    // const [isProductLoading, setIsProductLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [availableBrands, setAvailableBrands] = useState([]);
    const { isWide } = useWindow()

    const { values } = useSearch();
    const { sort, chip, priceRange, page, setPage } = useFilter();

    const { favItems } = useFavourites();

    const ITEMS_PER_PAGE = 8;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const params = {
                    search: values?.keyword || undefined,
                    page: page || 1,
                    limit: ITEMS_PER_PAGE,
                    sort: sort?.name || 'name',
                    order: sort?.order || '1',
                    brand: '',
                    minPrice: 0,
                    maxPrice: 0
                };

                if (chip && chip.length > 0) {
                    params.brand = chip.join(',');
                }

                if (priceRange && priceRange.length === 2) {
                    params.minPrice = priceRange[0];
                    params.maxPrice = priceRange[1];
                }

                const cleanParams = Object.fromEntries(
                    Object.entries(params).filter(([_, v]) => v != null && v !== '')
                );

                const res = await axios.get('/api/products', { params: cleanParams });

                setProducts(res.data.data || []);

                const totalItems = res.data.pagination?.total || 0;
                setTotalPages(Math.ceil(totalItems / ITEMS_PER_PAGE) || 1);

                setAvailableBrands(res.data.filters?.availableBrands || []);

            } catch (err) {
                console.error('Failed to load products:', err);
                setProducts([]);
                setTotalPages(1);
                setAvailableBrands([]);
            }
            // finally {
            //     setIsProductLoading(false);
            // }
        };

        fetchProducts();
    }, [
        values?.keyword,
        sort?.name,
        sort?.order,
        chip,
        priceRange,
        page,
    ]);

    const StyledPagination = styled(Pagination)({
        '& .MuiPagination-ul': {
            '& .Mui-selected': {
                backgroundColor: '#00ed64',
                borderRadius: '0.2rem',
                color: 'black',
                fontWeight: '500',
                border: '1px solid #00684a',
                transition: '0.3s ease',
                '&:hover': {
                    backgroundColor: '#00ed64',
                    borderRadius: '2rem',
                },
            },
        },
    });

    return (
        <Fragment>
            <div className="products_container">
                {isWide ? (
                    <Sidenav availableBrands={availableBrands} />
                ) : (
                    <MobileSideNav />
                )}

                <div className="product_grid_container">
                    <CardNav />

                    <div className="products">
                        {
                            products.length === 0 ? (
                                <div className='error'>
                                    <span>
                                        No products found matching your filters.
                                    </span>
                                </div>
                            ) : (
                                products.map((item: ProductInterface) => (
                                    <div className="card" key={item.id}>
                                        {favItems?.includes(item.id) ? (
                                            <ProductCard {...item} fav={true} />
                                        ) : (
                                            <ProductCard {...item} fav={false} />
                                        )}
                                    </div>
                                ))
                            )}
                    </div>
                </div>
            </div>
            {
                totalPages > 1 && (
                    <div className="pagination_container">
                        <StyledPagination
                            count={totalPages}
                            page={Number(page) || 1}
                            shape="rounded"
                            size="large"
                            onChange={(_, value) => setPage(value)}
                            showFirstButton
                            showLastButton
                        />
                    </div>
                )
            }
        </Fragment>
    )
};

export default ProductPage;