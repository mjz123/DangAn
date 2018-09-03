<template>
    <div class="dashboard-wrapper">
        <div class="left-sidebar">
            <div class="row-fluid view">
                <div class="widget">
                    <div class="widget-header">
                        <div class="title">
                            分布式存储
                        </div>
                    </div>
                    <div class="widget-body">
                        <div class="search">
                            按时间搜索：<input type="date"/>
                            按内容搜索：<input type="text"/>
                        </div>
                        <table class="table table-condensed table-striped table-bordered table-hover">
                            <thead>
                            <tr>
                                <th>
                                    序号
                                </th>
                                <!--<th>-->
                                    <!--类型-->
                                <!--</th>-->
                                <th>
                                    时间
                                </th>
                                <th>
                                    内容
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(item,index) in journal">
                                <td>
                                    {{index+1}}
                                </td>
                                <td>
                                    {{item.time}}
                                </td>
                                <td>
                                    {{item.content}}
                                </td>
                            </tr>
                            </tbody>
                        </table>
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
                journal:[]
            }
        },
        created(){
            const socket = new SockJS( 'http://localhost:8090/websocket_entry');
            this.stompClient = Stomp.over(socket);
            this.stompClient.connect({}, frame => {
                console.log('Connected: ' + frame);
                this.stompClient.subscribe('/log/distWarningLog',res => {
                    let journal = JSON.parse(res.body);
                    if (journal.content !== null ){
                        this.journal.push(journal);
                    }

                }
              );
            });

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

        },

    }

</script>

<style scoped>
    .widget-body {
        overflow: auto;
        background: #f7f7f7;
    }
    .search {
        float: right;
        margin-right: 50px;
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

    th,td{
        text-align: center;
        font-size: 14px;
    }
    .table {
         width: 95%;
         margin: 10px auto;
     }


</style>
