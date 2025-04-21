import { dirname, join, resolve } from "path";

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}

const config = {
  // MDX 파일을 스토리 목록에 추가하고 가장 먼저 나오도록 순서 조정
  stories: [
    "../stories/design-system.mdx", // 디자인 시스템 설명이 가장 먼저 나오도록 함
    "../stories/*.mdx", // 다른 MDX 파일이 있다면 다음 순서로
    "../stories/*.stories.tsx", // 그 다음에 컴포넌트 스토리
    "../stories/**/*.stories.tsx",
  ],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },

  core: {},

  async viteFinal(config, { configType }) {
    // 전처리기 설정 출력하여 확인
    console.log(
      "SCSS Preprocessor Options:",
      config?.css?.preprocessorOptions?.scss
    );

    // 기존 CSS 설정이 없는 경우 초기화
    if (!config.css) {
      config.css = {};
    }

    // CSS 모듈 설정이 없는 경우 초기화
    if (!config.css.modules) {
      config.css.modules = {};
    }

    return {
      ...config,
      css: {
        ...config.css,
        modules: {
          ...config.css.modules,
          localsConvention: "camelCase", // "localConvention"이 아닌 "localsConvention"으로 수정
          generateScopedName: "[name]__[local]__[hash:base64:5]",
        },
        preprocessorOptions: {
          scss: {},
        },
      },
      define: { "process.env": {} },
      resolve: {
        alias: [
          {
            find: "common-ui",
            replacement: resolve(__dirname, "../../../packages/common-ui/src"),
          },
          {
            find: "@doo/common-ui",
            replacement: resolve(__dirname, "../../../packages/common-ui/src"),
          },
        ],
      },
    };
  },

  docs: {
    autodocs: true,
  },
};

export default config;
