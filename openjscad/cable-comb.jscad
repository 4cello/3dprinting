var holes = [4, 3, 5, 3, 2];
var gap = 1;
var spacing = 1;

function getParameterDefinitions() {
    return [
        { name: 'holes', type: 'text', initial: "[3,3,5,3]", caption: "Hole diameters" }, 
        { name: 'height', type: 'float', initial: 4, caption: "Height" },
        { name: 'gap', type: 'float', initial: 1, caption: "Tightness (Gap Width = d - this)" },
        { name: 'spacing', type: 'float', initial: 1, caption: "Spacing" },
    ];
}

function comb() {
    // The cutout and the outer shape are assembled separately,
    // to facilitate filling up the spaces on the solid side later.
    var shapeOuter = null;
    var cutout = null;
    var pos = 0;
    var dmax = 0;
    var dmin = 0;
    for (var h in holes) {
        var d = holes[h];
        if (d <= 0) throw "Hole diameter must be >0";
        if (d > dmax) dmax = d;
        if (d < dmin || dmin === 0) dmin = d;
        console.log(h, d, pos);
        var circInner = translate([pos,0],
            union(
                circle({r: d/2}),
                translate([d/2,d/2+spacing],
                    square({size: [d-gap,d+spacing], center: true})
                )
            )
        );
        var circOuter = translate([pos,0],
            translate([-spacing,-spacing],
                circle({r: d/2+spacing})
            )
        );
        if (h > 0) {
            shapeOuter = union(shapeOuter,circOuter);
            cutout = union(cutout,circInner);
        } else {
            shapeOuter = circOuter;
            cutout = circInner;
        }
        pos += d + spacing;
    }
    shapeOuter = union(shapeOuter, difference(
        hull(shapeOuter),
        translate([-holes[0],dmin], square([2*pos,dmax+spacing]))
    ));
    return difference(shapeOuter, cutout);
}

function main (params) {
    holes = JSON.parse(params.holes);
    spacing = params.spacing;
    gap = params.gap;
    var c = comb();
    return linear_extrude({height: params.height}, c);
}
