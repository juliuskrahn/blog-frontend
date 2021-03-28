import { injectionKey } from '@/store';
import { useStore as baseUseStore } from 'vuex';

export default function useStore() {
  return baseUseStore(injectionKey);
}
