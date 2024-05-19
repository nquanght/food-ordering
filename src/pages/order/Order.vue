<template>
  <div class="container-fluid row pe-0">
    <div class="col-lg-8 col-sm-12">
      <div class="card card-cover">
        <div class="w-100">
          <img src="https://i.pinimg.com/736x/0e/7b/3a/0e7b3aa9e8b24ecf5e6a178fd43a7f66.jpg" class="card-img-top" style="height: 200px; object-fit: cover" alt="Image">
        </div>
        <div class="card-body px-4">
          <div class="header-photo fw-bold">
            <h4 class="fw-bold">Family Food Paradise - Parkson Lê Thánh Tôn</h4>
          </div>
          <div class="content-merchant">
            <div class="content-address">
              <font-awesome-icon icon="fa-solid fa-location-dot" width="20" height="20" class="pe-2"/>
              <span>Tầng 3, Tầng 3 Parkson Lê Thánh Tôn, 35Bis - 45 Lê Thánh Tôn Quận 1 Hồ Chí Minh</span>
            </div>
            <div class="content-website">
              <font-awesome-icon icon="fa-solid fa-globe" class="pe-2" width="20" height="20"/>
              <span>https://loship.vn/familyfoodparadiseparksonlethanhton1</span>
            </div>
            <div class="content-opening-time d-flex justify-content-between">
              <div>
                <font-awesome-icon icon="fa-solid fa-clock" class="pe-2" width="20" height="20"/>
                <span class="text-success pe-4">Đang mở cửa</span>
                <span class="text-primary">Thời gian hoạt động</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-lg-4 d-none d-lg-block">
      <div class="card card-cover">
        <div class="card-body">
          Order list
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import {reactive} from "vue";

</script>

<style scoped>
.card-cover {
  border: none;
  box-shadow: 0 1px 6px #dcdcdc;
}

.content-merchant {
  line-height: 2;
}
</style>