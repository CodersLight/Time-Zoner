const fs = require('fs');

class KeyValueDatabase {
	constructor(id) {
		this.id = id;
		this.path = 'db/' + this.id + '.json';

		this.data = {};

		if(!fs.existsSync(this.path)) {
			console.log(this);
			fs.writeFileSync(this.path, '{}');
		} else {
			try {
				const newData = JSON.parse(fs.readFileSync(this.path));

				this.data = newData;
			} catch(e) {
				throw new Error('Given path is not empty and its contents are not valid JSON!');
			}
		}
	}

	set(key, value) {
		console.log('Q');
		this.data[key] = value;

		this.sync();
	}

	get(key) {
		return this.data[key];
	}

	has(key) {
		return this.data.hasOwnProperty(key);
	}

	delete(key) {
		if(this.data.hasOwnProperty(key)) {
			delete this.data[key];
		}

		this.sync();
	}

	clear() {
		this.data = {};

		this.sync();
	}

	sync() {
		try {
			fs.writeFileSync(this.path, JSON.stringify(this.data, null, 2));
		} catch(e) {
			throw new Error('Error synchronizing database to disk!');
		}
	}

	getAll() {
		return this.data;
	}
}

module.exports.ZONES = new KeyValueDatabase('userzones');
module.exports.PREFERENCES = new KeyValueDatabase('userpreferences');
