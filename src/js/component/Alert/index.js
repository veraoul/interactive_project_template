import { open } from '@/component/Modal';
import Alert from './Alert.vue';


/**
 * @param {string} message
 * @return {Promise<void>}
 */
export const alert = (message:string):Promise<void> => open(Alert, { message, type: 'alert' });

/**
 * @param {string} message
 * @return {Promise<void>}
 */
export const success = (message:string):Promise<void> => open(Alert, { message, type: 'success' });

/**
 * @param {string} message
 * @return {Promise<void>}
 */
export const warning = (message:string):Promise<void> => open(Alert, { message, type: 'warning' });

export default Alert;
