import { useEffect, useState } from "react";

import { Box, Typography } from "@mui/material";

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
    <div>
      <div className="mobile-only">
        <MobileScreen />
      </div>
      <div className="desktop-only">
        {/* STARTING CANVAS CONFIGURATION FORM */}
        {!canvasSize ? (
          <CanvasForm setCanvasSize={setCanvasSize} />
        ) : (
          <Box sx={{ display: "flex" }}>
            {/* LEFT SIDEBAR */}
            <LeftSidebar
              elements={elements}
              addElement={addElement}
              removeElement={removeElement}
              onSelectedElement={onSelectedElement}
              selectedElement={selectedElement}
              updateElementName={updateElementName}
            />
            {/* MIDDLE AREA */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                width: "100%",
              }}
              className="bg-muted"
            >
              <div>
                {/* CONTAINER BOX */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: containerSize.height,
                    width: containerSize.width,
                    backgroundColor: "#696969",
                    overflow: "hidden",
                  }}
                >
                  <TiltBox
                    elements={elements}
                    selectedElement={selectedElement}
                    canvasSize={canvasSize}
                    forDesignOnly={forDesignOnly}
                  />
                </Box>
                <Typography
                  style={{
                    textAlign: "center",
                    color: "#888888",
                  }}
                >
                  {`${containerSize.width} x ${containerSize.height}`}
                </Typography>
              </div>
            </Box>
            {/* RIGHT SIDEBAR */}
            <RightSidebar
              selectedElement={selectedElement}
              handleElementSubmit={handleElementSubmit}
              exportDesign={exportDesign}
              setCanvasSize={setCanvasSize}
            />
          </Box>
        )}
        <Analytics />
      </div>
    </div>
  );
}

export default App;
