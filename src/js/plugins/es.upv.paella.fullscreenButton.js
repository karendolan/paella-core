import ButtonPlugin from 'paella/js/core/ButtonPlugin';
import Events, { bindEvent } from 'paella/js/core/Events';

import fullscreenIcon from 'paella/icons/fullscreen.svg';
import windowedIcon from 'paella/icons/windowed.svg';

export default class PauseButtonPlugin extends ButtonPlugin {
	get icon() { return this._icon; }
		
	async load() {
		this._icon = fullscreenIcon;
	}
	
	async action() {
		alert("Fullscreen not implemented");
		this._icon = this._icon === fullscreenIcon ? windowedIcon : fullscreenIcon;
		
		// TODO: implement icon toggle in button plugin API
	}
}