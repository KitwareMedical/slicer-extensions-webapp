<script lang="ts">
import Vue, { PropType } from 'vue';
import { getCategories } from '@/lib/utils';
import {
  OS, Arch, Extension, InstallState, hasExtensionManagerModel, listExtensions,
} from '@/lib/api/extension.service';

import AppBar from '@/components/AppBar.vue';
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
    AppBar,
    CategoryList,
    ExtensionCard,
  },

  /**
   * Typescript doesn't support asyncComputed properly.
   * This section replicates the type declarations of
   * the actual values in asyncComputed.  Because it's a plugin
   * asyncComputed's values will override these.
   */
  data() {
    return {
      extensions: [] as Extension[],
      query: this.$route.query.q,
    };
  },

  asyncComputed: {
    extensions: {
      async get(): Promise<Extension[]> {
        const params = {
          appId: AppId,
          revision: parseInt(this.revision, 10),
          os: this.os,
          arch: this.arch,
          query: this.query,
        };
        const { data } = await listExtensions(params);
        this.$router.push({ name: 'Catalog', query: { q: this.query } }).catch((error) => {
          if (error.name !== 'NavigationDuplicated') {
            throw error;
          }
        });
        return data;
      },
      default: [] as Extension[],
    },
  },

  computed: {
    categories(): [string, number][] {
      return ([['All', this.extensions.length]] as [string, number][]).concat(getCategories(this.extensions));
    },
    filteredExtensions(): Extension[] {
      if (this.category.toLowerCase() !== 'all') {
        return this.extensions.filter((e) => e.meta.category === this.category);
      }
      return this.extensions;
    },
    hasExtensionManagerModel(): boolean {
      return hasExtensionManagerModel();
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
    selectedOs: {
      get(): string {
        return this.$route.params.os;
      },
      set(os: string): void {
        this.$router.push({ name: 'Catalog', params: { os } }).catch((error) => {
          if (error.name !== 'NavigationDuplicated') {
            throw error;
          }
        });
      },
    },
  },

  methods: {
    setExtensionButtonState(extensionName: string, installState: keyof typeof InstallState) {
      console.log(`Catalog: setExtensionButtonState: ${extensionName} InstallState[${InstallState[installState]}]`);
    },
  },

  watch: {
    query(newVal, oldVal) {
      if (newVal !== oldVal) {
        /* See https://github.com/vuejs/vetur/issues/1754#issuecomment-595256501 */
        /* eslint-disable @typescript-eslint/no-explicit-any */
        const appbar = this.$refs.appbar as any;
        appbar.query = newVal;
      }
    },
  },
});
</script>

<template>
  <v-container
    fluid
    class="catalog"
  >
    <app-bar
      ref="appbar"
      show-query-field
      class="app-bar"
      :default-os="os"
      :default-query="query"
      :query.sync="query"
      :os.sync="selectedOs"
    />
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
