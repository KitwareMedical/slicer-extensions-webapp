<script lang="ts">
import {
  computed, defineComponent, PropType, shallowRef, toRefs, watch,
} from '@vue/composition-api';
import {
  Extension, getExtension, OS, Arch,
} from '@/lib/api/extension.service';
import Bus from '@/plugins/bus';

import AppBar from '@/components/AppBar.vue';
import ActionButton from '@/components/ActionButton.vue';

const AppId = process.env.VUE_APP_APP_ID as string;

export default defineComponent({
  props: {
    baseName: {
      type: String as PropType<string>,
      default: undefined,
    },
    revision: {
      type: String as PropType<string|undefined>,
      default: undefined,
    },
    os: {
      type: String as PropType<OS|undefined>,
      default: undefined,
    },
    arch: {
      type: String as PropType<Arch|undefined>,
      default: undefined,
    },
    id: {
      type: String as PropType<Arch|undefined>,
      default: undefined,
    },
  },

  components: {
    ActionButton,
    AppBar,
  },

  setup(props, { root }) {
    const propsRefs = toRefs(props);
    const extension = shallowRef(null as Extension | null);

    async function loadExtension() {
      extension.value = await getExtension({
        appId: AppId,
        baseName: props.baseName,
        revision: props.revision ? parseInt(props.revision, 10) : undefined,
        os: props.os,
        arch: props.arch,
        id: props.id,
      });
    }

    loadExtension();

    Bus.$on('extension-state-updated', (extensionName: string) => {
      if (extensionName === extension.value?.title) {
        loadExtension();
      }
    });

    watch([
      propsRefs.baseName,
      propsRefs.revision,
      propsRefs.os,
      propsRefs.arch,
      propsRefs.id,
    ], loadExtension);

    const selectedOs = computed({
      get(): string {
        return root.$route.params.os;
      },
      set(os: string): void {
        const { query } = root.$route;
        const location = { name: 'Extension Details', params: { os }, query };
        root.$router.push(location).catch((error) => {
          if (error.name !== 'NavigationDuplicated') {
            throw error;
          }
        });
      },
    });

    const screenshotsAsList = () => extension.value?.meta.screenshots.split(' ');

    const hasOperatingSystemProp = computed(() => props.os !== undefined);

    return {
      extension,
      hasOperatingSystemProp,
      screenshotsAsList,
      selectedOs,
    };
  },
});
</script>

<template>
<v-container>
  <app-bar
    class="app-bar"
    :show-operating-system-selector="hasOperatingSystemProp"
    :default-os="os"
    @update:os="selectedOs = $event"
  />
  <v-row v-if="extension">
    <v-col cols="3">
      <img
        :src="extension.meta.icon_url"
        width="100%"
      >
      <action-button
        :extension="extension"
        class="my-3"
      />
    </v-col>
    <v-divider vertical class="mx-5"/>
    <v-col cols="8">
      <div class="text-h3 mb-3"> {{ extension.title }} </div>
      <div class="text-h6 mb-2"> {{ extension.meta.category }} </div>
      <div class="text-subtitle-1 mb-2"> {{ extension.meta.contributors }} </div>
      <div class="text-subtitle-1 mb-2">
        Published on {{ new Date(extension.created).toDateString() }}
      </div>
      <div class="text-subtitle-1"> {{ extension.meta.description }} </div>
      <v-btn
        outlined
        class="my-3 mr-3"
        :href="extension.meta.homepage"
      >
        <v-icon class="pr-1"> mdi-home </v-icon>
        View Homepage
      </v-btn>
      <v-btn
        outlined
        class="my-3 mr-3"
        :href="extension.meta.repository_url"
      >
        <v-icon class="pr-1"> mdi-code-tags </v-icon>
        View Source Code
      </v-btn>

      <div v-if="screenshotsAsList()">
        <div class="text-h6 mb-4"> Screenshots </div>
        <v-carousel>
          <v-carousel-item
            v-for="(url,i) in screenshotsAsList()"
            :key="i"
            :src="url"
            reverse-transition="fade-transition"
            transition="fade-transition"
          ></v-carousel-item>
        </v-carousel>
      </div>

    </v-col>
  </v-row>
</v-container>
</template>
