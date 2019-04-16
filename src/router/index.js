import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router);

/* Layout */
import Layout from 'components/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index')
    }]
  },


  {
    path: '/md',
    component: Layout,
    redirect: '/md/index',
    name: 'Md',
    meta: { title: '门店', icon: 'example' },
    children: [
      {
        path: 'test',
        name: 'storeAdminTest',
        component: _import('storeAdmin/index'),
        meta: { title: '门店管理', icon: 'table' }
      },
    ]
  },
  {
    path: '/HF',
    component: Layout,
    redirect: '/HF/index',
    name: 'HF',
    meta: { title: '回访信息管理', icon: 'example' },
    children: [
      {
        path: 'safe',
        name: 'safeBack',
        component: _import('messageBack/safe'),
        meta: { title: '保险回访', icon: 'table' }
      },
      {
        path: 'buyCarTest',
        name: 'byTest',
        component: _import('messageBack/buyCarTest'),
        meta: { title: '买车test', icon: 'table' }
      },
      {
        path: 'BuyCar',
        name: 'MC',
        component: _import('messageBack/buyCar'),
        meta: { title: '买车接待表', icon: 'table' }
      },
      {
        path: 'show/:page',
        name: 'showSome',
        component: _import('messageBack/show'),
        meta: { title: '查看', icon: 'table' },
        hidden: true,
      },
      {
        path: 'showLook/:page',
        name: 'showSomeThing',
        component: _import('messageBack/showLook'),
        meta: { title: '查看', icon: 'table' },
        hidden: true,
      }
    ]
  },
  {
    path: '/sale',
    component: Layout,
    redirect: '/sale/index',
    name: 'Sale',
    meta: { title: '营销管理', icon: 'example' },
    children: [
      {
        path: 'saleAdmin',
        name: 'saleAdmins',
        component: _import('saleAdmin/index'),
        meta: { title: '砍价表', icon: 'table' }
      },
      {
        path: 'saleAdminsTwo',
        name: 'SaleAdminsTwo',
        component: _import('saleAdmin/index'),
        meta: { title: '例子', icon: 'table' },
      }
    ]
  },
  {
    path: '/car',
    redirect: '/car/index',
    component: Layout,
    name: 'Car',
    meta: { title: 'Car', icon: 'car' },
    children: [
      {
        path: 'index',
        name:'carStart',
        component: _import('car/index'),
        meta: { title: '车源管理', icon: 'table' }
      },
    ]
  },
  {
    path: '/customer',
    redirect: '/customer/index',
    component: Layout,
    name: 'customer',
    meta: { title: 'Customer', icon: 'customer' },
    children: [
      {
        path: 'index',
        name:'customerMessage',
        component: _import('customer/index'),
        meta: { title: '客户信息管理', icon: 'table' }
      },
      {
        hidden:true,
        path: 'check/:page',
        name: 'check',
        component: _import('customer/check'),
        meta: { title: '查看详情', icon: 'table' }
      },
      {
        hidden:true,
        path: 'edit/:page',
        name: 'edit',
        component: _import('customer/check'),
        meta: { title: '修改详情', icon: 'table' }
      }
    ]
  },
  {
    path: '/vehicle',
    redirect: '/vehicle/index',
    component: Layout,
    name: 'vehicle',
    meta: { title: '车辆管理', icon: 'table' },
    children: [
      {
        path: 'index',
        component: _import('vehicle/index'),
        meta: { title: '车辆管理', icon: 'table' }
      },
      {
        path: 'information',
        name: 'information',
        component: _import('vehicle/information'),
        meta: { title: '完善车辆信息', icon: 'table' },
        hidden: true,
      }

    ]
  },
  {
    path: '/order',
    redirect: '/order/index',
    component: Layout,
    name: 'order',
    meta: { title: '订单管理', icon: 'table' },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: _import('order/index'),
        meta: { title: '订单管理', icon: 'table' },
      },
      {
        path: 'look',
        name: 'look',
        component: _import('order/look'),
        meta: { title: '查看订单', icon: 'table' },
        hidden: true,
      },
      {
        path: 'process',
        name: 'process',
        component: _import('order/process'),
        meta: { title: '处理订单', icon: 'table' },
        hidden: true,
      },
    ]
  },

  {
    path: '/administrator',
    redirect: '/administrator/index',
    component: Layout,
    name: 'administrator',
    meta: { title: 'Administrator', icon: 'administrator' },
    children: [
      {
        path: 'administrator',
        name: 'administrators',
        component: _import('administrator/index'),
        meta: { title: '管理员信息管理', icon: 'table' }
      }
    ]
  },
  {
    path: '/salesman',
    redirect: '/salesman/index',
    component: Layout,
    name: 'salesman',
    meta: { title: 'Salesman', icon: 'salesman' },
    children: [
      {
        path: 'salesman',
        name: 'salesmen',
        component: _import('salesman/index'),
        meta: { title: '业务员信息管理', icon: 'table' }
      }
    ]
  },

  {
    path: '/basicNews',
    redirect: '/basicNews/index',
    component: Layout,
    name: 'basicNews',
    meta: { title: '基础资料管理', icon: 'table' },
    children: [
      {
        path: 'advert',
        name: 'Advert',
        component: _import('basicNews/advert'),
        meta: { title: '广告设置', icon: 'table' }
      },
      {
        path: 'cutPrice',
        name: 'CutPrice',
        component: _import('basicNews/cutPrice'),
        meta: { title: '砍价设置', icon: 'table' },
      }

    ]
  },



  { path: '*', redirect: '/404', hidden: true }
];

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

