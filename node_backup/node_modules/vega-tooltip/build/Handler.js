import * as tslib_1 from "tslib";
import { createDefaultStyle, DEFAULT_OPTIONS } from './defaults';
import { formatValue } from './formatValue';
import { calculatePosition } from './position';
/**
 * The tooltip handler class.
 */
var Handler = /** @class */ (function () {
    /**
     * Create the tooltip handler and initialize the element and style.
     *
     * @param options Tooltip Options
     */
    function Handler(options) {
        this.options = tslib_1.__assign({}, DEFAULT_OPTIONS, options);
        var elementId = this.options.id;
        // bind this to call
        this.call = this.tooltip_handler.bind(this);
        // prepend a default stylesheet for tooltips to the head
        if (!this.options.disableDefaultStyle && !document.getElementById(this.options.styleId)) {
            var style = document.createElement('style');
            style.setAttribute('id', this.options.styleId);
            style.innerHTML = createDefaultStyle(elementId);
            if (document.head.childNodes.length > 0) {
                document.head.insertBefore(style, document.head.childNodes[0]);
            }
            else {
                document.head.appendChild(style);
            }
        }
        // append a div element that we use as a tooltip unless it already exists
        this.el = document.getElementById(elementId);
        if (!this.el) {
            this.el = document.createElement('div');
            this.el.setAttribute('id', elementId);
            this.el.classList.add('vg-tooltip');
            document.body.appendChild(this.el);
        }
    }
    /**
     * The tooltip handler function.
     */
    Handler.prototype.tooltip_handler = function (handler, event, item, value) {
        // console.log(handler, event, item, value);
        // hide tooltip for null, undefined, or empty string values
        if (value == null || value === '') {
            this.el.classList.remove('visible', this.options.theme + "-theme");
            return;
        }
        // set the tooltip content
        this.el.innerHTML = formatValue(value, this.options.sanitize, this.options.maxDepth);
        // make the tooltip visible
        this.el.classList.add('visible', this.options.theme + "-theme");
        var _a = calculatePosition(event, this.el.getBoundingClientRect(), this.options.offsetX, this.options.offsetY), x = _a.x, y = _a.y;
        this.el.setAttribute('style', "top: " + y + "px; left: " + x + "px");
    };
    return Handler;
}());
export { Handler };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9IYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsZUFBZSxFQUFXLE1BQU0sWUFBWSxDQUFDO0FBQzFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRS9DOztHQUVHO0FBQ0g7SUFnQkU7Ozs7T0FJRztJQUNILGlCQUFZLE9BQTBCO1FBQ3BDLElBQUksQ0FBQyxPQUFPLHdCQUFRLGVBQWUsRUFBSyxPQUFPLENBQUUsQ0FBQztRQUNsRCxJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztRQUVsQyxvQkFBb0I7UUFDcEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUU1Qyx3REFBd0Q7UUFDeEQsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDdkYsSUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM5QyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQy9DLEtBQUssQ0FBQyxTQUFTLEdBQUcsa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFaEQsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUN2QyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNoRTtpQkFBTTtnQkFDTCxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNsQztTQUNGO1FBRUQseUVBQXlFO1FBQ3pFLElBQUksQ0FBQyxFQUFFLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUUsQ0FBQztRQUM5QyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRTtZQUNaLElBQUksQ0FBQyxFQUFFLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBRXBDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNwQztJQUNILENBQUM7SUFFRDs7T0FFRztJQUNLLGlDQUFlLEdBQXZCLFVBQXdCLE9BQVksRUFBRSxLQUFpQixFQUFFLElBQVMsRUFBRSxLQUFVO1FBQzVFLDRDQUE0QztRQUU1QywyREFBMkQ7UUFDM0QsSUFBSSxLQUFLLElBQUksSUFBSSxJQUFJLEtBQUssS0FBSyxFQUFFLEVBQUU7WUFDakMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBSyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssV0FBUSxDQUFDLENBQUM7WUFDbkUsT0FBTztTQUNSO1FBRUQsMEJBQTBCO1FBQzFCLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVyRiwyQkFBMkI7UUFDM0IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBSyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssV0FBUSxDQUFDLENBQUM7UUFFMUQsSUFBQSwwR0FLTCxFQUxPLFFBQUMsRUFBRSxRQUFDLENBS1Y7UUFFRixJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsVUFBUSxDQUFDLGtCQUFhLENBQUMsT0FBSSxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUNILGNBQUM7QUFBRCxDQUFDLEFBL0VELElBK0VDIn0=