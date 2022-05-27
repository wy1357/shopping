// 导入数据库操作模块
const db = require('../db/index')
// 获取商品详情展示图处理函数
exports.getShowImgs = (req, res) => {
    const sql = 'select * from showimg where is_delete=0 order by id asc'
    db.query(sql, (err, results) => {
        // 1. 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 2. 执行 SQL 语句成功
        res.send({
            status: 0,
            message: '获取商品详情展示图成功！',
            data: results,
        })
    })
}
// 添加商品详情展示图处理函数
exports.addShowImgs = (req, res) => {
    // 手动判断是否上传了商品详情展示图
    if (!req.file || req.file.fieldname !== 'show_img') return res.cc('商品展示图是必选参数！')
    
    const sql = `insert into showimg set ?`
    // 导入处理路径的 path 核心模块
    const path = require('path')

    const articleInfo = {
        // 所属的分类Id
        ...req.body,
        // 商品详情展示图在服务器端的存放路径
        show_img: path.join('/uploads', req.file.filename)
    }

    // 执行 SQL 语句
    db.query(sql, articleInfo, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 执行 SQL 语句成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('添加商品详情展示图失败！')

        // 发布商品详情展示图成功
        res.cc('添加商品详情展示图成功', 0)
    })
}