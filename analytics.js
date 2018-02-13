! function() {
    var t = function(t, e) {
        if ("undefined" != typeof WinJS) return void WinJS.Namespace.define(t, {});
        var i = "undefined" != typeof process && process.versions && !!process.versions.node,
            n = i ? global : e;
        "undefined" != typeof window && (n = window), n || console.log((new Error).stack);
        for (var s = t.split("."), a = n, r = 0; r < s.length; r++) {
            var o = s[r];
            if (a[o]) {
                var l = s.slice(0, r).join(".");
                if ("object" != typeof a[o]) throw new Error("Namespace error: the name '" + l + "' already exists and is not a namespace.")
            } else a[o] = {};
            a = a[o]
        }
    };
    t("Ooyala.Util", this), Ooyala.Util.createNamespace = t
}(),
function() {
    Ooyala.Util.createNamespace("Ooyala.Analytics", this), Ooyala.Analytics._GuidManager = function() {
        this._guid_key_name = "ooyala_guid"
    }, Ooyala.Analytics._GuidManager.prototype = {
        _isGuidInLocalStorage: function() {
            return "undefined" != typeof Storage && null !== localStorage.getItem(this._guid_key_name)
        },
        _getGuidFromLocalStorage: function() {
            return "undefined" != typeof Storage ? localStorage.getItem(this._guid_key_name) : null
        },
        _getRandomString: function() {
            return (new Date).getTime() + Math.random().toString(16).split(".")[1]
        },
        _generateGuid: function() {
            return Ooyala.ThirdParty.SHA256.sha256ToBase64String(this._getRandomString())
        },
        _setGuid: function(t) {
            return "undefined" != typeof Storage && (localStorage.setItem(this._guid_key_name, t), !0)
        },
        getOrGenerateGuid: function() {
            if (this._isGuidInLocalStorage()) return this._getGuidFromLocalStorage();
            var t = this._generateGuid();
            return this._setGuid(t), t
        }
    }
}(), Ooyala.Util.createNamespace("Ooyala.ThirdParty.SHA256", this),
    function() {
        function t(t, e) {
            var i = (65535 & t) + (65535 & e),
                n = (t >> 16) + (e >> 16) + (i >> 16);
            return n << 16 | 65535 & i
        }

        function e(t, e) {
            return t >>> e | t << 32 - e
        }

        function i(t, e) {
            return t >>> e
        }

        function n(t, e, i) {
            return t & e ^ ~t & i
        }

        function s(t, e, i) {
            return t & e ^ t & i ^ e & i
        }

        function a(t) {
            return e(t, 2) ^ e(t, 13) ^ e(t, 22)
        }

        function r(t) {
            return e(t, 6) ^ e(t, 11) ^ e(t, 25)
        }

        function o(t) {
            return e(t, 7) ^ e(t, 18) ^ i(t, 3)
        }

        function l(t) {
            return e(t, 17) ^ e(t, 19) ^ i(t, 10)
        }

        function c(e, i) {
            var c, u, h, _, d, y, f, p, m, E, T, A, I = new Array(1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298),
                g = new Array(1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225),
                S = new Array(64);
            e[i >> 5] |= 128 << 24 - i % 32, e[(i + 64 >> 9 << 4) + 15] = i;
            for (var m = 0; m < e.length; m += 16) {
                c = g[0], u = g[1], h = g[2], _ = g[3], d = g[4], y = g[5], f = g[6], p = g[7];
                for (var E = 0; E < 64; E++) E < 16 ? S[E] = e[E + m] : S[E] = t(t(t(l(S[E - 2]), S[E - 7]), o(S[E - 15])), S[E - 16]), T = t(t(t(t(p, r(d)), n(d, y, f)), I[E]), S[E]), A = t(a(c), s(c, u, h)), p = f, f = y, y = d, d = t(_, T), _ = h, h = u, u = c, c = t(T, A);
                g[0] = t(c, g[0]), g[1] = t(u, g[1]), g[2] = t(h, g[2]), g[3] = t(_, g[3]), g[4] = t(d, g[4]), g[5] = t(y, g[5]), g[6] = t(f, g[6]), g[7] = t(p, g[7])
            }
            return g
        }

        function u(t) {
            for (var e = Array(), i = (1 << y) - 1, n = 0; n < t.length * y; n += y) e[n >> 5] |= (t.charCodeAt(n / y) & i) << 24 - n % 32;
            return e
        }

        function h(t) {
            for (var e = "", i = (1 << y) - 1, n = 0; n < 32 * t.length; n += y) e += String.fromCharCode(t[n >> 5] >>> 24 - n % 32 & i);
            return e
        }

        function _(t) {
            for (var e = f ? "0123456789ABCDEF" : "0123456789abcdef", i = "", n = 0; n < 4 * t.length; n++) i += e.charAt(t[n >> 2] >> 8 * (3 - n % 4) + 4 & 15) + e.charAt(t[n >> 2] >> 8 * (3 - n % 4) & 15);
            return i
        }

        function d(t) {
            for (var e = "", i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", n = "", s = 0; s < 4 * t.length; s += 3)
                for (var a = (t[s >> 2] >> 8 * (3 - s % 4) & 255) << 16 | (t[s + 1 >> 2] >> 8 * (3 - (s + 1) % 4) & 255) << 8 | t[s + 2 >> 2] >> 8 * (3 - (s + 2) % 4) & 255, r = 0; r < 4; r++) n += 8 * s + 6 * r > 32 * t.length ? e : i.charAt(a >> 6 * (3 - r) & 63);
            return n
        }
        var y = 8,
            f = 0;
        Ooyala.ThirdParty.SHA256.sha256ToHexString = function(t) {
            return _(c(u(t), t.length * y))
        }, Ooyala.ThirdParty.SHA256.sha256ToBase64String = function(t) {
            return d(c(u(t), t.length * y))
        }, Ooyala.ThirdParty.SHA256.sha256ToString = function(t) {
            return h(c(u(t), t.length * y))
        }
    }(),
    function(t) {
        "use strict";

        function e(t) {
            var t = {
                eventName: t.name,
                time: (new Date).toISOString()
            };
            return t
        }

        function i(t) {
            var e = Date.now() + this._priorityIntervals[t];
            e < this._flushTime && (this._flushTimeout && clearTimeout(this._flushTimeout), this._flushTimeout = setTimeout(function() {
                r.call(this)
            }.bind(this), this._priorityIntervals[t]), this._flushTime = Date.now() + this._priorityIntervals[t])
        }

        function n(t) {
            new Ooyala.HttpRequester(t, this._iqEndpoint)
        }

        function s(t) {
            if (t > 0) {
                var i = e(g.PLAYHEAD_UPDATE);
                i.playheadPositionMillis = Math.floor(t), v.call(this, i, g.PLAYHEAD_UPDATE.priority)
            }
        }

        function a(t) {
            if (t > 0) {
                var i = e(g.TIME_PLAYED);
                i.timePlayedMillis = t, v.call(this, i, g.TIME_PLAYED.priority), this._timePlayed = 0
            }
        }

        function r() {
            var t = Date.now() / 1e3,
                e = new Date;
            this._base.clientTime = e.toISOString(), a.call(this, this._timePlayedMillis), s.call(this, this._playheadPositionMillis), this._base.events = this._pendingEvents, n.call(this, this._base), this._pendingEvents = [], this._flushTime = Number.MAX_VALUE, this._lastFlush = t
        }

        function o(t) {
            for (; t / 10 > this._nextPlaythroughToReport || 100 == this._nextPlaythroughToReport && t / 10 > 95;) {
                var i = e(g.PLAYTHROUGH_PERCENT);
                i.percent = Math.floor(this._nextPlaythroughToReport), v.call(this, i, g.PLAYTHROUGH_PERCENT.priority), this._nextPlaythroughToReport += 25
            }
        }

        function l(t) {
            for (var e = t / this._buckets.count, i = 0; i < this._buckets.count; i++) this._buckets.startingTimes[i] = i * e
        }

        function c(t) {
            for (var e = !1, i = 0, n = 0; !e;) i === this._buckets.count || this._buckets.startingTimes[i] > t ? (n = i - 1, e = !0) : i += 1;
            return n
        }

        function u(t) {
            this._buckets.watched[t] || (this._buckets.watched[t] = !0, h.call(this, t)), this._buckets.current !== t && (_.call(this, t), this._buckets.current = t)
        }

        function h(t) {
            var i = e(g.PERCENTAGE_WATCHED);
            i.startMille = 25 * t + 1, i.endMille = 25 * t + 25, v.call(this, i, g.PERCENTAGE_WATCHED.priority), this._buckets.watchedCount++, o.call(this, i.endMille)
        }

        function _(t) {
            var i = e(g.BUCKETS_WATCHED);
            i.startMille = 25 * t + 1, i.endMille = 25 * t + 25, v.call(this, i, g.BUCKETS_WATCHED.priority)
        }

        function d(t) {
            var i = e(t);
            v.call(this, i, t.priority)
        }

        function y(t) {
            var e = new Error(t.message);
            return e.name = t.name, e
        }

        function f() {
            this._buckets = {
                watched: [],
                current: -1,
                startingTimes: [],
                count: 40,
                watchedCount: 0
            }, this._nextPlaythroughToReport = 25, this._playheadPositionMillis = 0, this._timePlayed = 0, this._lastTimePlayed = 0, this._timePlayedMillis = 0, this._base.source = {}, this._base.plugins = []
        }

        function p(t, e, i, n, s, a) {
            var r = {},
                o = {};
            if (r.uiTag = i, r.contentSource = n, t.hasOwnProperty("ooyalaDiscoveryContext")) o = t.ooyalaDiscoveryContext;
            else {
                if (!t.hasOwnProperty("bucket_info")) {
                    var l = y(S.MISSING_DISCOVERY_CONTEXT);
                    throw l.message = l.message.replace("{{asset}}", JSON.stringify(t)), l
                }
                o.version = "1", o.data = m(t.bucket_info)
            }
            return e && (o.customData = e), r.ooyalaDiscoveryContext = JSON.stringify(o), r.pageSize = s, r.assetPosition = a, r
        }

        function m(t) {
            if (t && t.length > 0 && "2" == t.charAt(0)) {
                var e = JSON.parse(t.substring(1));
                return window.atob(e.encoded)
            }
            var i = y(S.INVALID_BUCKET_INFO);
            throw i.message = i.message.replace("{{bucket_info}}", t), i
        }

        function E(t) {
            var e = Ooyala.Analytics.MediaContentType.OOYALA_CONTENT,
                i = "";
            return t.hasOwnProperty("id_type") && (e = t.id_type), t.hasOwnProperty("embed_code") && (i = t.embed_code), {
                id: i,
                idType: e
            }
        }

        function T(t) {
            if (!t.hasOwnProperty("name") || !t.hasOwnProperty("active")) return y(S.PLUGIN_FIELDS_MISSING);
            for (var e in t)
                if ("name" !== e && "active" !== e && "version" !== e) {
                    var i = y(S.PLUGIN_FIELD_INVALID);
                    return i.message = i.message.replace("{{field}}", e), i
                }
            return null
        }

        function A() {
            function t() {
                return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
            }
            return t() + t() + "-" + t() + "-" + t() + "-" + t() + "-" + t() + t() + t()
        }
        var I = {
                LOW: 0,
                MEDIUM: 1,
                HIGH: 2
            },
            g = {
                PLAYER_LOAD: {
                    name: "playerLoad",
                    priority: I.HIGH
                },
                DISPLAY: {
                    name: "display",
                    priority: I.HIGH
                },
                PLAY_REQUESTED: {
                    name: "playRequested",
                    priority: I.HIGH
                },
                VIDEO_STARTED: {
                    name: "videoStarted",
                    priority: I.HIGH
                },
                PLAYTHROUGH_PERCENT: {
                    name: "playthroughPercent",
                    priority: I.HIGH
                },
                PERCENTAGE_WATCHED: {
                    name: "percentageWatched",
                    priority: I.MEDIUM
                },
                BUCKETS_WATCHED: {
                    name: "bucketWatched",
                    priority: I.MEDIUM
                },
                REPLAY: {
                    name: "replay",
                    priority: I.HIGH
                },
                SEEK: {
                    name: "seek",
                    priority: I.MEDIUM
                },
                PAUSE: {
                    name: "pause",
                    priority: I.MEDIUM
                },
                RESUME: {
                    name: "resume",
                    priority: I.MEDIUM
                },
                TIME_PLAYED: {
                    name: "timePlayed",
                    priority: I.LOW
                },
                PLAYHEAD_UPDATE: {
                    name: "playheadUpdate",
                    priority: I.LOW
                },
                CUSTOM: {
                    name: "custom",
                    priority: I.MEDIUM
                },
                OFFLINE_CONTENT_ACQUIRED: {
                    name: "offlineContentAcquired",
                    priority: I.HIGH
                },
                ASSET_IMPRESSION: {
                    name: "assetImpression",
                    priority: I.MEDIUM
                },
                ASSET_CLICK: {
                    name: "assetClick",
                    priority: I.HIGH
                }
            },
            S = {
                INVALID_DOWNLOAD_TYPE: {
                    name: "InvalidDownloadType",
                    message: "Not a valid download type for offline content, Download type should be own/rental."
                },
                MISSING_DISCOVERY_CONTEXT: {
                    name: "MissingDiscoveryContext",
                    message: "Missing ooyalaDiscoveryContext or bucket_info for {{asset}}."
                },
                INVALID_BUCKET_INFO: {
                    name: "InvalidBucketInfo",
                    message: "Not a version 2 bucket_info: {{bucket_info}}."
                },
                PLUGIN_FIELDS_MISSING: {
                    name: "PluginFieldsMissing",
                    message: "Plugin missing required fields - name and active."
                },
                PLUGIN_FIELD_INVALID: {
                    name: "PluginFieldInvalid",
                    message: "Plugin contains invalid field {{field}}."
                },
                PLUGINS_NOT_AN_ARRAY: {
                    name: "PluginsNotAnArray",
                    message: "Plugins must be an array."
                },
                INVALID_CUSTOM_DIMENSION: {
                    name: "InvalidCustomObject",
                    message: "The custom dimensions can only contain string, numerals or boolean values. They cannot contain complex objects."
                },
                GEO_FIELD_INVALID: {
                    name: "GeoFieldInvalid",
                    message: "Geo contains invalid field {{field}}."
                }
            },
            v = function(t, e) {
                t.sequenceNum = this._currentSequenceNumber, i.call(this, e), this._pendingEvents.push(t), this._currentSequenceNumber++
            };
        Ooyala.Util.createNamespace("Ooyala.Analytics", t), Ooyala.Analytics.Reporter = function(t, e) {
            this._base = {}, this._base.asset = {}, e ? this._base.sessionId = e : this._base.sessionId = A(), this._base.contentSessionId = "", this._base.pcode = t, this._base.sessionStartTime = (new Date).toISOString(), this._base.analyticsSdkName = "ooyala-iq-analytics-js-sdk", this._base.analyticsSdkVersion = "1.0.21.0.0", this._base.player = {
                playerInfo: {}
            }, this._base.documentUrl = null, this._base.device = {
                deviceInfo: {}
            }, this._base.user = {}, this._lastFlush = 0, this._liveContent = !1, this._contentDuration = 0, this._date = new Date, this._pendingEvents = [], this._currentSequenceNumber = 0, this._flushTime = Number.MAX_VALUE, this._priorityIntervals = [1e4, 5e3, 1e3], this._seek = {
                start: 0,
                end: 0
            }, this._hasContentStarted = !1, this._flushTimeout = null, this._lastClickedAsset = {};
            var i = "https:";
            this._iqEndpoint = i + "//l.ooyala.com/v3/analytics/events", f.call(this)
        }, Ooyala.Analytics.Reporter.prototype = {
            setIQBackendURL: function(t) {
                this._iqEndpoint = t
            },
            setDocumentURL: function(t) {
                this._base.documentUrl = t
            },
            setDeviceInfo: function(t, e, i) {
                if (!t) {
                    var n = new Ooyala.Analytics._GuidManager;
                    t = n.getOrGenerateGuid()
                }
                var s = {};
                for (var a in e) s[a] = e[a];
                this._base.device = {
                    id: t,
                    deviceInfo: s
                }, this._base.userAgent = i
            },
            setUserInfo: function(t, e, i, n) {
                var s = {};
                for (var a in n) {
                    if ("countryCode" !== a && "region" !== a && "state" !== a && "city" !== a && "latitude" !== a && "longitude" !== a && "geoVendor" !== a) {
                        var r = y(S.GEO_FIELD_INVALID);
                        throw r.message = r.message.replace("{{field}}", a), r
                    }
                    s[a] = n[a]
                }
                this._base.user = {
                    emailHashMD5: t,
                    userId: e,
                    gender: i,
                    geo: s
                }
            },
            setPlayerInfo: function(t, e, i) {
                this._base.player = {
                    id: t,
                    name: e,
                    version: i
                }
            },
            setSessionId: function(t) {
                this._base.sessionId = t
            },
            reportPlayerLoad: function() {
                d.call(this, g.PLAYER_LOAD)
            },
            initializeMedia: function(t, e, i) {
                f.call(this), this._base.asset.id = t, this._base.asset.idType = e, i ? this._base.contentSessionId = i : this._base.contentSessionId = A(), this._lastClickedAsset.hasOwnProperty("id") && (t === this._lastClickedAsset.id && e === this._lastClickedAsset.idType ? this.updateTopLevelSource(this._lastClickedAsset.source) : this._lastClickedAsset = {})
            },
            setMediaDuration: function(t) {
                this._contentDuration = t, t <= 0 ? this._liveContent = !0 : l.call(this, t), d.call(this, g.DISPLAY)
            },
            reportPlayRequested: function(t) {
                var i = e(g.PLAY_REQUESTED);
                i.isAutoPlay = t || !1, v.call(this, i, g.PLAY_REQUESTED.priority)
            },
            setPlugins: function(t) {
                if (t) {
                    if ("[object Array]" != Object.prototype.toString.call(t)) throw y(S.PLUGINS_NOT_AN_ARRAY);
                    for (var e in t) {
                        var i = T(t[e]);
                        if (i) throw i
                    }
                    this._base.plugins = t
                }
            },
            reportOfflineContentAcquired: function(t) {
                if (t != Ooyala.Analytics.OfflineContentDownloadType.FOR_RENT && t != Ooyala.Analytics.OfflineContentDownloadType.TO_OWN) throw y(S.INVALID_DOWNLOAD_TYPE);
                var i = e(g.OFFLINE_CONTENT_ACQUIRED);
                i.downloadType = t, v.call(this, i, g.OFFLINE_CONTENT_ACQUIRED.priority)
            },
            reportReplay: function() {
                var t = e(g.REPLAY);
                t.isAutoPlay = !1, v.call(this, t, g.REPLAY.priority)
            },
            reportPlaybackStarted: function() {
                d.call(this, g.VIDEO_STARTED)
            },
            reportPlayHeadUpdate: function(t) {
                if (this._timePlayed = this._timePlayed + (t - this._lastTimePlayed), (this._timePlayed > 2 * this._priorityIntervals[0] || this._timePlayed < 0) && (this._timePlayed = this._priorityIntervals[0]), this._lastTimePlayed = t, this._playheadPositionMillis = t, this._timePlayedMillis = Math.floor(this._timePlayed), i.call(this, g.PLAYHEAD_UPDATE.priority), i.call(this, g.TIME_PLAYED.priority), !this._liveContent) {
                    var e = c.call(this, t);
                    u.call(this, e)
                }
            },
            reportPause: function() {
                d.call(this, g.PAUSE)
            },
            reportResume: function() {
                d.call(this, g.RESUME)
            },
            reportSeek: function(t, i) {
                var n = e(g.SEEK);
                n.fromMillis = t, n.toMillis = i, v.call(this, n, g.SEEK.priority)
            },
            reportComplete: function() {
                r.call(this), this._flushTimeout && clearTimeout(this._flushTimeout)
            },
            reportCustomEvent: function(t, i) {
                var n = e(g.CUSTOM);
                n.customEventName = t;
                for (var s in i) n[s] = i[s];
                v.call(this, n, g.CUSTOM.priority)
            },
            updateTopLevelSource: function(t) {
                this._base.source = t
            },
            reportAssetImpression: function(t, i, n, s, a, r) {
                var o = e(g.ASSET_IMPRESSION);
                o.source = p(t, i, n, s, a, r), o.asset = E(t), v.call(this, o, g.ASSET_IMPRESSION.priority)
            },
            reportAssetClick: function(t, i, n, s, a, r) {
                var o = e(g.ASSET_CLICK);
                this._lastClickedAsset.source = p(t, i, n, s, a, r), o.asset = E(t), this._lastClickedAsset.idType = o.asset.idType, this._lastClickedAsset.id = o.asset.id, o.source = this._lastClickedAsset.source;
                var l = !1;
                i && i.hasOwnProperty("autoplay") && (l = i.autoplay), o.isAutoPlay = l, v.call(this, o, g.ASSET_CLICK.priority)
            },
            setCustomDimensions: function(t) {
                if (t)
                    for (var e in t)
                        if ("object" == typeof t[e]) throw y(S.INVALID_CUSTOM_DIMENSION);
                this._base.customDimensions = t
            }
        }, Ooyala.Analytics.MediaContentType = {
            OOYALA_CONTENT: "ooyala",
            EXTERNAL_CONTENT: "external"
        }, Ooyala.Analytics.OfflineContentDownloadType = {
            TO_OWN: "own",
            FOR_RENT: "rental"
        }
    }(this),
    function(t) {
        Ooyala.HttpRequester = function(e, i) {
            
            //do an jsonp call here for IE9&10
            //
            $.ajax({
                url: i,

                // The name of the callback parameter, as specified by the YQL service
                jsonp: "callback",

                // Tell jQuery we're expecting JSONP
                dataType: "jsonp",

                data: JSON.stringify(this.object),

                // Work with the response
                success: function( response ) {
                    console.log( response ); // server response
                }
            });

            /*if (this._iqEndpoint = i, this.object = e, t.XMLHttpRequest) {
                var n = new XMLHttpRequest;
                n.open("POST", this._iqEndpoint), n.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), n.send(JSON.stringify(this.object))
            } else if (t.XDomainRequest) {
                this._iqEndpoint = i;
                this.object = e;
                var n = new t.XDomainRequest;
                n.onload = function() {
                    onSuccess(n.responseText)
                }, n.onerror = function(e) {
                    //console.log("Error: " + httpErrorCodeTranslation.ieError)
                    console.log(e)
                };
                try {
                    n.processing = function() {};
                    n.ontimeout = function() {}; // "
                    //n.open("POST", i), n.send()
                    n.open("POST", this._iqEndpoint), n.setRequestHeader("Content-Type", "application/jsonp;charset=UTF-8"), n.send(JSON.stringify(this.object))
                } catch (s) {
                    console.log(s)
                }
            }*/
        }
    }(this);
