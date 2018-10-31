import Vue from 'vue'
import Router from 'vue-router'
import Navigation from '@/components/Navigation'
import Dashboard from '@/components/Dashboard'
import DataVisual from '@/components/DataVisual'
import DeviceVisual from '@/components/DeviceVisual'

import DistributedData from '@/components/DataVisual/Distributed'
import DiskLibraryData from '@/components/DataVisual/DiskLibrary'
import CDROMLibraryData from '@/components/DataVisual/CDROMLibrary'
import DiskOfd from '@/components/DataVisual/DiskOfd'
import Ofd from '@/components/DataVisual/Ofd'

import DistributedDevice from '@/components/DeviceVisual/Distributed'
import DiskLibraryDevice from '@/components/DeviceVisual/DiskLibrary'
import CDROMLibraryDevice from '@/components/DeviceVisual/CDROMLibrary'

import DistributedJou from '@/components/Journal/Distributed'
import DiskLibraryJou from '@/components/Journal/DiskLibrary'
import CDROMLibraryJou from '@/components/Journal/CDROMLibrary'

import FourProperties from '@/components/FourProperties'
import Journal from '@/components/Journal'
import Help from '@/components/Help'

import Download from '@/components/Download'
Vue.use(Router)

export default new Router({
  routes: [
    {path:'/',redirect:'Dashboard'},
    {path: '/DeviceVisual', redirect: '/DeviceVisual/Distributed'},
      {path: '/DataVisual', redirect: '/DataVisual/Distributed'},
      {path: '/Journal', redirect: '/Journal/Distributed'},
      {
          path: '/Ofd',
          name: 'Ofd',
          component: Ofd,
      },
      {
          path: '/DiskOfd',
          name: 'DiskOfd',
          component: DiskOfd,
      },
      {
          path: '/Download',
          name: 'Download',
          component: Download,
      },
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
                        path: 'Distributed',
                        name: 'DistributedData',
                        component: DistributedData,
                    },
                    {
                        path: 'DiskLibrary',
                        name: 'DiskLibraryData',
                        component: DiskLibraryData,
                    },
                    {
                        path: 'CDROMLibrary',
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
                        path: 'Distributed',
                        name: 'DistributedDevice',
                        component: DistributedDevice,
                    },
                    {
                        path: 'DiskLibrary',
                        name: 'DiskLibraryDevice',
                        component: DiskLibraryDevice,
                    },
                    {
                        path: 'CDROMLibrary',
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
                children:[
                    {
                        path: 'Distributed',
                        name: 'DistributedJou',
                        component: DistributedJou,
                    },
                    {
                        path: 'DiskLibrary',
                        name: 'DiskLibraryJou',
                        component: DiskLibraryJou,
                    },
                    {
                        path: 'CDROMLibrary',
                        name: 'CDROMLibraryJou',
                        component: CDROMLibraryJou,
                    }
                ]
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
