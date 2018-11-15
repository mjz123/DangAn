<template>
    <div class="wrap-fluid">
        <div class="container-fluid paper-wrap bevel tlbr">
            <div class="left-sidebar">
                <div class="row-fluid view">
                    <div class="widget">
                        <div class="widget-header">
                            <div class="title">
                                设备视图
                            </div>
                        </div>
                        <div class="widget-body">
                            <img class="fuwu" src="../assets/img/jigui3.gif"/>
                        </div>
                    </div>
                </div>

                <div class="row-fluid status">
                    <div class="widget">
                        <div class="widget-header">
                            <div class="title">
                                容量状况
                            </div>
                        </div>
                        <div class="widget-body">
                            <div class="metro-nav">
                                <div class="metro-nav-wrap">
                                    <div class="metro-nav-block" style="background: #74b749">
                                        <div class="nav-img">
                                            <img src="../assets/img/distri.png"/>
                                        </div>
                                        <div class="nav-msg">
                                            <div><span>100</span>T</div>
                                            <div>分布式总容量</div>
                                        </div>
                                    </div>
                                    <div class="metro-nav-block" style="background: #ffb400">
                                        <div class="nav-img">
                                            <img src="../assets/img/tape2.png"/></div>
                                        <div class="nav-msg">
                                            <div><span>1</span>个</div>
                                            <div>磁带库总磁带数</div>
                                        </div>
                                    </div>
                                    <div class="metro-nav-block side" style="background: #57cbe4">
                                        <div class="nav-img">
                                            <img class="disk" src="../assets/img/disk3.png"/>
                                        </div>
                                        <div class="nav-msg">
                                            <div><span>1</span>个</div>
                                            <div>光盘库在线光盘数</div>
                                        </div>
                                    </div>
                                    <div class="metro-nav-block" style="background: #74C96B">
                                        <div class="nav-img">
                                            <img src="../assets/img/distri.png"/></div>
                                        <div class="nav-msg">
                                            <div><span>100</span>T</div>
                                            <div>分布式可用容量</div>
                                        </div>
                                    </div>
                                    <div class="metro-nav-block" style="background: #FFD300">
                                        <div class="nav-img">

                                            <img src="../assets/img/tape2.png"/></div>
                                        <div class="nav-msg">
                                            <div><span>1</span>个</div>
                                            <div>磁带库可用磁带数</div>
                                        </div>
                                    </div>
                                    <div class="metro-nav-block side" style="background: #57E3E4">
                                        <div class="nav-img">
                                            <img class="disk" src="../assets/img/disk3.png"/>
                                        </div>
                                        <div class="nav-msg">
                                            <div><span>1</span>个</div>
                                            <div>光盘库可用空白光盘数</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="widget-body-bt">
                                <div class="status-charts">
                                    <div id="pie"></div>
                                </div>
                                <div class="status-form">
                                    <table class="table table-condensed table-striped table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th class="hidden-phone">
                                                    设备名称
                                                </th>
                                                <th class="hidden-phone">
                                                    设备状态
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="hidden-phone">
                                                    分布式存储
                                                </td>
                                                <td class="hidden-phone">
                                                    <span class="label" :class="{'label-success': !warningMsg[1].status, 'label-warning': warningMsg[1].status}">
                                                        {{warningMsg[1].status | status}}
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="hidden-phone">
                                                    磁带库存储
                                                </td>
                                                <td class="hidden-phone">
                                                    <span class="label" :class="{'label-success': !warningMsg[2].status, 'label-warning': warningMsg[2].status}">
                                                        {{warningMsg[2].status | status}}
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="hidden-phone">
                                                    光盘库存储
                                                </td>
                                                <td class="hidden-phone">
                                                    <span class="label" :class="{'label-success': !warningMsg[0].status, 'label-warning': warningMsg[0].status}">
                                                        {{warningMsg[0].status | status}}
                                                    </span>
                                                </td>
                                                <!--<td class="hidden-phone">-->
                                                    <!--<span class="label label label-warning">-->
                                                        <!--警告-->
                                                    <!--</span>-->
                                                <!--</td>-->
                                            </tr>
                                        </tbody>
                                    </table>
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
        name: "Dashboard",
        data(){
            return{
                data:{
                    distcapacity:'',
                    distfree:'',
                    cdcapacity:'',
                    cdfree:'',
                    tapecapacity:'',
                    tapefree:''
                },
                devices:[
                    {
                        "devType": "",  //分布式
                        "data":[
                            {
                                "poolName": "",
                                "capacity": '',
                                "usedCapacity": '',
                            },
                        ]
                    },
                    {
                        "devType": "",
                        "capacity": '',
                        "usedCapacity": '',
                    },
                    {
                        "devType": "",
                        "capacity": '',
                        "usedCapacity": '',
                    }
                ],

                polling:'',
                warningMsg:[
                    {
                        "name": "分布式存储",
                        "status": 0			//0为正常 1为警告
                    },
                    {
                        "name": "磁带库存储",
                        "status": 0			//0为正常 1为警告
                    },
                    {
                        "name": "光盘库存储",
                        "status": 0			//0为正常 1为警告
                    }
                ]
            }
        },
        mounted(){
            this.drawpie();

        },

        methods:{
            // 饼图
            drawpie(){
                let pie = this.$echarts.init(document.getElementById('pie'));
                let that = this;
                let option = {
                    series:[
                        {
                            type:'pie',
                            radius:['15%','60%'],
                            color:['#74b749','#57cbe4','#ffb400'],
                            label:{
                                show:false
                            },
                            trigger:'item',
                            data:[
                                {
                                    name:'分布式存储',
                                    value:1,
                                    tooltip:{
                                        // formatter:'{b}</br> 总容量' + that.devices[0].data[0].capacity +'可用容量3T'
                                        formatter:function (params) {
                                            let res = params.name + '<br/>';
                                            for (let i=0; i<that.devices[0].data.length; i++){
                                                res += '总容量100T 可用容量100T<br/>';
                                            }
                                            return res;
                                        }
                                    }
                                },
                                {
                                    name:'光盘库存储',
                                    value:1,
                                    tooltip:{
                                        formatter:'{b}</br> 总容量100T 可用容量100T'
                                    }
                                },
                                {
                                    name:'磁带库存储',
                                    value:1,
                                    tooltip:{
                                        formatter:'{b}</br> 总容量100T 可用容量100T'
                                    }
                                },
                            ],

                        }
                    ],
                    legend:{
                        orient:'vertical',
                        left:0
                    },
                    tooltip:{
                        // formatter:'{b}</br> 总容量' + that.devices[0].data[0].capacity +'可用容量3T'
                    }

                };

                pie.setOption(option);
                window.onresize = function() {
                    pie.resize();
                }
            },

        },
        filters:{
            status(value){
                if (value == 0) {
                    return "正常"
                } else {
                    return "警告"
                }
            }
        }
    }
