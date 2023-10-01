
export const addWeeksToDate = (dateObj: Date, numberOfWeeks: number) => {
    return new Date(dateObj.getTime() + (1000 * 60 * 60 * 24 * 7 * numberOfWeeks));
}

export const addDaysToDate = (dateObj: Date, numberOfDays: number) => {
    return new Date(dateObj.getTime() + (1000 * 60 * 60 * 24 * numberOfDays));
}



export const getMonday = (d: Date) => {
    var day = d.getDay(),
        diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
}