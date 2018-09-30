<template>
    <div class="wrap-fluid">
        <div class="container-fluid paper-wrap bevel tlbr">
            <div class="left-sidebar">
            <div class="row-fluid view">
                <div class="widget">
                    <div class="widget-header">
                        <div class="title">
                            光盘库存储
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
                                    <div class="file-in" v-for="item in file">
                                        <img src="../../assets/img/file2.png"/>
                                        <p>{{item.name}}</p>
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
                idArray: [],
                file:[],
                disk: [
                    {
                        "name": "",
                        "cpuType": "",
                        "cpuCount": "",
                        "memCapacity": "",
                        "hardDiskCount": "",
                        "status": ""  //1在线 0离线
                    }
                ],
            };
        },
        created(){
            this.$ajax.get(process.env.API_HOST + 'api/dashboard/disk/hosts').then((res) => {
                this.$set(this.disk,0,res.data.disk[0]);
                this.drawpie();
            });
            // this.$ajax.get(process.env.API_HOST + 'api/dashboard/disk/hosts').then((res) => {
            //     console.log(res.data);
            //     this.poolMsg = res.data;
            //     console.log(this.poolMsg);
            //     this.tree = res.data.poolName;
            //
            //     this.tree.forEach( (item,index)=>{
            //         this.idArray.push(item.id);
            //
            //     });
            //
            //     var that = this;
            //     setTimeout( () => {
            //         console.log('done');
            //         $('.el-tree-node__content').each(function (index) {
            //             $(this).attr('id',that.idArray[index])
            //         })
            //     },500);
            //
            //     this.drawpie();
            // });
        },
        // mounted(){
        //     console.log($('.el-tree-node__content'))
        // },
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
                this.disk.forEach((item,index) => {
                    this.disk[index].value = 1;
                    this.disk[index].label = {
                        formatter:params => {
                            let res = '名称:'+params.name + '\n';
                            res += '内存：' + this.disk[index].memCapacity + 'GB\n';
                            return res;
                        },
                        fontSize:16,

                    };
                });

                let pie = this.$echarts.init(document.getElementById('pie'));

                let option1 = {

                    series:[
                        {
                            type:'pie',
                            radius:['15%','35%'],
                            color: ['#dd6b66','#759aa0','#e69d87','#8dc1a9','#ea7e53','#eedd78'],
                            label:{

                            },
                            data:that.disk
                        }
                    ],

                    tooltip:{
                        formatter:'主机名:{b}'
                    }
                };

                pie.setOption(option1);

                //点击饼图显示对应主机信息
                // this.colonyMsg.colony.forEach( item => {
                //     pie.on('click', params => {
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

            loadNode(node,resolve){
                if (node.level === 0) {
                    this.$ajax.get(process.env.API_HOST + 'api/dashboard/disk/rootdirs').then(res => {
                        console.log(res.data.folder);
                        resolve(res.data.folder);
                    })
                }
                else {
                    if (node.level === 1){
                        this.show = false;
                    }
                    console.log(node.data.path)

                    // node.data.path = node.data.path.replace(/\\/g, "\\\\");

                    this.$ajax.get(process.env.API_HOST + 'api/dashboard/disk/dirs?path='+ node.data.path).then(res => {
                        console.log(res.data.folder);
                        resolve(res.data.folder);
                    });
                }
            },


            handleNodeClick(data,node,self) {
                console.log(1);
                if (node.level >1){
                    this.$ajax.get(process.env.API_HOST + 'api/dashboard/disk/files?path='+ node.data.path).then(res => {
                        this.file = res.data.file;
                        console.log(this.file)
                    })
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
        overflow-y: auto;
    }
    .el-tree {
        font-size: 15px;
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
    }
    .file-content p {
        font-size: 15px;
        text-align: center;
        width: 90px;
        word-wrap: break-word;
    }
    .file-in {
        display: flex;
        flex-direction: column;
        margin: 20px 0 0 40px;
        align-items: center;
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
