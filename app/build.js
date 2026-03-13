const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

async function build() {
  // 创建输出目录
  const distDir = path.join(__dirname, 'dist-browser');
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  // 复制 index.html
  fs.copyFileSync(
    path.join(__dirname, 'src/index.html'),
    path.join(distDir, 'index.html')
  );

  // 复制 favicon
  if (fs.existsSync(path.join(__dirname, 'src/favicon.ico'))) {
    fs.copyFileSync(
      path.join(__dirname, 'src/favicon.ico'),
      path.join(distDir, 'favicon.ico')
    );
  }

  // 复制 assets
  const assetsSrc = path.join(__dirname, 'src/assets');
  const assetsDest = path.join(distDir, 'assets');
  if (fs.existsSync(assetsSrc)) {
    fs.mkdirSync(assetsDest, { recursive: true });
    fs.cpSync(assetsSrc, assetsDest, { recursive: true });
  }

  // 构建 main.js
  await esbuild.build({
    entryPoints: ['src/main.ts'],
    bundle: true,
    outfile: path.join(distDir, 'main.js'),
    format: 'esm',
    minify: false,
    sourcemap: false,
    target: ['es2020'],
    define: {
      'ngDevMode': 'false'
    }
  });

  console.log('Build completed!');
}

build().catch(err => {
  console.error(err);
  process.exit(1);
});
