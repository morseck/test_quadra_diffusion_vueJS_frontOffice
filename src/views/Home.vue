<template>
  <v-layout style="background: #eeeeee">
    <v-row>
      <v-col cols="12" md="12">
        <list-categorie-component></list-categorie-component>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
// @ is an alias to /src
import ListCategorieComponent from '../components/ListCategorieComponent'

export default {
  name: 'Home',
  components: {
    ListCategorieComponent
  }
}
</script>
