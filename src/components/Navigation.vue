 <template>
    <!--<div class="navigation">-->
        <!--<div class="top-nav">&lt;!&ndash; This is main navigation &ndash;&gt;-->
            <!--<ul>-->
              <!--<li>-->
                  <!--<router-link to="/Dashboard" tag="a">-->
                      <!--<div class="fs1 icon-meter" aria-hidden="true"></div>-->
                      <!--主页-->
                  <!--</router-link>-->
              <!--</li>-->
              <!--<li>-->
                  <!--<router-link to="/DataVisual" tag="a">-->
                      <!--<div class="fs1 icon-folder-open" aria-hidden="true"></div>-->
                      <!--数据可视化-->
                  <!--</router-link>-->
              <!--</li>-->
              <!--<li>-->
                  <!--<router-link to="/DeviceVisual" tag="a">-->
                      <!--<div class="fs1 icon-cabinet" aria-hidden="true"></div>-->
                      <!--设备可视化-->
                  <!--</router-link>-->
              <!--</li>-->
              <!--<li>-->
                  <!--<router-link to="/FourProperties" tag="a">-->
                      <!--<div class="fs1 icon-search" aria-hidden="true"></div>-->
                      <!--四性检测-->
                  <!--</router-link>-->
              <!--</li>-->
              <!--<li>-->
                  <!--<router-link to="/Journal" tag="a">-->
                      <!--<div class="fs1 icon-file-3" aria-hidden="true"></div>-->
                      <!--系统日志-->
                  <!--</router-link>-->
              <!--</li>-->
              <!--<li>-->
                  <!--<router-link to="/Help" tag="a">-->
                      <!--<div class="fs1 icon-phone" aria-hidden="true"></div>-->
                      <!--在线帮助-->
                  <!--</router-link>-->
              <!--</li>-->
            <!--</ul>-->
        <!--</div>-->
        <!--<router-view></router-view>-->
    <!--</div>-->
     <div id="site-landing">
         <!-----------头部信息开始--------------->
         <div class="headerDiv">
             <!--左侧logo展示-->
             <div class="logoimg"><img src="../assets/img/logo.png"/></div>
             <div class="logotext">多介质存储管理系统</div>
         </div>
         <!--------头部信息结束------------->
         <div class="menus">
             <div class="top-nav">
                 <!--一级导航菜单——》自动生成-->
                 <ul id="first_menu">
                     <li>
                         <router-link to="/Dashboard" tag="a">
                             <div class="fs1 icon-home" aria-hidden="true"></div>
                             主页
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
                     <li></li>
                 </ul>
                 <!--<div class="clearfix">-->
                 <!--</div>-->
             </div>

             <!--二级导航菜单——》自动生成-->
             <!--<div class="sub-nav" id="tow_menu" style="display:none;" isShow="hide">-->

             <!--</div>-->
         </div>
         <router-view></router-view>
         <footer>
             <div class="bootomDiv">
                 <b>Copyright @档案科学技术研究所</b> |
                 <b id="loginDept">部门</b> |
                 <b id="loginName">人员</b> |
                 <b class="new_time"  id="nowTime"></b>
             </div>

         </footer>
     </div>
</template>

<script>
    export default {
        name: "Navigation"
    }
</script>

<style scoped>
    .menus {
        height: 75px;
        background: rgba(0, 0, 0, 0.1)  none repeat scroll 0px 0px;
    }
    .top-nav ul li a {
        /*height:43px;*/
        text-decoration:none;
    }
    /*.navigation {*/
        /*height: 100%;*/
    /*}*/
    /*.top-nav ul li {*/
        /*width: 15%;*/
    /*}*/
    /*.top-nav {*/
        /*height: 58px;*/
    /*}*/
    /*.top-nav ul li .router-link-active {*/
        /*-webkit-border-radius: 4px 4px 0 0;*/
        /*-moz-border-radius: 4px 4px 0 0;*/
        /*border-radius: 4px 4px 0 0;*/
        /*background: #3693cf;*/
        /*color: #fff;*/
        /*text-shadow: 1px 1px 1px #1f5a80; }*/
    /*.top-nav ul li .router-link-active:hover {*/
        /*background: #3693cf;*/
        /*color: #fff;*/
        /*text-shadow: 1px 1px 1px #1f5a80; }*/
    .top-nav ul li a.router-link-active {
        -webkit-border-radius: 4px 4px 0 0;
        -moz-border-radius: 4px 4px 0 0;
        border-radius: 4px 4px 0 0;
        background:rgba(0, 0, 0, 0.1);
        color: rgb(0, 255, 241) !important;
        opacity: 1;
        text-shadow: 1px 1px 1px #1f5a80;
    }


</style>
