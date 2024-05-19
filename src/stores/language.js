import { defineStore } from 'pinia'

export const useLanguageStore = defineStore('language', {
    state: () => ({
        languages: [
            'vn',
            'en'
        ],
        currentLanguage: 'vn'
    }),
    actions: {
        changeLanguageSystem (language) {
            if (this.currentLanguage !== language) {
                localStorage.setItem('language_system', language)
                this.currentLanguage = language
            }
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
                currentLanguage = 'vn'
            }
            state.currentLanguage = currentLanguage

            return state.currentLanguage
        },
    }
})