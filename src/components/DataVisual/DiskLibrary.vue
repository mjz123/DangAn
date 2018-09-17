<template>
    <div class="dashboard-wrapper">
        <div class="left-sidebar">
            <div class="row-fluid view">
                <div class="widget">
                    <div class="widget-header">
                        <div class="title">
                            磁带库存储
                        </div>
                        <span class="tools" >
                          <a class="fs1 icon-cog" aria-hidden="true"></a>
                        </span>
                    </div>
                    <div class="widget-body">
                        <div class="folder">
                            <el-tree
                                ref="tree"
                                :data="tree"
                                node-key="id"
                                :render-content="renderContent"
                                :props="defaultProps"
                                :load="loadNode"
                                lazy
                            >
                            </el-tree>
                        </div>
                        <div class="file">
                            <div class="charts" v-if=show>
                                <div id="pie"></div>
                                <div id="bar"></div>
                            </div>
                            <div v-if=!show>
                                <!--<svg class="icon" aria-hidden="true">-->
                                <!--<use xlink:href="#icon-doc"></use>-->
                                <!--</svg>-->
                                <div class="file-content">
                                    <img src="../../assets/img/file2.png"/>
                                    <p>aaa</p>
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
        name: "Distributed",
        data() {
            return {
                show:true,
                tree: [
                    // {
                    //     label: '存储池1',
                    //     children: [{
                    //         label: '二级 1-1',
                    //         children: [{
                    //             label: '三级 1-1-1'
                    //         }]
                    //     }]
                    // }
                ],
                defaultProps: {
                    // children: 'children',
                    label: 'name'
                },
                poolMsg:{},
                idArray: []
            };
        },
        created(){
            this.$ajax.get(process.env.API_HOST + 'api/dashboard/tape/pools').then((res) => {
                console.log(res.data);
                this.poolMsg = res.data;
                this.tree = res.data.poolName;

                this.tree.forEach( (item,index)=>{
                    this.idArray.push(item.id);
                });

                // for (let i=0; i<idArray.length; i++){
                //     console.log($('.el-tree-node__content')[0])
                // }
                var that = this;
                setTimeout( () => {
                    console.log('done');
                    $('.el-tree-node__content').each(function (index) {
                        $(this).attr('id',that.idArray[index])
                    })
                },500);


                this.drawpie();
                this.drawbar();
            });


        },
        mounted(){
            this.resize();
        },
        methods: {
            renderContent(h, { node, data, store }) {
                return (
                    <span class="custom-tree-node" style="display:flex; align-items:center">
                    <img src="../../../static/img/file.png" style="width: 20px; padding-right: 6px"/>
                    <span>{node.label}</span>
                </span>
            );
            },

            drawpie(){
                const that = this;
                this.poolMsg.poolName.forEach((item,index) => {
                    this.poolMsg.poolName[index].value = 1;
                    this.poolMsg.poolName[index].label = {
                        formatter:params => {
                            let res = '名称:'+params.name + '\n';
                            res += '总容量：' + this.poolMsg.poolName[index].capacity + 'T\n'+ '已用容量' + this.poolMsg.poolName[index].used+'T';
                            return res;
                        },
                        fontSize:16,

                    };
                });

                let pie = this.$echarts.init(document.getElementById('pie'));

                let option2 = {

                    series:[
                        {
                            type:'pie',
                            radius:['15%','35%'],
                            // color: ['#dd6b66','#759aa0','#e69d87','#8dc1a9','#ea7e53','#eedd78'],
                            label:{
                                // formatter:params => {
                                //     let res = '磁带库名称'+params.name + '\n';
                                //     for (let i=0; i<this.poolMsg.poolName.length; i++){
                                //         res += '总容量：' + this.poolMsg.poolName[i].capacity + '\n'+ '已用容量' + this.poolMsg.poolName[i].used;
                                //     }
                                //     return res;
                                // }
                            },
                            data:that.poolMsg.poolName
                        }
                    ],

                    tooltip:{
                        formatter:'磁带库名称:{b}'
                    }
                };

                pie.setOption(option2);

                //点击饼图获取展开存储池列表
                this.poolMsg.poolName.forEach( item => {
                    pie.on('click',  params => {

                        // this.poolid = params.data.id;
                        if(params.name === item.name ){

                            console.log(item.id);

                            for (let i=0; i<this.idArray.length; i++){
                                let a = this.idArray[i];
                                console.log($("#"+a).attr('id'))
                                if(item.id == $("#"+a).attr('id')){
                                    $("#"+a).click();
                                }
                                // $('.el-tree-node__content')[i].attr('id',this.idArray[i]);
                            }
                        }
                    });
                });

            },

            drawbar(){
                const that = this;
                let bar = this.$echarts.init(document.getElementById('bar'));

                let option = {
                    grid:{
                        top:'25%',
                        height:'50%'
                    },
                    legend: {
                        top:'18%',
                        // data:['邮件营销','联盟广告','视频广告']
                    },
                    tooltip: {},
                    dataset: {
                        dimensions: ['name', 'free', 'used', 'capacity'],
                        source:that.poolMsg.poolName
                    },

                    xAxis: {type: 'category'},
                    yAxis: {},
                    series: [
                        {type: 'bar'},
                        {type: 'bar'},
                        {type: 'bar'}
                    ]

                };

                bar.setOption(option);

                this.poolMsg.poolName.forEach( item => {
                    bar.on('click',  params => {

                        this.poolid = params.data.id;
                        if(params.name === item.name ){

                            console.log(item.id);

                            for (let i=0; i<this.idArray.length; i++){
                                let a = this.idArray[i];
                                console.log($("#"+a).attr('id'))
                                if(item.id == $("#"+a).attr('id')){
                                    $("#"+a).click();
                                }
                                // $('.el-tree-node__content')[i].attr('id',this.idArray[i]);
                            }
                        }
                    });
                });
            },

            loadNode(node,resolve){
                if (node.level === 0) {
                    return resolve([]);
                } else if (node.level === 1) {
                    this.$ajax(process.env.API_HOST + 'api/dashboard/distribute/rootdirs').then(res => {
                        console.log(res.data.folder);
                        resolve(res.data.folder);
                        // this.show = !this,show;
                    })
                } else {
                    this.$ajax(process.env.API_HOST + 'api/dashboard/distribute/rootdirs').then(res => {
                        console.log(res.data.folder);
                        resolve(res.data.folder);
                        this.show = !this,show;
                    })
                }
            },

            resize(){
                let pie = this.$echarts.init(document.getElementById('pie'));
                let bar = this.$echarts.init(document.getElementById('bar'));

                window.onresize = function(){
                    pie.resize();
                    bar.resize();
                }
            },

        }
    }
</script>

<style scoped>
    .folder {
        width: 30%;
        height: 100%;
        overflow-y: scroll;
        float: left;
    }
    .file {
        float: left;
        width: 70%;
        height: 100%;
    }
    .el-tree {
        font-size: 15px;
    }
    .file {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        align-content: flex-start;
    }
    .file-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 20px 0 0 40px;
    }
    .file-content img {
        width: 55px;
    }
    .file-content p {
        font-size: 15px;
    }

    .charts {
        width: 100%;
        height: 100%;
    }

    #pie,#bar {
        float: left;
        width: 50%;
        height: 100%;
    }



</style>
