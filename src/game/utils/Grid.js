import Point from './Point'


class Grid {

    constructor(rows, cols, width, height, vertices) {

        this.rows = rows;
        this.cols = cols;
        this.vertices = vertices;
        this.points = [];

        for (var y = 0; y < rows; y++) {

            var normY = y / (rows - 1);
            for (var x = 0; x < cols; x++) {

                var normX = x / (cols - 1);
                this.points.push(new Point(normX * width, normY * height));
            }
        }

        this.tl = this.points[0];
        this.tr = this.points[cols - 1];
        this.br = this.points[this.points.length - 1];
        this.bl = this.points[this.points.length - cols];

        this.cpL0 = new Point(0, height * 1 / 3);
        this.cpL1 = new Point(0, height * 2 / 3);
        this.cpR0 = new Point(width, height * 1 / 3);
        this.cpR1 = new Point(width, height * 2 / 3);
        this.cpT0 = new Point(width * 1 / 3, 0);
        this.cpT1 = new Point(width * 2 / 3, 0);
        this.cpB0 = new Point(width * 1 / 3, height);
        this.cpB1 = new Point(width * 2 / 3, height);

        this.bezierT = [this.tl, this.cpT0, this.cpT1, this.tr];
        this.bezierB = [this.bl, this.cpB0, this.cpB1, this.br];
        this.bezierL = [this.tl, this.cpL0, this.cpL1, this.bl];
        this.bezierR = [this.tr, this.cpR0, this.cpR1, this.br];
    }

    update() {

        var rows = this.rows;
        var cols = this.cols;

        for (var iy = 0; iy < rows; iy++) {

            var y = iy / (rows - 1);

            var yl = Point.fromBezier(this.bezierL, y);
            var yr = Point.fromBezier(this.bezierR, y);

            var cp0 = Point.lerp(this.cpT0, this.cpB0, y);
            var cp1 = Point.lerp(this.cpT1, this.cpB1, y);

            for (var ix = 0; ix < cols; ix++) {

                var i = ix + iy * cols;
                var q = this.points[i];
                var x = ix / (cols - 1);

                var k = Point.fromBezier([yl, cp0, cp1, yr], x);
                q.copy(k);

                var ii = i * 2;
                this.vertices[ii] = k.x;
                this.vertices[ii + 1] = k.y;
            }
        }
    }
}


export default Grid