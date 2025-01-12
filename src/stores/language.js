import {defineStore} from 'pinia'
import useAxios from "@/composables/useAxios.js";
import {i18n} from "@/plugins/vue-i18n.js";
import {urlAPIs} from "@/utils/constants.js"
import { isEmpty } from 'lodash';

const keyNameStorage = 'language_system'

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
                localStorage.setItem(keyNameStorage, language)
            }
        },
        async fetchTranslations() {
            const axios = useAxios()

            /* Get/Set default language system */
            i18n.global.locale.value = this.getCurrentLanguage

            let languageListStorage = localStorage.getItem('languages')
            
            /* Fetch new data language system if not already loaded */
            if (isEmpty(languageListStorage)) {
                const {urlGetLanguages} = urlAPIs

                await axios.get(urlGetLanguages)
                    .then(res => {
                        if (res.data && res.data.data) {
                            if (Object.keys(res.data.data).length > 0) {
                                Object.keys(res.data.data).forEach((lang) => {
                                    i18n.global.setLocaleMessage(lang, res.data.data[lang])
                                })
                            }
                            this.translations = res.data.data || []
                            localStorage.setItem('languages', JSON.stringify(res.data.data))
                        }
                    })
                    .catch((err) => {
                        console.error(err.message)
                    })
            } else {
                languageListStorage = JSON.parse(languageListStorage)
                if (Object.keys(languageListStorage).length > 0) {
                    Object.keys(languageListStorage).forEach((lang) => {
                        i18n.global.setLocaleMessage(lang, languageListStorage[lang])
                    })
                }
            }
        }
    },
    getters: {
        getListLanguage (state) {
            return state.languages
        },
        getCurrentLanguage (state) {
            let currentLanguage = ''
            let languageSystemStorage = localStorage.getItem(keyNameStorage)

            if (languageSystemStorage != null) {
                currentLanguage = languageSystemStorage
            } else {
                currentLanguage = 'vi'
                localStorage.setItem(keyNameStorage, currentLanguage)
            }
            state.currentLanguage = currentLanguage

            return state.currentLanguage
        },
        getTranslations (state) {
            return state.translations
        }
    }
})