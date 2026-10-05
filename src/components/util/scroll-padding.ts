/**
 * `scroll-padding-bottom` on a scrolling box, shared between the things that
 * lie over its bottom edge.
 *
 * Each of them saves what was there and puts it back when it leaves. Done one
 * by one that goes wrong as soon as two overlap in time: the second saves the
 * first one's value as "what was there", and if the first leaves first, the
 * second later restores a value nobody owns any more. Here the box's own
 * value is saved once, the largest request is what is set, and the box gets
 * its own value back when the last request is released.
 */

interface Reservation {
    original: string;
    requests: Map<symbol, number>;
}

const reservations = new WeakMap<HTMLElement, Reservation>();

function apply(container: HTMLElement, reservation: Reservation): void {
    const largest = Math.max(0, ...reservation.requests.values());
    container.style.scrollPaddingBottom = `${largest}px`;
}

/**
 * Asks for room at the bottom of `container`. `set` gives or changes the
 * amount in px; `release` withdraws the request. Call it in the browser.
 */
export function reserveScrollPaddingBottom(container: HTMLElement): {
    set: (px: number) => void;
    release: () => void;
} {
    const key = Symbol("scroll-padding");
    let reservation = reservations.get(container);
    if (!reservation) {
        reservation = { original: container.style.scrollPaddingBottom, requests: new Map() };
        reservations.set(container, reservation);
    }
    const mine = reservation;
    return {
        set(px) {
            mine.requests.set(key, px);
            apply(container, mine);
        },
        release() {
            mine.requests.delete(key);
            if (mine.requests.size > 0) {
                apply(container, mine);
                return;
            }
            container.style.scrollPaddingBottom = mine.original;
            reservations.delete(container);
        },
    };
}
