# Assignment 1 (8 p.)

In this assignment you have to prepare your project workspace.
In during semester, we will develop two projects: STEM framework and Super TEmperature Monitor.

1. (1 p.) Create git repository for your project on Github (or [MIPT Gitlab](https://code.mipt.ru/), [SCP Gitea](https://git.sciprog.center/)), and send me link on repository. Merge top commit of main branch from [this repository](https://github.com/Zelenyy/advanced-python-homework) in your repository (You can clone this repository? but mos interesting task is the creation from local repository).
2. (1 p.) Create two directory (every directory used for single project: `stem_framework` and `temperature_monitor`, in both directory create python package `stem` and file `setup.py`. 
3. (1 p.) Create license for both projects.

**Next tasks performed in project STEM framework (directory `stem_framework`).**

4. (1 p.) Create file for deployment virtual enviroment (using `venv`, `virtualenv` or `condaenv`). Add command for deployment in project `README.md`. Virtual environment must be contained package necessary for develop project (not project dependency), namely Sphinx, Pylint and MyPy. 
5. (1 p.) Fill `setup.py` file for setuping `stem` package in developer mode.
6. (1 p.) Read paper [DataForge: Modular platform for data storage and analysis](http://dx.doi.org/10.1051/epjconf/201817705003).
7. (1 p.) Add next modules in `stem` package: `core.py`, `meta.py`, `task.py`, `workspace.py`. Add shortly module level docstring in modules `meta.py`, `task.py`, `workspace.py`. In `meta.py` docstring describe conception of metadata and metadata processor. In `task.py` describe task terms, in `workspace.py` conception modularity software.
8. (1 p.) Create Sphinx documentation of `stem` package (include docstrings of `stem` package). Add to repository configs for build documentation. Make integration between sphinx and `setup.py`, allow build documentation using `python setup.py build_sphinx`.

# Assignment 2 (12 p.)

In this assignment you have to develop a metadata processor for the STEM Framework.

In the STEM, the task run includes three stage:

1. Resolving the task dependencies and building the task tree.
2. Metadata verification: each task has `Specification` which describes required meta and the metadata processor checks input meta the correspondence to the specification.
3. The invocation of each task.

Meta is tree-like structure which contains key-value pairs on top level. The key is a string, the value is a primitive type, list or another Meta type. In the STEM we will use a dictionary and a dataclass as Meta objects.

Specification is description of mandatory part of the metadata which must be present in the Meta for the given task. The metadata processor checks whether the given meta corresponds specification before the execution of the task. In the STEM we use dataclass class-object if the dataclass instance is used as the Meta object and sequence of name-type pairs otherwise.

1. (1 p.) In `core.py` module create a protocol `Dataclass` as a type annotation for a dataclass object.
2. (1 p.) In `meta.py` module create a type annotation for the next types:
   1. `Meta` --- union of the `dict` and the `Dataclass` type.
   2. Specification field type `SpecificationField` --- pairs of necessary meta key and necessary meta value type (this can be single type, tuple of types, or another specification if meta value is another `Meta`)
   3. `Specification` for specification --- union of the `Dataclass` or tuple of the `SpecifiationField` type.
   Note: we can add additional type annotations if necessary. 
3. (1 p.) In `meta.py` module implement function `get_meta_attr(meta : Meta, key : str, default : Optional[Any] = None) -> Optional[Any]:` which return meta value by `key` from top level of `meta` or `default` if `key` don't exist in `meta`.
4. (1 p.) In `meta.py` module implement function `def update_meta(meta: Meta, **kwargs):` which update `meta` from `kwargs`.
5. (6 p.) In `meta.py` module implement class `MetaVerification` --- this class contains result of meta verification. It contains list of instance of dataclass `MetaFieldError` or another `MetaVerification` in the field `errors`:
   1. Implement _property_ `checked_success` that returns `True` if there is no errors of verification.
   2. Implement _staticmethod_ `def verify(meta: Meta, specification: Optional[Specification] = None) -> "MetaVerification":` which verify `meta` by `specification`. Raise `SpecificationError` if verification impossible.
6. (2 p.) In `core.py` module implement class `Named` with _property_ `name`. This property returns value of private variable `_name` if it is not None and returns name of current class (`Named` or his children) in snake_case (for translation classname from PascalCase to snake_case implement `def pascal_case_to_snake_case(name: str) -> str:` function).

# Assignment 3 (8 p.)

In this assignment you have to implement API for STEM task creation.


1. (2 p.) In `task.py` module implement decorator `data(func: Callable[[Meta], T], specification: Optional[Specification] = None, **settings) -> FunctionDataTask[T]` which wrap user function as `FunctionDataTask` object. Name of wrapped function and wrapped function have to forward as `name` and `func` arguments  of the `FunctionDataTask` constructor. Argument `specification` and keyword arguments `settings` have to forward as `specification` and `settings` arguments of the `FunctionDataTask` constructor. Decorator can be applied as `@data` and as `@data(...)`.
2. (3 p.) In `task.py` module implement decorator `task(func: Callable[[Meta, ...], T], specification: Optional[Specification] = None, **settings) -> FunctionTask[T]` which wrap user function as `FunctionTask` object. Name of wrapped function and wrapped function have to forward as `name` and `func` arguments  of the `FunctionTask` constructor. Names of arguments of wrapped function (exclude argument `meta`) have to forward as `dependencies` argument (as `tuple` of `str`) of the `FunctionTask` constructor. Argument `specification` and keyword arguments `settings` have to forward as `specification` and `settings` arguments of the `FunctionTask` constructor. Decorator can be applied as `@task` and as `@task(...)`.
3. (1 p.) In `task.py` module implement class `MapTask` which apply `func` for each element of the iterated dependence. Property `name` have to return the name of the dependence with the prefix `"map_"`.
4. (1 p.) In `task.py` module implement class `FilterTask` which filter iterated dependence using `key` function. Property `name` have to return the name of the dependence with the prefix `"filter_"`.
5. (1 p.) In `task.py` module implement class `ReduceTask` which reduce iterated dependence using `func` function. Property `name` have to return the name of the dependence with the prefix `"reduce_"`.

# Assignment 4 (14 p.)

In this assignment you have to implement building the task tree and automatically dependence resolving.

In the STEM, tasks union in special workspaces (which implemented as children of interface `IWorkspace` and can have sub-workspaces). Also, tasks can be defined on module level and in this case, its implicitly union to special module-workspaces. 


1. (8 p.) Implement **metaclass** `Workspace(ABCMeta, ILocalWorkspace):` in module `workspace.py`. This metaclass provides next features for user classes:
   1. The class-object itself must be returned on constructor call of user classes.
   2. Class-objects of user classes implement the interface `ILocalWorkspace` (see inheritance of `Workspace` class).
   3. All attributes (not methods) of the user workspace class, which inherit the class `Task` must be replaced on `ProxyTask` objects, using as attribute/method names as proxy names (The constructor of class `ProxyTask` receive two arguments: some task object and it proxy name).
   4. All `ProxyTask` attributes and methods (which inherit the class `Task` objects) of the user workspace class must be accessible from property `tasks` (Property `tasks` return dictionary, which have names of tasks in keys and itself tasks in values).
   5. All tasks (`ProxyTask` attributes and task-methods) must have the attribute `_stem_workspace` which contain this workspace.
   6. Attribute `workspaces` of the user workspace class must be converted to set if present else property `workspaces` must be return empty set (Property `workspaces` return set contains sub-workspaces of this workspace).
   Note: Metaclass is black magic, we can ignore ordinary rules of object creation.
2. (2 p.) In module `workspace.py`, in class `IWorkspace` implement method  `find_task(self, task_path: Union[str, TaskPath]) -> Optional[Task]` which return task from this workspace or from his sub-workspaces. `task_path` is special `TaskPath` object or string in next format: names of sub-workspaces (can be no one) and the name of task joined by `"."`. If `task_path` contains only task name and task with this name absent in workspace should proceed search in sub-workspaces. Return `None` if task can't be found.
3. (3 p.) In module `workspace.py`, in class `IWorkspace` implement **staticmethod**  `module_workspace(module: ModuleType) -> "IWorkspace"` which return module-workspaces. Module-workspaces is the instance of the class `LocalWorkspace`, which contain tasks (instance of class `Task` or its subclasses) and workspaces (instance of class `IWorkspace` and its subclasses) defined in module associated with variable `module`. Module-workspace is contained in module variable `__stem_workspace` if this variable exists, otherwise you should create it and store it in this variable.
4. (1 p.) In module `workspace.py`, in class `IWorkspace` implement **staticmethod** `find_default_workspace(task: Task) -> "IWorkspace"`. This method return `_stem_workspace` value if it exists and module-workspace for module which contains task definition.

# Assignment 5 (16 (19) p.)

In this assignment you finish core part of the STEM. you have to unite all previous part and implement system of task execution.

For to start, let set rules of meta forwarding. 

For example, consider next task tree:

![](./task_graph.svg)

And on the next example of meta:
```
{
    "a" : 1,
    "b" : 2,
    "int_reduce" : {
    }
    "float_scale" : {
        "int_reduce" : {
            "aa" : 10,
            "int_scale" : {
                "bb" : 10,
            }
        }        
    }
    "float_range" : {...}
}
```

In this example top-level metafields `a`, `b` , `int_reduce` forward to top-level task `float_reduce`, but metafields `float_scale` and `float_range` forward to children tasks `float_scale` and `float_range` respectively. Content of `float_scale` distributed in the same way.

1. (6 p.) In module `task_tree.py` implement the method  `resolve_node(self, task: Task[T], workspace: Optional[IWorkspace] = None) -> TaskNode[T]:` of the class `TaskTree` and properties `dependencies`, `is_leaf`, `unresolved_dependencies` and `has_dependence_errors` of the class `TaskNode`. Instance of `TaskTree` contain tree of tasks and its dependencies (or of dependencies error). Instance of `TaskNode` is node of this tree. Method `resolve_node` accept the task and the workspace (optional if `workspace` is `None` using default workspace of the task) and return `TaskNode` instance which contain the task and `TaskNode` instances for resolving dependencies (returned by `dependecies` property), names of unresolving dependecies (returned by `unresolved_dependencies` properties). The property `is_leaf` return `True` if the task doesn't have dependencies. The property `has_dependence_errors` return `True` if current node or any child node (on any level) have unresolving dependence.
2. (2 p.) In module `task_runner.py` implement the method `run(self, meta: Meta, task_node: TaskNode[T]) -> T:` of the class `SimpleRunner`. This method run the method `task_node.task.transform` using the `meta` argument and result of invocation of the `transform` method from `task_node` dependencies. Content of the `meta` argument distributed by defined rules.
3. (3 p.) In module `task_master.py` implement the method `execute(self, meta: Meta, task: Task[T], workspace: Optional[Workspace] = None) -> TaskResult[T]:` of the class `TaskMaster`. This method implement next algorithm:
   1. Get the `TaskNode` instance for given `task` from existing or new `task_tree`.The method return `TaskResult` with `TaskStatus.DEPENDENCIES_ERROR` if the `TaskNode` instance has dependencies error.
   2. Verify metadata give in `meta` argument using `MetaVerification.verify`. Content of the `meta` argument distributed between tasks by defined rules. If metadata errors is presented, should be return `TaskResult` with `TaskStatus.META_ERROR` and `TaskMetaError` instance.
   3. Return `TaskResult` with `TaskStatus.CONTAINS_DATA` if dependencies or meta error is absent today. In argument `lazy_data` must be stored callable value which run invocation of the task in the `task_runner`.
4. (4 p.) In module `cli_main.py` was be implmented CLI for task run, but dark wizard `Volan-de-Mort` deleted code from git history. Fortunately, I save the help outputs of this CLI. Restore content of `cli_main.py` using this outputs.
```
harry@hogwarts: python cli_main.py --help
usage: cli_main.py [-h] [-w WORKSPACE] command ...

Run task in workspace

positional arguments:
  command
    structure           Print workspace structure
    run                 Run task

options:
  -h, --help            show this help message and exit
  -w WORKSPACE, --workspace WORKSPACE
                        Add path to workspace or file for module workspace

```
```
harry@hogwarts: python cli_utils.py structure --help
usage: cli_utils.py structure [-h]

options:
  -h, --help  show this help message and exit

```
```
harry@hogwarts: python cli_utils.py run --help
usage: cli_utils.py run [-h] [-m META] TASKPATH

positional arguments:
  TASKPATH

options:
  -h, --help            show this help message and exit
  -m META, --meta META  Metadata for task or path to file with metadata in JSON format
```
5. (1 p.) Using `setup.py` (or `toml` file) create console script for call `stem.cli_main:stem_cli_main` function.
6. (3* p.) (Optional task, for additional point) Add function for output task tree graph in image.

# Assignment 7 (10 p.)

In this assignment you have to implement Dataforge Envelope --- format for transmission messages contain meta-data and binary data.

1. (2 p.) In module `envelope.py` implement the method `default(self, obj: Meta) -> Any:` of the class `MetaEncoder(JSONEncoder)`. Class `MetaEncoder` must allow to serialize `Meta object` to JSON format as encoder for module `json`.
2. In module `envelope.py` implement the class `Envelope` - format for transferring data via byte stream. Description of format see below. If data size less than `Envelope._MAX_SIZE` store data in the memory, otherwise on disk using memory mapping. Implement next methods for class `Envelope`:
   1. (3 p.) **staticmetod** `read(input: BufferedReader) -> "Envelope"` --- create `Envelope` instance from stream.
   2. (3 p.) `write_to(self, output: RawIOBase):` --- write `Envelope` instance to stream.
   3. (1 p.) **staticmetod** `from_bytes(buffer: bytes) -> "Envelope":` create `Envelope` instance from binary string.
   4. (1 p.) `to_bytes(self) -> bytes` --- convert `Envelope` instance to binary string.
   Note: Use module `struct` for work with binary values.


Use next description of DataForge Envelope:

* **Tag** .First 20 bytes of file or stream is reserved for envelope properties binary representation:
  * `#~` - two ASCII symbols, beginning of binary string.
  * 4 bytes - properties `type` field: envelope format type and version. For default format the string `DF02` is used, but in principle other envelope types could use the same format.
  * 2 bytes - properties `metaType` field: metadata encoding type.
  * 4 bytes - properties `metaLength` field: metadata length in bytes including new lines and other separators.
  * 4 bytes - properties `dataLength` field: the data length in bytes.
  * `~#` - two ASCII symbols, end of binary string.
  * `\r\n` - two bytes, new line.
The values are read as binary and transformed into 4-byte unsigned tag codes (Big endian).
* **Metadata block**. Metadata in any accepted format which length equal to `metaLength` properties. In our implementation we will consider only JSON format.
* **Data block**. Any other binary data which length equal to `dataLength` properties.

# Assignment 8 (8 p.)

In this assignment will be asked to practice working with IO formats.

1. (4 p.) (_Protobuf_, _Magic methods_) Let the data in the binary file be stored as a set of records. The record has the following format:
   * The first 8 bytes contain a number N;
   * The next N bytes contain a message in the _protobuf_ format (the message scheme is the same for all records).
   Implement a class `ProtoList` in module `proto_list.py` that allows you to work with a file as a list of _protobuf_ messages (without loading all messages in memory). Class `ProtoList` must open access to data in context manager, and close file on exit from context.
2. (4 p.) (_HDF_, _ZIP_) Implement script for conversion binary data from CAEN multy channel ADC to HDF5 file. Example of data located by [link](https://drive.google.com/drive/folders/1i3-2b_kpVFNYf8p9Y0_em3bG7PZCg9tq?usp=sharing), in archive `wave.data.zip`. Don't extract data from archive: use `ZipFiles` for direct reading. In archive contains several files, each file is data from one channel of ADC. Every file contains set of entries. Entries in different files is synchronized (first entry in one file corresponds first entry in another file). Each entry contain 24-bytes header and 1024 float32 values. Convert ADC data to HDF5 Tables: index of row corresponds to number of event , index of column corresponds to number of channel. Item of table is 1024-sized array corresponds values from entry without header.

# Assignment 9 (14 p.)

In this assignment you have to implement several inheritor of class `TaskRunner`.

1. (4 p.) Using module `threading` implement class `ThreadingRunner`, which execute every task in own thread. Use `MAX_WORKERS` class field as maximum number of threads that can be used to execute.
2. (4 p.) Using module `asyncio` implement class `AsyncRunner`, which execute every task in own coroutine.
3. (6 p.) Using module `multyprocessing` implement class `ProcessingRunner`, which execute every task in own process. Use `MAX_WORKERS` class field as maximum number of processes that can be used to execute.


# Assignment 10 (14 p.)

In this assignment you have to implement client and server side of remote workspace: create TCP server and handler allow send information about accessible tasks and run task in server workspace.

1. (6 p.) In module `remote.unit.py` implement the class `UnitHander(StreamRequestHandler)` which have access to some workspace, task tree and task master. Class `UnitHandler` get user request in Dataforge Envelope (see assigment 7) and return answer also in envelope format. Class `UnitHandler` must be implement next protocol:
   1. In input request contains message in envelope format. In message metadata block contains entries with key `command`. If input request don't contain envelope message or envelope message don't contain key `command` should send envelope answer with next meta entries:
      1. Entry with key `status` and value `failed`.
      2. Entry with key `error` and value contains information about error (exception message as example)
   2. If key `command` is presented in message, invoke next action and send result in envelope format:
      1. If `command="run"`, check entry with key `task_path` in metadata and if present run this task. Result of task executing return as envelope.
      2. If `command="structure"`, return envelope with workspace structure (use method `structure` of workspace).
      3. If `command="powerfullity"`, return envelope with meta entry ``powerfullity` which contains some number constant.
2. (1 p.) In module `remote.unit.py` implement the method `start_unit(workspace: IWorkspace, host: str, port: int, powerfullity: Optional[int] = None)` which run TCP server able handle every request in own thread. For request handling use class `UnitHander(StreamRequestHandler)` from previous task.
3. (1 p.) In module `remote.unit.py` implement the method `start_unit_in_subprocess(workspace: IWorkspace, host: str, port: int, powerfullity: Optional[int] = None) -> Process:` which using method `start_unit` run TCP server in children process.
4. (4 p.) In module `remote.remote_workspace.py` implement the class `RemoteWorkspace(IWorkspace)` which connect to remote TCP server implemented in task 1-2.
5. (2 p.) In module `remote.remote_workspace.py` implement the class `RemoteTask(Task)` which connect to remote TCP server implemented in task 1-2.


# Assignment 11 (8 p.)

In this assignment you have to implement a middleware server which 
provide access to computation server and distribute tasks between their.

1. Implement next methods for class `Envelope`:
   1. (1 p.) `async def async_read(reader: StreamReader) -> "Envelope":`
   2. (1 p.) `async def async_write_to(self, writer: StreamWriter):`
2. (4 p.) In module `remote.distributor.py` implement the class `Distributor` which provide access to units server (see assigment 10) and another distributor servers.  Class `Distributor` get user request in Dataforge Envelope (see assigment 7) and return answer also in envelope format. Class `Distributor` must be implemented next protocol:
   1. In input request contains message in envelope format. In message metadata block contains entries with key `command`. If input request don't contain envelope message or envelope message don't contain key `command` should send envelope answer with next meta entries:
      1. Entry with key `status` and value `failed`.
      2. Entry with key `error` and value contains information about error (exception message as example)
   2. If key `command` is presented in message, invoke next action and send result in envelope format:
      1. If `command="run"`, check entry with key `task_path` in metadata and if present select random child server (with weight by powerfullity) and run this task on selected child server. Result of task executing return as envelope.
      2. If `command="structure"`, return envelope with workspace structure of child server.
      3. If `command="powerfullity"`, return envelope with meta entry `powerfullity` which contains sum of child server `powerfullity`.
3. (1 p.) In module `remote.distributor.py` implement the method `start_distributor(host: str, port: int, servers: list[tuple[str, int]])` which using module `asyncio` run asynchronous TCP server. For request handling use class `Distributor` from previous task.
4. (1 p.) In module `remote.distributor.py` implement the method `start_distributor_in_subprocess(host: str, port: int, servers: list[tuple[str, int]]) -> Process` which using method `start_distributor` run TCP server in children process.

# Assignment 12 (12 p.)

In this assignment you start develop of STEM: Serious TEmperature Monitor --- application with GUI, which allow measure temperature using USB thermometer, save results in database and present graph of the temperature.

1. (1 p.) Add supportion on `with`-context in the class `device.Thermometer`. On enter in context must be call `open` method, on exit `close` method.
2. (2 p.) In the module `app.py` implement the class `RunButton(QPushButton)` which represent a push button with two state `Run` and `Stop`. Click on the button change state. In state `Run` button must be have label `Run` and set background color to green. In state `Stop` button must be have label `Stop` and set background color to red. Information of change state write as debug message to `logging.root` logger.
3. (2 p.) In the module `controller.py` implement the class `ThermometerController(QObject)` which using method `start`\\`stop` turn on\off data collection from `device: Thermometer`. After call of `start` method this class begin periodically (with period `config.period`, using itself timer of `QObject`) requests of data at the device and emit getting value to signal `measurment`. `stop` method stop its timer. Also `start` method pass debug message with temperature value to `logging.root` logger.
4. (2 p.) In the module `app.py` implement the class `Central(QWidget)` which must be used as central widget of main window. Add on this widget button from first task. Connect `controller : ThermometerController` to button click: click in state `Run` run `controller.start`, click in state `Stop` run `controller.stop`. 
5. (2 p.) In the module `app.py` implement the class `Main(QMainWindow)` which represent main window of application. In this class setup window title `"Serious TEmperature Monitor"`, add widget from previous task as central widget. Also using `QSettings` save last window size on exit and restore his by next run. 
6. (2 p.) Add to main window from previous task a dock widget (QDockWidget), which contain text output (QTextEditor). Connect this text output with `logging.root` logger (using `LoggerHandler`). Add to main window toolbar action which hide/show this dock.
7. (1 p.) In the module `app.py` implement the `run` method and create in `setup.py/.toml` entry point for run this method as console script.

# Assignment 13 (8 p.)

In this assignment you continue to develop of STEM: Serious TEmperature Monitor --- application with GUI, which allow measure temperature using USB thermometer, save results in database and present graph of the temperature.

1. (6+2 p.) In the module `app.py` implement the class `Oscilloscope(QWidget)` with view two graph: line plot with dependency temperature from time and histogram of measured temperature values. Connect oscilloscope to `ThermometerController` and update graph on every new measurement (ranges of y-axis must be setup dynamically) (6 p.). Line plot must be view data from last `Oscilloscope.N` points (ranges of x-axis of line plot must be setup dynamically). For every graph add axis labels, plot grid and secondary Y axis on right side of graphs (2 p.). Add oscilloscope widget to central windget of application.

# Assignment 14 (12 p.)

In this assignment you continue to develop of STEM: Serious TEmperature Monitor --- application with GUI, which allow measure temperature using USB thermometer, save results in database and present graph of the temperature.

1. (2 p.) In the module `config.py` implement the function `from_dict(data: dict, factory: Type[T]) -> T` which create dataclass instance of type `factory` (guaranteed what `factory` is dataclass type) from dict **in take to account** what type `factory` can be has another dataclass as field and its also can be created from nested dictionary entry.
2. (2 p.) In the module `config.py` implement the function `resolve_config(factory: Type[T], user_path: Union[str,Path], default_path : Union[str,Path]) -> T` which create dataclass instance of type `factory` (guaranteed what `factory` is dataclass type) from user/default config in YAML format (see `config.yaml`) by  next algorithm:
   1. If `user_path` path exist than created from it.
   2. If `user_path` path don't exist than check `dafult_path` path.
   3. If `default_path` path exist than created from it.
   4. If `default_path` path don't exist than created dataclass with default field (its garuanted) and **save this config to `default_path` in YAML format**.
3. (1 p.) In the module `app.py` fixe the call of `resolve_config` in the function `run`. Add as `default_path` path to default user system directory for application config (used module `appdirs`, application name is `STEM`, application author is you username).
4. (1 p.) In the module `database.py` implement the class `Point` which describe table with two columns: temperature value and time of measurement (database usually have special types for datetime data).
5. (4 p.) In the module `database.py` implement the class `Database` with next methods:
   1. `add_point(self, point: Point)` --- insert point to database.
   2. `get_points(self, from_date: datetime) -> list[Point]` --- get list of point from given date.
   3. **staticmethod** `create_or_connect_sqlite(config: SqliteConfig) -> "Database"` create of `Database` instance with connect (or create and connect) to sqlite database with parameters from `config`.
   4. `__init__(self, engine: Engine):` --- create the table `Point` in database `engine`
6. (2 p.) Connect `Database` instance from `run` function to your application: autosave measured temperature and time of measurement in database, as well as on application start load on plot all points from last 15 minutes.

# Assignment 15 (10 p.)

In this assignment you finish to develop of STEM: Serious TEmperature Monitor --- application with GUI, which allow measure temperature using USB thermometer, save results in database and present graph of the temperature.

1. (10 p.) In the module `usb.py` resolve all `TODO` (using protocol from [RODOS_5_protocol.md](./RODOS_5_protocol.md)) and nextly in the module `device.py` implement the class `USBThermometer` using `RODOS56` class

# USB-термометр RODOS-5

Для подачи команды на термометр:
1. Ему передается буфер из девяти байт.
2. Ожидаем некоторое время (таймаут).
3. Считываем ответный буффер из девяти байт.
4. Проверяем корректность ответа.

Правила заполнения буфера (для основных команд):

* Нулевой байт всегда равен нулю
* Неиспользуемые байты в конце буффера равны нулю
* Первый и второй байт задают команду
* Начиная с третьего байта идут пользовательские данные/выходные данные термометра

Проверка корректности считывания:

* Первые три байта выходного буфера должны быть равны первым трём байтам входного

Описание команд:

| Команда                | первый/второй байт | таймаут | Куда записываются пользовательские данные                                             | Как парсить ответ                                                      |
|------------------------|--------------------|---------|---------------------------------------------------------------------------------------|------------------------------------------------------------------------|
| RESET                  | `0x180x48`         | 10 ms   |                                                                                       |                                                                        |
| Записать один **бит**  | `0x180x81`         | 5 ms    | в третий байт буфера, надо передать байт у которого все биты кроме первого равны нулю | третий байт равен переданному                                          |
| Записать один байт     | `0x180x88`         | 5 ms    | надо передать байт в третий байт буфера                                               | третий байт равен переданному                                          |
| Записать четыре байта  | `0x180x84`         | 5 ms    | Передаваемые байты надо записать с 3 по 7 позицию буффера                             | 3-7 байты выходного буфера равны переданным                            |
| Прочитать 2 **бита**   | `0x180x82`         | 5 ms    | В 3-4 позицию буфера надо записать `0x01`                                             | 3-4 байты выходного буфера в первом бите содержат необходимые занчения |
| Прочитать один байт    | `0x180x88`         | 5 ms    | В 3 байт надо записать `0xFF`                                                         | В 3 позиции выходного буфера будет считанный байт                      |
| Прочитать четыре байта | `0x180x84`         | 30 ms   | В 3-7 байты надо записать `0xFF`                                                      | В 3-7 позиции выходного буфера будет считанные байты                   |
| Получить ID устройства | `0x1d0x00`         | 5ms     | Последние четыре байта, безнаковое целое в big-endian                                 |                                                                        |
