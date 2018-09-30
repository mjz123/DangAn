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
                    <router-link to="/DeviceVisual/DiskLibrary" tag="a">
                        磁带库存储
                    </router-link>
                </li>
                <li>
                    <router-link to="/DeviceVisual/CDROMLibrary" tag="a">
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
        name: "DeviceVisual"
    }
</script>

<style scoped>
    .router-link-active {
        font-size: 16px;
    }

</style>
