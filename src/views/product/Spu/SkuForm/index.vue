<template>
	<div>
		<el-form ref="form" :model="skuInfo" label-width="80px">
			<el-form-item label="SPU名称">{{ spu.skuName }}</el-form-item>
			<el-form-item label="SKU名称">
				<el-input placeholder="SKU名称" v-model="skuInfo.skuName"></el-input>
			</el-form-item>
			<el-form-item label="价格(元)">
				<el-input placeholder="价格（元" type="number" v-model.number="skuInfo.price"></el-input>
			</el-form-item>
			<el-form-item label="重量(千克)">
				<el-input placeholder="重量(千克)" v-model.number="skuInfo.weight"></el-input>
			</el-form-item>
			<el-form-item label="规格描述">
				<el-input type="textarea" placeholder="规格描述" rows="4" v-model="skuInfo.skuDesc"></el-input>
			</el-form-item>
			<el-form-item label="平台属性">
				<el-form :inline="true" class="demo-form-inline">
					<el-form-item v-for="item in attrInfoList" :key="item.id" :label="item.attrName" style="margin: 0  10px 10px">
						<!--todo 这个收集数据的想法必须记住	————	将数据保存到平台属性的对象身上，当要用的是时候在去分割开字符串 -->
						<el-select placeholder="请选择" v-model="item.attrIdAndValueId">
							<el-option
									v-for="item1 in item.attrValueList"
									:key="item1.id"
									:label="item1.valueName"
									:value="`${item.id}:${item1.id}`"
							></el-option>
						</el-select>
					</el-form-item>
				</el-form>
			</el-form-item>
			<el-form-item label="销售属性">
				<el-form :inline="true" class="demo-form-inline">
					<el-form-item
							:label="saleAttr.saleAttrName"
							style="margin: 0 10px 10px 10px"
							v-for="saleAttr in spuSaleAttrList"
							:key="saleAttr.id"
					>
						<el-select placeholder="请选择" v-model="saleAttr.saleAttrIdAndSaleValueId">
							<el-option
									:label="saleValue.saleAttrValueName"
									:value="`${saleAttr.id}:${saleValue.id}`"
									v-for="saleValue in saleAttr.spuSaleAttrValueList"
									:key="saleValue.id"
							></el-option>
						</el-select>
					</el-form-item>
				</el-form>
			</el-form-item>
			<el-form-item label="图片列表">
				<el-table style="width: 100%" border :data="spuImageList" @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="55" align="center"></el-table-column>
					<el-table-column label="图片" width="180">
						<template v-slot="{row,$index}">
							<div class="demo-image__preview">
								<el-image
										style="width: 100px; height: 100px"
										:src="row.imgUrl"
										:preview-src-list=[row.imgUrl]
								></el-image>
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="imgName" label="名称"></el-table-column>
					<el-table-column label="操作">
						<template v-slot="{row,$index}">
							<el-button type="primary" size="mini" @click="setDefault(row,$index)" v-show="row.isDefault===0">设为默认
							</el-button>
							<el-button v-show="row.isDefault===1" size="mini" style="color: green">默认</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="saveSkuInfo">保存</el-button>
				<el-button @click="cancel">取消</el-button>
			</el-form-item>
		</el-form>

	</div>
</template>

<script>


