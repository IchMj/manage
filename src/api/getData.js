import fetch from '@/config/fetch'

/**
 * 登陆
 */

export const login = data => fetch('/admin/login', data, 'POST');
export const info = data => fetch('/admin/info', data, 'POST');
/**
 * 退出
 */

export const signout = () => fetch('/admin/signout');


export const addHost = data => fetch('/host/addHost', data, 'POST');

/**
 * 更新数据
 */
export const updateNet = data => fetch('/host/updateNetwork', data, 'POST');
export const deleteNet = data => fetch('/host/deleteNetwork', data, 'POST');
export const addNetwork = data => fetch('/host/addNetwork', data, 'POST');
export const getipList = data => fetch('/host/getIpList', data, 'POST');
export const updateIp = data => fetch('/host/updateIp', data, 'POST');
export const addDevice = data => fetch('/host/addDevice', data, 'POST');
export const getDeviceList = data => fetch('/host/getDeviceList', data, 'POST');
export const updateDevice = data => fetch('/host/updateDevice', data, 'POST');
export const deleteDevice = data => fetch('/host/deleteDevice', data, 'POST');
export const changepass = data => fetch('/admin/changepass', data, 'POST');

/**
 * 获取主机数据
 */
export const getHostList = data => fetch('/host/getHostList', data, 'POST');
export const updateHost = data => fetch('/host/updateHost', data, 'POST');
/**
 * 获取监控数据
 */
export const getMonitList =() => fetch('/host/getMonitList', 'POST');

/**
 * 获取设备数据
 */

/**
 * 获取IP段数据
 */
export const getNetworkList =() => fetch('/host/getNetworkList', 'POST');
/**
 * 获取用户信息
 */

export const getUserInfo = user_id => fetch('/v1/user/' + user_id);

/**
 * 获取用户分布信息
 */

export const getUserCity = () => fetch('/v1/user/city/count');
