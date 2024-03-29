<script lang="ts">
import Vue, { PropType } from 'vue';
import { Location } from 'vue-router';
import { Extension } from '@/lib/api/extension.service';

import ActionButton from '@/components/ActionButton.vue';

const ExtensionDefaultIconUrl = process.env.VUE_APP_EXTENSION_DEFAULT_ICON_URL as string;

export default Vue.extend({
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

  computed: {
    iconUrl(): string {
      return this.extension.meta.icon_url || ExtensionDefaultIconUrl;
    },
    description(): string {
      const { description } = this.extension.meta;
      if (description.length > this.maxDescriptionLength) {
        return description.slice(0, this.maxDescriptionLength).concat('...');
      }
      return this.extension.meta.description;
    },
    detailsRoute(): Location {
      const { currentRoute } = this.$router;
      if (this.legacy) {
        return {
          name: 'Extension Details Legacy',
          query: {
            baseName: this.extension.meta.baseName,
            ...currentRoute.query,
          },
        };
      }
      return {
        name: 'Extension Details',
        params: {
          baseName: this.extension.meta.baseName,
          ...currentRoute.params,
        },
      };
    },
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
