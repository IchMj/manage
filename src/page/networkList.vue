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
                    label="IP"
                    prop="ip">
                </el-table-column>
                <el-table-column
                    label="网关"
                    prop="gateway">
                </el-table-column>
                <el-table-column
                    label="备注"
                    prop="describe">
                </el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button size="mini" @click="handleGet(scope.$index, scope.row)">详情</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
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
            <el-dialog title="修改ip段信息" v-model="dialogFormVisible">
                <el-form :model="selectTable">
                    <el-form-item label="ID" label-width="100px">
                        <span>{{ selectTable.id }}</span>
                    </el-form-item>
                    <el-form-item label="ip段" label-width="100px">
                        <el-input v-model="selectTable.ip" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="网关" label-width="100px">
                        <el-input v-model="selectTable.gateway"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" label-width="100px">
                        <el-input v-model="selectTable.describe"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="updateNetwork">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import headTop from '../components/headTop'
import {
    getUserInfo,
    getNetworkList,
    updateNet,
    deleteNet
} from '../api/getData'

export default {
    data() {
        return {
            tableData: [],
            currentRow: null,
            offset: 0,
            limit: 20,
            count: 0,
            selectTable: {},
            currentPage: 1,
            dialogFormVisible: false,
            restaurant_id: null,
            expendRow: [],
        }
    },
    components: {
        headTop,
    },
    created() {
        this.restaurant_id = this.$route.query.restaurant_id;
        this.initData();
    },
    mounted() {

    },
    methods: {
        async getNetworkList() {
            this.tableData = [];
            try {
                const countData = await getNetworkList();
                if (countData.status == 1) {
                    this.count = countData.count;
                    this.tableData = countData.data;
                } else {
                    throw new Error('获取数据失败');
                }
            } catch (err) {
                console.log('获取数据失败', err);
            }
        },
        async initData() {
            try {
                const countData = await getNetworkList();
                if (countData.status == 1) {
                    this.count = countData.count;
                    this.tableData = countData.data;
                } else {
                    throw new Error('获取数据失败');
                }
            } catch (err) {
                console.log('获取数据失败', err);
            }
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.offset = (val - 1) * this.limit;
            this.getOrders()
        },
        handleEdit(index, row) {
            this.selectTable = row;
            this.dialogFormVisible = true;
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
        handleGet(index, row) {
            this.$router.push({
                path: '/IPList',
                query: {
                    id: row.id
                }
            })

        },
        async updateNetwork() {
            this.dialogFormVisible = false;
            try {
                Object.assign(this.selectTable, this.address);
                const res = await updateNet(this.selectTable)
                if (res.status == 1) {
                    this.$message({
                        type: 'success',
                        message: '更新信息成功'
                    });
                    this.getNetworkList();
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
        async expand(row, status) {
            if (status) {
                const userInfo = await getUserInfo(row.user_id);
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
    }
    ,
}
</script>

<style lang="less">
@import '../style/mixin';

.table_container {
    padding: 20px;
}

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
</style>
