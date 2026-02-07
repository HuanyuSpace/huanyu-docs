const UrlMyBatis = "/docs/java/mybatis/";

export default [
  {
    text: "Java文档库",
    items: [
      {
        text: "关于MyBatis",
        items: [
          {
            text: "模糊查询",
            link: UrlMyBatis + "like.md",
          },
        ],
      },
      {
        text: "关于MyBatisPlus",
        items: [
          {
            text: "注解TableName",
            link: UrlMyBatis + "table-name.md",
          },
          {
            text: "注解TableField",
            link: UrlMyBatis + "table-field.md",
          },
        ],
      },
    ],
  },
];
