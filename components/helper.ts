import { TreeNode } from "../App";

export const FolderDataSet: TreeNode = {
  name: "Root",
  isOpen: false,
  id: "1",
  child: [
    {
      name: "Folder 1",
      isOpen: false,
      id: "2",
      child: [
        {
          name: "Folder 1.1",
          isOpen: false,
          id: "4",
          child: [],
        },
      ],
    },
    {
      name: "Folder 2",
      isOpen: false,
      id: "3",
      child: [
        {
          name: "Folder 2.1",
          isOpen: false,
          id: "5",
          child: [],
        },
        {
          name: "Folder 2.2",
          isOpen: false,
          id: "6",
          child: [
            {
              name: "Folder 2.2.1",
              isOpen: false,
              id: "7",
              child: [
                {
                  name: "Folder 2.2.1.1",
                  isOpen: false,
                  id: "8",
                  child: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const toggleFolder = (
  id: string,
  folderData: TreeNode,
  setFolderData: (node: TreeNode) => void
) => {
  const updateNodeToggle = (child: TreeNode) => {
    if (child.id === id) {
      if (child.isOpen && child.child.length > 0) {
        closeNextAllChildNode(child);
      } else {
        child.isOpen = !child.isOpen;
      }
    } else if (child.child) {
      child.child.forEach(updateNodeToggle);
    }
  };
  const updatedData = { ...folderData };
  updateNodeToggle(updatedData);
  setFolderData(updatedData);
};

const closeNextAllChildNode = (child: TreeNode): void => {
  child.isOpen = false;
  if (child.child.length > 0) {
    child.child.forEach(closeNextAllChildNode);
  }
};

export const deleteFolder = (
  id: string,
  folderData: TreeNode,
  setFolderData: (node: TreeNode) => void,
  cb: () => void
) => {
  const updateNode = (child: TreeNode) => {
    const index = child?.child.findIndex((i) => i.id === id);
    if (index === -1) {
      child.child.forEach(updateNode);
    } else {
      child?.child.splice(index, 1);
    }
  };
  const updatedData = { ...folderData };
  updateNode(updatedData);
  setFolderData(updatedData);
  cb?.();
};

export const AddFolder = (
  id: string,
  folderName: string,
  newFolderId: string,
  folderData: TreeNode,
  setFolderData: (node: TreeNode) => void,
  cb: () => void
) => {
  const newObject: TreeNode = {
    name: folderName,
    isOpen: false,
    id: newFolderId,
    child: [] as TreeNode[],
  };

  if (folderData.name === "Root" && folderData.id === id) {
    (folderData.child as TreeNode[]).push(newObject);
  } else {
    const updateNode = (child: TreeNode) => {
      const index = child?.child.findIndex((i) => i.id === id);
      if (index === -1) {
        child.child.forEach(updateNode);
      } else {
        (child?.child[index].child as TreeNode[]).push(newObject);
      }
    };
    const updatedData = { ...folderData };
    updateNode(updatedData);
    setFolderData(updatedData);
  }
  cb?.();
};
