<template>
    <div class="dashboard-wrapper">
        <div class="left-sidebar">
            <div class="row-fluid view">
                <div class="widget">
                    <div class="widget-header">
                        <div class="title">
                            磁盘库存储
                        </div>
                        <span class="tools">
                          <a class="fs1 icon-arrow-up-right" aria-hidden="true"></a>
                        </span>
                    </div>
                    <div class="widget-body">
                        <div class="widget-body-lf">
                            <div class="msg" v-show=show1>
                                <div>
                                    <h4>存储集群</h4>
                                    <p>主机数量：3</p>
                                    <p>主机状态：正常</p>
                                </div>
                            </div>
                            <div class="msg" v-show=!show1>
                                <div>
                                    <h4>存储集群</h4>
                                    <p>主机名称：node1</p>
                                    <p>CPU信息：飞腾，2个</p>
                                    <p>内存信息：3.73G</p>
                                    <p>硬盘信息：10块</p>
                                    <p>在线状态：在线</p>
                                </div>
                            </div>
                            <div id="pie1"></div>
                        </div>

                        <div class="widget-body-rg">
                            <div id="line1"></div>
                            <div id="line2"></div>
                            <div id="line3"></div>
                        </div>

                        <div class="widget-body-lf">
                            <div class="msg" v-show=show2>
                                <div>
                                    <h4>存储集群</h4>
                                    <p>主机数量：3</p>
                                    <p>主机状态：正常</p>
                                </div>
                            </div>
                            <div class="msg" v-show=!show2>
                                <div>
                                    <h4>存储集群</h4>
                                    <p>主机名称：node1</p>
                                    <p>CPU信息：飞腾，2个</p>
                                    <p>内存信息：3.73G</p>
                                    <p>硬盘信息：10块</p>
                                    <p>在线状态：在线</p>
                                </div>
                            </div>
                            <div id="pie2"></div>
                        </div>

                        <div class="widget-body-rg">
                            <table class="table table-condensed table-striped table-bordered table-hover no-margin">
                                <thead>
                                <tr>
                                    <th>
                                        序号
                                    </th>
                                    <th>
                                        磁盘名称
                                    </th>
                                    <th>
                                        状态
                                    </th>

                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>
                                       1
                                    </td>
                                    <td>
                                        node01
                                    </td>
                                    <td>
                                        在线
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
</template>

