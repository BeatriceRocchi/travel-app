<script>
import { store } from "../data/store";
import StopCard from "./partials/StopCard.vue";
import Aside from "./Aside.vue";
import Map from "./partials/Map.vue";

export default {
  data() {
    return {
      store,
    };
  },
  components: {
    StopCard,
    Aside,
    Map,
  },
};
</script>

<template>
  <main>
    <div class="d-lg-flex">
      <Aside />
      <div class="travel-wrapper">
        <ul v-for="(dayTrip, id) in store.USATrip" :key="id">
          <h4>{{ dayTrip.date }} | {{ dayTrip.title }}</h4>
          <li v-for="(stop, stopId) in dayTrip.stops" :key="stopId">
            <StopCard :stopObj="stop" :stopId="stopId" :dayId="id" />
          </li>
        </ul>
      </div>
    </div>
  </main>

  <button
    type="button"
    class="map-button d-lg-none"
    data-bs-toggle="modal"
    data-bs-target="#mapModal"
  >
    <i class="fa-solid fa-map-location-dot"></i>
  </button>

  <!-- Modal -->
  <div
    class="modal fade modal-custom"
    id="mapModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title modal-title-custom" id="exampleModalLabel">
            Mappa
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <Map />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/scss/partials/variables";

.travel-wrapper {
  height: calc(100vh - 80px);
  overflow-y: auto;
  padding: 20px;
  width: 100%;
  background-color: rgba($secondary-color, 0.15);
}

.map-button {
  position: absolute;
  text-align: center;
  bottom: 0;
  right: 0;
  margin: 10px;
  border-radius: 6px;
  border: none;

  color: white;
  background-color: $secondary-color;

  i {
    font-size: 1.5rem;
    padding: 8px;
  }
}

.modal-custom {
  height: 600px;

  .modal-title-custom {
    color: $primary-color;
  }

  .modal-dialog {
    height: 80%;

    .modal-content {
      height: 80%;
    }
  }
}
</style>
