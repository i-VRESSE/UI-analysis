declare module "ngl" {
  interface StageParameters {
    backgroundColor: string;
  }

  namespace ColorMakerRegistry {
    function getScheme(schemeId: string, params?: any): any;
    function addScheme(scheme: any, schemeId: string): void;
  }

  class Selection {
    constructor(selection: string);
    parse(string: string): string;
  }

  class Component {
    setVisibility(value: boolean): void;
    autoView(duration?: number): void;
    addRepresentation(type: string, params?: any): RepresentationComponent;
    removeAllRepresentations(): void;
    setTransform(matrix: THREE.Matrix4): void;
  }

  class Stage {
    constructor(eid: HTMLElement, params?: StageParameters);
    loadFile(path: string | File | Blob): Promise<Component>;
    removeComponent(component: Component): void;
    setParameters(params: object): Component;
    autoView(duration?: number): void;
    handleResize(): void;
  }
}
