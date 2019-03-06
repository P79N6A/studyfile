过滤器为嘛加上  chain.doFilter(servletRequest, servletResponse);

1.过滤器在'程序进入web'（页面，servlet等）'前拦截程序'，做处理，'通常用来过滤url'
2.过滤链的'好处是'，'执行过程中任何时候都可以打断'，'只要不执行chain.doFilter()'
就'不会再执行后面的过滤器和请求的内容'。而在实际使用时，
就要特别注意过滤链的执行顺序问题，像EncodingFilter就一定要放在所有Filter之前，
这样才能确保在使用请求中的数据前设置正确的编码。