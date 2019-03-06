模态框
1.通过data属性：在控制器元素（比如按钮或者链接）上'设置属性data-toggle="modal"'，
'同时设置data-target="#identifier"'或'href="#identifier"'来'指定'要'切换的特定的模态框'
（带有id="identifier"）。通过JavaScript：使用这种技术，
JavaScript调用带有id="identifier"的模态框：
$('#identifier').modal(options)

2.可以使用按钮或链接。这里我们使用的是按钮

.modal 标识他为模态框
.fade class。它会引起内容淡入淡出。

aria-labelledby 引用同id的地方作为模态狂的标题
aria-hidden true表示模态框不可见

class="modal-body"， 'Bootstrap CSS 的一个 CSS class'，用于'为'模态'窗口'的'主体设置样式'。
class="modal-footer"，'Bootstrap CSS 的一个 CSS class'，用于'为'模态'窗口'的'底部设置样式'。
data-toggle="modal",  'data 属性' data-toggle '用于打开模态窗口'。