<!--spu模块
		spu可以理解为类

		People类（SPU）
		实例（SKU）
		小明：小明 18 男 。。。
		小红：小红 20 女。。
-->
<template>
	<div>
		<!--三级联动-->
		<el-card style="margin: 20px 20px">
			<!--自定义事件  将子组件中的三个id传给父组件
			isShowTable 是给categoryselect传递数据的，props   用于操作一级，二级，三级分类是否可以被点击
			-->
			<categoryselect @getcategoryId="getcategoryId" :isShowTable="scene===0"></categoryselect>
		</el-card>
		<el-card style="margin: 0 20px">
			<!--展示SPU列表结构-->
			<div v-show="scene===0">
				<el-button
						type="primary"
						icon="el-icon-plus"
						style="margin-bottom: 5px"
						@click="addSpu"
						:disabled="!categoryId.id3"
				>
					添加SPU
				</el-button>
				<el-table style="width: 100%" border :data="records">
					<el-table-column type="index" align="center" label="序号" width="80"></el-table-column>
					<el-table-column prop="spuName" label="spu名称" width="width"></el-table-column>
					<el-table-column prop="description" label="spu描述" width="width"></el-table-column>
					<el-table-column label="操作" width="width">
						<template v-slot="{row,$index}">
							<el-tooltip class="item" effect="dark" content="添加sku" placement="top-start">
								<el-button title="1111" type="success" icon="el-icon-plus" size="mini" @click="addSku(row)"></el-button>
							</el-tooltip>
							<el-tooltip class="item" effect="dark" content="修改spu" placement="top">
								<el-button type="warning" size="mini" icon="el-icon-edit" @click="updateSpu(row)"></el-button>
							</el-tooltip>
							<el-tooltip class="item" effect="dark" content="查看当前spu全部sku列表" placement="top">
								<el-button type="info" size="mini" icon="el-icon-info" @click="handler(row)"></el-button>
							</el-tooltip>
							<el-tooltip class="item" effect="dark" content="删除spu" placement="top-end">
								<el-popconfirm
										title="确定删除该SPU吗？"
										confirm-button-text="确定"
										cancel-button-text="取消"
										@confirm="deleteSpu(row)"
								>
									<el-button
											type="danger"
											size="mini"
											slot="reference"
											icon="el-icon-delete"
											style="margin: 10px"
									></el-button>
								</el-popconfirm>
							</el-tooltip>
						</template>
					</el-table-column>

				</el-table>
				<el-pagination
						v-show="records.length>0"
						style="text-align: center"
						:current-page=currentPage
						:page-sizes="[5,7,10]"
						:page-size=limit
						layout="prev, pager, next, jumper,->,sizes,total"
						:total=total
						@current-change="handleCurrentChange"
						@size-change="handleSizeChange"
				>
				</el-pagination>
			</div>

			<!--todo ref 通过这个属性父组件就可以找到子组件，也可以操作子组件中的所有函数和数据-->
			<SpuForm v-show="scene===1" @changeScene="change" ref="spu"></SpuForm>
			<SkuForm v-show="scene===2" @changeScene="change" ref="sku"></SkuForm>

			<!--打开嵌套表格的 Dialog-->
			<el-dialog :title="`${spu.spuName}的sku列表`" :visible.sync="dialogTableVisible">
				<el-table style="width: 100%" :data="skuList" v-loading="loading">
					<el-table-column prop="skuName" label="名称" width="width"></el-table-column>
					<el-table-column prop="price" label="价格" width="width"></el-table-column>
					<el-table-column prop="weight" label="重量" width="width"></el-table-column>
					<el-table-column label="默认图片" width="width">
						<template v-slot="{row,$index}">
							<div class="demo-image__preview">
								<el-image
										style="width: 100px; height: 100px"
										:src="row.skuDefaultImg"
										:preview-src-list=[row.skuDefaultImg]
								></el-image>
							</div>
						</template>
					</el-table-column>
				</el-table>
			</el-dialog>
		</el-card>
	</div>
</template>

