import axios from "axios";
import { domain, timeOutRequest } from "@/utils/constants.js"
import { useNotify } from '@/composables/useNotify';
import { createI18n } from 'vue-i18n';
import { statusCode } from "@/utils/constants";

const toast = useNotify()

export default function useAxios() {
    let configHeader = {
        'Content-Type': 'application/json'
    }

    const api = axios.create({
        baseURL: domain, // config default domain
        timeout: timeOutRequest, // set timeout up to 5 minutes
        headers: configHeader
    })

    api.interceptors.response.use(
        (response) => {
            handleResponse(response)
            return response 
        },
        (error) => {
            console.log('Error API', error.response);
            return error.response
        }
    )

    return api
}

const handleResponse = (response) => {
    let config = response.config
    let status = response.status
    let method = config.method

    if (methodsAcceptShowNotify.includes(method) && status == statusCode.created) {
        toast.notify(i18n('notification.success'))
    }  
}

const i18n = (key) => {
    let languageSystem = localStorage.getItem('language_system') || 'en'

    const messages = {
        en: { 
            notification: {
                success: 'Success',
                error: 'An error occurred'
            },
        },
        vi:{
            notification: {
                success: 'Thành công',
                error: 'Đã xảy ra lỗi'
            },
        },
      };
    

    let instance = createI18n({
        locale: languageSystem,
        fallbackLocale: 'en',
        messages,
    });

    return instance.global.t(key)
}

const methodsAcceptShowNotify = ['post', 'put']


