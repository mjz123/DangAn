<template>
    <div class="navigation">
        <div class="top-nav"><!-- This is main navigation -->
            <ul>
              <li>
                  <router-link to="/Dashboard" tag="a">
                      <div class="fs1" aria-hidden="true" data-icon="&#xe0a0;"></div>
                      仪表盘
                  </router-link>
              </li>
              <li>
                  <router-link to="/DataVisual" tag="a">
                      <div class="fs1" aria-hidden="true" data-icon="&#xe0a0;"></div>
                      数据可视化
                  </router-link>
              </li>
              <li>
                  <router-link to="/DeviceVisual" tag="a">
                      <div class="fs1" aria-hidden="true" data-icon="&#xe0a0;"></div>
                      设备可视化
                  </router-link>
              </li>
              <li>
                <a>
                  <div class="fs1" aria-hidden="true" data-icon="&#xe0d2;"></div>
                  四性检测
                </a>
              </li>
              <li>
                <a>
                  <div class="fs1" aria-hidden="true" data-icon="&#xe0a9;"></div>
                  系统日志
                </a>
              </li>
              <li>
                <a >
                  <div class="fs1" aria-hidden="true" data-icon="&#xe0aa;"></div>
                  在线帮助
                </a>
              </li>
            </ul>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "Navigation"
    }
</script>

<style scoped>
    .navigation {
        height: 100%;
    }
    .top-nav ul li {
        width: 15%;
    }
    .top-nav {
        height: 58px;
    }
    .top-nav ul li .router-link-active {
        -webkit-border-radius: 4px 4px 0 0;
        -moz-border-radius: 4px 4px 0 0;
        border-radius: 4px 4px 0 0;
        background: #3693cf;
        color: #fff;
        text-shadow: 1px 1px 1px #1f5a80; }
    .top-nav ul li .router-link-active:hover {
        background: #3693cf;
        color: #fff;
        text-shadow: 1px 1px 1px #1f5a80; }


</style>
