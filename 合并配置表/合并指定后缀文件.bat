@echo off
setlocal enabledelayedexpansion
set file=configs.json
set /a count=0
echo ��������%file%�ļ�
REM ɾ��%file%�ļ�
if exist %cd%\%file% (
	del /q %file%
)
for /F %%d in ('dir /b *.json') do (
	if !count! gtr 0 (
		REM echo ��Ӷ���%%d!count!
		echo ,>>%file%
	) else (
		echo {>>%file%
	)
	set /a count+=1
	REM "�ļ���:"д��
	echo "%%~nd":>>%file%
	type %%d>>%file%
)
REM ��ӻ���
echo.>>%file%
echo }>>%file%
echo �ϲ�����
move %file% ../bin/nativescene/
pause
exit