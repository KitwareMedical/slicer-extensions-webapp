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
                <v-btn
                    rounded
                    outlined
                    large
                    to="/catalog"
                    class="mt-5"
                >
                    Browse Extensions
                </v-btn>
            </v-col>
            <v-col cols="12" md="6" xl="4" class="hidden-sm-and-down"> </v-col>
        </v-row>
    </v-col>
</v-row>
</template>
