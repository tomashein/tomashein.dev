import { MAIL_URL } from '@config';

function initContact() {
  const dialog = document.getElementById('contact') as HTMLDialogElement | null;

  if (!dialog) {
    console.error('[contact] no dialog with id `contact` found — contact form will not work');
    return;
  }

  const form = dialog.querySelector('form');

  if (!form) {
    console.error('[contact] no form found inside the dialog — contact form will not work');
    return;
  }

  const feedback = dialog.querySelector<HTMLParagraphElement>('#contact-feedback');

  if (!feedback) {
    console.warn('[contact] missing feedback paragraph — feedback will fallback to native alerts');
  }

  const closeButton = dialog.querySelector<HTMLButtonElement>('header [command="close"]');

  if (!closeButton) {
    console.warn('[contact] no close button found — close button will not be disabled during submission');
  }

  function setFeedback(message: string) {
    if (feedback) feedback.textContent = message;
    else alert(message);
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (feedback) feedback.textContent = '';
    if (closeButton) closeButton.disabled = true;
    const formData = new FormData(form);
    form.inert = true;
    try {
      const response = await fetch(MAIL_URL, {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        setFeedback("Message sent! I'll get back to you soon.");
        const timeout = setTimeout(() => dialog.close(), 2000);
        dialog.addEventListener('close', () => clearTimeout(timeout), { once: true });
      } else {
        console.error('Submission failed with status:', response.status);
        setFeedback('Something went wrong. Please try again!');
      }
    } catch (error) {
      console.error('Submission network error:', error);
      setFeedback('Something went wrong. Please try again!');
    } finally {
      if (closeButton) closeButton.disabled = false;
      form.inert = false;
    }
  });

  dialog.addEventListener('close', () => {
    if (feedback) feedback.textContent = '';
    form.reset();
  });

  dialog.addEventListener('cancel', (event) => {
    if (form.inert) event.preventDefault();
  });
}

initContact();
