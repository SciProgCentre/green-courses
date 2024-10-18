# Виртуальные окружения Python


* [`venv` - creation of virtual environments](https://docs.python.org/3/library/venv.html) - входит в стандартную библиотеку
* [`virtualenv` - a tool for creating isolated virtual python environments](https://virtualenv.pypa.io/en/latest/) --- более продвинутый вариант
* [Pipenv](https://pipenv.pypa.io/en/latest/)
* [Conda environments](https://conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html#managing-environments) --- управление не только Python пакетами, но и другими зависимостями
* [Poetry](https://python-poetry.org/)


## Недостатки venv:

* is slower (by not having the app-data seed method),
* is not as extendable,
* cannot create virtual environments for arbitrarily installed python versions (and automatically discover these),
* is not upgrade-able via pip,
* does nщt have as rich programmatic API (describe virtual environments without creating them).

## Управление зависимостями:

* `requirements.txt`:
    * `pip freeze > requirements.txt`
    * `pip install -r requirements.txt`
* YAML файл окружения для `condaenv`
* `pipenv` файл


Виртуальное окружение в Python — это изолированная среда, которая позволяет вам устанавливать и управлять зависимостями (библиотеками и пакетами) для проекта отдельно от других проектов и от глобальной установки Python на вашем компьютере. Это особенно полезно, когда вы работаете над несколькими проектами, которые могут требовать разные версии одних и тех же библиотек.

### Основные преимущества виртуальных окружений:

1. **Изоляция зависимостей**: Вы можете устанавливать и управлять библиотеками и пакетами для каждого проекта отдельно, избегая конфликтов между версиями библиотек, которые могут возникнуть при работе с несколькими проектами.
2. **Управление версиями**: Позволяет использовать разные версии одних и тех же библиотек в разных проектах.
3. **Легкость управления**: Упрощает управление зависимостями проекта, так как каждая среда имеет свой собственный каталог для установки библиотек.

### Создание и использование виртуальных окружений

#### С помощью `venv` (встроенный модуль в Python 3.3 и выше)

1. **Создание виртуального окружения**:
   ```sh
   python -m venv myenv
   ```
   Здесь `myenv` — это имя для вашего виртуального окружения. Вы можете выбрать любое другое имя.

2. **Активация виртуального окружения**:
   - **На Windows**:
     ```sh
     myenv\Scripts\activate
     ```
   - **На macOS и Linux**:
     ```sh
     source myenv/bin/activate
     ```

3. **Деактивация виртуального окружения**:
   ```sh
   deactivate
   ```

#### С помощью `virtualenv` (дополнительный пакет, доступный для Python 2 и 3)

1. **Установка `virtualenv`**:
   ```sh
   pip install virtualenv
   ```

2. **Создание виртуального окружения**:
   ```sh
   virtualenv myenv
   ```

3. **Активация и деактивация** выполняются так же, как и с использованием `venv`.

### Управление зависимостями

1. **Установка пакетов**:
   После активации виртуального окружения, любые пакеты, установленные с помощью `pip`, будут установлены в это окружение и не будут влиять на глобальную установку Python.
   ```sh
   pip install package_name
   ```

2. **Сохранение зависимостей**:
   Для сохранения списка всех установленных пакетов и их версий используйте:
   ```sh
   pip freeze > requirements.txt
   ```

3. **Установка зависимостей из файла**:
   Для установки всех пакетов из файла `requirements.txt`:
   ```sh
   pip install -r requirements.txt
   ```

### Пример

1. Создайте и активируйте виртуальное окружение:
   ```sh
   python -m venv myprojectenv
   source myprojectenv/bin/activate  # Для macOS/Linux
   myprojectenv\Scripts\activate  # Для Windows
   ```

2. Установите необходимые пакеты:
   ```sh
   pip install numpy pandas
   ```

3. Сохраните зависимости:
   ```sh
   pip freeze > requirements.txt
   ```

4. Деактивируйте виртуальное окружение после завершения работы:
   ```sh
   deactivate
   ```

Виртуальные окружения позволяют поддерживать чистоту и управляемость зависимостей вашего проекта, что особенно важно при работе с различными проектами и требованиями к версиям библиотек.