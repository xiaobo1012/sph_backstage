<template>
  <div>
    <!--<div>品牌管理</div>-->
    <!--按钮-->
    <el-button type="primary" icon="el-icon-plus" style="margin: 10px 10px" @click="showDialog">添加</el-button>
    <!--  表格组件
        data    表示表格中的数据来源
        prop    列表对应的字段名
    -->
    <el-table :data="list" style="width: 100%;margin:0 10px;" border>
      <el-table-column type="index" label="序号" width="80" align="center" />
      <el-table-column prop="tmName" label="品牌名称" />
      <el-table-column prop="logoUrl" label="品牌LOGO">
        <!-- todo slot-scope这个有点不知道作用是什么-->
        <template slot-scope="{row}">
          <img :key="row.id" :src="row.logoUrl" alt="图片加载失败" style="width: 70px;">
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <!--<template slot-scope="{row}">-->
        <template slot-scope="{row}">
          <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateTradeMark(row)">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteTradeMark(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--  分页器   -->
    <el-pagination
      style="margin-top: 20px;text-align: center"
      :current-page="page"
      :page-sizes="[3,5,10]"
      :page-size="limit"
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />

    <!--  添加/修改品牌消息 对话框
    visible.sync  控制对话框显示与隐藏
    -->
    <el-dialog width="42%" :title="tmForm.id?'修改品牌信息':'添加品牌信息'" :visible.sync="dialogFormVisible">
      <!--:model 表示将表单数据收集到哪一个对象中-->
      <el-form ref="ruleForm" :model="tmForm" :rules="rules">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input v-model="tmForm.tmName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <!--上传图片
          :on-success="handleAvatarSuccess"  图片上传成功会触发这个函数
            :before-upload="beforeAvatarUpload"  图片上传之前被触发
          -->
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="tmForm.logoUrl" alt="图片未加载" :src="tmForm.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'TradeMark',
  data() {
    return {
      page: 1,
      limit: 3,
      total: 0,
      // 保存服务器返回的数据
      list: [],
      // 控制对话框显示与隐藏
      dialogFormVisible: false,
      // 表单对象数据收集
      tmForm: {
        // id: '',
        tmName: '',
        logoUrl: ''
      },
      rules: {
        tmName: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'change' }
        ],
        logoUrl: [
          { required: true, message: '请选择品牌logo', trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
    this.getPageList()
  },
  methods: {
    /**
     * 获取品牌分页列表的数据
     * @returns {Promise<void>}
     */
    async getPageList() {
      const { page, limit } = this
      const result = await this.$API.tradeMark.reqTradeMarkPage(page, limit)
      // console.log(result)
      if (result.code === 200) {
        this.total = result.data.total
        this.list = result.data.records
      }
    },
    /**
     * 分页器当前页码变化的时候触发
     * @param page 当前选中的页码
     */
    handleCurrentChange(page) {
      this.page = page
      this.getPageList()
    },
    /**
     * 当页面数据条数改变时触发
     * @param limit  页面显示数据的条数
     */
    handleSizeChange(limit) {
      this.limit = limit
      this.getPageList()
    },
    /**
     * 添加按钮，添加产品
     */
    showDialog() {
      // 展示对话框
      this.dialogFormVisible = true
      // 清除一下对话框中的内容
      this.tmForm.tmName = ''
      this.tmForm.logoUrl = ''
    },
    /**
     * 修改某个品牌的信息
     */
    updateTradeMark(row) {
      this.dialogFormVisible = true
      // 将已经存在的品牌信息进行展示出来
      /*
      todo 这里真的有点不懂了  https://www.bilibili.com/video/BV1Vf4y1T7bw/?p=131&spm_id_from=pageDriver&vd_source=0de1ee80a2ec8e9ede67cbdfd17acc85
      row的对象时从list里面拿的,list保存了从服务器返回的所有对象,如果直接把list中的对象赋值给了tmForm,那么他们两个就会使用
      同一个内存地址,这就导致修改tmForm中的数据的时候,就同时修改了list中的数据,这也就导致了页面中使用list来展示的数据同时被修改了,
      当我们拷贝一份对象在赋值给tmForm的时候,list和tmForm使用的就不是同一个内存地址了,这就不会导致数据同时被修改
      this.tmForm = row
       */
      this.tmForm = { ...row }
    },

    /**
     * 上传图片成功触发的回调
     * @param res  图片上传成功后返回的对象（包括了图片真实的服务器地址）
     * @param file  也是服务器返回的对象
     */
    handleAvatarSuccess(res, file) {
      this.tmForm.logoUrl = res.data
    },
    /**
     * 上传图片之前触发的回调
     * @param file
     * @returns {boolean}
     */
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    /**
     * 增加和修改操作的提交按钮
     * 发送请求
     * @returns {Promise<void>}
     */
    addOrUpdateTradeMark() {
      // valid   这里保存的是表单验证成功或者失败的信息
      this.$refs.ruleForm.validate(async(valid) => {
        if (valid) {
          this.dialogFormVisible = false
          // 添加or修改请求
          const result = await this.$API.tradeMark.addOrUpdateTradeMark(this.tmForm)
          if (result.code === 200) {
            // 弹出一个消息框
            this.$message({
              type: 'success',
              message: this.tmForm.id ? '修改品牌成功' : '添加品牌成功'
            })
            // 重新加载页面数据
            this.page = this.tmForm.id ? this.page : Math.ceil(this.total / this.limit)
            // this.page = this.list.length === 3 ? this.page + 1 : this.page
            if (this.list.length === 3) this.page++
            await this.getPageList()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    /**
     * 删除选中的品牌
     * @param row
     */
    deleteTradeMark(row) {
      // 弹出一个消息框
      this.$confirm(`是否确定删除${row.tmName}`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        // 这里需要发送删除产品的请求了
        let result = await this.$API.tradeMark.deleteTradeMark(row.id)
        if (result.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          //   这里需要重新刷新页面
          this.page = this.list.length > 1 ? this.page : this.page - 1
          await this.getPageList()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
