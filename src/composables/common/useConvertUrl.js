import {isArray, isString} from 'lodash'
import { url } from '@/utils/api'

export function useConvertUrl () {
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

    const getUrlApi = (typeApi, urlName) => {
        let apis = url[typeApi]
        let prefix = apis.prefix
        let link = apis.link[urlName]

        return prefix + '/' + link
    }

    return {
        handleParamsUrl,
        getUrlApi
    }
}