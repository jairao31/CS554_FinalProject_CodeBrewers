export const getBaseUrl = () => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        return 'http://localhost:3001'
    } else {
        return 'http://18.205.119.46:3001'
    }
}