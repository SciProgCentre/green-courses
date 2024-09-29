# Реализации транслятора Python

## Классическая компиляция и интерпретация

* [Транслятор](https://ru.wikipedia.org/wiki/%D0%A2%D1%80%D0%B0%D0%BD%D1%81%D0%BB%D1%8F%D1%82%D0%BE%D1%80) --- Общее название программ, задача которых превратить ваши текстовые файлы с кодом во что-то исполняемое.
* [Компилятор](https://ru.wikipedia.org/wiki/%D0%9A%D0%BE%D0%BC%D0%BF%D0%B8%D0%BB%D1%8F%D1%82%D0%BE%D1%80) --- в классическом понимании это транслятор генерирующий машинный код для процессора, однако часто современные компиляторы компилируют в байт-код для виртуальных машин или как это ещё называют в intermedia representation (IR).
```{revealjs-break}
```
* [Интерпретатор](https://ru.wikipedia.org/wiki/%D0%98%D0%BD%D1%82%D0%B5%D1%80%D0%BF%D1%80%D0%B5%D1%82%D0%B0%D1%82%D0%BE%D1%80) --- в классическом понимании это транслятор исполняющий (интерпретирующий) программу без генериции нового машинного кода.
* [Транспилятор]() --- транслятор преобразующий код с одного языка программирования (ЯП) на другой.

## Современная компиляция и интерпретация

* [Just it Time (JIT) компилятор]() --- компиляция в машинный код происходит не во время сборки программы разработчиком, а во время работы программы у пользователя.
* Современные трансляторы это многоуровневые системы в которых могут одновременно использоваться и интерпретация, и компиляция, и JIT компиляция.

## Список трансляторов Python

* [CPython](https://www.python.org/) --- стандартный интерпретатор Python, говорим Python подразумеваем CPython.
* [Jython](https://www.jython.org/index) --- реализация CPython для JVM.
* [PyPy](https://www.pypy.org/features.html) --- JIT-компилятор (!) Python.
* [Python for .NET](https://pythonnet.github.io/) --- Python реализующий интеграцию с `.NET` экосистемой через C API.
```{revealjs-break}
```
* [IronPython](https://ironpython.net/) --- Реализация Python через [Dynamic Language Runtime](https://ru.wikipedia.org/wiki/Dynamic_Language_Runtime)
* [Cython](https://cython.org/) --- транспилятор Python, превращающий код на Python в код на C.
* [MicroPython](https://micropython.org/) --- компактный интерпретатор Python для микроконтроллеров.
```{revealjs-break}
```
* [Xeus](https://github.com/jupyter-xeus/xeus-python) --- is a Jupyter kernel for Python based on the native implementation of the Jupyter protocol [xeus](https://github.com/jupyter-xeus/xeus).
* [Pyodide](https://pyodide.org/en/stable/) --- CPython скомпилированный под [WebAssembly](https://webassembly.org/).
