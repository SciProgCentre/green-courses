# Пространство имен и области видимости

Возможности Python которые не надо использовать:

* `global spam` --- указывает что переменая `spam` создается в глобальной области видимости
* `nonlocal spam` --- указывает что перменная `spam` берется в замыкающей области видимости


## Пример работы

```{eval-rst}
.. replite::
   :kernel: pyodide
   :width: 100%
   :height: 600px
   :prompt: Try Replite!
   :prompt_color: #dc3545

   def scope_test():
       def do_local():
           spam = "local spam"
    
       def do_nonlocal():
           nonlocal spam
           spam = "nonlocal spam"
    
       def do_global():
           global spam
           spam = "global spam"
    
       spam = "test spam"
       do_local()
       print("After local assignment:", spam)
       do_nonlocal()
       print("After nonlocal assignment:", spam)
       do_global()
       print("After global assignment:", spam)
    
   scope_test()
   print("In global scope:", spam)
```