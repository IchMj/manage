import Vue from 'vue'
import Router from 'vue-router'
import IPList from "../page/IPList.vue";
import {info} from "@/api/getData";

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const addHost = r => require.ensure([], () => r(require('@/page/addHost')), 'addHost');
const addDevice = r => require.ensure([], () => r(require('@/page/addDevice')), 'addDevice');
const addIp = r => require.ensure([], () => r(require('@/page/addIp')), 'addIp');
const addIdc = r => require.ensure([], () => r(require('@/page/addIdc')), 'addIdc');
const hostList = r => require.ensure([], () => r(require('@/page/hostList')), 'hostList');
const monitList = r => require.ensure([], () => r(require('@/page/monitList')), 'monitList');
const deviceList = r => require.ensure([], () => r(require('@/page/deviceList')), 'deviceList');
const networkList = r => require.ensure([], () => r(require('@/page/networkList')), 'networkList');
const ipList = r => require.ensure([], () => r(require('@/page/IPList')), 'IPList');
const idcList = r => require.ensure([], () => r(require('@/page/idcList')), 'idcList');
const visitor = r => require.ensure([], () => r(require('@/page/visitor')), 'visitor');
const newMember = r => require.ensure([], () => r(require('@/page/newMember')), 'newMember');
const uploadImg = r => require.ensure([], () => r(require('@/page/uploadImg')), 'uploadImg');
const adminSet = r => require.ensure([], () => r(require('@/page/adminSet')), 'adminSet');
const sendMessage = r => require.ensure([], () => r(require('@/page/sendMessage')), 'sendMessage');

const routes = [
    {
        path: '/',
        component: login
    },
    {
        path: '/manage',
        component: manage,
        meta: [],
        name: '',
        children: [{
            path: '',
            component: home,
            meta: [],
        }, {
            path: '/addHost',
            component: addHost,
            meta: ['添加数据', '添加主机'],
        }, {
            path: '/addDevice',
            component: addDevice,
            meta: ['添加数据', '添加设备'],
        }, {
            path: '/addIp',
            component: addIp,
            meta: ['添加数据', '添加IP'],
        }, {
            path: '/addIdc',
            component: addIdc,
            meta: ['添加数据', '添加IDC'],
        }, {
            path: '/hostList',
            component: hostList,
            meta: ['数据管理', '主机列表'],
        }, {
            path: '/monitList',
            component: monitList,
            meta: ['数据管理', '监控列表'],
        }, {
            path: '/deviceList',
            component: deviceList,
            meta: ['数据管理', '设备列表'],
        }, {
            path: '/networkList',
            component: networkList,
            meta: ['数据管理', 'IP段列表'],
        }, {
            path: '/IPList',
            component: ipList,
            meta: ['数据管理', 'IP列表'],
        }, {
            path: '/idcList',
            component: idcList,
            meta: ['数据管理', 'IDC列表'],
        }, {
            path: '/visitor',
            component: visitor,
            meta: ['图表', '用户分布'],
        }, {
            path: '/newMember',
            component: newMember,
            meta: ['图表', '用户数据'],
        }, {
            path: '/uploadImg',
            component: uploadImg,
            meta: ['文本编辑', 'MarkDown'],
        }, {
            path: '/adminSet',
            component: adminSet,
            meta: ['设置', '管理员设置'],
        }, {
            path: '/sendMessage',
            component: sendMessage,
            meta: ['设置', '发送通知'],
        }]
    }
]
const router = new Router({
    routes,
    strict: process.env.NODE_ENV !== 'production',
});
const routesWhiteList = ['/']

function toLoginRoute() {
    return {path: '/', replace: true}
}

router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('token'); // 从本地存储中获取身份验证令牌
    if (isAuthenticated) {
        const res = info({'token': isAuthenticated});
        res.then(response => {
            const status = response.status;
            if (status == 1) {
                if (to.path === '/') {
                    next({path: "/manage"});
                } else {
                    next()
                }
            } else {
                localStorage.removeItem('token')
                next(toLoginRoute(to.path))
            }
        }).catch(error => {
            console.error(error); // 在控制台打印错误信息
        });

    } else {
        if (routesWhiteList.includes(to.path)) {
            next()
        } else next(toLoginRoute(to.path))
    }

});
export default router;

