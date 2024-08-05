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

    saveNotes() {
      localStorage.setItem("notes", store.notes);
    },
  },
};
</script>

<template>
  <div class="card card-custom mb-4">
    <div class="row g-0">
      <!-- Colonna id della tappa e check per mappare progressione -->
      <div class="col-md-1 d-flex flex-column align-items-center stop-id-box">
        <i class="fa-solid fa-location-pin"></i>
        <p class="id">{{ store.locationsName.indexOf(stopObj.title) + 1 }}</p>

        <input
          class="stop-check"
          :checked="store.checkedStops.includes(stopObj.title) ? 'checked' : ''"
          type="checkbox"
          name="checkStop"
          :id="stopId"
          :value="stopObj.title"
          v-model="store.checkedStops"
          @change="saveCheckedStops()"
        />
      </div>

      <!-- Colonna titolo della tappa e descrizione -->
      <div class="col-md-7">
        <div class="card-body">
          <h5 class="card-title">{{ stopObj.title }}</h5>
          <p class="card-text">{{ stopObj.description }}</p>
        </div>
      </div>

      <!-- Colonna immagine della tappa -->
      <div class="col-md-4 img-box">
        <img
          :src="getImgPath(stopObj.img)"
          class="img-fluid rounded-start rounded-end"
          :alt="stopObj.title"
        />
      </div>
    </div>

    <div class="row g-0">
      <div class="col-md-1"></div>
      <div class="col-md-11 note-box">
        <div class="input-group mb-5">
          <span class="input-group-text"
            ><i class="fa-solid fa-note-sticky"></i
          ></span>
          <textarea
            class="form-control"
            name="note"
            :id="stopId"
            v-model="store.notes[store.locationsName.indexOf(stopObj.title)]"
            @change="saveNotes()"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../assets/scss/partials/variables";

.card-custom {
  background-color: transparent;
  border: none;

  .note-box {
    padding-left: 16px;
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
