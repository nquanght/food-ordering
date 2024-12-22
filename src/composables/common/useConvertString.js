export function useConvertString () {
    const convertToDashedString = (string) => {
        return string.replace(/[A-Z]/g, (match, offset) => (offset > 0 ? '-' : '') + match.toLowerCase())
    }

    return {
        convertToDashedString
    }
}