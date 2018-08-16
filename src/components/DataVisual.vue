<template>
    <div class="dash">
        <div class="sub-nav">
            <ul>
                <li>
                    <router-link to="/DataVisual/Distributed" tag="a">
                        分布式存储
                    </router-link>
                </li>
                <li>
                    <router-link to="/DataVisual/DiskLibrary" tag="a">
                        磁带库存储
                    </router-link>
                </li>
                <li>
                    <router-link to="/DataVisual/CDROMLibrary" tag="a">
                        光盘库存储
                    </router-link>
                </li>
            </ul>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "DataVisual"
    }
</script>

<style scoped>
    .router-link-active {
        font-size: 16px;
    }
</style>
