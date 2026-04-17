import { type ToastItem } from './toast-store.js';
interface Props {
    toast: ToastItem;
}
declare const ToasterToast: import("svelte").Component<Props, {}, "">;
type ToasterToast = ReturnType<typeof ToasterToast>;
export default ToasterToast;
