import toast from 'toastify-js'

export const successToast = (message) => {
  toast({
    text: message,
    close: true,
    style: {
      borderRadius: '10px',
      background: 'green',
    },
  }).showToast()
}

export const errorToast = (message) => {
  toast({
    text: message,
    close: true,
    style: {
      borderRadius: '10px',
      background: 'red',
    },
  }).showToast()
}
