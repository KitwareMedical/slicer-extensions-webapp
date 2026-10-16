<script lang="ts">
import {
  defineComponent, PropType,
} from '@vue/composition-api';
import { hasExtensionManagerModel } from '@/lib/api/extension.service';
import { Platform, platforms, findPlatform } from '@/lib/platforms';

export default defineComponent({
  name: 'AppBar',

  props: {
    defaultOs: {
      type: String as PropType<string>,
      required: true,
    },
    defaultArch: {
      type: String as PropType<string>,
      default: undefined,
    },
    defaultQuery: {
      type: String as PropType<string>,
    },
    showQueryField: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    showOperatingSystemSelector: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    legacy: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },

  data() {
    return {
      platform: findPlatform(this.defaultOs, this.defaultArch)?.key,
      query: this.defaultQuery,
    };
  },

  activated() {
    this.platform = findPlatform(this.defaultOs, this.defaultArch)?.key;
  },

  methods: {
    onPlatformChange(key: string) {
      const platform = platforms.find((p) => p.key === key);
      if (platform) {
        this.$emit('update:platform', { os: platform.os, arch: platform.arch });
      }
    },
  },

  computed: {
    hasExtensionManagerModel(): boolean {
      return hasExtensionManagerModel();
    },
    operatingSystems(): Platform[] {
      return platforms;
    },
  },
});
</script>

<template>
  <v-app-bar
    v-if="!hasExtensionManagerModel"
    app
    >
    <v-app-bar-title>Slicer Extensions Manager</v-app-bar-title>
    <v-text-field
      v-if="showQueryField"
      v-model="query"
      @input="$emit('update:query', $event);"
      class="shrink mx-4"
      hide-details
      light
      placeholder="Type text..."
      prepend-inner-icon="mdi-magnify"
      single-line
      solo
      text="yes"
      />
    <v-spacer></v-spacer>
    <v-select
      v-if="showOperatingSystemSelector"
      v-model="platform"
      @change="onPlatformChange"
      class="shrink mx-4"
      hide-details
      solo
      :items="operatingSystems"
      item-value="key"
    >
      <template v-slot:selection="data">
        <v-list-item-icon><v-icon>{{ data.item.icon }}</v-icon></v-list-item-icon>
        <v-list-item-title>{{ data.item.text }}</v-list-item-title>
      </template>
      <template v-slot:item="data">
        <v-list-item-icon><v-icon>{{ data.item.icon }}</v-icon></v-list-item-icon>
        <v-list-item-title>{{ data.item.text }}</v-list-item-title>
      </template>
    </v-select>
  </v-app-bar>
</template>
