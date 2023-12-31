import { FcFolder, FcOpenedFolder, FcPlus } from "react-icons/fc";
// import { TreeNode } from "../App";
import { AiOutlineCloseCircle } from "react-icons/ai";

export interface TreeNode {
  name: string;
  isOpen: boolean;
  id: string;
  child: TreeNode[] | [];
}

const FolderNode = ({
  folderData,
  folderOpenIconHandler,
  folderCreateCloseHandler,
}: {
  folderData: TreeNode;
  folderOpenIconHandler: (node: TreeNode) => void;
  folderCreateCloseHandler: (node: TreeNode, type: string) => void;
}) => {
  return (
    <>
      <div
        className="childRoots"
        onClick={() => folderOpenIconHandler(folderData)}
      >
        <div className="innrerContainer">
          <p>{folderData?.isOpen ? <FcOpenedFolder /> : <FcFolder />}</p>
          <h4>{folderData?.name}</h4>
        </div>
        <div className="iconContainer">
          {folderData.id !== "653b4de3407359826ad118e6" && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                folderCreateCloseHandler(folderData, "close");
              }}
            >
              <AiOutlineCloseCircle  />
            </span>
          )}
          <span
            onClick={(e) => {
              e.stopPropagation();
              folderCreateCloseHandler(folderData, "add");
            }}
          >
            <FcPlus />
          </span>
        </div>
      </div>
      {/* 
      {folderData.isOpen && folderData?.child.length > 0 && (
        <div style={{ marginLeft: "20px" }}>
          {folderData?.child.map((childNode, index) => (
            <FolderNode
              key={index}
              folderData={childNode}
              folderOpenIconHandler={folderOpenIconHandler}
              folderCreateCloseHandler={folderCreateCloseHandler}
            />
          ))}
        </div>
      )} */}
      {folderData.isOpen &&
        (folderData?.child?.length > 0 ? (
          <div style={{ marginLeft: "20px" }}>
            {folderData?.child.map((childNode, index) => (
              <FolderNode
                key={index}
                folderData={childNode}
                folderOpenIconHandler={folderOpenIconHandler}
                folderCreateCloseHandler={folderCreateCloseHandler}
              />
            ))}
          </div>
        ) : (
          <div style={{ marginLeft: "20px" }} className="childRoots">
            <p style={{ fontSize: "10px", opacity: ".5" ,color: "gray"}}>Empty</p>
          </div>
        ))}
    </>
  );
};

export default FolderNode;