export default {
	name: 'skuform',
	data() {
		return {
			// 保存图片数据
			spuImageList: [],
			// 保存销售属性
			spuSaleAttrList: [],
			// 保存平台属性
			attrInfoList: [],
			// spu用于保存从父组件spu中发送过来的行数据
			spu: {},
			// 这个对象就是用于整理/收集数据，在保存提交的时候作为请求的data使用
			skuInfo: {
				category3Id: '',
				price: '',
				skuDesc: '',
				skuName: '',
				spuId: '',
				tmId: '',
				weight: '',
				/*****需要手动整理数据******/
				// 默认值图片
				skuDefaultImg: '',
				skuAttrValueList: [
					// {
					// 	attrId: 0, 			// 平台属性的id
					// 	valueId: 0			// 平台属性值的id
					// }
				],
				// 收集图片信息
				skuImageList: [
					/*      {
											 'id': 0,
											 'imgName': 'string',
											 'imgUrl': 'string',
											 'isDefault': 'string',
											 'skuId': 0,
											 'spuImgId': 0
										 } */
				],
				skuSaleAttrValueList: [
					/* 	{
							'id': 0,
							'saleAttrId': 0,
							'saleAttrName': 'string',
							'saleAttrValueId': 0,
							'saleAttrValueName': 'string',
							'skuId': 0,
							'spuId': 0
						} */
				]
			},
			// 收集勾选中的图片
			imageList: []
		}
	},
	methods: {
		/**
		 * 初始化SkuForm组件数据
		 * 发送请求
		 */
		async initData(spu, categoryId) {
			this.spu = spu
			this.skuInfo.category3Id = categoryId.id3
			// this.skuInfo.skuName = spu.spuName
			this.skuInfo.spuId = spu.id
			this.skuInfo.tmId = spu.tmId
			// this.skuInfo.skuDesc = spu.description
			// 获取图片信息
			let result1 = await this.$API.spu.reqSpuImageList(spu.id)
			if (result1.code === 200) {
				let tempArr = result1.data
				tempArr.forEach(item => {
					// this.$set(item, 'isDefault', 0)
					item.isDefault = 0
				})
				this.spuImageList = tempArr
			}

			// 获取销售属性列表
			let result2 = await this.$API.spu.reqSpuSaleAttrList(spu.id)
			if (result2.code === 200) {
				this.spuSaleAttrList = result2.data
			}

			// 获取平台属性列表
			let result3 = await this.$API.spu.reqAttrInfoList(categoryId.id1, categoryId.id2, categoryId.id3)
			if (result3.code === 200) {
				this.attrInfoList = result3.data
			}
		},
		/**
		 * 清空所有数据
		 */
		clearData() {
			// Object.assign ------- es6中的新方法，用于合并对象
			// this._data ---------- 组件实例，可以操作data中的响应式数据
			// this.$options ------- 可以获取配置对象
			// todo this.$options.data() ---- 配置对象中的data函数执行，返回的响应式数据为空
			Object.assign(this._data, this.$options.data())
		},
		/**
		 *  勾选框触发事件
		 */
		handleSelectionChange(params) {
			this.imageList = params
		},
		/**
		 * 设置为默认图片
		 * @param index
		 */
		setDefault(row, index) {
			// 将所有元素的isDefault设置为0
			this.spuImageList.forEach(item => {
				item.isDefault = 0
			})
			row.isDefault = 1
			// 收集一下默认图片的地址
			this.skuInfo.skuDefaultImg = row.imgUrl
		},

		/**
		 * 保存按钮触发事件
		 */
		async saveSkuInfo() {
			const { attrInfoList, spuSaleAttrList, skuInfo, imageList } = this
			//	整理平台属性
			/* 	attrInfoList.forEach(item => {
					// item.attrIdAndValueId 这个存在就说明是被选中的属性，这样就需要收集其中的数据
					if (item.attrIdAndValueId) {
						const [attrId, valueId] = item.attrIdAndValueId.split(':')
						// 包装成一个对象
						let obj = { attrId, valueId }
						skuInfo.skuAttrValueList.push(obj)
					}
				}) */
			skuInfo.skuAttrValueList = attrInfoList.reduce((prev, item) => {
				if (item.attrIdAndValueId) {
					const [attrId, valueId] = item.attrIdAndValueId.split(':')
					prev.push({ attrId, valueId })
				}
				return prev
			}, [])
			//	整理销售属性
			skuInfo.skuSaleAttrValueList = spuSaleAttrList.reduce((prev, item) => {
				if (item.saleAttrIdAndSaleValueId) {
					const [saleAttrId, saleAttrValueId] = item.saleAttrIdAndSaleValueId.split(':')
					prev.push({ saleAttrId, saleAttrValueId })
				}
				return prev
			}, [])
			// 整理图片
			skuInfo.skuImageList = imageList.map(item => {
				return {
					imageName: item.imageName,
					imageUrl: item.imageUrl,
					isDefault: item.isDefault,
					spuImageId: item.id
				}
			})

			//	发送请求
			// todo Error 这里添加失败了，不知道咋回事
			let result = await this.$API.spu.saveSkuInfo(skuInfo)
			if (result.code === 200) {
				this.$message({
					type: 'success',
					message: '添加SKU成功'
				})
				this.$emit('changeScene', { scene: 0, flag: '' })
			}
		},
		/**
		 * 取消按钮
		 * 点击事件
		 */
		cancel() {
			this.$emit('changeScene', { scene: 0, flag: '' })
			this.clearData()
		}
	}

}
</script>

<style scoped>

</style>
