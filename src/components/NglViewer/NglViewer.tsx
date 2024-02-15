import { useEffect, useRef } from "react";
import { Stage } from "ngl";
import "./NglViewer.css";

interface InputType {
  activeStructure: string;
}
const NglViewer = ({ activeStructure }: InputType) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const stage = useRef<Stage | null>(null);

  useEffect(() => {
    if (!viewportRef.current) {
      return;
    }

    // Create Stage object
    stage.current = new Stage(viewportRef.current);
  }, []);

  const filename = activeStructure.split("/").pop();

  useEffect(() => {
    if (stage.current === null) {
      return;
    }
    if (activeStructure === "") {
      dialogRef.current?.close();
    } else {
      dialogRef.current?.showModal();
      stage.current.removeAllComponents();
      stage.current.loadFile(activeStructure).then((o) => {
        if (o === undefined) {
          console.error("Could not load file");
          return;
        }
        o.addRepresentation("cartoon", { sele: "protein" });
        o.addRepresentation("ball+stick", { sele: "ligand" });

        o.autoView();

        if (stage.current === null) {
          return;
        }
        let backgroundColor = "white";
        if (document?.documentElement?.classList.contains("dark")) {
          backgroundColor = "black";
        } else if (document?.documentElement?.classList.contains("light")) {
          backgroundColor = "white";
        } else if (window?.matchMedia("(prefers-color-scheme: dark)").matches) {
          backgroundColor = "black";
        }
        stage.current.setParameters({ backgroundColor });
        stage.current.handleResize();
      });
    }
  }, [activeStructure]);

  return (
    <dialog id="structureViewerDialog" ref={dialogRef}>
      <div id="Nglviewport" ref={viewportRef} className="viewport"></div>
      <form>
        <a id="dl" className="dl" href={activeStructure} download={filename}>
          {filename}
        </a>
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