<script>
import SpuForm from '@/views/product/Spu/SpuForm'
import SkuForm from '@/views/product/Spu/SkuForm'

export default {
	name: 'Spu',
	components: {
		SpuForm,
		SkuForm
	},
	data() {
		return {
			categoryId: {},     // 保存category子组件传过来的id
			currentPage: 1, // 分页器
			limit: 5,
			total: 0,
			records: [],			// 保存spu列表数据
			isShowTable: true,			// 控制三级联动一级table标签的展示
			scene: 0,					// 0--展示spu列表数据 1--添加修改spu  2--添加sku
			// 展示dialog弹出框
			dialogTableVisible: false,
			spu: {},
			skuList: [],
			loading: true
		}
	},
	methods: {
		/**
		 * 自定义事件
		 * 用来获取传回来的id123
		 */
		getcategoryId(categoryId) {
			this.categoryId = categoryId
			// 获取spu列表数据
			this.getSpuList()
		},
		/**
		 *  获取spu列表数据
		 *  currentPage    当前页面
		 *  limit          每页显示条数
		 *  this.categoryId.id3
		 */
		async getSpuList() {
			// 通过id去获取数据
			let { currentPage, limit } = this
			let result = await this.$API.spu.getSpuValueList(currentPage, limit, this.categoryId.id3)
			// console.log(result)
			if (result.code === 200) {
				this.total = result.data.total
				this.records = result.data.records
			}
		},
		/**
		 * 点击分页器第几页按钮的回调
		 * @param page  点击的第几页
		 */
		handleCurrentChange(page) {
			this.currentPage = page
			this.getSpuList()
		},
		/**
		 * 页面显示大小改变后触发
		 * @param pageSize  页面显示大小
		 */
		handleSizeChange(pageSize) {
			this.limit = pageSize
			this.getSpuList()
		},

		/**
		 * 修改spu的按钮
		 * @param row  当前对象
		 */
		updateSpu(row) {
			this.scene = 1
			// 通过ref去获取spuform的实例对象，这样就可以获取到子组件上的属性和对象了
			// 这样就可与在进入spuForm组件的时候进行组件数据的初始化，因为使用的是v-show，所以组件早就挂载了，就没法使用mounted去初始化spuForm组件了
			this.$refs.spu.initSpuData(row)
		},
		/**
		 * spuForm的"自定义事件"
		 * 用于切换scene展示
		 * @param scene 子组件传递过来的值
		 */
		change(obj) {
			this.scene = obj.scene
			// flag是用来区分保存按钮是添加还是修改  0 --- 添加  1 --- 修改
			if (obj.flag === 0) {
				this.currentPage = 1
			}
			// if (this.scene === 1) {
			this.getSpuList()
			// }
		},
		/**
		 * 添加spu操作按钮
		 * 实现组件的切换
		 */
		addSpu() {
			// 切换组件场景
			this.scene = 1
			//	通知子组件spuForm发送请求---通过操作子组件中的函数实现
			this.$refs.spu.addSpuData(this.categoryId.id3)
		},
		/**
		 *
		 * @param row
		 * @param index
		 */
		async deleteSpu(row) {
			// 发送删除请求
			let result = await this.$API.spu.deleteSpu(row.id)
			if (result.code === 200) {
				this.$message({
					type: 'success',
					message: '删除成功'
				})
				if (this.records.length === 1) {
					this.currentPage--
				}
				//	重新请求页面数据
				await this.getSpuList()
			}
		},

		/***********************SKU**************************************************/
		addSku(row) {
			this.scene = 2
			this.$refs.sku.initData(row, this.categoryId)
		},

		/*************展示sku信息***************/
		async handler(spu) {
			this.skuList = []
			this.loading = true
			this.dialogTableVisible = true
			this.spu = spu
			let result = await this.$API.spu.reqSkuList(spu.id)
			// console.log(result)
			if (result.code === 200) {
				this.skuList = result.data
				this.loading = false
			}
		}

	}
}
</script>

<style scoped>

</style>
