const clearance = 0.5;

function main(params) {
    
    const box = color("Red", 0.5, generateBox(
        params.innerWidth, params.innerHeight,
        params.innerDepth, params.wallStrength,
        params.cornerRadius
    ));
    const lid = translate([0,0,1*(params.innerHeight+params.wallStrength)], color("Blue", generateLid(
        params.innerWidth + 2*params.wallStrength,
        params.innerDepth + 2*params.wallStrength,
        params.wallStrength,
        params.cornerRadius,
        20,4
    )));
    return generateHook(20,4);
}

function getParameterDefinitions () {
  return [
    { name: 'innerWidth', caption: 'Inner Width:', type: 'float', initial: 50 },
    { name: 'innerDepth', caption: 'Inner Depth:', type: 'float', initial: 30 },
    { name: 'innerHeight', caption: 'Inner Height:', type: 'float', initial: 30 },
    { name: 'wallStrength', caption: 'Wall Strength:', type: 'float', initial: 1.5 },
    { name: 'cornerRadius', caption: 'Corner Radius:', type: 'float', initial: 2 }
  ];
}

function generateBox(w,h,d,wall,r) {
    const room = translate([wall,wall,wall],cube([w,d,h]));
    const walls = translate([0,0,-r], cube({ size: [w+2*wall,d+2*wall,h+2*wall+2*r], round: true, radius: r}));
    const cutoffTop = translate([0,0,h+r], cube([w+2*wall,d+2*wall,2*r]));
    const cutoffBot = translate([0,0,-r], cube([w+2*wall,d+2*wall,r]));

    return difference(walls, room, cutoffTop, cutoffBot);
}

function generateLid(w,d,wall,r,wHook,dHook) {
    const top = translate([0,0,-r], difference(
        cube({ size: [w,d,wall+2*r], round: true, radius: r}),
        cube([w,d,1*r]),
        translate([0,0,wall+r], cube([w,d,1*r]))
    ));
    
    const inner = translate([wall,wall,-dHook],
        cube([w-2*wall,d-2*wall,dHook])
    )
    
    return union(top, inner);
}

function generateHook(w,d) {
    
}
