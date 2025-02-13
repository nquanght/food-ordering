import {isArray, isString} from 'lodash'

export function useConvertString () {
    const convertToDashedString = (string) => {
        return string.replace(/[A-Z]/g, (match, offset) => (offset > 0 ? '-' : '') + match.toLowerCase())
    }

    const handleParamsUrl = (string, pattern, replacement) => {
        if (isString(string) && isString(pattern) && isString(replacement)) {
            return string.replace(pattern, replacement)
        }

        if (isString(string) && isArray(pattern) && isArray(replacement)) {
            pattern.forEach((item, idx) => {
                let replaceItem = replacement[idx]

                if (replaceItem) {
                    string = string.replace(item, replaceItem)     
                }
            })
            return string
        }

        return string
    }

    return {
        convertToDashedString,
        handleParamsUrl
    }
}