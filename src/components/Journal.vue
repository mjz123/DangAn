<template>
    <div class="dash">
        <div class="sub-nav">
            <ul>
                <li>
                    <router-link to="/Journal/Distributed" tag="a">
                        分布式存储
                    </router-link>
                </li>
                <li>
                    <router-link to="/Journal/DiskLibrary" tag="a">
                        磁带库存储
                    </router-link>
                </li>
                <li>
                    <router-link to="/Journal/CDROMLibrary" tag="a">
                        光盘库存储
                    </router-link>
                </li>
            </ul>
        </div>
        <router-view></router-view>
        <!--<div class="dashboard-wrapper">-->
            <!--<div class="left-sidebar">-->
                <!--<div class="row-fluid view">-->
                    <!--<div class="widget">-->
                        <!--<div class="widget-header">-->
                            <!--<div class="title">-->
                                <!--系统日志-->
                            <!--</div>-->
                        <!--</div>-->
                        <!--<div class="widget-body">-->
                            <!--<table class="table table-condensed table-striped table-bordered table-hover">-->
                                <!--<thead>-->
                                    <!--<tr>-->
                                        <!--<th>-->
                                            <!--序号-->
                                        <!--</th>-->
                                        <!--<th>-->
                                            <!--类型-->
                                        <!--</th>-->
                                        <!--<th>-->
                                            <!--时间-->
                                        <!--</th>-->
                                        <!--<th>-->
                                            <!--内容-->
                                        <!--</th>-->
                                    <!--</tr>-->
                                <!--</thead>-->
                                <!--<tbody>-->
                                    <!--<tr>-->
                                        <!--<td>-->
                                            <!--1-->
                                        <!--</td>-->
                                        <!--<td>-->
                                            <!--node01-->
                                        <!--</td>-->
                                        <!--<td>-->
                                            <!--2012-1-1-->
                                        <!--</td>-->
                                        <!--<td>-->
                                            <!--xxx-->
                                        <!--</td>-->
                                    <!--</tr>-->
                                <!--</tbody>-->
                            <!--</table>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
    </div>
</template>

<script>
    export default {
        name: "Journal"
    }
</script>

<style scoped>
    .router-link-active {
        -webkit-border-radius: 4px 4px 0 0;
        -moz-border-radius: 4px 4px 0 0;
        border-radius: 4px 4px 0 0;
        color: rgb(0, 255, 241) !important;
        opacity: 1;
        text-shadow: 1px 1px 1px #1f5a80;
    }
    a {
        text-decoration: none;
    }
</style>
