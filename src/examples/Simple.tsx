import {useCallback, useRef, useState} from "react";
import {useFixedSizeList} from "../hooks/useFixedSizeList";

/*
Фичи:
- только горизонтальная виртуализация
- фиксированный размер элементов
- overscan
- isScrolling
*/

const items = Array.from({length: 10_000}, (_, index) => ({
    id: Math.random().toString(36).slice(2),
    text: String(index),
}));


const itemHeight = 40;
const containerHeight = 600;

export function Simple() {
    const [listItems, setListItems] = useState(items);
    const scrollElementRef = useRef<HTMLDivElement | null>(null);

    const {
        virtualItems,
        totalHeight,
        isScrolling
    } = useFixedSizeList({
        itemHeight,
        itemsCount: items.length,
        listHeight: containerHeight,
        getScrollElement: useCallback(() => scrollElementRef.current, [])
    })


    return (
        <div style={{padding: "0 12px"}}>
            <h1>List</h1>
            <div style={{marginBottom: 12}}>
                <button
                    onClick={() => setListItems((items) => items.slice().reverse())}
                >
                    reverse
                </button>
            </div>
            <div
                ref={scrollElementRef}
                style={{
                    height: containerHeight,
                    overflow: "auto",
                    border: "1px solid lightgrey",
                    position: 'relative'
                }}
            >
                <div style={{height: totalHeight}}>
                    {virtualItems.map((virtualItem) => {
                        const item = listItems[virtualItem.index]!;

                        return (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    transform: `translateY(${virtualItem.offsetTop}px)`,
                                    height: itemHeight,
                                    padding: "6px 12px",
                                }}
                                key={item.id}
                            >
                                {isScrolling ? "Scrolling..." : item.text}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
