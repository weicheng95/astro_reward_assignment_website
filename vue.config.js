// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      // pass options to sass-loader
      sass: {
        // @/ is an alias to src/
        // so this assumes you have a file named `src/variables.scss`
        data: `
          @import "@/assets/styles/global.scss";
        `,
      },
    },
  },

  pluginOptions: {
    s3Deploy: {
      registry: undefined,
      awsProfile: "default",
      region: "ap-southeast-1",
      bucket: "astro-reward-assignment",
      createBucket: true,
      staticHosting: true,
      staticIndexPage: "index.html",
      staticErrorPage: "index.html",
      assetPath: "dist",
      assetMatch: "**",
      deployPath: "/",
      acl: "bucket-owner-full-control",
      pwa: false,
      enableCloudfront: false,
      uploadConcurrency: 5,
      pluginVersion: "3.0.0",
    },
  },
};
