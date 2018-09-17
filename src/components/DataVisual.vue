<template>
    <div class="dash">
        <div class="sub-nav">
            <ul>
                <li>
                    <router-link to="/DataVisual/Distributed" @click.native="refresh" tag="a">
                        分布式存储
                    </router-link>
                </li>
                <li>
                    <router-link to="/DataVisual/DiskLibrary" @click.native="refresh" tag="a">
                        磁带库存储
                    </router-link>
                </li>
                <li>
                    <router-link to="/DataVisual/CDROMLibrary" @click.native="refresh" tag="a">
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
        name: "DataVisual",
        methods:{
            refresh(){
                this.$router.go(0);
            }
        }
    }
</script>

<style scoped>
    .router-link-active {
        font-size: 16px;
    }
</style>
