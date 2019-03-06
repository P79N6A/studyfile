//angular提供了内部指令用于表单验证
required required//必输
ng-minlength ng-minlength//最短长度 ng-minlength ng-minlength 
ng-maxlength ng-maxlength//最长长度 ng-maxlength ng-maxlength
ng-pattern	ng-pattern//按照正则表达式匹配 mg-pattern pattern pattern
//对于邮箱 url 数字 我们可以简单的将input的type设置为email，url，number 

angular会在form和input上添加几个类来标示当前表单和字段所处的状态，ng-pristine,ng-valid
当表单被编辑angular会删掉ng-valid变成ng-dirty;
ng-pristine,ng-valid,ng-dirty,ng-valid,ng-inValid,ng-error
ng-pristine,ng-valid,ng-drity,ng-error,ng-pristine
ng-pristine,ng-valid,ng-invalid,ng-dirty,
formName.inputName.$pristine//true 表单没有被改动过	false表示被编辑过
formName.inputName.$dirty//同上
formName.inputName.$valid//true表示表单数据合法，false不合法 valid
formName.inputName.$inValid//与上相反
formName.inputName.$error//返回Json对象，分别列出是哪个验证失败 ；值false键值对对应的验证项是通过的
//启示 可以通过这些信息控制提示信息的显示和影藏   提交按钮亦可以通过这个值来判断是否禁用掉

angular-formCheck//
required ng-minlength ng-maxlength ng-pattern
//邮箱 url 数字可以简单的将input的type设置为email url number
ng-drity ng-valid ng-error