// 导入数据库操作模块
const db = require('../db/index')
// 获取导航分类数据的处理函数
exports.getClassifyCates = (req, res) => {
    const sql = `select * from type where is_delete=0 order by id asc`
    db.query(sql, (err, results) => {
        // 1. 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 2. 执行 SQL 语句成功
        res.send({
            status: 0,
            message: '获取导航分类信息成功！',
            data: results,
        })
    })
}
// 添加导航分类的处理函数
exports.addClassify = (req, res) => {
    // 手动判断是否上传了导航分类图片
    if (!req.file || req.file.fieldname !== 'cate_img') return res.cc('导航分类图片是必选参数！')
    // 导入处理路径的 path 核心模块
    const path = require('path')

    const articleInfo = {
        ...req.body,
        // 导航分类图片在服务器端的存放路径
        cate_img: path.join('/uploads', req.file.filename)
    }

    const sql = `insert into type set ?`
    // 执行 SQL 语句
    db.query(sql, articleInfo, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 执行 SQL 语句成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('添加导航分类失败！')

        // 添加导航分类成功
        res.cc('添加导航分类成功', 0)
    })
}
// 删除导航分类的处理函数
exports.deleteClassifyById = (req, res) => {
    const sql = `update type set is_delete=1 where id=?`
    db.query(sql, req.params.id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // SQL 语句执行成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('删除导航分类失败！')

        // 删除导航分类成功
        res.cc('删除导航分类成功！', 0)
    })
}
// 根据 Id 获取导航分类的处理函数
exports.getClassifyById = (req, res) => {
    const sql = `select * from type where id=?`
    db.query(sql, req.params.id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // SQL 语句执行成功，但是没有查询到任何数据
        if (results.length !== 1) return res.cc('获取导航分类数据失败！')

        // 把数据响应给客户端
        res.send({
            status: 0,
            message: '获取导航分类数据成功！',
            data: results[0],
        })
    })
}
// 更新文章分类的处理函数
exports.updateClassifyById = (req, res) => {

    const sql = `select * from type where id=?`
    // 执行查重操作
    db.query(sql, req.body.id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        // 手动判断是否上传了图片
        if (!req.file || req.file.fieldname !== 'cate_img') return res.cc('请选择要更新的分类图片！')

        // 导入处理路径的 path 核心模块
        const path = require('path')
        const articleInfo = {
            ...req.body,
            cate_img: path.join('/uploads', req.file.filename),
        }
        const sql = `update type set ? where id=?`
        db.query(sql, [articleInfo, req.body.id], (err, results) => {
            // 执行 SQL 语句失败
            if (err) return res.cc(err)

            // SQL 语句执行成功，但是影响行数不等于 1
            if (results.affectedRows !== 1) return res.cc('更新导航分类数据失败！')

            // 更新导航分类成功
            res.cc('更新导航分类数据成功！', 0)
        })
    })
}