import { addons } from 'storybook/manager-api';
import { dark, light, prefersDark } from './zabi-theme';

addons.setConfig({
    theme: prefersDark() ? dark : light
});
