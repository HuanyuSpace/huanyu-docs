const UrlJava = "/docs/java/";
const UrlJavaPractice = UrlJava + "实战/";
const UrlMyBatisPlus = UrlJava + "mybatis-plus/";
const UrlKafka = UrlJava + "Kafka/";

export default [
  {
    text: "Java文档库",
    items: [
      {
        text: "Java实战",
        items: [
          {
            text: "运算符优先级陷阱",
            link: UrlJavaPractice + "Java字符串拼接中的运算符优先级陷阱.md",
          },
          {
            text: "Objects.toString()",
            link: UrlJavaPractice + "空指针异常处理利器Objects.toString.md",
          },
          {
            text: "String.format()",
            link: UrlJavaPractice + "String.format.md",
          },
          {
            text: "System.nanoTime()",
            link: UrlJavaPractice + "System.nanoTime.md",
          },
        ],
      },
      {
        text: "关于Maven",
        items: [
          {
            text: "Setting文件",
            link: UrlJava + "maven-setting.md",
          },
          {
            text: "常见解决方式",
            link: UrlJava + "maven-solution.md",
          },
        ],
      },
      {
        text: "Kafka",
        items: [
          {
            text: "Kafka概念理解",
            link: UrlKafka + "kafka.md",
          },
        ],
      },
    ],
  },
];
