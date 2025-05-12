export const ShopMarkerOverlay = ()=>{
    const customOverlay = function (options){
        this._element = <div>
            <h1> Hello World</h1>
        </div>;

        this.setPosition(options.position);
        this.setMap(options.map || null);
    }

    customOverlay.prototype = new window.naver.maps.OverlayView();
    customOverlay.prototype.constructor = customOverlay;

    customOverlay.prototype.setPosition = function (pos){
        this._position = pos;
        this.draw();
    }

    customOverlay.prototype.getPosition = function() {
        return this._position;
    };

    customOverlay.prototype.onAdd = function() {
        var overlayLayer = this.getPanes().overlayLayer;
        console.table(this._element);

        this._element.appendTo(overlayLayer);
    };

    customOverlay.prototype.draw = function() {
        if (!this.getMap()) {
            return;
        }

        var projection = this.getProjection(),
            position = this.getPosition(),
            pixelPosition = projection.fromCoordToOffset(position);

        this._element.css('left', pixelPosition.x);
        this._element.css('top', pixelPosition.y);
    };

    customOverlay.prototype.onRemove = function() {
        var overlayLayer = this.getPanes().overlayLayer;

        this._element.remove();
        this._element.off();
    };

    return customOverlay;
}