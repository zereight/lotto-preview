const fs = require("fs");
const globby = require("globby");
const prettier = require("prettier");

const getDate = new Date().toISOString().slice(0, 10);

const DOMAIN = "https://lotto-preview.com"; // 마지막에 / 안붙게 입력

const formatted = (sitemap) => prettier.format(sitemap, { parser: "html" });

(async () => {
  const pages = await globby([
    // include
    "src/**/*.tsx",
    "src/*.tsx",
    // exclude
    // "!../pages/_*.tsx",
    // "!../pages/admin/*.tsx",
    // "!../pages/admin/**/*.tsx",
    // "!../pages/my/*.tsx",
    // "!../pages/my/**/*.tsx",
    // "!../pages/**/[id].tsx",
    // "!../pages/**/[id]/*.tsx",
    // "!../pages/**/[id]/**/*.tsx",
  ]);

  const pagesSitemap = `
    ${pages
      .map((page) => {
        const path = page
          .replace("src/", "")
          .replace(".tsx", "")
          .replace(/\/index/g, "");
        const routePath = path === "index" ? "" : path;
        return `
          <url>
            <loc>${DOMAIN}/${routePath}</loc>
            <lastmod>${getDate}</lastmod>
          </url>
        `;
      })
      .join("")}
  `;

  const generatedSitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    >
      ${pagesSitemap}
    </urlset>
  `;

  const formattedSitemap = formatted(generatedSitemap).toString();

  fs.writeFileSync("public/sitemap-default.xml", formattedSitemap, "utf8");
})();
