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
                </h1>
                <h1 class="font-weight-light">
                Once installed, the associated modules appear in Slicer just like built-in ones.
                To install extensions directly from within Slicer, use the <a href="https://slicer.readthedocs.io/en/latest/user_guide/extensions_manager.html">Extensions Manager</a> interface, which integrates an augmented version of this site.
                </h1>
                <v-divider class="mt-5 mb-5"/>
                <h2 class="font-weight-light">
                Alternatively, extension packages downloaded from this site can be installed later using the <a href="https://slicer.readthedocs.io/en/latest/user_guide/extensions_manager.html#install-downloaded-extension-packages">Install from file</a> feature, also available in the Extensions Manager.
                </h2>
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
