import Quill from 'quill';
import Delta from 'quill-delta';

const MAX_WIDTH = 1000;
const MAX_HEIGHT = 1000;

export const resizeImage = (img) => {
  const canvas = document.createElement('canvas');
  let width = img.width;
  let height = img.height;

  if (width > height) {
    if (width > MAX_WIDTH) {
      height *= MAX_WIDTH / width;
      width = MAX_WIDTH;
    }
  } else {
    if (height > MAX_HEIGHT) {
      width *= MAX_HEIGHT / height;
      height = MAX_HEIGHT;
    }
  }
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  ctx?.drawImage(img, 0, 0, width, height);
  return canvas.toDataURL('image/jpeg');
};
type QuillToolbar = {
  container: HTMLElement;
  quill: Quill;
};

export function imageHandler() {
  //@ts-ignore
  const quillToolbar: QuillToolbar = this; /* eslint-disable-line */
  let fileInput = quillToolbar.container.querySelector(
    'input.ql-image[type=file]',
  ) as HTMLInputElement;

  if (fileInput == null) {
    fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
    fileInput.classList.add('ql-image');
    fileInput.addEventListener('change', () => {
      if (fileInput.files != null && fileInput.files[0] != null) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          let image = e?.target?.result?.toString();
          if (!image) return;

          const range = quillToolbar.quill.getSelection(true);
          const img = document.createElement('img');
          img.src = image;
          img.onload = () => {
            image = resizeImage(img);

            quillToolbar.quill.updateContents(
              new Delta()
                .retain(range.index)
                .delete(range.length)
                .insert({ image }),
              'user',
            );
          };
          fileInput.value = '';
        };
        reader.readAsDataURL(fileInput.files[0]);
      }
    });
    quillToolbar.container.appendChild(fileInput);
  }
  fileInput.click();
}
