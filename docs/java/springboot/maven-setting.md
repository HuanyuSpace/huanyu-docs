关于配置文件，一般是组内互相传阅，这样能最大程度保证配置的正确性，特别是对于公司自有的私库配置。

本文暂时不对maven配置文件的配置知识进行详细介绍，只关注实际开发中配置文件容易出错的地方。

## 1. 文件配置
IDEA中Maven配置文件位置在 `File | Settings | Build, Execution, Deployment | Build Tools | Maven`

检查是否配置了正确的setting.xml文件

## 2. 配置本地仓库
```xml
<localRepository>G:/MavenLocalRepository</localRepository>
```
确定配置的本地仓库是否正确；另外，idea的maven配置中可以进行覆盖。


## 3. 仓库配置
```xml
<mirrors>
	<mirror>
		<id>alimaven</id>
		<name>aliyun maven</name>
		<url>http://maven.aliyun.com/nexus/content/groups/public/</url>
		<mirrorOf>central</mirrorOf>
	</mirror>
</mirrors>
```
该例中，`<mirrorOf>`的值为central，表示该配置为中央仓库的镜像，任何对于中央仓库的请求都会转至该镜像，用户也可以使用同样的方法配置其他仓库的镜像。另外三个元素id、name、url与一般仓库配置无异，表示该镜像仓库的唯一标识符、名称以及地址。类似地，如果该镜像需要认证，也可以基于该id配置仓库认证。
::: info
如果仓库X可以提供仓库Y存储的所有内容，那么就可以认为X是Y的一个镜像。换句话说，任何一个可以从仓库Y获得的构件，都能够从它的镜像中获取。
举个例子，`http://maven.net.cn/content/groups/public/`是中央仓库`http://repo1.maven.org/maven2/`在中国的镜像，由于地理位置的因素，该镜像往往能够提供比中央仓库更快的服务。因此，可以配置 Maven 使用该镜像来替代中央仓库。
:::
虽然mirrors可以配置多个子节点，但是它只会使用其中的一个节点，即默认情况下配置多个mirror的情况下，只有第一个生效，只有当前一个mirror**无法连接**的时候，才会去找后一个。
而我们想要的效果是：当a.jar在第一个mirror中不存在的时候，maven会去第二个mirror中查询下载，但是maven的`<mirror>`配置无法实现这个效果。