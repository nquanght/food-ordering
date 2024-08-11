import axios from "axios";
import {domain} from "@/utils/constants.js"

export default function useAxios() {
    return axios.create({
        baseURL: domain, // config default domain
        timeout: 300000, // set timeout up to 5 minutes
        headers: {'Content-Type': 'application/json'}
    })
}