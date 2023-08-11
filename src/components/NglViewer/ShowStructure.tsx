import { Stage, Component } from "ngl";

const ShowStructure = (fileName: string, downloadName: string) => {
  const dialog = document.getElementById(
    "structureViewerDialog"
  ) as HTMLDialogElement;
  const stage = new Stage("Nglviewport");
  if (!dialog || !stage) {
    return;
  }
  const dlElement = dialog.querySelector("#dl") as HTMLAnchorElement | null;
  if (dlElement) {
    dlElement.setAttribute("href", fileName);
    dlElement.textContent = downloadName;
    dlElement.setAttribute("download", downloadName);
  }
  dialog.showModal();
  stage.loadFile(fileName).then((o) => {
    (o as Component).addRepresentation("cartoon", {});
    (o as Component).autoView();
    stage.setParameters({ backgroundColor: "white" });
    stage.handleResize();
  });
};
export default ShowStructure;
