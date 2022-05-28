import { useState, useRef } from "react";
import "./App.css";
import AppleMenu from "./components/content/appleMenu/AppleMenu";
import FolderContent from "./components/content/folderContent/FolderContent";
import Folders from "./components/content/folders/Folders";
import MenuBar from "./components/menuBar/MenuBar";
import StatusBar from "./components/statusBar/StatusBar";
import SearchTab from "./components/searchTab/SearchTab";

const App = () => {
  const [isAppleMenuOpen, setIsAppleMenuOpen] = useState(false);
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const [isSearchTabOpen, setIsSearchTabOpen] = useState(false);

  const bgRef = useRef(null);

  const toggleAppleMenu = () => {
    setIsAppleMenuOpen(!isAppleMenuOpen);
  };

  const closeAppleMenu = () => {
    if (isAppleMenuOpen) {
      setIsAppleMenuOpen(false);
    }
  };

  const openFolderContent = () => {
    setIsFolderOpen(true);
  };

  const closeFolderContent = () => {
    setIsFolderOpen(false);
  };

  const toggleSearchTab = () => {
    setIsSearchTabOpen(!isSearchTabOpen);
  };

  const closeSearchTab = () => {
    setIsSearchTabOpen(false);
  };

  const toggleWallpaper = () => {
    // toggle the background image
    bgRef.current.classList.toggle("bg-image");
  }

  return (
    <>
      <div className="wrapper" ref={bgRef}>
        <StatusBar toggleAppleMenu={toggleAppleMenu} toggleSearchTab={toggleSearchTab} toggleWallpaper={toggleWallpaper}/>
        <div className="inner_wrapper" onClick={closeAppleMenu}>
          <Folders openFolderContent={openFolderContent} />
          <FolderContent
            isFolderOpen={isFolderOpen}
            closeFolderContent={closeFolderContent}
          />
          <SearchTab isSearchTabOpen={isSearchTabOpen} closeSearchTab={closeSearchTab}/>
          <AppleMenu isAppleMenuOpen={isAppleMenuOpen} />
        </div>
        <MenuBar />
      </div>
    </>
  );
};

export default App;
