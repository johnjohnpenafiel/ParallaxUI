import { useEffect, useState } from "react";

import { Analytics } from "@vercel/analytics/react";

import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";
import TiltBox from "./components/TiltBox";
import "./App.css";

import { ElementFormData } from "./components/ElementForm";
import CanvasForm from "./components/CanvasForm";
import { calculateMaxSize } from "./utils/calculateMaxSize";
import { MobileScreen } from "./utils/MobileScreen";

export type CanvasType = {
  width: number;
  height: number;
};

export type ElementType = {
  uid: number;
  name: string;
  height: number;
  width: number;
  color: string;
  depth: number;
  x: number;
  y: number;
};

// FRONTEND URLs in App.tsx [exportDesign function],
const production_base_url = "http://parallaxui.com";

//const development_base_url = "http://localhost:5173";

// SET ALWAYS TO TRUE, BUT UNDEFINED ON PREVIEW.TSX
const forDesignOnly = true;

function App() {
  // const [darkMode, setDarkMode] = useState(true);

  const [canvasSize, setCanvasSize] = useState<CanvasType | null>(null);
  const [elements, setElements] = useState<ElementType[]>([]);
  const [selectedElement, setSelectedElement] = useState<ElementType | null>(
    null
  );
  const [containerSize, setContainerSize] = useState<CanvasType>({
    width: 0,
    height: 0,
  });

  const addElement = (): void => {
    const elementCount = elements.length + 1;
    const newElement: ElementType = {
      uid: Date.now(),
      name: `Element ${elementCount}`,
      height: 100,
      width: 100,
      color: "#303030",
      depth: 0,
      x: 0,
      y: 0,
    };
    setElements([...elements, newElement]);
    setSelectedElement(newElement);
  };

  const updateElementName = (uid: number, newName: string) => {
    setElements((prevElements) =>
      prevElements.map((element) =>
        element.uid === uid ? { ...element, name: newName } : element
      )
    );
  };

  const removeElement = (uid: number): void => {
    setElements(elements.filter((element: ElementType) => element.uid !== uid));
  };

  const onSelectedElement = (element: ElementType) => {
    setSelectedElement(element);
  };

  const handleElementSubmit = (uid: number, data: ElementFormData) => {
    setElements((prevElements) =>
      prevElements.map((element) =>
        element.uid === uid ? { ...element, ...data } : element
      )
    );
  };

  // EXPORT FUNCTION
  const exportDesign = async () => {
    console.log(`VITE API URL: ${import.meta.env.VITE_API_URL}/designs`);

    try {
      const designData = { elements, containerSize, canvasSize };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/designs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: designData }),
      });

      if (!response.ok) throw new Error("Failed to save design");

      const { id } = await response.json();

      return `<iframe src="${production_base_url}/embed/${id}" width="${containerSize.width}" height="${containerSize.height}"></iframe>`;
    } catch (error) {
      console.error("Error exporting design:", error);
      return null;
    }
  };

  // CALCULATES CONTAINER SIZE DEPENDING ON CANVAS WIDTH AND HEIGHT
  useEffect(() => {
    if (canvasSize) {
      const maxSize = calculateMaxSize(
        canvasSize.width,
        canvasSize.height,
        20, // Default tiltMaxAngleX
        20 // Default tiltMaxAngleY
      );
      setContainerSize(maxSize);
    }
  }, [canvasSize]);

  // -----------------------------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-background">
      <div className="mobile-only">
        <MobileScreen />
      </div>
      <div className="desktop-only">
        {/* STARTING CANVAS CONFIGURATION FORM */}
        {!canvasSize ? (
          <CanvasForm setCanvasSize={setCanvasSize} />
        ) : (
          <div className="flex flex-col h-screen">
            {/* TOP BAR */}
            <div className="flex items-center justify-between px-6 py-4 bg-secondary border-b border-border">
              <h1 className="text-xl font-semibold text-foreground">
                PARALLAX UI
              </h1>
              <button
                onClick={exportDesign}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Export
              </button>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="flex flex-1 overflow-hidden">
              {/* LEFT SIDEBAR */}
              <LeftSidebar
                elements={elements}
                addElement={addElement}
                removeElement={removeElement}
                onSelectedElement={onSelectedElement}
                selectedElement={selectedElement}
                updateElementName={updateElementName}
              />

              {/* MIDDLE AREA - CANVAS */}
              <div className="flex-1 flex items-center justify-center bg-muted p-8">
                <div>
                  {/* CONTAINER BOX */}
                  <div
                    className="flex items-center justify-center overflow-hidden"
                    style={{
                      height: containerSize.height,
                      width: containerSize.width,
                      backgroundColor: "#696969",
                    }}
                  >
                    <TiltBox
                      elements={elements}
                      selectedElement={selectedElement}
                      canvasSize={canvasSize}
                      forDesignOnly={forDesignOnly}
                    />
                  </div>
                  <p className="text-center text-muted-foreground mt-2">
                    {`${containerSize.width} x ${containerSize.height}`}
                  </p>
                </div>
              </div>

              {/* RIGHT SIDEBAR */}
              <RightSidebar
                selectedElement={selectedElement}
                handleElementSubmit={handleElementSubmit}
                exportDesign={exportDesign}
                setCanvasSize={setCanvasSize}
              />
            </div>
          </div>
        )}
        <Analytics />
      </div>
    </div>
  );
}

export default App;
