<template>
    <div class="dash">
        <div class="sub-nav">
            <ul>

                <li>
                    <router-link to="/DeviceVisual/Distributed" tag="a">
                        分布式存储
                    </router-link>
                </li>
                <li>
                    <a>
                        磁带库存储
                    </a>
                </li>
                <li>
                    <a>
                        光盘库存储
                    </a>
                </li>
            </ul>
        </div>

                    <!--<div class="widget">-->
                        <!--<div class="widget-header">-->
                            <!--<div class="title">-->
                                <!--分布式存储-->
                            <!--</div>-->
                        <!--</div>-->
                        <!--<div class="widget-body">-->
                        <!--</div>-->
                    <!--</div>-->
                    <router-view></router-view>

    </div>
</template>

<script>
    export default {
        name: "DeviceVisual"
    }
</script>

<style scoped>
    .router-link-active {
        font-size: 16px;
    }

</style>
