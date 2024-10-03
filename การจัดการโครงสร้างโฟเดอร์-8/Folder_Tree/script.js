const folderStructure = {
    name: "Root",
    type: "folder",
    children: [
        {
            name: "Folder 1",
            type: "folder",
            children: [
                { name: "File 1.txt", type: "file" },
                { name: "File 2.txt", type: "file" }
            ]
        },
        {
            name: "Folder 2",
            type: "folder",
            children: [
                { name: "File 3.txt", type: "file" }
            ]
        }
    ]
};

// เพิ่มฟังก์ชัน addFolder เพื่อเพิ่มโฟลเดอร์ใหม่
function addFolder() {
  var folderName = document.getElementById("folderName").value.trim();
  if (folderName === "") {
      alert("Please enter a folder name.");
      return;
  }

  // สร้าง element div สำหรับโฟลเดอร์ใหม่
  var newFolder = document.createElement("div");
  newFolder.textContent = folderName;
  newFolder.classList.add("folder");

  // เพิ่มโฟลเดอร์ใหม่ลงใน div id "folderTree"
  document.getElementById("folderTree").appendChild(newFolder);

  // เคลียร์ค่าใน input field
  document.getElementById("folderName").value = "";
}

// เพิ่มฟังก์ชัน addFile เพื่อเพิ่มไฟล์ในโฟลเดอร์ที่เลือก
function addFile() {
  var fileName = document.getElementById("fileName").value.trim();
  if (fileName === "") {
      alert("Please enter a file name.");
      return;
  }

  var selectedFolder = document.querySelector(".folder.selected");
  if (!selectedFolder) {
      alert("Please select a folder.");
      return;
  }

  // สร้าง element div สำหรับไฟล์ใหม่
  var newFile = document.createElement("div");
  newFile.textContent = fileName;
  newFile.classList.add("file");

  // เพิ่มไฟล์ใหม่ลงในโฟลเดอร์ที่เลือก
  selectedFolder.appendChild(newFile);

  // เคลียร์ค่าใน input field
  document.getElementById("fileName").value = "";
}

// เพิ่มฟังก์ชัน removeFolder เพื่อลบโฟลเดอร์ที่เลือก
function removeFolder() {
  var selectedFolder = document.querySelector(".folder.selected");
  if (!selectedFolder) {
      alert("Please select a folder.");
      return;
  }

  // ลบโฟลเดอร์ที่เลือก
  selectedFolder.parentNode.removeChild(selectedFolder);
}

// เพิ่มฟังก์ชัน removeFile เพื่อลบไฟล์ที่เลือก
function removeFile() {
  var selectedFile = document.querySelector(".file.selected");
  if (!selectedFile) {
      alert("Please select a file.");
      return;
  }

  // ลบไฟล์ที่เลือก
  selectedFile.parentNode.removeChild(selectedFile);
}

// เพิ่มการตรวจสอบสำหรับการคลิกที่ div ของโฟลเดอร์และไฟล์
document.addEventListener("click", function(event) {
  // ถ้าคลิกที่ div ของโฟลเดอร์
  if (event.target.classList.contains("folder")) {
      // ลบ class "selected" ที่ div โฟลเดอร์ที่เคยถูกเลือกไว้ก่อนหน้านี้
      var selectedFolder = document.querySelector(".folder.selected");
      if (selectedFolder) {
          selectedFolder.classList.remove("selected");
      }
      // เพิ่ม class "selected" ให้กับ div โฟลเดอร์ที่ถูกคลิก
      event.target.classList.add("selected");
  }
  // ถ้าคลิกที่ div ของไฟล์
  else if (event.target.classList.contains("file")) {
      // ลบ class "selected" ที่ div ไฟล์ที่เคยถูกเลือกไว้ก่อนหน้านี้
      var selectedFile = document.querySelector(".file.selected");
      if (selectedFile) {
          selectedFile.classList.remove("selected");
      }
      // เพิ่ม class "selected" ให้กับ div ไฟล์ที่ถูกคลิก
      event.target.classList.add("selected");
  }
});



function createTreeElement(item) {
  const element = document.createElement("div");
  element.textContent = item.name;
  element.classList.add(item.type);
  if (item.type === "folder" && item.children) {
    item.children.forEach((child) => {
      const childElement = createTreeElement(child);
      element.appendChild(childElement);
    });
    
  }
  return element;
}


// Function to refresh the folder tree
function refreshFolderTree() {
    const folderTree = document.getElementById('folderTree');
    folderTree.innerHTML = ''; // Clear the existing tree

    // Recreate the tree
    const treeElement = createTreeElement(folderStructure);
    folderTree.appendChild(treeElement);
}



const folderTree = document.getElementById('folderTree');
const treeElement = createTreeElement(folderStructure);
folderTree.appendChild(treeElement);
