<template>
  <Modal
    :page-title="t('merchant.information.info')"
    width="50%"
  >
    <template #content>
      <div class="fs-5 fw-bold">Food Paradise - Parkson Lê Thánh Tôn</div>

      <hr class="break-line-dashed text-gray"/>

      <div class="fs-6 address-merchant">
        <span class="fw-bold pe-2">{{ t('merchant.information.address') }}:</span>
        <span>2-6 Bis Điện Biên Phủ, P.Đa Kao, Quận 1, Tp Hồ Chí Minh</span>
      </div>
      <div class="fs-6 rate-merchant d-flex align-items-center">
        <span class="fw-bold pe-2">{{ t('merchant.information.rate') }}:</span>
        <div>
          <span><font-awesome-icon icon="fa-solid fa-star" color="orange" size="1x"/></span>
          <span><font-awesome-icon icon="fa-solid fa-star" color="orange" size="1x"/></span>
          <span><font-awesome-icon icon="fa-solid fa-star" color="orange" size="1x"/></span>
          <span><font-awesome-icon icon="fa-solid fa-star-half-stroke" color="orange" size="1x"/></span>
          <span><font-awesome-icon icon="fa-regular fa-star" color="orange" size="1x"/></span>
        </div>
        <span
            class="ps-1 cursor-pointer text-primary"
            @click="openFormRateMerchant"
        >(16 {{ t('merchant.information.reviews') }})</span>
      </div>

      <hr class="break-line-dashed text-gray"/>

      <div class="list-time-opening">
        <div class="fw-bold">{{ t('merchant.information.opening_time') }}:</div>
        <ul class="list-group">
          <li class="list-group-item">
            <span class="pe-2"><font-awesome-icon icon="fa-regular fa-calendar" /></span>
            <span>Chủ nhật: 10:00 - 23:59</span>
          </li>
          <li class="list-group-item">
            <span class="pe-2"><font-awesome-icon icon="fa-regular fa-calendar" /></span>
            <span>Thứ 2: 10:00 - 23:59</span>
          </li>
          <li class="list-group-item">
            <span class="pe-2"><font-awesome-icon icon="fa-regular fa-calendar" /></span>
            <span>Thứ 3: 10:00 - 23:59</span>
          </li>
          <li class="list-group-item">
            <span class="pe-2"><font-awesome-icon icon="fa-regular fa-calendar" /></span>
            <span>Thứ 4: 10:00 - 23:59</span>
          </li>
          <li class="list-group-item">
            <span class="pe-2"><font-awesome-icon icon="fa-regular fa-calendar" /></span>
            <span>Thứ 5: 10:00 - 23:59</span>
          </li>
          <li class="list-group-item">
            <span class="pe-2"><font-awesome-icon icon="fa-regular fa-calendar" /></span>
            <span>Thứ 6: 10:00 - 23:59</span>
          </li>
          <li class="list-group-item">
            <span class="pe-2"><font-awesome-icon icon="fa-regular fa-calendar" /></span>
            <span>Thứ 7: 10:00 - 23:59</span>
          </li>
        </ul>
      </div>

      <hr class="break-line-dashed text-gray"/>

      <div>
        <div class="fw-bold mb-2">{{ t('merchant.information.map') }}:</div>
        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62705.334742534265!2d106.62050803506621!3d10.804922672231248!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529c032abd229%3A0x3f28cabceeca1a32!2sMcDonald&#39;s%20Dakao!5e0!3m2!1sen!2s!4v1720268853670!5m2!1sen!2s"
            width="100%"
            height="450"
            style="border:0;"
            allowfullscreen=""
            referrerpolicy="no-referrer-when-downgrade"
            loading="lazy"
          />
        </div>
      </div>
    </template>
  </Modal>
</template>

<script setup>
import Modal from "@/components/common/Modal.vue";
import CommentMerchant from "@/pages/order/components/CommentMerchant.vue";
import {useModal} from "@/composables/useModal.js";
import {useI18n} from "@/composables/useI18n.js";

const {showModal} = useModal()
const {t} = useI18n()

const openFormRateMerchant = () => {
  setTimeout(() => {
    showModal(CommentMerchant, 'params')
  }, 100)
}

</script>

<style scoped lang="scss">
.rate-merchant {
  >div {
    >span {
      font-size: 1.1rem;
    }
  }
}

.list-time-opening {
  > ul > li {
    border: none;
  }
}
</style>