import { defineConfig } from "vitepress";
import miniappSidebar from "./config/sidebar/miniapp.mjs";
import gisshowSidebar from "./config/sidebar/gisshow.mjs";
import huanyuSidebar from "./config/sidebar/huanyu.mjs";
import websiteSidebar from "./config/sidebar/website.mjs";
import javaScriptSidebar from "./config/sidebar/javascript.mjs";
import linuxSidebar from "./config/sidebar/linux.mjs";
import designSidebar from "./config/sidebar/design.mjs";
import pythonSidebar from "./config/sidebar/python.mjs";
import javaSidebar from "./config/sidebar/java.mjs";
import aiSidebar from "./config/sidebar/ai.mjs";
import dockerSidebar from "./config/sidebar/docker.mjs";
import mybatisSidebar from "./config/sidebar/java/mybatis.mjs";
import springbootSidebar from "./config/sidebar/java/springboot.mjs";

export default defineConfig({
  title: "AI寰宇空间",
  description: "寰宇无界，AI 无限 —— AI寰宇空间，分享个人技术与思考",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  lastUpdated: true,
  markdown: {
    container: {
      tipLabel: "提示",
      warningLabel: "警告",
      dangerLabel: "危险",
      infoLabel: "信息",
      detailsLabel: "详细信息",
    },
  },
  themeConfig: {
    logo: "/aihuanyu.space-logo-small.svg",
    nav: [
      // link为实际的目录名，并且文件下要有index.md文件
      { text: "主页", link: "/" },
      { text: "AI空间", link: "/docs/ai" },
      { text: "Python", link: "/docs/python" },
      { text: "小程序", link: "/docs/mini-app" },
      { text: "JavaScript", link: "/docs/javascript" },
      {
        text: "Java系列",
        items: [
          { text: "Java实战", link: "/docs/java" },
          { text: "MyBatis", link: "/docs/java/mybatis" },
          { text: "Spring Boot", link: "/docs/java/springboot" },
        ],
      },
      { text: "Linux", link: "/docs/linux" },
      { text: "Docker", link: "/docs/docker" },
      { text: "软件设计", link: "/docs/design" },
      { text: "网站搭建", link: "/docs/website" },
    ],
    sidebar: {
      "/docs/ai/": aiSidebar,
      "/docs/mini-app/": miniappSidebar,
      "/docs/gisshow/": gisshowSidebar,
      "/docs/huanyu/": huanyuSidebar,
      "/docs/website/": websiteSidebar,
      "/docs/javascript/": javaScriptSidebar,
      "/docs/linux/": linuxSidebar,
      "/docs/design/": designSidebar,
      "/docs/python/": pythonSidebar,
      "/docs/java/": javaSidebar,
      "/docs/docker/": dockerSidebar,
      "/docs/java/mybatis/": mybatisSidebar,
      "/docs/java/springboot/": springbootSidebar,
    },
    lastUpdated: {
      text: "最后更新时间",
      formatOptions: {
        dateStyle: "long",
      },
    },
    socialLinks: [{ icon: "github", link: "https://github.com/HuanyuSpace" }],
  },
});
