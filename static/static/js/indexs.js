    //获取展示层
    let content = document.querySelector('.contents7')
    //获取容器层
    let cont_middle = document.querySelector('.cont_middle')
    //获取展示层可视区宽度
    let content_h = content.clientHeight
    //表示图片的下标
    let n = 0

    function move(box) {
        this.time = setInterval(() => {
            //给图片过度效果
            box.style.transition = 'all 0.5s linear'
            n++
            //判断当前图片是否为第二张图片，是取消过度效果，让2——>3瞬间完成
            if (n >= 2) {
                setTimeout(() => {
                    n = 0
                    box.style.transition = 'none'
                    //让图片从反方向移动
                    box.style.marginTop = -content_h * n + 'px'
                }, 800)
            }
            box.style.marginTop = -content_h * n + 'px'
        }, 1200)
    }
    move(cont_middle)
    let lefts = document.querySelector('.left7')
    let rights = document.querySelector('.right7')
    //开关变量，用于防抖节流
    let flags = true

    function arrows(cont) {
        //鼠标移入停止定时器
        cont.onmouseover = function () {
            clearInterval(time)
        }
        //鼠标移出启动定时器
        cont.onmouseout = function () {
            move(cont_middle)
        }
    }
    arrows(lefts)
    arrows(rights)

    function set(x) {
        n = x
        cont_middle.style.transition = 'none'
        cont_middle.style.marginTop = -content_h * n + "px"
    }

    function Flag(x, y) {
        setTimeout(() => {
            flags = x
        }, y)
    }

    lefts.onclick = () => {
        if (flags) {
            cont_middle.style.transition = 'all 0.5s linear'
            n++
            if (n >= 2) {
                setTimeout(() => {
                    set(0)
                }, 600)
            }
            cont_middle.style.marginTop = -content_h * n + 'px'
            //让开关间隔一秒开启一次
            Flag(true, 1000)
        }
        flags = false
    }
    rights.onclick = () => {
        if (flags) {
            cont_middle.style.transition = 'all 0.5s linear'
            n++
            if (n >= 2) {
                setTimeout(() => {
                    set(0)
                }, 600)
            }
            cont_middle.style.marginTop = -content_h * n + 'px'
            Flag(true, 1000)
        }
        flags = false
    }