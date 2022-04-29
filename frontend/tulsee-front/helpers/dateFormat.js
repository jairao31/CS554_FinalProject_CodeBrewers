export const getDate = date => {
    return new Date(date).toLocaleDateString('en-US',{day:"numeric",month:"short",year: "numeric"})
}