const drawArea = $("#drawArea");

export function drawLine(posA, posB) {
    const length = Math.sqrt(Math.pow(posA.x - posB.x, 2) + Math.pow(posA.y - posB.y, 2));
    const angle = (Math.atan2(posB.y - posA.y, posB.x - posA.x) * 180) / Math.PI;
    $("<div></div>")
        .addClass("line")
        .css({
            transformOrigin: "top left",
            transform: `rotate(${angle - 90}deg) translateX(-50%)`,
            height: length + "px",
            left: posA.x,
            top: posA.y,
        })
        .appendTo(drawArea);
}

const offsetY = 300;
const totalWidth = 1800;
let height;
let maxy = 0;

let duplicateNumber = 1;

export function drawTree(tree) {
    maxy = 0;
    drawArea.html("");
    height = tree.height;
    $("#heightSpan").text(height);
    $("#nodeSpan").text(tree.numberOfNodes);
    drawSubTree(tree, tree, 0, [], { x: totalWidth / 2, y: 0 }, [0, totalWidth]);
    $("<div></div>").addClass("block").css("top", maxy).appendTo(drawArea);
}

function drawSubTree(tree, subtree, depth, coordinates, rootPos, xArea) {
    const [a, b] = xArea;
    const childCount = subtree.children.length;
    for (let i = 0; i < childCount; i++) {
        const childxArea = [
            a + (i * (b - a)) / childCount,
            a + ((i + 1) * (b - a)) / childCount,
        ];
        const childPos = {
            x: (childxArea[0] + childxArea[1]) / 2,
            y: rootPos.y + offsetY / (depth + 1),
        };
        maxy = Math.max(childPos.y, maxy);
        const newCoordinates = [...coordinates, i];
        drawLine(rootPos, childPos, 2);
        drawSubTree(
            tree,
            subtree.children[i],
            depth + 1,
            newCoordinates,
            childPos,
            childxArea
        );
    }

    const headSize = Math.max(2, 10 - depth);
    $("<div></div>")
        .addClass("head")
        .css({
            left: rootPos.x,
            top: rootPos.y,
            width: headSize + "px",
            height: headSize + "px",
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
