const svgFile = "https://image.flaticon.com/icons/svg/1509/1509998.svg";

const pathPattern = /<path d="(.*?)"\/>/g;
const movePattern = /m([+-]?\d+(\.\d+)?) ([+-]?\d+(\.\d+)?)/;
//const curvePattern = /c([ +-]?\d+(\.\d+)?)([ +-]?\d+(\.\d+)?)


function main () {
    var request = new XMLHttpRequest();
    request.open("GET", svgFile, false);
    request.overrideMimeType("application/xml");
    request.send(null);
    
    
    
    if (request.status === 200) {
        var des = deserialize(request.responseText, undefuned, {output: "csg"});
        console.log(des)
        /*
        var m = Array.from(request.responseText.matchAll(pathPattern), x => x[1]);
        for (var i = 0; i < m.length; i++) {
            var s = m[i];
            var bla = 0;
            var path;
            while (s.length > 0) {
                bla++;
                if (s.startsWith("m")) {
                    var coords = s.match(movePattern);
                    s = s.substring(coords[0].length);
                    path = new CSG.Path2D([[coords[1],coords[2]]]);
                    console.log(coords);
                    console.log(s);
                }
                if (s.startsWith("c")) {
                    var coords = s.match()
                }
                if (bla > 10) break;
            }
        }
        */
        return cube(10,10,10);
    }
    return cube(1,1,1);
}
