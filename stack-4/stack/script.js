const stackContainer = document.getElementById("stack-container");
const block1 = document.querySelector("block1");
const block2 = document.querySelector("block2");
const maxStackSize = 6;
const statusMessage = document.getElementById("status-massage");
const countMessage = document.getElementById("count-massage");
const positionMessage = document.getElementById("position-massage");



block1.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData('text/plain', "block1");
});

block2.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData('text/plain', "block2");
});


stackContainer.addEventListener("dragover", (e) => {
    e.preventDefault(); // ต้องป้องกันการเกิดเหตุการณ์นี้เพื่อให้สามารถวางได้
});

stackContainer.addEventListener("drop", (e) => {
    e.preventDefault(); // ป้องกันการเกิดเหตุการณ์ปกติของการวาง
    const data = e.dataTransfer.getData("text/plain");
    if(stackContainer.childElementCount < maxStackSize){
        if (data === "block1") {
            const newBlock = block1.cloneNode(true); // สร้างโคลนของบล็อก
            stackContainer.appendChild(newBlock); // วางบล็อกลงในสแต็ก
        }else if (data === "block2") {
            const newBlock = block1.cloneNode(true); // สร้างโคลนของบล็อก
            stackContainer.appendChild(newBlock); // วางบล็อกลงในสแต็ก
        }
    }
    updateStatus();
});

stackContainer.addEventListener("dblclick", (e) => {
    if (
        e.target.classList.contains("block1"),
        e.target.classList.contains("block2")
    ){
        stackContainer.removeChild(e.target);
        updatestatus();
    }
});

function getStackSize() {
    return stackContainer.childElementCount;
}

function updateStatus() {
    const currentStackSize = getStackSize();
    countMessage.textContent =  `Count: ${currentStackSize}`;
    if (currentStackSize === 0) {
        statusMessage.textContent = "stack is empty.";
        positionMessage.textContent = "";
    }else if (currentStackSize === maxStackSize) {
        statusMessage.textContent = "stack is full.";
        positionMessage.textContent += `${blockType}(${i + 1})`;
    }else {
        positionMessage.textContent = "positions: ";
        const stackChildren = stackContainer.children;
        for (let i =0; i < stackChildren.length; i++) {
            const blockType = stackChildren[i].classList.contains("block1")
            ?"block1"
            :"block2";
            positionMessage.textContent += `${blockType}(${i + 1})`;
        }
    }
}
updateStatus();