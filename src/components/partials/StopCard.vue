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
  <div class="card card-custom mb-4">
    <div class="row g-0">
      <!-- Colonna id della tappa e check per mappare progressione -->
      <div class="col-md-1 d-flex flex-column align-items-center stop-id-box">
        <i class="fa-solid fa-location-pin"></i>
        <p class="id">{{ store.locationsName.indexOf(stopObj.title) + 1 }}</p>

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

      <!-- Colonna titolo della tappa, descrizione e note -->
      <div class="col-md-7">
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <h5 class="card-title">{{ stopObj.title }}</h5>
            <div>
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
          <p class="card-text">{{ stopObj.description }}</p>

          <div class="d-flex align-items-center">
            <i class="fa-solid fa-note-sticky icon-custom"></i>
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

      <!-- Colonna immagine della tappa e attività -->
      <div class="col-md-4">
        <div class="img-box">
          <img
            :src="getImgPath(stopObj.img)"
            class="img-fluid rounded-start rounded-end"
            :alt="stopObj.title"
          />
        </div>

        <ul class="activities-box">
          <li v-for="(activity, id) in stopObj.activities" :key="id">
            <i :class="activity"></i>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../assets/scss/partials/variables";

.card-custom {
  background-color: transparent;
  border: none;

  .icon-custom {
    font-size: 1.6rem;
    padding: 10px;
    margin-right: 10px;
    border-radius: 6px;
    color: white;
    background-color: $secondary-color;
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

  .activities-box {
    display: flex;
    justify-content: center;
    align-items: center;

    i {
      color: $primary-color;
      padding: 10px 8px;
      font-size: 1.5rem;
    }
  }

  .fa-star {
    color: white;

    &.full {
      color: $vote-color;
    }
    &.empty {
      color: white;
    }
  }
}
</style>
