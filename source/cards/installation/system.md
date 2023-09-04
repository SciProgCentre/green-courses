# Использование Python предустановленного в системе

Некоторые ОС (например, популярные дистрибутивы Linux), уже имеют предустановленный в системе Python.

## Недостатки

* Системная версия Python может быть устаревшей.
* Установка библиотек для системного Python может требовать дополнительных административных привилегий, не доступных пользователю.

## Особенности использования Python в Ubuntu

1. Под именем `python` может подразумеваться Python 2, или же такое имя вообще не будет доступно в командной строке, в таком случае используйте команду `python3`
2. `apt` позволяет установить несколько версий Python, установленный Python будет доступен под именем `python3.x`
3. `apt` позволяет устанавливать библиотеки для питона, эффективность установленных системных библиотек может быть выше чем установленных через другие пакетный менеджеры за счет использовани нативных расширений.