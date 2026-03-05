import { createContext, useState } from "react";

interface SearchContextInterface {
    values: Values,
    setValues: (values: Values) => void,
    topSearch: boolean,
    toggleSearch: () => void,
    setTopSearch: (value: boolean) => void
}

interface Values {
    keyword: string,
    result: any
}

const SearchContext = createContext({} as SearchContextInterface)

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
    const [values, setValues] = useState<Values>({
        keyword: '',
        result: []
    })
    const [topSearch, setTopSearch] = useState<boolean>(false)
    const toggleSearch = () => {
        setTopSearch(!topSearch)
    }

    return (
        <SearchContext.Provider value={{
            values,
            setValues,
            topSearch,
            toggleSearch,
            setTopSearch
        }}>
            {children}
        </SearchContext.Provider>
    )
}

export default SearchContext