/**
 * FeatureCard component - SSR-safe implementation
 * @component
 */
interface Props {
    /** Icon to display */
    icon?: string;
    /** Title of the feature */
    title: string;
    /** Description of the feature */
    description: string;
    /** Additional CSS classes */
    className?: string;
}
declare const FeatureCard: import("svelte").Component<Props, {}, "">;
type FeatureCard = ReturnType<typeof FeatureCard>;
export default FeatureCard;
