export const capitalize = word => {
    return word[0].toUpperCase() + word.substring(1).split('_').join(' ');
}