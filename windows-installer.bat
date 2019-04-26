@title 自动安装 photoshop 插件
@echo off
if exist "C:\Program Files\Common Files\Adobe\CEP\extensions" (
	REM explorer "C:\Program Files\Common Files\Adobe\CEP\extensions"
	echo "plugin is exist"
	.\unzip\bin\unzip.exe -o .\color2gray.zxp -d "C:\Program Files\Common Files\Adobe\CEP\extensions\color2gray"
	echo "插件安装成功，请重启 PS"
)
if exist "C:\Program Files (x86)\Common Files\Adobe\CEP\extensions" (
	REM explorer "C:\Program Files (x86)\Common Files\Adobe\CEP\extensions"
	echo "plugin is exist"
	REM "%rar%" e color2gray.zxp "C:\Program Files (x86)\Common Files\Adobe\CEP\extensions\color2gray"
	.\unzip\bin\unzip.exe -o .\color2gray.zxp -d "C:\Program Files (x86)\Common Files\Adobe\CEP\extensions\color2gray"
	echo install success, please restart photoshop
)

pause
@echo on