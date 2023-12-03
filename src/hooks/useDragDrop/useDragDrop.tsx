import { useCallback, useMemo, useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { v4 } from "uuid";

export const PLACEHOLDER: Item<Content> = {
    prefix: "placeholder",
    isPlaceholder: true,
    content: {
        id: v4(),
        name: "Drag an item here"
    }
};

export interface Content {
    id: string;
    name: string;
}

export interface Item<TContent extends Content> {
    prefix: string;
    isPlaceholder: boolean;
    content: TContent;
}

export interface DropArea<TContent extends Content> {
    id: string;
    title: string;
    items: Item<TContent>[];
}

export interface UseDragDropProps<TContent extends Content> {

    onItemsMoved: (newList: string, items: TContent[]) => Promise<void>;
    initialDropAreas: DropArea<TContent>[];
}

export interface UseDragDropData<TContent extends Content> {
    dropAreas: DropArea<TContent>[];
    onDragEnd: (result: DropResult) => void;
    moveAllItems: (to: string, from: string) => void;
    resetList: (list: DropArea<TContent>[]) => void;
    setDropAreas: (areas: DropArea<TContent>[]) => void;
}

export function ConvertToDragDropData<TContent extends Content>(headers: string[], data?: TContent[], filter?: (content: TContent, index: number) => boolean) {

    return (data && headers.map((header, idx) => {

        const listItems = (!filter ? data : data?.filter((d) => filter(d, idx))).map(item => ({
            prefix: "task",
            isPlaceholder: false,
            content: item
        } as Item<TContent>));
        return {
            id: idx.toString(),
            title: header,
            items: listItems?.length === 0 ? [PLACEHOLDER] : listItems
        } as DropArea<TContent>
    })) ?? [];
}

export function useDragDrop<TContent extends Content>({ initialDropAreas, onItemsMoved }: UseDragDropProps<TContent>): UseDragDropData<TContent> {

    const [dropAreas, setDropAreas] = useState<DropArea<TContent>[]>(initialDropAreas);

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

    const resetList = useCallback(async (list: DropArea<TContent>[]) => {
        setDropAreas(list);

        await Promise.all(list.map(async x => {
            const items = x.items
                .filter(x => !x.isPlaceholder)
                .map(y => y.content);

            if (items.length > 0) {
                await onItemsMoved?.(x.title, items);
            }
        }));
    }, [onItemsMoved]);

    const moveAllItems = useCallback(async (to: string, from: string) => {

        const listCopy = JSON.parse(JSON.stringify(dropAreas)) as typeof dropAreas;
        let toList = listCopy.find(x => x.title === to)!;
        let fromList = listCopy.find(x => x.title === from)!;

        const toPlaceholder = toList.items.find(x => x.isPlaceholder);
        const fromPlaceholder = fromList.items.find(x => x.isPlaceholder);
        if (!fromPlaceholder) {
            if (toPlaceholder) {
                toList.items = [];
            }
            toList.items = toList?.items.concat(fromList.items);
        }

        fromList.items = [PLACEHOLDER] as Item<TContent>[];
        setDropAreas(listCopy);

        await onItemsMoved?.(toList.title, toList.items.map(x => x.content));

    }, [setDropAreas, onItemsMoved, dropAreas]);

    const onDragEnd = useCallback(
        (result: DropResult) => {
            if (!result || !result.destination || !result.source) {
                return;
            }

            // Get the source day
            const listCopy = dropAreas.slice() as DropArea<TContent>[];
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
                destinationList.items = destinationList.items.filter(x => x.content.id !== destinationPlaceholder.content.id)
            }

            // add task to new day
            listCopy[result.destination.droppableId].items = addToList(
                destinationList.items,
                result.destination.index,
                removedElement
            );

            setDropAreas(listCopy);

            onItemsMoved?.(destinationList.title, [removedElement.content]);
        },
        [dropAreas, addToList, removeFromList, onItemsMoved]
    );

    return {
        dropAreas,
        onDragEnd,
        moveAllItems,
        resetList,
        setDropAreas
    }
}