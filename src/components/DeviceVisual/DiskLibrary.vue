<template>
    <div class="dashboard-wrapper">
        <div class="left-sidebar">
            <div class="row-fluid view">
                <div class="widget">
                    <div class="widget-header">
                        <div class="title">
                            分布式存储
                        </div>
                        <span class="tools">
                          <a class="fs1 icon-arrow-up-right" aria-hidden="true"></a>
                        </span>
                    </div>
                    <div class="widget-body">
                        <div class="widget-body-lf">
                            <div class="msg">
                                <div>
                                    <h4>存储集群</h4>
                                    <p>主机名称：{{tape[0].name}}</p>
                                    <p>CPU信息：{{tape[0].cpuType}}，{{tape[0].cpuCount}}个</p>
                                    <p>内存信息：{{tape[0].memCapacity}}</p>
                                    <p>硬盘信息：{{tape[0].hardDiskCount}}块</p>
                                    <p>在线状态：{{tape[0].status | status}}</p>
                                </div>
                            </div>
                            <div id="pie1"></div>
                        </div>

                        <div class="widget-body-rg">
                            <div id="line"></div>
                        </div>

                        <div class="widget-body-lf">
                            <div class="msg" v-show=show2>
                                <div>
                                    <h4>存储池状态</h4>
                                    <p>存储池数量：{{poolMsg.poolCount}}</p>
                                </div>
                            </div>
                            <div class="msg" v-show=!show2>
                                <div>
                                    <h4>存储集群</h4>
                                    <p>存储池名称：{{pool[0].name}}</p>
                                    <p>存储池容量：{{pool[0].capacity}}</p>
                                    <p>已用容量：{{pool[0].used}}</p>
                                    <p>未用容量：{{pool[0].free}}</p>
                                    <p>在线状态：{{pool[0].status | status}}</p>
                                </div>
                            </div>
                            <div id="pie2"></div>
                        </div>

                        <div class="widget-body-rg">

                            <table class="table table-condensed table-striped table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th>序号</th>
                                    <th>磁盘名称</th>
                                    <th>所属主机</th>
                                    <th>已用容量</th>
                                    <th>总容量</th>
                                    <th>状态</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(item,index) in disk">
                                    <td>{{index+1}}</td>
                                    <td>{{item.name}}</td>
                                    <td>{{item.hostname}}</td>
                                    <td>{{item.used}}</td>
                                    <td>{{item.capacity}}</td>
                                    <td>{{item.status | status}}</td>
                                </tr>
                                </tbody>
                            </table>
                            <el-pagination
                                layout="prev, pager, next"
                                :page-count=totalPage
                                @current-change="currentchange"
                            >
                            </el-pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    var Stomp = require('stompjs');
    export default {
        name: "Distributed",
        data(){
            return{
                show1: true,
                show2: true,
                tape: [
                    {
                        "name": "",
                        "cpuType": "",
                        "cpuCount": "",
                        "memCapacity": "",
                        "hardDiskCount": "",
                        "status": ""  //1在线 0离线
                    }
                ],
                poolMsg:{},
                pool: [{
                    "name": "",
                    "capacity": "",
                    "used": "",
                    "free": "",
                    "status": ""   //1在线 0离线
                }],
                disk: [],
                poolid: '',

            }
        },
        created(){
            //获取磁带库存储系统集群情况
            this.$ajax.get(process.env.API_HOST + 'api/dashboard/tape/hosts').then((res) => {
                this.$set(this.tape,0,res.data.tape[0]);
                this.drawpie1();
            });

            //获取磁带库存储系统磁带匣总体概况
            this.$ajax.get(process.env.API_HOST + 'api/dashboard/tape/pools').then((res) => {
                this.poolMsg = res.data;
                this.drawpie2();
            });

            //集群信息状态下获取分布式存储系统磁盘列表
            this.$ajax.get(process.env.API_HOST + 'api/dashboard/tape/disks?page_num=1&count=5').then((res) => {
                this.disk = res.data.disk;
                this.totalPage = Number(res.data.totalPage);
            });

            // this.websocket();

        },
        mounted(){
            this.drawline();
            this.resize();
        },
        beforeDestroy(){
            this.disconnect();
        },
        methods:{

            disconnect(){
                if (this.stompClient !== null) {
                    this.stompClient.disconnect();
                }
                // setConnected(false);
                console.log("Disconnected");
            },

            //主机情况饼图
            drawpie1(){
                const that = this;
                this.tape.forEach((item,index) => {
                    this.tape[index].value = 1;
                });

                let pie1 = this.$echarts.init(document.getElementById('pie1'));

                let option1 = {
                    series:[
                        {
                            type:'pie',
                            radius:['35%','60%'],
                            color: ['#dd6b66','#759aa0','#e69d87','#8dc1a9','#ea7e53','#eedd78'],
                            label:{
                                show:false
                            },
                            data:that.tape
                        }
                    ],

                    tooltip:{
                        formatter:'主机名:{b}'
                    }
                };

                pie1.setOption(option1);

                //点击饼图显示对应主机信息
                // this.colonyMsg.colony.forEach( item => {
                //     pie1.on('click', params => {
                //         if(params.name === item.name ){
                //             this.show1 = !this.show1;
                //             if (that.show1 === false){
                //                 this.$ajax.get(process.env.API_HOST + 'api/device/distribute/host?deviceId=' + params.data.id) .then( res =>{
                //                     this.$set(this.host,0,res.data.host[0]);
                //                 });
                //             }
                //         }
                //     });
                // });
            },

            //存储池情况饼图
            drawpie2(){
                const that = this;
                this.poolMsg.poolName.forEach((item,index) => {
                    this.poolMsg.poolName[index].value = 1;
                });

                let pie2 = this.$echarts.init(document.getElementById('pie2'));

                let option2 = {
                    series:[
                        {
                            type:'pie',
                            radius:['35%','60%'],
                            // color: ['#dd6b66','#759aa0','#e69d87','#8dc1a9','#ea7e53','#eedd78'],
                            label:{
                                show:false
                            },
                            data:that.poolMsg.poolName
                        }
                    ],

                    tooltip:{
                        formatter:'存储池名称:{b}'
                    }
                };

                pie2.setOption(option2);

                //点击饼图获取对应存储池及硬盘信息
                this.poolMsg.poolName.forEach( item => {
                    pie2.on('click',  params => {
                        this.poolid = params.data.id;
                        if(params.name === item.name ){
                            this.show2 = !this.show2;
                            if (that.show2 === false){
                                this.$ajax.get(process.env.API_HOST + 'api/dashboard/tape/pool?poolid=' + this.poolid) .then( res =>{
                                    this.$set(this.pool,0,res.data.pool[0]);
                                });
                                this.$ajax.get(process.env.API_HOST + 'api/dashboard/tape/disks?poolid='+ this.poolid +'&page_num=1&count=5') .then( res =>{
                                    this.disk = res.data.disk;
                                });
                            } else {
                                this.$ajax.get(process.env.API_HOST + 'api/dashboard/tape/disks?page_num=1&count=5').then((res) => {
                                    this.disk = res.data.disk;
                                    this.totalPage = Number(res.data.totalPage);
                                });
                            }
                        }
                    });
                });
            },

            drawline(){
                let line = this.$echarts.init(document.getElementById('line'));
                let time = [];
                let cpu = [];
                let ram = [];
                let bw = [];

                const socket = new SockJS( 'http://localhost:8090/websocket_entry');
                this.stompClient = Stomp.over(socket);
                this.stompClient.connect({}, frame => {
                    console.log('Connected: ' + frame);
                    this.stompClient.subscribe('/device/tapeSystemInfo',res => {
                        let performance = JSON.parse(res.body);

                        if(cpu.length < 10 && ram.length){
                            cpu.push(performance.cpu*100);
                            ram.push(performance.ram*100);
                            bw.push(performance.bw*100)
                        } else {
                            cpu.shift();
                            ram.shift();
                            bw.shift();
                            cpu.push(performance.cpu*100);
                            ram.push(performance.ram*100);
                            bw.push(performance.bw*100)
                        }
                        // console.log(this.CPU)
                        let date=new Date();
                        if (time.length < 10) {
                            time.push(date)
                        } else {
                            time.shift();
                            time.push(date);
                        }

                        line.setOption({
                            xAxis: [
                                {gridIndex: 0,data: time},
                                {gridIndex: 1,data: time},
                                {gridIndex: 2,data: time},
                            ],
                            series: [
                                {gridIndex: 0,data: cpu},
                                {gridIndex: 0,data: ram},
                                {gridIndex: 0,data: bw},
                            ]
                        });

                    });
                });

                let optionLine = {
                    title:[
                        {
                            text:'CPU(%)',
                            x:'center'
                        },
                        {
                            text:'内存(%)',
                            x:'center',
                            y:'35%'
                        },
                        {
                            text:'带宽(%)',
                            x:'center',
                            y:'68%'
                        }],
                    grid:[
                        {
                            // x:'2%',
                            y:'4%',
                            height:'30%',
                            containLabel:true
                        },
                        {
                            // x:'2%',
                            y:'35%',
                            height:'30%',
                            containLabel:true
                        },
                        {
                            // x:'2%',
                            y:'68%',
                            height:'30%',
                            containLabel:true
                        },
                    ],
                    xAxis:[
                        {
                            gridIndex: 0,
                            axisLine:{
                                lineStyle:{
                                    color:'#3693cf'
                                }
                            },
                            axisLabel:{
                                margin:3,
                                formatter: function(value){
                                    let date = new Date(value);
                                    let texts = [date.getHours(), date.getMinutes(), date.getSeconds()];
                                    return texts.join(':');
                                },
                            },
                            data:[],
                            boundaryGap:false,
                        },
                        {
                            gridIndex: 1,
                            axisLine:{
                                lineStyle:{
                                    color:'#3693cf'
                                }
                            },
                            axisLabel:{
                                margin:3,
                                formatter: function(value){
                                    let date = new Date(value);
                                    let texts = [date.getHours(), date.getMinutes(), date.getSeconds()];
                                    return texts.join(':');
                                },
                            },
                            data:[],
                            boundaryGap:false,
                        },
                        {
                            gridIndex: 2,
                            axisLine:{
                                lineStyle:{
                                    color:'#3693cf'
                                }
                            },
                            axisLabel:{
                                margin:3,
                                formatter: function(value){
                                    let date = new Date(value);
                                    let texts = [date.getHours(), date.getMinutes(), date.getSeconds()];
                                    return texts.join(':');
                                },
                            },
                            data:[],
                            boundaryGap:false,
                        },

                    ],
                    yAxis:[{
                        gridIndex: 0,
                        type:'value',
                        min:0,
                        max:100,
                        interval:50,
                        splitLine: {
                            show: false
                        },
                        axisLine:{
                            lineStyle:{
                                color:'#3693cf'
                            }
                        },

                    },
                        {
                            gridIndex: 1,
                            type:'value',
                            min:0,
                            max:100,
                            interval:50,
                            splitLine: {
                                show: false
                            },
                            axisLine:{
                                lineStyle:{
                                    color:'#3693cf'
                                }
                            },

                        },
                        {
                            gridIndex: 2,
                            type:'value',
                            min:0,
                            max:100,
                            interval:50,
                            splitLine: {
                                show: false
                            },
                            axisLine:{
                                lineStyle:{
                                    color:'#3693cf'
                                }
                            },

                        }],
                    series:[
                        {
                            xAxisIndex: 0,
                            yAxisIndex: 0,
                            name:'CPU(%)',
                            type:'line',
                            lineStyle:{
                                color:"#74b749",
                                width:1
                            },
                            smooth: true,
                            symbol:'none',
                            data:[]
                        },
                        {
                            xAxisIndex: 1,
                            yAxisIndex: 1,
                            type:'line',
                            lineStyle:{
                                color:"#ffb400",
                                width:1
                            },
                            smooth: true,
                            symbol:'none',
                            data:[]
                        },
                        {
                            xAxisIndex: 2,
                            yAxisIndex: 2,
                            type:'line',
                            lineStyle:{
                                color:"#f63131",
                                width:1
                            },
                            smooth: true,
                            symbol:'none',
                            data:[]
                        }
                    ],

                };

                line.setOption(optionLine);
                // setInterval(random,1000);

            },


            //图表自适应
            resize(){
                let pie1 = this.$echarts.init(document.getElementById('pie1'));
                let pie2 = this.$echarts.init(document.getElementById('pie2'));
                let line = this.$echarts.init(document.getElementById('line'));


                window.onresize = function(){
                    pie1.resize();
                    pie2.resize();
                    line.resize();

                }
            },

            currentchange(val){

                if(this.show2 === true){
                    this.$ajax.get(process.env.API_HOST + 'api/dashboard/tape/disks?page_num='+ val +'&count=5').then((res) => {
                        this.disk = res.data.disk;
                        this.totalPage = Number(res.data.totalPage);
                    });
                } else {
                    this.$ajax.get(process.env.API_HOST + 'api/dashboard/tape/pool/disks?poolid='+ this.poolid +'&page_num='+ val +'&count=5') .then( res =>{
                        this.disk = res.data.disk;
                        this.totalPage = Number(res.data.totalPage);
                    });
                }
            },

        },
        filters:{
            status(value){
                if (value == 1) {
                    return "在线"
                } else {
                    return "离线"
                }
            }
        }
    }

</script>

<style scoped>
    .widget-body {
        overflow: hidden;
        background: #f7f7f7;
    }

    .widget-body-lf{
        float: left;
        width: 49.5%;
        height: 48%;
        background: #fff;
        margin-bottom: 10px;
    }
    .widget-body-rg {
        position: relative;
        float: right;
        width: 49.5%;
        height: 48%;
        background: #fff;
        margin-bottom: 10px;

    }
    .msg {
        float: left;
        width: 50%;
        height: 100%;
        box-sizing: border-box;
        position: relative;
        color: #3693cf;
    }
    .msg div{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .msg p{
        font-size: 15px;
    }
    #pie1,#pie2 {
        float: left;
        width: 50%;
        height: 100%;
    }
    #line{
        width: 100%;
        height: 100%;
    }
    th,td{
        text-align: center;
        font-size: 14px;
    }
    .el-pagination {
        position: absolute;
        bottom: 10px;
        right: 10px;
    }
    .table {
        width: 95%;
        margin: 10px auto;
    }

</style>
