@echo off
@cls

@REM ! NON-WORKING
@REM yarn inliner idgen.html >idgen-dist.html

@REM ! NON-WORKING
@REM call :sub 9>idgen-dist.html
@REM exit /b
@REM :sub
@REM echo Screen message 1
@REM >&9 yarn inliner idgen.html
@REM exit /b

@REM ! almsot worked, but includes npm logs
@REM yarn inliner idgen.html >> idgen-dist.html 2>&1