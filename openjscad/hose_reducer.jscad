const outer_d_1 = 7;
const outer_d_2 = 20;

const wall_strength = 1.5;

const tooth_length = 3;
const tooth_thickness = 0.5;
const teeth_count = 3;

const side_length = 12;
const center_length = 10;

function step(d) {
    return union(
        translate([0,0,0.8], cylinder({r1: d/2+tooth_thickness, r2: d/2, h: tooth_length-0.8})),
        cylinder({r1: d/2, r2: d/2+tooth_thickness, h: 0.8})
    );
}

function side(outer_diameter) {
    var steps = translate([0,0,side_length-tooth_length], step(outer_diameter));
    for (var i = 2; i <= teeth_count; i++) {
        steps = union(
            steps,
            translate([0,0,side_length-i*tooth_length], step(outer_diameter))
        );
    }
    return difference(
        union(
            cylinder({r: outer_diameter/2, h: side_length}),
            steps
        ),
        cylinder({r: outer_diameter/2-wall_strength, h: 3*side_length})
    )
}

function connector(o1, o2) {
    var i1 = o1 - 2*wall_strength;
    var i2 = o2 - 2*wall_strength;
    return difference(
        cylinder({r1: o2/2, r2: o1/2, h: center_length}),
        cylinder({r1: i2/2, r2: i1/2, h: center_length})
    )
}

//Render
function main() {
    return translate([0,0,side_length], union(
        translate([0,0,center_length], side(outer_d_1)),
        connector(outer_d_1,outer_d_2),
        rotate([180,0,0], side(outer_d_2))
    ));
}
