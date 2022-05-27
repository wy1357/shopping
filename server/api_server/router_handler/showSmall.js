// 导入数据库操作模块
const db = require('../db/index')
// 获取商品详情展示小图处理函数
exports.getShowSmall = (req, res) => {
    const sql = 'select * from show_small where is_delete=0 order by id asc'
    db.query(sql, (err, results) => {
        // 1. 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 2. 执行 SQL 语句成功
        res.send({
            status: 0,
            message: '获取图片成功！',
            data: results,
        })
    })
}
// 添加商品详情展示图处理函数
exports.addShowSmall = (req, res) => {
    // 手动判断是否上传了商品详情展示图
    if (!req.file || req.file.fieldname !== 'small_img') return res.cc('商品展示小图是必选参数！')
    
    const sql = `insert into show_small set ?`
    // 导入处理路径的 path 核心模块
    const path = require('path')

    const articleInfo = {
        // 所属的分类Id
        ...req.body,
        // 商品详情展示图在服务器端的存放路径
        small_img: path.join('/uploads', req.file.filename)
    }

    // 执行 SQL 语句
    db.query(sql, articleInfo, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 执行 SQL 语句成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('添加图片失败！')

        res.cc('添加小图成功', 0)
    })
}
// 获取商品详情展示大图处理函数
exports.getShowBig = (req, res) => {
    const sql = 'select * from show_big where is_delete=0 order by id asc'
    db.query(sql, (err, results) => {
        // 1. 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 2. 执行 SQL 语句成功
        res.send({
            status: 0,
            message: '获取图片成功！',
            data: results,
        })
    })
}
// 添加商品详情展示大图处理函数
exports.addShowBig = (req, res) => {
    // 手动判断是否上传了商品详情展示图
    if (!req.file || req.file.fieldname !== 'big_img') return res.cc('商品展示图是必选参数！')
    
    const sql = `insert into show_big set ?`
    // 导入处理路径的 path 核心模块
    const path = require('path')

    const articleInfo = {
        // 所属的分类Id
        ...req.body,
        // 商品详情展示图在服务器端的存放路径
        big_img: path.join('/uploads', req.file.filename)
    }

    // 执行 SQL 语句
    db.query(sql, articleInfo, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 执行 SQL 语句成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('添加图片失败！')

        res.cc('添加图片成功', 0)
    })
}