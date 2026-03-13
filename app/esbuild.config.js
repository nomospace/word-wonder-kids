const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist-browser');

// 清理并创建输出目录
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true });
}
fs.mkdirSync(distDir, { recursive: true });

// 复制静态文件
fs.copyFileSync(path.join(__dirname, 'src/index.html'), path.join(distDir, 'index.html'));
fs.copyFileSync(path.join(__dirname, 'src/favicon.ico'), path.join(distDir, 'favicon.ico'));
fs.cpSync(path.join(__dirname, 'src/assets'), path.join(distDir, 'assets'), { recursive: true });
fs.copyFileSync(path.join(__dirname, 'src/styles.scss'), path.join(distDir, 'styles.scss'));

esbuild.build({
  entryPoints: ['src/main.ts'],
  bundle: true,
  outfile: path.join(distDir, 'main.js'),
  format: 'iife',
  minify: false,
  sourcemap: false,
  target: ['chrome80', 'firefox80', 'safari14'],
  define: {
    'ngDevMode': 'false'
  },
  loader: {
    '.scss': 'text'
  }
}).then(() => {
  console.log('✓ Build completed to dist-browser/');
}).catch(() => process.exit(1));
