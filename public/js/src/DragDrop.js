import Figure from "./Figure";
class DragDrop {
    constructor(chessField) {

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
        this.elements.map(x => x.addEventListener("mousedown", this.dragStart));
        document.addEventListener("mousemove", this.dragMove);
        this.elements.map(x => x.addEventListener("mouseup", this.dragDrop));

    }
    dragStart(e) {
        
        this.Selected = this.chessField.getFigureByUUID(e.target.dataset.uuid);

        this.startPositonX = this.Selected.x;
        this.startPositonY = this.Selected.y;
        const g = this.chessField.figureGroup;
        this.coordX = e.clientX -  parseFloat(this.Selected.x);
        this.coordY = e.clientY -  parseFloat(this.Selected.y);
        g.appendChild(this.Selected.getSvgElement());
        e.preventDefault();
    }

    dragMove(e) {
        if(this.Selected) {
            this.Selected.setCoordsWithSvg(e.clientX - +this.coordX, e.clientY - +this.coordY)
        }
    }
    dragDrop(e) {
        const fields = this.chessField.fields;
        for(const field of fields) {
            if(this.chessField.isFigureOverField(field, this.Selected)) {
                if(this.chessField.isFigureOnField(field)) {
                    this.chessField.removeFigureFromField(field);
                }
                this.chessField.addFigureOnField(field, this.Selected);
            }

        }
        this.Selected.setCoordsWithSvg(this.startPositonX, this.startPositonY);
        this.Selected = null;
    }            
}
export default DragDrop;