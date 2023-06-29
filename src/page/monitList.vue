<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    type="index">
                </el-table-column>
                <el-table-column
                  label="主机名"
                  property="hostname">
                </el-table-column>
                <el-table-column
                  label="ip"
                  property="ip">
                </el-table-column>
                <el-table-column
                  label="cpu使用率"
                  width="120"
                  property="cpu_use">
                </el-table-column>
                <el-table-column
                  label="内存使用率"
                  width="120"
                  property="mem_use">
                </el-table-column>
                <el-table-column
                  label="磁盘使用率"
                  property="disk_use">
                </el-table-column>
                <el-table-column
                  label="巡检时间"
                  property="update_time">
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
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {baseUrl, baseImgPath} from '@/config/env'
    import {getMonitList} from '../api/getData'
    export default {
        data(){
            return {
                baseUrl,
                baseImgPath,
                city: {},
                offset: 0,
                limit: 20,
                count: 0,
                tableData: [],
                currentPage: 1,
                selectTable: {},
                dialogFormVisible: false,
                categoryOptions: [],
                selectedCategory: [],
                address: {},
            }
        },
        created(){
            this.initData();
            console.log(12311)
        },
    	components: {
    		headTop,
    	},
        methods: {
            async initData(){
                try{
                    const countData = await getMonitList();
                    if (countData.status == 1) {
                        this.count = countData.count;
                        this.tableData = countData.data;
                    }else{
                        throw new Error('获取数据失败');
                    }
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
            // async getMonitList(){
            //     const {latitude, longitude} = this.city;
            //     const restaurants = await getMonitList();
            //     this.tableData = [];
            //     restaurants.forEach(item => {
            //         const tableData = {};
            //         tableData.username = item.username;
            //         tableData.address = item.address;
            //         tableData.description = item.description;
            //         tableData.id = item.id;
            //         tableData.phone = item.phone;
            //         tableData.rating = item.rating;
            //         tableData.recent_order_num = item.recent_order_num;
            //         tableData.category = item.category;
            //         tableData.image_path = item.image_path;
            //         this.tableData.push(tableData);
            //     })
            // },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                this.getMonitList()
            }
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
    .table_container{
        padding: 20px;
    }
    .Pagination{
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
