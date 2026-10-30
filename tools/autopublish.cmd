@echo off
rem Daily autopublish entry for dsh-metaphysics (called by Windows Task Scheduler).
rem All output goes to tools\.autopublish.log; with no changes the script prints nothing.
setlocal
set "NODE=C:\Users\Administrator\.workbuddy\binaries\node\versions\22.22.2-6\node.exe"
set "REPO=C:\Users\Administrator\Documents\deepseek-harness\default-workspace\metaphysics-bundle"
"%NODE%" "%REPO%\tools\autopublish.mjs" >> "%REPO%\tools\.autopublish.log" 2>&1
exit /b %ERRORLEVEL%
