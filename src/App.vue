<script>
import Header from "./components/Header.vue";
import Main from "./components/Main.vue";
import Map from "./components/partials/Map.vue";
import { store } from "./data/store";

export default {
  components: {
    Header,
    Main,
    Map,
  },
  data() {
    return {
      store,
      firstNotChecked: "",
    };
  },
  mounted() {
    if (localStorage.checkedStops) {
      store.checkedStops = localStorage.checkedStops.split(",");

      this.firstNotChecked = store.locationsName.find(
        (location) => !store.checkedStops.includes(location)
      );

      let firstNotCheckedElement = document
        .querySelector(`input[value="${this.firstNotChecked}"]`)
        ?.closest(".card-custom");
      firstNotCheckedElement.scrollIntoView();
    }

    if (localStorage.notes) {
      store.notes = localStorage.notes.split(",");
    }

    if (localStorage.votes) {
      store.votes = localStorage.votes.split(",");
    }
  },
};
</script>

<template>
  <div class="d-flex justify-content-between">
    <div class="content-wrapper w-100">
      <Header />
      <Main />
    </div>

    <div class="d-none d-lg-block map-wrapper">
      <Map />
    </div>
  </div>
</template>

<style lang="scss">
@use "./assets/scss/main.scss";

.map-wrapper {
  height: 100vh;
  width: 40%;
  flex-shrink: 0;
}
</style>
