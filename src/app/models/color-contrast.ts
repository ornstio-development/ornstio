export class ColorContrast {

    private rgba;

    constructor(rgba) {
        if (rgba === 'transparent') {
            rgba = [0, 0, 0, 0];
        }
        else if (typeof rgba === 'string') {
            var rgbaString = rgba;
            rgba = this.parseColor(rgbaString);

            if (rgba) {
                rgba.shift();
            }
            else {
                throw new Error('Invalid string: ' + rgbaString);
            }
        }

        if (rgba[3] === undefined) {
            rgba[3] = 1;
        }

        rgba = rgba.map((a) => {
            return this.floor(a, 3);
        });
        this.rgba = rgba;
    }
    
    contrast(color) {
        // Formula: http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
        var alpha = this.alpha;

        if (alpha >= 1) {
            if (color.alpha < 1) {
                color = color.overlayOn(this);
            }

            var l1 = this.luminance + .05,
                l2 = color.luminance + .05,
                ratio = l1 / l2;

            if (l2 > l1) {
                ratio = 1 / ratio;
            }

            ratio = this.floor(ratio, 2);

            return {
                ratio: ratio,
                error: 0,
                min: ratio,
                max: ratio
            };
        }

        // If we’re here, it means we have a semi-transparent background
        // The text color may or may not be semi-transparent, but that doesn't matter

        var onBlack = this.overlayOn(BaseColors.BLACK),
            onWhite = this.overlayOn(BaseColors.WHITE),
            contrastOnBlack = onBlack.contrast(color).ratio,
            contrastOnWhite = onWhite.contrast(color).ratio;

        var max = Math.max(contrastOnBlack, contrastOnWhite);
        var min = 1;

        if (onBlack.luminance > color.luminance) {
            min = contrastOnBlack;
        }
        else if (onWhite.luminance < color.luminance) {
            min = contrastOnWhite;
        }

        return {
            ratio: this.floor((min + max) / 2, 2),
            error: this.floor((max - min) / 2, 2),
            min: min,
            max: max
        };
    }

    inverse() {
        return new ColorContrast([
            255 - this.rgba[0],
            255 - this.rgba[1],
            255 - this.rgba[2],
            this.alpha
        ]);
    };

    defaultContrast(){
        return this.contrast(BaseColors.WHITE).ratio > this.contrast(BaseColors.BLACK).ratio ? '#ffffff' : '#000000'
    }

    private rgb(): Array<number> {
        return this.rgba.slice(0, 3);
    };

    private get alpha() {
        return this.rgba[3];
    };

    private set alpha(alpha) {
        this.rgba[3] = alpha;
    };

    private get luminance() {
        // Formula: http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
        var rgba = this.rgba.slice();

        for (var i = 0; i < 3; i++) {
            var rgb = rgba[i];

            rgb /= 255;

            rgb = rgb < .03928 ? rgb / 12.92 : Math.pow((rgb + .055) / 1.055, 2.4);

            rgba[i] = rgb;
        }

        return .2126 * rgba[0] + .7152 * rgba[1] + 0.0722 * rgba[2];
    }

    private clone() {
        return new ColorContrast(this.rgba);
    };

    // Overlay a color over another
    private overlayOn(color) {
        var overlaid = this.clone();

        var alpha = this.alpha;

        if (alpha >= 1) {
            return overlaid;
        }

        for (var i = 0; i < 3; i++) {
            overlaid.rgba[i] = overlaid.rgba[i] * alpha + color.rgba[i] * color.rgba[3] * (1 - alpha);
        }

        overlaid.rgba[3] = alpha + color.rgba[3] * (1 - alpha);

        return overlaid;
    };

    // Math.floor with precision
    private floor(number, decimals) {
        decimals = +decimals || 0;

        var multiplier = Math.pow(10, decimals);

        return Math.floor(number * multiplier) / multiplier;
    }

    private parseColor(rgbaString) {
        return rgbaString.match(/rgba?\(([\d.]+), ([\d.]+), ([\d.]+)(?:, ([\d.]+))?\)/)
    }
}

export const BaseColors = {
    BLACK: new ColorContrast([0, 0, 0]),
    WHITE: new ColorContrast([255, 255, 255])
}