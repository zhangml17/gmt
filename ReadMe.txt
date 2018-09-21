//github&gitlab操作类似：

1、git init
2、git remote add origin https://github.com/zhangml17/gmt.git（例）
3、git add . （添加所有文件，也可指定添加）
4、git commit -m "2018-9-21" (提交信息为任意字符串)
5、git push -u origin master

//如果已经在仓库中添加了文件，则需先pull，再push
git pull origin master

//其他命令
git branch; 查看分支
git branch branch-name;创建一个指定名称的分支
git checkout branch-name;切换到指定分支
git merge branch-name; 将指定分支合并到master