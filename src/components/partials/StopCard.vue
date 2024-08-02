<script>
import { store } from "../../data/store";
export default {
  props: {
    stopObj: Object,
    stopId: Number,
  },
  data() {
    return {
      store,
    };
  },
  methods: {
    getImgPath(img) {
      return new URL(`../../assets/img/${img}`, import.meta.url).href;
    },
    saveCheckedStops() {
      localStorage.setItem("checkedStops", store.checkedStops);
    },
  },
};
</script>

<template>
  <div class="card card-custom mb-4">
    <div class="row g-0">
      <div class="col-md-1 d-flex flex-column align-items-center stop-id-box">
        <i class="fa-solid fa-location-pin"></i>
        <p class="id">{{ stopId + 1 }}</p>

        <input
          class="stop-check"
          :checked="store.checkedStops.includes(stopObj.title) ? 'checked' : ''"
          type="checkbox"
          name="checkStop"
          :id="stopId"
          :value="stopObj.title"
          v-model="store.checkedStops"
          @change="saveCheckedStops"
        />
      </div>

      <div class="col-md-7">
        <div class="card-body">
          <h5 class="card-title">{{ stopObj.title }}</h5>
          <p class="card-text">{{ stopObj.description }}</p>
        </div>
      </div>

      <div class="col-md-4 img-box">
        <img
          :src="getImgPath(stopObj.img)"
          class="img-fluid rounded-start rounded-end"
          :alt="stopObj.title"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../assets/scss/partials/variables";

.card-custom {
  background-color: transparent;
  border: none;

  .stop-id-box {
    position: relative;
    i {
      font-size: 2.5rem;
      padding-top: 16px;
      color: $primary-color;
    }
    .id {
      position: absolute;
      top: 0%;
      left: 50%;
      transform: translate(-50%, 80%);
      color: white;
      font-weight: 600;
    }

    .stop-check {
      margin-top: 20px;
      width: 25px;
      height: 25px;
      accent-color: $primary-color;
    }
  }

  .img-box {
    overflow: hidden;
    height: 220px;
    padding-top: 16px;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
}
</style>
