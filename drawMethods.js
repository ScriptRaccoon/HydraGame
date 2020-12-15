const drawArea = $("#drawArea");

export function drawLine(posA, posB, thickness = 5) {
    const length = Math.sqrt(Math.pow(posA.x - posB.x, 2) + Math.pow(posA.y - posB.y, 2));
    const angle = (Math.atan2(posB.y - posA.y, posB.x - posA.x) * 180) / Math.PI;
    $("<div></div>")
        .addClass("line")
        .css({
            transformOrigin: "top left",
            transform: `rotate(${angle - 90}deg) translateX(-50%)`,
            width: thickness + "px",
            height: length + "px",
            left: posA.x,
            top: posA.y,
        })
        .appendTo(drawArea);
}

const depthOffset = 100;

let minx, maxy, totalHeight;

let duplicateNumber = 1;

export function drawTree(tree) {
    minx = 0;
    maxy = 0;
    drawArea.html("");
    totalHeight = tree.height;
    $("#heightSpan").text(totalHeight);
    $("#nodeSpan").text(tree.numberOfNodes);
    drawSubTree(tree, tree, { x: 0, y: 0 }, 0, []);
    $("#drawArea > *").each(function () {
        const left = parseInt($(this).css("left"));
        $(this).css("left", left - minx);
    });
    $("<div></div>").addClass("block").css("top", maxy).appendTo(drawArea);
}

function drawSubTree(tree, subtree, pos, depth, coordinates) {
    const childNr = subtree.children.length;
    for (let i = 0; i < childNr; i++) {
        const offset = 70 * (i - (childNr - 1) / 2) * (totalHeight - depth);
        const newPos = { x: pos.x + offset, y: pos.y + depthOffset };
        minx = Math.min(minx, newPos.x);
        maxy = Math.max(maxy, newPos.y);
        const newCoordinates = [...coordinates, i];
        drawLine(pos, newPos);
        drawSubTree(tree, subtree.children[i], newPos, depth + 1, newCoordinates);
    }

    $("<div></div>")
        .addClass("head")
        .css({
            left: pos.x,
            top: pos.y,
        })
        .appendTo(drawArea)
        .click(function () {
            tree.hydraOperationAt(coordinates, duplicateNumber);
            duplicateNumber++;
            drawTree(tree);
            if (tree.isLeaf()) {
                window.alert("You won!");
                duplicateNumber = 1;
            }
        });
}
