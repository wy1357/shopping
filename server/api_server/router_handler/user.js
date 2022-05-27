const db = require('../db/index')
const bcrypt = require('bcryptjs')
// 用来生成 Token 字符串
const jwt = require('jsonwebtoken')
// 导入配置文件
const config = require('../config')

// 注册用户的处理函数
exports.regUser = (req, res) => {
    // 接收表单数据
    const body = req.body
    // 对用户的密码,进行 bcrype 加密，返回值是加密之后的密码字符串
    body.password = bcrypt.hashSync(body.password, 10)
    // 判断数据是否合法
    if (!body.username || !body.password) {
        return res.send({
            status: 1,
            message: '用户名或密码不能为空！'
        })
    }
    const sqlName = 'select * from userinfo where username=?'
    db.query(sqlName, [body.username], function (err, results) {
        // 执行 SQL 语句失败
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        // 用户名被占用
        if (results.length > 0) {
            return res.send({
                status: 1,
                message: '用户名被占用，请更换其他用户名！'
            })
        }
        const sql = 'insert into userinfo set ?'
        db.query(sql, {
            username: body.username,
            password: body.password
        }, function (err, results) {
            // 执行 SQL 语句失败
            if (err) return res.send({
                status: 1,
                message: err.message
            })
            // SQL 语句执行成功，但影响行数不为 1
            if (results.affectedRows !== 1) {
                return res.send({
                    status: 1,
                    message: '注册用户失败，请稍后再试！'
                })
            }
            // 注册成功
            res.send({
                status: 0,
                message: '注册成功！'
            })
        })
    })
}

// 登录的处理函数
exports.login = (req, res) => {
    const body = req.body
    const sql = `select * from userinfo where username=?`
    db.query(sql, body.username, function (err, results) {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        // 执行 SQL 语句成功，但是查询到数据条数不等于 1
        if (results.length !== 1) return res.cc('登录失败！')
        // 拿着用户输入的密码,和数据库中存储的密码进行对比
        const compareResult = bcrypt.compareSync(body.password, results[0].password)

        // 如果对比的结果等于 false, 则证明用户输入的密码错误
        if (!compareResult) {
            return res.cc('登录失败！')
        }
        // 剔除完毕之后，user 中只保留了用户的 id, username, nickname, email 这四个属性的值
        const user = {
            ...results[0],
            password: '',
            user_pic: ''
        }
        // 生成 Token 字符串
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
            expiresIn: '24h', // token 有效期为 24 个小时
        })
        res.send({
            status: 0,
            message: '登录成功！',
            // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
            token: 'Bearer ' + tokenStr,
          })
    })
}
// 前端注册用户的处理函数
exports.register = (req, res) => {
    // 接收表单数据
    const body = req.body
    // 对用户的密码,进行 bcrype 加密，返回值是加密之后的密码字符串
    body.password = bcrypt.hashSync(body.password, 10)
    // 判断数据是否合法
    if (!body.phone || !body.password) {
        return res.send({
            status: 1,
            message: '手机号或密码不能为空！'
        })
    }
    const sqlName = 'select * from user where phone=?'
    db.query(sqlName, [body.phone], function (err, results) {
        // 执行 SQL 语句失败
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        // 用户名被占用
        if (results.length > 0) {
            return res.send({
                status: 1,
                message: '手机号码已注册！'
            })
        }
        const sql = 'insert into user set ?'
        db.query(sql, {
            phone: body.phone,
            password: body.password
        }, function (err, results) {
            // 执行 SQL 语句失败
            if (err) return res.send({
                status: 1,
                message: err.message
            })
            // SQL 语句执行成功，但影响行数不为 1
            if (results.affectedRows !== 1) {
                return res.send({
                    status: 1,
                    message: '注册失败，请稍后再试！'
                })
            }
            // 注册成功
            res.send({
                status: 0,
                message: '注册成功！'
            })
        })
    })
}
// 前端登录的处理函数
exports.logins = (req, res) => {
    const body = req.body
    const sql = `select * from user where phone=?`
    db.query(sql, body.phone, function (err, results) {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        // 执行 SQL 语句成功，但是查询到数据条数不等于 1
        if (results.length !== 1) return res.cc('登录失败！')
        // 拿着用户输入的密码,和数据库中存储的密码进行对比
        const compareResult = bcrypt.compareSync(body.password, results[0].password)

        // 如果对比的结果等于 false, 则证明用户输入的密码错误
        if (!compareResult) {
            return res.cc('登录失败！')
        }
        // 剔除完毕之后，user 中只保留了用户的 id, username, nickname, email 这四个属性的值
        const user = {
            ...results[0],
            password: ''
        }
        // 生成 Token 字符串
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
            expiresIn: '24h', // token 有效期为 24 个小时
        })
        res.send({
            status: 0,
            message: '登录成功！',
            // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
            token: 'Bearer ' + tokenStr,
          })
    })
}