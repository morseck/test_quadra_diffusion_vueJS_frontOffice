<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-card class="mr-5 ml-5" flat color="#eeeeee">
        <v-container>
            <v-row>
                <v-col cols="2" offset="0"></v-col>
                <v-col cols="8"  sm="8" class="ml-5 mr-5">
                    <v-subheader>Nombre total de catégorie: <span v-if="!loading">{{ items.length}}</span></v-subheader>
                    <template v-if="loading">
                        <template v-for="index in 4">
                            <v-sheet :key="index" class="mb-5" :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`">
                                <v-skeleton-loader class="mx-auto" height="80" type="card"></v-skeleton-loader>
                            </v-sheet>
                        </template>
                    </template>
                    <template v-else>
                        <v-list three-line style="background: #eeeeee">
                            <template  v-for="(item, index) in items">

                                <v-card elevation="1" color="white"  :key="index" class="mb-3">
                                    <v-list-item link route :to="'/showCategorie/' +item.id ">
                                        <v-list-item-avatar>
                                            <v-icon x-large>{{item.icon}}</v-icon>
                                        </v-list-item-avatar>
                                        <v-list-item-content>
                                            <v-list-item-title v-html="item.item.nom"></v-list-item-title>
                                            <v-list-item-subtitle> {{ item.item.articles.length}} articles dans cette catégorie</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-card>
                            </template>
                        </v-list>
                    </template>
                </v-col>
            </v-row>
        </v-container>
        <v-container class="text-center">
            <template v-if="!loading">
                <v-btn fab class="text-center" @click="initialize" color="error">
                    <v-icon>mdi-reload</v-icon>
                </v-btn>
            </template>
        </v-container>
    </v-card>
</template>

<script>
    export default {
        name: "ListCategorieComponent",
        inject:['theme'],

        data: () => ({
            loading:true,
            search: '',
            url: 'read',
            items: [],
        }),
        methods:{
            //Methode d'initialisation
            initialize(){
                this.responseAjaxGetAllCategorie()
            },

            //Methode qui recuperer la reponse la liste de toutes les categories
            async responseAjaxGetAllCategorie(){
                this.loading = true;
                this.items = await this.ajaxGetAllCategorie(this.url)
                this.loading = false
            },

            //Methode ajax qui retourne  la liste de toutes les categoies
            async ajaxGetAllCategorie(url){
                var result = [];
                await this.$http.get(url)
                    .then(response=>{
                        console.log("success-"+url, response)
                        result =  response.body
                    }, response=>{
                        console.log("error-"+url, response)
                    });
                return result;

            }

        },

        mounted() {
            this.initialize()
        },
    }
</script>

<style scoped>

</style>