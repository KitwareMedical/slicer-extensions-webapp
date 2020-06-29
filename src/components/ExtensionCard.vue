<script lang="ts">
import Vue, { PropType } from 'vue';
import { Location } from 'vue-router';

import { Extension } from '../lib/api/extension.service';

export default Vue.extend({
  props: {
    extension: {
      type: Object as PropType<Extension>,
      required: true,
    },
    defaultImageUrl: {
      type: String as PropType<string>,
      default: 'https://download.slicer.org/static/img/slicer-logo-500.png',
    },
    maxDescriptionLength: {
      type: Number as PropType<number>,
      default: 140,
    },
  },
  computed: {
    iconUrl(): string {
      return this.extension.meta.icon_url || this.defaultImageUrl;
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
        class="success--text extension-title"
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
      <v-btn outlined block color="success">
        <v-icon class="pr-1"> mdi-download </v-icon>
        Download
      </v-btn>
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
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.thumbnail {
  object-fit: cover;
  border-radius: 32px;
  height: $width;
}
</style>
