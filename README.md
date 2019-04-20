# hsb2gray

去色插件，在选色时需要「猜测」所选颜色「真实明度」，虽然有一定规律但是非常难以掌握。该插件在选择颜色后会计算真实明度并展示。

## Install

双击运行 `installer.sh`。

### macOS
打开插件目录
```bash
open ~/Library/Application\ Support/Adobe/CEP/extensions
```
将当前目录下的插件复制到 Adobe 插件目录下
```bash
cp color2gray.zxp ~/Library/Application\ Support/Adobe/CEP/extensions/color2gray.zip
```
解压插件
```bash
unzip ~/Library/Application\ Support/Adobe/CEP/extensions/color2gray.zip -d ~/Library/Application\ Support/Adobe/CEP/extensions/color2gray
```
删除插件压缩包
```bash
rm  ~/Library/Application\ Support/Adobe/CEP/extensions/color2gray.zip
```

## 真实明度

直接使用「去色」选项感觉很不对，使用「图层混合模式」叠加「饱和度」图层，才是正确的明度值。

该图表示 `hsb(0, 100, 100)` 对应的这个红色，在去除色彩信息后的明度是 30。
![example01](./example01.png)

只要素描能力强，塑造丰富的色彩以及藏色会变得更加简单明了。

## 参考

- [去色、灰度、黑白的区别？](https://www.zhihu.com/question/28898729)