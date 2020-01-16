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
    const lid = translate([0,0,1*(params.innerHeight+params.wallStrength)], color("Blue", generateLid(
        params.innerWidth + 2*params.wallStrength,
        params.innerDepth + 2*params.wallStrength,
        params.wallStrength,
        params.cornerRadius
    )));
    
    return lid;
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
        translate([-hookWidth/2,-0.5,0], cube([hookWidth,0.5,0]))
    );
    
    return hook;
    const hookL = translate([w/2+wall,d+wall,0], mirror([0,1,0], hook));
    const hookR = translate([w/2+wall,wall,0], hook);
    
    const inner = translate([wall+clearance,wall+clearance,-hookDepth],
        difference(
            cube([w-2*wall-2*clearance,d-2*wall-2*clearance,hookDepth]),
            hookL, hookR
    ));
    
    return union(hook)//union(top, inner);
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
