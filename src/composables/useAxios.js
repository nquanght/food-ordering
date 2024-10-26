import axios from "axios";
import {domain, timeOutRequest} from "@/utils/constants.js"

export default function useAxios() {
    let configHeader = {
        'Content-Type': 'application/json'
    }
    return axios.create({
        baseURL: domain, // config default domain
        timeout: timeOutRequest, // set timeout up to 5 minutes
        headers: configHeader
    })
}