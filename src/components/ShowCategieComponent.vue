<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-card class="mr-5 ml-5" flat color="#eeeeee">
        <!--Dialog detail-->
        <v-dialog
            v-model="dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click="close">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-divider></v-divider>
                <h1>{{article.titre}}</h1>
                <p>
                    {{ article.description}}
                </p>
            </v-card>
        </v-dialog>
        <!--Fin dialog details-->


        <v-row>
            <v-col cols="2" offset="0"></v-col>
            <v-col cols="8"  sm="8" class="ml-5 mr-5">
                <span><v-btn link route :to="'/'" color="transparent" elevation="0">categories</v-btn> / article</span>
                <template v-if="loading">
                    <template>
                        <v-sheet :key="index" class="mb-5" :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`">
                            <v-skeleton-loader class="mx-auto"  type="card"></v-skeleton-loader>
                        </v-sheet>
                    </template>
                </template>
                <template v-else>
                    <v-card color="white" class="pa-4">
                        <v-card flat  class="mb-5">
                            <v-list-item>
                                <v-list-item-avatar>
                                    <v-icon x-large>{{categorie.icon}}</v-icon>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title>{{categorie.nom}}</v-list-item-title>
                                    <v-list-item-subtitle> {{categorie.articles.length}} articles dans cette catégorie</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-card>
                        <template  v-for="(item, index) in categorie.articles">
                            <v-card elevation="0" color="#eeeeee"  :key="index" class="mb-3">
                                <v-list-item link @click="detaislArticle(item)">
                                    <v-list-item-content>
                                        <v-list-item-title v-html="item.titre"></v-list-item-title>
                                        <v-list-item-subtitle> {{ reduire(item.description)}}</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-card>
                        </template>
                    </v-card>
                </template>
            </v-col>
        </v-row>
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
        name: "ShowCategieComponent",
        inject:['theme'],
        props: ['url-show-categorie'],
        data: ()=>({
            loading:true,
            dialog: false,
            categorie: {
                nom: '',
                icon: '',
                articles: []
            },
            article: '',
        }),
        methods:{
            //Methode d'initialisation
            initialize(){
                console.log("initialise")
                this.responseAjaxGetCategorie()
            },

            // //Methode qui retourne la reponse une categories via son id
            async responseAjaxGetCategorie(){
                console.log("responseAjaxGet")
                this.loading = true;
                var response = await this.ajaxGetCategorie()
                this.parserResponse(response)
                this.loading = false
            },
            //Methode pour  parser la reponse recu
            parserResponse(data){
                if (data !== ''){
                    if (data.item !== undefined && data.item !== ''){
                        if (data.item.nom !== undefined && data.item.nom !== '') {
                            this.categorie.nom = data.item.nom;
                            if (data.item.articles !== undefined && Array.isArray(data.item.articles) )
                                this.categorie.articles = data.item.articles
                        }
                    }
                    if (data.icon !== undefined && data.icon !== ""){
                        this.categorie.icon = data.icon
                    }
                }
            },
            //Methode ajax qui retourne  une categoie
            async ajaxGetCategorie(){
                console.log("ajaxGet")
                var url = this.urlShowCategorie
                var result = '';
                await this.$http.get('show/'+url)
                    .then(response=>{
                        console.log("success-"+url, response)
                        result =  response.body
                    }, response=>{
                        console.log("error-"+url, response)
                    });
                return result;
            },
            detaislArticle(item){
                this.dialog = true;
                this.article = item
            },
            reduire(string){
                var uneChaine  = string.split(" ")
                return uneChaine[0]+ " " + uneChaine[1] + " " + uneChaine[3]+ " ..."
            },
            close(){
                this.dialog = false;
                this.article = '';
            }
        },

        watch: {
            dialog(val) {
                val || this.close()
            },
        },

        mounted() {
            console.log("mounted")
            this.initialize()
        },


    }
</script>

<style scoped>

</style>