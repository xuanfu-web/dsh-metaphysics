@echo off
rem 24 小时定时任务的入口：由 Windows 计划任务调用，也可手动双击。
rem 所有输出进 tools\.autopublish.log；无改动时脚本本身不打印任何东西。
setlocal
set "NODE=C:\Users\Administrator\.workbuddy\binaries\node\versions\22.22.2-6\node.exe"
set "REPO=C:\Users\Administrator\Documents\deepseek-harness\default-workspace\metaphysics-bundle"
"%NODE%" "%REPO%\tools\autopublish.mjs" >> "%REPO%\tools\.autopublish.log" 2>&1
exit /b %ERRORLEVEL%
