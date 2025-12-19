function setTokenCookie(token) {
    document.cookie = `token=${token}; path=/; max-age=86400`;
}

function getTokenFromCookies() {
    return document.cookie
        .split("; ")
        .find(row => row.startsWith("token="))
        ?.split("=")[1] || null;
}

function clearTokenCookie() {
    document.cookie = "token=; path=/; max-age=0";
}

export default {
    setTokenCookie,
    getTokenFromCookies,
    clearTokenCookie
};