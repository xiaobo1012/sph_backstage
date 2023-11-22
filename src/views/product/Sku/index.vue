<template>
	<div>
		<el-table
				style="width: 100%;margin: 20px"
				border
				:data="skuPageData"
		>
			<el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
			<el-table-column prop="skuName" label="名称" width="width"></el-table-column>
			<el-table-column prop="skuDesc" label="描述" width="width"></el-table-column>
			<el-table-column label="默认图片" width="110">
				<template v-slot="{row,$index}">
					<div class="demo-image__preview">
						<el-image
								style="width: 80px; height: 80px"
								:src="row.skuDefaultImg"
								:preview-src-list=[row.skuDefaultImg]
						>
						</el-image>
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="weight" label="重量（KG）" width="100"></el-table-column>
			<el-table-column prop="price" label="价格（元）" width="100"></el-table-column>
			<el-table-column label="操作">
				<template v-slot="{row,$index}">
					<el-tooltip class="item" effect="dark" content="下架sku" placement="top-start" v-if="row.isSale===1">
						<el-button type="info" icon="el-icon-bottom" size="mini" @click="cancelSale(row)"></el-button>
					</el-tooltip>
					<el-tooltip class="item" effect="dark" content="上架sku" placement="top-start" v-if="row.isSale===0">
						<el-button type="success" icon="el-icon-top" size="mini" @click="onSale(row)"></el-button>
					</el-tooltip>
					<el-tooltip class="item" effect="dark" content="编辑sku" placement="top">
						<el-button type="primary" size="mini" icon="el-icon-edit" @click="edit"></el-button>
					</el-tooltip>
					<el-tooltip class="item" effect="dark" content="查看详情" placement="top">
						<el-button type="info" size="mini" icon="el-icon-info" @click="getSkuDetail(row)"></el-button>
					</el-tooltip>
					<el-tooltip class="item" effect="dark" content="删除sku" placement="top-end">
						<el-popconfirm
								title="确定删除该sku吗？"
								confirm-button-text="确定"
								cancel-button-text="取消"
								@confirm="deleteSku(row)"
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
		<!--	分页器		-->
		<el-pagination
				style="text-align: center;margin-top: 20px"
				:current-page="pagination.currentPage"
				:page-sizes="[5, 7,10]"
				:page-size="pagination.pageSize"
				layout="prev, pager, next, jumper,->,sizes,total"
				:total="pagination.total"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
		>
		</el-pagination>
		<!--	抽屉-->
		<el-drawer title="我是标题" :visible.sync="drawer" :show-close="false" size="45%">
			<el-row>
				<el-col :span="5">名称</el-col>
				<el-col :span="16">{{ skuDetail.skuName }}</el-col>
			</el-row>
			<el-row>
				<el-col :span="5">描述</el-col>
				<el-col :span="16">{{ skuDetail.skuDesc }}</el-col>
			</el-row>
			<el-row>
				<el-col :span="5">价格</el-col>
				<el-col :span="16">{{ skuDetail.price }}</el-col>
			</el-row>
			<el-row>
				<el-col :span="5">平台属性</el-col>
				<el-col :span="16">
					<el-tag
							type="success"
							v-for="attr in skuDetail.skuAttrValueList"
							:key="attr.attrId"
							style="margin-left: 10px"
					>{{ attr.attrId }}-{{ attr.valueId }}
					</el-tag>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="5">商品图片</el-col>
				<el-col :span="16">
					<!--轮播图-->
					<el-carousel height="500px" wight="400px">
						<el-carousel-item v-for="item in skuDetail.skuImageList" :key="item.id">
							<img :src="item.imgUrl" style="width: 100%;height: 100%">
						</el-carousel-item>
					</el-carousel>
				</el-col>
			</el-row>
		</el-drawer>
	</div>
</template>

<script>
export default {
	name: 'Sku',
	data() {
		return {
			pagination: {
				currentPage: 1,
				total: 0,
				pageSize: 5
			},
			// SKU页面信息
			skuPageData: [],
			// sku详情信息
			skuDetail: {},
			//	展示抽屉
			drawer: false
		}
	},
	mounted() {
		this.initData()
	},
	methods: {
		/**
		 * 初始化页面数据
		 * 更具分页器页码去获取数据
		 */
		async initData() {
			const { currentPage, pageSize } = this.pagination
			let result = await this.$API.sku.reqSkuData(currentPage, pageSize)
			if (result.code === 200) {
				this.pagination.total = result.data.total
				this.skuPageData = result.data.records
			}
		},
		//	分页器
		/**
		 * 当页面的显示数据个数设置发生变化时触发
		 */
		handleSizeChange(pageSize) {
			this.pagination.pageSize = pageSize
			this.initData()
		},
		/**
		 * 当页面当前页码发生变化时触发
		 */
		handleCurrentChange(currentPage) {
			this.pagination.currentPage = currentPage
			this.initData()
		},

		/**
		 * 上架产品
		 * @param row 所选行的对象
		 */
		async onSale(row) {
			let result = await this.$API.sku.onSale(row.id)
			if (result === 200) {
				this.$message({ type: 'success', message: '上架成功' })
				row.isSale = 1
			}
			/* let result = await this.$API.sku.onSale(row.spuId).then(() => {
				row.isSale = 0
			}) */
		},

		/**
		 * 下架产品
		 * @param row
		 */
		async cancelSale(row) {
			let result = await this.$API.sku.cancelSale(row.id)
			if (result === 200) {
				this.$message({ type: 'success', message: '下架成功' })
				row.isSale = 0
			}
		},

		/**
		 *
		 */
		edit() {
			this.$message('正在开发中~~')
		},

		/**
		 * 获取sky的详情页
		 */
		async getSkuDetail(row) {
			let result = await this.$API.sku.skuDetail(row.id)
			// console.log(result)
			if (result.code === 200) {
				this.skuDetail = result.data
				this.drawer = true
			}
		},

		/**
		 * 删除按钮
		 */
		async deleteSku(row) {
			// 发送删除请求
			let result = await this.$API.sku.deleteSku(row.id)
			if (result.code === 200) {
				this.$message({
					type: 'success',
					message: '删除成功'
				})
				if (this.skuPageData.length === 1) {
					this.pagination.currentPage--
				}
				//	重新请求页面数据
				await this.initData()
			}
		}

	}
}

</script>


<style scoped>
.el-row .el-col-5 {
	font-size: 20px;
	font-width: bolder;
	text-align: right;
}

.el-col {
	margin: 10px;
}


/***********轮播图************/
.el-carousel__item h3 {
	color: #475669;
	font-size: 14px;
	opacity: 0.75;
	line-height: 150px;
	margin: 0;
}

.el-carousel__item:nth-child(2n) {
	background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
	background-color: #d3dce6;
}

>>> .el-carousel__button {
	width: 10px;
	height: 10px;
	background: red;
	border-radius: 50%;
}
</style>
