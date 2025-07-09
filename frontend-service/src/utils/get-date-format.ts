const MonthsList = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember"
]

export function getDateFormat(dateString: string | null){
    if(!dateString){
        return "Present"
    }
    const date = new Date(dateString)

    return `${MonthsList[date.getMonth()]} ${date.getFullYear()}`
}