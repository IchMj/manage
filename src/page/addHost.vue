<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 20px;">
            <el-col :span="12" :offset="4">
                <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
                    <el-form-item label="主机名称" prop="hostname">
                        <el-input v-model="formData.hostname"></el-input>
                    </el-form-item>
                    <el-form-item label="IP" prop="ip">
                        <el-input v-model="formData.ip"></el-input>
                    </el-form-item>
                    <el-form-item label="端口" prop="port">
                        <el-input v-model="formData.port"></el-input>
                    </el-form-item>
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="formData.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="formData.password"></el-input>
                    </el-form-item>
                    <el-form-item label="使用环境" prop="path">
                        <el-input v-model="formData.path"></el-input>
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
import {addHost} from '@/api/getData'
import {baseUrl, baseImgPath} from '@/config/env'

export default {
    data() {
        return {
            city: {},
            formData: {
                hostname: '',
                ip: '',
                port: '',
                username: '',
                password: '',
                path: '',
            },
            rules: {
                hostname: [
                    {required: true, message: '请输入主机名称', trigger: 'blur'},
                ],
                ip: [
                    {required: true, message: '请输入ip地址', trigger: 'blur'}
                ],
                port: [
                    {required: true, message: '请输入ssh端口', trigger: 'blur'}
                ],
            },
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
                        let result = await addHost(this.formData);
                        if (result.status == 1) {
                            this.$message({
                                type: 'success',
                                message: '添加成功'
                            });
                            // this.formData = {
                            //     hostname: '',
                            //     ip: '',
                            //     port: '',
                            //     username: '',
                            //     password: '',
                            //     path: '',
                            // };
                        } else {
                            this.$message({
                                type: 'error',
                                message: result.message
                            });
                        }
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
