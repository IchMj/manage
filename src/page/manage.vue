<template>
	<div class="manage_page fillcontain">
		<el-row style="height: 100%;">
	  		<el-col :span="4"  style="min-height: 100%; background-color: #324057;">
				<el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
					<el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>
					<el-submenu index="2">
						<template slot="title"><i class="el-icon-document"></i>数据管理</template>
						<el-menu-item index="hostList">主机列表</el-menu-item>
						<el-menu-item index="monitList">监控列表</el-menu-item>
						<el-menu-item index="deviceList">设备列表</el-menu-item>
						<el-menu-item index="networkList">IP列表</el-menu-item>
						<el-menu-item index="idcList">IDC列表</el-menu-item>
					</el-submenu>
					<el-submenu index="3">
						<template slot="title"><i class="el-icon-plus"></i>添加数据</template>
						<el-menu-item index="addHost">添加主机</el-menu-item>
						<el-menu-item index="addDevice">添加设备</el-menu-item>
						<el-menu-item index="addIp">添加IP</el-menu-item>
						<el-menu-item index="addIdc">添加IDC</el-menu-item>
					</el-submenu>
					<el-submenu index="4">
						<template slot="title"><i class="el-icon-star-on"></i>远程任务</template>
						<el-menu-item index="visitor">任务列表</el-menu-item>
                        <el-menu-item index="visitorLog">新建任务</el-menu-item>
                        <el-menu-item index="visitorLog">任务日志</el-menu-item>
						<!-- <el-menu-item index="newMember">用户数据</el-menu-item> -->
					</el-submenu>
					<el-submenu index="6">
						<template slot="title"><i class="el-icon-setting"></i>设置</template>
						<el-menu-item index="adminSet">管理员设置</el-menu-item>
						<!-- <el-menu-item index="sendMessage">发送通知</el-menu-item> -->
					</el-submenu>
				</el-menu>
			</el-col>
			<el-col :span="20" style="height: 100%;overflow: auto;">
				<keep-alive>
				    <router-view></router-view>
				</keep-alive>
			</el-col>
		</el-row>
  	</div>
</template>

<script>
    export default {
		computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
		},
    }
</script>


<style lang="less" scoped>
	@import '../style/mixin';
	.manage_page{

	}
</style>
