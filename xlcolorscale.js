/**
 * @preserve xlColorScale v0.5
 * http://www.brymck.com
 *
 * Copyright 2011, Bryan McKelvey
 * Licensed under the MIT License
 * http://www.brymck.com/license
 */

/**
 * A class for converting a value on a scale into a color.
 * @constructor
 */
var xlColorScale = xlcs = (function() {
  /**
   * The colors to be used in the scale. Defaults to the colors used in Excel
   * 2007+ for 0%, 50% and 100%.
   * @type {Array.<Array.<number>>}
   */
  var colors = [
    [248, 105, 107],
    [255, 235, 132],
    [ 99, 190, 123]
  ];

  /** @const */
  var DEFAULT_MIN = 0;

  /** @const */
  var DEFAULT_MAX = 100;

  /**
   * Calculates the two-digit hexadecimal equivalent of the provided decimal.
   * @param {number} dec An integer between 0 and 255 in base 10 format.
   * @return {string} A two-digit hexadecimal code.
   */
  function decToHex(dec) {
    var hex = dec.toString(16);
    return (hex.length === 1 ? "0" : "") + hex;
  }

  /**
   * Calculates a color based on provided inputs and the current color array.
   * @param {number} index The index of the color array to use.
   * @param {number} subPct The percent between the chosen color and the
   *   following color.
   * @return {string} The result in HTML color code format.
   */
  function getColor(index, subPct) {
    var result = "#";
    for (var i = 0; i < 3; i++) {
      var dec = parseInt(colors[index][i] * (1 - subPct) +
                         colors[index + 1][i] * subPct, 10);
      result += decToHex(dec);
    }
    return result;
  }

  return {
    /**
     * Converts a value into a color.
     * @param {number} value The value you wish to convert.
     * @param {?number} min The minimum value of the scale. Defaults to 0.
     * @param {?number} max The maximum value of the scale. Defaults to 100.
     */
    convert: function(value, min, max) {
      var pct, subPct, index, topIndex = colors.length - 1,
          red, green, blue;

      // Default min and max if necessary to 0 and 100
      if (min == null) {
        min = DEFAULT_MIN;
      }
      if (max == null) {
        max = max || DEFAULT_MAX;
      }

      // Prevent value from exceeding min or max
      if (value < min) {
        value = min;
      } else if (value > max) {
        value = max;
      }

      pct = (value - min) / (max - min);

      // Get starting index based on length of array
      index = parseInt(pct * (colors.length - 1), 10);
      if (index >= topIndex) {
        index = topIndex - 1;
      }
      subPct = (pct - index / topIndex) / ((index + 1) / topIndex - index / topIndex);
      return getColor(index, subPct);
    }
  }
})();
