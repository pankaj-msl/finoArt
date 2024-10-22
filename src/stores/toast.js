import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useToastStore = defineStore('toast', () => {
  const showToast = ref(false);
  const message = ref('');

  // Function to set toast message
  function triggerToast(msg) {
    message.value = msg;
    showToast.value = true;
  }

  // Function to reset toast state
  function resetToast() {
    showToast.value = false;
    message.value = '';
  }

  return { showToast, message, triggerToast, resetToast };
});
