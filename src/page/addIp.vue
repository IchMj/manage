<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 20px;">
            <el-col :span="12" :offset="4">
                <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
                    <el-form-item label="ip段" prop="ip">
                        <el-input v-model="formData.ip" placeholder="192.168.31.0/24"></el-input>
                    </el-form-item>
                    <el-form-item label="网关" prop="gateway">
                        <el-input v-model="formData.gateway" placeholder="192.168.31.1"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" prop="describe">
                        <el-input v-model="formData.describe"></el-input>
                    </el-form-item>
                    <el-form-item class="button_submit">
                        <el-button type="primary" @click="submitForm('formData')">立即创建</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import headTop from '@/components/headTop'
import {cityGuess, addNetwork} from '@/api/getData'
import { baseImgPath} from '@/config/env'

export default {
    data() {
        return {
            formData: {
                ip: '', //店铺名称
                gateway: '', //地址
                describe: ''

            },
            rules: {
                ip: [
                    {required: true, message: '请输入ip地址', trigger: 'blur'},
                ]
            }
        }
    },
    components: {
        headTop,
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    try {
                        console.log(this.formData)
                        let result = await addNetwork(this.formData);
                        if (result.status == 1) {
                            this.$message({
                                type: 'success',
                                message: '添加成功'
                            });
                            this.formData = {
                                ip: '',
                                gateway: '',
                                describe: '',
                            };
                        } else {
                            this.$message({
                                type: 'error',
                                message: result.message
                            });
                        }
                        console.log(result)
                    } catch (err) {
                        console.log(err)
                    }
                } else {
                    this.$notify.error({
                        title: '错误',
                        message: '请检查输入是否正确',
                        offset: 100
                    });
                    return false;
                }
            });
        },
    }
}
</script>

<style lang="less">
@import '../style/mixin';

.button_submit {
    text-align: center;
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

.el-table .info-row {
    background: #c9e5f5;
}

.el-table .positive-row {
    background: #e2f0e4;
}
</style>
