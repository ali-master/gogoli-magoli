import {read, store, remove} from "./storage.util";

export class TokenManagerSystem {
	accessToken = "access-token";

	getAccess() {
		return read(this.accessToken)
	}

	setAccess(token) {
		store(this.accessToken, token)
	}

	removeAccess() {
		remove(this.accessToken)
	}
}

export const TokenManager = new TokenManagerSystem();