# Грамматика Python

* Лексический анализатор разбивает код на токены.
* Поток токенов преобразуется в AST.
* AST компилируется в байт-код (ассемблер) для виртуальной машины Python.
* [Полная грамматика](https://docs.python.org/3/reference/grammar.html)
* [Переход на новый парсер](https://peps.python.org/pep-0617/).

## Line structure

**Physical line** --- заканчивается символом окончания строки (`\n` или `\r\n`).

**Logical lines** --- заканчиваться токеном `NEW LINE`.

Примеры --- несколько физических строк, но одна логическая:

```python
if 1900 < year < 2100 and 1 <= month <= 12 \
   and 1 <= day <= 31 and 0 <= hour < 24 \
   and 0 <= minute < 60 and 0 <= second < 60:   # Looks like a valid date
        pass
```

```python
month_names = ['Januari', 'Februari', 'Maart',      # These are the
               'April',   'Mei',      'Juni',       # Dutch names
               'Juli',    'Augustus', 'September',  # for the months
               'Oktober', 'November', 'December']   # of the year
```

## Indent

Корректные отступы:
```python
def perm(l):
        # Compute the list of all permutations of l
    if len(l) <= 1:
                  return [l]
    r = []
    for i in range(len(l)):
             s = l[:i] + l[i+1:]
             p = perm(s)
             for x in p:
              r.append(l[i:i+1] + x)
    return r
```

Некорректные:
```python
 def perm(l):                       # error: first line indented
for i in range(len(l)):             # error: not indented
    s = l[:i] + l[i+1:]
        p = perm(l[:i] + l[i+1:])   # error: unexpected indent
        for x in p:
                r.append(l[i:i+1] + x)
            return r                # error: inconsistent dedent
```

## Expressions and statemens

* [**Expressions**](https://docs.python.org/3/reference/expressions.html) 
* [**Simple statmenet**](https://docs.python.org/3/reference/simple_stmts.html) - помещаются в одну логическую строку, могут идти через `;`
* [**Compaund statmenet**](https://docs.python.org/3/reference/compound_stmts.html) - содержит несколько **simple statement**

Можно:
```python
if True: print(1)
```
Нельзя:
```python
if True: if True: print(1)
```
Можно:
```python
if True: print(2); print(2)
```
Life hack --- `;` убирает лишний вывод в output Jupyter Notebook:
```python
import matplotlib.pyplot as plt
plt.plot([1,2], [1,2], label="Label")
plt.legend();
```

## Opertors

<pre><span></span>+       -       *       **      /       //      %      @
&lt;&lt;      &gt;&gt;      &amp;       |       ^       ~       :=
&lt;       &gt;       &lt;=      &gt;=      ==      !=
</pre>

## Delimeters

<pre><span></span>(       )       [       ]       {       }
,       :       .       ;       @       =       -&gt;
+=      -=      *=      /=      //=     %=      @=
&amp;=      |=      ^=      &gt;&gt;=     &lt;&lt;=     **=
</pre>

##

<pre><span></span>'       "       #       \
</pre>

## Unused symbols

<pre><span></span>$       ?       `
</pre>

## Literals

[literals](https://docs.python.org/3/reference/lexical_analysis.html#literals) --- Литералы представляют собой константы, включаемые непосредственно в текст программы. 


## String literals

```todo
Примеры разных литералов
```

Python поддерживает несколько видов строковых литералов:
```python
"Обычная строка\n"

```
