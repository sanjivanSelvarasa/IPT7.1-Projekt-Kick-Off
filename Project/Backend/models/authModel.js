const users = [] // TODO: replace with SQL storage
const refreshTokens = [] // TODO: replace with SQL storage

function getUsers() {
    return users
}

function addUser(user) {
    users.push(user)
}

function findUserByEmail(email) {
    return users.find(user => user.email === email)
}

function hasUserWithEmail(email) {
    return users.some(user => user.email.toLowerCase() === email)
}

function addRefreshToken(token) {
    refreshTokens.push(token)
}

function hasRefreshToken(token) {
    return refreshTokens.includes(token)
}

function removeRefreshToken(token) {
    const index = refreshTokens.indexOf(token)
    if (index >= 0) {
        refreshTokens.splice(index, 1)
    }
}

module.exports = {
    getUsers,
    addUser,
    findUserByEmail,
    hasUserWithEmail,
    addRefreshToken,
    hasRefreshToken,
    removeRefreshToken
}
