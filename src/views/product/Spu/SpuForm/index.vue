<template>
	<div>
		<el-form ref="form" label-width="80px" :model="spu ">
			<el-form-item label="SPU名称">
				<el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
			</el-form-item>
			<el-form-item label="品牌">
				<el-select placeholder="请选择品牌" v-model="spu.tmId">
					<el-option v-for="tm in tradeMarkList" :key="tm.id" :label="tm.tmName" :value="tm.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="SPU描述">
				<el-input type="textarea" placeholder="SPU描述" rows="4" v-model="spu.description"></el-input>
			</el-form-item>
			<el-form-item label="SPU图片">
				<!--:file-list：照片墙需要展示的数据【数组：数组里面的元素务必要有name和url属性】-->
				<el-upload
						action="/dev-api/admin/product/fileUpload"
						list-type="picture-card"
						:file-list="spuImageList"
						:on-preview="handlePictureCardPreview"
						:on-remove="handleRemove"
						:on-success="handleSuccess"
				>
					<i class="el-icon-plus"></i>
				</el-upload>
				<el-dialog :visible.sync="dialogVisible">
					<img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog>
			</el-form-item>
			<el-form-item label="销售属性">
				<el-select
						:placeholder="unSelectAttr.length>0?`还有${unSelectAttr.length}个属性未选择`:'没有啦~~'"
						v-model="attrtIdAndAttrName"
				>
					<el-option
							v-for="item in unSelectAttr"
							:key="item.id"
							:label="item.name"
							:value="`${item.id}:${item.name}`"
					></el-option>
				</el-select>
				<el-button type="primary" icon="el-icon-plus" :disabled="!attrtIdAndAttrName" @click="addSaleAttr">添加销售属性
				</el-button>
				<el-table
						:data="spu.spuSaleAttrList"
						style="width: 100%"
						border
				>
					<el-table-column type="index" label="序号" align="center" width="80"></el-table-column>
					<el-table-column prop="saleAttrName" label="属性名" width="400px"></el-table-column>
					<el-table-column prop="name" label="属性值名称列表" width="width">
						<!--row保存的是一行的销售属性-->
						<template v-slot="{row,$index}">
							<!--tag当前点击的销售属性属性值-->
							<el-tag
									:key="tag.id"
									v-for="(tag,index) in row.spuSaleAttrValueList"
									closable
									:disable-transitions="false"
									@close="handleClose(row,index)"
									style="margin: 5px"
							>
								{{ tag.saleAttrValueName }}
							</el-tag>
							<el-input
									style="margin:5px "
									class="input-new-tag"
									v-if="row.inputVisible"
									v-model="row.inputValue"
									:ref="$index"
									size="small"
									@keyup.enter.native="handleInputConfirm(row)"
									@blur="handleInputConfirm(row)"
							></el-input>
							<el-button v-else class="button-new-tag" size="small" @click="addSaleAttrValue(row,$index)">添加</el-button>
						</template>
					</el-table-column>
					<el-table-column align="center" label="操作" width="80px">
						<template v-slot="{row,$index}">
							<el-tooltip class="item" effect="dark" content="删除spu" placement="top-end">
								<el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteAttr($index)"></el-button>
							</el-tooltip>
						</template>
					</el-table-column>
				</el-table>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitSpuForm">保存</el-button>
				<el-button @click="cancel">取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import { reqAddOrUpdateSpu } from '@/api/product/spu'

