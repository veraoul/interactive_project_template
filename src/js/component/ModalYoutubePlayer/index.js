import { open } from '@/component/Modal';
import ModalYoutubePlayer from './ModalYoutubePlayer.vue';


/**
 * @param {string} youtubdId
 * @return {Promise<void>}
 */
export const show = (youtubdId:string):Promise<void> => open(ModalYoutubePlayer, { id: youtubdId });

export default ModalYoutubePlayer;