<script>
    export default {
        name: "DiskLibrary",
        data(){
            return{
                show1:1,
                show2:1
            }
        },
        mounted(){
            this.drawpie1();
            this.drawpie2();
            this.drawline1();
            this.drawline2();
            this.drawline3();
            this.resize();
        },
        methods:{
            drawpie1(){
                const that = this;
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
                            data:[
                                {
                                    name:'node 01',
                                    value:1,
                                },
                                {
                                    name:'node 02',
                                    value:1
                                },
                                {
                                    name:'node 03',
                                    value:1
                                },
                            ]
                        }
                    ],

                    tooltip:{
                        formatter:'主机名:{b}'
                    }
                };

                pie1.setOption(option1);

                pie1.on('click', function (params) {
                    if(params.name === 'node 01'){
                        console.log(1);
                        that.show1 = !that.show1;
                    }
                });

            },

            drawpie2(){
                const that = this;
                let pie2 = this.$echarts.init(document.getElementById('pie2'));

                let option2 = {
                    series:[
                        {
                            type:'pie',
                            radius:['35%','60%'],
                            color: ['#dd6b66','#759aa0','#e69d87','#8dc1a9','#ea7e53','#eedd78'],
                            label:{
                                show:false
                            },
                            data:[
                                {
                                    name:'node 01',
                                    value:1,
                                },
                                {
                                    name:'node 02',
                                    value:1
                                },
                                {
                                    name:'node 03',
                                    value:1
                                },
                            ]
                        }
                    ],

                    tooltip:{
                        formatter:'主机名:{b}'
                    }
                };

                pie2.setOption(option2);

                pie2.on('click', function (params) {
                    if(params.name === 'node 01'){
                        console.log(1);
                        that.show2 = !that.show2;
                    }
                });

            },

            drawline1(){
                let line1 = this.$echarts.init(document.getElementById('line1'));
                let datax = [];
                let datay = [];

                function random(){
                    let date=new Date();
                    if (datax.length < 5) {
                       datax.push(date)
                    } else {
                        datax.shift();
                        datax.push(date);
                    }
                    if (datay.length < 5) {
                        datay.push(Math.random()*100)
                    } else {
                        datay.shift();
                        datay.push(Math.random()*100);
                    }

                    line1.setOption({
                        xAxis: {
                            data: datax
                        },
                        series: {
                            data: datay
                        }
                    });
                }


                let optionLine1 = {
                    title:{
                        text:'CPU(%)',
                        x:'center'
                    },
                    xAxis:{
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
                        data:datax,
                        boundaryGap:false,

                    },
                    yAxis:{
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
                    series:[
                        {
                            type:'line' ,
                            lineStyle:{
                                color:"#74b749",
                                width:1
                            },
                            smooth: true,
                            symbol:'none',
                            data:datay
                        }
                    ],
                    grid:{
                        containLabel:true
                    }
                };

                line1.setOption(optionLine1);
                setInterval(random,1000);


            },

            drawline2(){
                let line2 = this.$echarts.init(document.getElementById('line2'));
                let datax = [];
                let datay = [];

                function random(){
                    let date=new Date();
                    if (datax.length < 5) {
                        datax.push(date)
                    } else {
                        datax.shift();
                        datax.push(date);
                    }
                    if (datay.length < 5) {
                        datay.push(Math.random()*100)
                    } else {
                        datay.shift();
                        datay.push(Math.random()*100);
                    }

                    line2.setOption({
                        xAxis: {
                            data: datax
                        },
                        series: {
                            data: datay
                        }
                    });
                }


                let optionLine2 = {
                    title:{
                        text:'内存(%)',
                        x:'center'
                    },
                    xAxis:{
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
                        data:datax,
                        boundaryGap:false,

                    },
                    yAxis:{
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
                    series:[
                        {
                            type:'line' ,
                            lineStyle:{
                                color:"#ffb400",
                                width:1
                            },
                            smooth: true,
                            symbol:'none',
                            data:datay
                        }
                    ],
                    grid:{
                        containLabel:true
                    }
                };

                line2.setOption(optionLine2);
                setInterval(random,1000);
            },

            drawline3(){
                let line3 = this.$echarts.init(document.getElementById('line3'));
                let datax = [];
                let datay = [];

                function random(){
                    let date=new Date();
                    if (datax.length < 5) {
                        datax.push(date)
                    } else {
                        datax.shift();
                        datax.push(date);
                    }
                    if (datay.length < 5) {
                        datay.push(Math.random()*100)
                    } else {
                        datay.shift();
                        datay.push(Math.random()*100);
                    }

                    line3.setOption({
                        xAxis: {
                            data: datax
                        },
                        series: {
                            data: datay
                        }
                    });
                }

                let optionLine3 = {
                    title:{
                        text:'带宽(%)',
                        x:'center'
                    },
                    xAxis:{
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
                        data:datax,
                        boundaryGap:false,

                    },
                    yAxis:{
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
                    series:[
                        {
                            type:'line' ,
                            lineStyle:{
                                color:"#f63131",
                                width:1
                            },
                            smooth: true,
                            symbol:'none',
                            data:datay
                        }
                    ],
                    grid:{
                        containLabel:true
                    }
                };

                line3.setOption(optionLine3);
                setInterval(random,1000);


            },

            resize(){
                let pie1 = this.$echarts.init(document.getElementById('pie1'));
                let pie2 = this.$echarts.init(document.getElementById('pie2'));
                let line1 = this.$echarts.init(document.getElementById('line1'));
                let line2 = this.$echarts.init(document.getElementById('line2'));
                let line3 = this.$echarts.init(document.getElementById('line3'));

                window.onresize = function(){
                    pie1.resize();
                    pie2.resize();
                    line1.resize();
                    line2.resize();
                    line3.resize();
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
    .widget-body-rg{
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
    #line1,#line2,#line3{
        width: 100%;
        height: 30%;
    }

</style>
