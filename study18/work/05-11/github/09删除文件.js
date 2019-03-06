在Git中，'删除'也'是'一个'修改操作'，我们实战一下，先'添加'一个新文件'test.txt'到Git'并且提交'：

$ git add test.txt
$ git commit -m "add test.txt"
[master 94cdc44] add test.txt
 1 file changed, 1 insertion(+)
 create mode 100644 test.txt
一般情况下，你'通常直接'在文件管理器中把没用的文件'删了'，或者用rm命令删了：

$ rm test.txt
这个时候，'Git知道'你'删除'了文件，因此，'工作区'和'版本库'就'不一致'了，
git status命令会立刻'告诉'你哪些'文件被删除'了：

$ git status
# On branch master
# Changes not staged for commit:
#   (use "git add/rm <file>..." to update what will be committed)
#   (use "git checkout -- <file>..." to discard changes in working directory)
#
#       deleted:    test.txt
#
no changes added to commit (use "git add" and/or "git commit -a")
现在你有两个选择，一是'确实'要从版本库中'删除该文件'，
那就用命令'git rm删掉'，并且'git commit'：

$ git rm test.txt
rm 'test.txt'
$ git commit -m "remove test.txt"
[master d17efd8] remove test.txt
 1 file changed, 1 deletion(-)
 delete mode 100644 test.txt
现在，'文件'就'从版本'库中'被删除'了。

另一种情况是'删错了'，因为'版本库'里'还有'呢，
所以可以很轻松地把误删的文件'恢复'到最新版本：

'$ git checkout -- test.txt'
'git checkout'其实是'用版本库'里的版本'替换工作区'的版本，
无论工作区是'修改还是删除'，都可以'“一键还原”。'

小结
命令'git rm'用于'删除一个文件'。如果一个文件已经被'提交到版本库'，那么你永远不用担心误删，
但是要小心，你'只能恢复'文件到'最新版本'，你'会丢失''最近一次'提交后'你修改的内容'。

