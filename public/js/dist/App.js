function generateUUID() {
    // Public Domain/MIT
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : r & 0x3 | 0x8).toString(16);
    });
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

























var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

var Figure = function () {

    var DRAGROLE = "drag";
    var FIELDROLE = "none";

    return function () {
        function Figure(name) {
            var role = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DRAGROLE;
            var x = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
            var y = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
            var row = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";
            var col = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "";
            classCallCheck(this, Figure);

            this.name = name;
            this.role = role;
            this.x = x;
            this.y = y;
            this.xmlns = "http://www.w3.org/2000/svg";
            this.UUID = generateUUID();
            this.col = col;
            this.row = row;
        }

        createClass(Figure, [{
            key: "addToChessField",
            value: function addToChessField(g) {
                var element = document.createElementNS(this.xmlns, "use");
                element.setAttributeNS(null, "x", this.x);
                element.setAttributeNS(null, "y", this.y);
                element.setAttributeNS(null, "class", this.role);
                element.setAttributeNS(null, "data-id", this.name);
                element.setAttributeNS(null, "data-uuid", this.UUID);

                element.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', "#" + this.name);
                g.appendChild(element);
            }
        }, {
            key: "getSvgElement",
            value: function getSvgElement() {
                return document.querySelector("use[data-uuid='" + this.UUID + "']");
            }
        }, {
            key: "setCoordsWithSvg",
            value: function setCoordsWithSvg(x, y) {
                this.x = x;
                this.y = y;
                this.getSvgElement().setAttributeNS(null, "x", x);
                this.getSvgElement().setAttributeNS(null, "y", y);
            }
        }, {
            key: "width",
            get: function get() {
                return this.getSvgElement().getBBox().width;
            }
        }, {
            key: "height",
            get: function get() {
                return this.getSvgElement().getBBox().height;
            }
        }], [{
            key: "dragRole",
            get: function get() {
                return DRAGROLE;
            }
        }, {
            key: "fieldRole",
            get: function get() {
                return FIELDROLE;
            }
        }]);
        return Figure;
    }();
}();

var Field = function () {
    function Field(row, col, fieldGroup, size) {
        classCallCheck(this, Field);

        this.row = row;
        this.col = col;
        this.size = size;
        this.x = this.col * this.size;
        this.y = this.row * this.size;
        this.xmlns = "http://www.w3.org/2000/svg";
        this.fieldGroup = fieldGroup;
        this.figure = "";
        this.UUID = generateUUID();
        this.color = this.row % 2 == this.col % 2 ? "#eee" : "#666";
    }

    createClass(Field, [{
        key: "addToChessField",
        value: function addToChessField() {
            var rect = document.createElementNS(this.xmlns, "rect");
            rect.setAttributeNS(null, "width", this.size);
            rect.setAttributeNS(null, "height", this.size);
            rect.setAttributeNS(null, "fill", this.color);
            rect.setAttributeNS(null, "x", this.x);
            rect.setAttributeNS(null, "y", this.y);
            rect.setAttribute("data-row", this.row);
            rect.setAttribute("data-col", this.col);
            rect.setAttribute("data-figure", this.figure);
            rect.setAttribute("data-uuid", this.UUID);
            rect.setAttributeNS(null, "class", "field");
            this.fieldGroup.appendChild(rect);
        }
    }, {
        key: "getSvgField",
        value: function getSvgField() {
            return document.querySelector("rect[data-uuid='" + this.UUID + "']");
        }
    }]);
    return Field;
}();

