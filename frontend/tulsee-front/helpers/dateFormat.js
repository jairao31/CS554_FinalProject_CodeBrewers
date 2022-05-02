export const getDate = date => {
    return new Date(date).toLocaleDateString('en-US',{day:"numeric",month:"short",year: "numeric"})
}

export const get24TimeFormat = date => {
    let d = new Date(date)
    return `${d.getHours()}:${d.getMinutes()}`
}