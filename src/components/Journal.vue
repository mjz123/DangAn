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
