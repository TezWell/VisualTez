import Blockly from 'blockly';

// @IMPORTANT
Blockly.BlockSvg.prototype.highlightShapeForInput = function (this: any, conn: any, add: any) {
    console.error('T', add, conn, this.width, this);

    if (add) {
        let colour;
        let size;
        let fill;
        if (conn.type === Blockly.ConnectionType.INPUT_VALUE) {
            size = 5;
            colour = 'magenta';
            fill = 'blue';
        } else if (conn.type === Blockly.ConnectionType.OUTPUT_VALUE) {
            size = 2;
            colour = 'magenta';
            fill = colour;
        } else if (conn.type === Blockly.ConnectionType.NEXT_STATEMENT) {
            size = 4;
            colour = 'goldenrod';
            fill = 'none';
        } else if (conn.type === Blockly.ConnectionType.PREVIOUS_STATEMENT) {
            size = 2;
            colour = 'goldenrod';
            fill = colour;
        }
        // Add connection indicator
        this.svgConnection_ = Blockly.utils.dom.createSvgElement(
            Blockly.utils.Svg.CIRCLE,
            {
                className: 'connectionMark',
                cx: conn.offsetInBlock_.x,
                cy: conn.offsetInBlock_.y,
                r: size,
                fill: fill,
                stroke: colour,
                'stroke-width': 2,
            },
            this.svgGroup_,
        );
    } else if (this.svgConnection_) {
        // Remove connection indicator
        this.svgGroup_.removeChild(this.svgConnection_);
        this.svgConnection_ = null;
    }
    this.pathObject.updateShapeForInputHighlight(conn, add);
};
