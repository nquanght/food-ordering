import { toast } from "vue3-toastify";

export function useNotify() {
    const notify = (message = 'Nothing', options = {}) => {
        let getOptions = getOptionsToast(options)
        toast(message, getOptions)
    }

    return {
        notify
    }
}

const getOptionsToast = (option = {}) => {
    let type = getValue('type', option, toastType)
    let position = getValue('position', option, toastPosition)
    let theme = getValue('theme', option, toastTheme)
    let transition = getValue('transition', option, toastTransition)
    let pauseOnHover = getValue('pauseOnHover', option)
    let pauseOnFocusLoss = getValue('pauseOnFocusLoss', option)

    return {
        type,
        position,
        theme,
        transition,
        pauseOnHover,
        pauseOnFocusLoss
    }
}

const getValue = (key, option, listDataCheck) => {
    let isValid = true

    key.trim()

    if (key == '') {
        isValid = false
    }

    if (!option.hasOwnProperty(key)) {
        isValid = false
    }

    if (!listDataCheck || ((listDataCheck) && (!listDataCheck.includes(option[key] || null)))) {
        isValid = false
    }

    return isValid ? option[key] : defaultOptions[key]
}

/* Define Toast Options */
const toastTheme = ['auto', 'light', 'dark', 'colored']

const toastTransition = ['zoom', 'flip', 'bounce', 'slide', 'none']

const toastType = ['info', 'success', 'error', 'warning', 'loading', 'default']

const toastPosition = ['top-left', 'top-right', 'top-center', 'bottom-left', 'bottom-right', 'bottom-center']

const defaultOptions = {
    type: 'success',
    position: 'top-right',
    theme: 'auto',
    transition: 'bounce',
    pauseOnHover: false,
    pauseOnFocusLoss: false
}