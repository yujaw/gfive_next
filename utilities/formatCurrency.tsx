const CURRENCY_FORMATTER = new Intl.NumberFormat("en-IN", {
    currency: "NRS", style: "currency"
})

const formatCurrency = (number: number) => {
    return CURRENCY_FORMATTER.format(number)
}

export default formatCurrency