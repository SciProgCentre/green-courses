# Программа курса

1. Синтаксис Python. Инструменты разработки на Python
   1. Синтаксис Python. Области видимости переменных 
   2. Создание виртуальных окружений. Модули venv, virtualenv. Виртуальные окружения conda-env 
   3. Тестирование ПО. Модули unittest, pytest. Системы запуска и контроля тестов 
   4. Сборка пакета с setuptools и установка пакета в режиме для разработчика 
   5. Создание документации пакета с помощью sphinx 
   6. CI/CD. Github Actions 
2. ООП и объектная модель Python. Структурная типизация.
   1. Семантика Python 
   2. Использование модуля inspect для анализа объектов 
   3. ООП. Создание интерфейсов и абстрактных классов с модулем abc 
   4. Протоколы и структурная типизация с модулем typing. Статическая проверка типов с mypy 
   5. Создание перечислений с модулем enum 
   6. Датаклассы в Python 
3. Функциональное программирование в Python. Коллекции и дата-классы
   1. Функциональное программирование в Python 
   2. Итераторы и коллекции. Модули itertools и collection 
   3. Функциональное программирование c модулем functools 
   4. Декораторы функций и классов 
   5. Создание дата-классов с помощью декоратора @dataclass 
   6. Генерация и обработка исключений 
4. Занятие 4:
   1. Система импорта Python. Импорт модулей и пакетов. Использование модуля importlib 
   2. Логирование с модулем logging 
   3. Время и дата. Модули datetime, time 
   4. Интерактивные среды 
   5. Контекстные менеджеры 
   6. Работа с операционной системой через модули os, sys и shutil. Запуск дочерних процессов с модулем subprocess 
5. Трансляторы Python. Создание консольных приложений. Работа с файловой системой.
   1. Трансляторы Python 
   2. Генерация скрипта для консольной оболочки ОС с помощью setuptools 
   3. Парсинг аргументов командной строки с модулем argparse 
   4. Создание консольного приложения с модулем cmd. 
   5. Работа с путями с помощью модуля pathlib 
   6. Модуль io 
   7. Использование модуля tempfile для создания временных файлов 
6. Текстовые данные и файлы. Сериализация/Дессераилизация:
   1. Строки: модули string и template, f-strings. 
   2. Форматирование таблиц с модулем tabulate 
   3. Формат CSV и модуль csv 
   4. Формат JSON, валидация с помощью JSOM Schema и модули json, jsonschema, json-schema-for-humans 
   5. Формат XML и модули xml, lxml 
   6. Работа с архивами с модулями zipfile и tarfile 
   7. Последовательная обработка нескольких файлов с помощью модуля fileinput 
   8. Numpy IO: работа с текстовыми файлами 
   9. Шаблонизатор jinja2 
   10. Чтение данных с помошью Pandas 
7. Бинарные данные и файлы. Сериализация/Дессераилизация :
   1. Типа данных bytes 
   2. Чтение Си-структур с помощью модуля struct 
   3. Numpy nd-arrays 
   4. Numpy IO: файлы форматов NPY и NPZ 
   5. Парсинг выражений с модулем numexp 
   6. Работа с памятью в Python. Доступ к сборщику мусора через модуль gc
   7. Консервация объектов. Модули pickle и shelve 
   8. Формат Google Protobuff 
   9. Memory mapping и модуль mmap 
   10. Common Data Model 
   11. Чтение файлов CERN ROOT с помощью модуля uproot 
9. Профилировка с модулем profile 
10. Многопоточное, асинхронное и параллельное исполнение. GIL
    1. Вытесняющая многозадачность и модуль threading 
    2. Кооперативная многозадачность и модуль asyncio 
    3. Параллельное исполнение с модулем multyprocessing 
11. Сетевое программирование и WEB 
    1. Сокеты. UPD и TCP. Модули socket и socketserver 
    2. HTTP. Модули http и request 
    3. HTML. GET и POST запросы. .
    4. Асинхронный сервер с asyncio 
    5. Построение графиков с plotly и bokeh 
    6. WEB-фреймворки: Tornado, Flask, Django, aiohttp, FastAPI 
12. Graphical User Interface 
    1. Создание графических приложений с tkinter и PySide 
    2. Events, signal and slots. Observable property.
    3. Models and Views. Файловый менеджер как пример MVC.
13. Matplotlib и его интеграция с GUI 
14. Базы данных и GUI :
    1. СУБД и ACID. DBM. DB API v2.0. SQLite. ORM, CRUD и SQLAlchemy 
    2. Модуль appdirs и конфигурация GUI приложений 
    3. YAML 
    4. Системы конфигурация HYDRA и OmegaConf 
15. Распространения приложений с помощью setuptools
16. Взаимодействие с нативным кодом  и оборудованием: Python.h, ctypes, cffi, Cython, Сборка нативных артефактов в setuptools
17. Взаимодействие с нативным кодом: Numba, SWIG, Boost.Python, Embedded Python. PyROOT и G4Py как примеры.
18. Работа с оборудованием и драйверами. Подключение Си-драйвера через ctypes. HID, FTD32, USB. Модули pyusb, pyserial, pyftdi, pylibftdi. Arduino. 