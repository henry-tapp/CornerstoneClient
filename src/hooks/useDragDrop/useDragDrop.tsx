import { useCallback, useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { v4 } from "uuid";

export const PLACEHOLDER: Item<Content> = {
    id: v4(),
    prefix: "placeholder",
    isPlaceholder: true,
    content: {
        name: "Drag an item here"
    }
};

export interface Content {
    name: string;
}

export interface Item<TContent extends Content> {

    id: string;
    prefix: string;
    isPlaceholder: boolean;
    content: TContent;
}

export interface DropArea<TContent extends Content> {
    id: string;
    title: string; //day
    items: Item<TContent>[]; // tasks
}

export interface UseDragDropProps<TContent extends Content> {

    onItemsMoved: (newList: string, items: TContent[]) => Promise<void>;
    dropAreas: DropArea<TContent>[];
}

export interface UseDragDropData<TContent extends Content> {
    elements: DropArea<TContent>[];
    onDragEnd: (result: DropResult) => void;
    moveAllItems: (to: string, from: string) => void;
    resetList: (list: DropArea<TContent>[]) => void;
}

export function useDragDrop<TContent extends Content>({ dropAreas, onItemsMoved }: UseDragDropProps<TContent>): UseDragDropData<TContent> {

    const [elements, setElements] = useState<DropArea<TContent>[]>(dropAreas);

    const addToList = useCallback((list: Item<TContent>[], index: number, element: any) => {
        const result = Array.from(list);
        result.splice(index, 0, element);
        return result;
    }, []);

    const removeFromList = useCallback((list: Item<TContent>[], index: number): [Item<TContent>, Item<TContent>[]] => {
        const result = Array.from(list);
        const [removed] = result.splice(index, 1);
        return [removed, result];
    }, []);

    const resetList = useCallback((list: DropArea<TContent>[]) => {
        setElements(list);
    }, []);

    const moveAllItems = useCallback((to: string, from: string) => {

        const listCopy = JSON.parse(JSON.stringify(elements)) as typeof elements;
        let unscheduled = listCopy.find(x => x.title === to)!;
        let dayToUnschedule = listCopy.find(x => x.title === from)!;

        const destinationPlaceholder = dayToUnschedule.items.find(x => x.isPlaceholder);
        if (!destinationPlaceholder) {
            unscheduled.items = unscheduled?.items.concat(dayToUnschedule.items);
        }

        dayToUnschedule.items = [PLACEHOLDER] as Item<TContent>[];
        setElements(listCopy);
    }, [setElements, elements]);

    const onDragEnd = useCallback(
        (result: DropResult) => {
            if (!result || !result.destination || !result.source) {
                return;
            }

            // Get the source day
            const listCopy = elements.slice() as DropArea<TContent>[];
            const sourceList = listCopy?.[result.source.droppableId] as DropArea<TContent>;

            // Remove it from the list
            const [removedElement, newSourceDay] = removeFromList(
                sourceList.items,
                result.source.index
            );

            // Add placeholder if necessary
            if (newSourceDay.length === 0) {
                newSourceDay.push(PLACEHOLDER as Item<TContent>);
            }

            // assign spliced tasks to source day tasks list
            listCopy[result.source.droppableId].items = newSourceDay;

            // Get destination list
            const destinationList = listCopy[result.destination.droppableId] as DropArea<TContent>;

            // remove placeholder if necessary
            const destinationPlaceholder = destinationList.items.find(x => x.isPlaceholder);
            if (destinationPlaceholder) {
                destinationList.items = destinationList.items.filter(x => x.id !== destinationPlaceholder.id)
            }

            // add task to new day
            listCopy[result.destination.droppableId].items = addToList(
                destinationList.items,
                result.destination.index,
                removedElement
            );

            setElements(listCopy);

            onItemsMoved?.(destinationList.title, [removedElement.content]);
        },
        [elements, addToList, removeFromList, onItemsMoved]
    );

    return {
        elements,
        onDragEnd,
        moveAllItems,
        resetList
    }
}