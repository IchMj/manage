<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 20px;">
            <el-col :span="12" :offset="4">
                <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
                    <el-form-item label="设备型号" prop="model">
                        <el-input v-model="formData.model" placeholder="dell740"></el-input>
                    </el-form-item>
                    <el-form-item label="设备配置" prop="conf">
                        <el-input v-model="formData.conf"></el-input>
                    </el-form-item>
                    <el-form-item label="机柜" prop="cabinet">
                        <el-input v-model="formData.cabinet"></el-input>
                    </el-form-item>
                    <el-form-item label="设备类型" prop="type">
                        <el-input v-model="formData.type" placeholder="服务器"></el-input>
                    </el-form-item>
                    <el-form-item label="IPMI" prop="ipmi">
                        <el-input v-model="formData.ipmi"></el-input>
                    </el-form-item>
                    <el-form-item label="用户" prop="username">
                        <el-input v-model="formData.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="formData.password"></el-input>
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
import {addHost, addDevice} from '@/api/getData'
import {baseUrl, baseImgPath} from '@/config/env'

export default {
    data() {
        return {
            city: {},
            formData: {
                model: '',
                conf: '',
                cabinet: '',
                type: '',
                ipmi: '',
                username: '',
                password: '',
                describe: '',
            },
            rules: {
                type: [
                    {required: true, message: '请输入设备类型', trigger: 'blur'},
                ],
                cabinet: [
                    {required: true, message: '请输入机柜信息', trigger: 'blur'}
                ],
                ipmi: [
                    {required: true, message: '请输入ipmi地址', trigger: 'blur'}
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
                        let result = await addDevice(this.formData);
                        if (result.status == 1) {
                            this.$message({
                                type: 'success',
                                message: '添加成功'
                            });
                            this.formData = {
                                model: '',
                                conf: '',
                                cabinet: '',
                                type: '',
                                ipmi: '',
                                username: '',
                                password: '',
                                describe: '',
                            };
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

.form {
    min-width: 400px;
    margin-bottom: 30px;

    &:hover {
        box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6), 0 2px 4px 0 rgba(232, 237, 250, .5);
        border-radius: 6px;
        transition: all 400ms;
    }
}

.food_form {
    border: 1px solid #eaeefb;
    padding: 10px 10px 0;
}

.form_header {
    text-align: center;
    margin-bottom: 10px;
}

.category_select {
    border: 1px solid #eaeefb;
    padding: 10px 30px 10px 10px;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
}

.add_category_row {
    height: 0;
    overflow: hidden;
    transition: all 400ms;
    background: #f9fafc;
}

.showEdit {
    height: 185px;
}

.add_category {
    background: #f9fafc;
    padding: 10px 30px 0px 10px;
    border: 1px solid #eaeefb;
    border-top: none;
}

.add_category_button {
    text-align: center;
    line-height: 40px;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
    border: 1px solid #eaeefb;
    border-top: none;
    transition: all 400ms;

    &:hover {
        background: #f9fafc;

        span, .edit_icon {
            color: #20a0ff;
        }
    }

    span {
        .sc(14px, #999);
        transition: all 400ms;
    }

    .edit_icon {
        color: #ccc;
        transition: all 400ms;
    }
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

.cell {
    text-align: center;
}
</style>
