const clearance = 0.5;

var hookWidth = 0;
var hookDepth = 0;

function main(params) {
    
    hookWidth = params.hookWidth;
    hookDepth = params.hookDepth;

    const box = color("Red", 0.5, generateBox(
        params.innerWidth, params.innerHeight,
        params.innerDepth, params.wallStrength,
        params.cornerRadius
    ));
    const lid = color("Blue", generateLid(
        params.innerWidth + 2*params.wallStrength,
        params.innerDepth + 2*params.wallStrength,
        params.wallStrength,
        params.cornerRadius
    ));
    //translate([0,0,1.5*(params.innerHeight+params.wallStrength)], 
    if (params.expBox && params.expLid) {
        if (params.expPrintable) {
            return union(box, translate([0,-10,params.wallStrength], rotate([180,0,0], lid)));
        } else {
            return union(box, translate([0,0,1.5*(params.innerHeight+params.wallStrength)], lid));
        }
    } else {
        if (params.expBox) return box;
        if (params.expLid)
            if (params.expPrintable) {
                return translate([0,params.innerDepth+params.wallStrength,params.wallStrength], rotate([180,0,0], lid));
            } else {
                return translate([0,0,hookDepth], lid);
            }
    }
}

function getParameterDefinitions () {
  return [
    { name: "dims", caption: "Dimensions", type: "group" },
    { name: 'innerWidth', caption: 'Inner Width:', type: 'float', initial: 50 },
    { name: 'innerDepth', caption: 'Inner Depth:', type: 'float', initial: 30 },
    { name: 'innerHeight', caption: 'Inner Height:', type: 'float', initial: 30 },
    { name: 'wallStrength', caption: 'Wall Strength:', type: 'float', initial: 1.5 },
    { name: 'cornerRadius', caption: 'Corner Radius:', type: 'float', initial: 2 },
    { name: "hooks", caption: "Hooks", type: "group" },
    { name: 'hookWidth', caption: 'Hook Width:', type: 'float', initial: 20 },
    { name: 'hookDepth', caption: 'Hook Depth:', type: 'float', initial: 4 },
    { name: "output", caption: "Output options", type: "group" },
    { name: "expBox", caption: "Export Box?", type: "checkbox", checked: true },
    { name: "expLid", caption: "Export Lid?", type: "checkbox", checked: true },
    { name: "expPrintable", caption: "Flip Lid/Printable Orientation?", type: "checkbox", checked: true },
  ];
}

function generateBox(w,h,d,wall,r) {
    const room = translate([wall,wall,wall],cube([w,d,h]));
    const walls = translate([0,0,-r], cube({ size: [w+2*wall,d+2*wall,h+2*wall+2*r], round: true, radius: r}));
    const cutoffTop = translate([0,0,h+wall], cube([w+2*wall,d+2*wall,2*r]));
    const cutoffBot = translate([0,0,-r], cube([w+2*wall,d+2*wall,r]));
    
    const box = difference(walls, room, cutoffTop, cutoffBot);
    const hook = rotate([0,0,90], generateHook());
    const hookL = translate([w/2+wall,d+wall,h+wall], mirror([0,1,0], hook));
    const hookR = translate([w/2+wall,wall,h+wall], hook);

    return union(box, hookL, hookR);
}

function generateLid(w,d,wall,r) {
    const top = translate([0,0,-r], difference(
        cube({ size: [w,d,wall+2*r], round: true, radius: r}),
        cube([w,d,1*r]),
        translate([0,0,wall+r], cube([w,d,1*r]))
    ));
    
    const hook = union(
        rotate([0,0,90], generateHook()),
        translate([-hookWidth/2,-clearance,-hookDepth], cube([hookWidth,clearance,hookDepth])),
        translate([-hookWidth/2,-clearance/2,-hookDepth-clearance], rotate([30,0,0], cube([hookWidth,2*clearance,2*clearance])))
    );
    const hookL = translate([w/2+wall,d-wall-clearance,0], mirror([0,1,0], hook));
    const hookR = translate([w/2+wall,wall+clearance,0], hook);
    
    const shellWidth = wall + 1.3*hookDepth;
    
    const inner = difference(
        translate([wall+clearance,wall+clearance,-hookDepth],
            difference(
                difference(
                    translate([0,0,-r], cube({ size: [w-2*wall-2*clearance,d-2*wall-2*clearance,hookDepth+2*r], round: true, radius: r})),
                    translate([0,0,-hookDepth], cube([w-2*wall-2*clearance,d-2*wall-2*clearance,2*r])),
                    translate([0,0,2*r], cube([w-2*wall-2*clearance,d-2*wall-2*clearance,2*r]))),
            translate([shellWidth/2,shellWidth/2,0], cube([w-2*wall-shellWidth,d-2*wall-2*clearance-shellWidth,hookDepth]))
            )
        ),
        hookL, hookR
    );
    
    return union(top, inner);
}

function generateHook() {
    const d = hookDepth;
    const w = hookWidth;
    const l = d/tan(45);
    
    const profile = polygon([[0,0],[0,d],[d/2,d/2]]);
    
    const half = translate([0,w/2-l,-d], union(
        rotate([90,0,0], linear_extrude({height: hookWidth/2-l}, profile)),
        rotate([90,0,90], polyhedron({
            points: [[0,0,0],[0,d/2,d/2],[0,d,0],[l,0,0],[l,d,0]],
            triangles: [[0,2,1],[0,1,3],[0,3,4],[1,2,4],[1,4,3],[0,4,2]]
        })))
    );
    
    return union(half, mirror([0,1,0], half));
}
