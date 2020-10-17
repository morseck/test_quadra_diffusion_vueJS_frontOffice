<template>
    <v-layout style="background: #eeeeee">
        <v-row>
            <v-col cols="12" md="12">
                <show-categorie-component v-bind:url-show-categorie="this.getIdUrlParams"></show-categorie-component>
            </v-col>
        </v-row>
    </v-layout>
</template>

<script>
    import ShowCategorieComponent from '../components/ShowCategieComponent'
    export default {
        name: "ShowCategorie",
        components:{
            ShowCategorieComponent

        },
        data: () => ({
            id: '', //id Item passer en parametre via l'url
        }),
        computed: {
            getIdUrlParams(){
                return this.$route.params.id
            }
        },
        methods:{
            initialize(){
                this.id = this.getIdUrlParams
            },
        },

        mounted() {
            this.initialize()
        }


    }
</script>

<style scoped>

</style>