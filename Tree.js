export class Tree {
    constructor(children = []) {
        if (Array.isArray(children) && children.every((child) => child instanceof Tree)) {
            this.children = children;
        } else {
            console.log("ERROR. Tree should be a list of trees.");
        }
    }

    get numberOfNodes() {
        let s = 1;
        for (const child of this.children) {
            s += child.numberOfNodes;
        }
        return s;
    }

    get childrenNumber() {
        return this.children.length;
    }

    getChildAt(coordinates) {
        if (coordinates.length === 0) {
            return this;
        }
        if (coordinates.length === 1) {
            const [index] = coordinates;
            if (index > this.childrenNumber) {
                console.log("ERROR. Index is too large.");
                return null;
            }
            return this.children[index];
        }
        const [index, ...rest] = coordinates;
        return this.getChildAt([index]).getChildAt(rest);
    }

    convertToString() {
        return `{${this.children.map((child) => child.convertToString()).join(",")}}`;
    }

    isLeaf() {
        return this.childrenNumber === 0;
    }

    get height() {
        if (this.isLeaf()) {
            return 0;
        }
        return Math.max(...this.children.map((child) => child.height)) + 1;
    }

    addChild(child) {
        if (child instanceof Tree) {
            this.children.push(child);
            return this;
        }
        console.log("ERROR. Children has to be tree.");
        return null;
    }

    getParentOfChildAt(coordinates) {
        if (coordinates.length === 0) {
            console.log("ERROR. The root has no parent.");
            return null;
        }
        const copy = [...coordinates];
        copy.pop();
        const parent = this.getChildAt(copy);
        return parent;
    }

    removeChildAt(coordinates) {
        if (coordinates.length === 0) {
            console.log("ERROR. Cannot remove whole tree.");
            return null;
        }
        const copy = [...coordinates];
        const index = copy.pop();
        const parent = this.getChildAt(copy);
        parent.children.splice(index, 1);
        return this;
    }

    getParentOfChild(child) {
        if (child === this) {
            console.log("ERROR. The root has no parent.");
            return null;
        }
        if (this.children.includes(child)) {
            return this;
        }
        return this.children.find((parent) => parent.getParentOfChild(child));
    }

    static getRandomTree(options) {
        const root = new Tree();
        if (Object.keys(options).includes("maxHeight")) {
            const { maxHeight, maxChildren } = options;
            if (maxHeight === 0) {
                return root;
            }
            let rootChildNumber = Math.floor((maxChildren + 1) * Math.random());
            for (let i = 0; i < rootChildNumber; i++) {
                root.addChild(
                    Tree.getRandomTree({ maxHeight: maxHeight - 1, maxChildren })
                );
            }
            return root;
        } else if (Object.keys(options).includes("height")) {
            const { maxChildren, height } = options;
            if (height === 0) {
                return root;
            }
            let rootChildNumber = 1 + Math.floor(maxChildren * Math.random());
            let randomIndex = Math.floor(rootChildNumber * Math.random());
            for (let i = 0; i < rootChildNumber; i++) {
                if (i === randomIndex) {
                    root.addChild(
                        Tree.getRandomTree({ height: height - 1, maxChildren })
                    );
                } else {
                    root.addChild(
                        Tree.getRandomTree({ maxHeight: height - 1, maxChildren })
                    );
                }
            }
            return root;
        } else {
            console.log("ERROR! Options do not match.");
            return null;
        }
    }

    getDeepCopy() {
        const root = new Tree();
        if (this.isLeaf()) {
            return root;
        }
        for (const child of this.children) {
            root.addChild(child.getDeepCopy());
        }
        return root;
    }

    duplicateChildAt(coordinates, numberOfTimes) {
        const parent = this.getParentOfChildAt(coordinates);
        if (!parent) return;
        const child = this.getChildAt(coordinates);
        const index = coordinates[coordinates.length - 1];
        for (let i = 1; i <= numberOfTimes; i++) {
            const childCopy = child.getDeepCopy();
            parent.children.splice(index, 0, childCopy);
        }
        return this;
    }

    hydraOperationAt(coordinates, numberOfTimes) {
        const child = this.getChildAt(coordinates);
        if (!child.isLeaf()) return;
        const copy = [...coordinates];
        const index = copy.pop();
        const parent = this.getChildAt(copy);
        if (!parent) return;
        parent.children.splice(index, 1);
        this.duplicateChildAt(copy, numberOfTimes);
    }
}
