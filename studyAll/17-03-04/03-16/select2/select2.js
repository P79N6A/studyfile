$('#e3').select2({  
    placeholder: "请输入",  
    minimumInputLength: 1,  
    separator: ",", // 分隔符  
    maximumSelectionSize: 5, // 限制数量  
    initSelection: function(element, callback) { //搜索结果回调后 初始化时设置默认值  
    },  
    createSearchChoice: function(term, data) { // 创建搜索结果（使用户可以输入匹配值以外的其它值）  
        return {  
            id: term.mid,  
            text: term.name  
        };  
    },  
    formatSelection: function(item) {  
        return item.name;//注意'此处的name'，要'和ajax返回数组'的'键值一样'  
    }, 
    // 选择结果中的显示  
    formatResult: function(item) {
        return item.name;//注意此处的name  
    }, 
    // 搜索列表中的显示  
    ajax: {  
        url: "{:U('Admin/Member/getzj')}", // 异步请求地址  
        dataType: "json", // 数据类型  
        data: function(term, page) { // 请求参数（GET）  
            return {  
                q: term  
            };  
        },  
        results: function(data, page) {  
            return data;  
        }, // 构造返回结果  
        escapeMarkup: function(m) {  
            return m;  
        } // 字符转义处理  
    }  
});