/**
 * Controls that keep what a visitor chose before the page hydrated.
 *
 * A server-rendered page can be used before its scripts arrive: a checkbox
 * can be ticked, a radio chosen. A component that writes `checked={…}` from
 * its own state and listens for `change` loses that on hydration: Svelte sets
 * `checked` from the state, which still says nothing was chosen.
 *
 * Svelte's own bindings do not. `bind:checked` and `bind:group` know when
 * they run during hydration, compare the input with the markup the server
 * sent (`defaultChecked`), and where they differ hand the input's state to
 * the binding instead of overwriting it. They also put the binding back on a
 * form reset. So the controls bind, and what they bind to is an accessor of
 * their own: the place where a choice is taken in, by whatever road it came.
 *
 * `bind:group` takes only an identifier or a member expression, which is why
 * this is an object with a `value` and not a pair of functions.
 */

/** What Svelte hands a group binding when no radio is checked: after a reset, or when hydration finds none. */
export type NoChoice = null | undefined;

/**
 * The target of a radio's `bind:group={binding.value}`.
 *
 * `read` gives the chosen value; a radio is checked while its own value is
 * that. `choose` is called when a radio was picked: by the user, or before
 * hydration. `restore` is called with nothing chosen: a form is being reset
 * (see `resetValueOf` for what to go back to).
 */
export function groupBinding<T>(
    read: () => T | NoChoice,
    choose: (value: T) => void,
    restore: () => void,
) {
    return {
        get value(): T | NoChoice {
            return read();
        },
        set value(next: T | NoChoice) {
            if (next === null || next === undefined) restore();
            else choose(next);
        },
    };
}

/**
 * The value a group of radios goes back to on a form reset: that of the one
 * whose `checked` attribute is set, in the type the component's options have
 * (Svelte keeps it on the input as `__value`), or `undefined` when none is.
 *
 * It reads the attribute (`defaultChecked`), not `checked`: Svelte calls a
 * binding's reset handler in a microtask after the `reset` event, and when a
 * user pressed the reset button that is before the browser has reset
 * anything. Svelte takes the `checked` attribute off a bound input once it
 * has hydrated, so in practice a reset empties the group, as it does a bound
 * native input.
 */
export function resetValueOf<T>(inputs: Iterable<HTMLInputElement | undefined>): T | undefined {
    for (const input of inputs) {
        if (input?.defaultChecked) return (input as HTMLInputElement & { __value?: T }).__value;
    }
    return undefined;
}
