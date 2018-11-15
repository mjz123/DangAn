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
                        <span class="tools" >
                          <a class="fs1 icon-cog" aria-hidden="true" :href=url target="_blank"></a>
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
                                @node-click="handleNodeClick"
                                >
                            </el-tree>
                        </div>
                        <div class="file">
                            <div class="charts" v-if=show>
                                <div id="pie"></div>
                                <div id="bar"></div>
                            </div>
                            <div v-if=!show>
                                <div class="file-content">
                                    <div class="file-in" v-for="item in folder">
                                        <img src="../../assets/img/dangangui.png"/>
                                        <p>{{item.name}}</p>
                                    </div>
                                    <div class="file-in" v-for="item in file">
                                        <img src="../../assets/img/dangan.png"/>
                                        <p>{{item.name}}</p>
                                        <div class="xiazai">
                                            <div>
                                                <button @click="download(item.path,item.name)">下载</button><br>
                                                <button @click="view(item.path,item.name)" v-show="item.name.includes('.ofd')">预览</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                idArray: [],
                file:[],
                folder:[],
                url:''
            };
        },
        created(){
            this.$ajax.get(process.env.API_HOST + 'api/dashboard/distribute/pools').then((res) => {
                console.log(res.data);
                this.poolMsg = res.data;
                this.tree = res.data.poolName;

                this.tree.forEach( (item,index)=>{
                    this.idArray.push(item.id);

                })
                console.log(this.idArray)

                // for (let i=0; i<idArray.length; i++){
                //     console.log($('.el-tree-node__content')[0])
                // }
                var that = this;
                setTimeout( () => {
                    console.log('done');
                    $('.el-tree-node__content').each(function (index) {
                        $(this).attr('id',that.idArray[index])
                    })
                },500)


                this.drawpie();
                this.drawbar();
            });

            //获取跳转分布式后台路径
            this.$ajax.get(process.env.API_HOST + 'api/distribute/jump').then(res => {
                this.url = res.data.weburl;
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
                            res += '总容量：' + this.poolMsg.poolName[index].capacity.toFixed(2) + 'T\n'+ '已用容量' + this.poolMsg.poolName[index].used.toFixed(2)+'T';
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
                    color: ['#CD919E','#CD8162','#CD6839','#CD5C5C','#CD2626'],
                    tooltip:{
                        formatter:'存储池名称:{b}',
                        textStyle:{
                            fontSize:16
                        }
                    },
                    legend:{
                        textStyle:{
                            fontSize:16
                        }
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
                for (let i = 0; i<that.poolMsg.poolName.length; i++){
                    that.poolMsg.poolName[i]['剩余容量'] = that.poolMsg.poolName[i].free.toFixed(2);
                    that.poolMsg.poolName[i]['已用容量'] = that.poolMsg.poolName[i].used.toFixed(2);
                    that.poolMsg.poolName[i]['总容量'] = that.poolMsg.poolName[i].capacity.toFixed(2);
                }
                let option = {
                    grid:{
                        top:'15%',
                        height:'70%'
                    },
                    legend: {
                        top:'5%',
                        // data:['邮件营销','联盟广告','视频广告']
                    },
                    tooltip: {},
                    dataset: {
                        dimensions: ['name', '剩余容量', '已用容量', '总容量'],
                        source:that.poolMsg.poolName
                    },
                    label: {
                        fontsize: 15
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
                    console.log(node)
                    this.$ajax.get(process.env.API_HOST + 'api/dashboard/distribute/rootdirs').then(res => {
                        console.log(res.data.folder);
                        resolve(res.data.folder);
                    })
                }
                else {
                    if (node.level === 2){
                        this.show = false;
                    }
                    console.log(node.data.path)

                    // node.data.path = node.data.path.replace(/\\/g, "\\\\");

                    this.$ajax.get(process.env.API_HOST + 'api/dashboard/distribute/dirs?path='+ node.data.path).then(res => {
                        console.log(res.data.folder);
                        this.folder = res.data.folder;
                        resolve(this.folder);
                    });
                }
            },


            handleNodeClick(data,node,self) {
                console.log(1);
                if (node.level >1){
                    this.$ajax.get(process.env.API_HOST + 'api/dashboard/distribute/dirs?path='+ node.data.path).then(res => {
                        this.folder = res.data.folder;
                    });
                    this.$ajax.get(process.env.API_HOST + 'api/dashboard/distribute/files?path='+ node.data.path).then(res => {
                        this.file = res.data.file;
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

            download(path,name){
                window.open(path + '/' + name);
            },

            view(path,name){

                sessionStorage.setItem('pathname',path);
                sessionStorage.setItem('filename',name);
                const { href } = this.$router.resolve({
                    name: 'Ofd'
                });

                window.open(href)
                // this.$router.push({name:'Ofd',params:{path:path,name:name}})
            }

        }
    }
   </script>

<style scoped>
    .folder {
        width: 30%;
        height: 100%;
        overflow: scroll;
        float: left;
    }
    .file {
        float: left;
        width: 70%;
        height: 100%;
        overflow-y: auto;
    }
    .el-tree {
        /*font-size: 15px;*/
    }
    /*.file {*/
        /*display: flex;*/
        /*flex-wrap: wrap;*/
        /*align-items: flex-start;*/
        /*align-content: flex-start;*/
    /*}*/
    .file-content {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        align-content: flex-start;

    }
    .file-content img {
        width: 55px;
        height:100px;
    }
    .file-content p {
        /*font-size: 15px;*/
        text-align: center;
        width: 90px;
        word-wrap: break-word;
    }
    .file-in {
        display: flex;
        flex-direction: column;
        margin: 20px 0 0 40px;
        align-items: center;
        position: relative;
    }

    .xiazai {
        display: none;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        /*top: 50%;*/
        /*left: 50%;*/
        /*transform: translate(-50%,-50%);*/
        background: rgba(0,0,0,0.5);
    }
    .xiazai div{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        -moz-transform: translate(-50%,-50%);
    }
    .xiazai button {
        margin: 3px 0;
    }

    .file-in:hover .xiazai {
        display: block;
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
