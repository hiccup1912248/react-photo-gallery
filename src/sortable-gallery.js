import React from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { Droppable, Draggable } from 'react-beautiful-dnd'
import Gallery from "react-photo-gallery";
import Photo from "./photo";

/* popout the browser and maximize to see more rows! -> */
const SortablePhoto = SortableElement(item => <Photo {...item} />);
const SortableGallery = SortableContainer(({ items, droppableId, index }) => (
    <Droppable droppableId={droppableId} index={index} >
        {(provided, snapshot) => (
            <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{ backgroundColor: snapshot.isDraggingOver ? 'skyblue' : 'white' }}
            >
                <Gallery photos={items} renderImage={props => (
                    <Draggable
                        draggableId={props.photo.id}
                        index={props.index}
                        key={props.index}
                    >
                        {(provided, snapshot) => (
                            <div
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                            >
                                <SortablePhoto {...props} />
                            </div>
                        )}
                    </Draggable>
                )} />
                {provided.placeholder}
            </div>
        )}
    </Droppable>
));

export default SortableGallery;