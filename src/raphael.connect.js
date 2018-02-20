Raphael.fn.connect = function (obj1, obj2, path, attribs) {
    // list of paths each object has
    if (!obj1.connections) obj1.connections = [];
    if (!obj2.connections) obj2.connections = [];
    // get the bounding box of each object
    var box1 = obj1.getBBox();
    var box2 = obj2.getBBox();
    // create a line/path from object 1 to object 2
    var p = path || this.path("M" + (box1.x + box1.width / 2) + ","
            + (box1.y + box1.height / 2) + "L" + (box2.x + box2.width / 2)
            + "," + (box2.y + box2.height / 2));
    // adjust attributes of the path
    p.attr(attribs || {stroke: 'black'});
    // set the start and end element for this path
    p.startElement = obj1;
    p.endElement = obj2;
    // add the path to each of the object
    obj1.connections.push(p);
    obj2.connections.push(p);
    // mark each object as being connected
    obj1.connected = true;
    obj2.connected = true;

    // listen for the Raphael frame event
    eve.on("raphael.drag.move", function (obj) {
        // if the object the frame event is fired on is connected
        if (this.connected) {
            // for each connection on this object
            for (var c in this.connections) {
                var path = this.connections[c]; // temp path
                var b1 = path.startElement.getBBox(true); // get the current
                // location of start
                // element
                var b2 = path.endElement.getBBox(true);// get the current location
                // of end element
                // move the path to the new locations
                path.attr({
                    path: "M " + (b1.x + b1.width / 2) + " "
                    + (b1.y + b1.height / 2) + "L "
                    + (b2.x + b2.width / 2) + " "
                    + (b2.y + b2.height / 2),
                    opacity: Math.max(path.startElement.attr('opacity'),
                        path.endElement.attr('opacity'))
                });
            }
        }
    });

    return p;
};
