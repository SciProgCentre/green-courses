# Интерпретаторы CPython, Jython и их байткод

* CPython --- написан на С, что позволяет легкую интеграция модулей на Си в Python.
* Jython --- написан на Java, **не компилирует** Python в байт-код JVM, но позволяет интеграцию JVM модулей в Python.

## Типичный путь Python кода

```{eval-rst}
.. plantuml::

    @startuml
    rectangle "CPython, Jython"{
     "Source Code (.py files)" as (source)
     "Лексический анализ" as (lexer)
     "ByteCode для Python VM" as (bytecode)
     "Интерпретация ByteCode" as (exe)
     source -down-> lexer: "Поиск ошибок \nсинтаксиса"
     lexer -down-> bytecode: "Компиляция,\nрезультат кэшируется"
     bytecode -down-> exe: "Запуск\nисполнения"
     }
    @enduml
```

## Bytecode Python VM

**bytecode**:
* Python source code is compiled into bytecode, the internal representation of a Python program in the CPython interpreter. 
* The bytecode is also cached in .pyc files so that executing the same file is faster the second time (recompilation from source to bytecode can be avoided). 
```{revealjs-break}
```
* This “intermediate language” is said to run on a virtual machine that executes the machine code corresponding to each bytecode. 
* Do note that bytecodes are not expected to work between different Python virtual machines, nor to be stable between Python releases.

## Компилируем в bytecode

[Откроем проект]() и запустим файл `compile_example.py`:
```
python3 compile_example.py
```
А затем исследуем содержимое директории проекта:
```{revealjs-break}
```
```
.
├── compile_example.py
├── spc
│   ├── __init__.py
│   ├── mandelbrot.py
│   ├── __pycache__
│   │   ├── __init__.cpython-311.pyc
│   │   ├── mandelbrot.cpython-311.pyc
│   │   └── run.cpython-311.pyc
│   └── run.py
```
В корне пакета `spc` появилась директория `__pycache__` в которой содержатся файлы с байткодом.

## Компиляция с дополнительными опциями

Python позволяет компилировать с дополнительными опциями:
```
python3 -O compile_example.py
# remove assert and __debug__-dependent statements;
# or
python3 -OO compile_example.py
# do -O changes and also discard docstrings
```

## Смотрим ByteCode наглядно с модулем `dis`

```{eval-rst}
.. replite::
   :kernel: pyodide
   :width: 100%
   :height: 600px
   :prompt: Try Replite!
   :prompt_color: #dc3545

   import dis

   def add(a, b):
       return abs(a) + abs(b)

   print(dis.dis(add))
   print(dis.opmap["LOAD_GLOBAL"]); # optcode
```

```todo
import dis
dis.dis("a=1;a+=1;")
dis.dis("a=1;a = a + 1;")
```
