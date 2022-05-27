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
const { add_colorImg_schema,delete_colorImg_schema,get_colorImg_schema,update_colorImg_schema} = require('../schema/colorImg')
// 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
const upload = multer({ dest: path.join(__dirname, '../uploads') })
// 导入添加商品的路由处理函数模块
const product_handler = require('../router_handler/colorImg')
// 获取商品信息
router.get('/colorImg', product_handler.getColorImg)
//添加商品
router.post('/addColorImg', upload.single('color_type'), expressJoi(add_colorImg_schema), product_handler.addColorImg)
// 删除商品信息
router.get('/deleteColorImg/:id', expressJoi(delete_colorImg_schema),product_handler.deleteColorImgById)
// 根据id获取商品信息
router.get('/colorImg/:id', expressJoi(get_colorImg_schema),product_handler.getColorImgById)
// 更新商品信息的路由
router.post('/updateColorImg', upload.single('color_type'),expressJoi(update_colorImg_schema),product_handler.updateColorImgById)
// 向外共享路由对象
module.exports = router