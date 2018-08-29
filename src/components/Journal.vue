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
                                系统日志
                            </div>
                        </div>
                        <div class="widget-body">
                            <table class="table table-condensed table-striped table-bordered table-hover no-margin">
                                <thead>
                                    <tr>
                                        <th>
                                            序号
                                        </th>
                                        <th>
                                            类型
                                        </th>
                                        <th>
                                            时间
                                        </th>
                                        <th>
                                            内容
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
                                            2012-1-1
                                        </td>
                                        <td>
                                            xxx
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
        name: "Journal"
    }
</script>

<style scoped>

</style>
