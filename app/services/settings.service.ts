const ElectronStore = require('electron-store');

let configStore:any;

class FakeStore {
	_store:any = {};

	set(key: string, value: any) {
  	this._store[key] = value
	}

	get(key: string) {
		return this._store[key];
	}
}

if (process.env.NODE_ENV === 'test') {
	configStore	= new FakeStore();
} else {
	configStore	= new ElectronStore();
}

export const settingsService = {
    get,
		set
};
function set(key: string, value: any) {
  configStore.set(key, value);
}

function get(key: string) {
  return configStore.get(key);
}
