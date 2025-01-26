import { useLanguageStore } from "@/stores/language.js";
import { useServiceStore } from '@/stores/services.js'
import { useMetaDataStore } from '@/stores/meta-data.js'

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

/* Fetch meta data */
const fetchMetaData = async () => {
    const metaDataStore = useMetaDataStore()
    await metaDataStore.fetchData()
}

const initStore = async () => {
    await fetchLanguageSystem()
    await fetchServices()
    // await fetchMetaData()
}

export default initStore