// 导入 express
const express = require('express')
// 创建路由对象
const router = express.Router()
// 导入商品详情展示的小图的路由处理函数模块
const showSmall_handler = require('../router_handler/showSmall')
// 导入解析 formdata 格式表单数据的包
const multer = require('multer')
// 导入处理路径的核心模块
const path = require('path')
// 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
const upload = multer({ dest: path.join(__dirname, '../uploads') })
// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入商品详情展示图的验证模块
const { add_showSmall_schema,add_showBig_schema } = require('../schema/showSmall')
// 获取商品详情展示小图
router.get('/showSmall', showSmall_handler.getShowSmall)
// 添加商品详情展示小图
router.post('/addShowSmall',upload.single('small_img'),expressJoi(add_showSmall_schema), showSmall_handler.addShowSmall)
// 获取商品详情展示大图
router.get('/showBig', showSmall_handler.getShowBig)
// 添加商品详情展示大图
router.post('/addShowBig',upload.single('big_img'),expressJoi(add_showBig_schema), showSmall_handler.addShowBig)
// 向外共享路由对象
module.exports = router