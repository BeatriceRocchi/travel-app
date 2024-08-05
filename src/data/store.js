import { reactive } from "vue";
import { USATrip } from "./db.json";

export const store = reactive({
  USATrip,
  locationsName: [],
  checkedStops: [],
  notes: [],
  firstNotChecked: "Union Square",
});
