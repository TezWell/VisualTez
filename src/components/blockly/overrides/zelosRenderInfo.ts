import Blockly from 'blockly';

Blockly.zelos.RenderInfo.prototype.getSpacerRowHeight_ = function (this: any, prev, next) {
    // If we have an empty block add a spacer to increase the height.
    if (Blockly.blockRendering.Types.isTopRow(prev) && Blockly.blockRendering.Types.isBottomRow(next)) {
        return this.constants_.EMPTY_BLOCK_SPACER_HEIGHT;
    }
    const followsStatement = Blockly.blockRendering.Types.isInputRow(prev) && prev.hasStatement;
    const precedesStatement = Blockly.blockRendering.Types.isInputRow(next) && next.hasStatement;
    if (followsStatement || precedesStatement) {
        return 20;
    }

    // Top and bottom rows act as a spacer so we don't need any extra padding.
    if (Blockly.blockRendering.Types.isTopRow(prev)) {
        if (!prev.hasPreviousConnection && (!this.outputConnection || this.hasStatementInput)) {
            return this.constants_.MEDIUM_PADDING;
        }
        return 5;
    }
    if (Blockly.blockRendering.Types.isBottomRow(next)) {
        if (!this.outputConnection) {
            return 10;
        } else if (!next.hasNextConnection && this.hasStatementInput) {
            return Math.abs(this.constants_.NOTCH_HEIGHT - this.constants_.CORNER_RADIUS);
        }
        return 5;
    }
    return this.constants_.MEDIUM_PADDING;
};
Blockly.zelos.RenderInfo.prototype.getInRowSpacing_ = function (this: any, prev, next) {
    if (!prev || !next) {
        // No need for padding at the beginning or end of the row if the
        // output shape is dynamic.
        if (
            this.outputConnection &&
            this.outputConnection.isDynamicShape &&
            !this.hasStatementInput &&
            !this.bottomRow.hasNextConnection
        ) {
            return 5;
        }
    }
    if (!prev) {
        // Statement input padding.
        if (next && Blockly.blockRendering.Types.isStatementInput(next)) {
            return this.constants_.STATEMENT_INPUT_PADDING_LEFT;
        }
    }
    // Spacing between a rounded corner and a previous or next connection.
    if (prev && Blockly.blockRendering.Types.isLeftRoundedCorner(prev) && next) {
        if (
            Blockly.blockRendering.Types.isPreviousConnection(next) ||
            Blockly.blockRendering.Types.isNextConnection(next)
        ) {
            return next.notchOffset - this.constants_.CORNER_RADIUS;
        }
    }
    // Spacing between a square corner and a hat.
    if (
        prev &&
        Blockly.blockRendering.Types.isLeftSquareCorner(prev) &&
        next &&
        Blockly.blockRendering.Types.isHat(next)
    ) {
        return this.constants_.NO_PADDING;
    }
    return this.constants_.MEDIUM_PADDING;
};
