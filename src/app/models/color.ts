import { ColorContrast } from './color-contrast';

export class Color{
    constructor(hue: number, saturation: number, luminosity: number, stepQuantity: number = 16){
        this.hue = hue;
        this.saturation = saturation;
        this.luminosity = luminosity;
        this.foreground = new ColorContrast(this.toRGBString().toLowerCase()).defaultContrast();
    }

    hue: number;
    saturation: number;
    luminosity: number;

    public get hex() : string {
      return this.toHEX();
    }

    public get rgb() : number[] {
      return this.toRGB();
    }

    public get rgbString(): string {
      return this.toRGBString();
    }
    

    foreground: string;

    private toRGB() : number[] {
        var r, g, b;
        var h = this.hue/360;
        var s = this.saturation/100;
        var l = this.luminosity/100;
        if (s == 0) {
          r = g = b = l; // achromatic
        } else {
          var hue2rgb = function(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
          }
      
          var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          var p = 2 * l - q;
      
          r = hue2rgb(p, q, h + 1/3);
          g = hue2rgb(p, q, h);
          b = hue2rgb(p, q, h - 1/3);
        }
      
        return [ r * 255, g * 255, b * 255 ];
    }

    private toRGBString() : string{
        var rgb = this.toRGB();
        return `RGB(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
    }

    private toHEX() : string{
        var rgb = this.toRGB();
        var value = rgb[2] | (rgb[1] << 8) | (rgb[0] << 16);
        return '#' + (0x1000000 + value).toString(16).slice(1)
    }

    public static FromHex(hex: string): Color{
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? this.FromRgb(parseInt(result[1], 16),parseInt(result[2], 16),parseInt(result[3], 16)) : null;
    }

    public static FromRgb(r: number, g: number, b: number): Color {
        r /= 255; 
        g /= 255; 
        b /= 255;

        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l= (max + min) / 2;
      
        if (max == min) {
          h = s = 0; // achromatic
        } else {
          var d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
          switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
          }
      
          h /= 6;
        }
      
        return new Color(h*360,s*100,l*100);
    }
}