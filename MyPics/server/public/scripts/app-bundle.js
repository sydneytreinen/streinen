define('app',['exports', 'aurelia-auth'], function (exports, _aureliaAuth) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.addPipelineStep('authorize', _aureliaAuth.AuthorizeStep);
      config.map([{
        route: ['', 'home'],
        moduleId: './modules/home',
        name: 'Home'
      }, {
        route: 'list',
        moduleId: './modules/list',
        name: 'List',
        auth: true
      }]);
    };

    return App;
  }();
});
define('auth-config',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var authConfig = {
        baseUrl: "http://localhost:5000/api",
        loginUrl: '/users/login',
        tokenName: 'token',
        authHeader: 'Authorization',
        authToken: '',
        logoutRedirect: '#/home'
    };

    exports.default = authConfig;
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment', './auth-config', 'regenerator-runtime'], function (exports, _environment, _authConfig, _regeneratorRuntime) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  var _authConfig2 = _interopRequireDefault(_authConfig);

  var _regeneratorRuntime2 = _interopRequireDefault(_regeneratorRuntime);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  window.regeneratorRuntime = _regeneratorRuntime2.default;

  function configure(aurelia) {
    aurelia.use.standardConfiguration().plugin('aurelia-auth', function (baseConfig) {
      baseConfig.configure(_authConfig2.default);
    }).feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('modules/home',['exports', 'aurelia-framework', 'aurelia-router', '../resources/data/users', 'aurelia-auth'], function (exports, _aureliaFramework, _aureliaRouter, _users, _aureliaAuth) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Home = undefined;

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Home = exports.Home = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _users.Users, _aureliaAuth.AuthService), _dec(_class = function () {
        function Home(router, users, auth) {
            _classCallCheck(this, Home);

            this.router = router;
            this.auth = auth;
            this.users = users;
            this.loginError = '';
            this.showLogin = true;
        }

        Home.prototype.login = function login() {
            var _this = this;

            return this.auth.login(this.email, this.password).then(function (response) {
                sessionStorage.setItem("user", JSON.stringify(response.user));
                _this.loginError = "";
                _this.router.navigate('list');
            }).catch(function (error) {
                console.log(error);
                _this.loginError = "Invalid credentials.";
            });
        };

        Home.prototype.showRegister = function showRegister() {
            this.user = {
                firstname: "",
                lastname: "",
                email: "",
                password: ""

            };

            this.registerError = "";
            this.showLogin = false;
        };

        Home.prototype.save = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                var serverResponse;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.users.save(this.user);

                            case 2:
                                serverResponse = _context.sent;

                                if (!serverResponse.error) {
                                    this.showLogin = true;
                                } else {
                                    this.registerError = "There was a problem registering the user.";
                                }

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function save() {
                return _ref.apply(this, arguments);
            }

            return save;
        }();

        return Home;
    }()) || _class);
});
define('modules/list',['exports', 'aurelia-framework', 'aurelia-router', 'aurelia-auth', '../resources/data/todos'], function (exports, _aureliaFramework, _aureliaRouter, _aureliaAuth, _todos) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.List = undefined;

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var List = exports.List = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _aureliaAuth.AuthService, _todos.ToDos), _dec(_class = function () {
    function List(router, auth, todos) {
      _classCallCheck(this, List);

      this.router = router;
      this.auth = auth;
      this.todos = todos;

      this.message = 'List';
      this.user = JSON.parse(sessionStorage.getItem('user'));
      this.showList = true;
      this.priorities = ['Low', 'Medium', 'High', 'Critical'];
      this.showCompleted = false;
    }

    List.prototype.editTodo = function editTodo(todo) {
      this.todoObj = todo;
      this.showList = false;
    };

    List.prototype.saveTodo = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var response, todoId;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.todoObj) {
                  _context.next = 14;
                  break;
                }

                _context.next = 3;
                return this.todos.save(this.todoObj);

              case 3:
                response = _context.sent;

                if (!response.error) {
                  _context.next = 8;
                  break;
                }

                alert("There was an error creating the ToDo");
                _context.next = 13;
                break;

              case 8:
                todoId = response._id;

                if (!(this.filesToUpload && this.filesToUpload.length)) {
                  _context.next = 13;
                  break;
                }

                _context.next = 12;
                return this.todos.uploadFile(this.filesToUpload, this.user._id, todoId);

              case 12:
                this.filesToUpload = [];

              case 13:
                this.showList = true;

              case 14:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function saveTodo() {
        return _ref.apply(this, arguments);
      }

      return saveTodo;
    }();

    List.prototype.activate = function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.todos.getUserTodo(this.user._id);

              case 2:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function activate() {
        return _ref2.apply(this, arguments);
      }

      return activate;
    }();

    List.prototype.createTodo = function createTodo() {
      this.todoObj = {
        todo: "",
        description: "",
        dateDue: new Date(),
        userId: this.user._id,
        priority: this.priorities[0]
      };
      this.showList = false;
    };

    List.prototype.toggleShowCompleted = function toggleShowCompleted() {
      this.showCompleted = !this.showCompleted;
    };

    List.prototype.uploadFile = function uploadFile(files, userId, todoId) {
      var formData = new FormData();
      files.forEach(function (item, index) {
        formData.append("file" + index, item);
      });

      var response = this.data.uploadFiles(formData, this.TODO_SERVICE + "/upload/" + userId + "/" + todoId);
      return response;
    };

    List.prototype.deleteTodo = function deleteTodo(todo) {
      this.todos.deleteTodo(todo._id);
    };

    List.prototype.completeTodo = function completeTodo(todo) {
      todo.completed = !todo.completed;
      this.todoObj = todo;
      this.saveTodo();
    };

    List.prototype.changeFiles = function changeFiles() {
      this.filesToUpload = new Array();
      this.filesToUpload.push(this.files[0]);
    };

    List.prototype.removeFile = function removeFile(index) {
      this.filesToUpload.splice(index, 1);
    };

    List.prototype.logout = function logout() {
      sessionStorage.removeItem('user');
      this.auth.logout();
    };

    return List;
  }()) || _class);
});
define('resources/index',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {
    config.globalResources(['./value-converters/date-format', './value-converters/completed', './elements/flatpickr']);
  }
});
define('resources/data/data-services',['exports', 'aurelia-framework', 'aurelia-fetch-client'], function (exports, _aureliaFramework, _aureliaFetchClient) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.DataServices = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var DataServices = exports.DataServices = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
        function DataServices(http) {
            var _this = this;

            _classCallCheck(this, DataServices);

            this.httpClient = http;
            this.BASE_URL = "http://localhost:5000/api/";
            this.httpClient.configure(function (config) {
                config.withBaseUrl(_this.BASE_URL).withDefaults({
                    credentials: 'same-origin',
                    headers: {
                        'Accept': 'application/json',
                        'X-Requested-With': 'Fetch'
                    }
                }).withInterceptor({
                    request: function request(_request) {
                        console.log('Requesting ' + _request.method + ' ' + _request.url);
                        return _request;
                    },
                    response: function response(_response) {
                        console.log('Received ' + _response.status + ' ' + _response.url);
                        return _response;
                    }
                });
            });
        }

        DataServices.prototype.get = function get(url) {
            return this.httpClient.fetch(url).then(function (response) {
                return response.json();
            }).then(function (data) {
                return data;
            }).catch(function (error) {
                return error;
            });
        };

        DataServices.prototype.post = function post(content, url) {
            return this.httpClient.fetch(url, {
                method: 'post',
                body: (0, _aureliaFetchClient.json)(content)
            }).then(function (response) {
                return response.json();
            }).then(function (object) {
                return object;
            }).catch(function (error) {
                return error;
            });
        };

        DataServices.prototype.put = function put(content, url) {
            return this.httpClient.fetch(url, {
                method: 'put',
                body: (0, _aureliaFetchClient.json)(content)
            }).then(function (response) {
                return response.json();
            }).then(function (object) {
                return object;
            }).catch(function (error) {
                return error;
            });
        };

        DataServices.prototype.delete = function _delete(url) {
            return this.httpClient.fetch(url, {
                method: 'delete'
            }).then(function (response) {
                return response.json();
            }).then(function (object) {
                return object;
            }).catch(function (error) {
                return error;
            });
        };

        DataServices.prototype.uploadFiles = function uploadFiles(files, url) {
            return this.httpClient.fetch(url, {
                method: 'post',
                body: files
            }).then(function (response) {
                return response.json();
            }).then(function (object) {
                return object;
            }).catch(function (error) {
                return error;
            });
        };

        return DataServices;
    }()) || _class);
    ;
});
define('resources/data/todos',['exports', 'aurelia-framework', './data-services'], function (exports, _aureliaFramework, _dataServices) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ToDos = undefined;

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var ToDos = exports.ToDos = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class = function () {
        function ToDos(data) {
            _classCallCheck(this, ToDos);

            this.data = data;
            this.TODO_SERVICE = 'todos';
            this.todosArray = [];
        }

        ToDos.prototype.getUserTodo = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(id) {
                var response;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.data.get(this.TODO_SERVICE + "/user/" + id);

                            case 2:
                                response = _context.sent;

                                if (!response.error && !response.message) {
                                    this.todosArray = response;
                                }

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getUserTodo(_x) {
                return _ref.apply(this, arguments);
            }

            return getUserTodo;
        }();

        ToDos.prototype.save = function () {
            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(todo) {
                var serverResponse, response;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                if (!todo) {
                                    _context2.next = 14;
                                    break;
                                }

                                if (todo._id) {
                                    _context2.next = 9;
                                    break;
                                }

                                _context2.next = 4;
                                return this.data.post(todo, this.TODO_SERVICE);

                            case 4:
                                serverResponse = _context2.sent;

                                if (!serverResponse.error) {
                                    this.todosArray.push(serverResponse);
                                }
                                return _context2.abrupt('return', serverResponse);

                            case 9:
                                _context2.next = 11;
                                return this.data.put(todo, this.TODO_SERVICE + "/" + todo._id);

                            case 11:
                                response = _context2.sent;

                                if (!response.error) {}
                                return _context2.abrupt('return', response);

                            case 14:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function save(_x2) {
                return _ref2.apply(this, arguments);
            }

            return save;
        }();

        ToDos.prototype.deleteTodo = function () {
            var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(id) {
                var response, i;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return this.data.delete(this.TODO_SERVICE + "/" + id);

                            case 2:
                                response = _context3.sent;

                                if (!response.error) {
                                    for (i = 0; i < this.todosArray.length; i++) {
                                        if (this.todosArray[i]._id === id) {
                                            this.todosArray.splice(i, 1);
                                        }
                                    }
                                }

                            case 4:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function deleteTodo(_x3) {
                return _ref3.apply(this, arguments);
            }

            return deleteTodo;
        }();

        return ToDos;
    }()) || _class);
});
define('resources/data/users',['exports', 'aurelia-framework', './data-services'], function (exports, _aureliaFramework, _dataServices) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Users = undefined;

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Users = exports.Users = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class = function () {
        function Users(data) {
            _classCallCheck(this, Users);

            this.data = data;
            this.USER_SERVICE = 'users';
        }

        Users.prototype.save = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(user) {
                var serverResponse;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!user) {
                                    _context.next = 12;
                                    break;
                                }

                                _context.prev = 1;
                                _context.next = 4;
                                return this.data.post(user, this.USER_SERVICE);

                            case 4:
                                serverResponse = _context.sent;
                                return _context.abrupt('return', serverResponse);

                            case 8:
                                _context.prev = 8;
                                _context.t0 = _context['catch'](1);

                                console.log(_context.t0);
                                return _context.abrupt('return', _context.t0);

                            case 12:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[1, 8]]);
            }));

            function save(_x) {
                return _ref.apply(this, arguments);
            }

            return save;
        }();

        return Users;
    }()) || _class);
});
define('resources/elements/flatpickr',['exports', 'aurelia-framework', 'flatpickr'], function (exports, _aureliaFramework, _flatpickr) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.FlatPickerCustomElement = undefined;

    var _flatpickr2 = _interopRequireDefault(_flatpickr);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor;

    var FlatPickerCustomElement = exports.FlatPickerCustomElement = (_dec = (0, _aureliaFramework.inject)(Element), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function FlatPickerCustomElement(element) {
            _classCallCheck(this, FlatPickerCustomElement);

            _initDefineProp(this, 'value', _descriptor, this);

            this.element = element;
        }

        FlatPickerCustomElement.prototype.bind = function bind() {
            var defaultConfig = {
                altInput: true,
                altFormat: "F j, Y",
                wrap: true
            };
            this._config = Object.assign({}, defaultConfig);
            this._config.onChange = this._config.onMonthChange = this._config.onYearChange = this.onChange.bind(this);
        };

        FlatPickerCustomElement.prototype.attached = function attached() {
            this.flatpickr = new _flatpickr2.default(this.element.querySelector('.aurelia-flatpickr'), this._config);
        };

        FlatPickerCustomElement.prototype.onChange = function onChange(selectedDates, dateStr, instance) {
            this.value = selectedDates[0];
        };

        FlatPickerCustomElement.prototype.valueChanged = function valueChanged() {
            if (!this.flatpickr) {
                return;
            }
            if (this.value === this.flatpickr.selectedDates[0]) {
                return;
            }
            var newDate = this.value ? this.value : undefined;
            this.flatpickr.setDate(newDate);
        };

        return FlatPickerCustomElement;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'value', [_dec2], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('resources/value-converters/completed',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var CompletedValueConverter = exports.CompletedValueConverter = function () {
        function CompletedValueConverter() {
            _classCallCheck(this, CompletedValueConverter);
        }

        CompletedValueConverter.prototype.toView = function toView(array, value) {
            if (!value) {
                return array.filter(function (item) {
                    return !item.completed;
                });
            } else {
                return array;
            }
        };

        return CompletedValueConverter;
    }();
});
define('resources/value-converters/date-format',['exports', 'moment'], function (exports, _moment) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.DateFormatValueConverter = undefined;

	var _moment2 = _interopRequireDefault(_moment);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var DateFormatValueConverter = exports.DateFormatValueConverter = function () {
		function DateFormatValueConverter() {
			_classCallCheck(this, DateFormatValueConverter);
		}

		DateFormatValueConverter.prototype.toView = function toView(value) {
			if (value === undefined || value === null) {
				return;
			}

			return (0, _moment2.default)(value).format('MMM Do YYYY');
		};

		return DateFormatValueConverter;
	}();
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"resources/css/styles.css\"></require><router-view></router-view></template>"; });
define('text!resources/css/styles.css', ['module'], function(module) { module.exports = ".rightMargin {\r\n      margin-right: 10px;\r\n    }\r\n.topMargin {\r\n    margin-top: 10px;\r\n}    "; });
define('text!modules/home.html', ['module'], function(module) { module.exports = "<template>    <compose show.bind=\"showLogin\" view=\"./components/login.html\"></compose>    <compose show.bind=\"!showLogin\" view=\"./components/register.html\"></compose></template>"; });
define('text!modules/list.html', ['module'], function(module) { module.exports = "<template>    <h1>${message}</h1>    <compose show.bind=\"showList\" view=\"./components/todolist.html\"></compose>    <compose show.bind=\"!showList\" view=\"./components/todoform.html\"></compose></template>"; });
define('text!modules/components/login.html', ['module'], function(module) { module.exports = "<template><div class=\"row\"><div class=\"col-4\"><div class=\"card\"><div class=\"card-body\"><div id=\"errorMsg\" innerhtml.bind=\"loginError\"></div><form><div class=\"form-group\"><label for=\"exampleInputEmail1\">Email address</label><input value.bind=\"email\" type=\"email\" class=\"form-control\" id=\"exampleInputEmail1\" aria-describedby=\"emailHelp\" placeholder=\"Enter email\"> <small id=\"emailHelp\" class=\"form-text text-muted\">We'll never share your email with anyone else.</small></div><div class=\"form-group\"><label for=\"exampleInputPassword1\">Password</label><input value.bind=\"password\" type=\"password\" class=\"form-control\" id=\"exampleInputPassword1\" placeholder=\"Password\"></div><button click.trigger=\"login()\">Login</button> <span class=\"registerLink\" click.trigger=\"showRegister()\">Register</span></form></div></div></div></div></template>"; });
define('text!modules/components/register.html', ['module'], function(module) { module.exports = "<template>    first name: <input value.bind=\"user.firstname\">     last name: <input value.bind=\"user.lastname\">     email: <input value.bind=\"user.email\">     password: <input value.bind=\"user.password\">     <button click.trigger=\"save()\">Save</button></template>"; });
define('text!modules/components/todoform.html', ['module'], function(module) { module.exports = "<template><div class=\"card topMargin\"><div class=\"card-body\"><span><i click.trigger=\"back()\" class=\"fa fa-arrow-left fa-lg\" aria-hidden=\"true\"></i></span></div></div><form><div class=\"form-group topMargin\"><label for=\"todoInput\">Todo *</label><input value.bind=\"todoObj.todo\" type=\"text\" class=\"form-control\" id=\"todoInput\" aria-describedby=\"todoHelp\" placeholder=\"Enter ToDo\"> <small id=\"todoHelp\" class=\"form-text text-muted\">A short name for the ToDo.</small></div><div class=\"form-group\"><label for=\"descriptionInput\">Description</label><textarea value.bind=\"todoObj.description\" type=\"text\" class=\"form-control\" id=\"descriptionInput\" aria-describedby=\"descriptionHelp\" placeholder=\"Enter Description\"></textarea><small id=\"descriptionHelp\" class=\"form-text text-muted\">A longer description if required.</small></div><div class=\"form-group\"><label for=\"priorityInput\">Priority</label><select value.bind=\"todoObj.priority\" class=\"form-control\" id=\"exampleFormControlSelect2\">                <option repeat.for=\"priority of priorities\" value.bind=\"priority\"> ${priority}</option>            </select><small id=\"priorityHelp\" class=\"form-text text-muted\">How urgent is this?</small></div><div class=\"form-group\"><label for=\"dueDateInput\">Due Date *</label><flat-picker value.bind=\"todoObj.dateDue\"></flat-picker><small id=\"dueDateHelp\" class=\"form-text text-muted\">The date to ToDo is due.</small></div><div class=\"row\"><div class=\"col\"><label class=\"btn btn-secondary\">Browse for files&hellip; <input type=\"file\" style=\"display:none\" change.delegate=\"changeFiles()\" files.bind=\"files\"></label><small id=\"fileHelp\" class=\"form-text text-muted\">Upload any files that will be useful.</small></div><div class=\"col-8\"><ul><li repeat.for=\"file of filesToUpload\" class=\"list-group-item\"> ${file.name}<span click.delegate=\"removeFile($index)\" class=\"pull-right\"><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></span></li></ul></div></div><button click.trigger=\"saveTodo()\" class=\"btn btn-primary topMargin\">Save</button></form></template>"; });
define('text!modules/components/todolist.html', ['module'], function(module) { module.exports = "<template> <div class=\"card topMargin\"> <div class=\"card-body\"> <div class=\"row\"><span class=\"col\">  <span class=\"rightMargin pull-right\"><i click.trigger=\"logout()\" class=\"fa fa-sign-out fa-lg\" aria-hidden=\"true\"></i></span> <span class=\"rightMargin pull-right\"><i click.trigger=\"createTodo()\" class=\"fa fa-plus fa-lg\" aria-hidden=\"true\"></i></span>   </span> </div> </div> </div><div show.bind=\"todos.todosArray.length\"><table class=\"table\"><thead><tr><th>ToDo</th><th>Due Date</th><th>Priority</th><th>File</th><th>Edit</th></tr></thead><tbody><tr class=\"${todo.priority === 'Critical' ? 'table-secondary' : ' '}\" repeat.for=\"todo of todos.todosArray | completed:showCompleted\"><td>${todo.todo}</td><td>${todo.dateDue | dateFormat}</td><td>${todo.priority}</td> <td><a href=\"uploads/$user. id}/${todo.file.filename}\" target=\"_blank\">${todo.file.originalName}</a></td><td> <i click.trigger=\"editTodo(todo)\" class=\"fa fa-pencil rightMargin\" aria-hidden=\"true\"></i>    <i click.trigger=\"deleteTodo(todo)\" class=\"fa fa-trash rightMargin\" aria-hidden=\"true\"></i>   <i show.bind=\"!todo.completed\" click.trigger=\"completeTodo(todo)\" class=\"fa fa-square-o\" aria-hidden=\"true\"></i>     <i show.bind=\"todo.completed \" click.trigger=\"completeTodo(todo)\" class=\"fa fa-check\" aria-hidden=\"true \"></i></td></tr></tbody></table></div><div show.bind=\"!todos.todosArray.length\"><h2>Apparently, you don't have anything to do!</h2></div><div></div></template>"; });
define('text!resources/elements/flatpickr.html', ['module'], function(module) { module.exports = "<template>    <require from=\"flatpickr/flatpickr.css\"></require>    <div class=\"input-group aurelia-flatpickr\">        <input type=\"text\" class=\"aurelia-flatpickr form-control flatPicker\" data-input>     </div></template>"; });
//# sourceMappingURL=app-bundle.js.map