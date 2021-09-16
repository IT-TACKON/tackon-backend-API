export default function getCurrentDateTime(): string {
    const today: Date = new Date()
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
    return date + ' ' + time
}