export default {
	name: 'SpuForm',
	data() {
		return {
			// 照片墙
			dialogImageUrl: '',
			dialogVisible: false,
			// spu对象用于收集表单数据，并在发送请求的时候发送给服务器，这里面的数据会在最后发送之前先整理一遍
			// 这个对象的作用就是再双向绑定数据的时候提供一个绑定的对象，并用这个对象来存储表单的数据
			spu: {
				'category3Id': 0,
				'spuName': '',//spu名称
				'tmId': '',		//品牌id
				'description': '',//详情、
				/*
						这两个数据里面的数据不能去直接收集，因为里面的元素可能和服务器需要的元素不同
						所以需要再收集之前先处理一下元素
						这就需要把元素先保存在其他地方，等需要的时候在去处理元素，然后将元素保存到spu里面来
				*/
				'spuImageList': [],
				'spuSaleAttrList': []
			},	// 保存spu信息
			tradeMarkList: [],//存储品牌信息
			spuImageList: [],	//存储spu图片信息
			saleAttrList: [],	//销售属性的数据
			attrtIdAndAttrName: ''	//收集未选择的销售属性的id，
		}
	},
	computed: {
		/**
		 * 计算出还没选择的销售属性有几个
		 */
		unSelectAttr() {
			//	通过过滤的方法，将没有被选择过的数据筛选出来
			return this.saleAttrList.filter(item => {
				return this.spu.spuSaleAttrList.every(item1 => {
					return item.name != item1.saleAttrName
				})
			})
		}
	},
	methods: {
		/**
		 * 初始化spu展示页面
		 */
		async initSpuData(spu) {
			// 获取spu信息的数据
			let spuResult = await this.$API.spu.getSpu(spu.id)
			if (spuResult.code === 200) {
				this.spu = spuResult.data
			}
			// 获取品牌信息
			let tradeMarkResult = await this.$API.spu.getTrademarkList()
			if (tradeMarkResult.code === 200) {
				this.tradeMarkList = tradeMarkResult.data
			}
			// 获取图片的数据
			let SpuImageListResult = await this.$API.spu.getSpuImageList(spu.id)
			if (SpuImageListResult.code === 200) {
				// 由于照片墙需要name和url字段，所以再保存图片资源的时候需要处理一下数据
				let listArr = SpuImageListResult.data
				listArr.forEach(item => {
					item.name = item.imgName
					item.url = item.imgUrl
				})
				// 这个数组里面的数据是
				this.spuImageList = listArr
			}
			// 获取平台全局的销售属性
			let saleResult = await this.$API.spu.getBaseSaleAttrList()
			if (saleResult.code === 200) {
				this.saleAttrList = saleResult.data
			}
		},
		/**
		 * 照片墙所需要的函数
		 * @param file  代表删除的那张图片
		 * @param fileList  代表剩余的其他图片
		 */
		// 删除图片操作
		handleRemove(file, fileList) {
			// console.log(file, fileList)
			//	在删除图片后需要收集一下现在剩余的图片
			// 这里面的元素有name和url字段，这是照片墙需要的字段，但是服务器不需要这个字段，所以再发送给服务器之前需要先整理一下这些字段
			this.spuImageList = fileList
		},
		// 预览图片的功能
		handlePictureCardPreview(file) {
			this.dialogImageUrl = file.url
			this.dialogVisible = true
		},
		/**
		 * 图片上传给action成功后的回调函数
		 * @param response  服务器的返回数据
		 * @param file      上传成功的那张图片
		 * @param fileList  所有图片的信息
		 */
		handleSuccess(response, file, fileList) {
			// 将fileList的数据收集起来，这里面的数据就是要发送给服务器的，先临时收集到spuImageList这个数组中去
			this.spuImageList = fileList
		},

		/**
		 * 将属性值删除的操作
		 * @param row
		 * @param  index 属性值在数组中的下标位置
		 */
		handleClose(row, index) {
			// console.log(index)
			// row.spuSaleAttrValueList.splice(row.spuSaleAttrValueList.indexOf(tag), 1)
			row.spuSaleAttrValueList.splice(index, 1)
		},

		/**
		 * 添加操作按钮，添加销售属性值
		 * 可以实现input输入框的展示操作
		 */
		addSaleAttrValue(row, index) {
			// this.inputVisible = true
			// 将inputVisible设置为响应式属性
			// todo 这里添加的是动态属性
			this.$set(row, 'inputVisible', true)
			this.$set(row, 'inputValue', '')
			this.$nextTick(() => {
				// this.$refs[this.spu.spuSaleAttrList[index].spuSaleAttrValueList.length - 1].focus()
				// row.spuSaleAttrValueList[row.spuSaleAttrValueList.length - 1].focus()
			})
		},

		/**
		 * 属性值输入完成后的确定操作回车、失去焦点
		 */
		handleInputConfirm(row) {
			row.inputVisible = false
			const { inputValue, baseSaleAttrId, saleAttrName, spuId } = row
			// 属性值不能为空
			if (!inputValue || inputValue.trim() === '') return this.$message('属性值不能为空！！')
			// 属性值不能重复
			let isRepeat = row.spuSaleAttrValueList.some(item => {
				return item.saleAttrValueName === inputValue
			})
			if (isRepeat) return this.$message('属性值不能重复！！')

			row.spuSaleAttrValueList.push({
				baseSaleAttrId,
				saleAttrName,
				saleAttrValueName: inputValue,
				spuId,
				isChecked: ''
			})
			row.inputValue = ''
		},

		/**
		 *  给table里面添加新的销售属性
		 */
		addSaleAttr() {
			//把收集到的销售属性id和name分割
			let arr = this.attrtIdAndAttrName.split(':')
			// 添加属性的时候需要三个元素
			this.spu.spuSaleAttrList.push({
				baseSaleAttrId: arr[0],
				saleAttrName: arr[1],
				spuSaleAttrValueList: []
			})
			this.attrtIdAndAttrName = ''
		},

		/**
		 * 删除spuform中的一行销售属性
		 * @param row 点击的那一行数据
		 * @param index  那一行数据所在的数组下标
		 */
		deleteAttr(index) {
			this.spu.spuSaleAttrList.splice(index, 1)
		},

		/**
		 * 提交spuform里面的数据
		 */
		async submitSpuForm() {
			// 1、整理提交个服务器的数据（spu对象）
			this.spu.spuImageList = this.spuImageList.map(item => {
				return {
					imgName: item.name,
					imgUrl: (item.response ? item.response.data : item.url)
				}
			})
			// 2、发送请求给服务器
			let result = await this.$API.spu.reqAddOrUpdateSpu(this.spu)
			if (result.code === 200) {
				//	将cenes改为0
				this.$emit('changeScene', {
					scene: 0,
					flag: this.spu.id ? 1 : 0
				})
				this.$message({
					type: 'success',
					message: '保存成功'
				})
			}
			/* 		.then(() => {
				// alert(1111111)
				//	将cenes改为0
				this.$emit('changeScene', 0)
				//	需要重新让spu获取一下页面数据
			}).catch(() => {
				this.$message('保存失败，请检查数据是否正确或联系管理员')
			}) */
			this.clearData()
		},
		/**
		 * 取消按钮
		 */
		cancel() {
			// 子元素要操作父元素，触发自定义事件
			this.$emit('changeScene', { scene: 0, flag: '' })
			this.attrtIdAndAttrName = ''
			this.clearData()
		},
		/*******************************添加操作*************************************************/
		/**
		 * 清空所有数据
		 */
		clearData() {
			/* 	// 照片墙
				this.dialogImageUrl = ''
				this.dialogVisible = false
				this.spu.category3Id = 0
				this.spu.spuName = ''
				this.spu.tmId = ''
				this.spu.description = ''
				this.spu.spuImageList = []
				this.spu.spuSaleAttrList = []
				this.tradeMarkList = []//存储品牌信息
				this.spuImageList = []	//存储spu图片信息
				this.saleAttrList = []	//销售属性的数据
				this.attrtIdAndAttrName = ''	//收集未选择的销售属性的id， */
			// todo 清除数据的骚操作
			// Object.assign ------- es6中的新方法，用于合并对象
			// this._data ---------- 组件实例，可以操作data中的响应式数据
			// this.$options ------- 可以获取配置对象
			// todo this.$options.data() ---- 配置对象中的data函数执行，返回的响应式数据为空
			Object.assign(this._data, this.$options.data())
		},
		/**
		 * 添加操作——发送请求
		 */
		async addSpuData(category3Id) {
			// 收集id
			this.spu.category3Id = category3Id
			// 获取品牌信息
			let tradeMarkResult = await this.$API.spu.getTrademarkList()
			if (tradeMarkResult.code === 200) {
				this.tradeMarkList = tradeMarkResult.data
			}
			// 获取平台全局的销售属性
			let saleResult = await this.$API.spu.getBaseSaleAttrList()
			if (saleResult.code === 200) {
				this.saleAttrList = saleResult.data
			}
		}

	}
}
</script>

<style>
.el-tag + .el-tag {
	margin-left: 10px;
}

.button-new-tag {
	margin-left: 10px;
	height: 32px;
	line-height: 30px;
	padding-top: 0;
	padding-bottom: 0;
}

.input-new-tag {
	width: 90px;
	margin-left: 10px;
	vertical-align: bottom;
}
</style>

