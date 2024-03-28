<script lang="ts">
import Vue, { PropType } from 'vue';

import { getLatestPackageRevision, OS } from '@/lib/api/extension.service';

const AppId = process.env.VUE_APP_APP_ID as string;

interface OperatingSystemToRevisionMapping {
  linux: string | null;
  macosx: string | null;
  win: string | null;
}

export default Vue.extend({
  props: {
    category: {
      type: String as PropType<string>,
      required: true,
    },
  },

  data() {
    return {
      revisionByOperatingSystems: {
        linux: null,
        macosx: null,
        win: null,
      } as OperatingSystemToRevisionMapping,
    };
  },

  methods: {
    async setRevisionByOperatingSystems() {
      this.revisionByOperatingSystems = {
        linux: await getLatestPackageRevision({ appId: AppId, os: OS.linux, arch: undefined }),
        macosx: await getLatestPackageRevision({ appId: AppId, os: OS.macosx, arch: undefined }),
        win: await getLatestPackageRevision({ appId: AppId, os: OS.windows, arch: undefined }),
      };
    },
  },

  activated() {
    this.setRevisionByOperatingSystems();
  },

});

</script>

<template>
  <v-container
    fluid
  >
    <v-alert
      outlined
      prominent
      text
      type="warning"
    >
      <h2>We&rsquo;ll be back very soon! Scheduled maintenance happening
      on March 28th, 2024.</h2>
      <h4>
      Sorry for the inconvenience, but we are performing some maintenance at the moment.
      If you have questions or would like to learn more, see <a href="https://discourse.slicer.org/t/maintenance-of-download-slicer-org-slicer-kitware-com-and-slicer-packages-kitware-com-planned-for-march-28th-2024-3-30pm-to-5-00pm-et/35155">here</a>, otherwise we anticipate the maintenance to last for approximately 1.5 hours, from 3:30 PM to 5:00 PM ET on March 28th, 2024.
      </h4>
    </v-alert>
  </v-container>
</template>
