<div class="modal fade bs-example-modal-lg" ></div>
"modal"
是bootstrap的"窗口组件"，可以配合js实现弹出窗口效果
model的类选择器是'modal',还必须包含3个div部分，属性分别是'modal-header,modal-body,modal-footer'

这'需要让model的div类选择器带有hide和fade，指定id。并且一开始的style是display:none
以便隐藏同时还需要一个用来控制弹出的按钮,这个按钮必须有data-toggle="modal"的元素，href=modal的id  //调出弹出层  data-toggle="modal" href="#regModal"
如果想要在弹出表单中加入关闭按钮，则需要让按钮带有data-dismiss="modal"的属性。   //添加关闭按钮  data-dismiss="modal" 

用js打开 	$("#regModal").modal()

<section>
	<a data-toggle="modal" href="#regModal" class="btn btn-primary">show!</a>     
    <div class="row">
        <form id="regModal" class="modal hide fade form-horizontal" method="post" action="http://localhost" style="display:none">  
            <div class="modal-header">
                <h1>Header</h1>  
            </div>
            <div class="modal-body">
                <fieldset>  
                    <div class="control-group">  
                        <label class="control-label" for="username">Username:</label>  
                        <div class="controls">  
                            <input type="text" name="username">  
                        </div>  
                    </div>  
                    <div class="control-group">  
                        <label class="control-label" for="password">Password:</label>  
                        <div class="controls">  
                            <input type="password" name="password">  
                        </div>  
                    </div>  
                </fieldset>  
            </div>  
            <div class="modal-footer">  
                <input type="submit" class="btn btn-primary" value="Submit!">
                <input type="button" class="btn" value="Close!" data-dismiss="modal"> 
            </div>  
        </form>
    </div>  
</section>