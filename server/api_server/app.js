const express = require('express') //引入express
// 导入 cors 中间件
const cors = require('cors')
const joi = require('joi')
// 导入配置文件
const config = require('./config')
// 解析 token 的中间件
const expressJWT = require('express-jwt')
// 导入并注册用户路由模块
const userRouter = require('./router/user')
// 导入并使用用户信息路由模块
const userinfoRouter = require('./router/userinfo')
// 导入并使用轮播图路由模块
const slideRouter = require('./router/slideshow')
// 导入并使用添加商品路由模块
const productRouter = require('./router/product')
// 导入并使用导航分类路由模块
const classifyRouter = require('./router/classify')
// 导入并使用商品详情路由模块
const detailRouter = require('./router/details')

// 导入并使用商品颜色分类路由模块
const colorImgRouter = require('./router/colorImg')
// 导入并使用商品详情展示图路由模块
const showRouter = require('./router/showImg')
// 导入并使用图片路由模块
const smallRouter = require('./router/showSmall')
const app = express() //创建服务器
// 将 cors 注册为全局中间件
app.use(cors())
// 托管静态资源文件
app.use('/uploads', express.static('./uploads'))
// 响应数据的中间件
app.use(function (req, res, next) {
    // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
    res.cc = function (err, status = 1) {
        res.send({
            // 状态
            status,
            // 状态描述，判断 err 是 错误对象 还是 字符串
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
})

// 错误中间件
app.use(function (err, req, res, next) {
    // 数据验证失败
    if (err instanceof joi.ValidationError) return res.cc(err)
    // 未知错误
    res.cc(err)
})
// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))
// 错误中间件
app.use(function (err, req, res, next) {
    // 捕获身份认证失败的错误
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')

  })
//配置解析 application/x-www-form-urlencoded 格式的表单数据的中间件
app.use(express.urlencoded({
    extended: false
}))

app.use('/api', userRouter)
app.use('/my', userinfoRouter)
app.use('/my/slideshow', slideRouter)
// 为添加商品的路由挂载统一的访问前缀 
app.use('/my/product', productRouter)
// 为商品分类的路由挂载统一的访问前缀
app.use('/my/cate', classifyRouter)
// 为商品颜色分类的路由挂载统一的访问前缀
app.use('/my/color', colorImgRouter)
// 为品详情的路由挂载统一的访问前缀
app.use('/my/detail', detailRouter)
// 为商品详情展示图的路由挂载统一的访问前缀
app.use('/my/show', showRouter)
// 为商品图片的路由挂载统一的访问前缀
app.use('/my/img',smallRouter)
app.listen(3000, () => {
    console.log('服务器启动成功');
})