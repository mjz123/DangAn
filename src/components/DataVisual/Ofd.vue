<template>
    <div id="OFDActiveXDIV" style="float:left;" ></div>
</template>

<script>
    export default {
        name: "ofd",
        data(){
            return{
                ocx:''
            }
        },
        beforeCreate(){

        },
        mounted(){
            // var ocx;
            if(window.console) {
                window.console.log("initObject()")
            } else {
                alert("initObject()")
            }

            //注意：插件宽高设固定值。
            this.ocx = suwell.ofdReaderInit("OFDActiveXDIV","1200px","700px");

            let pathname = sessionStorage.getItem('pathname');
            let filename = sessionStorage.getItem('filename');
            // let path = this.$route.params.path + '/' + this.$route.params.name;
            let path = pathname + '/' + filename;
            console.log(path);
            this.ocx.openFile(path,false);
        },

    }
</script>

<style scoped>

</style>
