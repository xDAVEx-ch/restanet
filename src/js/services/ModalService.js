export const ModalService = (() => {
  let currentModal = null
  const controller = {

    add (modalName) {
      if (currentModal) currentModal.hide()
      currentModal = document.querySelector(`${modalName}`)
      currentModal.show()
    },

    remove () {
      if (!currentModal) return
      currentModal.hide()
    }
  }

  return controller
})()
