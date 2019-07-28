<template>
  <div>
    <add-button class="addButton"></add-button>
    <search-bar class="searchBar"></search-bar>
    <list></list>
    <modify-form></modify-form>
  </div>
</template>

<script>
import AddButton from "../components/parkingBoys/AddButton.vue";
import SearchBar from "../components/parkingBoys/SearchBar.vue";
import List from "../components/parkingBoys/List.vue";
import ModifyForm from "../components/parkingBoys/ModifyForm.vue";
export default {
  components: {
    AddButton,
    SearchBar,
    List,
    ModifyForm
  }
};
</script>
<style scoped>
.addButton {
  float: left;
}
.searchBar {
  float: right;
}
</style>
