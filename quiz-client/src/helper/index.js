export const getFormattedTime = sec => {
    // the part before the colon represents minutes, and the part afer the colon represents the seconds
    return Math.floor(sec / 60).toString().padStart(2, '0') + ':' + Math.floor(sec % 60).toString().padStart(2, '0')
}