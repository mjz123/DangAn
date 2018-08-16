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
                                <div class="metro-nav-block nav-block-blue">
                                    <div class="nav-img">
                                        图标
                                    </div>
                                    <div class="nav-msg">
                                        <div><span>25</span>个</div>
                                        <div>今日总任务</div>
                                    </div>
                                </div>
                                <div class="metro-nav-block nav-block-yellow">
                                    <div class="nav-img">
                                        图标
                                    </div>
                                    <div class="nav-msg">
                                        <div><span>25</span>个</div>
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
                            <div>
                                <div class="status-charts"></div>
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
        name: "Dashboard"
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
    }
    .metro-nav {
        overflow: hidden;
        width: 80%;
        margin: 0 auto;
    }
    .metro-nav-block{
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
    }
    .status-form {
        float: right;
        position: relative;
        width: 40%;
        height: 45vh;
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

</style>
