<template>
    <div class="wrap-fluid">
        <div class="container-fluid paper-wrap bevel tlbr">
            <div class="left-sidebar">
            <div class="row-fluid view">
                <div class="widget">
                    <div class="widget-header">
                        <div class="title">
                            分布式存储
                        </div>
                        <span class="tools">
                          <a class="fs1 icon-cog" aria-hidden="true"></a>
                        </span>
                    </div>
                    <div class="widget-body">
                        <div class="widget-body-lf">
                            <div class="blank"></div>
                            <div class="msg" v-show=show1>
                                <div>
                                    <h4>分布式集群</h4>
                                    <p>主机数量：{{colonyMsg.colonyCount}}</p>
                                </div>
                            </div>
                            <div class="msg" v-show=!show1>
                                <div>
                                    <h4>分布式集群</h4>
                                    <p>主机名称：{{host[0].name}}</p>
                                    <p>CPU信息：{{host[0].cpu_type}}，{{host[0].cpucount}}个</p>
                                    <p>内存信息：{{Math.ceil(host[0].mem_capacity/1024/1024/1024*100)/100}}GB</p>
                                    <p>硬盘数量：{{host[0].disk_count-1}}盘</p>
                                    <p>在线状态：{{host[0].status | status}}</p>
                                </div>
                            </div>
                            <div id="pie1"></div>
                        </div>

                        <div class="widget-body-rg">
                            <h5>CPU/内存/带宽状态</h5>
                            <div id="line"></div>
                        </div>

                        <div class="widget-body-lf">
                            <div class="blank"></div>
                            <div class="msg" v-show=show2>
                                <div>
                                    <h4>存储池状态</h4>
                                    <p>存储池数量：{{poolMsg.poolCount}}</p>
                                </div>
                            </div>
                            <div class="msg" v-show=!show2>
                                <div>
                                    <h4>存储池状态</h4>
                                    <p>存储池名称：{{pool[0].name}}</p>
                                    <p>存储池总容量：{{Math.ceil(pool[0].capacity*100)/100}}T</p>
                                    <p>已用容量：{{Math.ceil(pool[0].used*100)/100}}T</p>
                                    <p>未用容量：{{Math.ceil(pool[0].free*100)/100}}T</p>
                                    <p>在线状态：{{pool[0].status | status}}</p>
                                </div>
                            </div>
                            <div id="pie2"></div>
                        </div>

                        <div class="widget-body-rg">
                            <h5>磁盘列表</h5>
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
                                        <td>{{Math.ceil(item.used*100)/100}}GB</td>
                                        <td>{{Math.ceil(item.capacity*100)/100}}GB</td>
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
    </div>
</template>

