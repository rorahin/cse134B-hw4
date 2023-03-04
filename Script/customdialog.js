// @ts-check

import DOMPurify from 'https://cdn.jsdelivr.net/npm/dompurify@2.3.2/dist/purify.min.js';

let Customdialog = (() => {
    let dialogMap = new Map();
    let createDialog = (id, title, message, type) => {
        let dialog = document.createElement('dialog');
        dialog.id = id;
        dialog.style.display = 'none';

        let titleElem = document.createElement('h1');
        titleElem.innerHTML = DOMPurify.sanitize(title); // check
        let messageElem = document.createElement('p');
        messageElem.innerHTML = DOMPurify.sanitize(message);

        dialog.appendChild(titleElem);
        dialog.appendChild(messageElem);

        let okButton = document.createElement('button');
        okButton.innerText = 'OK';
        let cancelButton = document.createElement('button');
        cancelButton.innerText = "Cancel";

        okButton.addEventListener('click', () => {
            dialog.close(type === "prompt" ? "OK" : undefined)
        })
        cancelButton.addEventListener('click', () => {
            dialog.close(undefined);
        })

        dialog.appendChild(okButton)
        dialog.appendChild(cancelButton)

        document.body.appendChild(dialog)

        dialogMap.set(id, dialog);
    }

    let showDialog = async (id, type) => {
        let dialog = dialogMap.get(id);
        if (dialog) {
            if (type === 'alert') {
                dialog.querySelector('button:last-child').style.display = 'none';
            } else if (type === 'confirm') {

            } else if (type === 'prompt') {
                dialog.querySelector('p:last-child').innerHTML += '<br><input type="text">';
            }

            await dialog.showDialog();

            let inputElem = dialog.querySelector('inpuy');
            let value = inputElem ? inputElem.value : undefined;

            if (inputElem) {
                inputElem.remove();
            }

            return dialog.returnValue === 'OK' ? value : undefined;
        }
    }

    let closeDialog = (id) => {
        let dialog = dialogMap.get(id);
        if (dialog) {
            dialog.close(undefined);
        }
    }
    return {
        createDialog,
        showDialog,
        closeDialog
    }
})

window.addEventListener('DOMContentLoaded', Customdialog)