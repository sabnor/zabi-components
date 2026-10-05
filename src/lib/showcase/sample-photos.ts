import type { Photo } from "../../components/util/photo";

/**
 * Photos for the examples, stories and tests, drawn as SVG and carried in
 * data URLs: nothing is fetched, so the examples work offline and the tests
 * do not depend on a network. Each has its own hue, its number in the middle
 * and a mark in every corner, so cropping, zooming and panning can be seen.
 */

function draw(number: number, width: number, height: number, hue: number): string {
    const corner = Math.round(Math.min(width, height) / 12);
    const size = Math.round(Math.min(width, height) / 3);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${hue} 70% 62%)"/><stop offset="1" stop-color="hsl(${(hue + 50) % 360} 70% 32%)"/></linearGradient></defs>
<rect width="${width}" height="${height}" fill="url(#g)"/>
<g fill="hsl(${hue} 80% 92%)">
<rect x="0" y="0" width="${corner}" height="${corner}"/>
<rect x="${width - corner}" y="0" width="${corner}" height="${corner}"/>
<rect x="0" y="${height - corner}" width="${corner}" height="${corner}"/>
<rect x="${width - corner}" y="${height - corner}" width="${corner}" height="${corner}"/>
</g>
<text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-family="sans-serif" font-weight="700" font-size="${size}" fill="hsl(${hue} 80% 96%)">${number}</text>
</svg>`;
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

const SHAPES: [number, number][] = [
    [1600, 1200],
    [1200, 1600],
    [1600, 1600],
    [1920, 1080],
    [1080, 1920],
    [1500, 1000],
];

const SUBJECTS = [
    "The quiz team at their table",
    "Score sheet after round three",
    "The bar at The Crown",
    "Trophy on the shelf",
    "Question card: capital cities",
    "Team photo by the door",
    "Hands on the answer sheet",
    "The quizmaster reading a question",
    "Chalkboard with the standings",
    "Glasses on the table",
    "A tie-break in progress",
    "The winning team",
    "Empty pub before opening",
    "Prize basket",
];

/** The photo with this number (from 1): a full image and a 240px thumbnail of the same picture. */
export function samplePhoto(number: number, overrides: Partial<Photo> = {}): Photo {
    const [width, height] = SHAPES[(number - 1) % SHAPES.length];
    const hue = (number * 47) % 360;
    const thumb = 240 / Math.min(width, height);
    return {
        id: `photo-${number}`,
        src: draw(number, width, height, hue),
        thumbSrc: draw(number, Math.round(width * thumb), Math.round(height * thumb), hue),
        alt: SUBJECTS[(number - 1) % SUBJECTS.length],
        width,
        height,
        ...overrides,
    };
}

/** `count` photos, numbered from 1. Every third one has a caption. */
export function samplePhotos(count: number): Photo[] {
    return Array.from({ length: count }, (_, index) =>
        samplePhoto(index + 1, {
            caption:
                index % 3 === 0
                    ? `Quiz night at The Crown, round ${index + 1}. Taken from the corner table.`
                    : undefined,
        }),
    );
}

export const LONG_CAPTION =
    "The team has played every Tuesday since the pub reopened. This was the night the music round went to a tie-break, the tie-break went to a second tie-break, and the quizmaster ran out of prepared questions and had to make one up about the pub's own jukebox. Nobody at the table could agree afterwards on who had actually answered it.";
