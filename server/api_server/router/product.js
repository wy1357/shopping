// 导入 express
const express = require('express')
// 创建路由对象
const router = express.Router()
// 导入解析 formdata 格式表单数据的包
const multer = require('multer')
// 导入处理路径的核心模块
const path = require('path')
// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入文章的验证模块
const { add_product_schema,get_product_schema,delete_product_schema,update_product_schema,get_list_schema } = require('../schema/product')
// 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
const upload = multer({ dest: path.join(__dirname, '../uploads') })
// 导入添加商品的路由处理函数模块
const product_handler = require('../router_handler/product')
// 获取商品信息
router.get('/products', product_handler.getProduct)
// 模糊搜索
router.get('/products/:Id', product_handler.getProductList)
//添加商品
router.post('/addProduct', upload.single('com_img'),expressJoi(add_product_schema), product_handler.addProduct)
// 删除商品信息的路由
router.get('/deleteProduct/:id',expressJoi(delete_product_schema), product_handler.deleteProductById)
//添加根据id获取商品信息的路由
router.get('/products/:id', expressJoi(get_product_schema),product_handler.getProductById)
// 更新商品信息的路由
router.post('/updateProduct',upload.single('com_img'),expressJoi(update_product_schema), product_handler.updateProductById)
// 向外共享路由对象
module.exports = router