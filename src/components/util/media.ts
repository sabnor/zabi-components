/** How the library tells a video from an image by its address. Shared by `ImageUpload` and `MediaGrid`. */

const VIDEO_EXTENSION = /\.(mp4|m4v|webm|ogv|mov)$/i;

/** True for a path or file name with a video extension, before any query or hash. */
export function isVideoPath(path: string): boolean {
    return VIDEO_EXTENSION.test(path.split(/[?#]/)[0]);
}

/** True for a video data URL, or a URL whose path has a video extension. */
export function isVideoUrl(url: string): boolean {
    return url.startsWith("data:video/") || isVideoPath(url);
}
