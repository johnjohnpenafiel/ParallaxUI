import { useEffect, useState } from "react";

import { Analytics } from "@vercel/analytics/react";

import ElementsPanel from "./components/ElementsPanel";
import PropertiesPanel from "./components/PropertiesPanel";
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

const production_base_url = import.meta.env.VITE_BASE_URL || "http://parallaxui.com";

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

      return `<iframe src="${production_base_url}/embed/${id}" width="${containerSize.width}" height="${containerSize.height}" style="border:none;background:transparent;" allowtransparency="true"></iframe>`;
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
          <div className="flex flex-col h-screen bg-background">
            {/* TOP BAR */}
            <div className="flex items-center justify-between px-8 py-2 bg-background">
              <h1 className="text-lg font-semibold text-foreground">
                PARALLAX UI
              </h1>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="flex flex-1 overflow-hidden bg-background relative">
              {/* LEFT WHITE SPACE */}
              <div className="w-8 bg-background"></div>

              {/* WORK AREA - SPANS TOP, LEFT, AND BOTTOM */}
              <div className="flex-1 bg-muted relative rounded-l-lg rounded-bl-lg">
                {/* CANVAS CONTAINER */}
                <div className="absolute left-8 top-8">
                  <div>
                    {/* CANVAS FRAME */}
                    <div
                      className="flex items-center justify-center overflow-hidden border border-border bg-card relative"
                      style={{
                        height: containerSize.height,
                        width: containerSize.width,
                      }}
                    >
                      <TiltBox
                        elements={elements}
                        selectedElement={selectedElement}
                        canvasSize={canvasSize}
                        forDesignOnly={forDesignOnly}
                      />

                      {/* Inner border for selected area */}
                      <div className="absolute inset-4 border border-border/50 pointer-events-none"></div>
                    </div>
                    <p className="text-center text-muted-foreground mt-2 text-sm font-medium">
                      Canvas
                    </p>
                  </div>
                </div>
              </div>

              {/* CUT-OFF SECTION WITH ELEMENTS NAVBAR */}
              <div
                className="w-20 rounded-r-lg rounded-br-lg"
                style={{
                  backgroundColor: "oklch(0.23 0 0)", // Slightly darker than muted (0.269)
                }}
              >
                {/* ELEMENTS NAVBAR */}
                <ElementsPanel
                  elements={elements}
                  addElement={addElement}
                  removeElement={removeElement}
                  onSelectedElement={onSelectedElement}
                  selectedElement={selectedElement}
                  updateElementName={updateElementName}
                />
              </div>

              {/* RIGHT SIDEBAR */}
              <PropertiesPanel
                selectedElement={selectedElement}
                handleElementSubmit={handleElementSubmit}
                exportDesign={exportDesign}
                setCanvasSize={setCanvasSize}
              />
            </div>

            {/* BOTTOM WHITE SPACE - SEPARATE FROM MAIN CONTENT */}
            <div className="h-8 bg-background"></div>
          </div>
        )}
        <Analytics />
      </div>
    </div>
  );
}

export default App;
