import { useEffect, useRef } from "react";
import * as NGL from "ngl";
import "./NglViewer.css";
interface ActiveStructure {
  fileName: string;
  downloadName: string;
}
interface InputType {
  activeStructure: ActiveStructure;
}
const NglViewer = ({ activeStructure }: InputType) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const stage = useRef<NGL.Stage | null>(null);

  useEffect(() => {
    if (!viewportRef.current) {
      return;
    }

    // Create NGL Stage object
    stage.current = new NGL.Stage(viewportRef.current);
  }, []);

  useEffect(() => {
    if (stage.current === null) {
      return;
    }
    if (activeStructure.fileName === "") {
      dialogRef.current?.close();
    } else {
      dialogRef.current?.showModal();
      stage.current.removeAllComponents();
      stage.current.loadFile(activeStructure.fileName).then((o) => {
        (o as NGL.Component).addRepresentation("cartoon", {});
        (o as NGL.Component).autoView();
        if (stage.current === null) {
          return;
        }
        stage.current.setParameters({ backgroundColor: "white" });
        stage.current.handleResize();
      });
    }
  }, [activeStructure]);

  return (
    <dialog id="structureViewerDialog" ref={dialogRef}>
      <div id="Nglviewport" ref={viewportRef} className="viewport"></div>
      <form>
        <a
          id="dl"
          className="dl"
          href={activeStructure.fileName}
          download={activeStructure.downloadName}
        >
          {activeStructure.downloadName}
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
