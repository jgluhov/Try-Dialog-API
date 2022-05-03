const openDialogBtnEl = document.querySelector('#openDialogBtn');
const dialogEl = document.querySelector('#dialog');

openDialogBtnEl.addEventListener('click', function () {
    dialogEl.showModal();
});

dialogEl.addEventListener('close', function() {
    console.log(dialogEl.returnValue);
})

const handleClose = function() {
    dialogEl.classList.add('hide');
    dialogEl.addEventListener('webkitAnimationEnd', function(){
        dialogEl.classList.remove('hide');
        dialogEl.close();
        dialogEl.removeEventListener('webkitAnimationEnd',  arguments.callee, false);
    }, false);

    dialogEl.querySelector('#dialogConfirmBtn')
        .removeEventListener('click', handleClose);
    dialogEl.querySelector('#dialogCancelBtn')
        .removeEventListener('click', handleClose);
}

const handleOpenChange = function(isOpen) {
    if (!isOpen) {
        return;
    }

    dialogEl.querySelector('#dialogConfirmBtn')
        .addEventListener('click', handleClose);
    dialogEl.querySelector('#dialogCancelBtn')
        .addEventListener('click', handleClose);
}

const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.type === "attributes" &&
            mutation.attributeName === 'open') {
            handleOpenChange(dialogEl.hasAttribute('open'));
        }
    });
});

observer.observe(dialogEl, { attributes: true });



