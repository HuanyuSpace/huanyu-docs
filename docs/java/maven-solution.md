本文汇总常用的解决办法。

## 1、重启IDEA

问题：IDEA的Maven不展示Profiles，需要重启IDEA；

## 2、批量删除\*.lastUpdated

`for /r %i in (*.lastUpdated) do del %i`
::: warning
maven库执行命令, powershell运行有问题，用老的命令框。
:::

## 3、删除依赖整个文件夹

这种方式用于只删除.lastUpdated文件不能解决问题的情况。
找到该依赖在本地库的位置，直接删除这个依赖的文件夹，重新下载依赖即可。

## 4、手动下载依赖

通过多次刷新依旧无法下载的依赖，可以通过手动方式进行下载；
下载地址：mvnrepository.com
下载操作：

- 1. 根据依赖名称进行搜索
- 2. 选择对应版本
- 3. 查看对比
- 4. 下载缺少的文件

## 5. 清除IDEA缓存

尝试 Invalidate Caches / Restart。点击菜单栏中的 File -> Invalidate Caches / Restart...，在弹出的对话框中选择 Invalidate and Restart。这将清除 IDEA 的缓存并重启 IDE，可能解决因缓存导致的类找不到问题。

## 6. 切换Maven版本

针对本地库已经存在依赖包，但是项目依旧爆红的情况，可能是因为项目使用的Maven版本与本地库的Maven版本不一致导致的。
可以尝试切换项目使用的Maven版本，查看是否能够解决问题。

## 7. 修改pom.xml

针对本地库已经存在依赖包，但是项目启动报错显示缺少依赖的情况。
可以尝试修改pom.xml文件，将缺少的依赖添加到pom.xml中，然后重新导入项目。

## 8. 开启 Toggle Offline Mode

背景：一个正常运行的项目切换文件夹后，除了java其它依赖都找不到，导致项目文件爆红。

执行步骤1. 查看配置Maven是否正确，调整配置并清理缓存后无法解决问题。

执行步骤2. 开启 Toggle Offline Mode后，项目文件瞬间恢复正常。

“Toggle offline mode” 直译为 “切换离线模式”，它是 IDEA 为 Maven 提供的一个快捷开关，用来控制 Maven 在执行构建（compile、package、install 等）时是否允许访问远程 Maven 仓库。

- 关闭离线模式（默认状态）：Maven 会优先检查本地仓库是否有项目依赖的 jar 包，如果本地没有，就会从你配置的远程仓库（如中央仓库、公司私服）下载缺失的依赖；同时也会检查依赖的更新（比如快照版依赖）。
- 开启离线模式：**Maven 会完全禁用网络请求，只使用本地仓库中已有的依赖文件**。此时如果本地缺少某个依赖，Maven 不会尝试从远程下载，而是直接抛出 “找不到依赖” 的错误。
