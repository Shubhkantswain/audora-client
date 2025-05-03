import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "./ui/resizable";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer"
import { FastForward, Heart, Pause, Rewind, Volume2 } from "lucide-react";
import { useState } from "react";

const ResizableLayout = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="h-screen flex flex-col bg-black overflow-hidden">
      <ResizablePanelGroup direction="horizontal" className="flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <ResizablePanel
          defaultSize={20}
          minSize={10}
          maxSize={20}
          className="h-full hidden md:block"
        >
          <div className="bg-[#121212] h-full overflow-y-auto p-4 mx-0">
            <h2 className="font-bold mb-4">Left Sidebar</h2>
            <p>This sidebar should be resizable</p>
          </div>
        </ResizablePanel>

        <ResizableHandle className="hidden md:block" />

        {/* Main Content Area */}
        <ResizablePanel defaultSize={80} className="flex flex-col h-full">
          {/* Header - spans full width */}
          <div className="bg-[#000000] text-white p-4 h-16 flex-shrink-0 flex items-center justify-center w-full">
            <h1 className="text-xl font-bold">Header - Not Resizable</h1>
          </div>

          {/* Scrollable content area */}
          <div className="flex-1 overflow-y-auto">
            <ResizablePanelGroup direction="horizontal" className="h-full">
              {/* Main Content */}
              <ResizablePanel
                defaultSize={75}
                minSize={30}
                className="h-full"
              >
                <div className="bg-[#121212] md:rounded-2xl overflow-y-auto p-4 h-full md:ml-1 lg:mr-1">
                  <h2 className="font-bold mb-4">Main Content</h2>
                  <p>This area is resizable</p>
                  <div className="pb-20"> {/* Add padding to prevent content from being hidden behind footer */}
                    {Array(20)
                      .fill(0)
                      .map((_, i) => (
                        <p key={i} className="mb-2">
                          Sample content line {i + 1}
                        </p>
                      ))}

                    <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
                      <DrawerContent className="h-screen max-h-screen rounded-none bg-black p-0 overflow-hidden">
                        hellooooo
                      </DrawerContent>
                    </Drawer>
                  </div>
                </div>
              </ResizablePanel>

              <ResizableHandle className="hidden lg:block" />

              {/* Right Sidebar */}
              <ResizablePanel
                defaultSize={35}
                minSize={25}
                maxSize={35}
                className="h-full hidden lg:block"
              >
                <div className="bg-[#121212] rounded-2xl overflow-y-auto p-4 h-full mx-0 flex flex-col mr-2">
                  <h2 className="font-bold mb-4">Right Sidebar</h2>
                  <p>This sidebar should be resizable</p>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>

          {/* Audio Player (shown on all screens) */}
          <div className="bg-[#121212] md:bg-transparent flex-shrink-0" onClick={() => setIsOpen(true)}>
            <div className="bg-[#7561F7] md:ml-1 rounded-full md:rounded-none p-4 h-20">
              <div className="flex items-center justify-between h-full">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 bg-[#333] rounded"></div>
                  <div>
                    <p className="text-sm font-medium text-white">Song Title</p>
                    <p className="text-xs text-gray-300">Artist Name</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="text-white hover:text-gray-300">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6 4l10 6-10 6V4z" />
                    </svg>
                  </button>
                  <button className="text-white hover:text-gray-300">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 1.01 4.5 2.09C13.09 4.01 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Footer */}
          <div className="md:hidden bg-[#000000] border-t border-[#282828] p-2 flex-shrink-0">
            <div className="flex justify-around items-center">
              <button className="flex flex-col items-center p-2 text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                <span className="text-xs mt-1">Home</span>
              </button>
              <button className="flex flex-col items-center p-2 text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd" />
                </svg>
                <span className="text-xs mt-1">Search</span>
              </button>
              <button className="flex flex-col items-center p-2 text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                </svg>
                <span className="text-xs mt-1">Library</span>
              </button>
              <button className="flex flex-col items-center p-2 text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
                <span className="text-xs mt-1">Settings</span>
              </button>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default ResizableLayout