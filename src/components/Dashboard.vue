<template>
    <div class="dash">
        <div class="sub-nav">
            <ul></ul>
        </div>
        <div class="dashboard-wrapper">
            <div class="left-sidebar">
                <div class="row-fluid view">
                    <div class="widget">
                        <div class="widget-header">
                            <div class="title">
                                设备视图
                            </div>
                        </div>
                        <div class="widget-body">
                            <img src="../assets/img/fuwuqi.gif"/>
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
                                <div class="metro-nav-block nav-block-blue">
                                    <div class="nav-img">
                                        图标
                                    </div>
                                    <div class="nav-msg">
                                        <div><span>{{data.task}}</span>个</div>
                                        <div>今日总任务</div>
                                    </div>
                                </div>
                                <div class="metro-nav-block nav-block-yellow">
                                    <div class="nav-img">
                                        图标
                                    </div>
                                    <div class="nav-msg">
                                        <div><span>{{data.running}}</span>个</div>
                                        <div>进行中</div>
                                    </div>
                                </div>
                                <div class="metro-nav-block nav-block-purple">
                                    <div class="nav-img">
                                        图标
                                    </div>
                                    <div class="nav-msg">
                                        <div><span>25</span>个</div>
                                        <div>已完成</div>
                                    </div>
                                </div>
                                <div class="metro-nav-block nav-block-green">
                                    <div class="nav-img">
                                        图标
                                    </div>
                                    <div class="nav-msg">
                                        <div><span>25</span>个</div>
                                        <div>新增项目</div>
                                    </div>
                                </div>
                                <div class="metro-nav-block nav-block-brown">
                                    <div class="nav-img">
                                        图标
                                    </div>
                                    <div class="nav-msg">
                                        <div><span>25</span>个</div>
                                        <div>空间已使用</div>
                                    </div>
                                </div>
                                <div class="metro-nav-block nav-block-red">
                                    <div class="nav-img">
                                        图标
                                    </div>
                                    <div class="nav-msg">
                                        <div><span>25</span>个</div>
                                        <div>系统警告</div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div class="widget-body-bt">
                                <div class="status-charts">
                                    <div id="pie"></div>
                                </div>
                                <div class="status-form">
                                    <table class="table table-condensed table-striped table-bordered table-hover no-margin">
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
                                                    <span class="label label label-success">
                                                        正常
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="hidden-phone">
                                                    光盘库存储
                                                </td>
                                                <td class="hidden-phone">
                                                    <span class="label label label-success">
                                                        正常
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="hidden-phone">
                                                    磁带库存储
                                                </td>
                                                <td class="hidden-phone">
                                                    <span class="label label label-warning">
                                                        警告
                                                    </span>
                                                </td>
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
                    "task": 1,           //今日总任务
                    "running": 1,       //运行中
                    "completed": 1,    //已完成
                    "added": 1,       //新增条目
                    "distributedUsed": 1, //分布式已使用空间
                    "tapeUsed": 1,      //磁带库已使用空间
                    "diskUsed": 1, //光盘库已使用空间
                    "warning": 1     //警告数
                },
                devices:[
                    {
                        "devType": "distributed",  //分布式
                        "data":[
                            {						//分布式存储需返回各个存储池内存使用情况
                                "poolName": "xx",
                                "capacity": 20.34,
                                "usedCapacity": 15.4,
                            },
                        ]
                    },
                    {
                        "devType": "tape",           //磁带库
                        "capacity": 100,
                        "usedCapacity": 19.3,
                    }
                ]

            }
        },
        mounted(){
            this.drawpie();
        },
        methods:{
            drawpie(){
                let pie = this.$echarts.init(document.getElementById('pie'));
                let that = this;
                let option = {
                    series:[
                        {
                            type:'pie',
                            radius:['15%','60%'],
                            color:['#57cbe4','#b0c6de','#4c6de1'],
                            label:{
                                show:false
                            },
                            trigger:'item',
                            data:[
                                {
                                    name:'分布式存储',
                                    value:1,
                                    tooltip:{
                                        formatter:'{b}</br> 总容量' + that.devices[0].data[0].capacity +'可用容量3T'
                                    }
                                },
                                {
                                    name:'光盘库存储',
                                    value:1,
                                    tooltip:{
                                        formatter:'{b}</br> 总容量' + that.devices[1].capacity +'可用容量3T'
                                    }
                                },
                                {
                                    name:'磁带库存储',
                                    value:1,
                                    // tooltip:{
                                    //     formatter:'{b}</br> 总容量' + that.devices[0].data[0].capacity +'可用容量3T'
                                    // }
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

        }
    }
</script>

<style scoped>
    .view {
        float: left;
        width: 34%;
    }
    .status {
        float: right;
        width: 65%;
        height: 100%;
    }
    .widget-body {
        height: calc(100% - 61px);
        position: relative;
    }
    .widget-body img {
        width: 85%;
        max-height: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .metro-nav {
        overflow: hidden;
        width: 80%;
        height: 40%;
        margin: 0 auto;
        position:  relative;
    }

    .metro-nav-block {
        display: flex;
        align-items: center;
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
    .nav-block-purple,.nav-block-red{
        margin-right: 0;
    }
    .metro-nav-wrap {
        width: 100%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }


</style>
