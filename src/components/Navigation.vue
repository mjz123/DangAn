<template>
    <div class="navigation">
        <div class="top-nav"><!-- This is main navigation -->
            <ul>
              <li>
                  <router-link to="/Dashboard" tag="a">
                      <div class="fs1 icon-meter" aria-hidden="true"></div>
                      仪表盘
                  </router-link>
              </li>
              <li>
                  <router-link to="/DataVisual" tag="a">
                      <div class="fs1 icon-folder-open" aria-hidden="true"></div>
                      数据可视化
                  </router-link>
              </li>
              <li>
                  <router-link to="/DeviceVisual" tag="a">
                      <div class="fs1 icon-cabinet" aria-hidden="true"></div>
                      设备可视化
                  </router-link>
              </li>
              <li>
                  <router-link to="/FourProperties" tag="a">
                      <div class="fs1 icon-search" aria-hidden="true"></div>
                      四性检测
                  </router-link>
              </li>
              <li>
                  <router-link to="/Journal" tag="a">
                      <div class="fs1 icon-file-3" aria-hidden="true"></div>
                      系统日志
                  </router-link>
              </li>
              <li>
                  <router-link to="/Help" tag="a">
                      <div class="fs1 icon-phone" aria-hidden="true"></div>
                      在线帮助
                  </router-link>
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

    /*@font-face {*/
        /*font-family: 'icomoon';*/
        /*src:url('../assets/fonts/icomoon.eot');*/
        /*src:url('../assets/fonts/icomoon.eot?#iefix') format('embedded-opentype'),*/
        /*url('../assets/fonts/icomoon.woff') format('woff'),*/
        /*url('../assets/fonts/icomoon.ttf') format('truetype'),*/
        /*url('../assets/fonts/icomoon.svg#icomoon') format('svg');*/
        /*font-weight: normal;*/
        /*font-style: normal;*/
    /*}*/

    /*!* Use the following CSS code if you want to use data attributes for inserting your icons *!*/
    /*[data-icon]:before {*/
        /*font-family: 'icomoon';*/
        /*content: attr(data-icon);*/
        /*speak: none;*/
        /*font-weight: normal;*/
        /*font-size:  16px;*/
        /*line-height: 16px;*/
        /*line-height: 1;*/
        /*-webkit-font-smoothing: antialiased;*/
    /*}*/
</style>
