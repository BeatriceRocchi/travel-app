<script>
import { store } from "../data/store";

export default {
  data() {
    return {
      store,
    };
  },
};
</script>

<template>
  <aside class="d-flex h-auto justify-content-center">
    <div class="accordion accordion-custom" id="accordionPanelsStayOpenExample">
      <div class="accordion-item accordion-item-custom">
        <h2 class="accordion-header">
          <button
            class="accordion-button accordion-button-custom rounded-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#panelsStayOpen-collapseOne"
            aria-expanded="true"
            aria-controls="panelsStayOpen-collapseOne"
          >
            Sintesi
          </button>
        </h2>
        <div
          id="panelsStayOpen-collapseOne"
          class="accordion-collapse collapse"
        >
          <div class="accordion-body accordion-body-custom">
            <p>
              Alla scoperta degli Stati Uniti Occidentali. Visita le eclettiche
              città di San Francisco e Los Angeles, lasciati affascinare
              dall'imponenza dello Yosemite, immergiti nella natura camminando
              nel Grand Canyon e nello Zion Park e fatti travolgere dalle luci
              di Las Vegas.
            </p>
          </div>
        </div>
      </div>
      <div class="accordion-item accordion-item-custom">
        <h2 class="accordion-header">
          <button
            class="accordion-button accordion-button-custom rounded-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#panelsStayOpen-collapseTwo"
            aria-expanded="true"
            aria-controls="panelsStayOpen-collapseTwo"
          >
            Itinerario
          </button>
        </h2>
        <div
          id="panelsStayOpen-collapseTwo"
          class="accordion-collapse collapse"
        >
          <div class="accordion-body accordion-body-custom">
            <ul>
              <li v-for="(dayTrip, id) in store.USATrip" :key="id" class="mb-3">
                {{ dayTrip.date }} <br />
                <span class="day-title">{{ dayTrip.title }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
@import "../assets/scss/partials/variables";
aside {
  min-width: 250px;
  height: calc(100vh - 80px);
  overflow-y: auto;

  .accordion-custom {
    width: 100%;
  }

  .accordion-item-custom {
    border: none;
    margin: 12px;
  }

  .accordion-button-custom {
    background-color: $secondary-color;
    color: white;

    &:after {
      background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23ffffff'><path fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/></svg>");
    }

    &:focus {
      box-shadow: none;
    }
  }

  .accordion-body-custom {
    color: black;
    padding: 8px;
    font-size: 0.9rem;

    .day-title {
      font-size: 0.7rem;
    }
  }
}

@media all and (min-width: 1024px) {
  .accordion-custom {
    max-width: 250px;
  }
}
</style>
