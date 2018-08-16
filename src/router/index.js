import Vue from 'vue'
import Router from 'vue-router'
import Navigation from '@/components/Navigation'
import Dashboard from '@/components/Dashboard'
import DataVisual from '@/components/DataVisual'
import DeviceVisual from '@/components/DeviceVisual'

import DistributedData from '@/components/DataVisual/Distributed'
import DiskLibraryData from '@/components/DataVisual/DiskLibrary'
import CDROMLibraryData from '@/components/DataVisual/CDROMLibrary'

import DistributedDevice from '@/components/DeviceVisual/Distributed'
import DiskLibraryDevice from '@/components/DeviceVisual/DiskLibrary'
import CDROMLibraryDevice from '@/components/DeviceVisual/CDROMLibrary'

import FourProperties from '@/components/FourProperties'
import Journal from '@/components/Journal'
import Help from '@/components/Help'
Vue.use(Router)

export default new Router({
  routes: [
    {path:'/',redirect:'Dashboard'},
    {path: '/DeviceVisual', redirect: '/DeviceVisual/Distributed'},
      {path: '/DataVisual', redirect: '/DataVisual/Distributed'},
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
                children:[
                    {
                        path: '/DataVisual/Distributed',
                        name: 'DistributedData',
                        component: DistributedData,
                    },
                    {
                        path: '/DataVisual/DiskLibrary',
                        name: 'DiskLibraryData',
                        component: DiskLibraryData,
                    },
                    {
                        path: '/DataVisual/CDROMLibrary',
                        name: 'CDROMLibraryData',
                        component: CDROMLibraryData,
                    }
                ]
            },
            {
                path: '/DeviceVisual',
                name: 'DeviceVisual',
                component: DeviceVisual,
                children:[
                    {
                        path: '/DeviceVisual/Distributed',
                        name: 'DistributedDevice',
                        component: DistributedDevice,
                    },
                    {
                        path: '/DeviceVisual/DiskLibrary',
                        name: 'DiskLibraryDevice',
                        component: DiskLibraryDevice,
                    },
                    {
                        path: '/DeviceVisual/CDROMLibrary',
                        name: 'CDROMLibraryDevice',
                        component: CDROMLibraryDevice,
                    }
                ]
            },
            {
                path: '/FourProperties',
                name: 'FourProperties',
                component: FourProperties,
            },
            {
                path: '/Journal',
                name: 'Journal',
                component: Journal,
            },
            {
                path: '/Help',
                name: 'Help',
                component: Help,
            }
        ]
    }
  ]
})
