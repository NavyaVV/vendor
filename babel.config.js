module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        extensions: [
          ".ios.ts",
          ".android.ts",
          ".ios.tsx",
          ".android.tsx",
          ".ts",
          ".tsx",
          ".jsx",
          ".js",
          ".json",
        ],
        alias: {
          "@components": "./src/components",
          "@screens": "./src/screens",
          "@helpers": "./src/helpers",
          "@typings": "./src/typings",
          "@config": "./src/config",
          "@store": "./src/store",
          "@utils": "./src/utils",
          "@hooks": "./src/hooks",
          "@assets": "./assets",
        },
      },
    ],
    "react-native-reanimated/plugin",
  ],
};
