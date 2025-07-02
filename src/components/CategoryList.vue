<script lang="ts">
import {
  defineComponent, PropType,
} from '@vue/composition-api';
import {
  useRoute, useRouter,
} from 'vue2-helpers/vue-router';

export default defineComponent({
  name: 'CategoryList',

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

  setup(props) {
    const route = useRoute();
    const router = useRouter();

    const goTo = (category: string) => {
      const { query } = route;
      if (props.legacy) {
        router.replace({ query: { ...query, category } }).catch((error: Error) => {
          if (error.name !== 'NavigationDuplicated') {
            throw error;
          }
        });
        return;
      }
      const location = { name: 'Catalog', params: { category }, query: { q: query.q } };
      router.push(location).catch((error: Error) => {
        if (error.name !== 'NavigationDuplicated') {
          throw error;
        }
      });
    };
    return { goTo };
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
