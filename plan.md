1. 当前仓库作为网站主页，增加git@github.com:EarthChen/pdf2png.git作为第二个工具功能
2. 将git@github.com:EarthChen/pdf2png.git 和git@github.com:EarthChen/photo-tools.git作为该项目的两个子模块，方便管理
3. 将git@github.com:EarthChen/photo-tools.git中的项目管理方式替换为pnpm
4. git@github.com:EarthChen/photo-tools.git项目后续开发时需要切换到新分支，新增流水线用于预览非main分支的修改效果，合并main或者推送时进行部署