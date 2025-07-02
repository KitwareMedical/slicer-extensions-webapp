<script lang="ts">
import {
  defineComponent, PropType, computed,
} from '@vue/composition-api';
import {
  useRoute, useRouter,
} from 'vue2-helpers/vue-router';
import { Extension } from '@/lib/api/extension.service';
import ActionButton from '@/components/ActionButton.vue';

const ExtensionDefaultIconUrl = process.env.VUE_APP_EXTENSION_DEFAULT_ICON_URL as string;

export default defineComponent({
  name: 'ExtensionCard',

  props: {
    extension: {
      type: Object as PropType<Extension>,
      required: true,
    },
    maxDescriptionLength: {
      type: Number as PropType<number>,
      default: 140,
    },
    legacy: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },

  components: { ActionButton },

  setup(props) {
    const route = useRoute();
    const router = useRouter();

    const iconUrl = computed(() => props.extension.meta.icon_url || ExtensionDefaultIconUrl);
    const description = computed(() => {
      const desc = props.extension.meta.description;
      if (desc.length > props.maxDescriptionLength) {
        return desc.slice(0, props.maxDescriptionLength).concat('...');
      }
      return desc;
    });
    const detailsRoute = computed(() => {
      if (props.legacy) {
        // Remove `category` from query
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { category, ...queryWithoutCategory } = route.query;
        return {
          name: 'Extension Details Legacy',
          query: {
            baseName: props.extension.meta.baseName,
            ...queryWithoutCategory,
          },
        };
      }
      // Remove `category` from params
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { category, ...paramsWithoutCategory } = route.params;
      return {
        name: 'Extension Details',
        params: {
          baseName: props.extension.meta.baseName,
          ...paramsWithoutCategory,
        },
      };
    });
    const goToDetails = () => {
      router.push(detailsRoute.value);
    };
    return {
      iconUrl,
      description,
      detailsRoute,
      goToDetails,
    };
  },
});
</script>

<template>
  <v-card flat class="extension-container d-flex flex-column">
    <router-link :to="detailsRoute">
      <img
        width="100%"
        class="thumbnail"
        :src="iconUrl"
      >
    </router-link>
    <v-card-title
      class="text-subtitle-1 font-weight-bold pt-2"
    >
      <router-link
        class="extension-title"
        :to="detailsRoute"
      >
        {{ extension.title }}
      </router-link>
    </v-card-title>
    <v-card-subtitle> {{ extension.meta.category }} </v-card-subtitle>
    <v-card-text class="extension-description pb-0"> {{ description }} </v-card-text>
    <v-spacer />
    <v-card-actions>
      <v-spacer />
      <action-button outlined
        :extension="extension"
        :ref="'extension-action-button-' + extension.meta.baseName"
      />
    </v-card-actions>
  </v-card>
</template>

<style lang="scss" scoped>
$width: 240px;

.extension-container {
  width: $width;
  height: 475px;
}
.extension-title {
  color: var(--v-primary-darken2);
  white-space: nowrap;
  text-overflow: ellipsis;
  text-decoration: none;
  overflow: hidden;
}
.thumbnail {
  object-fit: cover;
  border-radius: 32px;
  height: $width;
}
</style>
