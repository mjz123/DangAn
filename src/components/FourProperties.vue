<template>
    <div class="dash">
        <div class="sub-nav">
            <ul>
                <li>
                    <a :class="{act:activex}" @click="change1">策略设置</a>
                </li>
                <li>
                    <a :class="{act:!activex}" @click="change2">存储检测</a>
                </li>
            </ul>
        </div>
        <div class="wrap-fluid">
        <div class="container-fluid paper-wrap bevel tlbr">
            <div class="left-sidebar">
                <div class="row-fluid view">
                    <div class="widget">
                        <div class="widget-header">
                            <div class="title">
                                <span v-show="activex">策略设置</span><span v-show="!activex">存储检测</span>
                            </div>
                        </div>
                        <div class="widget-body">
                            <iframe src="http://192.168.1.81:8088/CPCNS_BaoCunGuanLi/SiXingJianCeXml/query.do" frameborder="0" v-if="activex"></iframe>
                            <iframe src="http://192.168.1.81:8088/CPCNS_BaoCunGuanLi/SiXingJianCeXml/queryCunChu.do" frameborder="0" v-if="!activex"></iframe>
                            <!--<div>-->
                                <!--<a href="http://192.168.1.81:8088/CPCNS_BaoCunGuanLi/SiXingJianCeXml/query.do" target="_blank">-->
                                    <!--<h2>策略设置</h2>-->
                                <!--</a>-->
                                    <!--<br><br><br>-->
                                <!--<a href="http://192.168.1.81:8088/CPCNS_BaoCunGuanLi/SiXingJianCeXml/queryCunChu.do" target="_blank">-->
                                    <!--<h2>存储检测</h2>-->
                                <!--</a>-->
                            <!--</div>-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "FourProperties",
        data(){
            return {
                activex:1
            }
        },
        methods:{
            change1(){
                this.activex = 1
            },
            change2(){
                this.activex = 0
            }
        }
    }
</script>

<style scoped>
    /*.dash {*/
        /*height: calc(100% - 190px);*/
    /*}*/
    .widget-body div {
        margin-top: 10%;
        text-align: center;
    }
    a {
        text-decoration: none;
    }
    .act {
        -webkit-border-radius: 4px 4px 0 0;
        -moz-border-radius: 4px 4px 0 0;
        border-radius: 4px 4px 0 0;
        color: rgb(0, 255, 241) !important;
        opacity: 1;
        text-shadow: 1px 1px 1px #1f5a80;
    }

</style>
