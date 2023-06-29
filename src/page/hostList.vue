<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                :data="tableData"
                highlight-current-row
                style="width: 100%">
                <el-table-column
                    prop="id"
                    width="60">
                </el-table-column>
                <el-table-column
                    prop="hostname"
                    label="主机名称"
                    width="160">
                </el-table-column>
                <el-table-column
                    prop="ip"
                    label="IP"
                    width="160">
                </el-table-column>
                <el-table-column
                    prop="port"
                    label="端口" width="80">
                </el-table-column>
                <el-table-column
                    prop="username"
                    width="100"
                    label="用户名">
                </el-table-column>
                <el-table-column
                    prop="password"
                    label="密码">
                </el-table-column>
                <el-table-column
                    prop="path"
                    width="120"
                    label="环境">
                </el-table-column>
                <el-table-column
                    prop="create_time"
                    label="创建时间">
                </el-table-column>
                <el-table-column
                    prop="describe"
                    label="备注">
                </el-table-column>
                <el-table-column label="操作" width="120">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="20"
                    layout="total, prev, pager, next"
                    :total="count">
                </el-pagination>
            </div>
            <el-dialog title="修改主机信息" v-model="dialogFormVisible">
                <el-form :model="selectTable">
                    <el-form-item label="ID" label-width="100px">
                        <span>{{ selectTable.id }}</span>
                    </el-form-item>
                    <el-form-item label="设备类型" label-width="100px">
                        <el-input v-model="selectTable.hostname" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="设备配置" label-width="100px">
                        <el-input v-model="selectTable.ip"></el-input>
                    </el-form-item>
                    <el-form-item label="机柜" label-width="100px">
                        <el-input v-model="selectTable.port"></el-input>
                    </el-form-item>
                    <el-form-item label="设备类型" label-width="100px">
                        <el-input v-model="selectTable.username"></el-input>
                    </el-form-item>
                    <el-form-item label="ipmi" label-width="100px">
                        <el-input v-model="selectTable.password"></el-input>
                    </el-form-item>
                    <el-form-item label="用户" label-width="100px">
                        <el-input v-model="selectTable.path"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" label-width="100px">
                        <el-input v-model="selectTable.describe"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="updateHost">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import headTop from '../components/headTop'
import {deleteNet, updateHost, getHostList, updateNet} from "../api/getData";
import {log} from "nightwatch/lib/util/logger";

export default {
    data() {
        return {
            tableData: [],
            selectTable: [],
            currentRow: null,
            offset: 0,
            limit: 20,
            count: 0,
            currentPage: 1,
            dialogFormVisible: false,
        }
    },
    components: {
        headTop,
    },
    created() {
        this.initData();
    },
    methods: {
        async initData() {
            try {
                const countData = await getHostList({'offset': this.offset, 'limit': this.limit});
                if (countData.status == 1) {
                    this.count = countData.count;
                } else {
                    throw new Error('获取数据失败');
                }
                this.getHost();
            } catch (err) {
                console.log('获取数据失败', err);
            }
        },
        async getHost() {
            const Hosts = await getHostList({'offset': this.offset, 'limit': this.limit});
            this.tableData = [];
            Hosts.data.forEach((item, index) => {
                const tableData = {};
                tableData.hostname = item.hostname;
                tableData.id = item.id;
                tableData.ip = item.ip;
                tableData.port = item.port;
                tableData.path = item.path;
                tableData.username = item.username;
                tableData.password = item.password;
                tableData.create_time = item.create_time;
                tableData.describe = item.describe;
                this.tableData.push(tableData);
            })
        },
        async updateHost() {
            this.dialogFormVisible = false;
            try {
                const res = await updateHost(this.selectTable)
                if (res.status == 1) {
                    this.$message({
                        type: 'success',
                        message: '更新信息成功'
                    });
                    this.getHost();
                } else {
                    this.$message({
                        type: 'error',
                        message: res.message
                    });
                }
            } catch (err) {
                console.log('更新信息失败', err);
            }

        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.offset = (val - 1) * this.limit;
            this.getHostlist()
        },
        handleEdit(index, row) {
            this.dialogFormVisible = true;
            this.selectTable = row;
        },
        handleDelete(index, row) {
            this.$confirm('此操作将永久删除该ip段, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                try {
                    const res = await deleteNet(row.id);
                    if (res.status == 1) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getNetworkList();
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.message
                        });
                    }
                } catch (err) {
                    this.$message({
                        type: 'error',
                        message: err
                    });
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
    },
}
</script>

<style lang="less">
@import '../style/mixin';

.table_container {
    padding: 20px;
}
</style>
