// 导入数据库操作模块
const db = require('../db/index')
// 获取轮播图的处理函数
exports.getSlideshow = (req, res) => {
    const sql = 'select * from banner where is_delete=0 order by id asc'
    db.query(sql, (err, results) => {
        // 1. 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 2. 执行 SQL 语句成功
        res.send({
            status: 0,
            message: '获取轮播图成功！',
            data: results,
        })
    })
}
exports.getOneSlideshow = (req, res) => {
    const sql = 'select * from banner where type="one_type" and is_delete=0 order by id desc limit 3'
    db.query(sql, (err, results) => {
        // 1. 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 2. 执行 SQL 语句成功
        res.send({
            status: 0,
            message: '获取轮播图成功！',
            data: results,
        })
    })
}
exports.getTwoSlideshow = (req, res) => {
    const sql = 'select * from banner where type="two_type" and is_delete=0 order by id desc limit 2'
    db.query(sql, (err, results) => {
        // 1. 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 2. 执行 SQL 语句成功
        res.send({
            status: 0,
            message: '获取轮播图成功！',
            data: results,
        })
    })
}
exports.getThreeSlideshow = (req, res) => {
    const sql = 'select * from banner where type="three_type" and is_delete=0 order by id desc limit 2'
    db.query(sql, (err, results) => {
        // 1. 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 2. 执行 SQL 语句成功
        res.send({
            status: 0,
            message: '获取轮播图成功！',
            data: results,
        })
    })
}
// 新增轮播的处理函数
exports.addSlideshow = (req, res) => {
    // 手动判断是否上传了轮播图
    if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('轮播图是必选参数！')
    // 导入处理路径的 path 核心模块
    const path = require('path')
    const articleInfo = {
        ...req.body,
        // 轮播图在服务器端的存放路径
        cover_img: path.join('/uploads', req.file.filename),
        // 轮播图上传时间
        date: new Date()
    }
    const sql = `insert into banner set ?`

    // 执行 SQL 语句
    db.query(sql, articleInfo, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 执行 SQL 语句成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('图片上传失败！')

        // 上传图片成功
        res.cc('图片上传成功', 0)
    })

}
// 删除轮播的处理函数
exports.deleteSlideshow = (req, res) => {
    const sql = `update banner set is_delete=1 where id=?`
    db.query(sql, req.params.id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // SQL 语句执行成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('删除轮播分类失败！')

        // 删除轮播分类成功
        res.cc('删除轮播分类成功！', 0)
    })
}
//根据id获取轮播数据的处理函数
exports.getSlidesById = (req, res) => {
    const sql = `select * from banner where id=?`
    db.query(sql, req.params.id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // SQL 语句执行成功，但是没有查询到任何数据
        if (results.length !== 1) return res.cc('获取轮播分类数据失败！')

        // 把数据响应给客户端
        res.send({
            status: 0,
            message: '获取轮播分类数据成功！',
            data: results[0],
        })
    })
}
// 更新轮播分类的处理函数
exports.updateSlideById = (req, res) => {
    const sql = `select * from banner where id=?`
    // 执行查重操作
    db.query(sql, req.body.id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        // 手动判断是否上传了图片
        if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('请选择要更新的轮播图！')

        // 导入处理路径的 path 核心模块
        const path = require('path')
        const articleInfo = {
            ...req.body,
            cover_img: path.join('/uploads', req.file.filename),
        }
        const sql = `update banner set ? where id=?`
        db.query(sql, [articleInfo, req.body.id], (err, results) => {
            // 执行 SQL 语句失败
            if (err) return res.cc(err)

            // SQL 语句执行成功，但是影响行数不等于 1
            if (results.affectedRows !== 1) return res.cc('更新数据失败！')

            // 更新文章分类成功
            res.cc('更新数据成功！', 0)
        })
    })

}