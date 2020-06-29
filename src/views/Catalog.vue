<script lang="ts">
import Vue, { PropType } from 'vue';
import { getCategories } from '@/lib/utils';
import {
  OS, Arch, Extension, listExtensions, ListExtensionsParams,
} from '@/lib/api/extension.service';

import ExtensionCard from '@/components/ExtensionCard.vue';
import CategoryList from '@/components/CategoryList.vue';

const AppId = process.env.VUE_APP_APP_ID as string;

export default Vue.extend({
  props: {
    category: {
      type: String as PropType<string>,
      required: true,
    },
    revision: {
      type: String as PropType<string>,
      required: true,
    },
    os: {
      type: String as PropType<OS>,
      required: true,
    },
    arch: {
      type: String as PropType<Arch|undefined>,
      default: undefined,
    },
  },

  components: {
    CategoryList,
    ExtensionCard,
  },

  data() {
    return {
      extensions: [] as Extension[],
      categories: [] as [string, number][],
    };
  },

  computed: {
    listParams(): ListExtensionsParams {
      return {
        appId: AppId,
        revision: parseInt(this.revision, 10),
        os: this.os,
        arch: this.arch,
      };
    },
    valid(): string {
      if (!(this.os in OS)) {
        return `Invalid OS.  Choose one of ${Object.keys(OS)}`;
      }
      if (this.arch !== undefined && !(this.arch in Arch)) {
        return `Invalid architecutre.  Choose one of ${Object.keys(Arch)}`;
      }
      return '';
    },
    filteredExtensions(): Extension[] {
      if (this.category.toLowerCase() !== 'all') {
        return this.extensions.filter((e) => e.meta.category === this.category);
      }
      return this.extensions;
    },
  },

  methods: {
    async updateExtensions() {
      const { data } = await listExtensions(this.listParams);
      this.extensions = data;
      this.categories = ([['All', -1]] as [string, number][]).concat(getCategories(data));
    },
  },

  watch: {
    listParams() {
      this.updateExtensions();
    },
  },

  created() {
    this.updateExtensions();
  },
});
</script>

<template>
<v-container fluid class="catalog">
  <v-row style="height: 100%">
    <v-col
      class="flex-grow-0"
      style="height: 100%"
    >
      <category-list
        class="category-list"
        :categories="categories"
      />
    </v-col>
    <v-col style="height: 100%">
      <v-row class="overflow-scroll justify-begin">
        <extension-card
          v-for="extension in filteredExtensions"
          :key="extension._id"
          v-bind="{ extension }"
          class="ma-3"
        />
      </v-row>
    </v-col>
  </v-row>
</v-container>
</template>

<style scoped>
.catalog {
  height: 100vh;
  overflow: hidden;
}
.category-list {
  width: 250px;
}
</style>
