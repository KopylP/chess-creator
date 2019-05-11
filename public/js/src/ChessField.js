import Figure from "./Figure";
import Field from "./Field";
const ChessField = (function() {
    class ChessField {
    constructor(svgName, size = 30, numb = '') {
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
        this.callback = f => f;
        // this.isDraw = false;
    }
    //------------------create fields----------------//
    createFields() {
        
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                this.fields.push(new Field(i, j, this.fieldGroup, this.size));
            }
        }
    }


    _loadFromCode(code) {
        //console.log(regExp.test(code));
        //if(regExp.test(code)) {
            let i = 0;
            for(let symbol of code) {
                if(Number.isInteger(+symbol)) {
                    console.log("Is Integer");
                    i += +symbol;
                }
                else if(symbol !== '/'){
                    console.log(i);
                    this.addFigureOnField(this.fields[i], new Figure(symbol, Figure.fieldRole));
                    i++;
                }
            }
            console.log(this.figuresOnField);
        //}
    }

    drawFromCode(code) {
        this.fields.map(n => n.addToChessField());
        this._loadFromCode(code);
        // this.figuresOnField.map(n => n.addToChessField(this.figureGroup));
    }


    addFigureOnField(field, figure) {
        const f = new Figure(figure.name, Figure.fieldRole, field.x, field.y, field.row, field.col);
        f.addToChessField(this.fieldGroup);
        this.figuresOnField.push(f);
        let obj = {chessField: this, field};

        let func = function(e) {
            this.chessField.removeFigureFromField(this.field);
        };
        func = func.bind(obj);
        f.getSvgElement().onclick = func;
        this.callback();
    }

    removeFigureFromField(field) {
        const i = this.figuresOnField.findIndex(p => p.row === field.row && p.col === field.col);
        // console.log(i);
        // console.log(this.figuresOnfield[i]);
        console.log(this.figuresOnField[i].getSvgElement().dataset.uuid);
        console.log(this.figuresOnField[i]);
        this.figuresOnField[i].getSvgElement().remove();
        this.figuresOnField[i].getSvgElement();
        this.figuresOnField.splice(i, 1);
        this.callback();
    }

    isFigureOnField(field) {
        const i = this.figuresOnField.findIndex(p => p.row === field.row && p.col === field.col);
        console.log(i);
        return i > -1 ? true : false;
    }
    getFigureFromField(field) {
        return this.figuresOnField.find(p => p.row === field.row && p.col === field.col);
    }
    isFigureOverField(field, figure) {
        const fieldBox = field.getSvgField().getBBox();
        const figureBox = figure.getSvgElement().getBBox();
        let isOver = false;
        const center = {x: figureBox.x + figureBox.width/2, y: figureBox.y + figureBox.height/2};
        if(center.x > fieldBox.x && center.x < fieldBox.x + fieldBox.width && center.y > fieldBox.y && center.y < fieldBox.y + fieldBox.height) {
            isOver = true;
        }
        console.log("Over: " + isOver);
        return isOver;
    }

    loadFigures() {
        const getFigures = Array.from(this.field.getElementsByTagName("defs")[0].getElementsByClassName("f"));
        for(let i = 0; i < getFigures.length; i++) {
            const id = getFigures[i].getAttributeNS(null, "id");
            const offset = i < 6 ? 1*this.size : 2*this.size; 
            this.figures.push(new Figure(id, Figure.dragRole, this.size*this.rows + offset, this.size*(i%6)));
        }
        console.log(this.figures);
    }

    getSvgFiguresByRole(role) {
        return this.figures.filter(p => p.role === role).map(p => p.getSvgElement());
    }

    getSvgBoard() {
        return this.field;
    }

    getSvgFields() {
        return this.fields.map(p => p.getSvgField());
    }
    
    getFigureByUUID(uuid) {
        // console.log(uuid + " UUID IN getFigureByUUID method");
        const i = this.figures.findIndex(p => p.UUID === uuid);
        console.log("element in this method: ");
        console.log(this.figures[i]);
        return this.figures[i];
    }
    //------------------//--------------------------//
    
    draw() {
        this.fields.map(n => n.addToChessField());
        this.figures.map(n => n.addToChessField(this.figureGroup)); 
        // this.isDraw = true;                
    }

    getFECode() {
        let code = "";
        let count = 0;
        // console.log(this.fields);
        for(let i = 0; i < this.fields.length; i++) {
            if(i%8 === 0 && i !== 0) {
                code += count || '';
                code += '/';
                count = 0;
                console.log(i);
            }
            if(this.isFigureOnField(this.fields[i])) {
                code += count > 0 ? count : '';
                code += this.getFigureFromField(this.fields[i]).name;
                count = -1;
            }
            count++;
        }
        code += count || '';
        return code;
    }
}
return ChessField;
})();
export default ChessField;