var ChessField = function () {
    var ChessField = function () {
        function ChessField(svgName) {
            var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 30;
            var numb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
            classCallCheck(this, ChessField);

            this.size = size;
            this.svg = document.getElementById(svgName);
            this.draw = this.draw.bind(this);
            this.xmlns = "http://www.w3.org/2000/svg";
            this.rows = 8;
            this.cols = 8;
            this.field = document.getElementById("chess-field" + numb);
            this.numb = numb;
            this.getFECode = this.getFECode.bind(this);

            this.fields = [];
            this.fieldGroup = document.createElementNS(this.xmlns, "g");
            this.fieldGroup.setAttributeNS(null, "id", "field-group" + numb);
            this.field.appendChild(this.fieldGroup);
            this.createFields();
            this.figures = [];
            this.loadFigures();
            this.figureGroup = document.createElementNS(this.xmlns, "g");
            this.figureGroup.setAttribute("id", "figure-group" + numb);
            this.field.appendChild(this.figureGroup);
            this.figuresOnField = [];
            this.callback = function (f) {
                return f;
            };
            // this.isDraw = false;
        }
        //------------------create fields----------------//


        createClass(ChessField, [{
            key: "createFields",
            value: function createFields() {

                for (var i = 0; i < this.rows; i++) {
                    for (var j = 0; j < this.cols; j++) {
                        this.fields.push(new Field(i, j, this.fieldGroup, this.size));
                    }
                }
            }
        }, {
            key: "_loadFromCode",
            value: function _loadFromCode(code) {
                //console.log(regExp.test(code));
                //if(regExp.test(code)) {
                var i = 0;
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = code[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var symbol = _step.value;

                        if (Number.isInteger(+symbol)) {
                            console.log("Is Integer");
                            i += +symbol;
                        } else if (symbol !== '/') {
                            console.log(i);
                            this.addFigureOnField(this.fields[i], new Figure(symbol, Figure.fieldRole));
                            i++;
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                console.log(this.figuresOnField);
                //}
            }
        }, {
            key: "drawFromCode",
            value: function drawFromCode(code) {
                this.fields.map(function (n) {
                    return n.addToChessField();
                });
                this._loadFromCode(code);
                // this.figuresOnField.map(n => n.addToChessField(this.figureGroup));
            }
        }, {
            key: "addFigureOnField",
            value: function addFigureOnField(field, figure) {
                var f = new Figure(figure.name, Figure.fieldRole, field.x, field.y, field.row, field.col);
                f.addToChessField(this.fieldGroup);
                this.figuresOnField.push(f);
                var obj = { chessField: this, field: field };

                var func = function func(e) {
                    this.chessField.removeFigureFromField(this.field);
                };
                func = func.bind(obj);
                f.getSvgElement().onclick = func;
                this.callback();
            }
        }, {
            key: "removeFigureFromField",
            value: function removeFigureFromField(field) {
                var i = this.figuresOnField.findIndex(function (p) {
                    return p.row === field.row && p.col === field.col;
                });
                // console.log(i);
                // console.log(this.figuresOnfield[i]);
                console.log(this.figuresOnField[i].getSvgElement().dataset.uuid);
                console.log(this.figuresOnField[i]);
                this.figuresOnField[i].getSvgElement().remove();
                this.figuresOnField[i].getSvgElement();
                this.figuresOnField.splice(i, 1);
                this.callback();
            }
        }, {
            key: "isFigureOnField",
            value: function isFigureOnField(field) {
                var i = this.figuresOnField.findIndex(function (p) {
                    return p.row === field.row && p.col === field.col;
                });
                console.log(i);
                return i > -1 ? true : false;
            }
        }, {
            key: "getFigureFromField",
            value: function getFigureFromField(field) {
                return this.figuresOnField.find(function (p) {
                    return p.row === field.row && p.col === field.col;
                });
            }
        }, {
            key: "isFigureOverField",
            value: function isFigureOverField(field, figure) {
                var fieldBox = field.getSvgField().getBBox();
                var figureBox = figure.getSvgElement().getBBox();
                var isOver = false;
                var center = { x: figureBox.x + figureBox.width / 2, y: figureBox.y + figureBox.height / 2 };
                if (center.x > fieldBox.x && center.x < fieldBox.x + fieldBox.width && center.y > fieldBox.y && center.y < fieldBox.y + fieldBox.height) {
                    isOver = true;
                }
                console.log("Over: " + isOver);
                return isOver;
            }
        }, {
            key: "loadFigures",
            value: function loadFigures() {
                var getFigures = Array.from(this.field.getElementsByTagName("defs")[0].getElementsByClassName("f"));
                for (var i = 0; i < getFigures.length; i++) {
                    var id = getFigures[i].getAttributeNS(null, "id");
                    var offset = i < 6 ? 1 * this.size : 2 * this.size;
                    this.figures.push(new Figure(id, Figure.dragRole, this.size * this.rows + offset, this.size * (i % 6)));
                }
                console.log(this.figures);
            }
        }, {
            key: "getSvgFiguresByRole",
            value: function getSvgFiguresByRole(role) {
                return this.figures.filter(function (p) {
                    return p.role === role;
                }).map(function (p) {
                    return p.getSvgElement();
                });
            }
        }, {
            key: "getSvgBoard",
            value: function getSvgBoard() {
                return this.field;
            }
        }, {
            key: "getSvgFields",
            value: function getSvgFields() {
                return this.fields.map(function (p) {
                    return p.getSvgField();
                });
            }
        }, {
            key: "getFigureByUUID",
            value: function getFigureByUUID(uuid) {
                // console.log(uuid + " UUID IN getFigureByUUID method");
                var i = this.figures.findIndex(function (p) {
                    return p.UUID === uuid;
                });
                console.log("element in this method: ");
                console.log(this.figures[i]);
                return this.figures[i];
            }
            //------------------//--------------------------//

        }, {
            key: "draw",
            value: function draw() {
                var _this = this;

                this.fields.map(function (n) {
                    return n.addToChessField();
                });
                this.figures.map(function (n) {
                    return n.addToChessField(_this.figureGroup);
                });
                // this.isDraw = true;                
            }
        }, {
            key: "getFECode",
            value: function getFECode() {
                var code = "";
                var count = 0;
                // console.log(this.fields);
                for (var i = 0; i < this.fields.length; i++) {
                    if (i % 8 === 0 && i !== 0) {
                        code += count || '';
                        code += '/';
                        count = 0;
                        console.log(i);
                    }
                    if (this.isFigureOnField(this.fields[i])) {
                        code += count > 0 ? count : '';
                        code += this.getFigureFromField(this.fields[i]).name;
                        count = -1;
                    }
                    count++;
                }
                code += count || '';
                return code;
            }
        }]);
        return ChessField;
    }();

    return ChessField;
}();

var DragDrop = function () {
    function DragDrop(chessField) {
        var _this = this;

        classCallCheck(this, DragDrop);


        this.Selected = null;
        this.chessField = chessField;

        this.elements = this.chessField.getSvgFiguresByRole(Figure.dragRole);

        this.coordX = 0;
        this.coordY = 0;

        this.startPositonX = null;
        this.startPositonY = null;

        this.dragDrop = this.dragDrop.bind(this);
        this.dragMove = this.dragMove.bind(this);
        this.dragStart = this.dragStart.bind(this);
        // console.log(this.elements);
        this.elements.map(function (x) {
            return x.addEventListener("mousedown", _this.dragStart);
        });
        document.addEventListener("mousemove", this.dragMove);
        this.elements.map(function (x) {
            return x.addEventListener("mouseup", _this.dragDrop);
        });
    }

    createClass(DragDrop, [{
        key: "dragStart",
        value: function dragStart(e) {

            this.Selected = this.chessField.getFigureByUUID(e.target.dataset.uuid);

            this.startPositonX = this.Selected.x;
            this.startPositonY = this.Selected.y;
            var g = this.chessField.figureGroup;
            this.coordX = e.clientX - parseFloat(this.Selected.x);
            this.coordY = e.clientY - parseFloat(this.Selected.y);
            g.appendChild(this.Selected.getSvgElement());
            e.preventDefault();
        }
    }, {
        key: "dragMove",
        value: function dragMove(e) {
            if (this.Selected) {
                this.Selected.setCoordsWithSvg(e.clientX - +this.coordX, e.clientY - +this.coordY);
            }
        }
    }, {
        key: "dragDrop",
        value: function dragDrop(e) {
            var fields = this.chessField.fields;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = fields[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var field = _step.value;

                    if (this.chessField.isFigureOverField(field, this.Selected)) {
                        if (this.chessField.isFigureOnField(field)) {
                            this.chessField.removeFigureFromField(field);
                        }
                        this.chessField.addFigureOnField(field, this.Selected);
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            this.Selected.setCoordsWithSvg(this.startPositonX, this.startPositonY);
            this.Selected = null;
        }
    }]);
    return DragDrop;
}();