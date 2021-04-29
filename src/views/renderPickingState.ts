import { ComponentState } from "../lib/appState";
import { ComponentMessage } from "../lib/appMessages";
import { isValidFigmaUrl } from "../lib/validation";

//Renders the picking state
export function renderPickingState(state: ComponentState, dispatch: ((msg: ComponentMessage) => any)): HTMLElement {
    let pickingRoot = document.querySelector("#picking") as HTMLTemplateElement;
    let picker = pickingRoot.content.cloneNode(true) as HTMLElement;

    let figmaUrlInput = picker.querySelector("input");
    let openFileBtn = picker.querySelector("#open-file") as HTMLInputElement;

    let viewingRoot = document.querySelector("#viewing") as HTMLTemplateElement;
    viewingRoot.hidden = true;

    let errorLabel = picker.querySelector("#error") as HTMLElement;

    figmaUrlInput.oninput = (event: Event) => {
        const val = figmaUrlInput.value;

        figmaUrlInput.classList.remove("invalid");
        figmaUrlInput.classList.remove("valid");
        openFileBtn.classList.remove("valid");

        if (isValidFigmaUrl(val)) {
            openFileBtn.removeAttribute("disabled");
            errorLabel.innerHTML = '';
            errorLabel.style.marginBottom = "0";
            errorLabel.style.marginTop = "0";

            figmaUrlInput.style.color = "black";
            openFileBtn.classList.add("valid");
            figmaUrlInput.classList.add("valid");
        } else {
            errorLabel.innerHTML = 'This is an invalid figma url';
            errorLabel.style.marginBottom = "16px";
            errorLabel.style.marginTop = "5px";

            openFileBtn.setAttribute("disabled", "disabled");
            figmaUrlInput.classList.add("invalid");
            figmaUrlInput.style.color = "red";
        }
    }
    //This sets up the google input element -> on input changed -> relay a message
    openFileBtn.onclick = (event: Event) => {
        //First draft -> google drive url needs to be validated, for now, this just accepts everything
        let url = figmaUrlInput.value;
        dispatch({ type: "figma-url-changed", payload: url });
    }

    return picker;
}