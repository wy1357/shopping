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
// 导入导航分类的验证模块
const { add_cate_schema,delete_cate_schema,get_cate_schema,update_cate_schema } = require('../schema/classify')

// 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
const upload = multer({ dest: path.join(__dirname, '../uploads') })
// 导入导航分类的路由处理函数模块
const classify_handler = require('../router_handler/classify')
// 获取导航分类的列表数据
router.get('/getClassify', classify_handler.getClassifyCates)
// 添加导航分类
router.post('/addClassify',upload.single('cate_img'),expressJoi(add_cate_schema), classify_handler.addClassify)
// 删除导航分类的路由
router.get('/deleteClassify/:id', expressJoi(delete_cate_schema),classify_handler.deleteClassifyById)
//根据id获取导航分类的路由
router.get('/Classify/:id',expressJoi(get_cate_schema), classify_handler.getClassifyById)
// 更新导航分类的路由
router.post('/updateClassify',upload.single('cate_img'),expressJoi(update_cate_schema), classify_handler.updateClassifyById)
// 向外共享路由对象
module.exports = router