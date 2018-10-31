<template>
    <div id="OFDActiveXDIV" style="float:left;" ></div>
</template>

<script>
    export default {
        name: "DiskOfd",
        data(){
            return{
                ocx:''
            }
        },
        mounted(){

            let fileid2 = sessionStorage.getItem('fileid2');
            let filename3 = sessionStorage.getItem('filename3');
            let downpath2 = sessionStorage.getItem('downpath2');
            this.$ajax.get(process.env.API_HOST + 'api/dashboard/tape/downfile?id='+ fileid2 +'&name=' + filename3).then(res => {
                if ( res.data.status === '7' ) {
                    var path = downpath2;
                    this.ocx.openFile(path,false);
                } else {
                    var time2 = setInterval( () => {
                        this.$ajax.get(process.env.API_HOST + 'api/dashboard/tape/downfile?id='+ fileid2 +'&name=' + filename3).then(res => {
                            if ( res.data.status === '7' ) {
                                var path = downpath2;
                                this.ocx.openFile(path,false);
                                clearInterval(time2);
                            }
                        })
                    },10000);
                }
            });



            // var ocx;
            if(window.console) {
                window.console.log("initObject()")
            } else {
                alert("initObject()")
            }

            //注意：插件宽高设固定值。
            this.ocx = suwell.ofdReaderInit("OFDActiveXDIV","1200px","700px");


            // let path = this.$route.params.path + '/' + this.$route.params.name;

        },

    }
</script>

<style scoped>

</style>
