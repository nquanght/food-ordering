import {useLanguageStore} from "@/stores/language.js";
import {useServiceStore} from '@/stores/services.js'

/* Fetch translations system */
const fetchLanguageSystem = async () => {
    const languageStore = useLanguageStore()
    await languageStore.fetchTranslations()
}

/* Fetch services */
const fetchServices = async () => {
    const serviceStore = useServiceStore()
    await serviceStore.fetchData()
}

const initStore = async () => {
    await fetchLanguageSystem()
    await fetchServices()
}

export default initStore