<template>
    <div class="wrap-fluid">
            <div class="container-fluid paper-wrap bevel tlbr">
                <div class="left-sidebar">
                <div class="row-fluid view">
                    <div class="widget">
                        <!--<div class="widget-header">-->
                            <!--<div class="title">-->
                            <!--</div>-->
                        <!--</div>-->
                        <div class="widget-body">
                            <div class="backimg"></div>
                            <div class="msg">
                                <div class="msgbox">
                                    <img src="../assets/img/c-phone.png"/>
                                    <span>电话</span>
                                    <span>1338888888</span>
                                </div>
                                <div class="msgbox">
                                    <img src="../assets/img/c-mail.png"/>
                                    <span>邮箱</span>
                                    <span>112414141@123.com</span>
                                </div>
                                <div class="msgbox">
                                    <img src="../assets/img/1.png"/>
                                    <span>文档</span>
                                    <span>用户手册下载</span>
                                </div>
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
        name: "Help"
    }
</script>

<style scoped>
    .backimg {
        height: 65%;
        background-image: url("../assets/img/151035.jpg");
        background-position: center;
        background-size: cover;
    }
    .msg img{
        width: 40px;
        box-shadow:0 3px 10px rgba(0, 0, 0, .1);
        border-radius: 50%;
        padding: 20px;
    }
    .msg {
        height: 35%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .msgbox {
        width: 30%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 15px;
    }
    .msgbox span{
        margin-top: 5px;
        font-size: 15px;
    }
    .msgbox img {
        box-sizing: content-box;
    }
    .widget-body {
        height: 100%;
    }
    .wrap-fluid {
        height: calc(100% - 190px);
    }



</style>
