const express=require('express')
const router=express.Router()
// 导入解析 formdata 格式表单数据的包
const multer = require('multer')
// 导入处理路径的核心模块
const path = require('path')

// 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
const upload = multer({ dest: path.join(__dirname, '../uploads') })
// 导入轮播的路由处理函数模块
const slideshow_handler = require('../router_handler/slideshow')
// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入轮播的验证模块
const { add_slide_schema,delete_slide_schema,get_slide_schema,update_slide_schema  } = require('../schema/slideshow')
// 获取轮播图
router.get('/Slides', slideshow_handler.getSlideshow)
// 获取轮播图
router.get('/oneSlides', slideshow_handler.getOneSlideshow)
// 获取轮播图
router.get('/twoSlides', slideshow_handler.getTwoSlideshow)
// 获取轮播图
router.get('/threeSlides', slideshow_handler.getThreeSlideshow)
// 新增轮播图路由
router.post('/addSlides', upload.single('cover_img'), expressJoi(add_slide_schema),slideshow_handler.addSlideshow)
// 删除轮播的路由
router.get('/slides/:id', expressJoi(delete_slide_schema),slideshow_handler.deleteSlideshow)
//根据id获取轮播图数据的路由
router.get('/cateSlides/:id',expressJoi(get_slide_schema), slideshow_handler.getSlidesById)
// 更新轮播分类的路由
router.post('/updateSlides',upload.single('cover_img'),expressJoi(update_slide_schema), slideshow_handler.updateSlideById)
// 向外共享路由对象
module.exports = router