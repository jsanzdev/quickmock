import { ComboBoxShape } from "@/common/components/front-components";
import { createRef, useState } from "react";
import { Layer, Stage, Transformer } from "react-konva";
import { ShapeModel, createShape } from "./canvas.model";
import { useSelection } from "./use-selection.hook";
import Konva from "konva";

export const CanvasPod = () => {
  const [shapes, setShapes] = useState<ShapeModel[]>([
    createShape(10, 10, 200, 50),
    createShape(90, 170, 250, 50),
  ]);

  const { shapeRefs, transformerRef, handleSelected } = useSelection(shapes);

  const handleDragEnd =
    (id: string) => (e: Konva.KonvaEventObject<DragEvent>) => {
      const { x, y } = e.target.position();
      setShapes((prevShapes) =>
        prevShapes.map((shape) =>
          shape.id === id ? { ...shape, x, y } : shape
        )
      );
    };

  return (
    <>
      {/*TODO: harcoded border, once final layout is ready, remove this*/}
      <div style={{ border: "1px solid black" }}>
        {/*TODO: right now harcoded values, remove this once we have final layout*/}
        <Stage width={1024} height={800}>
          <Layer>
            {
              /* TODO compentize and simplify this */
              shapes.map((shape) => {
                if (!shapeRefs.current[shape.id]) {
                  shapeRefs.current[shape.id] = createRef();
                }

                return (
                  <ComboBoxShape
                    id={shape.id}
                    key={shape.id}
                    x={shape.x}
                    y={shape.y}
                    width={shape.width}
                    height={shape.height}
                    draggable
                    onSelected={handleSelected}
                    ref={shapeRefs.current[shape.id]}
                    onDragEnd={handleDragEnd(shape.id)}
                  />
                );
              })
            }
            <Transformer ref={transformerRef} />
          </Layer>
        </Stage>
      </div>
    </>
  );
};
