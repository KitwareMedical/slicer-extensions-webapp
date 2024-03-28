<template>
<v-row align="center" justify="center">
    <v-col cols="10">
        <v-row align="center" justify="center">
            <v-col cols="12" md="6" xl="8">
                <h1 class="display-2 font-weight-bold mb-4">Slicer Extensions Manager</h1>
                <h1 class="font-weight-light">
                The Slicer community maintains this website for finding and downloading over
                150 extensions.
                An extension is a delivery package bundling together one or more Slicer modules.
                After installing an extension, the associated modules will be presented to the user
                the same way as built-in modules.
                </h1>
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
                <v-btn
                    rounded
                    outlined
                    large
                    to="/catalog"
                    class="mt-5"
                    disabled
                >
                    Browse Extensions
                </v-btn>
            </v-col>
            <v-col cols="12" md="6" xl="4" class="hidden-sm-and-down"> </v-col>
        </v-row>
    </v-col>
</v-row>
</template>
