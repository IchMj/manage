<template>
    <div class="fillcontain">
        <head-top></head-top>
        <header class="admin_title">修改密码</header>
        <div class="admin_set">
            <el-row style="margin-top: 20px;">
                <el-col :span="8" :offset="6" style="margin-top: 30px">
                    <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
                        <el-form-item label="旧密码" prop="old">
                            <el-input v-model="formData.old"></el-input>
                        </el-form-item>
                        <el-form-item label="新密码" prop="new">
                            <el-input v-model="formData.new" placeholder="请输入密码" show-password></el-input>
                        </el-form-item>
                        <el-form-item label="重复密码" prop="renew">
                            <el-input v-model="formData.renew" placeholder="请再次输入密码" show-password></el-input>
                        </el-form-item>
<!--                        <ul>-->
<!--                            <li>-->
<!--                                <span>更换头像：</span>-->
<!--                                <el-upload-->
<!--                                    class="avatar-uploader"-->
<!--                                    :action="baseUrl + '/admin/update/avatar/' + adminInfo.id"-->
<!--                                    :show-file-list="false"-->
<!--                                    :on-success="uploadImg"-->
<!--                                    :before-upload="beforeImgUpload">-->
<!--                                    <img v-if="adminInfo.avatar" :src="baseImgPath + adminInfo.avatar" class="avatar">-->
<!--                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
<!--                                </el-upload>-->
<!--                            </li>-->
<!--                        </ul>-->
                        <el-form-item class="button_submit">
                            <el-button type="primary" @click="submitForm('formData')">立即创建</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>

        </div>
    </div>
</template>

<script>
import headTop from '../components/headTop'
import {mapState} from 'vuex'
import {baseUrl, baseImgPath} from '@/config/env'
import {addNetwork, changepass} from "@/api/getData";

export default {
    data() {

        return {
            baseUrl,
            baseImgPath,
            formData: {
                old: '',
                new: '',
                renew: ''

            },
            rules: {
                old: [
                    {required: true, message: '请输入旧密码', trigger: 'blur'},
                ],
                new: [
                    {required: true, message: '请输入新密码', trigger: 'blur'},
                ],
                renew: [
                    {required: true, message: '请再次输入密码', trigger: 'blur'},
                ]
            }
        }
    },
    components: {
        headTop,
    },
    computed: {
        ...mapState(['adminInfo']),
    },
    methods: {
        uploadImg(res, file) {
            if (res.status == 1) {
                this.adminInfo.avatar = res.image_path;
            } else {
                this.$message.error('上传图片失败！');
            }
        },
        beforeImgUpload(file) {
            const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isRightType) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isRightType && isLt2M;
        }, submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    try {
                        let result = await changepass(this.formData);
                        if (result.status == 1) {
                            this.$message({
                                type: 'success',
                                message: result.message
                            });
                            this.formData = {
                                old: '',
                                new: '',
                                renew: ''
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
    },
}
</script>

<style lang="less">
@import '../style/mixin';

.explain_text {
    margin-top: 20px;
    text-align: center;
    font-size: 20px;
    color: #333;
}

.admin_set {
    width: 60%;
    background-color: #F9FAFC;
    min-height: 400px;
    margin: 20px auto 0;
    border-radius: 10px;

    ul > li {
        padding: 20px;

        span {
            color: #666;
        }
    }
}

.admin_title {
    margin-top: 20px;
    .sc(24px, #666);
    text-align: center;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    margin-top: 10px;
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
