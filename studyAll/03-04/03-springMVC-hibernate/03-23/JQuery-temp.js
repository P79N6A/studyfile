'x-jquery-temp'
他是使用模板生成html代码的;使用模板，拼接html代码;
//常用标签有
${},		/: ${}等同与{{=}}是输出变量，里面还可以放表达式   / ${ID}={{= ID}}	 ${}

{{each}}, 	/: 提供循环逻辑  {{each(i,user) users}}  {{/each}} 是访问值

{{if}},{{else}},/: {{if}} {{else}}提供了分支逻辑 {{else}} 相当于else if {{/if}}

{{html}}	/: {{html}} 输出变量html,但是没有html编码，适合输出html代码

//不常用
{{=}}		/: ${}等同与{{=}}是输出变量，里面还可以放表达式   / ${ID}={{= ID}}

{{tmpl}}	/:	{{tmpl}} 嵌套模版

{{wrap}}	/: {{wrap}},包装器
