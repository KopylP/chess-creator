import generateUUID from "./Uuid";

const Figure = (()=>{

    const DRAGROLE ="drag";
    const FIELDROLE="none";

    return class Figure {
    constructor(name, role = DRAGROLE, x = 0, y = 0, row = "", col = "") {
        this.name = name;
        this.role = role;
        this.x = x;
        this.y = y;
        this.xmlns = "http://www.w3.org/2000/svg";  
        this.UUID = generateUUID();  
        this.col = col;
        this.row = row;           
    }
    static get dragRole() {
        return DRAGROLE;
    }

    static get fieldRole() {
        return FIELDROLE;
    }

    addToChessField(g) {
        const element = document.createElementNS(this.xmlns, "use");
        element.setAttributeNS(null, "x", this.x);
        element.setAttributeNS(null, "y", this.y);
        element.setAttributeNS(null, "class", this.role);
        element.setAttributeNS(null, "data-id", this.name);
        element.setAttributeNS(null, "data-uuid", this.UUID);

        element.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', "#" + this.name);   
        g.appendChild(element);
    }
    getSvgElement() {
        return document.querySelector(`use[data-uuid='${this.UUID}']`);
    }
    setCoordsWithSvg(x, y) {
        this.x = x;
        this.y = y;
        this.getSvgElement().setAttributeNS(null, "x", x);
        this.getSvgElement().setAttributeNS(null, "y", y);
    }
    get width() {
        return  this.getSvgElement().getBBox().width;
    }
    get height() {
        return this.getSvgElement().getBBox().height;
    }
}
})();

export default Figure;