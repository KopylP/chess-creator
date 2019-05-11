import generateUUID from "./Uuid"

class Field {
    constructor(row, col, fieldGroup, size) {
        this.row = row;
        this.col = col;
        this.size = size;
        this.x = this.col*this.size;
        this.y = this.row*this.size;
        this.xmlns = "http://www.w3.org/2000/svg";
        this.fieldGroup = fieldGroup;
        this.figure = "";
        this.UUID = generateUUID();
        this.color = this.row%2 == this.col%2 ? "#eee" : "#666";
    }
    addToChessField() {
            const rect = document.createElementNS(this.xmlns, "rect");
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
    getSvgField() {
        return document.querySelector(`rect[data-uuid='${this.UUID}']`);
    }
}
export default Field;