const portfolios = [
    {
        email: 'gian@example.com',
        content: 'Portfolio 1'
    },
    {
        email: 'egor@example.com',
        content: 'Portfolio 2'
    }
] // TODO: replace with SQL storage

function getPortfoliosByEmail(email) {
    return portfolios.filter(portfolio => portfolio.email === email)
}

module.exports = {
    getPortfoliosByEmail
}
