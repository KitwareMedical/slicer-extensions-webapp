<script lang="ts">
import Vue, { PropType } from 'vue';

export default Vue.extend({
  props: {
    categories: {
      type: Array as PropType<[string, number][]>,
      required: true,
    },
    legacy: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },

  methods: {
    goTo(category: string) {
      const { query } = this.$route;
      if (this.legacy) {
        this.$router.replace({ query: { ...query, category } }).catch((error) => {
          if (error.name !== 'NavigationDuplicated') {
            throw error;
          }
        });
        return;
      }
      const location = { name: 'Catalog', params: { category }, query: { q: query.q } };
      this.$router.push(location).catch((error) => {
        if (error.name !== 'NavigationDuplicated') {
          throw error;
        }
      });
    },
  },
});
</script>
<template>
  <v-col
    class="pa-0 d-flex flex-column"
    style="height: 100%"
  >
    <div class="title mb-4"> Categories </div>
    <v-list class="py-0 overflow-scroll">
      <v-list-item
        v-for="category in categories"
        :key="category[0]"
        :value="category[0]"
        @click="goTo(category[0])"
      >
        <v-list-item-title> {{ category[0] }}
          <template v-if="category[1] >= 0">
            ({{ category[1] }})
          </template>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-col>
</template>
