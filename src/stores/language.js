import {defineStore} from 'pinia'
import useAxios from "@/composables/useAxios.js";
import {i18n} from "@/plugins/vue-i18n.js";
import {urlAPIs} from "@/utils/constants.js"

export const useLanguageStore = defineStore('language', {
    state: () => ({
        languages: [
            'vi',
            'en'
        ],
        currentLanguage: 'vi',
        translations: []
    }),
    actions: {
        changeLanguageSystem (language) {
            if (this.currentLanguage !== language) {
                this.currentLanguage = language
                i18n.global.locale.value = language
                localStorage.setItem('language_system', language)
            }
        },
        async fetchTranslations() {
            const axios = useAxios()
            i18n.global.locale.value = this.getCurrentLanguage
            const {getLanguages} = urlAPIs

            await axios.get(getLanguages)
                .then(res => {
                    if (res.data && res.data.length > 0) {
                        if (Object.keys(res.data[0]).length > 0) {
                            Object.keys(res.data[0]).forEach((lang) => {
                                i18n.global.setLocaleMessage(lang, res.data[0][lang])
                            })
                        }
                        this.translations = res.data[0] || []
                    }
                })
                .catch((err) => {
                    console.warn(err)
                })
        }
    },
    getters: {
        getListLanguage (state) {
            return state.languages
        },
        getCurrentLanguage (state) {
            let currentLanguage = ''
            let languageLocalStorage = localStorage.getItem('language_system')

            if (languageLocalStorage != null) {
                currentLanguage = languageLocalStorage
            } else {
                currentLanguage = 'vi'
            }
            state.currentLanguage = currentLanguage

            return state.currentLanguage
        },
        getTranslations (state) {
            return state.translations
        }
    }
})