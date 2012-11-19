/*jslint browser:true*/

/*
 * This file is part of the CSSNakedDay.js project.
 *
 * (c) Tobias Sjösten <tobias.sjosten@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

(function () {
    'use strict';

    // All the major browsers supports this, but let's test for edge cases.
    if (!document.styleSheets) {
        return;
    }

    var stripInline, stripExternal,
        today = new Date(),
        oldOnload = window.onload;

    // Halt if it's not CSS Naked Day today (April 9th).
    if (today.getDate() !== 9 && today.getMonth() !== 3) {
        return;
    }

    stripExternal = function () {
        var i, j = document.styleSheets.length;
        for (i = 0; i < j; i += 1) {
            document.styleSheets[i].disabled = true;
        }
    };

    stripInline = document.querySelectorAll
        // Use speedy querySelector if available, meaning all but IE 6 and 7.
        ? function () {
            var i, elements = document.querySelectorAll('*[style]'),
                j = elements.length;

            for (i = 0; i < j; i += 1) {
                elements[i].style.cssText = '';
            }
        }
        // Fall back on iterating all DOM elements.
        : function (element) {
            var i, j = element.childNodes.length;

            for (i = 0; i < j; i += 1) {
                stripInline(element.childNodes[i]);
            }

            if (element.style) {
                element.style.cssText = '';
            }
        };

    // Avoid style flickering by stripping external styles early, even before
    // the DOM is fully loaded.
    stripExternal();

    window.onload = function () {
        if (oldOnload) { oldOnload(); }

        stripExternal();
        stripInline(document);
    };
}());
