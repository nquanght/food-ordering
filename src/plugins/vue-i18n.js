import { createI18n, useI18n } from 'vue-i18n'

const i18n = createI18n({
    legacy: false,
    locale: '',
    fallbackLocale: 'vi',
    messages: {},
    missing: (locale, key, vm, values) => {
        console.warn('Missing translation for key: ', locale + '.' + key)
        return key
    },
    fallbackWarn: false
});

export {i18n, useI18n}