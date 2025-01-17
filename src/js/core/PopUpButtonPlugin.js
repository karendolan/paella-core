import ButtonPlugin from 'paella-core/js/core/ButtonPlugin';
import PopUp from 'paella-core/js/core/PopUp';
import { createElementWithHtmlText } from 'paella-core/js/core/dom';

export default class PopUpButtonPlugin extends ButtonPlugin {
	async action() {
		await this.showPopUp();
	}
	
	async getContent() {
		const content = createElementWithHtmlText('<p>Pop Up Button Plugin Content');
		return content;
	}
	
	hidePopUp() {
		if (this._popUp) {
			this._popUp.hide();
		}
	}
	
	async showPopUp() {
		const parentContainer = this.player.isFullscreen ? this.player.containerElement : document.body;
		if (!this._popUp) {
			this._popUp = new PopUp(this.player, parentContainer, this.button);
			const content = await this.getContent();
			this._popUp.setContent(content);
		}
		else  {
			this._popUp.show(parentContainer);
		}
	}
}
