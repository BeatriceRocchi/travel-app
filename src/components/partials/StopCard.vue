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
      vote: 0,
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

    setVote(n) {
      this.vote = n;
      store.votes[this.stopId] = n;
      localStorage.setItem("votes", store.votes);
    },
  },

  computed: {
    checkedClass() {
      if (store.checkedStops.includes(this.stopObj.title)) {
        return "checked";
      }
    },
  },
};
</script>

<template>
  <div class="card card-custom my-4">
    <div class="row g-0">
      <!-- Colonna id della tappa e check per mappare progressione -->
      <div
        class="col-12 col-md-1 order-0 d-flex align-items-center justify-content-md-center align-items-md-start"
      >
        <div class="d-flex flex-column align-items-center stop-id-box">
          <i class="fa-solid fa-location-pin"></i>
          <p class="id">{{ store.locationsName.indexOf(stopObj.title) + 1 }}</p>
        </div>
        <h5 class="card-title ps-3 m-0 d-md-none">{{ stopObj.title }}</h5>
      </div>

      <!-- Colonna titolo della tappa, descrizione, voto e note -->
      <div class="col-md-7 order-2 order-md-1">
        <div class="card-body">
          <div class="mb-2">
            <h5 class="card-title d-none d-md-block">
              {{ stopObj.title }}
            </h5>
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center">
                <input
                  class="form-check-input stop-check"
                  :checked="checkedClass"
                  type="checkbox"
                  name="checkStop"
                  :id="stopId"
                  :value="stopObj.title"
                  v-model="store.checkedStops"
                  @change="saveCheckedStops()"
                />
                <label
                  v-if="store.checkedStops.includes(stopObj.title)"
                  for="checkStop"
                  class="form-check-label label-custom"
                  >Visitato</label
                >
              </div>
              <div v-if="store.checkedStops.includes(stopObj.title)">
                <i
                  v-for="n in 5"
                  :key="n"
                  class="fa-star fa-solid"
                  :class="{
                    full: n <= store.votes[stopId],
                    empty: n > store.votes[stopId],
                  }"
                  @click="setVote(n)"
                ></i>
              </div>
            </div>
          </div>
          <p class="card-text card-text-custom">{{ stopObj.description }}</p>

          <div class="d-flex align-items-center">
            <i
              class="fa-solid fa-note-sticky icon-custom d-none d-md-block"
            ></i>
            <textarea
              class="form-control"
              name="note"
              placeholder="Aggiungi note..."
              :id="stopId"
              v-model="store.notes[store.locationsName.indexOf(stopObj.title)]"
              @change="saveNotes()"
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Colonna immagine della tappa e attività -->
      <div class="col-md-4 order-1 order-md-2">
        <div class="img-box">
          <img
            :src="getImgPath(stopObj.img)"
            class="img-fluid rounded-start rounded-end"
            :alt="stopObj.title"
          />
        </div>
        <!-- 
        <ul class="activities-box">
          <li v-for="(activity, id) in stopObj.activities" :key="id">
            <i :class="activity"></i>
          </li>
        </ul> -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../assets/scss/partials/variables";

.card-custom {
  background-color: transparent;
  border: none;

  .card-body {
    padding-top: 0;
  }

  .icon-custom {
    font-size: 1rem;
    padding: 10px;
    margin-right: 10px;
    border-radius: 6px;
    color: white;
    background-color: $secondary-color;
  }

  .img-box {
    overflow: hidden;
    height: 220px;
    padding: 16px;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  // .activities-box {
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;

  //   i {
  //     color: $primary-color;
  //     padding: 10px 8px;
  //     font-size: 1.5rem;
  //   }
  // }

  .fa-star {
    color: white;
    font-size: 0.8rem;

    &.full {
      color: $vote-color;
    }
    &.empty {
      color: white;
    }
  }

  @media all and (min-width: 768px) {
  }

  @media all and (min-width: 1440px) {
    .fa-star {
      font-size: 1rem;
    }

    .icon-custom {
      font-size: 1.4rem;
    }
  }
}
</style>
