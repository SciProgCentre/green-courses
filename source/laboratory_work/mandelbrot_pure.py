import numpy as np

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


def mandelbrot_annotated(pmin: float = -2.5, pmax: float = 1.5, qmin: float = -2, qmax: float = 2,
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

def mandelbrot_numpy(pmin = -2.5, pmax = 1.5, qmin = -2, qmax = 2,
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

def mandelbrot_numpy_annotated(pmin: float = -2.5, pmax: float = 1.5, qmin: float = -2, qmax: float = 2,
            ppoints: int = 200, qpoints: int = 200, max_iterations: int = 300, infinity_border: float = 100) -> np.ndarray:

    image: np.ndarray = np.zeros((ppoints, qpoints))

    for ip, p in enumerate(np.linspace(pmin, pmax, ppoints)):
        for iq, q in enumerate(np.linspace(qmin, qmax, qpoints)):
            c: complex = p + 1j * q
            z: complex  = 0
            for k in range(max_iterations):
                z = z ** 2 + c
                if abs(z) > infinity_border:

                    image[ip, iq] = 1
                    break
    return image

if __name__ == "__main__":
    import matplotlib.pyplot as plt
    plt.imshow(mandelbrot())
    plt.show()
    plt.clf()
    plt.imshow(mandelbrot_annotated())
    plt.show()
    plt.clf()
    plt.imshow(mandelbrot_numpy())
    plt.show()
    plt.clf()
    plt.imshow(mandelbrot_numpy_annotated())
    plt.show()
    plt.clf()