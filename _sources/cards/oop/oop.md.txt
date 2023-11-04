from abc import ABC, abstractmethod


class A:
    @abstractmethod
    def method(self):
        print("A")
        

class B(A):
    def method(self):
        super().method()
        print("A")
        

b = B()
b.method()
