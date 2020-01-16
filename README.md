# All (my) things 3d printing
Slicer profiles and [OpenJSCAD](https://openjscad.org) files.
## OpenJSCAD links
### QR Code Generator
Encodes a string into a QR code and generates a 3d model of said code.

[Link](https://openjscad.org/#https://raw.githubusercontent.com/4cello/3dprinting/master/openjscad/qr-code-generator.jscad) 
([Source Code](openjscad/qr-code-generator.jscad))

Features: 
- 1 to 3 correction levels 
- Optional, customizable backplate
    - border around code with rounded corners
    - height ratio of backplate to the actual code

### Snap Box Generator
Generates a box + fitting snap-on lid.

Features:
- Customizable dimensions
- Rounded corners
- Customizable snap hook dimensions (and possibly count)

[Link](https://openjscad.org/#https://raw.githubusercontent.com/4cello/3dprinting/master/openjscad/snap-box.jscad)
([Source Code](openjscad/snap-box.jscad))

## Slicer Profiles
### PrusaSlicer
The PrusaSlicer settings folder can be found at
- Linux: ``~/.PrusaSlicer`` or ``~/.PrusaSlicer-alpha``
- Windows: ``%appdata%/PrusaSlicer``

### Cura
The cura settings folder is located at:
- Linux: ``~/.config/cura/$CURA_VERSION``
    - However, the definitions need to be placed in ``~/.local/share/cura/$CURA_VERSION``
- Windows: ``%appdata%/cura/$CURA_VERSION``
