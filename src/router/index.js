import Vue from 'vue'
import Router from 'vue-router'
import Navigation from '@/components/Navigation'
import Dashboard from '@/components/Dashboard/Dashboard'
import DataVisual from '@/components/DataVisual/DataVisual'
import DeviceVisual from '@/components/DeviceVisual/DeviceVisual'
import Distributed from '@/components/DeviceVisual/Distributed'

Vue.use(Router)

export default new Router({
  routes: [
    {path:'/',redirect:'Dashboard'},
    {path: '/DeviceVisual', redirect: '/DeviceVisual/Distributed'},
    {
        path: '/Navigation',
        name: 'Navigation',
        component: Navigation,
        children:[
            {
                path: '/Dashboard',
                name: 'Dashboard',
                component: Dashboard,
            },
            {
                path: '/DataVisual',
                name: 'DataVisual',
                component: DataVisual,
            },
            {
                path: '/DeviceVisual',
                name: 'DeviceVisual',
                component: DeviceVisual,
                children:[
                    {
                        path: '/DeviceVisual/Distributed',
                        name: 'Distributed',
                        component: Distributed,
                    }
                ]
            },
        ]
    }
  ]
})