</script>

<style scoped>
    .view {
        float: left;
        width: 34%;
        height: 100%;
    }
    .status {
        float: right;
        width: 65%;
        height: 100%;
    }

    .fuwu {

        max-height: 90%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .metro-nav {
        overflow: hidden;
        width: 80%;
        height: 45%;
        margin: 0 auto;
        position:  relative;
    }

    .metro-nav-block {
        display: flex;
        align-items: center;
        box-shadow: 3px 3px 8px #757272;
    }
    .nav-img {
        width: 30%;
    }
    .nav-msg {
        text-align: center;
        font-size: 15px;
        width: 70%;
    }
    .nav-msg span {
        font-size: 25px;
        padding-right: 20px;
    }
    .status-charts {
        float: left;
        width: 60%;
        height: 100%;
    }
    .status-form {
        float: right;
        position: relative;
        width: 40%;
        height: 100%;
    }
    .widget-body-bt {
        height: 60%;
        width: 80%;
        margin: 0 auto;
    }
    table {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }
    th {
        text-align: center;
    }
    td {
        text-align: center;
    }
    #pie {
        width: 100%;
        height: 100%;
    }
    .side{
        margin-right: 0;
    }
    .metro-nav-wrap {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 100%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }
    .disk {
        width: 80%;
    }
    .nav-img img {
        padding-left: 10px;
    }

    .wrap-fluid {
        height: calc(100% - 190px);
    }
    .left-sidebar .widget {
        background: #fafafa;
        border: 1px solid #e0dede;
        clear: both;
        /*margin-top: 0px;*/
        /*margin-bottom: 30px;*/
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
        /*height: calc(100% - 40px);*/
        /*margin: 20px 0;*/
    }
    .metro-nav .metro-nav-block {
        /*display: block;*/
        float: left;
        height: 70px;
        width: 30.3%;
        cursor: pointer;
        text-decoration: none;
        color: white;
        overflow: hidden;
        position: relative;
        font-weight: 300;
        letter-spacing: 0.02em;
        line-height: 20px;
        font-smooth: always;
        margin: 0 1% 3% 0;
        overflow: hidden;
        z-index: 1; }
        .table td, .table th {
            padding: 10px!important;
        }
</style>
