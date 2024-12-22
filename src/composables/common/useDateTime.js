import moment from "moment"

export function useDateTime () {
    const getListWeekOfDay = () => {
        return []
    }

    const formatTime = (time, format = 'HH:mm:ss', formatConvert = 'HH:mm') => {
        let result = ''

        result = moment(time, 'HH:mm:ss').format('HH:mm') 

        return result
    }

    return {
        getListWeekOfDay,
        formatTime
    }
}