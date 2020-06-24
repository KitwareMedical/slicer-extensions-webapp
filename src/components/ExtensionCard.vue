<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    title: String,
    creatorId: String,
    description: String,
  },
});
</script>

<template>
  <v-card outlined class="extension-container">
    <img
      width="100%"
      style="object-fit: cover; height: 240px;"
      src="https://download.slicer.org/static/img/slicer-logo-500.png"
    >
    <v-card-title
      class="text-subtitle-1 font-weight-bold extension-title"
    >
      <span>{{ title }}</span>
    </v-card-title>
    <v-card-subtitle> {{ creatorId }} </v-card-subtitle>
    <v-card-text> {{ description }}</v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn text color="success">
        Download
        <v-icon class="pl-1"> mdi-download </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.extension-container {
  width: 240px;
}
.extension-title span {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