<script>
    const Stomp = require('stompjs');

    export default {
        name: "Distributed",
        data(){
            return{
                show1: true,
                show2: true,
                show3:true,
                colonyMsg:{},
                host: [
                    {
                        "name": "",
                        "cpu_type": "",
                        "cpucount": "",
                        "mem_capacity": "",
                        "disk_count": "",
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
                totalPage:1,
                stompClient:'',
                status:'',
                polling:''
            }
        },
        created(){
            //获取分布式存储系统集群情况
            this.$ajax.get(process.env.API_HOST + 'api/device/distribute/hosts').then((res) => {
                this.colonyMsg = res.data;
                this.drawpie1();
            });

            //获取分布式存储系统存储池总体概况
            this.$ajax.get(process.env.API_HOST + 'api/dashboard/distribute/pools').then((res) => {
                this.poolMsg = res.data;
                this.drawpie2();
            });

            //集群信息状态下获取分布式存储系统磁盘列表
            this.$ajax.get(process.env.API_HOST + 'api/dashboard/distribute/disks?page_num=1&count=5').then((res) => {
                this.disk = res.data.disk;
                this.totalPage = Number(res.data.totalPage);
            });


        },
        mounted(){
            this.drawline(1);

            this.resize();
        },
        beforeDestroy(){
            this.disconnect();
            clearInterval(this.status);
            clearInterval(this.polling);
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
                this.colonyMsg.colony.forEach((item,index) => {
                    this.colonyMsg.colony[index].value = 1;
                });

                let pie1 = this.$echarts.init(document.getElementById('pie1'));

                let option1 = {
                    title: {
                        text: '主机数量\n' + this.colonyMsg.colonyCount,
                        x: 'center',
                        y: 'center',
                    },
                    series:[
                        {
                            type:'pie',
                            radius:['40%','65%'],
                            color: ['#dd6b66','#759aa0','#e69d87','#8dc1a9','#ea7e53','#eedd78'],
                            label:{
                                show:false
                            },
                            data:that.colonyMsg.colony
                        }
                    ],

                    tooltip:{
                        formatter:'主机名:{b}'
                    }
                };

                pie1.setOption(option1);

                //点击饼图显示对应主机信息
                this.colonyMsg.colony.forEach( item => {
                    pie1.on('click', params => {

                        if(params.name === item.name ){
                            this.show1 = !this.show1;
                            if (that.show1 === false){
                                this.$ajax.get(process.env.API_HOST + 'api/device/distribute/host?deviceId=' + params.data.host_id) .then( res =>{
                                    this.$set(this.host,0,res.data.host[0]);
                                });
                                // this.drawline2(params.data.host_id);
                                this.drawline(2,params.data.host_id);
                                this.disconnect();
                                clearInterval(this.polling);
                            } else {
                                clearInterval(this.status);
                                this.drawline(1);
                            }
                        }
                    });
                });
            },

            //存储池情况饼图
            drawpie2(){
                const that = this;
                this.poolMsg.poolName.forEach((item,index) => {
                    this.poolMsg.poolName[index].value = 1;
                });

                let pie2 = this.$echarts.init(document.getElementById('pie2'));

                let option2 = {
                    title: {
                        text: '存储池数量\n' + this.poolMsg.poolCount,
                        x: 'center',
                        y: 'center',
                    },
                    series:[
                        {
                            type:'pie',
                            radius:['40%','65%'],
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

                        if(params.name === item.name ){

                            if(this.poolid != params.data.id){
                                this.show2 = false;
                                this.poolid = params.data.id;
                                this.$ajax.get(process.env.API_HOST + 'api/dashboard/distribute/pool?poolid=' + this.poolid) .then( res =>{
                                    this.$set(this.pool,0,res.data.pool[0]);
                                });
                                this.$ajax.get(process.env.API_HOST + 'api/dashboard/distribute/pool/disks?poolid='+ this.poolid +'&page_num=1&count=5') .then( res =>{
                                    this.disk = res.data.disk;
                                    this.totalPage = Number(res.data.totalPage);
                                });
                            } else {
                                this.show2 = !this.show2;
                                if (this.show2 == true) {
                                    this.$ajax.get(process.env.API_HOST + 'api/dashboard/distribute/disks?page_num=1&count=5').then((res) => {
                                        this.disk = res.data.disk;
                                        this.totalPage = Number(res.data.totalPage);
                                    });
                                } else {
                                    this.$ajax.get(process.env.API_HOST + 'api/dashboard/distribute/pool/disks?poolid='+ this.poolid +'&page_num=1&count=5') .then( res =>{
                                        this.disk = res.data.disk;
                                        this.totalPage = Number(res.data.totalPage);
                                    });
                                }
                            }
                        }
                    });
                });
                // this.poolMsg.poolName.forEach( item => {
                //     pie2.on('click',  params => {
                //         this.poolid = params.data.id;
                //         if(params.name === item.name ){
                //             this.show2 = !this.show2;
                //             if (that.show2 === false){
                //                 this.$ajax.get(process.env.API_HOST + 'api/dashboard/distribute/pool?poolid=' + this.poolid) .then( res =>{
                //                     this.$set(this.pool,0,res.data.pool[0]);
                //                 });
                //                 this.$ajax.get(process.env.API_HOST + 'api/dashboard/distribute/pool/disks?poolid='+ this.poolid +'&page_num=1&count=5') .then( res =>{
                //                     this.disk = res.data.disk;
                //                     this.totalPage = Number(res.data.totalPage);
                //                 });
                //             } else {
                //                 this.$ajax.get(process.env.API_HOST + 'api/dashboard/distribute/disks?page_num=1&count=5').then((res) => {
                //                     this.disk = res.data.disk;
                //                     this.totalPage = Number(res.data.totalPage);
                //                 });
                //             }
                //         }
                //     });
                // });
            },

            drawline(status,id){
                let line = this.$echarts.init(document.getElementById('line'));
                let time = [new Date()];
                let cpu = [5];
                let ram = [5];
                let bw = [5];

                var that = this;
                if (status === 1){
                    const socket = new SockJS( '/websocket_entry');
                    this.stompClient = Stomp.over(socket);
                    this.stompClient.connect({}, frame => {
                        console.log('Connected: ' + frame);
                        this.stompClient.subscribe('/device/dist_colony_sys_info',res => {
                            let performance = JSON.parse(res.body);

                            if(cpu.length < 10 && ram.length){
                                cpu.push(performance.cpu);
                                ram.push(performance.ram);
                                bw.push(performance.bw)
                            } else {
                                cpu.shift();
                                ram.shift();
                                bw.shift();
                                cpu.push(performance.cpu);
                                ram.push(performance.ram);
                                bw.push(performance.bw)
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

                    this.polling = setInterval(function () {
                        that.stompClient.send("/app/dist_colony_sys_info");
                    },5000);

                } else {

                    function qq() {
                        that.$ajax.post(process.env.API_HOST + 'device/dist_sys_data/'+id).then(res=>{
                            let performance =res.data.data;
                            if(cpu.length < 10 && ram.length){
                                cpu.push(performance.cpu);
                                ram.push(performance.ram);
                                bw.push(performance.bw)
                            } else {
                                cpu.shift();
                                ram.shift();
                                bw.shift();
                                cpu.push(performance.cpu);
                                ram.push(performance.ram);
                                bw.push(performance.bw)
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
                    }

                    this.status=setInterval(qq,5000);
                }



                let optionLine = {
                    title:[
                        {
                            text:'CPU(%)',
                            x:'center',
                            textStyle:{
                                fontSize:16
                            }
                        },
                        {
                            text:'内存(%)',
                            x:'center',
                            y:'28%',
                            textStyle:{
                                fontSize:16
                            }
                        },
                        {
                            text:'带宽(%)',
                            x:'center',
                            y:'56%',
                            textStyle:{
                                fontSize:16
                            }
                        }],
                    grid:[
                        {
                            // x:'2%',
                            y:'2%',
                            height:'23%',
                            containLabel:true
                        },
                        {
                            // x:'2%',
                            y:'30%',
                            height:'23%',
                            containLabel:true
                        },
                        {
                            // x:'2%',
                            y:'58%',
                            height:'23%',
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
                    this.$ajax.get(process.env.API_HOST + 'api/dashboard/distribute/disks?page_num='+ val +'&count=5').then((res) => {
                        this.disk = res.data.disk;
                    });
                } else {
                    this.$ajax.get(process.env.API_HOST + 'api/dashboard/distribute/pool/disks?poolid='+ this.poolid +'&page_num='+ val +'&count=5') .then( res =>{
                        this.disk = res.data.disk;
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
        width: 37.8%;
        height: 48%;
        background: #fff;
        margin-bottom: 10px;
    }
    .widget-body-rg {
        position: relative;
        float: right;
        width: 61.4%;
        height: 48%;
        background: #fff;
        margin-bottom: 10px;
    }
    .widget-body-rg h5{
        margin-bottom: 3px;
    }
    .blank {
        float: left;
        width: 15%;
        height: 100%;
    }
    .msg {
        float: left;
        width: 30%;
        height: 100%;
        box-sizing: border-box;
        position: relative;
        color: #3693cf;
    }
    .msg div{
        position: absolute;
        top: 50%;
        /*left: 50%;*/
        transform: translateY(-50%);
    }
    .msg p{
        font-size: 15px;
    }
    #pie1,#pie2 {
        float: left;
        width: 45%;
        height: 100%;
    }
    #line{
        width: 100%;
        height: 100%;
    }
    h5{
        margin-left: 10%;
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
        width: 80%;
        margin: 10px auto;
    }
    p {
        margin-bottom: 7px;
    }

</style>
