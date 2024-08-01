<script>
import { store } from "../data/store";
import StopCard from "./partials/StopCard.vue";
import Aside from "./Aside.vue";

export default {
  data() {
    return {
      store,
    };
  },
  components: {
    StopCard,
    Aside,
  },
};
</script>

<template>
  <main>
    <div class="d-md-flex">
      <Aside />
      <div class="travel-wrapper">
        <ul v-for="(dayTrip, id) in store.USATrip" :key="id">
          <h4>{{ dayTrip.date }} | {{ dayTrip.title }}</h4>
          <li v-for="(stop, id) in dayTrip.stops" :key="id">
            <StopCard :stopObj="stop" :stopId="id" />
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@import "../assets/scss/partials/variables";

.travel-wrapper {
  height: calc(100vh - 80px);
  overflow-y: auto;
  padding: 20px 30px;
  width: 100%;
  background-color: rgba($secondary-color, 0.15);
}
</style>
