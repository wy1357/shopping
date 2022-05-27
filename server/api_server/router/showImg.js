// 导入 express
const express = require('express')
// 创建路由对象
const router = express.Router()
// 导入商品详情展示图的路由处理函数模块
const show_handler = require('../router_handler/showImg')
// 导入解析 formdata 格式表单数据的包
const multer = require('multer')
// 导入处理路径的核心模块
const path = require('path')
// 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
const upload = multer({ dest: path.join(__dirname, '../uploads') })
// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入商品详情展示图的验证模块
const { add_showImg_schema } = require('../schema/showImg')
// 获取商品详情展示图
router.get('/showImg', show_handler.getShowImgs)
// 添加商品详情展示图
router.post('/addShowImg',upload.single('show_img'),expressJoi(add_showImg_schema), show_handler.addShowImgs)
// 向外共享路由对象
module.exports = router