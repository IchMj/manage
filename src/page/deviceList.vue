<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                :data="tableData"
                @expand='expand'
                :expand-row-keys='expendRow'
                :row-key="row => row.index"
                style="width: 100%">
                <el-table-column
                    label="ID"
                    prop="id">
                </el-table-column>
                <el-table-column
                    label="设备类型"
                    prop="model">
                </el-table-column>
                <el-table-column
                    label="设备配置"
                    prop="conf">
                </el-table-column>
                <el-table-column
                    label="机柜"
                    prop="cabinet">
                </el-table-column>
                <el-table-column
                    label="设备类型"
                    prop="type">
                </el-table-column>
                <el-table-column
                    label="IPMI"
                    prop="ipmi">
                </el-table-column>
                <el-table-column
                    label="用户"
                    prop="username">
                </el-table-column>
                <el-table-column
                    label="密码"
                    prop="password">
                </el-table-column>
                <el-table-column
                    label="备注"
                    prop="describe">
                </el-table-column>
                <el-table-column label="操作" width="160">
                    <template slot-scope="scope">
                        <el-button
                            size="small"
                            @click="handleEdit(scope.row)">编辑
                        </el-button>
                        <el-button
                            size="small"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="Pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="20"
                    layout="total, prev, pager, next"
                    :total="count">
                </el-pagination>
            </div>
            <el-dialog title="修改设备信息" v-model="dialogFormVisible">
                <el-form :model="selectTable">
                    <el-form-item label="ID" label-width="100px">
                        <span>{{ selectTable.id }}</span>
                    </el-form-item>
                    <el-form-item label="设备类型" label-width="100px">
                        <el-input v-model="selectTable.model" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="设备配置" label-width="100px">
                        <el-input v-model="selectTable.type"></el-input>
                    </el-form-item>
                    <el-form-item label="机柜" label-width="100px">
                        <el-input v-model="selectTable.cabinet"></el-input>
                    </el-form-item>
                    <el-form-item label="设备类型" label-width="100px">
                        <el-input v-model="selectTable.type"></el-input>
                    </el-form-item>
                    <el-form-item label="ipmi" label-width="100px">
                        <el-input v-model="selectTable.ipmi"></el-input>
                    </el-form-item>
                    <el-form-item label="用户" label-width="100px">
                        <el-input v-model="selectTable.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" label-width="100px">
                        <el-input v-model="selectTable.password"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" label-width="100px">
                        <el-input v-model="selectTable.describe"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="updateDevice">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import headTop from '../components/headTop'
import {baseUrl, baseImgPath} from '@/config/env'
import {deleteDevice, updateDevice} from '@/api/getData'
import { getDeviceList} from "../api/getData";

export default {
    data() {
        return {
            restaurant_id: null,
            offset: 0,
            limit: 20,
            count: 0,
            tableData: [],
            currentPage: 1,
            selectTable: {},
            expendRow: [],
            dialogFormVisible: false,
        }
    },
    created() {
        this.initData();
    },
    components: {
        headTop,
    },
    methods: {
        async initData() {
            try {
                const countData = await getDeviceList({'offset': this.offset, 'limit': this.limit});
                if (countData.status == 1) {
                    this.count = countData.count;
                } else {
                    throw new Error('获取数据失败');
                }
                this.getDevice();
            } catch (err) {
                console.log('获取数据失败', err);
            }
        },
        async getDevice() {
            const Devices = await getDeviceList({'offset': this.offset, 'limit': this.limit});
            this.tableData = [];
            Devices.data.forEach((item, index) => {
                const tableData = {};
                tableData.model = item.model;
                tableData.id = item.id;
                tableData.conf = item.conf;
                tableData.cabinet = item.cabinet;
                tableData.type = item.type;
                tableData.ipmi = item.ipmi;
                tableData.username = item.username;
                tableData.password = item.password;
                tableData.describe = item.describe;
                this.tableData.push(tableData);
            })
        }, async expand(row, status) {
            if (status) {
                const addressInfo = await getAddressById(row.address_id);
                this.tableData.splice(row.index, 1, {
                    ...row, ...{
                        restaurant_name: restaurant.name,
                        restaurant_address: restaurant.address,
                        address: addressInfo.address,
                        user_name: userInfo.username
                    }
                });
                this.$nextTick(() => {
                    this.expendRow.push(row.index);
                })
            } else {
                const index = this.expendRow.indexOf(row.index);
                this.expendRow.splice(index, 1)
            }
        },
        handleDelete(index, row) {
            this.$confirm('此操作将永久删除该设备, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                try {
                    const res = await deleteDevice(row.id);
                    if (res.status == 1) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getDevice();
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
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.offset = (val - 1) * this.limit;
            this.getDevice()
        },
        handleEdit(row) {
            this.selectTable = row;
            this.dialogFormVisible = true;
        },
        async updateDevice() {
            this.dialogFormVisible = false;
            try {
                const postData = this.selectTable;
                const res = await updateDevice(postData)
                if (res.status == 1) {
                    this.$message({
                        type: 'success',
                        message: '更新设备信息成功'
                    });
                    this.getDevice();
                } else {
                    this.$message({
                        type: 'error',
                        message: res.message
                    });
                }
            } catch (err) {
                console.log('更新设备信息失败', err);
            }
        },
    },
}
</script>

<style lang="less">
@import '../style/mixin';

.demo-table-expand {
    font-size: 0;
}

.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}

.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}

.table_container {
    padding: 20px;
}

.Pagination {
    display: flex;
    justify-content: flex-start;
    margin-top: 8px;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
}

.avatar {
    width: 120px;
    height: 120px;
    display: block;
}
</style>
