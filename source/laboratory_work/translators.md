# Лабораторная работа "Трансляторы Python"
В данной работе Вам предстоит измерить перфоманс различных интерпретаторов Python3 на задаче вычисления [множества Мандельброта](https://ru.wikipedia.org/wiki/Множество_Мандельброта). Замеры производительности каждого интепретаторов предстоит провести на трех кейсах: вычисление на чистом Python без [type hints](https://docs.python.org/3/library/typing.html), с использованием type hints и с использованием библиотеки numpy.

## Задание

Ниже дан список интепретаторов, каждый из которых вам необходимо установить и запустить ими тестовые функции из раздела "Тестовые функции". Если тестовая функция не запускается, объясните причину. Далее необходимо замерить время выполнения функций с помощью кода из раздела "Замер производительности".

## Интепретаторы
1. [Последний PyPy для Python 3.9](https://www.pypy.org/download.html)
2. [Pypy 5.7](https://downloads.python.org/pypy/)
3. [CPython](https://www.python.org/downloads/) - версии 3.8, 3.9, 3.10
4. [Jython](https://www.jython.org/index)
5. [Ironpython](https://ironpython.net/download/)
6. [Pyodide](https://github.com/pyodide/pyodide)
7. [Xeus](https://github.com/jupyter-xeus/xeus-python)
8. [Python .NET](https://pythonnet.github.io/)

## Тестовые функции

### Чистый Python без аннотаций типов

```
def linspace(start, stop, n):
    if n == 1:
        yield stop
        return
    h = (stop - start) / (n - 1)
    for i in range(n):
        yield start + h * i

def mandelbrot(pmin = -2.5, pmax= 1.5, qmin = -2, qmax= 2,
                ppoints = 200, qpoints = 200, max_iterations = 300, infinity_border = 100):
    image = [[0 for i in range(qpoints)] for j in range(ppoints)]
    for ip, p in enumerate(linspace(pmin, pmax, ppoints)):
        for iq, q in enumerate(linspace(qmin, qmax, qpoints)):
            c = p + 1j * q
            z = 0
            for k in range(max_iterations):
                z = z ** 2 + c
                if abs(z) > infinity_border:
                    image[ip][iq] = 1
                    break
    return image
```

### Чистый Python с аннотациями типов

```
def linspace(start, stop, n):
    if n == 1:
        yield stop
        return
    h = (stop - start) / (n - 1)
    for i in range(n):
        yield start + h * i

def mandelbrot(pmin: float = -2.5, pmax: float = 1.5, qmin: float = -2, qmax: float = 2,
                ppoints: int = 200, qpoints: int = 200, max_iterations: int = 300, infinity_border: float = 100) -> list[list[int]]:

    image: list[list[int]] = [[0 for i in range(qpoints)] for j in range(ppoints)]
    for ip, p in enumerate(linspace(pmin, pmax, ppoints)):
        for iq, q in enumerate(linspace(qmin, qmax, qpoints)):
            c: complex = p + 1j * q
            z: complex  = 0
            for k in range(max_iterations):
                z = z ** 2 + c
                if abs(z) > infinity_border:
                    image[ip][iq] = 1
                    break
    return image
```

### Python + numpy

```
import numpy as np

def mandelbrot(pmin = -2.5, pmax = 1.5, qmin = -2, qmax = 2,
            ppoints = 200, qpoints = 200, max_iterations = 300, infinity_border= 100):

    image = np.zeros((ppoints, qpoints))

    for ip, p in enumerate(np.linspace(pmin, pmax, ppoints)):
        for iq, q in enumerate(np.linspace(qmin, qmax, qpoints)):
            c = p + 1j * q
            z = 0
            for k in range(max_iterations):
                z = z ** 2 + c
                if abs(z) > infinity_border:

                    image[ip, iq] = 1
                    break
    return image
```


## Замер производительности
Для замера времени выполнения самой функции, используйте код ниже:

```
tic = time.perf_counter_ns()
image = mandelbrot()
toc = time.perf_counter_ns()
print((toc - tic)/1_000_000_000, "s")
```

Помимо описанного, вам необходимо подобным способом провести измерения времени выполнения функции вместе с запуском всего скрипта.
