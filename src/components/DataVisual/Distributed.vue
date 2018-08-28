<template>
    <div class="dashboard-wrapper">
        <div class="left-sidebar">
            <div class="row-fluid view">
                <div class="widget">
                    <div class="widget-header">
                        <div class="title">
                            分布式存储
                        </div>
                        <span class="tools" >
                          <a class="fs1 icon-arrow-up-right" aria-hidden="true"></a>
                        </span>
                    </div>
                    <div class="widget-body">
                        <div class="folder">
                            <el-tree
                                :data="data"
                                node-key="id"
                                :render-content="renderContent">
                            </el-tree>
                            <!--<el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>-->
                        </div>
                        <div class="file">
                            <div class="file-content">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-doc"></use>
                                </svg>
                                <div>aaa</div>
                            </div>
                            <div class="file-content">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-doc"></use>
                                </svg>
                                <div>aaa</div>
                            </div>
                            <div class="file-content">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-doc"></use>
                                </svg>
                                <div>aaa</div>
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
                data: [{
                    label: '一级 1',
                    children: [{
                        label: '二级 1-1',
                        children: [{
                            label: '三级 1-1-1'
                        }]
                    }]
                }, {
                    label: '一级 2',
                    children: [{
                        label: '二级 2-1',
                        children: [{
                            label: '三级 2-1-1'
                        }]
                    }, {
                        label: '二级 2-2',
                        children: [{
                            label: '三级 2-2-1'
                        }]
                    }]
                }, {
                    label: '一级 3',
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            };
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

            handleNodeClick(data) {
                console.log(data);
            }
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



</style>
