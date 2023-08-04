import { useEffect, useRef } from 'react';
import * as NGL from 'ngl';
import "./NglViewer.css"

interface StructureViewerProps {
  fileName: string;
  downloadName: string;
}

const StructureViewer = ({ fileName, downloadName }: StructureViewerProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<NGL.Stage | null>(null);

  useEffect(() => {
    if (!viewportRef.current) {
      return;
    }

    // Create NGL Stage object
    stageRef.current = new NGL.Stage(viewportRef.current);

    // Handle window resizing
    const handleResize = () => {
      if (stageRef.current) {
        stageRef.current.handleResize();
      }
    };
    window.addEventListener('resize', handleResize, false);

    return () => {
      // Clean up event listeners on unmount
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const showStructure = () => {
    if (!dialogRef.current) {
      return;
    }

    const dlElement = dialogRef.current.querySelector('#dl') as HTMLAnchorElement | null;
    if (dlElement) {
      dlElement.setAttribute('href', fileName);
      dlElement.textContent = downloadName;
      dlElement.setAttribute('download', downloadName);
    }

    dialogRef.current.showModal();

    if (stageRef.current) {
      stageRef.current.loadFile(fileName).then((o) => {
        o.addRepresentation('cartoon');
        o.autoView();
        stageRef.current?.setParameters({ backgroundColor: 'white' });
        stageRef.current?.handleResize();
      });
    }
  };

  return (
    <div>
      <span>&#x1F441;&nbsp;
        <a id="viewbutton" onClick={showStructure} className="viewbutton">View</a>
      </span>
      <body>
        <dialog id="structureViewerDialog" ref={dialogRef}>
          <div id="viewport" ref={viewportRef} className="viewport"></div>
          <form>
              <a id="dl" className="dl"></a>
              <button id="Xbutton"
                      className="Xbutton"
                      value="cancel"
                      formMethod="dialog">
                      X
              </button>
          </form>
        </dialog>
      </body>
    </div>
  );
};

export default StructureViewer;
