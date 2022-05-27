// 导入 express
const express = require('express')
// 创建路由对象
const router = express.Router()
//导入商品详情的路由处理模块
const detail_handler=require('../router_handler/details')
// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入商品详情的验证模块
const { add_detail_schema,get_detail_schema,delete_detail_schema,update_detail_schema } = require('../schema/details')
// 获取商品详情数据
router.get('/details', detail_handler.getDetails)
// 添加商品详情数据
router.post('/addDetails',expressJoi(add_detail_schema), detail_handler.addDetails)

// 删除商品详情数据的路由
router.get('/deleteDetail/:id',expressJoi(delete_detail_schema), detail_handler.deleteDetailById)
// 根据id获取商品详情数据的路由
router.get('/details/:id',expressJoi(get_detail_schema), detail_handler.getDetailsById)
// 更新商品详情数据的路由
router.post('/updateDetail', expressJoi(update_detail_schema),detail_handler.updateDetailById)
// 向外共享路由对象
module.exports = router