# Заголовок PY-файла

Рассмотрим пример py-файла:
```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# vim:fileencoding=utf-8

print("Shell script")
```

## UNIX “shebang” line

[UNIX “shebang” line](https://docs.python.org/3/tutorial/appendix.html#tut-scripts) - позволяет выполнить запуск py-файл с правами на исполнение как скрипта оболочки:
```bash
chmod +x example_script.py
./example_script.py
```

## Кодировка файла

По умолчанию py-файлы интерпретируются в кодировке [UTF-8](https://ru.wikipedia.org/wiki/UTF-8), но кодировку можно задать вручную:
```
# -*- coding: encoding -*-
```

или указать кодировку для редактора кода:

```
# vim:fileencoding=<encoding-name>
```
