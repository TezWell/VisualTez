import Blockly from 'blockly';

/**
 * Highlights the input value connection
 *
 * @override
 */
Blockly.BlockSvg.prototype.highlightShapeForInput = function (this: any, conn: any, add: any) {
    highlightConnection(this, conn, add);
    this.pathObject.updateShapeForInputHighlight(conn, add);
};

/**
 * Highlights the output connection when dragging a block
 *
 * @override
 */
const original_setDragging = Blockly.BlockSvg.prototype.setDragging;
Blockly.BlockSvg.prototype.setDragging = function (this, adding: boolean) {
    highlightConnection(this, this.outputConnection, adding);
    original_setDragging.call(this, adding);
};

/**
 * Highlights a connection of a block.
 *
 * @param block The block that contains the connection
 * @param conn The connection to be highlighted
 * @param add Indicates when to add the highlight effect and when to remove it
 */
const highlightConnection = (block: any, conn: any, add: boolean) => {
    if (conn) {
        if (add) {
            let colour;
            let size;
            let fill;
            if (conn.type === Blockly.ConnectionType.INPUT_VALUE) {
                size = 5;
                colour = 'magenta';
                fill = 'blue';
            } else if (conn.type === Blockly.ConnectionType.OUTPUT_VALUE) {
                size = 5;
                colour = 'magenta';
                fill = 'blue';
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
            block.blockConnection_ = Blockly.utils.dom.createSvgElement(
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
                block.svgGroup_,
            );
        } else if (block.blockConnection_) {
            // Remove connection indicator
            block.svgGroup_.removeChild(block.blockConnection_);
            block.blockConnection_ = null;
        }
    }
};
