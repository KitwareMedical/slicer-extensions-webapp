<template>
  <v-container
    fluid
  >
    <v-app-bar
      app
      >
      <v-app-bar-title>Slicer DataStore</v-app-bar-title>
    </v-app-bar>
    <v-alert
      color="red"
      icon="mdi-alert-circle-outline"
      outlined
      prominent
      text
    >
      The DataStore module has been retired in March 2020.
    </v-alert>
    <v-alert
      color="green"
      icon="mdi-lightbulb-on-outline"
      outlined
      prominent
      text
      type="info"
    >
      <v-row align="center">
        <v-col class="grow">
          Data files are now stored as release assets into
          the Slicer/SlicerDataStore GitHub project.
        </v-col>
        <v-col class="shrink">
          <v-btn
            href="https://github.com/Slicer/SlicerDataStore/releases/tag/SHA256"
          >
            Browse Data
          </v-btn>
        </v-col>
      </v-row>
    </v-alert>
    <v-alert
      color="blue-grey"
      icon="mdi-school"
      outlined
      prominent
      text
    >
      <v-row align="center">
        <v-col class="grow">
          Instructions for uploading additional datasets are documented on GitHub.
        </v-col>
        <v-col class="shrink">
          <v-btn
            href="https://github.com/Slicer/SlicerDataStore#readme"
          >
            Read Instructions
          </v-btn>
        </v-col>
      </v-row>
    </v-alert>
  </v-container>
</template>
