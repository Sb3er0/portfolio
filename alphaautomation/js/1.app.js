"use strict";

(self["webpackChunkfls_start"] = self["webpackChunkfls_start"] || []).push([ [ 1 ], [ , (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    __webpack_require__.d(__webpack_exports__, {
        Loader: () => Loader
    });
    class Loader {
        constructor({apiKey, libraries = [], channel, language, clientId, region, version}) {
            this.CALLBACK = "__google_maps_callback";
            this.URL = "https://maps.googleapis.com/maps/api/js";
            this.callbacks = [];
            this.done = false;
            this.loading = false;
            this.version = version;
            this.apiKey = apiKey;
            this.libraries = libraries;
            this.channel = channel;
            this.language = language;
            this.clientId = clientId;
            this.region = region;
        }
        createUrl() {
            let url = this.URL;
            url += "?callback=" + this.CALLBACK;
            if (this.apiKey) url += "&key=" + this.apiKey;
            if (this.libraries.length > 0) url += "&libraries=" + this.libraries.join(",");
            if (this.clientId) url += "&client=" + this.clientId;
            if (this.channel) url += "&channel=" + this.channel;
            if (this.language) url += "&language=" + this.language;
            if (this.region) url += "&region=" + this.region;
            if (this.version) url += "&v=" + this.version;
            return url;
        }
        load() {
            return this.loadPromise();
        }
        loadPromise() {
            return new Promise(((resolve, reject) => {
                this.loadCallback((err => {
                    if (!err) resolve(); else reject(err);
                }));
            }));
        }
        loadCallback(fn) {
            this.callbacks.push(fn);
            this.execute();
        }
        setScript() {
            const url = this.createUrl();
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = url;
            script.onerror = this.loadErrorCallback;
            script.defer = true;
            script.async = true;
            document.head.appendChild(script);
        }
        loadErrorCallback(e) {
            this.onerrorEvent = e;
            this.callback();
        }
        setCallback() {
            window[this.CALLBACK] = this.callback.bind(this);
        }
        callback() {
            this.done = true;
            this.loading = false;
            this.callbacks.forEach((cb => {
                cb(this.onerrorEvent);
            }));
            this.callbacks = [];
        }
        execute() {
            if (this.done) this.callback(); else if (this.loading) ; else {
                this.loading = true;
                this.setCallback();
                this.setScript();
            }
        }
    }
} ] ]);