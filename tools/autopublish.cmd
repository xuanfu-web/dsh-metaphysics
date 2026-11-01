@echo off
rem Autopublish entry for dsh-metaphysics (called by Windows Task Scheduler at 23:00 and 23:30).
rem All output goes to tools\.autopublish.log. With no changes it prints nothing but still logs one line.
rem Failures leave tools\.autopublish-error behind; a later successful run deletes it.
setlocal
set "NODE=C:\Users\Administrator\.workbuddy\binaries\node\versions\22.22.2-6\node.exe"
set "REPO=C:\Users\Administrator\Documents\deepseek-harness\default-workspace\metaphysics-bundle"
"%NODE%" "%REPO%\tools\autopublish.mjs" >> "%REPO%\tools\.autopublish.log" 2>&1
exit /b %ERRORLEVEL%
