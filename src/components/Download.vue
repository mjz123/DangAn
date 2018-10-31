<template>
    <div>
        <div style="font-size: 18px">任务正在进行，请勿关闭页面，否则将无法完成下载!!!</div>
        <!--<button @click="aa">11</button>-->
    </div>
</template>

<script>
    export default {
        name: "download",
        created(){
            let fileid = sessionStorage.getItem('fileid');
            let filename2 = sessionStorage.getItem('filename2');
            let downpath = sessionStorage.getItem('downpath');
            console.log(downpath);
            // function f(fileid,) {
            //
            // }
            //磁带库下载
            this.$ajax.get(process.env.API_HOST + 'api/dashboard/tape/downfile?id='+ fileid +'&name=' + filename2).then(res => {
                if ( res.data.status === '7' ) {
                    // window.open(downpath);
                    // location.href(downpath);
                    window.location = downpath
                } else {
                    var time = setInterval( () => {
                        this.$ajax.get(process.env.API_HOST + 'api/dashboard/tape/downfile?id='+ fileid +'&name=' + filename2).then(res => {
                            if ( res.data.status === '7' ) {

                                // window.open(downpath);
                                clearInterval(time);
                                window.location = downpath
                            }
                        })
                    },10000)
                }
            });


        },
        methods:{
            // aa(){
            //     let downpath = 'http://192.168.1.81:6789/cidai/save/608.zip'
            //     window.location = downpath
            // }

        }
    }
</script>

<style scoped>

</style>
