<template>
    <div>
        <div class="row mb-3 g-3 align-items-center setting_limit_merchant search-box">
            <div class="col-sm-5 col-6">
                <label for="setting--limit_merchant" class="col-form-label fw-bold">{{ t('setting.tab_general.limit_select_order') }}</label>
            </div>
            <div class="col-sm-7 col-6">
                <input
                    type="number"
                    id="setting--limit_merchant"
                    class="text-box"
                    :min="settingScreen.limit_select_merchant.min"
                    :max="settingScreen.limit_select_merchant.max"
                >
            </div>
        </div>
    </div>
</template>

<script setup>
import { useI18n } from '@/composables/useI18n'

const {t} = useI18n()
const settingScreen = {
    limit_select_merchant: {
        min: 1,
        max: 20
    }
}
</script>

<style scoped lang="scss">
</style>