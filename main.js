//获取所有 buttons 按钮
let $buttons = $('#buttonWrapper > button')
//获取slides
let $slides = $('#slides')
//获取所有的 img
let $images = $slides.children('img')
//当前图片索引
let current = 0

const makeFakeSlides = function () {
    //拷贝第一个 images
    let $firstCopy = $images.eq(0).clone(true)
    // console.log($firstCopy[0].outerHTML)
    //拷贝最后一个 images
    let $lastCopy = $images.eq($images.length - 1).clone(true)
    // console.log($lastCopy[0].outerHTML)
    //把最后一张克隆图片放到最前边 第一张放最后边
    $slides.append($firstCopy)
    $slides.prepend($lastCopy)
}
const goToslide = function (index) {
    if (index >= $buttons.length){
        index = 0
    } else if (index < 0) {
        index = $buttons.length - 1
    }
    if ((current === $buttons.length - 1) && (index === 0)) {
        //最后一张到第一张
        // console.log('current', current)
        console.log('index', index)
        // console.log('3')
        $slides.css({transform: `translateX(${-($buttons.length + 1) * 900}px)`})
            .one('transitionend', function () {
                $slides.hide()
                    .offset()
                $slides.css({transform: `translateX(${-(index + 1) * 900}px)`})
                    .show()
            })
    } else if ((current === 0) && (index === $buttons.length - 1)) {
        //第一张到最后一张
        // console.log('2')
        // console.log('current', current)
        // console.log('index', index)
        $slides.css({transform: 'translateX(0px)'})
            .one('transitionend', function () {
                $slides.hide()
                    .offset()
                $slides.css({transform: `translateX(${-(index + 1) * 900}px)`})
                    .show()
            })
    } else {
        // console.log('1')
        // console.log('current', current)
        // console.log('index', index)
        $slides.css({transform: `translateX(${-(index + 1) * 900}px)`})
    }
    current = index
}
const bindEvents = function () {
    $('#buttonWrapper').on('click', 'button', function(event) {
        let $button = $(event.currentTarget)
        let index = $button.index()
        goToslide(index)
        })
}

$('#next').on('click', function () {
    goToslide(current + 1)
})
$('#previous').on('click', function () {
    goToslide(current - 1)
})
//自动轮播
let timer = setInterval(function () {
    goToslide(current + 1)
},2000)
$('.container').on('mouseenter', function () {
    // console.log('mouseenter')
    window.clearInterval(timer)
}).on('mouseleave', function () {
    // console.log('mouseleave')
    timer = setInterval(function () {
        goToslide(current + 1)
    },2000)
})
//     //给 buttons 绑定点击事件
//     $buttons.eq(0).on('click', function () {
//         if(current === 3) {
//             // console.log('最后一张到第一张')
//             $slides.css({transform:'translateX(-4500px)'})
//                 .one('transitionend', function () {
//                     $slides.hide()
//                         .offset()
//                     $slides.css({transform:'translateX(-900px)'})
//                         .show()
//                 })
//         } else {
//             $slides.css({transform:'translateX(-900px)'})
//         }
//         current = 0
//     })
//     $buttons.eq(1).on('click', function () {
//         $slides.css({transform:'translateX(-1800px)'})
//         current = 1
//     })
//     $buttons.eq(2).on('click', function () {
//         $slides.css({transform:'translateX(-2700px)'})
//         current = 2
//     })
//     $buttons.eq(3).on('click', function () {
//         if(current === 0) {
//             // console.log('第一张到最后一张')
//             $slides.css({transform:'translateX(0px)'})
//                 .one('transitionend', function () {
//                     $slides.hide()
//                         .offset()
//                     $slides.css({transform:'translateX(-3600px)'})
//                         .show()
//                 })
//         } else {
//             $slides.css({transform:'translateX(-3600px)'})
//         }
//         current = 3
//     })
// }
makeFakeSlides()
$slides.css({transform: 'translateX(-900px)'})
bindEvents()