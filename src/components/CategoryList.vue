<script lang="ts">
import Vue, { PropType } from 'vue';

export default Vue.extend({
  props: {
    categories: {
      type: Array as PropType<string[]>,
      default: () => [
        'All',
        'Applications',
        'Cardiac',
        'Chest Imaging Platform',
        'Converters',
      ],
    },
  },
});
</script>
<template>
  <v-list>
    <v-list-item
      v-for="category in categories"
      :key="category"
      :to="{ name: 'Catalog', params: { category } }"
    >
      <v-list-item-title> {{ category }} </v-list-item-title>
    </v-list-item>
  </v-list>
</template>
