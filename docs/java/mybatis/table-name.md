---
title: MyBatis-Plus 中 @TableName 注解详解
---
在 Java 开发中，@TableName 是 MyBatis-Plus 框架提供的注解，用于简化数据库表与实体类之间的映射关系。它不是 Java 标准库或 JPA 的注解，而是 MyBatis-Plus 特有的。

## 1. 作用
`@TableName` 用于指定当前实体类所对应的数据库表名。

## 2. 示例
```java
@TableName("sys_users")
public class SysUsers {
    // ...
}
```
## 3. 是否必须？

**不一定。** MyBatis-Plus 默认会将类名按照 **驼峰转下划线** 的规则转换为表名。例如：

- 类名：`SysUsers`
- 默认推断的表名：`sys_users`

因此，如果数据库表名恰好是 `sys_users`，那么 `@TableName("sys_users")` 可以省略。

## 4. 何时需要显式使用？

- 表名与默认转换结果不一致（如表名为 `users`）
- 项目规范要求显式声明表名
- 全局配置修改了默认命名策略


## 5. 总结
MyBatis-Plus 遵循“约定优于配置”原则，在命名规范的前提下，大多数场景下无需额外注解即可完成 ORM 映射。只有在打破默认约定时，才需要手动使用这些注解。

