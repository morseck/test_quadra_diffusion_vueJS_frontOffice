<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-app>
      <v-app-bar app color="indigo" dark flat>
          <div class="d-flex align-center">
              <span>Test <string>Quadra diffusion</string>: <i>VueJS - NodeJS - Firebase</i></span>
          </div>
          <v-spacer></v-spacer>
          <span class="mr-2">Mor SECK </span>
          <v-divider vertical="" color="red" width="10"></v-divider>
          <v-avatar color="primary" class="ml-2">
              <v-icon>mdi-account-circle</v-icon>
          </v-avatar>
      </v-app-bar>
    <v-main style="background: #eeeeee">
        <v-app-bar dark color="primary" height="100">
            <v-spacer></v-spacer>
            <v-text-field
                class="mt-auto"
                v-model="search"
                label="Recherche"
                solo-inverted
                append-icon="mdi-magnify"
                @click:append="test"
            ></v-text-field>
            <v-spacer></v-spacer>
        </v-app-bar>
        <v-container style="background: #eeeeee" fluid class="scroll-y">
            <v-row align="center" justify="center">
                <router-view></router-view>
            </v-row>
        </v-container>
    </v-main>
  </v-app>
</template>

<script>
//import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
  //  HelloWorld,
  },

  data: () => ({
      search: ''
  }),
    methods:{
      test(){
          console.log('clique')
      }
    }
};
</script>
