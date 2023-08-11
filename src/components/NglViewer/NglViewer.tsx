import { useEffect, useRef } from "react";
import * as NGL from "ngl";
import "./NglViewer.css";

const NglViewer = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!viewportRef.current) {
      return;
    }

    // Create NGL Stage object
    const stage = new NGL.Stage(viewportRef.current);

    // Handle window resizing
    const handleResize = () => {
      if (stage) {
        stage.handleResize();
      }
    };
    window.addEventListener("resize", handleResize, false);

    return () => {
      // Clean up
      window.removeEventListener("resize", handleResize);
      stage.dispose();
    };
  }, []);
  return (
    <dialog id="structureViewerDialog" ref={dialogRef}>
      <div id="Nglviewport" ref={viewportRef} className="viewport"></div>
      <form>
        <a id="dl" className="dl"></a>
        <button
          id="Xbutton"
          className="Xbutton"
          value="cancel"
          formMethod="dialog"
        >
          X
        </button>
      </form>
    </dialog>
  );
};

export default NglViewer;
