class Point {

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    static fromBezier(bezier, t) {
        var a = bezier[0];
        var b = bezier[1];
        var c = bezier[2];
        var d = bezier[3];

        var ab = Point.lerp(a, b, t);
        var bc = Point.lerp(b, c, t);
        var cd = Point.lerp(c, d, t);

        ab.lerp(bc, t);
        bc.lerp(cd, t);

        return ab.lerp(bc, t);
    }

    static lerp(point1, point2, t) {
        var x = point1.x + (point2.x - point1.x) * t;
        var y = point1.y + (point2.y - point1.y) * t;
        return new Point(x, y);
    }

    lerp(point, t) {
        this.x += (point.x - this.x) * t;
        this.y += (point.y - this.y) * t;
        return this;
    }

    copy(point) {
        return this.set(point.x, point.y);
    }

    set(x, y) {
        this.x = x || 0;
        this.y = y || ((y !== 0) ? x : 0);
        return this;
    }
}

export default Point