<template>
    <div class="dash">
        <div class="sub-nav">
            <ul>
                <li>
                    <router-link to="/Dashboard" tag="a">
                        <div class="fs1" aria-hidden="true" data-icon="&#xe0a0;"></div>
                        分布式存储
                    </router-link>
                </li>
                <li>
                    <a>
                        磁带库存储
                    </a>
                </li>
                <li>
                    <a href="#chats">
                        光盘库存储
                    </a>
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

</style>
