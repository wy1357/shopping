//导入数据库模块
const db = require('../db/index')
// 导入处理路径的 path 核心模块
const path = require('path')
// 获取商品颜色分类的处理函数
exports.getColorImg = (req, res) => {
    const sql = 'select * from img_color where is_delete=0 order by id asc'
    db.query(sql, (err, results) => {
        // 1. 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 2. 执行 SQL 语句成功
        res.send({
            status: 0,
            message: '获取商品颜色分类成功！',
            data: results,
        })
    })
}
//添加商品颜色分类的处理函数
exports.addColorImg = (req, res) => {
    // 手动判断是否上传了商品颜色分类
    if (!req.file || req.file.fieldname !== 'color_type') return res.cc('商品颜色分类是必选参数！')


    const articleInfo = {
        ...req.body,
        // 商品颜色分类图片在服务器端的存放路径
        color_type: path.join('/uploads', req.file.filename)
    }
    const sql = `insert into img_color set ?`
    // 执行 SQL 语句
    db.query(sql, articleInfo, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 执行 SQL 语句成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('添加商品颜色分类失败！')

        // 添加商品颜色分类成功
        res.cc('添加商品颜色分类成功', 0)
    })
}
// 删除商品颜色分类的处理函数
exports.deleteColorImgById = (req, res) => {
    const sql = `update img_color set is_delete=1 where id=?`
    db.query(sql, req.params.id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // SQL 语句执行成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('删除商品颜色分类失败！')

        // 删除文章分类成功
        res.cc('删除商品颜色分类成功！', 0)
    })
}
// 根据 Id 获取商品颜色分类的处理函数
exports.getColorImgById = (req, res) => {
    const sql = `select * from img_color where id=?`
    db.query(sql, req.params.id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // SQL 语句执行成功，但是没有查询到任何数据
        if (results.length !== 1) return res.cc('获取商品颜色分类数据失败！')

        // 把数据响应给客户端
        res.send({
            status: 0,
            message: '获取商品颜色分类数据成功！',
            data: results[0],
        })
    })
}
// 更新商品颜色分类的处理函数
exports.updateColorImgById = (req, res) => {
    const sql = `select * from img_color where id=?`
    // 执行查重操作
    db.query(sql, req.body.id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        // 手动判断是否上传了图片
        if (!req.file || req.file.fieldname !== 'color_type') return res.cc('请选择要更新的分类图片！')

        // 导入处理路径的 path 核心模块
        const path = require('path')
        const articleInfo = {
            ...req.body,
            color_type: path.join('/uploads', req.file.filename),
        }
        const sql = `update img_color set ? where id=?`
        db.query(sql, [articleInfo, req.body.id], (err, results) => {
            // 执行 SQL 语句失败
            if (err) return res.cc(err)

            // SQL 语句执行成功，但是影响行数不等于 1
            if (results.affectedRows !== 1) return res.cc('更新商品颜色分类数据失败！')

            // 更新商品颜色分类成功
            res.cc('更新商品颜色分类数据成功！', 0)
        })
    })
}