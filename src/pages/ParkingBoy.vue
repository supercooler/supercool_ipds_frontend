<template>
  <div>
    <search-bar></search-bar>
    <list></list>
    <modify-form></modify-form>
  </div>
</template>

<script>
import SearchBar from "../components/parkingBoys/SearchBar.vue";
import List from "../components/parkingBoys/List.vue";
import ModifyForm from "../components/parkingBoys/ModifyForm.vue";
export default {
  components: {
    SearchBar,
    List,
    ModifyForm
  }
};
</script>
