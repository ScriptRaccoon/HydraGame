import { Tree } from "./Tree.js";
import { drawTree } from "./drawMethods.js";

$("#drawBtn").click(() => draw());

draw();

function draw() {
    const height = parseInt($("#heightInput").val());
    const maxChildren = parseInt($("#maxChildrenInput").val());
    const tree = Tree.getRandomTree({ height, maxChildren });
    drawTree(tree);
    console.log(tree.getNumberOfNodes());
}

$("#infoBtn").click(() => {
    $("#infoBtn").toggleClass("active-btn");
    $("#drawArea, #infoPage, #form").toggle();
});
