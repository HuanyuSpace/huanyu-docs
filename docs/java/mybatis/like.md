--- 
title: MyBatis 模糊查询（LIKE）最佳实践详解
---
在实际开发中，模糊查询是数据库操作中最常见的需求之一。例如：用户搜索商品名称、根据姓名查找员工、按关键词检索文章等。
本文总结 MyBatis 中实现模糊查询的正确方式，并推荐安全、高效的最佳实践。
## 1. 模糊查询的基本语法

SQL 中使用 `LIKE` 关键字配合通配符进行模糊匹配：
- `%`：匹配任意多个字符（包括零个）
- `_`：匹配单个字符

例如：
```sql
SELECT * FROM user WHERE name LIKE '%张%';  -- 查找名字中包含“张”的用户
```
在 MyBatis 中，关键是如何安全地将用户输入拼接成带 `%` 的模式字符串。
## 2. 常见错误写法
直接使用 `${}` 拼接是非常危险的操作；
```xml
<select id="searchByName" resultType="User">
    SELECT * FROM user WHERE name LIKE '%${name}%'
</select>
```
::: danger SQL 注入风险
`${}` 是**直接字符串替换**，不经过预编译。  
若用户输入恶意内容（如 `'; DROP TABLE user--`），可能导致严重安全问题。  
**绝对不要在生产环境中使用这种方式！**
:::
## 3. 推荐的三种安全写法
### 3.1 在 Java 代码中拼接通配符（最常用）
**Mapper 接口**：
```java
List<User> searchByName(@Param("name") String name);
```
**XML 映射文件**：

```xml
<select id="searchByName" resultType="User">
    SELECT * FROM user WHERE name LIKE #{name}
</select>
```
**Service 调用处**：
```java
String pattern = "%" + userInput + "%";
userMapper.searchByName(pattern);
```
::: tip 优点
- 逻辑清晰，易于单元测试；
- 完全避免 SQL 注入；
- 兼容所有 MyBatis 版本。
:::
### 3.2 使用 `<bind>` 标签（推荐用于复杂动态 SQL）
```xml
<select id="searchByName" parameterType="string" resultType="User">
    <bind name="pattern" value="'%' + name + '%'" />
    SELECT * FROM user WHERE name LIKE #{pattern}
</select>
```
::: tip `<bind>` 的优势
- 无需修改 Java 层代码；
- 在 XML 中集中处理逻辑，便于维护；
- 支持 OGNL 表达式，可做判空等处理。
:::

**增强版（防 null）**

```xml
<bind name="pattern" value="name == null ? '%%' : '%' + name + '%'" />
```

或配合 `<if>` 使用：

```xml
<select id="searchUsers" resultType="User">
    SELECT * FROM user
    <where>
        <if test="name != null and name != ''">
            <bind name="namePattern" value="'%' + name + '%'" />
            AND name LIKE #{namePattern}
        </if>
        <if test="email != null and email != ''">
            <bind name="emailPattern" value="'%' + email + '%'" />
            AND email LIKE #{emailPattern}
        </if>
    </where>
</select>
```
### 3.3 使用 `CONCAT` 函数（适用于 MySQL 等支持的数据库）

```xml
<select id="searchByName" resultType="User">
    SELECT * FROM user 
    WHERE name LIKE CONCAT('%', #{name}, '%')
</select>
```

::: warning 注意数据库兼容性
`CONCAT` 是数据库函数，不同数据库语法可能不同：
- MySQL：`CONCAT('%', ?, '%')`
- Oracle：`'%' || ? || '%'`
- PostgreSQL：同 Oracle 或使用 `CONCAT`

**可移植性较差，建议仅在单一数据库项目中使用。**
:::
## 4. 性能与索引优化建议
1. **前导通配符（`%xxx`）会导致索引失效**  
   - `LIKE '张%'`：可以走索引（前缀匹配）✅
   - `LIKE '%张%'` 或 `LIKE '%张'`：全表扫描，性能差 ❌

2. **大数据量场景考虑全文检索**  
   对于高并发、大数据量的模糊搜索，建议使用：
   - Elasticsearch
   - MySQL 全文索引（`FULLTEXT`）
   - 数据库内置的文本搜索功能（如 PostgreSQL 的 `tsvector`）

3. **前端限制输入长度**  
   避免用户输入过长关键词导致慢查询或内存溢出。

::: tip 性能小贴士
如果业务允许，尽量引导用户使用“前缀搜索”（如自动补全），而不是全文模糊匹配。
:::
## 5. 总结：如何选择？

| 场景 | 推荐方式 |
|------|--------|
| 简单单字段模糊查询 | Java 层拼接 `%` |
| 多条件动态模糊查询 | `<bind>` + `<if>` |
| 数据库强绑定项目（如纯 MySQL） | `CONCAT` 函数 |
| 需要高度可读性和维护性 | `<bind>` |

::: info 核心原则
**永远使用 `#{}`，绝不使用 `${}` 拼接用户输入！**  
安全 > 性能 > 代码简洁
:::
