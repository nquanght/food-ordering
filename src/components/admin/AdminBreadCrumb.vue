<template>
    <div class="d-flex">
        <div
            v-for="(data, idx) in breadcrumbs"
            :key="idx"
        >
            <router-link v-if="data.url !== ''" :to="data.url" class="nav-link">
                <span v-if="breadcrumbs.length != 1" class="px-2 fs-6">»</span>
                <span class="fw-bold fs-6">{{ t(data.name) }}</span>
            </router-link>
            <a v-else class="nav-link text-secondary fw-bold fs-6 user-select-none">{{ t(data.name) }}</a>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router'
import { adminMenu } from '@/utils/menu';
import { isEmpty } from 'lodash';
import {useI18n} from "@/composables/useI18n.js";

const route = useRoute();
const {t} = useI18n()

const breadcrumbs = computed(() => {
    let prefixRoute = '/admin/'
    let result = []
    let routeMapPath = []
    let currentRoute = route.path.replace(prefixRoute, '')

    /* Find route mapping path */
    if (!isEmpty(adminMenu)) {
        for (let index = 0; index < adminMenu.length; index ++) {
            const data = adminMenu[index];
            
            if (data.hasOwnProperty('group')) {
                for (let idx = 0; idx < data['group'].length; idx ++) {
                    let element = data['group'][idx] || {};
                    let path = element.url

                    if (path === currentRoute) {
                        routeMapPath = data
                        break
                    }
                }    
            } else if (data.hasOwnProperty('url')) {
                let path = data['url']

                if (path === currentRoute) {
                    routeMapPath = data
                    break
                }
            }
        }
    }

    /* Build breadcrumb html */
    if (!isEmpty(routeMapPath)) {
        result.push({
            name: routeMapPath.name || '',
            url: (typeof routeMapPath.url != 'undefined') ? prefixRoute + routeMapPath.url : ''
        })
        
        if (routeMapPath.hasOwnProperty('group')) {
            routeMapPath.group.forEach((item) => {
                if (currentRoute === item.url) {
                    result.push({
                        name: item.name || '',
                        url: prefixRoute + item.url || ''
                    })
                    return
                }
            })
        }
    }

    return result
})
</script>

<style>
</style>