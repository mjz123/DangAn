<template>
    <div class="dashboard-wrapper">
        <div class="left-sidebar">
            <div class="row-fluid view">
                <div class="widget">
                    <div class="widget-header">
                        <div class="title">
                            分布式存储
                        </div>
                    </div>
                    <div class="widget-body">
                        <div id="pie1" :style="{width: '300px', height: '300px'}"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Distributed",
        data(){
            return{}
        },
        mounted(){

        },
        methods:{
            drawpie1(){
                let pie1 = this.$echarts.init(document.getElementById('pie1'));

                pie1.setOption({

                })
            }
        }
    }

</script>

<style scoped>

</style>
