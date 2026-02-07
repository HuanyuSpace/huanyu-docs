---
title: MyBatis-Plus 中 @TableField 注解详解
---
在 Java 开发中，@TableField 是 MyBatis-Plus 框架提供的注解，用于简化数据库表与实体类之间的映射关系。它不是 Java 标准库或 JPA 的注解，而是 MyBatis-Plus 特有的。


## 1. 作用
`@TableField` 用于指定实体类字段与数据库列之间的映射关系，也可用于控制字段是否参与数据库操作。

常见用途:
- 字段名与列名不一致
- 忽略非数据库字段
- 自定义插入/更新策略

## 2. 示例
```java
public class JzBooks {
    private Long id;

    @TableField("book_title")
    private String title;

    @TableField(exist = false)
    private String tempRemark; // 临时字段，表中不存在
}
```

## 3. 是否必须？

**通常不需要。** MyBatis-Plus 默认开启 `mapUnderscoreToCamelCase`，会自动将下划线命名的数据库列（如 `book_title`）映射到驼峰命名的 Java 字段（如 `bookTitle`）。

只要字段命名符合以下约定，就无需使用 `@TableField`：

- Java 字段：`userName`
- 数据库列：`user_name`

## 4. 何时需要显式使用？

- 列名不符合下划线命名规范（如 `uname` 对应 `userName`）
- 字段在数据库中不存在（如计算字段、临时属性）
- 需要控制字段的插入或更新行为（如仅在非空时更新）

## 5. 总结
MyBatis-Plus 遵循“约定优于配置”原则，在命名规范的前提下，大多数场景下无需额外注解即可完成 ORM 映射。只有在打破默认约定时，才需要手动使用这些注解。