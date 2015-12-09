


/**
 *
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 */
CanvasRenderingContext2D.prototype.drawEllipse = function( x, y, width, height) {
    var kappa = .5522848,
        ox = (width / 2) * kappa, // control point offset horizontal
        oy = (height / 2) * kappa, // control point offset vertical
        xe = x + width,           // x-end
        ye = y + height,           // y-end
        xm = x + width / 2,       // x-middle
        ym = y + height / 2;       // y-middle

    this.beginPath();
    this.moveTo(x, ym);
    this.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
    this.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
    this.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
    this.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
    this.closePath(); // todo not used correctly, see comments (use to close off open path)
    this.stroke();
    this.fill();
};


