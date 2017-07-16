Array.prototype.indexOf || (Array.prototype.indexOf = function(a, b) {
    if (void 0 === this || null === this)
        throw new TypeError('"this" is null or not defined');
    var c = this.length >>> 0;
    b = +b || 0;
    Infinity === Math.abs(b) && (b = 0);
    0 > b && (b += c,
    0 > b && (b = 0));
    for (; b < c; b++)
        if (this[b] === a)
            return b;
    return -1
}
);
Object.keys || (Object.keys = function(a) {
    var b = [], c;
    for (c in a)
        a.hasOwnProperty(c) && b.push(c);
    return b
}
);
function register(a, b, c, d) {
    try {
        if (!isValidUsername(a))
            return -1 != a.indexOf("..") ? d("invalid", "au", "Your username must not contain multiple periods in a row.") : d("invalid", "au", "Letters, numbers, and basic symbols are allowed.<br/>Your username must begin with a letter.");
        if (!isValidPassword(b))
            return d("invalid", "ap");
        if (!isValidEmail(c))
            return d("invalid", "ae")
    } catch (e) {
        return !1
    }
    $.ajax({
        type: "POST",
        url: "/buy/signup.php",
        data: {
            p: "Win32",
            v: "4.9.0.0",
            cm: "1",
            au: a,
            ap: b,
            ae: c
        },
        dataType: "xml",
        success: function(a) {
            var b = $(a).find("failure");
            a = $(a).find("success");
            if (b.length)
                return d("failure", b.attr("ask"), b.text());
            if (a.length)
                return d("success", null, a.text())
        },
        error: function(a) {
            d("error", a.statusText)
        }
    })
}
function changeEmail(a, b, c, d) {
    $.ajax({
        type: "POST",
        url: "/api/user/0.1/index.php/change/email",
        data: {
            p: "Web",
            v: g_fullVersion,
            au: a,
            ap: b,
            ae: c
        },
        dataType: "xml",
        success: function(a) {
            return -1 != $(a).text().indexOf("success") ? d("success", $(a).text()) : d("failure", $(a).text())
        },
        error: function(a) {
            d("failure", a.statusText)
        },
        complete: function(a) {}
    })
}
function phoneSet(a, b, c, d, e) {
    $.ajax({
        type: "POST",
        url: "/api/user/0.1/index.php/confirm/generate",
        data: {
            p: "Web",
            v: g_fullVersion,
            au: a,
            ap: b,
            pn: c,
            co: d
        },
        dataType: "xml",
        success: function(a) {
            return -1 != $(a).text().indexOf("success") ? e("success", $(a).text()) : e("failure", $(a).text())
        },
        error: function(a) {
            e("failure", a.statusText)
        },
        complete: function(a) {}
    })
}
function phoneVerify(a, b, c, d, e) {
    $.ajax({
        type: "POST",
        url: "/api/user/0.1/index.php/confirm/verify",
        data: {
            p: "Web",
            v: g_fullVersion,
            au: a,
            ap: b,
            pn: c,
            cc: d
        },
        dataType: "xml",
        success: function(a) {
            return -1 != $(a).text().indexOf("success") ? e("success", $(a).text()) : e("failure", $(a).text())
        },
        error: function(a) {
            e("failure", a.statusText)
        },
        complete: function(a) {}
    })
}
function isValidEmail(a) {
    if (!a || 6 > a.length || -1 != a.indexOf(".."))
        return !1;
    validRegExp = /^[^@ ]+@[^@]+\.+[a-z.]{2,}$/i;
    return -1 == a.search(validRegExp) ? !1 : !0
}
function isValidUsername(a) {
    if (!a || 6 > a.length || 64 < a.length || -1 != a.indexOf(".."))
        return !1;
    validRegExp = /^[a-zA-Z][a-zA-Z0-9._]{1,62}[a-zA-Z0-9]$/;
    return -1 == a.search(validRegExp) ? !1 : !0
}
function isValidPassword(a) {
    return !a || 8 > a.length || 64 < a.length ? !1 : !0
}
function isValidPasswordCharacters(a) {
    return a.match(/[A-Z]+/) && a.match(/[a-z]+/) && (a.match(/[1-9]+/) || a.match(/\\W+/)) ? !0 : !1
}
;var g_newsFeedPro = null;
function proPurchasePrice(a, b, c, d, e) {
    $.ajax({
        url: "/api/store/0.1/index.php/catalog",
        type: "POST",
        data: "au=" + encodeURIComponent(a) + "&ap=" + encodeURIComponent(b),
        dataType: "xml",
        success: function(a) {
            if ("error" != $(a).find("response").text()) {
                var b = $(a).find("response").find("disabled");
                if (!(b && b.attr("text") && 0 < b.attr("text").length)) {
                    var c = b = 0;
                    parseFloat($(a).find("response").find("salestax").attr("rate"));
                    c = parseFloat($(a).find("response").find("item[code='PROLIFEUPG']").attr("price"));
                    isNaN(c) && (c = parseFloat($(a).find("response").find("item[code='PROLIFE']").attr("price")));
                    b = parseFloat($(a).find("response").find("item[code='PROYEARUPG']").attr("price"));
                    isNaN(b) && (b = parseFloat($(a).find("response").find("item[code='PROYEAR']").attr("price")));
                    if (!isNaN(b) && !isNaN(c)) {
                        var k;
                        a = Math.ceil(100 * (1 - b / 20));
                        k = Math.ceil(100 * (1 - c / 80));
                        null != d && 0 != d && (new Date).getTime();
                        0 != a && 0 != k ? (e.html("<b>Special existing customer pricing</b> for Trillian Pro. Only $" + b + " (" + a + "% off) for a full year or $" + c + " (" + k + "% off) for a lifetime membership."),
                        g_newsFeedPro = e.html() + " <a href='#' id='x_newsFeedProAction'>Upgrade today!</a>") : (e.html("<b>Upgrade to Trillian Pro</b> for only $" + b + " for a full year or $" + c + " for a lifetime membership."),
                        g_newsFeedPro = "<a href='#' id='x_newsFeedProAction'>Upgrade to Trillian Pro</a> for only $" + b + " for a full year or $" + c + " for a lifetime membership.");
                        e.fadeIn();
                        g_adVisible = !0;
                        resize();
                        updateNewsFeed()
                    }
                }
            }
        },
        error: function(a, b, c) {}
    })
}
;var g_octopusSecureURL = "https://octopus.trillian.im/trillian"
  , g_octopusURL = "http://octopus.trillian.im/trillian"
  , g_mediaURL = ""
  , g_sequence = -1
  , g_tlsOn = !1
  , g_nonce = ""
  , g_sessionError = !1
  , g_sessionReady = !1
  , g_connections = 0
  , g_username = ""
  , g_password = ""
  , g_packets = []
  , g_session = -1
  , g_errors = 0
  , g_timeouts = 0
  , g_user = null
  , g_pendingTimeout = !1
  , g_protocol = null
  , g_inhouseServer = !1
  , g_neverDomains = "gmail.com hotmail.com yahoo.com gmx.de web.de aol.com live.com mail.ru googlemail.com msn.com hotmail.de gmx.net comcast.net yahoo.de hotmail.fr hotmail.co.uk ymail.com seznam.cz me.com yandex.ru aim.com freenet.de live.de yahoo.co.uk sbcglobal.net yahoo.fr t-online.de arcor.de yahoo.co.id verizon.net yahoo.co.in mac.com live.fr cox.net rambler.ru freemail.hu hotmail.it rocketmail.com live.co.uk windowslive.com att.net yahoo.com.br qq.com bk.ru online.de free.fr gmx.at centrum.cz live.nl cox.net rambler.ru freemail.hu hotmail.it rocketmail.com live.co.uk windowslive.com att.net yahoo.com.br qq.com bk.ru online.de free.fr gmx.at centrum.cz live.nl bellsouth.net yahoo.ca inbox.ru yahoo.es list.ru earthlink.net gmx.com charter.net hotmail.es live.ca 163.com ya.ru optonline.net yahoo.it yahoo.com.vn email.cz ukr.net yahoo.com.au live.it abv.bg ibm.com microsoft.com google.com facebook.com groups.live.com mail.com".split(" ");
function createPacket(a) {
    var b = {};
    b.nonce = g_nonce;
    b.data = a;
    b.sequenceNumber = -1;
    b.secure = !1;
    b.state = "pending";
    b.discard = !1;
    b.xrack = 0;
    b.xack = 0;
    b.xdisc = 0;
    if (-1 != a.indexOf("c=sessionLogin") || -1 != a.indexOf("c=identityAccountConnect") || -1 != a.indexOf("c=identityAccountAdd"))
        b.secure = !0;
    return b
}
function addPacket(a, b, c) {
    a = createPacket(a);
    g_packets.push(a);
    a.loading = b;
    a.progress = c;
    sendNextPacket();
    return a
}
function updatePacket(a) {
    if (-1 != a.sequenceNumber)
        return a.state = "sending",
        a;
    a.data += "&xsession=" + g_session;
    var b = ++g_sequence;
    a.data += "&xsequence=" + b;
    a.sequenceNumber = b;
    a.state = "sending";
    0 < g_packets.length && "error" == g_packets[0].state && (a.data += "&xrack=" + g_packets[0].sequenceNumber);
    a.secure || g_tlsOn ? (a.secure = !0,
    a.data += "&xusername=" + g_username,
    a.data += "&xpassword=" + encodeURIComponent(g_password)) : (b = Crypto.HMAC(Crypto.SHA1, a.data, g_nonce),
    a.data += "&xhmac=" + b);
    return a
}
function packetWithSequence(a) {
    for (var b = 0; b < g_packets.length; b++)
        if (g_packets[b].sequenceNumber == a)
            return g_packets[b];
    return null
}
function processHelpers() {
    for (var a = 0; a < g_packets.length; a++) {
        if (0 != g_packets[a].xrack) {
            var b = packetWithSequence(g_packets[a].xrack);
            b ? "success" == b.state ? log("Ignoring xrack: Already has a response: " + g_packets[a].xrack + "...") : "sending" == b.state ? log("Ignoring xrack: Already in progress: " + g_packets[a].xrack + "...") : (log("Processing xrack: Resetting packet to only resend: " + g_packets[a].xrack + "..."),
            b.state = "pending",
            b.data = "c=sessionResend") : log("Ignoring xrack: Unable to find packet: " + g_packets[a].xrack + "...");
            g_packets[a].xrack = 0
        }
        0 != g_packets[a].xdisc && ((b = packetWithSequence(g_packets[a].xdisc)) ? "success" == b.state ? log("Ignoring xdisc: Already has a response: " + g_packets[a].xdisc + "...") : "sending" == b.state ? log("Ignoring xdisc: Already in progress: " + g_packets[a].xdisc + "...") : (log("Processing xdisc: Discarding packet " + g_packets[a].xdisc + "..."),
        b.discard = !0) : log("Ignoring xdisc: Unable to find packet: " + g_packets[a].xdisc + "..."),
        g_packets[a].xdisc = 0);
        if (0 != g_packets[a].xack) {
            var c = 1 * g_packets[a].xack + 1;
            (b = packetWithSequence(c)) ? "success" == b.state ? log("Ignoring xack: Already has a response: " + c + "...") : "sending" == b.state ? log("Ignoring xack: Already in progress: " + c + "...") : (log("Processing xack: Resetting packet " + c + "..."),
            b.state = "pending") : log("Ignoring xack: Unable to find packet: " + c + "...");
            g_packets[a].xack = 0
        }
    }
    for (a = 0; a < g_packets.length; a++)
        g_packets[a].discard && (g_packets.splice(a, 1),
        a--)
}
function sendNextPacket() {
    if (!g_sessionError && -1 != g_session && 2 != g_connections && !g_pendingTimeout)
        if (4 < g_errors)
            3 > g_timeouts ? (log("Too many errors.  pausing..."),
            g_timeouts++,
            g_errors = 0,
            g_pendingTimeout = !0,
            setTimeout(function() {
                g_pendingTimeout = !1;
                sendNextPacket()
            }, 1E4)) : (log("Too many errors.   Done."),
            g_sessionError = !0,
            sessionError("connection_error"));
        else {
            processHelpers();
            var a = void 0;
            0 == g_packets.length && (log("sendNextPacket: creating poll"),
            a = createPacket("c=sessionPoll"),
            g_packets.push(a));
            if (!a)
                for (var b = g_packets[0].sequenceNumber, c = 0; c < g_packets.length; c++) {
                    var d = g_packets[c].sequenceNumber;
                    -1 == d && (d = g_sequence + 1);
                    if ("pending" == g_packets[c].state && (-1 == b || 3 > d - b)) {
                        log("sendNextPacket: found a pending packet to send (Lowest: " + b + ", Mine: " + d + ")");
                        a = g_packets[c];
                        break
                    }
                }
            var e = d = 0;
            if (!a) {
                for (c = 0; c < g_packets.length; c++)
                    "sending" == g_packets[c].state ? e++ : "error" == g_packets[c].state && d++;
                b = g_packets[0].sequenceNumber;
                !(3 > g_sequence + 1 - b || -1 == b) || e || d || (log("sendNextPacket: creating poll because there are no active or errored connections (Lowest: " + b + ", Mine: " + (g_sequence + 1) + ")"),
                a = createPacket("c=sessionPoll"),
                g_packets.push(a))
            }
            if (!a)
                for (c = 0; c < g_packets.length; c++)
                    if ("error" == g_packets[c].state) {
                        log("sendNextPacket: resending a previous packet");
                        a = g_packets[c];
                        break
                    }
            a && (a = updatePacket(a),
            sendPacket(a))
        }
}
function processEvent(a, b, c) {
    log("Event: " + a);
    switch (a) {
    case "session_info":
        g_octopusURL = "http://" + c["ip" + b] + "/trillian";
        g_nonce = c["nonce" + b];
        g_sequence = c["sequence" + b];
        g_session = c["session" + b];
        g_tlsOn = "on" == c["tls" + b] ? !0 : !1;
        g_protocol = c["protocol" + b];
        g_tlsOn && c["ip" + b] && (g_octopusSecureURL = "https://" + c["ip" + b] + "/trillian");
        "192.168.1.117" == c["ip" + b] ? g_octopusSecureURL = "https://octopus.trillian.im/trillian" : "192.168.1.119" == c["ip" + b] && (g_octopusSecureURL = "https://octopus2.trillian.im/trillian");
        break;
    case "session_logout":
        g_sessionError = !0;
        break;
    case "session_status":
        var d = c["status" + b];
        sessionStatus(d, c["statusmsg" + b]);
        break;
    case "identities_initialize":
        identitiesInitialize(c["identities" + b]);
        break;
    case "contactlist_initialize":
        contactlistInitialize(c["contactlist" + b]);
        break;
    case "connection_add":
        var e = c["connection" + b]
          , f = c["username" + b]
          , g = c["medium" + b]
          , d = c["status" + b];
        connectionAdd(g, f, e, d);
        break;
    case "connection_update":
        e = c["connection" + b];
        d = c["status" + b];
        connectionUpdate(e, d);
        break;
    case "contactlist_add":
        var f = c["username" + b]
          , g = c["medium" + b]
          , h = c["displayname" + b]
          , d = c["status" + b]
          , k = c["statusmsg" + b];
        a = c["iconhash" + b];
        var e = c["identity" + b]
          , l = c["group" + b];
        f && "metacontact" != g.toLowerCase() && (f = f.toLowerCase());
        f && g && contactlistAdd(g, f, h, d, k, a, e, l);
        break;
    case "contactlist_remove":
        f = c["username" + b];
        g = c["medium" + b];
        h = c["displayname" + b];
        d = c["status" + b];
        k = c["statusmsg" + b];
        a = c["iconhash" + b];
        e = c["identity" + b];
        f && "metacontact" != g.toLowerCase() && (f = f.toLowerCase());
        contactlistRemove(g, f, h, d, k, a, e);
        break;
    case "contactlist_rename":
        e = c["identity" + b];
        g = c["medium" + b];
        f = c["username" + b];
        a = c["name" + b];
        f && "metacontact" != g.toLowerCase() && (f = f.toLowerCase());
        contactlistRename(g, f, a, e);
        break;
    case "groupchat_add":
        g = c["medium" + b];
        f = c["account" + b];
        a = c["name" + b];
        h = c["displayname" + b];
        l = c["group" + b];
        groupchatAddReceived(g, a, f, h, l);
        break;
    case "groupchat_remove":
        g = c["medium" + b];
        f = c["account" + b];
        a = c["name" + b];
        l = c["group" + b];
        groupchatRemoveReceived(g, a, f, l);
        break;
    case "groupchat_mute":
        g = c["medium" + b];
        f = c["account" + b];
        a = c["name" + b];
        b = c["muteduntil" + b];
        groupchatMuteReceived(g, a, f, b);
        break;
    case "groupchat_update":
    case "groupchat_rename":
        e = c["identity" + b];
        g = c["medium" + b];
        a = c["name" + b];
        h = c["displayname" + b];
        contactlistRename(g, a, h, e);
        break;
    case "groupchat_listResponse":
        b = decodeURIComponent(c["groupchats" + b]);
        b = $.base64.decode(b);
        groupchatListResponse(b);
        break;
    case "contactlist_mute":
        g = c["medium" + b];
        f = c["username" + b];
        b = c["muteduntil" + b];
        f && "metacontact" != g.toLowerCase() && (f = f.toLowerCase());
        contactlistMuteReceived(g, f, b);
        break;
    case "contactlist_update":
        f = c["username" + b];
        g = c["medium" + b];
        h = c["displayname" + b];
        d = c["status" + b];
        k = c["statusmsg" + b];
        a = c["iconhash" + b];
        e = c["identity" + b];
        l = c["servergroup" + b];
        (b = c["iconurl" + b]) && 0 < b.length && (a = b);
        f && "metacontact" != g.toLowerCase() && (f = f.toLowerCase());
        contactlistUpdate(g, f, h, d, k, a, e, l);
        break;
    case "message_open":
        h = c["window" + b];
        a = c["username" + b];
        var e = c["displayname" + b]
          , d = c["echoname" + b]
          , k = c["initiated" + b]
          , g = c["medium" + b]
          , m = parseInt(c["caps" + b])
          , l = "1" == c["isgroup" + b] ? !0 : !1
          , p = c["connectionname" + b]
          , n = "1" == c["disabled" + b] ? !0 : !1;
        b = c["disablemessage" + b];
        n && !b && (b = "Edit area is disabled.");
        g_pendingGroupChatBadge && g_pendingGroupChatBadge == a && (k = "0");
        messageOpen(h, a, e, d, g, l, p, m);
        n && messageUpdate(h, f, n, b, m);
        "1" == k && g_sessionReady && messageFocus(h, !0);
        break;
    case "message_close":
        h = c["window" + b];
        messageClose(h, !1);
        break;
    case "message_ack":
        h = c["window" + b];
        messageAck(h, !1);
        break;
    case "message_focus":
        h = c["window" + b];
        messageFocus(h, !0);
        break;
    case "message_nicklistAdd":
        h = c["window" + b];
        a = c["name" + b];
        f = c["displayname" + b];
        g = "1" == c["op" + b] ? !0 : !1;
        l = "1" == c["voice" + b] ? !0 : !1;
        e = "1" == c["bot" + b] ? !0 : !1;
        messageNicklistAdd(h, a, f, g, l, e, c["avatarurl" + b]);
        break;
    case "message_nicklistChange":
        h = c["window" + b];
        a = c["name" + b];
        f = c["displayname" + b];
        g = "1" == c["op" + b] ? !0 : !1;
        l = "1" == c["voice" + b] ? !0 : !1;
        e = "1" == c["bot" + b] ? !0 : !1;
        messageNicklistChange(h, a, f, g, l, e);
        break;
    case "message_nicklistRemove":
        h = c["window" + b];
        a = c["name" + b];
        messageNicklistRemove(h, a);
        break;
    case "message_update":
        h = c["window" + b];
        m = parseInt(c["caps" + b]);
        f = c["displayname" + b];
        n = "1" == c["disabled" + b] ? !0 : !1;
        b = c["disablemessage" + b];
        n && !b && (b = "Edit area is disabled.");
        messageUpdate(h, f, n, b, m);
        break;
    case "message_receive":
        h = c["window" + b];
        l = c["type" + b];
        d = c["time" + b];
        k = c["ms" + b];
        g = c["msg" + b];
        e = c["unread" + b];
        a = c["name" + b];
        f = c["displayname" + b];
        b = c["noalert" + b];
        c = 1E3 * d + (k ? parseInt(k) : 0);
        messageReceive(h, l, c - g_timeSkew, c, e, g, a, f, b);
        break;
    case "message_stateSet":
        h = c["window" + b];
        a = c["state" + b];
        messageStateSet(h, c["control" + b], a);
        break;
    case "message_buzz":
        h = c["window" + b];
        messageReceiveBuzz(h, "incoming_privateMessage", (new Date).getTime(), (new Date).getTime() + g_timeSkew);
        break;
    case "session_ready":
        g_sessionReady = !0;
        sessionReady();
        break;
    case "session_error":
        d = c["reason" + b];
        g_sessionError = !0;
        sessionError(d);
        break;
    case "interface_open":
        a = decodeURIComponent(c["xml" + b]);
        a = $.base64.decode(a);
        h = c["id" + b];
        interfaceOpen(a, h, c["newwindow" + b]);
        break;
    case "contactlist_error":
        d = c["reason" + b];
        a = c["data" + b];
        l = c["type" + b];
        g = c["medium" + b];
        (f = c["username" + b]) && (f = f.toLowerCase());
        contactlistError(l, d, a, g, f);
        break;
    case "avatar_set":
        a = decodeURIComponent(c["avatar" + b]);
        a = $.base64.decode(a);
        h = c["hash" + b];
        g = c["medium" + b];
        f = c["username" + b];
        avatarSet(a, h, g, f);
        break;
    case "alert_set":
        e = c["connection" + b];
        l = c["type" + b];
        connectionAlert(e, l, c["text" + b]);
        break;
    case "settings_set":
        l = c["type" + b];
        receivedSetting(l, c["value" + b]);
        break;
    case "identity_update":
        e = c["identity" + b];
        a = c["avatar" + b];
        f = c["displayname" + b];
        identityUpdate(e, a, f);
        break;
    case "identity_accountAdd":
        e = c["identity" + b];
        g = c["medium" + b];
        f = c["username" + b];
        identityAccountAdd(g, f, e, "1" == c["password" + b] ? !0 : !1);
        break;
    case "identity_accountRemove":
        e = c["identity" + b];
        g = c["medium" + b];
        f = c["username" + b];
        identityAccountRemove(g, f, e);
        break;
    case "contactlist_authorize":
        e = c["connection" + b];
        f = c["username" + b];
        h = c["displayname" + b];
        a = c["iconhash" + b];
        l = c["type" + b];
        d = c["reason" + b];
        f && (f = f.toLowerCase());
        contactlistAuthorize(e, f, h, a, l, d);
        break;
    case "device_add":
        g = c["current" + b];
        f = c["description" + b];
        h = c["ipaddress" + b];
        l = c["logintime" + b];
        a = c["name" + b];
        deviceAdd(a, f, h, l, g);
        break;
    case "device_remove":
        a = c["name" + b];
        deviceRemove(a);
        break;
    case "membership_namesSet":
        membershipNamesSet(c["firstname" + b], c["lastname" + b]);
        break;
    case "membership_phoneSet":
        a = "1" == c["verified" + b] ? !0 : !1;
        membershipPhoneSet(c["phone" + b], a);
        break;
    case "membership_genderSet":
        membershipGenderSet(c["gender" + b]);
        break;
    case "membership_emailSet":
        g = c["email" + b];
        a = "1" == c["verified" + b] ? !0 : !1;
        membershipEmailSet(g, a);
        break;
    case "membership_dobSet":
        membershipDobSet(c["month" + b], c["day" + b], c["year" + b]);
        break;
    case "membership_set":
        l = "1" == c["history" + b] ? !0 : !1;
        membershipSet(c["expiration" + b], l, "1" == c["pro" + b] ? !0 : !1, "1" == c["ads" + b] ? !0 : !1, "1" == c["lifetime" + b] ? !0 : !1);
        break;
    case "membership_passwordUpdateResponse":
        membershipPasswordUpdateResponse("1" == c["success" + b] ? !0 : !1);
        break;
    case "privacy_cloudLoggingSet":
        a = c["state" + b];
        privacyCloudLoggingSet("on" == a ? !0 : !1);
        break;
    case "privacy_autoHistorySet":
        a = c["state" + b];
        privacyAutoHistorySet("on" == a ? !0 : !1);
        break;
    case "domain_set":
        b = c["policy" + b];
        domainSet(b ? b : "");
        break;
    case "history_set":
        g = c["medium" + b],
        a = c["name" + b],
        f = c["previousyear" + b],
        h = c["previousweek" + b],
        b = decodeURIComponent(c["history" + b]),
        l = $.base64.decode(b),
        historySet(g, a, h, f, l)
    }
}
function parseNextPacket() {
    for (log("Parsing next packets: " + g_packets.length); 0 < g_packets.length && "success" == g_packets[0].state; )
        parse(g_packets.shift());
    sendNextPacket()
}
function preParse(a) {
    for (var b = [], c = a.result.split("&"), d = 0; d < c.length; d++) {
        var e = c[d].split("=");
        b[e[0]] = decodeURIComponent(e[1])
    }
    "session_error" == b.e0 && (c = b.reason0,
    g_sessionError = !0,
    sessionError(c));
    a.xack = b.xack ? b.xack : 0;
    a.xrack = b.xrack ? b.xrack : 0;
    a.xdisc = b.xdisc ? b.xdisc : 0;
    return a
}
function parse(a) {
    if (!g_sessionError) {
        log("Parsing (" + a.sequenceNumber + ")");
        for (var b = [], c = a.result.split("&"), d = 0; d < c.length; d++) {
            var e = c[d].split("=");
            b[e[0]] = decodeURIComponent(e[1])
        }
        if (0 < g_nonce.length && (d = b.xhmac,
        a = a.result,
        a = a.substr(0, a.length - 47),
        a = Crypto.HMAC(Crypto.SHA1, a, g_nonce),
        a != d)) {
            g_sessionError = !0;
            log("HMAC Invalid: " + a + " (Local) != " + d + " (Remote)");
            sessionError("hmac_invalid_on_receipt");
            return
        }
        a = b.xtimestamp;
        void 0 != a && (a = parseInt(a) - (new Date).getTime(),
        timeSkewSet(a));
        a = b.n;
        for (d = 0; d < a; d++)
            processEvent(b["e" + d], d, b);
        packetsParsed()
    }
}
function sessionLogin(a, b) {
    g_octopusSecureURL = "https://octopus.trillian.im/trillian";
    g_octopusURL = "http://octopus.trillian.im/trillian";
    g_mediaURL = "";
    g_packets = [];
    g_errors = g_connections = 0;
    g_pendingTimeout = !1;
    g_timeouts = 0;
    g_sessionError = g_sessionReady = g_tlsOn = !1;
    g_nonce = "";
    g_username = a;
    g_password = b;
    g_sessionLog = [];
    g_sessionLogCount = g_sessionCursor = 0;
    g_inhouseServer = !1;
    var c = createPacket("c=sessionLogin&protocol=2&lang=en&client=Trillian&version=" + g_fullVersion + "&platform=Web&device=WEB&expire=5&xusername=" + a + "&xpassword=" + encodeURIComponent(b));
    g_packets.push(c);
    var d = a.indexOf("@");
    if (-1 != d) {
        var e = a.toLowerCase().substr(d + 1);
        if ("trillian.im" != e) {
            if (-1 != g_neverDomains.indexOf(e)) {
                g_packets = [];
                g_sessionError = !0;
                sessionError("username_invalid");
                return
            }
            log("Request: Local server IP for " + e + ".");
            $.getJSON("/web/4.0/lookup.php?domain=" + e, function(a) {
                for (var b = !1, d = 0; d < a.length; d++) {
                    var k = a[d];
                    k.target && 0 != k.target.length && (k.host.toLowerCase() == "_impp-https._tcp." + e ? (g_octopusSecureURL = "https://" + k.target + "/trillian",
                    g_octopusURL = "http://" + k.target + "/trillian",
                    log("Octopus URL: " + g_octopusSecureURL),
                    b = !0) : k.host.toLowerCase() == "_impp-media._tcp." + e && (g_mediaURL = "https://" + k.target + "/media/?m=",
                    log("Media URL: " + g_mediaURL)))
                }
                b ? (g_inhouseServer = !0,
                -1 != g_packets.indexOf(c) && sendPacket(c)) : (g_user = new User,
                g_user.signin(g_username, g_password, userRequest, c))
            }).error(function(a) {
                g_user = new User;
                g_user.signin(g_username, g_password, userRequest, c)
            });
            return
        }
    }
    sendPacket(c);
    alerts();
    g_user = new User;
    g_user.signin(g_username, g_password, simpleUserRequest, null)
}
function simpleUserRequest(a) {}
function userRequest(a) {
    g_user.error ? (g_packets = [],
    g_sessionError = !0,
    sessionError(g_user.errorReason)) : (-1 != g_packets.indexOf(a) && sendPacket(a),
    g_user.domain_admin && ui_domainAdmin())
}
function alerts() {
    $.get("/alerts/alerts.php?version=" + g_fullVersion + "&platform=Web")
}
function sessionLogout(a) {
    g_packets = [];
    a && addPacket("c=sessionLogout");
    g_sessionError = g_tlsOn = !1;
    g_password = g_username = g_nonce = "";
    g_sessionLog = [];
    g_sessionLogCount = g_sessionCursor = 0;
    sessionLoggedout()
}
function sendPacket(a) {
    var b = a.secure || g_tlsOn ? g_octopusSecureURL : g_octopusURL;
    log("Sending (" + b + "): " + a.data);
    g_connections++;
    $.ajax({
        type: "POST",
        url: b,
        data: a.data,
        timeout: 6E4,
        xhr: function() {
            var b = $.ajaxSettings.xhr();
            b.upload && a.progress && (b.upload.onprogress = function(b) {
                b.lengthComputable && b.total && a.progress(b.loaded / b.total)
            }
            );
            return b
        },
        beforeSend: function() {
            a.loading && a.loading(!0)
        },
        complete: function() {
            a.loading && a.loading(!1)
        },
        success: function(b, d, e) {
            a.nonce != g_nonce ? log("Success, however from the wrong session (" + a.sequenceNumber + "): " + b) : (log("Success (" + a.sequenceNumber + "): " + b),
            g_connections--,
            g_timeouts = g_errors = 0,
            a.state = "success",
            a.result = b,
            a = preParse(a),
            parseNextPacket())
        },
        error: function(b, d, e) {
            log("Error (" + a.sequenceNumber + "): (" + d + ") " + b.responseText);
            g_connections--;
            a.state = "error";
            g_errors++;
            parseNextPacket();
            -1 != a.data.indexOf("=sessionLogin") && (log("Fatal error during session login"),
            g_sessionError = !0,
            sessionError("login_error_" + d))
        }
    })
}
function octopusProtocol2() {
    return null == g_protocol || "2" == g_protocol ? !1 : !0
}
function octopusProtocol4() {
    return octopusProtocol2() ? 4 <= +g_protocol ? !0 : !1 : !1
}
;var g_product = "Trillian for Web"
  , g_version = "4.2"
  , g_date = "August 30, 2016"
  , g_build = "10"
  , g_fullVersion = "4.2.0.10"
  , g_postVersion = "&v=" + g_fullVersion + "&p=web"
  , g_view = null
  , g_launched = !1
  , g_messageWindows = []
  , g_messageIdFocus = -1
  , g_savedMessageIdFocus = -1
  , g_displayname = ""
  , g_echoName = ""
  , g_contacts = []
  , g_accounts = []
  , g_status = ""
  , g_statusMessage = ""
  , g_showOfflineContacts = !1
  , g_settingsEmoji = !0
  , g_settingsSounds = !0
  , g_avatars = []
  , g_notifications = []
  , g_focused = !0
  , g_browserFocused = !0
  , g_sessionLog = []
  , g_sessionCursor = 0
  , g_sessionLogCount = 0
  , g_sessionLogLimit = 1E3
  , g_consoleLog = !1
  , g_setting = {}
  , g_settingCallback = {}
  , g_callout = {}
  , g_authrequest = []
  , g_devices = []
  , g_policy = []
  , g_membershipEmail = ""
  , g_membershipEmailVerified = !1
  , g_membershipFirstName = ""
  , g_membershipLastName = ""
  , g_membershipPhone = ""
  , g_membershipPhoneVerified = !1
  , g_membershipGender = ""
  , g_membershipDobMonth = ""
  , g_membershipDobDay = ""
  , g_membershipDobYear = ""
  , g_membershipPro = !1
  , g_membershipSet = !1
  , g_membershipExpiration = 0
  , g_membershipLifetime = !1
  , g_privacyCloudLogging = !1
  , g_privacyAutoHistory = !1
  , g_historyMessages = []
  , g_historyRequests = []
  , g_historyPending = !1
  , g_timeSkew = 0;
function connectUI(a) {
    g_view = a;
    g_view.ui_sessionLoggedout();
    g_view.ui_product_info(g_product, g_version, g_build, g_date)
}
function identityUpdate(a, b, c) {
    null != b && (a = decodeURIComponent(b),
    g_avatars.me = a ? "data:image/png;base64," + a : null,
    g_view.ui_avatarUpdate(),
    g_view.ui_avatarShow(null, null, "me", g_avatars.me));
    null != c && (g_displayname = decodeURIComponent(c),
    g_view.ui_displayname(g_displayname))
}
function identitiesInitialize(a) {
    var b = g_accounts;
    g_accounts = [];
    a = $.base64.decode(a);
    a = $.parseXML(a);
    $(a).find("i").each(function() {
        if ("default" == $(this).attr("n")) {
            var a = decodeURIComponent($(this).attr("a"));
            g_avatars.me = a ? "data:image/png;base64," + a : null;
            g_view.ui_avatarUpdate();
            g_view.ui_avatarShow(null, null, "me", g_avatars.me);
            g_displayname = decodeURIComponent($(this).attr("d"));
            g_view.ui_displayname(g_displayname);
            g_displayname || (g_displayname = g_username,
            g_view.ui_displayname(g_displayname))
        }
    });
    $(a).find("a").each(function() {
        var a = decodeURIComponent($(this).attr("u"))
          , b = $(this).attr("m")
          , c = $(this).attr("p");
        mediumSupported(b) && g_accounts.push({
            name: a,
            medium: b,
            password: c,
            connection: -1,
            status: "offline"
        })
    });
    for (a = 0; a < g_accounts.length; a++)
        for (var c = 0; c < b.length; c++)
            if (g_accounts[a].medium == b[c].medium && g_accounts[a].name == b[c].name) {
                g_accounts[a].status = b[c].status;
                g_accounts[a].connection = b[c].connection;
                break
            }
}
function identityAccountAdd(a, b, c, d) {
    mediumSupported(a) && (g_accounts.push({
        name: b,
        medium: a,
        password: d,
        connection: -1,
        status: "offline"
    }),
    ui_accountsUpdate(!0))
}
function processChildren(a, b) {
    $(b).children().each(function() {
        if ("g" == this.tagName) {
            var b = $(this).children("t").text();
            try {
                b = decodeURIComponent(b)
            } catch (d) {}
            processChildren(b, $(this))
        } else if ("mc" == this.tagName) {
            b = {
                search_score: 0,
                medium: "METACONTACT"
            };
            b.group = a;
            b.displayname = b.realname = $(this).find("t").text();
            b.status = "offline";
            b.isGroup = !1;
            b.account = "";
            b.mutedUntil = $(this).attr("mu");
            try {
                b.displayname = b.realname = decodeURIComponent(b.displayname)
            } catch (d) {}
            g_contacts.push(b);
            b = "metacontact:" + b.realname;
            processChildren(b, $(this))
        } else if ("gc" == this.tagName) {
            if (mediumSupported($(this).attr("m"))) {
                b = {
                    search_score: 0
                };
                b.medium = $(this).attr("m");
                b.account = $(this).attr("a");
                b.group = a;
                b.realname = $(this).attr("n");
                b.displayname = $(this).text();
                b.mutedUntil = $(this).attr("mu");
                "ASTRA" == b.medium ? "offline" == getAstraConnection().status.toLowerCase() ? b.status = getAstraConnection().status : b.status = "online" : b.status = "offline";
                b.isGroup = !0;
                try {
                    b.realname = decodeURIComponent(b.realname)
                } catch (d) {}
                try {
                    b.displayname = decodeURIComponent(b.displayname)
                } catch (d) {}
                g_contacts.push(b)
            }
        } else if ("c" == this.tagName && mediumSupported($(this).attr("m"))) {
            b = {
                search_score: 0
            };
            b.medium = $(this).attr("m");
            b.group = a;
            b.realname = $(this).attr("r").toLowerCase();
            b.isGroup = !1;
            b.account = "";
            b.mutedUntil = $(this).attr("mu");
            try {
                b.realname = decodeURIComponent(b.realname)
            } catch (d) {}
            b.displayname = $(this).text();
            b.status = "offline";
            try {
                b.displayname = decodeURIComponent(b.displayname)
            } catch (d) {}
            g_contacts.push(b)
        }
    })
}
function contactlistInitialize(a) {
    g_contacts = [];
    a = $.base64.decode(a);
    a = $.parseXML(a);
    $(a).find("s").each(function() {
        processChildren("root", this)
    })
}
function connectionAdd(a, b, c, d) {
    for (var e = 0, f = 0; f < g_accounts.length; f++)
        if (g_accounts[f].medium == a && g_accounts[f].name == b) {
            g_accounts[f].connection = c;
            g_accounts[f].status = d.toLowerCase();
            e++;
            break
        }
    e || mediumSupported(a) && g_accounts.push({
        name: b,
        medium: a,
        password: "",
        connection: c,
        status: d
    });
    g_view.ui_accountsUpdate()
}
function connectionUpdate(a, b) {
    var c = getAccountByConnection(a);
    if (c) {
        c.status = b.toLowerCase();
        g_view.ui_accountsUpdate();
        for (var d = 0; d < g_contacts.length; d++)
            if (g_contacts[d].isGroup && g_contacts[d].medium == c.medium) {
                var e = "online";
                "offline" == b.toLowerCase() && (e = "offline");
                if (g_contacts[d].status != e) {
                    g_contacts[d].status = e;
                    ui_contactlistUpdate(g_contacts[d]);
                    for (var f = 0; f < g_messageWindows.length; f++) {
                        var g = g_messageWindows[f];
                        g.username == g_contacts[d].realname && g.medium == g_contacts[d].medium && g_view.ui_contactlistWindowUpdate(g.id, e, g_contacts[d].medium, g_contacts[d].realname, g_contacts[d].iconhash)
                    }
                }
            }
    }
}
function connectionAlert(a, b, c) {
    if (a = getAccountByConnection(a))
        switch (a.alertType = b,
        a.alertText = c,
        c = a.medium + a.name,
        b) {
        case "password-fail":
            calloutAdd("accounts", c),
            setTimeout(g_view.ui_accountsUpdate, 500)
        }
}
function getAccountByConnectionName(a, b) {
    for (var c = 0; c < g_accounts.length; c++)
        if (g_accounts[c].medium == a && g_accounts[c].name == b)
            return g_accounts[c];
    return null
}
function getAccountByConnection(a) {
    for (var b = 0; b < g_accounts.length; b++)
        if (g_accounts[b].connection == a)
            return g_accounts[b];
    return null
}
function getAstraConnection() {
    for (var a = 0; a < g_accounts.length; a++)
        if ("astra" == g_accounts[a].medium.toLowerCase())
            return g_accounts[a];
    return null
}
function matchScore(a, b) {
    var c = a.toLowerCase()
      , d = b.toLowerCase();
    return 0 == d.length || 0 == c.length ? 0 : c == d ? 500 : 1 < d.length && -1 != c.search("\\b" + d + "\\b") ? 400 : c.length > d.length && c.substr(0, d.length) == d ? 300 : -1 != c.search("\\b" + d) ? 200 : -1 != c.indexOf(d) ? 100 : 0
}
function contactStatusScore(a) {
    return "online" == a.status.toLowerCase() ? 40 : "away" == a.status.toLowerCase() ? 30 : "busy" == a.status.toLowerCase() || "dnd" == a.status.toLowerCase() ? 20 : "mobile" == a.status.toLowerCase() ? 40 : 0
}
function contactMatchScore(a, b) {
    if (!networkAvailableForContact(a))
        return 0;
    var c = matchScore(a.displayname, b);
    0 == c && (c = matchScore(a.realname, b));
    0 < c && ("online" == a.status.toLowerCase() ? c += 40 : "away" == a.status.toLowerCase() ? c += 30 : "busy" == a.status.toLowerCase() ? c += 20 : "dnd" == a.status.toLowerCase() ? c += 20 : "mobile" == a.status.toLowerCase() && (c += 40),
    "metacontact" == a.medium.toLowerCase() && (c += 4));
    return c
}
function networkAvailableForContact(a) {
    return "metacontact" == a.medium.toLowerCase() ? !0 : networkAvailable(a.medium)
}
function networkAvailable(a) {
    for (var b = 0; b < g_accounts.length; b++)
        if (a.toLowerCase() == g_accounts[b].medium.toLowerCase()) {
            var c = g_accounts[b].status;
            if ("offline" != c && c && 0 < c.length)
                return !0
        }
    return !1
}
function statusSort(a, b) {
    var c = 5
      , d = 5;
    "online" == a.toLowerCase() && (c = 10);
    "online" == b.toLowerCase() && (d = 10);
    "away" == a.toLowerCase() && (c = 5);
    "away" == b.toLowerCase() && (d = 5);
    "mobile" == a.toLowerCase() && (c = 10);
    "mobile" == b.toLowerCase() && (d = 10);
    "invisible" == a.toLowerCase() && (c = 2);
    "invisible" == b.toLowerCase() && (d = 2);
    "auth" == a.toLowerCase() && (c = 1);
    "auth" == b.toLowerCase() && (d = 1);
    "offline" == a.toLowerCase() && (c = 0);
    "offline" == b.toLowerCase() && (d = 0);
    return c > d ? -1 : d > c ? 1 : 0
}
function accountSort(a, b) {
    var c = !1
      , d = a.status;
    "offline" != d && d && 0 < d.length && (c = !0);
    var d = !1
      , e = b.status;
    "offline" != e && e && 0 < e.length && (d = !0);
    if (c && !d)
        return -1;
    if (d && !c)
        return 1;
    c = a.medium;
    d = b.medium;
    "ASTRA" == c && (c = "aaaaaaa");
    "ASTRA" == d && (d = "aaaaaaa");
    return c == d ? a.name.toLowerCase().localeCompare(b.name.toLowerCase()) : c.localeCompare(d)
}
function statusOnline(a) {
    var b = g_statusMessage && 0 < g_statusMessage.length && "Away from Trillian" != g_statusMessage ? g_statusMessage : "";
    "online" == g_status.toLowerCase() && null == a && (b = "");
    g_status = "online";
    g_statusMessage = encodeURIComponent(b);
    l_data = "c=sessionStatus&status=online&statusmsg=" + b;
    addPacket(l_data)
}
function statusAway() {
    var a = g_statusMessage && 0 < g_statusMessage.length ? g_statusMessage : "Away from Trillian";
    g_status = "away";
    g_statusMessage = encodeURIComponent(a);
    l_data = "c=sessionStatus&status=away&statusmsg=" + a;
    addPacket(l_data)
}
function statusDND() {
    g_status = "do not disturb";
    g_statusMessage = null;
    l_data = "c=sessionStatus&status=do%20not%20disturb";
    addPacket(l_data)
}
function statusInvisible() {
    g_status = "invisible";
    g_statusMessage = null;
    l_data = "c=sessionStatus&status=invisible";
    addPacket(l_data)
}
function statusOffline(a) {
    a && sessionLogout(!0);
    g_messageIdFocus = -1;
    g_messageWindows = [];
    g_contacts = [];
    g_authrequest = [];
    g_devices = [];
    g_policy = [];
    g_historyMessages = [];
    g_historyRequests = [];
    g_historyPending = !1;
    g_membershipEmail = "";
    g_membershipEmailVerified = !1;
    g_membershipPhone = g_membershipLastName = g_membershipFirstName = "";
    g_membershipPhoneVerified = !1;
    g_membershipDobYear = g_membershipDobDay = g_membershipDobMonth = g_membershipGender = "";
    g_membershipSet = g_membershipPro = !1;
    g_membershipExpiration = 0;
    g_privacyAutoHistory = g_privacyCloudLogging = g_membershipLifetime = !1;
    g_echoName = g_displayname = "";
    g_status = "offline";
    g_statusMessage = null;
    g_callout = {};
    g_setting = {};
    g_settingCallback = {};
    windowTitleUpdate();
    ui_updateWindowList()
}
function sessionStatus(a, b) {
    g_status = a;
    g_statusMessage = b;
    g_view.ui_sessionStatus(a, b)
}
function sessionIdle(a) {
    l_data = "c=sessionIdle&seconds=" + a.toFixed(0);
    addPacket(l_data)
}
function avatarRequest(a, b, c, d) {
    if (a && !(0 >= a.length))
        if (void 0 != g_avatars[a] && "pending" != g_avatars[a])
            setTimeout(function() {
                g_view.ui_avatarShow(b, c, a, g_avatars[a])
            }, 1);
        else if (0 == a.indexOf("http"))
            g_avatars[a] = a,
            setTimeout(function() {
                g_view.ui_avatarShow(b, c, a, g_avatars[a])
            }, 1);
        else if ("pending" != g_avatars[a]) {
            g_avatars[a] = "pending";
            var e = localStorage.getItem("avatar_" + a);
            if (e) {
                var f = $.base64.decode(e);
                setTimeout(function() {
                    avatarSet(f, a, b, c)
                }, 1)
            } else
                f = "c=avatarGet&medium=" + b + "&username=" + c + "&identity=" + d + "&iconhash=" + a,
                addPacket(f)
        }
}
function avatarSet(a, b, c, d) {
    a = $.base64.encode(a);
    try {
        localStorage.setItem("avatar_" + b, a)
    } catch (e) {}
    g_avatars[b] = "data:image/png;base64," + a;
    g_view.ui_avatarShow(c, d, b, g_avatars[b])
}
function avatarUpdate(a, b) {
    var c = "c=identityUpdate&avatar=" + encodeURIComponent(a) + "&identity=" + b;
    addPacket(c)
}
function contactlistAdd(a, b, c, d, e, f, g, h) {
    h || (h = "root");
    g = {
        search_score: 0
    };
    g.medium = a;
    g.group = h;
    g.displayname = c;
    g.realname = b.toLowerCase();
    g.status = d;
    g.status_message = e;
    g.iconhash = f;
    g.isGroup = !1;
    g.mutedUntil = 0;
    g_contacts.push(g);
    ui_contactlistAdd(g)
}
function contactlistRename(a, b, c, d) {
    for (d = 0; d < g_contacts.length; d++)
        if (g_contacts[d].medium == a && g_contacts[d].realname == b) {
            g_contacts[d].displayname = c;
            ui_contactlistRename(g_contacts[d]);
            break
        }
    for (d = 0; d < g_messageWindows.length; d++)
        if (g_messageWindows[d].username == b && g_messageWindows[d].medium == a) {
            var e = g_messageWindows[d];
            e.displayname = c;
            g_view.ui_chatUpdate(e)
        }
}
function contactlistUpdate(a, b, c, d, e, f, g, h) {
    if (domainUser() && "auth" == d) {
        g = g_username.substr(g_username.indexOf("@") + 1);
        var k = b.substr(b.indexOf("@") + 1);
        k && g && k == g && (d = "offline")
    }
    for (g = 0; g < g_contacts.length; g++)
        g_contacts[g].medium == a && g_contacts[g].realname == b && (g_contacts[g].displayname = c,
        g_contacts[g].status = d,
        g_contacts[g].status_message = e,
        g_contacts[g].iconhash = f,
        h && (g_contacts[g].servergroup = h),
        ui_contactlistUpdate(g_contacts[g]));
    for (g = 0; g < g_messageWindows.length; g++)
        c = g_messageWindows[g],
        c.username == b && c.medium == a && g_view.ui_contactlistWindowUpdate(c.id, d, a, b, f)
}
function getContact(a, b) {
    for (var c = 0; c < g_contacts.length; c++)
        if (g_contacts[c].medium == a && g_contacts[c].realname == b)
            return g_contacts[c];
    return null
}
function getContactStatus(a, b) {
    if ("ASTRA" == a && b == g_username)
        return g_status.toLowerCase();
    for (var c = 0; c < g_contacts.length; c++)
        if (g_contacts[c].medium == a && g_contacts[c].realname == b)
            return g_contacts[c].status;
    return "offline"
}
function formatTimestamp(a, b) {
    var c = (new Date).getTime() > a && 0 < a ? a : (new Date).getTime()
      , d = new Date(c)
      , e = d.toLocaleDayOfTheWeekString()
      , f = d.toLocaleShortDateString();
    return b ? "today" == e.toLowerCase() ? g_view.ui_formatTimestamp(c, "Today", b) : "yesterday" == e.toLowerCase() ? g_view.ui_formatTimestamp(c, "Yesterday", b) : g_view.ui_formatTimestamp(c, f, b) : "today" == e.toLowerCase() ? g_view.ui_formatTimestamp(c, d.getHHMMpp(), b) : "yesterday" == e.toLowerCase() ? g_view.ui_formatTimestamp(c, e + ", " + d.getHHMMpp(), b) : g_view.ui_formatTimestamp(c, e + ", " + f + ", " + d.getHHMMpp(), b)
}
function groupchatLeave(a, b, c, d) {
    addPacket("c=groupchatLeave&medium=" + a + "&name=" + b + "&connection=" + c);
    for (c = 0; c < g_messageWindows.length; c++)
        if (g_messageWindows[c].medium == a && g_messageWindows[c].username == b) {
            messageClose(g_messageWindows[c].id, !0);
            break
        }
}
function messageWindowFromName(a, b) {
    for (var c = 0; c < g_messageWindows.length; c++)
        if (g_messageWindows[c].medium == a && g_messageWindows[c].username == b)
            return g_messageWindows[c];
    return null
}
function messageWindow(a) {
    for (var b = 0; b < g_messageWindows.length; b++)
        if (g_messageWindows[b].id == a)
            return g_messageWindows[b];
    return null
}
function messageClose(a, b) {
    var c = messageWindow(a);
    if (c) {
        b && (c.outboundTyping && (l_data = "c=messageTyping&window=" + a + "&typing=0",
        addPacket(l_data)),
        l_data = "c=messageClose&window=" + a + "&username=" + c.username,
        addPacket(l_data));
        c = g_messageWindows.indexOf(c);
        g_messageWindows.splice(c, 1);
        g_view.ui_messageClose(a);
        for (var d = c = 0; d < g_messageWindows.length; d++)
            c++;
        g_messageIdFocus == a && (g_messageIdFocus = -1,
        messageFocusNothing())
    }
}
function messageFocusNothing() {
    ui_messageFocusRemove(g_messageIdFocus);
    g_messageIdFocus = -1;
    g_view.ui_nicklistVisible(!1);
    g_view.ui_editboxDisable();
    g_view.ui_chatDisable(!1, "");
    g_view.ui_topicUpdate(null);
    g_view.ui_messageNicklistClear();
    g_view.ui_messageClear(!0);
    g_view.ui_noChats()
}
function messageMemberCount(a) {
    if (!a.nicks)
        return 0;
    for (var b = 0, c = 0; c < a.nicks.length; c++)
        a.nicks[c].bot || b++;
    return b
}
function messageFocus(a, b) {
    if (-1 != a)
        if (a == g_messageIdFocus)
            g_view.ui_editboxFocus(b),
            messageAck(a, !0),
            windowTitleUpdate();
        else {
            var c = messageWindow(a);
            if (c) {
                g_view.ui_messageFocusRemove(g_messageIdFocus);
                g_view.ui_messageFocus(a);
                g_view.ui_editboxEnable();
                g_view.ui_editboxFocus(b);
                g_view.ui_chatDisable(c.disabled, c.disableMessage);
                messageTyping("");
                messageAck(a, !0);
                g_messageIdFocus = a;
                g_echoName = c.echoName;
                g_view.ui_nicklistVisible(c.group ? !0 : !1);
                g_view.ui_topicUpdate(c);
                g_view.ui_messageClear(!1);
                var d = c.medium
                  , e = c.username
                  , f = null;
                if (e = g_contacts[getContactEnum(d, e)])
                    f = e.iconhash,
                    avatarRequest(e.iconhash, e.medium, e.realname, "default");
                g_view.ui_messageNicklistClear();
                if (c.nicks) {
                    var g = messageMemberCount(c);
                    c.nicks.sort(function(a, b) {
                        var c = a.displayname ? a.displayname.toLowerCase() : a.name.toLowerCase();
                        return (b.displayname ? b.displayname.toLowerCase() : b.name.toLowerCase()).localeCompare(c)
                    });
                    ui_messageNicklistMemberCountUpdate(g)
                }
                for (g = 0; g < c.messages.length; g++) {
                    var h = c.messages[g]
                      , k = h.message
                      , l = h.type
                      , m = h.time
                      , e = "";
                    switch (l) {
                    case "information_notice":
                        e = g_view.ui_formatMessage(null, null, k, l, null, m.getMediumTime(), m.getHHMMpp(), m.getTime(), h.color, !1, c.medium);
                        break;
                    case "outgoing_groupMessageOffline":
                    case "outgoing_groupMessageHistory":
                    case "outgoing_groupMessage":
                    case "outgoing_privateMessageOffline":
                    case "outgoing_privateMessageHistory":
                    case "outgoing_privateMessage":
                        var p = g_echoName
                          , e = g_view.ui_formatMessage(p, g_username, k, l, null, m.getMediumTime(), m.getHHMMpp(), m.getTime(), h.color, !1, c.medium);
                        break;
                    case "incoming_groupMessageOffline":
                    case "incoming_groupMessageHistory":
                    case "incoming_groupMessage":
                        e = g_contacts[getContactEnum(d, h.name)];
                        f = null;
                        e ? f = e.iconhash : h.avatarURL && (f = h.avatarURL,
                        g_controller.g_avatars[f] = f);
                        e = h.name;
                        e = g_view.ui_formatMessage(h.displayname, e, k, l, f, m.getMediumTime(), m.getHHMMpp(), m.getTime(), h.color, h.bot, c.medium);
                        break;
                    case "incoming_privateMessageOffline":
                    case "incoming_privateMessageHistory":
                    case "incoming_privateMessage":
                        e = h.name,
                        p = c.displayname,
                        e = g_view.ui_formatMessage(p, e, k, l, f, m.getMediumTime(), m.getHHMMpp(), m.getTime(), h.color, !1, c.medium)
                    }
                    g_view.ui_appendMessage(e, m)
                }
                c.typing && (g_view.ui_chatBadge(g_messageIdFocus, "..."),
                g_view.ui_messageTyping(!0, c.displayname, c.name, f, m.getMediumTime(), m.getHHMMpp(), m.getTime(), c.medium));
                g_view.ui_messageScroll();
                windowTitleUpdate()
            }
        }
}
function messageOpen(a, b, c, d, e, f, g, h) {
    var k = getAccountByConnectionName(e, g);
    c = c ? c : b;
    g = {};
    g.id = a;
    g.username = b.toLowerCase();
    g.displayname = c;
    g.echoName = d;
    g.unreadMessages = 0;
    g.nextColor = 0;
    g.colors = [];
    g.typing = !1;
    g.typingTime = null;
    g.outboundTyping = !1;
    g.messages = [];
    g.serverMessages = [];
    g.firstUnreadMessage = null;
    g.medium = e;
    g.group = f;
    g.disclaimerSent = !1;
    g.disabled = !1;
    g.disableMessage = null;
    g.pendingImage = null;
    g.pendingImageMessage = null;
    g.pendingImageName = null;
    g.pendingImageType = null;
    g.pendingImageThumbnail = null;
    g.account = null;
    g.contact = !1;
    g.connection = k.connection;
    g.topic = "";
    g.muted_indicator = 0;
    g.flag_disable_displayname_set = !1;
    g.flag_disable_topic_set = !1;
    g.flag_disable_list = !1;
    g.flag_disable_member_add = !1;
    g.flag_disable_member_remove = !1;
    g.flag_disable_message_send = !1;
    g.caps_images = h & 1 ? !0 : !1;
    g.caps_buzz = h & 2 ? !0 : !1;
    g.caps_echo = h & 4 ? !0 : !1;
    g.caps_invite = h & 8 ? !0 : !1;
    g.caps_group_add = h & 16 ? !0 : !1;
    g.caps_topic_editable = h & 32 ? !0 : !1;
    g.caps_groupchat_flags_editable = h & 64 ? !0 : !1;
    g.caps_groupchat_displayname_editable = h & 128 ? !0 : !1;
    g_messageWindows.push(g);
    d = getContactStatus(e, b);
    b = g_contacts[getContactEnum(e, b)];
    e = "";
    b && (e = b.iconhash,
    g.contact = !0);
    f && (b ? (c = b.displayname,
    g.displayname = c,
    g.account = b.account) : "ASTRA" == g.medium && (d = getAstraConnection().status));
    g_view.ui_addChat(a, c, d, !1, e, f);
    b && avatarRequest(b.iconhash, b.medium, b.realname, "default");
    g_pendingGroupChatBadge && g_pendingGroupChatBadge == g.username && (g_pendingGroupChatBadge = null,
    0 == g.unreadMessages && (g.unreadMessages = 1,
    g_view.ui_chatBadge(a, g.unreadMessages)))
}
function messageStateSet(a, b, c) {
    var d = messageWindow(a);
    if (d) {
        if (g_messageIdFocus == a)
            switch (b) {
            case "typing_icon":
                if ("on" == c) {
                    if (d.typing)
                        d.typingTime = new Date;
                    else {
                        var e = g_contacts[getContactEnum(d.medium, d.username)]
                          , f = e ? e.iconhash : null;
                        d.typing = !0;
                        d.typingTime = new Date;
                        g_view.ui_messageTyping(!0, d.displayname, d.username, f, d.typingTime.getMediumTime(), d.typingTime.getHHMMpp(), d.typingTime.getTime(), d.medium);
                        e && avatarRequest(f, e.medium, e.realname, "default");
                        setTimeout(function() {
                            var b = new Date;
                            d.typing && 14E3 < b - d.typing && messageStateSet(a, "typing_icon", "off")
                        }, 15E3)
                    }
                    g_view.ui_messageScroll()
                } else
                    d.typing = !1,
                    d.typingTime = null,
                    g_view.ui_messageTyping(!1);
                windowTitleUpdate()
            }
        else
            "typing_icon" == b && ("on" == c ? (d.typing = !0,
            d.typingTime = new Date,
            setTimeout(function() {
                var b = new Date;
                d.typing && 14E3 < b - d.typing && messageStateSet(a, "typing_icon", "off")
            }, 15E3)) : (d.typing = !1,
            d.typingTime = null),
            d.typing ? g_view.ui_chatBadge(a, "...") : 0 < d.unreadMessages ? g_view.ui_chatBadge(a, d.unreadMessages) : g_view.ui_chatBadge(a, ""),
            windowTitleUpdate());
        "topic" == b ? (d.topic = c,
        g_messageIdFocus == a && g_view.ui_topicUpdate(d)) : "flag_disable_displayname_set" == b ? d.flag_disable_displayname_set = "on" == c ? !0 : !1 : "flag_disable_topic_set" == b ? d.flag_disable_topic_set = "on" == c ? !0 : !1 : "flag_disable_list" == b ? (b = d.flag_disable_list,
        d.flag_disable_list = "on" == c ? !0 : !1,
        b != d.flag_disable_list && g_view.ui_chatGroupPublicUpdate(d)) : "flag_disable_member_add" == b ? (d.flag_disable_member_add = "on" == c ? !0 : !1,
        g_messageIdFocus == a && g_view.ui_chatFlagsUpdate(d)) : "flag_disable_member_remove" == b ? (d.flag_disable_member_remove = "on" == c ? !0 : !1,
        g_messageIdFocus == a && g_view.ui_chatFlagsUpdate(d)) : "flag_disable_message_send" == b ? d.flag_disable_message_send = "on" == c ? !0 : !1 : "muted_indicator" == b && (d.muted_indicator = parseInt(c),
        g_view.ui_chatMute(a))
    }
}
function messageMute(a, b) {
    var c = getContact(a.medium, a.username);
    c ? addPacket(c.isGroup ? "c=groupchatMuteSetRequest&name=" + c.realname + "&medium=" + c.medium + "&muteseconds=" + b + "&account=" + c.account + "&identity=default" : "c=contactlistMuteSetRequest&username=" + c.realname + "&medium=" + c.medium + "&muteseconds=" + b + "&identity=default") : log("UI: Contact not found on messageMute")
}
function messageAck(a, b) {
    var c = messageWindow(a);
    c && 0 < c.unreadMessages && (b && (l_data = "c=messageAck&window=" + a,
    addPacket(l_data)),
    g_view.ui_chatBadge(a, ""),
    c.unreadMessages = 0,
    c.firstUnreadMessage = null,
    windowTitleUpdate())
}
function messageNicklistAdd(a, b, c, d, e, f, g) {
    var h = messageWindow(a);
    if (h) {
        h.nicks || (h.nicks = []);
        var k = {};
        k.name = b;
        k.displayname = c;
        k.op = d;
        k.voice = e;
        k.bot = f;
        k.avatarURL = g;
        k.local = !1;
        b.toLowerCase() == g_username.toLowerCase() && (k.local = !0);
        h.nicks.push(k);
        g_messageIdFocus != a || f || (a = messageMemberCount(h),
        g_view.ui_messageNicklistAdd(k, a))
    }
}
function messageNicklistChange(a, b, c, d, e, f) {
    var g = messageWindow(a);
    if (g)
        for (var h = 0; h < g.nicks.length; h++) {
            var k = g.nicks[h];
            if (k.name == b) {
                k.op = d;
                k.voice = e;
                k.bot = f;
                c && (k.displayname = c);
                g_messageIdFocus != a || f || g_view.ui_messageNicklistChange(k, messageMemberCount(g));
                break
            }
        }
}
function messageNicklistRemove(a, b, c) {
    var d = messageWindow(a);
    if (d)
        for (var e = 0; e < d.nicks.length; e++) {
            var f = d.nicks[e];
            if (f.name == b) {
                d.nicks.splice(e, 1);
                g_messageIdFocus != a || c || g_view.ui_messageNicklistRemove(f, messageMemberCount(d));
                break
            }
        }
}
function messageUpdate(a, b, c, d, e) {
    if (a = messageWindow(a))
        a.caps_images = e & 1 ? !0 : !1,
        a.caps_buzz = e & 2 ? !0 : !1,
        a.caps_echo = e & 4 ? !0 : !1,
        a.caps_invite = e & 8 ? !0 : !1,
        a.caps_group_add = e & 16 ? !0 : !1,
        a.caps_topic_editable = e & 32 ? !0 : !1,
        a.caps_groupchat_flags_editable = e & 64 ? !0 : !1,
        a.caps_groupchat_displayname_editable = e & 128 ? !0 : !1,
        b && 0 < b.length && ((e = g_contacts[getContactEnum(a.medium, a.username)]) && e.isGroup && (b = e.displayname),
        a.displayname = b,
        a.id == g_messageIdFocus && g_view.ui_chatUpdate(a)),
        a.disabled = c,
        a.disableMessage = d,
        a.id == g_messageIdFocus && g_view.ui_chatDisable(c, d)
}
function messageReceive(a, b, c, d, e, f, g, h, k) {
    var l = messageWindow(a);
    if (l && 1 != l.serverMessages[d]) {
        l.serverMessages[d] = !0;
        var m = !1
          , p = null;
        try {
            p = UTF8base64decode(f)
        } catch (t) {
            addEvent("chat", "message_malformed");
            return
        }
        if ("" != p && 0 != p.charCodeAt(0)) {
            -1 != p.indexOf("<BINARY>") && (m = !0,
            p = $.base64.decode(f));
            var n = !1;
            f = null;
            if (!h || h == g) {
                var q = g_contacts[getContactEnum(l.medium, g)];
                q && (h = q.displayname)
            }
            if (l.nicks)
                for (q = 0; q < l.nicks.length; q++) {
                    var r = l.nicks[q];
                    if (r.name.toLowerCase() == g.toLowerCase()) {
                        h = r.displayname;
                        f = r.avatarURL;
                        n = r.bot;
                        break
                    }
                }
            "\x00" == p[p.length - 1] && (p = p.substring(0, p.length - 1));
            m && (p = convertMessageBinaryImages(p));
            r = stripHTML(p);
            p = g_view.ui_parseMessage(p, m);
            l.group && (p = p.mentionify(l.nicks));
            "information_notice" == b && (e = !1);
            q = -1 != b.indexOf("incoming") ? !0 : !1;
            m = r.noEntities();
            c = {
                message: p,
                simpleMessage: m,
                type: b,
                name: g,
                displayname: h,
                time: new Date(c),
                serverTime: d,
                incoming: q
            };
            c.avatarURL = f ? f : null;
            c.bot = n;
            q && (void 0 == l.colors[g] && (l.colors[g] = l.nextColor++ % 13),
            c.color = l.colors[g]);
            l.typing = !1;
            l.typingTime = null;
            if (g_messageIdFocus == a) {
                g_view.ui_messageTyping(!1);
                d = l.username;
                m = -1 != b.indexOf("outgoing_") ? g_echoName : l.displayname;
                if ("incoming_groupMessage" == b || "incoming_groupMessageHistory" == b)
                    d = g,
                    m = h;
                q = g_contacts[getContactEnum(l.medium, d)];
                r = null;
                q ? r = q.iconhash : f && (r = f,
                g_controller.g_avatars[r] = r);
                p = g_view.ui_formatMessage(m, d, p, b, r, c.time.getMediumTime(), c.time.getHHMMpp(), c.time.getTime(), c.color, n, l.medium);
                g_view.ui_appendMessage(p, c.time.getTime());
                q && avatarRequest(q.iconhash, q.medium, q.realname, "default");
                g_view.ui_messageScroll()
            }
            e && (0 < l.unreadMessages ? l.unreadMessages++ : l.unreadMessages = 1);
            if (g_messageIdFocus == a && g_focused && g_browserFocused)
                e && messageAck(a, !0);
            else if (e) {
                g_view.ui_chatBadge(a, l.unreadMessages);
                l.firstUnreadMessage || (l.firstUnreadMessage = c);
                d = l.username;
                m = "outgoing_privateMessage" == b ? g_echoName : l.displayname;
                if ("incoming_groupMessage" == b || "incoming_groupMessageHistory" == b)
                    d = g,
                    m = h;
                b = null;
                (q = g_contacts[getContactEnum(l.medium, d)]) ? (r = q.iconhash,
                g_avatars[r] ? b = g_avatars[r] : avatarRequest(r, q.medium, q.realname, "default")) : f && (b = f);
                !k && g_sessionReady && notificationsAdd(b, m, c.simpleMessage, function() {
                    messageFocus(a, !0);
                    this.close()
                });
                windowTitleUpdate()
            }
            l.messages.push(c);
            l.messages.sort(function(a, b) {
                return a.time - b.time
            });
            domainUser() && "1" == g_policy["trillian.history.disclaimer"] && !l.disclaimerSent && (k = (k = g_policy["trillian.history.disclaimer.text"]) && 0 != k.length ? decodeURIComponent(k) : "Notice: All messages sent and received by this user are being recorded.",
            -1 != c.simpleMessage.indexOf(k) && 864E5 > (new Date).getTime() - c.time.getTime() && (l.disclaimerSent = !0));
            ui_chatLatestMessageUpdate(l, c)
        }
    }
}
function windowTitleUpdate() {
    var a = !1
      , b = "Sign in | Trillian";
    $("#trillian").is(":visible") ? b = g_domain && g_domain.companyName ? g_domain.companyName + " | Trillian" : "Trillian" : $("#settings").is(":visible") && (a = !0,
    b = g_domain ? g_domain.companyName ? $(".domain").is(":visible") ? "Manage Domain | " + g_domain.companyName + " | Trillian" : "Settings | " + g_domain.companyName + " | Trillian" : $(".domain").is(":visible") ? "Manage Domain | Trillian" : "Settings | Trillian" : "Settings | Trillian");
    for (var c = 0, d = !1, e = 0; e < g_messageWindows.length; e++) {
        var f = g_messageWindows[e];
        f.typing && !g_browserFocused && (d = !0);
        c += f.unreadMessages
    }
    0 < c ? b = "[" + c + (d ? "*" : "") + "] " + b : d && (b = "*" + b);
    a && 0 < c ? $("#x_chatCount").text(c).show() : $("#x_chatCount").text("").hide();
    g_view.ui_setWindowTitle(b)
}
function sessionLoggedout() {
    g_view.ui_sessionLoggedout()
}
function sessionError(a) {
    statusOffline(!1);
    g_view.ui_sessionError(a)
}
function contactlistError(a, b, c, d, e) {
    decodeURIComponent(c);
    g_view.ui_contactlistError(a, b, c, d, e)
}
function messageCreateWithID(a, b, c) {
    1 > b.length || (l_data = "c=messageOpen&username=" + b + "&medium=" + a + "&identity=default&connection=" + c,
    addPacket(l_data))
}
function groupchatList(a, b, c) {
    l_data = "c=groupchatList&name=" + b + "&medium=" + a + "&connection=" + c + "&identity=default";
    addPacket(l_data)
}
function groupchatCreate(a, b, c, d) {
    l_data = "c=groupchatJoin&displayname=" + encodeURIComponent(b) + "&medium=" + a + "&connection=" + d + "&flags=" + c;
    addPacket(l_data)
}
function groupchatJoin(a, b, c) {
    l_data = "c=groupchatJoin&name=" + b + "&medium=" + a + "&connection=" + c;
    addPacket(l_data)
}
function groupchatSelect(a, b, c) {
    l_data = "c=groupchatSelect&name=" + b + "&medium=" + a + "&account=" + c + "&identity=default";
    addPacket(l_data)
}
function messageCreate(a, b) {
    1 > b.length || (l_data = "c=contactlistSelect&username=" + b + "&medium=" + a + "&identity=default",
    addPacket(l_data))
}
function packetsParsed() {}
function groupchatMembersAddRequest(a, b, c, d) {
    l_data = "c=groupchatMembersAddRequest&members=" + encodeURIComponent(c) + "&connection=" + b + "&medium=" + a + "&window=" + d;
    addPacket(l_data)
}
function groupchatRequest(a, b, c) {
    l_data = "c=groupchatRequest&members=" + encodeURIComponent(c) + "&connection=" + b + "&medium=" + a;
    addPacket(l_data)
}
function messageAddDisclaimer(a) {
    if (domainUser() && "1" == g_policy["trillian.history.disclaimer"])
        if (a.group && "ASTRA" == a.medium && domainMatches(a.username, g_username))
            log("UI: Not sending disclaimer on my own chat room (" + a.usernmae + ")"),
            a.disclaimerSent = !0;
        else if (!a.disclaimerSent) {
            a.disclaimerSent = !0;
            var b = g_policy["trillian.history.disclaimer.text"]
              , b = b && 0 != b.length ? decodeURIComponent(b) : "Notice: All messages sent and received by this user are being recorded.";
            messageSendWithWindow(a, b)
        }
}
function messageSendPendingImage(a) {
    if (null != a.pendingImage && 0 != a.pendingImage.length) {
        messageAddDisclaimer(a);
        var b = unescape(encodeURIComponent(a.pendingImageName))
          , c = unescape(encodeURIComponent(a.pendingImageType))
          , d = a.pendingImageMessage
          , e = new Date
          , f = e.getTime() + g_timeSkew
          , e = {
            message: d,
            type: "outgoing_privateMessage",
            time: e,
            serverTime: f,
            incoming: !1
        };
        a.messages.push(e);
        ui_chatLatestMessageUpdate(a, e);
        var d = g_view.ui_formatMessage(g_echoName, g_username, d, "outgoing_privateMessage", null, e.time.getMediumTime(), e.time.getHHMMpp(), e.time.getTime(), e.color, !1, a.medium)
          , g = g_view.ui_appendMessage(d, e.time.getTime());
        octopusProtocol4() && (l_data = "c=messageSendMedia&window=" + g_messageIdFocus + "&data=" + encodeURIComponent(a.pendingImage) + "&name=" + encodeURIComponent(b) + "&thumbnail=" + encodeURIComponent(a.pendingImageThumbnail) + "&type=" + encodeURIComponent(c));
        l_data = "c=messageSendImage&window=" + g_messageIdFocus + "&image=" + encodeURIComponent(a.pendingImage) + "&name=" + encodeURIComponent(b) + "&thumbnail=" + encodeURIComponent(a.pendingImageThumbnail);
        ui_attachLightboxToImages(g.find("a"));
        addPacket(l_data, function(a) {
            a ? g.css("opacity", "0.0") : g.css("opacity", "1.0")
        }, function(a) {
            g.css("opacity", a)
        });
        g_view.ui_messageScroll();
        a.pendingImage = null;
        a.pendingImageMessage = null;
        a.pendingImageName = null;
        a.pendingImageType = null;
        a.pendingImageThumbnail = null
    }
}
function messageSend(a) {
    if (-1 == g_messageIdFocus)
        return !1;
    var b = messageWindow(g_messageIdFocus);
    return messageSendWithWindow(b, a)
}
function messageSendWithWindow(a, b) {
    if (0 == b.toLowerCase().indexOf("/clear"))
        return a.firstUnreadMessage = null,
        a.messages = [],
        g_view.ui_messageClear(!1),
        ui_chatLatestMessageUpdate(a, null),
        !0;
    if (0 == b.toLowerCase().indexOf("/available"))
        return g_statusMessage = $.trim(b.substr(10)),
        statusOnline(g_statusMessage),
        !0;
    if (0 == b.toLowerCase().indexOf("/back"))
        return g_statusMessage = $.trim(b.substr(5)),
        statusOnline(g_statusMessage),
        !0;
    if (0 == b.toLowerCase().indexOf("/online"))
        return g_statusMessage = $.trim(b.substr(7)),
        statusOnline(g_statusMessage),
        !0;
    if (0 == b.toLowerCase().indexOf("/away"))
        return g_statusMessage = $.trim(b.substr(5)),
        statusAway(),
        !0;
    if (0 == b.toLowerCase().indexOf("/dnd") || 0 == b.toLowerCase().indexOf("/do not disturb"))
        return statusDND(),
        !0;
    if (0 == b.toLowerCase().indexOf("/invisible"))
        return statusInvisible(),
        !0;
    if (0 == b.toLowerCase().indexOf("/topic")) {
        if (a.group) {
            if (!a.caps_topic_editable) {
                var c = new Date
                  , d = g_view.ui_formatMessage(null, null, "Only operators may set the topic.", "information_notice", null, c.getMediumTime(), c.getHHMMpp(), c.getTime(), 0, !1, a.medium);
                g_view.ui_appendMessage(d, c.getTime());
                g_view.ui_messageScroll();
                return !0
            }
            d = $.trim(b.substr(6));
            d = $.trim(b.substr(6));
            0 < d.length && messageSetTopic(a.id, d);
            return !0
        }
        return !1
    }
    if (0 == b.toLowerCase().indexOf("/rename")) {
        if (a.group) {
            if (!a.caps_groupchat_displayname_editable)
                return c = new Date,
                d = g_view.ui_formatMessage(null, null, "Only operators may set the name.", "information_notice", null, c.getMediumTime(), c.getHHMMpp(), c.getTime(), 0, !1, a.medium),
                g_view.ui_appendMessage(d, c.getTime()),
                g_view.ui_messageScroll(),
                !0;
            d = $.trim(b.substr(8));
            0 < d.length && (l_data = "c=messageStateSet&window=" + a.id + "&control=displayname&state=" + encodeURIComponent(d),
            addPacket(l_data));
            return !0
        }
        return !1
    }
    messageAddDisclaimer(a);
    b = b.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
    d = unescape(encodeURIComponent(b));
    d = $.base64.encode(d);
    l_data = "c=messageSend&window=" + a.id + "&msg=" + d;
    addPacket(l_data);
    b = g_view.ui_parseMessage(b);
    a.group && (b = b.mentionify(a.nicks));
    d = new Date;
    c = d.getTime() + g_timeSkew;
    c = {
        message: b,
        type: "outgoing_privateMessage",
        time: d,
        serverTime: c,
        incoming: !1
    };
    a.messages.push(c);
    ui_chatLatestMessageUpdate(a, c);
    if (a.id == g_messageIdFocus)
        return d = g_view.ui_formatMessage(g_echoName, g_username, b, "outgoing_privateMessage", null, c.time.getMediumTime(), c.time.getHHMMpp(), c.time.getTime(), 0, !1, a.medium),
        g_view.ui_appendMessage(d, c.time.getTime()),
        g_view.ui_messageScroll(),
        !0
}
function messageSetGroupChatFlag(a, b, c) {
    addPacket("c=messageStateSet&window=" + a + "&control=" + b + "&state=" + (c ? "on" : "off"))
}
function messageSetTopic(a, b) {
    var c = "c=messageStateSet&window=" + a + "&control=topic&state=" + encodeURIComponent(b);
    addPacket(c)
}
function messageSendBuzz() {
    if (-1 == g_messageIdFocus)
        return !1;
    var a = messageWindow(g_messageIdFocus);
    if (a.caps_buzz)
        return log("UI: Unable to send buzz due to capabilities."),
        !1;
    l_data = "c=messageBuzz&window=" + g_messageIdFocus;
    addPacket(l_data);
    var b = "/me buzzes " + a.displayname
      , c = new Date
      , d = c.getTime() + g_timeSkew
      , c = {
        message: b,
        type: "outgoing_privateMessage",
        time: c,
        serverTime: d,
        incoming: !1
    };
    a.messages.push(c);
    ui_chatLatestMessageUpdate(a, c);
    d = g_echoName;
    a = g_view.ui_formatMessage(d, g_username, b, "outgoing_privateMessage", null, c.time.getMediumTime(), c.time.getHHMMpp(), c.time.getTime(), 0, !1, a.medium);
    g_view.ui_appendBuzz(a, d, c.time.getTime());
    g_view.ui_messageScroll();
    return !0
}
function groupchatAddReceived(a, b, c, d, e) {
    var f = {
        search_score: 0
    };
    f.medium = a;
    f.group = e;
    f.displayname = d;
    f.realname = b.toLowerCase();
    f.account = c;
    f.isGroup = !0;
    f.mutedUntil = 0;
    "ASTRA" == f.medium && ("offline" == getAstraConnection().status.toLowerCase() ? f.status = getAstraConnection().status.toLowerCase() : f.status = "online");
    f.status_message = null;
    f.iconhash = null;
    g_contacts.push(f);
    ui_contactlistAdd(f)
}
function groupchatRemoveReceived(a, b, c, d) {
    contactlistRemove(a, b, null, null, null, null, null)
}
function groupchatMuteReceived(a, b, c, d) {
    contactlistMuteReceived(a, b, d)
}
function groupchatAdd(a, b, c) {
    b = encodeURIComponent(b);
    addPacket("c=groupchatAdd&window=" + a + "&displayname=" + b + "&connection=" + c)
}
function groupchatRemove(a, b, c, d) {
    b = encodeURIComponent(b);
    addPacket("c=groupchatRemove&medium=" + a + "&name=" + b + "&identity=" + c + "&connection=" + d)
}
function contactAdd(a, b, c, d) {
    var e = mediumDisplay(a);
    b = encodeURIComponent(b);
    addPacket("c=contactlistAdd&medium=" + a + "&username=" + b + "&identity=" + c + "&connection=" + d + "&group=" + e);
    return !0
}
function contactBlock(a, b, c) {
    b = encodeURIComponent(b);
    addPacket("c=privacyBlock&medium=" + a + "&username=" + b + "&connection=" + c)
}
function domainSet(a) {
    a = $.base64.decode(a);
    g_policy = [];
    for (var b in DEFAULT_POLICIES)
        "indexOf" != b && (g_policy[b] = DEFAULT_POLICIES[b]);
    b = a.split("\n");
    for (a = 0; a < b.length; a++) {
        var c = b[a].indexOf(" ");
        if (-1 != c) {
            var d = b[a].substr(0, c)
              , c = b[a].substr(c + 1);
            g_policy[d] = c
        }
    }
    ui_policyUpdate()
}
function accountAdd(a, b, c, d) {
    b = encodeURIComponent(b);
    d = encodeURIComponent(d);
    addPacket("c=identityAccountAdd&medium=" + a + "&username=" + b + "&identity=" + c + "&password=" + d);
    addPacket("c=identityAccountConnect&medium=" + a + "&username=" + b + "&identity=" + c);
    return !0
}
function accountRetry(a, b, c, d) {
    b = encodeURIComponent(b);
    encodeURIComponent(d);
    l_data = "c=identityAccountConnect&medium=" + a + "&username=" + b + "&identity=" + c + "&password=" + d;
    addPacket(l_data);
    return !0
}
function accountRemove(a, b, c) {
    encodeURIComponent(b);
    addPacket("c=identityAccountRemove&medium=" + a + "&username=" + b + "&identity=" + c)
}
function identityAccountRemove(a, b, c) {
    for (var d = 0; d < g_accounts.length; d++)
        if (g_accounts[d].medium == a && g_accounts[d].name == b) {
            delete g_accounts[d];
            g_accounts.splice(d, 1);
            break
        }
    calloutClear("accounts", a + b);
    g_view.ui_accountRemoved(a, b, c);
    g_view.ui_accountsUpdate()
}
function accountSettings(a, b, c) {
    addPacket("c=identityAccountSettings&medium=" + a + "&username=" + b + "&identity=" + c)
}
function contactSettings(a, b, c, d) {
    addPacket(-1 == d ? "c=contactlistSettings&medium=" + a + "&username=" + b + "&identity=" + c : "c=contactlistSettings&medium=" + a + "&username=" + b + "&identity=" + c + "&connection=" + d)
}
function getContactEnum(a, b) {
    for (var c = 0; c < g_contacts.length; c++)
        if (g_contacts[c].medium == a && g_contacts[c].realname == b)
            return c;
    return -1
}
function contactRemove(a, b, c) {
    var d = getContactEnum(a, b)
      , d = g_contacts[d].group;
    l_data = "c=contactlistRemove&medium=" + a + "&username=" + encodeURIComponent(b) + "&identity=" + c;
    void 0 != d && (l_data += "&group=" + encodeURIComponent(d));
    addPacket(l_data)
}
function messageTyping(a) {
    a = 0 < a.length ? !0 : !1;
    var b = messageWindow(g_messageIdFocus);
    b && a != b.outboundTyping && (b.outboundTyping = a,
    l_data = "c=messageTyping&window=" + g_messageIdFocus + "&typing=" + (a ? "1" : "0"),
    addPacket(l_data))
}
function mediumSupported(a) {
    switch (a) {
    case "FACEBOOK":
    case "ICQ":
    case "ASTRA":
    case "AIM":
    case "YAHOO":
    case "GOOGLE":
    case "JABBER":
        return !0
    }
    return !1
}
function mediumDisplay(a) {
    switch (a) {
    case "FACEBOOK":
        return "Facebook";
    case "ASTRA":
        return "Trillian";
    case "AIM":
        return "AOL Instant Messenger";
    case "MYSPACE":
        return "MySpace";
    case "YAHOO":
        return "Yahoo! IM";
    case "GOOGLE":
        return "Google Talk";
    case "JABBER":
        return "Jabber";
    case "MSN":
        return "Windows Live Messenger"
    }
    return a
}
function setStatus(a, b) {
    var c = g_status;
    b && (c = b);
    c = "c=sessionStatus&status=" + c + "&statusmsg=" + encodeURIComponent(a);
    addPacket(c)
}
function contactlistRemove(a, b, c, d, e, f, g) {
    for (c = 0; c < g_contacts.length; c++)
        if (g_contacts[c].medium == a && g_contacts[c].realname == b) {
            a = g_contacts[c];
            g_contacts.splice(c, 1);
            ui_contactlistRemove(a);
            break
        }
}
function contactlistMuteReceived(a, b, c) {
    for (var d = 0; d < g_contacts.length; d++)
        if (g_contacts[d].medium == a && g_contacts[d].realname == b) {
            g_contacts[d].mutedUntil = c;
            ui_contactlistMute(g_contacts[d]);
            break
        }
}
function timeSkewSet(a) {
    g_timeSkew = a
}
function messageReceiveBuzz(a, b, c, d) {
    var e = messageWindow(a);
    if (e) {
        var f = !0;
        if ("outgoing_privatemessage" == b)
            var g = "/me buzzes " + e.displayname
              , h = "buzzes " + e.displayname
              , f = !1;
        else
            g = "/me buzzes you!",
            h = "buzzes you!";
        c = {
            message: g,
            type: b,
            time: new Date(1E3 * c),
            serverTime: d,
            incoming: f
        };
        g_messageIdFocus == a && (g_view.ui_messageTyping(!1),
        e.typing = !1,
        e.typingTime = null,
        b = g_view.ui_formatMessage("outgoing_privateMessage" == b ? g_echoName : e.displayname, g_username, g, b, null, c.time.getMediumTime(), c.time.getHHMMpp(), c.time.getTime(), 0, !1, e.medium),
        g_view.ui_appendBuzz(b, c.time.getTime()),
        g_view.ui_messageScroll());
        g_browserFocused && g_focused && g_messageIdFocus == a || (0 < e.unreadMessages ? e.unreadMessages++ : e.unreadMessages = 1,
        g_view.ui_chatBadge(e.unreadMessages),
        e.firstUnreadMessage || (e.firstUnreadMessage = c),
        isMuted(e.muted_indicator) || notificationsAdd(null, e.displayname, h.unescapeHtml().stripBinary().stripHtml(), function() {
            messageFocus(a, !0);
            this.close()
        }),
        windowTitleUpdate());
        e.messages.push(c)
    }
}
function contactSearchSort(a, b) {
    return a.search_score < b.search_score ? 1 : a.search_score > b.search_score ? -1 : a.displayname.toLowerCase().localeCompare(b.displayname.toLowerCase())
}
function contactSort(a, b) {
    return a.displayname.toLowerCase().localeCompare(b.displayname.toLowerCase())
}
function mediumSort(a, b) {
    return a.toLowerCase() == b.toLowerCase() ? 0 : "astra" == a.toLowerCase() ? -1 : "astra" == b.toLowerCase() ? 1 : a.toLowerCase().localeCompare(b.toLowerCase())
}
function sessionReady() {
    g_view.ui_sessionReady();
    0 == g_messageWindows.length && (g_view.ui_editboxDisable(),
    g_view.ui_noChats());
    windowTitleUpdate()
}
function interfaceOpen(a, b, c) {
    g_view.ui_interfaceOpen(a, b, c)
}
function groupchatListResponse(a) {
    g_view.ui_groupchatListResponse(a)
}
function onFocus() {}
function onBlur() {}
function stripHTML(a) {
    a = a.replace(/<(?:.|)*?>/gm, "");
    return a = a.replace(/\n/gm, "<br>")
}
String.prototype.unescapeHtml = function() {
    var a = document.createElement("div");
    a.innerHTML = this;
    var b = a.childNodes[0].nodeValue;
    a.removeChild(a.firstChild);
    return b
}
;
String.prototype.stripHtml = function() {
    return this.replace(/<\/?(a|div|span|font|p|hr|ul|li|table|tbody|tr|td|form|body|head|html|meta|title|script|link|input|embed|object|img|big|small|h1|h2|h3|h4|h5|!)[^>]*>/ig, "")
}
;
String.prototype.stripBinary = function() {
    return this.replace(/<binary.*\/binary>/, "")
}
;
function getNotification() {
    return g_notifications.shift()
}
function browserFocused(a) {
    (g_browserFocused = a) && g_focused && messageFocus(g_messageIdFocus, !1)
}
function focused(a) {
    g_focused = a ? !0 : !1;
    g_browserFocused && g_focused && messageFocus(g_messageIdFocus, !1)
}
function pad(a) {
    a = "00000" + a;
    return a = a.substr(a.length - 6, 6)
}
function log(a) {
    var b = a.indexOf("password=");
    -1 != b && (a = a.substr(0, b + 9),
    a += "(removed)");
    g_sessionLog[g_sessionCursor++] = pad(++g_sessionLogCount) + "\t" + new Date + "\t" + a + "\n";
    g_sessionCursor >= g_sessionLogLimit && (g_sessionCursor = 0);
    a = a.substr(0, 1024);
    g_consoleLog && console.log(a)
}
function usernameEquals(a, b) {
    -1 == a.indexOf("@") && (a += "@trillian.im");
    -1 == b.indexOf("@") && (b += "@trillian.im");
    return a.toLowerCase() == b.toLowerCase() ? !0 : !1
}
function domainMatches(a, b) {
    var c = a.indexOf("@")
      , d = b.indexOf("@")
      , e = ""
      , f = ""
      , e = -1 == c ? "trillian.im" : a.substring(c + 1)
      , f = -1 == d ? "trillian.im" : b.substring(d + 1);
    return e.toLowerCase() == f.toLowerCase() ? !0 : !1
}
function domainUser() {
    return -1 != g_username.indexOf("@") && "trillian.im" != g_username.substr(g_username.indexOf("@") + 1) ? !0 : !1
}
function sendDiagnosticLog() {
    for (var a = "Trillian for Web\nUsername: " + g_username + "\nVersion: " + g_fullVersion + "\nUser Agent: " + navigator.userAgent.toString() + "\n-------------------------------------------------\n", b = g_sessionCursor; b < g_sessionLogLimit; b++)
        a += void 0 != g_sessionLog[b] ? g_sessionLog[b] : "";
    for (b = 0; b < g_sessionCursor; b++)
        a += void 0 != g_sessionLog[b] ? g_sessionLog[b] : "";
    a = "logname=" + encodeURIComponent("[WEB] " + g_username) + "&log=" + encodeURIComponent($.base64.encode(a));
    $.post("https://www.trillian.im/client/diagnosticlog.php", a, function(a) {
        g_consoleLog && console.log("Backend: Sent log successfully.")
    }).error(function(a) {
        g_consoleLog && console.log("Backend: Error while sending log.")
    }).complete(function(a) {})
}
function convertMessageBinaryImages(a) {
    for (var b = [], c = 0, d = []; c < a.length; ) {
        var e = a.substr(c).indexOf('<DATA ID="');
        if (-1 == e)
            break;
        var f = a.substr(c).indexOf("</DATA>")
          , g = f - e + 7
          , e = a.substr(c).substr(e, g);
        d.push(e);
        c += f + 6
    }
    for (c = 0; c < d.length; c++)
        (f = /<DATA ID="(\d*)"[^>]*>([\s\S]*)<\/DATA>/.exec(d[c])) && 2 <= f.length && b.push({
            id: f[1],
            binary: f[2]
        });
    for (c = 0; c < b.length; c++)
        d = new RegExp('<IMG[^>]*ID="' + b[c].id + '"[^>]*>'),
        f = $.base64.encode(b[c].binary),
        a = a.replace(d, '<img class="image" src="data:image/png;base64,' + f + '"/>');
    return a = a.replace(/<BINARY>[\s\S]*<\/BINARY>/, "")
}
function receivedSetting(a, b) {
    g_setting[a] = b;
    g_settingCallback[a] && void 0 !== g_settingCallback && (g_settingCallback[a].call(this, b),
    g_settingCallback[a] = !1)
}
function settingSet(a, b, c) {
    g_setting[a] = b;
    addPacket("c=settingsSet&type=" + a + "&value=" + b + "&default=" + c)
}
function settingsGet(a, b, c) {
    g_settingCallback[a] = c;
    addPacket("c=settingsGet&type=" + a + "&default=" + b)
}
function calloutAdd(a, b) {
    void 0 == g_callout[a] && (g_callout[a] = {});
    g_callout[a][b] = !0;
    ui_errorStateSet(a, !0)
}
function calloutClear(a, b) {
    if (void 0 != g_callout[a] && void 0 != g_callout[a][b]) {
        delete g_callout[a][b];
        1 > g_callout[a].length && ui_errorStateSet(a, !1);
        for (var c = 0, d = 0; d < g_callout.length; d++)
            c += g_callout[d].length;
        c || ui_errorStateClear()
    }
}
function contactlistAuthorize(a, b, c, d, e, f) {
    switch (e) {
    case "ask":
        var g = {};
        g.connection = a;
        g.username = b;
        g.displayname = c ? c : b;
        g.iconhash = d;
        g.type = e;
        g.reason = f;
        if (a = getAccountByConnection(a))
            g.medium = a.medium,
            g_authrequest.push(g),
            calloutAdd("settings", g.connection + g.username);
        break;
    case "approved":
        deleteAuthRequest(a, b),
        calloutClear("settings", a + b)
    }
    ui_updateAuthorizationRequests()
}
function deleteAuthRequest(a, b) {
    for (var c = 0; c < g_authrequest.length; c++)
        g_authrequest[c].connection == a && g_authrequest[c].username == b && (g_authrequest.splice(c, 1),
        c--)
}
function authorizationResponse(a, b, c, d, e) {
    addPacket("c=contactlistAuthorize&connection=" + a + "&username=" + b + "&type=" + c);
    "accept" == c && contactAdd(d, b, e, a);
    deleteAuthRequest(a, b);
    calloutClear("notifications", a + b);
    ui_updateAuthorizationRequests()
}
function deviceDisconnect(a) {
    addPacket("c=deviceDisconnect&name=" + a);
    deviceRemove(a)
}
function deviceAdd(a, b, c, d, e) {
    for (var f = 0; f < g_devices.length; f++) {
        var g = g_devices[f];
        if (g.name == a) {
            g.name = a;
            g.description = b;
            g.ipaddress = c;
            g.logintime = d;
            g.current = e;
            ui_updateDevices();
            return
        }
    }
    g = {};
    g.name = a;
    g.description = b;
    g.ipaddress = c;
    g.logintime = d;
    g.current = e;
    g_devices.push(g);
    ui_updateDevices()
}
function deviceRemove(a) {
    for (var b = 0; b < g_devices.length; b++)
        if (g_devices[b].name == a) {
            g_devices.splice(b, 1);
            break
        }
    ui_updateDevices()
}
function membershipNamesSet(a, b) {
    g_membershipFirstName = a;
    g_membershipLastName = b;
    ui_membershipUpdate()
}
function membershipEmailSet(a, b) {
    g_membershipEmail = a;
    g_membershipEmailVerified = b;
    ui_membershipUpdate()
}
function membershipPhoneSet(a, b) {
    g_membershipPhone = a;
    g_membershipPhoneVerified = b;
    ui_membershipUpdate()
}
function membershipGenderSet(a) {
    g_membershipGender = a;
    ui_membershipUpdate()
}
function membershipDobSet(a, b, c) {
    g_membershipDobMonth = a;
    g_membershipDobDay = b;
    g_membershipDobYear = c;
    ui_membershipUpdate()
}
function privacyCloudLoggingSet(a) {
    g_privacyCloudLogging = a;
    ui_privacyCloudLoggingUpdate()
}
function privacyCloudLoggingUpdate(a) {
    addPacket("c=privacyCloudLoggingSet&state=" + (a ? "on" : "off"))
}
function privacyAutoHistorySet(a) {
    g_privacyAutoHistory = a;
    ui_privacyAutoHistoryUpdate()
}
function privacyAutoHistoryUpdate(a) {
    addPacket("c=privacyAutoHistorySet&state=" + (a ? "on" : "off"))
}
function membershipSet(a, b, c, d, e) {
    g_membershipSet = !0;
    g_membershipPro = c;
    g_membershipExpiration = a;
    g_membershipLifetime = e;
    ui_membershipUpdate()
}
function membershipDobMonthUpdate(a) {
    g_membershipDobMonth = a;
    membershipDobUpdate()
}
function membershipDobYearUpdate(a) {
    g_membershipDobYear = a;
    membershipDobUpdate()
}
function membershipDobDayUpdate(a) {
    g_membershipDobDay = a;
    membershipDobUpdate()
}
function membershipNamesUpdate(a, b) {
    if (g_membershipFirstName != a || g_membershipLastName != b) {
        g_membershipFirstName = a;
        g_membershipLastName = b;
        var c = "c=membershipNamesUpdate&firstname=" + encodeURIComponent(g_membershipFirstName) + "&lastname=" + encodeURIComponent(g_membershipLastName);
        addPacket(c)
    }
}
function membershipDisplayNameUpdate(a, b) {
    var c = "c=identityUpdate&displayname=" + encodeURIComponent(a) + "&identity=" + encodeURIComponent(b);
    addPacket(c)
}
function membershipDobUpdate() {
    var a = "c=membershipDobUpdate&month=" + encodeURIComponent(g_membershipDobMonth) + "&year=" + encodeURIComponent(g_membershipDobYear) + "&day=" + encodeURIComponent(g_membershipDobDay);
    addPacket(a)
}
function membershipGenderUpdate(a) {
    a = "c=membershipGenderUpdate&gender=" + encodeURIComponent(a);
    addPacket(a)
}
function membershipGet() {
    addPacket("c=membershipGet")
}
function passwordSet(a) {
    a = "c=membershipPasswordUpdate&password=" + encodeURIComponent(a);
    addPacket(a)
}
function membershipPasswordUpdateResponse(a) {
    a ? ui_passwordSuccess() : ui_passwordFailure()
}
function historyRequestWeek(a, b, c) {
    var d = (a.medium + ":" + a.username + ":" + b + ":" + c).toLowerCase();
    g_historyRequests[d] && g_historyRequests[d].requested || (g_historyRequests[d] = {},
    g_historyRequests[d].requested = !1,
    g_historyRequests[d].data = "c=historyGet&name=" + encodeURIComponent(a.username) + "&medium=" + a.medium + "&identity=default&week=" + b + "&year=" + c)
}
function historyRequestNextPendingWeek() {
    if (!g_historyPending)
        for (var a in g_historyRequests)
            if (0 == g_historyRequests[a].requested) {
                g_historyRequests[a].requested = !0;
                addPacket(g_historyRequests[a].data);
                g_historyPending = !0;
                break
            }
}
function historyRequest(a, b, c) {
    var d = new Date(c,b - 1,0)
      , e = new Date(c,0,0);
    b = new Date(c,b,0);
    var f = new Date(b.getFullYear(),0,0)
      , d = Math.floor(dateSubtract(e, d) / 7)
      , e = Math.floor(dateSubtract(f, b) / 7 + 1);
    if (c != b.getFullYear()) {
        for (; 0 <= e; e--)
            historyRequestWeek(a, e, b.getFullYear());
        e = 53
    }
    for (; e >= d; e--)
        historyRequestWeek(a, e, c);
    historyRequestNextPendingWeek()
}
function historySet(a, b, c, d, e) {
    g_historyPending = !1;
    var f = (a + ":" + b).toLowerCase();
    void 0 == g_historyMessages[f] && (g_historyMessages[f] = []);
    c = $.parseXML(e);
    $(c).find("i").each(function() {
        var a = $(this).attr("ts")
          , b = $(this).attr("m")
          , c = $(this).attr("l")
          , d = $(this).attr("r")
          , e = $(this).attr("ty")
          , p = $(this).attr("te")
          , n = {};
        n.timestamp = a;
        n.medium = b;
        n.local = decodeURIComponent(c);
        n.remote = decodeURIComponent(d);
        -1 != e.indexOf("group") && usernameEquals(g_username, n.remote) && (e = "outgoing_groupMessage");
        n.type = decodeURIComponent(e);
        n.text = decodeURIComponent(p);
        g_historyMessages[f].push(n)
    });
    g_historyMessages[f].sort(function(a, b) {
        return a.timestamp - b.timestamp
    });
    historyRequestNextPendingWeek();
    g_view.ui_historySet(a, b)
}
function messageFromNames(a, b) {
    for (var c = 0; c < g_messageWindows.length; c++) {
        var d = g_messageWindows[c];
        if (d.medium.toLowerCase() == a.toLowerCase()) {
            if (d.username.toLowerCase() == b.toLowerCase())
                return d;
            if (-1 != b.indexOf("&") && d.nicks) {
                var e = b.split("&");
                -1 == e.indexOf(g_username.toLowerCase()) && e.push(g_username.toLowerCase());
                if (e.length == d.nicks.length) {
                    for (var f = 0, g = 0; g < e.length; g++)
                        for (var h = 0; h < d.nicks.length; h++)
                            if (e[g].toLowerCase() == d.nicks[h].name.toLowerCase()) {
                                f++;
                                break
                            }
                    if (f == e.length)
                        return d
                }
            }
        }
    }
    return null
}
function audioDuration(a) {
    var b = Math.ceil(a);
    a = parseInt(b / 60);
    b = parseInt(b % 60);
    10 > b && (b = "0" + b);
    return a + ":" + b
}
function mediaThumbnailRequest(a, b) {
    log("Backend: Request: Thumbnail for " + a + ".");
    var c = localStorage.getItem("media:" + $.base64.encode(a));
    if (c) {
        var d = $.base64.decode(c);
        setTimeout(function() {
            var c = d.split(":");
            mediaThumbnailResult(a, b, c[0], c[1], c[2], c[3])
        }, 1)
    } else
        $.ajax({
            type: "HEAD",
            async: !0,
            url: a,
            success: function(c, d, g) {
                c = g.getResponseHeader("Trillian-Media-Name");
                d = g.getResponseHeader("Trillian-Media-Size");
                var h = g.getResponseHeader("Trillian-Media-Created-At");
                g = g.getResponseHeader("Trillian-Media-Thumbnail");
                mediaThumbnailResult(a, b, c, d, h, g);
                try {
                    var k = $.base64.encode(c + ":" + d + ":" + h + ":" + g);
                    localStorage.setItem("media:" + $.base64.encode(a), k)
                } catch (l) {}
            },
            error: function(c, d, g) {
                b.parent().addClass("file");
                b.removeClass("loading");
                b.attr("src", "");
                b.parent().text(b.attr("original"));
                log("Backend: Error: Thumbnail information for " + a + " (" + c + ": " + d + ": " + g + ").")
            }
        })
}
function mediaThumbnailResult(a, b, c, d, e, f) {
    log("Backend: Result: Thumbnail information for " + a + " is: " + c + ", " + d + ", " + e + ", " + f + ".");
    if (c)
        if (e = d + " bytes",
        1073741824 < d ? e = (d / 1073741824).toFixed(1) + " GB" : 1048576 < d ? e = (d / 1048576).toFixed(1) + " MB" : 1024 < d && (e = (d / 1024).toFixed(1) + " KB"),
        -1 != c.indexOf(".jpg") || -1 != c.indexOf(".gif") || -1 != c.indexOf(".png"))
            b.removeClass("thumbnailNeeded"),
            b.parent().addClass("mediaLightbox"),
            b.attr("src", a),
            ui_attachLightboxToImages(b.parent());
        else if (-1 != c.indexOf(".mp4")) {
            c = b.parent();
            c.addClass("audio");
            d = c.parent().parent().parent().find(".text").css("color");
            var g = $('<div class="controls"></div>');
            g.append('<svg height="20" width="70" class="play"><circle cx="10" cy="10" r="9" stroke="' + d + '" stroke-width="1.5" fill="transparent"/><polygon points="8,6 14,10 8,14" style="fill:' + d + ";stroke:" + d + ';stroke-width:1"/><line x1="19" y1="10" x2="70" y2="10" style="stroke:' + d + ';stroke-width:2"/></svg><svg height="20" width="70" class="pause"><circle cx="10" cy="10" r="9" stroke="' + d + '" stroke-width="1.5" fill="transparent"/><line x1="8" y1="6" x2="8" y2="14" style="stroke:' + d + ';stroke-width:2"/><line x1="12" y1="6" x2="12" y2="14" style="stroke:' + d + ';stroke-width:2"/><line x1="19" y1="10" x2="70" y2="10" style="stroke:' + d + ';stroke-width:2"/></svg>');
            var h = $('<div class="duration"><div class="loading"></div></div>');
            g.append(h);
            c.append(g);
            var k = $('<audio src="' + a + '">');
            k.bind("durationchange", function() {
                h.find(".loading").remove();
                h.text(audioDuration($(this)[0].duration));
                try {
                    localStorage.setItem("audio:duration:" + $.base64.encode(a), $(this)[0].duration)
                } catch (b) {}
            });
            k.bind("timeupdate", function() {
                h.text(audioDuration($(this)[0].duration - $(this)[0].currentTime))
            });
            k.bind("ended", function() {
                g.find(".pause").hide();
                g.find(".play").css("display", "inline-block");
                h.text(audioDuration($(this)[0].duration));
                $(this)[0].currentTime = 0
            });
            c.append(k);
            d = -1;
            (f = localStorage.getItem("audio:duration:" + $.base64.encode(a))) && (d = f);
            -1 == d ? k[0].load() : (h.find(".loading").remove(),
            h.text(audioDuration(d)));
            b.remove();
            c.click(function() {
                k[0].paused ? ($("audio").each(function() {
                    $(this)[0].pause();
                    $(this)[0].currentTime = 0;
                    var a = $(this).siblings(".controls");
                    a.find(".pause").hide();
                    a.find(".play").css("display", "inline-block")
                }),
                k[0].play(),
                g.find(".play").hide(),
                g.find(".pause").css("display", "inline-block")) : (k[0].pause(),
                g.find(".pause").hide(),
                g.find(".play").css("display", "inline-block"));
                return !1
            })
        } else
            b.parent().addClass("file"),
            b.removeClass("thumbnailNeeded"),
            0 == g_mediaURL.length ? b.attr("src", "https://media.trillian.im/media/?m=" + f) : b.attr("src", g_mediaURL + f),
            b.parent().find(".mediaName").text(c),
            b.parent().find(".mediaSize").text(e);
    else
        b.parent().text(a)
}
function addStatisticEvent(a) {
    domainUser() && (g_domain && g_domain.trial ? addEvent("stats", a + "_admin", g_username) : g_user && g_user.domain_trial && addEvent("stats", a + "_user", g_username))
}
;var g_messageInbound = null;
function notificationsReady() {
    window.Notification && (ui_notificationsAvailable(),
    window.Notification.requestPermission(function(a) {
        Notification.permission != a && (Notification.permission = a);
        "granted" == Notification.permission && ui_notificationsAllowed()
    }));
    g_messageInbound || (g_messageInbound = document.createElement("audio")) && g_messageInbound.setAttribute("src", "sounds/message-inbound.mp3")
}
function notificationsAdd(a, b, c, d) {
    g_controller.g_settingsSounds && g_messageInbound && "function" === typeof g_messageInbound.play && g_messageInbound.play();
    if (g_notificationsEnabled && window.Notification && "granted" == window.Notification.permission) {
        var e = new Notification(b,{
            body: c,
            iconUrl: a,
            icon: a
        });
        e.onclick = d;
        setTimeout(function() {
            e.close()
        }, 7500)
    }
}
;var g_controller = {}
  , g_notificationsEnabled = !0
  , g_notificationsAllowed = !1
  , g_notificationsAvailable = !1
  , g_messages_cached_element = $(".messages")
  , g_nicklist_cached_element = $(".nicklist")
  , g_drop_cached_element = $(".drop")
  , g_page_cached_element = $(".page")
  , g_left_cached_element = $(".left")
  , g_trillian_right_cached_element = $("#trillian .right")
  , g_settings_right_cached_element = $("#settings .right")
  , g_right_cached_element = $(".right")
  , g_users_cached_element = $(".right .users")
  , g_groups_cached_element = $(".right .groups")
  , g_helpvalue_cached_element = $(".helpvalue")
  , g_welcome_cached_element = $(".welcome")
  , g_chats_cached_element = $("#chats")
  , g_tabs_cached_element = $(".tabs")
  , g_contacts_cached_element = $("#contacts")
  , g_trillian_header_cached_element = $("#trillian .header")
  , g_settings_header_cached_element = $("#settings .header")
  , g_bubble_cached_displacement = 240
  , g_bubble_cached_maxwidth_rule = {}
  , g_window_old_size = $(window).height()
  , g_sendDiagnosticLog = !1
  , g_currentModal = null
  , g_membershipPurchase = !1
  , g_displayname = null
  , g_status = "offline"
  , g_statusMessage = null
  , g_nochats = !0
  , g_dragHtml = !1
  , g_dragDropZone = !1
  , g_avatar = null
  , g_gravatarAvatar = null
  , g_fileAvatar = null
  , g_avatarsRequested = []
  , g_oldScrollLocation = null
  , g_contactlistUpdatePending = !1
  , g_iteration = 0
  , g_domain = null
  , g_imageHistory = null
  , g_olarkHidden = !1
  , g_adVisible = !1
  , g_pendingSignout = !1
  , g_pendingGroupChatBadge = null
  , g_muteSVG = '<img src="img/mute.png">'
  , g_onSVG = "&#9745;"
  , g_offSVG = "&#9744;"
  , g_closeSVG = '<img src="img/close.png">'
  , g_lockSVG = '<span class="emoji">&#x1f512;</span>'
  , g_emojiScrolling = !1
  , g_nicklistDirty = !1
  , g_idle = 0
  , g_idleMovementTime = 0
  , g_timestampDay = null;
"https:" != document.location.protocol && (document.location = "https://" + document.location.hostname + document.location.pathname + document.location.search + document.location.hash);
$(document).ready(function() {
    g_controller = window;
    g_controller.connectUI(window);
    $.browser.msie && 8 > $.browser.version && setAlert('We are sorry, but Trillian for Web is not optimized for your browser at this time. Our <a href="https://www.trillian.im/web/2.0/" target="_blank">older version is still available</a>.');
    for (var a = document.styleSheets[0].rules ? document.styleSheets[0].rules : document.styleSheets[0].cssRules, b = 0; b < a.length; b++)
        ".right .message .text" == a[b].selectorText && (g_bubble_cached_maxwidth_rule = a[b]);
    try {
        $.cookie("disable_notifications") && (g_notificationsEnabled = !1)
    } catch (c) {}
    resize();
    (a = $.cookie("trillian_username")) && 0 < a.length ? "" == $("#x_loginUsername").val() && ($("#x_loginUsername").val(a),
    $("#x_loginPassword").focus()) : $("#x_loginUsername").focus();
    processParameters();
    createSVG();
    setTimeout(preloadImages, 1500);
    hookIntoEmojiBrowser();
    setupMaintenance();
    setTimeout(idleDetection, 3E4);
    $(this).mousemove(idleAction);
    $(this).keydown(idleAction)
});
function setupMaintenance() {
    var a = new Date, b;
    for (b in g_outages) {
        var c = new Date(g_outages[b][1]);
        if ("planned" == g_outages[b][0] && (c >= a || c.getMonth() == a.getMonth() && c.getDate() == a.getDate() && c.getFullYear() == a.getFullYear())) {
            g_outages[b][4] ? $("#x_maintenance").html("<b>Planned Maintenance:</b> " + g_outages[b][4]) : $("#x_maintenance").html("<b>Planned Maintenance:</b> " + g_outages[b][2]);
            $(".maintenance").show();
            $(".maintenance").click(function() {
                window.open("/news/#" + c.getTime(), "_blank")
            });
            return
        }
    }
    g_notice && 0 < g_notice.length && ($("#x_maintenance").html(g_notice[0]),
    $(".maintenance").show(),
    $(".maintenance").click(function() {
        window.open(g_notice[1], "_blank")
    }))
}
function idleAction() {
    g_idleMovementTime = new Date;
    g_idle && (g_idle = !1,
    g_sessionReady && g_controller.sessionIdle(0))
}
function idleDetection() {
    var a = new Date;
    g_timestampDay ? 1 <= dateSubtract(a, g_timestampDay) && (g_timestampDay = a,
    g_sessionReady && ui_messagesTimestampUpdate()) : g_timestampDay = a;
    a -= g_idleMovementTime;
    if (6E4 < a) {
        if (g_idle) {
            setTimeout(idleDetection, 15E3);
            return
        }
        g_idle = !0;
        g_sessionReady && g_controller.sessionIdle(a / 1E3)
    }
    setTimeout(idleDetection, 15E3)
}
function loadScripts() {
    if ("1" != $(".olark_available").attr("domain") || domainUser())
        window.olark || function(a) {
            var b = window
              , c = document
              , d = "https:" == b.location.protocol ? "https:" : "http:"
              , e = a.name
              , f = function() {
                function g() {
                    h.P("load");
                    b[e]("load")
                }
                b[e] = function() {
                    (h.s = h.s || []).push(arguments)
                }
                ;
                for (var h = b[e]._ = {}, k = a.methods.length; k--; )
                    (function(a) {
                        b[e][a] = function() {
                            b[e]("call", a, arguments)
                        }
                    })(a.methods[k]);
                h.l = a.loader;
                h.i = f;
                h.p = {
                    0: +new Date
                };
                h.P = function(a) {
                    h.p[a] = new Date - h.p[0]
                }
                ;
                b.addEventListener ? b.addEventListener("load", g, !1) : b.attachEvent("onload", g);
                var l = function() {
                    function b(a) {
                        a = "head";
                        return ["<", a, "></", a, "><", f, ' onload="var d=', w, ";d.getElementsByTagName('head')[0].", k, "(d.", r, "('script')).", t, "='", d, "//", h.l, "'\"></", f, ">"].join("")
                    }
                    var f = "body"
                      , g = c[f];
                    if (!g)
                        return setTimeout(l, 100);
                    h.P(1);
                    var k = "appendChild", r = "createElement", t = "src", u = c[r]("div"), x = u[k](c[r](e)), v = c[r]("iframe"), w = "document", y;
                    u.style.display = "none";
                    g.insertBefore(u, g.firstChild).id = e;
                    v.frameBorder = "0";
                    v.id = e + "-loader";
                    /MSIE[ ]+6/.test(navigator.userAgent) && (v.src = "javascript:false");
                    v.allowTransparency = "true";
                    x[k](v);
                    try {
                        v.contentWindow[w].open()
                    } catch (A) {
                        a.domain = c.domain,
                        y = "javascript:var d=" + w + ".open();d.domain='" + c.domain + "';",
                        v[t] = y + "void(0);"
                    }
                    try {
                        var z = v.contentWindow[w];
                        z.write(b());
                        z.close()
                    } catch (A) {
                        v[t] = y + 'd.write("' + b().replace(/"/g, String.fromCharCode(92) + '"') + '");d.close();'
                    }
                    h.P(2)
                };
                l()
            };
            f()
        }({
            loader: "static.olark.com/jsclient/loader0.js",
            name: "olark",
            methods: ["configure", "extend", "declare", "identify"]
        }),
        olark.identify("4447-291-10-3309"),
        olark.configure("locale.welcome_title", "How can we help?"),
        olark.configure("box.start_hidden", !0),
        window.olark && (g_olarkHidden = !0,
        olark("api.box.hide"),
        olark("api.chat.onOperatorsAvailable", function() {
            $(".olark_available").fadeIn().css("display", "inline-block");
            updateNewsFeed()
        }),
        olark("api.box.onShrink", function() {
            olark("api.box.hide");
            g_olarkHidden = !0
        }),
        window.olark && g_username && olark("api.chat.updateVisitorStatus", {
            snippet: "Username: " + g_username
        }))
}
function ui_membershipUpdate() {
    $("#div_username").text(g_username);
    g_membershipEmail && 0 < g_membershipEmail.length ? $("#div_email").text(g_membershipEmail) : $("#div_email").text("Not set");
    !g_membershipEmailVerified && g_membershipEmail && 0 < g_membershipEmail.length ? $("#settingsEmailConfirmShow").show() : $("#settingsEmailConfirmShow").hide();
    ui_updateIdentityName();
    var a = g_membershipPhone;
    a && "+" == a[0] && 12 == a.length && (a = a.substring(0, 2) + " (" + a.substring(2, 5) + ") " + a.substring(5, 8) + "-" + a.substring(8, 12));
    a && 0 < a.length ? $("#div_phone").text(a) : $("#div_phone").text("Not set");
    !g_membershipPhoneVerified && g_membershipPhone && 0 < g_membershipPhone.length ? $("#settingsPhoneVerifyShow").show() : $("#settingsPhoneVerifyShow").hide();
    g_membershipPro ? g_membershipLifetime ? ($("#div_pro").text("Lifetime membership.  Thank you."),
    $("#div_pro_button").hide()) : (0 < g_membershipExpiration ? 1275364800 <= g_membershipExpiration && 1307664E3 >= g_membershipExpiration ? $("#div_pro").text("Active membership.  Thank you.") : (a = new Date,
    a.setTime(1E3 * g_membershipExpiration),
    $("#div_pro").text("Active.  Expires on " + a.toLocaleShortDateString() + ".")) : $("#div_pro").text("Active membership.  Thank you."),
    $("#div_pro_button").text("Renew")) : (0 < g_membershipExpiration ? (a = new Date,
    a.setTime(1E3 * g_membershipExpiration),
    $("#div_pro").text("Expired on " + a.toLocaleDateString() + ".")) : $("#div_pro").text("Not a Trillian Pro member.  Upgrade today!"),
    $("#div_pro_button").text("Upgrade"));
    g_membershipPurchase || !g_membershipSet || g_membershipLifetime || g_inhouseServer || (g_membershipPurchase = !0,
    g_membershipPro || proPurchasePrice(g_username, g_password, g_membershipPro, g_membershipExpiration, $("#x_ad")));
    updateNewsFeed()
}
function ui_privacyCloudLoggingUpdate() {
    g_privacyCloudLogging ? ($("#x_settingsStoreHistoryValue").text("Stored Online"),
    octopusProtocol4 && $("#x_settingsAutoHistoryDiv").show()) : ($("#x_settingsStoreHistoryValue").text("Off"),
    $("#x_settingsAutoHistoryDiv").hide())
}
function ui_privacyAutoHistoryUpdate() {
    g_privacyAutoHistory ? $("#x_settingsAutoHistoryValue").text("Shown") : $("#x_settingsAutoHistoryValue").text("Off")
}
function ui_updateDevices() {
    $("#div_devices").children().remove();
    for (var a = 0; a < g_controller.g_devices.length; a++) {
        var b = g_controller.g_devices[a]
          , c = b.description
          , d = b.name
          , e = b.name.indexOf(".");
        -1 != e && (d = b.name.substr(0, e));
        e = c.indexOf("/");
        -1 != e && (c = c.substr(e + 1));
        c = "<div class='helpline'><span class='helplabel'>" + d + "</span><span class='helpvalue'>" + c + "</span>";
        c = "1" != b.current ? c + ("<span id='_device_" + a + "'' class='button helpbutton'>Disconnect</span>") : c + "<span id='x_sendDiagnosticLogDevice' class='button helpbutton'>Send Diagnostic Log</span>";
        c += "</div>";
        "1" == b.current ? $("#div_devices").prepend(c) : $("#div_devices").append(c);
        $("#_device_" + a).click(function(a) {
            g_controller.deviceDisconnect(b.name);
            a.preventDefault();
            return !1
        });
        $("#x_sendDiagnosticLogDevice").click(function() {
            g_sendDiagnosticLog || (g_sendDiagnosticLog = !0,
            sendDiagnosticLog(),
            $("#x_sendDiagnosticLogDevice").text("Send Diagnostic Log (Sent)"))
        })
    }
    updateNewsFeed()
}
function searchFilter(a) {
    if (a && "" != a) {
        $(".search .close").show();
        showContactList(!1);
        var b = $("#x_contacts");
        b.children().remove();
        for (var c = g_controller.g_contacts, d = [], e = 0; e < c.length; e++) {
            var f = c[e]
              , g = g_controller.contactMatchScore(f, a);
            0 < g && (l_result = {},
            l_result.search_score = g,
            l_result.contact = f,
            l_result.displayname = f.displayname,
            d.push(l_result))
        }
        d.sort(g_controller.contactSearchSort);
        b.show().siblings().hide();
        0 < d.length ? b.append("<div class='group first'>RESULTS FOR &quot;" + a.toUpperCase() + "&quot; (" + d.length + ")</div>") : b.append("<div class='group first'>NO RESULTS FOR &quot;" + a.toUpperCase() + "&quot;</div>");
        for (e = 0; e < d.length; e++)
            b.append(contactHtml(d[e].contact));
        b.find(".contact").first().addClass("active")
    } else
        $(".search .close").hide(),
        contactlistGroupByChange(),
        showContactList(!0)
}
function ui_sessionStatus(a, b) {
    var c = getStatusLabel(a);
    g_status = getStatusSimplified(a);
    g_statusMessage = b;
    ui_updateIdentityName();
    b && 0 < b.length && (c += " - " + b.stripHtml());
    $(".identity_button").attr("title", c);
    $("#x_identityStatus").attr("status", getStatusSimplified(a));
    "do not disturb" == a.toLowerCase() || "invisible" == a.toLowerCase() || "offline" == a.toLowerCase() ? $(".menu .status_message").hide() : $(".menu .status_message").show();
    updateNewsFeed()
}
function ui_contactlistAdd(a) {
    if ("0" != g_setting["contactlist.visible"]) {
        var b = $("<div class='group'>UNSORTED</div>")
          , c = contactHtml(a)
          , d = $("#x_contactGroupTextAdd");
        d ? (c.insertBefore(d),
        b.insertBefore(c)) : ($("#x_contacts").append(b),
        $("#x_contacts").append(c));
        requestAvatarWhenAppears(a, "#x_contacts");
        (b = g_controller.messageWindow(g_messageIdFocus)) && b.username == a.realname && b.medium == a.medium && (b.contact = !0,
        ui_messageFocus(g_messageIdFocus, !0));
        updateContactlist(!1)
    }
}
function ui_contactlistRename(a) {
    "ASTRA" == a.medium.toUpperCase() && domainContactStatusUpdate(a);
    "0" != g_setting["contactlist.visible"] && ($("div[medium=" + a.medium + "][username='" + a.realname + "'] .name").text(a.displayname),
    updateContactlist(!1))
}
function ui_contactlistRemove(a) {
    "ASTRA" == a.medium.toUpperCase() && domainContactStatusUpdate(a);
    $("div[medium=" + a.medium + "][username='" + a.realname + "']").remove();
    var b = g_controller.messageWindow(g_messageIdFocus);
    b && b.username == a.realname && b.medium == a.medium && (b.contact = !1,
    ui_messageFocus(g_messageIdFocus, !0));
    updateContactlist(!1)
}
function ui_contactlistUpdate(a) {
    "ASTRA" == a.medium.toUpperCase() && domainContactStatusUpdate(a);
    var b = g_controller.messageWindow(g_messageIdFocus);
    b && b.username == a.realname && b.medium == a.medium && $("#x_chatToolbar").attr("status", getStatusSimplified(a.status));
    $("#contacts").is(":visible") && (b = $("div[medium=" + a.medium + "][username='" + a.realname + "']"),
    b.attr("status", getStatusSimplified(a.status)),
    b.find(".message").text(a.status_message.stripHtml()),
    a.status_message && 0 != a.status_message.length ? b.find(".name").removeClass("solo") : b.find(".name").addClass("solo"),
    (b = b.find(".avatar img")) && b.attr("iconhash") != a.iconhash && (b.attr("iconhash", a.iconhash),
    requestAvatarWhenAppears(a, "#x_contacts")),
    updateContactlist(!1))
}
function ui_contactlistMute(a) {
    var b = $("div[medium=" + a.medium + "][username='" + a.realname + "'] .mute");
    if (b) {
        var c = isMuted(a.mutedUntil);
        0 < c ? (b.html(g_muteSVG),
        setTimeout(function() {
            ui_contactlistMute(a)
        }, c + 1E3)) : b.html("")
    }
}
function ui_contactlistWindowUpdate(a, b, c, d, e) {
    a = $("div[window=" + a + "]");
    a.attr("status", getStatusSimplified(b));
    b = a.find(".avatar img");
    b[0] && b.attr("iconhash") != e ? (b.attr("iconhash", e),
    g_controller.avatarRequest(e, c, d, "default")) : !b[0] && e && (b = a.find(".avatar"),
    a = $(document.createElement("img")),
    a.attr("iconhash", e),
    a.attr("src", "img/blank.gif"),
    a.appendTo(b),
    g_controller.avatarRequest(e, c, d, "default"))
}
$("#x_membersButton").click(function() {
    $(".contact_settings.lightmenu").hide();
    $("#x_contactSettings").removeClass("active");
    $("#x_members").toggle();
    if ($("#x_members").is(":visible")) {
        if (g_nicklistDirty) {
            g_nicklistDirty = !1;
            var a = g_controller.messageWindow(g_messageIdFocus);
            a && a.nicks && ui_messageNicklistAddSorted(a.nicks)
        }
        $("#x_membersButton").addClass("active")
    } else
        $("#x_membersButton").removeClass("active");
    return !1
});
function ui_nicklistVisible(a) {
    a ? $("#x_membersButton").show() : $("#x_membersButton").hide();
    $("#x_members").hide();
    $("#x_membersButton").removeClass("active")
}
function ui_messageNicklistClear() {
    $("#x_membersButton").text("Members");
    $(".nicklist .nick").remove();
    $(".nicklist .group").hide()
}
function ui_messageNickCreate(a) {
    var b = 0;
    a.op ? b = 2 : a.voice && (b = 1);
    a = $('<div class="nick click" title="' + a.name + '" score="' + b + '" username="' + a.name + '">' + a.displayname + "</div>");
    a.click(function() {
        g_controller.messageCreate("ASTRA", $(this).attr("username"))
    });
    return a
}
function ui_messageNicklistAddSorted(a) {
    var b = g_controller.messageWindow(g_messageIdFocus);
    if (b) {
        for (var c = $('.nicklist div[group="Normal"]'), d = $('.nicklist div[group="Voice"]'), e = $('.nicklist div[group="Ops"]'), f = 0, g = 0, h = 0, k = 0; k < a.length; k++)
            if (!a[k].bot) {
                var l = ui_messageNickCreate(a[k]);
                a[k].op ? (f++,
                e.after(l)) : a[k].voice ? (g++,
                d.after(l)) : (h++,
                c.after(l))
            }
        0 < f && e.show();
        0 < g && d.show();
        0 < h && c.show();
        a = messageMemberCount(b);
        0 < a ? $("#x_membersButton").text("Members (" + a + ")") : $("#x_membersButton").text("Members");
        $("#x_bannerMemberCount").text(a);
        $("#x_bannerMemberCountWord").text(1 == a ? "member" : "members")
    }
}
function ui_messageNicklistMemberCountUpdate(a) {
    g_nicklistDirty = !0;
    0 < a ? $("#x_membersButton").text("Members (" + a + ")") : $("#x_membersButton").text("Members");
    $("#x_bannerMemberCount").text(a);
    $("#x_bannerMemberCountWord").text(1 == a ? "member" : "members")
}
function ui_messageNicklistAdd(a, b) {
    a.bot || (g_nicklistDirty = !0,
    0 < b ? $("#x_membersButton").text("Members (" + b + ")") : $("#x_membersButton").text("Members"),
    $("#x_bannerMemberCount").text(b),
    $("#x_bannerMemberCountWord").text(1 == b ? "member" : "members"))
}
function ui_messageNicklistChange(a, b) {
    g_nicklistDirty = !0
}
function ui_messageNicklistRemove(a, b) {
    g_nicklistDirty = !0;
    0 < b ? $("#x_membersButton").text("Members (" + b + ")") : $("#x_membersButton").text("Members");
    $("#x_bannerMemberCount").text(b);
    $("#x_bannerMemberCountWord").text(1 == b ? "member" : "members")
}
function ui_messageFocus(a) {
    $("#x_noChats").hide();
    $(".right .edit").show();
    $("#trillian .right .toolbar").show();
    $(".right .messages").show();
    messageCloseAutocomplete();
    g_nochats = !1;
    var b = g_controller.messageWindow(a);
    b && b.lastInput ? $("#x_edit").val(b.lastInput) : $("#x_edit").val("");
    if (b.contact)
        if ($("#x_contactSettings").show(),
        $(".contact_info").show(),
        $(".contact_history").show(),
        $(".contact_add").hide(),
        $(".contact_block").hide(),
        $(".contact_save").hide(),
        octopusProtocol2()) {
            var c = isMuted(b.muted_indicator);
            0 < c ? ($("#x_unmute").show(),
            $("#x_muteOneHour").hide(),
            $("#x_muteUntil8").hide(),
            $("#x_muteForever").hide(),
            setTimeout(function() {
                a == g_messageIdFocus && ui_messageFocus(g_messageIdFocus)
            }, c + 1E3)) : ($("#x_unmute").hide(),
            $("#x_muteOneHour").show(),
            $("#x_muteUntil8").show(),
            $("#x_muteForever").show());
            $("#x_muteSeparator").show()
        } else
            $("#x_unmute").hide(),
            $("#x_muteOneHour").hide(),
            $("#x_muteUntil8").hide(),
            $("#x_muteForever").hide(),
            $("#x_muteSeparator").hide();
    else
        $("#x_contactSettings").hide(),
        $(".contact_info").hide(),
        $(".contact_history").hide(),
        b.group ? ($(".contact_save").show(),
        $(".contact_add").hide(),
        $(".contact_block").hide()) : ($(".contact_save").hide(),
        $(".contact_add").show(),
        $(".contact_block").show()),
        $("#x_unmute").hide(),
        $("#x_muteOneHour").hide(),
        $("#x_muteUntil8").hide(),
        $("#x_muteForever").hide(),
        $("#x_muteSeparator").hide();
    b.group && b.topic && 0 < b.topic.length ? ($("#x_chatName").attr("title", b.displayname + " - " + b.topic),
    $("#x_chatName").text(b.displayname + " - " + b.topic)) : ($("#x_chatName").attr("title", b.displayname + " (" + b.username + ") on " + mediumDisplay(b.medium)),
    $("#x_chatName").text(b.displayname));
    $("#x_bannerName").text(b.displayname);
    b.group ? ($("#x_chatStatus").hide(),
    b.flag_disable_member_add ? ($("#x_groupchatAddSeparator").hide(),
    $("#x_groupchatAdd").hide()) : ($("#x_groupchatAddSeparator").show(),
    $("#x_groupchatAdd").show()),
    b.flag_disable_member_remove ? ($("#x_groupchatLeaveSeparator").hide(),
    $("#x_groupchatLeave").hide()) : ($("#x_groupchatLeaveSeparator").show(),
    $("#x_groupchatLeave").show())) : $("#x_chatStatus").css("display", "inline-block");
    $("#chats div[window=" + a + "]").addClass("active");
    var c = "offline"
      , d = g_contacts[getContactEnum(b.medium, b.username)];
    d && (c = getStatusSimplified(d.status));
    $("#x_chatToolbar").attr("status", c);
    $("#contacts").hide();
    $("#chats").show();
    $("#x_filterChats").addClass("active").siblings().removeClass("active");
    ui_showWelcomeMessageModal(b)
}
function ui_chatFlagsUpdate(a) {
    a.flag_disable_member_add ? ($("#x_groupchatAddSeparator").hide(),
    $("#x_groupchatAdd").hide()) : ($("#x_groupchatAddSeparator").show(),
    $("#x_groupchatAdd").show());
    a.flag_disable_member_remove ? ($("#x_groupchatLeaveSeparator").hide(),
    $("#x_groupchatLeave").hide()) : ($("#x_groupchatLeaveSeparator").show(),
    $("#x_groupchatLeave").show())
}
function ui_topicUpdate(a) {
    a ? a.group && a.topic && 0 < a.topic.length ? $("#x_chatName").text(a.displayname + " - " + a.topic) : $("#x_chatName").text(a.displayname) : $("#x_chatName").text("");
    a && $("#x_bannerName").text(a.displayname)
}
function ui_messageFocusRemove(a) {
    $("#chats div[window=" + a + "]").removeClass("active");
    if (a = messageWindow(a))
        a.lastInput = $("#x_edit").val()
}
function ui_editboxFocus(a) {
    a && $("#x_filterChats").click();
    $("#x_edit").focus()
}
function ui_messageUpdateBanner(a) {
    if (a && "ASTRA" == a.medium) {
        var b = domainUser() && octopusProtocol2();
        0 == g_policy["trillian.groupchat.join.impp"] && (b = !1);
        var c = null;
        if (a.group) {
            var c = messageMemberCount(a)
              , d = 1 == c ? "member" : "members";
            "General" == a.displayname && g_domain ? c = a.flag_disable_list || !b ? '<div>This is a <b>private</b> group chat.  Messages sent to this chat will be seen by all <b id="x_bannerMemberCount">' + c + "</b> " + d + ", and new members can only be invited by an existing member.</div>" : '<div>Hi there!  We\'ve automatically created your first <b>public</b> group chat, "General", for you.  Messages sent to this chat will be seen by everyone in your company, and as you bring new users into Trillian they will be automatically added as well.  You can change these settings (and add more group chats) later, but feel free to use your new virtual water cooler to get started!</div>' : ("General" == a.displayname && domainUser(),
            c = a.flag_disable_list || !b ? '<div>This is a <b>private</b> group chat.  Messages sent to this chat will be seen by all <b id="x_bannerMemberCount">' + c + "</b> " + d + ", and new members can only be invited by an existing member.</div>" : '<div>This is a <b>public</b> group chat.  Messages sent to this chat will be seen by all <b id="x_bannerMemberCount">' + c + "</b> " + d + ", and new members can join at any time.</div>");
            $("#x_welcomeGroupChatModal .body").html(c);
            $("#x_welcomeGroupChatModal h4").html(a.displayname)
        } else
            c = "<div>This is a <b>private</b> chat between you and <b>" + a.displayname + "</b>.  Messages sent to this chat will only be seen by the two of you.</div>",
            $("#x_welcomePrivateChatModal .body").html(c),
            $("#x_welcomePrivateChatModal h4").html(a.displayname)
    }
}
function ui_messageClear(a) {
    $("#messages").children().remove()
}
function ui_appendItemSorted(a, b) {
    var c = !1;
    $($("#messages .item").get().reverse()).each(function() {
        if ($(this).attr("time") < b)
            return c = !0,
            $(a).insertAfter($(this)),
            !1
    });
    c || $("#messages").prepend(a);
    ui_messagesTimestampUpdate()
}
function ui_messagesTimestampUpdate() {
    $("#messages .daily_timestamp").remove();
    var a = null
      , b = null
      , c = null;
    $("#messages .item").each(function() {
        var d = parseInt($(this).attr("time"))
          , e = $(this).attr("from");
        if (!a || !sameDay(a, d)) {
            c && c.addClass("last");
            b = null;
            var f = formatTimestamp(d, !0);
            $(f).insertBefore($(this));
            a = d
        }
        e && b == e ? e && e == b && ($(this).removeClass("first"),
        c && c.removeClass("last")) : (c && c.addClass("last"),
        b = null);
        !b && e ? (b = e,
        $(this).addClass("first"),
        a = d) : e && e == b && 3E5 < d - a && (c && c.addClass("last"),
        $(this).addClass("first"),
        a = d);
        c = $(this)
    });
    c && c.addClass("last")
}
function ui_appendMessage(a, b) {
    var c = $(a);
    c.hasClass("emote") || c.hasClass("information") ? ui_appendItemSorted(c, b, !1) : (-1 != a.indexOf("mention") && c.find(".mention").click(function() {
        $("#x_edit").select().val($("#x_edit").val() + $(this).text() + " ")
    }),
    ui_appendItemSorted(c, b, !0),
    c.find("img").on("load", function() {
        if (!$(this).hasClass("thumbnailNeeded")) {
            var a = ui_messageScrolledToBottom();
            $(this).removeClass("loading");
            $(this).parent().parent().addClass("image");
            $(this).parent().parent().parent().siblings(".arrow").addClass("image");
            a && setTimeout(ui_messageScroll, 1)
        }
    }).each(function() {
        $(this).hasClass("thumbnailNeeded") || (this.complete ? $(this).removeClass("loading") : $(this).load())
    }));
    -1 != a.indexOf("thumbnailNeeded") && $("#messages .thumbnailNeeded").each(function() {
        g_controller.mediaThumbnailRequest($(this).attr("original"), $(this))
    });
    return c
}
function ui_attachLightboxToImages(a) {
    a.click(function() {
        $("#adminTextShowModal .header").html("<h4>Image Preview</h4>");
        $(this).hasClass("base64_image") ? $("#adminTextShowModal .body").html("<img class='image_constrained' src='" + $(this).find("img").attr("src") + "'>") : $("#adminTextShowModal .body").html("<img class='image_constrained' src='" + $(this).attr("href") + "'>");
        $("#adminTextShowModal .body").addClass("modalFullImage");
        $("#adminTextShowModal .body").removeClass("modalFullHeight");
        resize();
        $("#adminTextShowModal .body").find("img").on("load", function() {
            $(this);
            $(this).show();
            setTimeout(function() {
                resize()
            }, 1)
        }).each(function() {
            this.complete ? $(this).show() : ($(this).hide(),
            $(this).load())
        });
        showModal("#adminTextShowModal");
        return !1
    })
}
function ui_appendBuzz(a, b) {
    ui_appendItemSorted(a, b, !1)
}
function ui_noChats() {
    g_nochats = !0;
    $("#x_noChats").show();
    $(".contact_info").hide();
    $(".contact_history").hide();
    $(".contact_add").hide();
    $(".contact_block").hide();
    $(".contact_save").hide();
    $("#x_chatStatus").hide();
    $("#x_contactSettings").hide();
    $("#x_membersButton").hide();
    $("#x_chatName").text("");
    $("#x_bannerName").text("");
    $(".right .edit").hide();
    $("#trillian .right .toolbar").hide();
    $(".right .messages").hide()
}
function ui_messageScroll() {
    g_messages_cached_element[0].scrollTop = g_messages_cached_element[0].scrollHeight;
    g_oldScrollLocation = g_messages_cached_element.scrollTop()
}
function ui_messageScrolledToBottom() {
    return 10 > Math.abs(g_messages_cached_element[0].scrollHeight - g_messages_cached_element[0].clientHeight - g_messages_cached_element[0].scrollTop) ? !0 : !1
}
function ui_messageClose(a) {
    $("#chats div[window=" + a + "]").remove();
    ui_updateWindowList()
}
function ui_showWelcomeMessageModal(a) {
    ui_messageUpdateBanner(a);
    try {
        if (a.group) {
            if (void 0 != $.cookie("settings_message_wizard_groupchat_shown")) {
                var b = "false" == $.cookie("settings_message_wizard_groupchat_shown") ? !1 : !0;
                if (b)
                    return
            }
            showModal("#x_welcomeGroupChatModal")
        } else {
            if (void 0 != $.cookie("settings_message_wizard_privatechat_shown") && (b = "false" == $.cookie("settings_message_wizard_privatechat_shown") ? !1 : !0))
                return;
            showModal("#x_welcomePrivateChatModal")
        }
    } catch (c) {}
}
function ui_addChat(a, b, c, d, e, f) {
    var g = $(document.createElement("div"));
    g.attr("window", a);
    g.attr("time", "0");
    g.addClass("click");
    g.addClass("contact");
    d && g.addClass("active");
    f && g.attr("groupchat", "1");
    g.attr("status", getStatusSimplified(c));
    g.mousedown(function(a) {
        2 == a.which ? (addStatisticEvent("chatlist_middle_close"),
        a = $(this).closest("div").attr("window"),
        g_controller.messageFocus(a, !0),
        g_controller.messageClose(a, !0)) : (addStatisticEvent("chatlist_click"),
        "General" == b && addStatisticEvent("chatlist_general_click"),
        a = $(this).closest("div").attr("window"),
        g_controller.messageFocus(a, !0));
        return !1
    });
    a = $(document.createElement("div"));
    a.addClass("bottom");
    c = $(document.createElement("span"));
    c.addClass("avatar");
    c.addClass("avatar30");
    e ? (d = $(document.createElement("img")),
    d.attr("iconhash", e),
    d.attr("src", "img/blank.gif"),
    d.appendTo(c)) : (e = b.substr(0, 1).toUpperCase(),
    d = b.indexOf(" "),
    -1 != d && (e += b.substr(d + 1, 1).toUpperCase()),
    f && (e = "#"),
    c.addClass("empty"),
    c.text(e));
    e = $(document.createElement("span"));
    e.addClass("name");
    e.addClass("solo");
    e.addClass("notime");
    e.attr("title", b);
    e.text(b);
    d = $(document.createElement("span"));
    d.text("");
    d.addClass("count");
    var h = $(document.createElement("span"));
    h.addClass("status");
    var k = $(document.createElement("span"));
    k.addClass("mute");
    var l = $(document.createElement("span"));
    l.html(g_closeSVG);
    l.addClass("close");
    l.click(function() {
        var a = $(this).parent().attr("window");
        g_controller.messageClose(a, !0);
        return !1
    });
    var m = $(document.createElement("span"));
    m.addClass("time");
    m.text("");
    g.append(a).append(c).append(e).append(m).append(d).append(k).append(h).append(l);
    ui_addWindowToList(g, f, !0, !0)
}
function ui_addWindowToList(a, b, c, d) {
    var e = null;
    domainUser() && octopusProtocol2() ? 0 == g_policy["trillian.groupchat.join.impp"] && (c = !1) : c = !1;
    var e = b ? c ? "x_chatsPublicGroup" : "x_chatsPrivateGroup" : "x_chatsPrivate"
      , f = $("#" + e)
      , g = a.attr("window")
      , h = a.find(".name").text().toLowerCase()
      , k = !1;
    $("#chats div").each(function() {
        if ($(this).attr("id") == e)
            return k = !0;
        if ($(this).attr("window") == g)
            return !0;
        if (!$(this).attr("window"))
            return $(this).hasClass("click") && k ? (f.after(a),
            !1) : !0;
        if (k) {
            if (0 < $(this).find(".name").text().toLowerCase().localeCompare(h))
                return f.after(a),
                !1;
            f = $(this)
        }
    });
    d && ui_updateWindowList()
}
function ui_updateWindowList() {
    var a = 0
      , b = 0
      , c = 0
      , d = domainUser() && octopusProtocol2();
    0 == g_policy["trillian.groupchat.join.impp"] && (d = !1);
    for (var e = 0; e < g_messageWindows.length; e++) {
        var f = g_messageWindows[e];
        f.group ? f.flag_disable_list || !d ? b++ : a++ : c++
    }
    0 < a ? ($("#x_chatsPublicGroup").addClass("haschildren"),
    $("#x_chatsPublicGroupAdd").hide(),
    $("#x_chatsPublicGroup").show()) : ($("#x_chatsPublicGroup").removeClass("haschildren"),
    d ? ($("#x_chatsPublicGroup").show(),
    $("#x_chatsPublicGroupAdd").show()) : ($("#x_chatsPublicGroup").hide(),
    $("#x_chatsPublicGroupAdd").hide()));
    0 < b ? ($("#x_chatsPrivateGroup").addClass("haschildren"),
    $("#x_chatsPrivateGroupAdd").hide()) : ($("#x_chatsPrivateGroup").removeClass("haschildren"),
    $("#x_chatsPrivateGroupAdd").show());
    0 < c ? ($("#x_chatsPrivate").addClass("haschildren"),
    $("#x_chatsPrivateAdd").hide()) : ($("#x_chatsPrivate").removeClass("haschildren"),
    $("#x_chatsPrivateAdd").show());
    updateNewsFeed()
}
function ui_chatGroupPublicUpdate(a) {
    var b = $("#chats div[window=" + a.id + "]");
    ui_addWindowToList(b, !0, !a.flag_disable_list, !0);
    ui_messageUpdateBanner(a)
}
function ui_chatLatestMessageUpdate(a, b) {
    var c = $("#chats div[window=" + a.id + "]")
      , d = a.firstUnreadMessage;
    d || (d = b);
    d ? (c.attr("time", d.time.getTime()),
    c.find(".name").removeClass("notime"),
    d.incoming ? c.find(".time").text(d.time.getShortTime()) : c.find(".time").html("&#8617; " + d.time.getShortTime())) : (c.find(".name").addClass("solo"),
    c.removeAttr("time"),
    c.find(".time").text(""),
    c.find(".message").text(""))
}
function ui_chatUpdate(a) {
    var b = $("#chats div[window=" + a.id + "]")
      , c = b.find(".name");
    c.attr("title", a.displayname);
    c.text(a.displayname);
    ui_addWindowToList(b, a.group, !a.flag_disable_list, !0);
    g_messageIdFocus == a.id && (a.group && a.topic && 0 < a.topic.length ? $("#x_chatName").text(a.displayname + " - " + a.topic) : $("#x_chatName").text(a.displayname),
    $("#x_bannerName").text(a.displayname),
    ui_messageUpdateBanner(a))
}
function ui_chatBadge(a, b) {
    var c = $("#chats div[window=" + a + "]");
    "" == b ? c.removeClass("unread") : c.addClass("unread");
    c = c.find(".count");
    100 < b ? c.addClass("large").text("99+") : c.removeClass("large").text(b)
}
function ui_chatMute(a) {
    var b = g_controller.messageWindow(a);
    if (b) {
        var c = $("#chats div[window=" + a + "]")
          , d = c.find(".mute")
          , c = c.find(".time")
          , b = isMuted(b.muted_indicator);
        0 < b ? (c.hide(),
        d.html(g_muteSVG),
        setTimeout(function() {
            ui_chatMute(a)
        }, b + 1E3)) : (c.show(),
        d.html(""));
        g_messageIdFocus == a && (0 < b ? ($("#x_unmute").show(),
        $("#x_muteOneHour").hide(),
        $("#x_muteUntil8").hide(),
        $("#x_muteForever").hide()) : ($("#x_unmute").hide(),
        $("#x_muteOneHour").show(),
        $("#x_muteUntil8").show(),
        $("#x_muteForever").show()))
    }
}
function ui_messageTyping(a, b, c, d, e, f, g, h) {
    a ? (a = ui_formatMessage(b, c, "...", "typing", d, e, f, g, 0, !1, h),
    ui_appendMessage(a, e)) : ($(".message.typing").remove(),
    $(".message .text.typing").remove(),
    ui_messagesTimestampUpdate())
}
function ui_parseMessage(a, b) {
    return b ? a.Delinkify().BRify().spaceify().URLify().linkify().imgify() : a.Delinkify().BRify().spaceify().stripHtml().URLify().linkify().imgify().emotify().colorify()
}
function ui_formatTimestamp(a, b, c) {
    return c ? '<div class="item daily_timestamp" time="' + a + '">' + b + "</div>" : '<div class="item timestamp" time="' + a + '">' + b + "</div>"
}
function ui_resetVariables() {
    g_nicklistDirty = !1;
    g_idleMovementTime = g_idle = 0
}
function ui_sessionLogin(a) {
    g_controller.notificationsReady();
    ui_resetVariables();
    ui_noChats();
    $("#x_loginError").hide();
    $("#session_id").text(a);
    $("#x_loginUsername").prop("disabled", !0);
    $("#x_loginPassword").prop("disabled", !0);
    $("#login .button").addClass("disabled");
    $("#div_signup").find("input").val("");
    window.olark && olark("api.chat.updateVisitorStatus", {
        snippet: "Username: " + g_username
    });
    try {
        void 0 != $.cookie("settings_contacts_offline") ? g_controller.g_showOfflineContacts = "false" == $.cookie("settings_contacts_offline") ? !1 : !0 : domainUser() ? g_controller.g_showOfflineContacts = !0 : g_controller.g_showOfflineContacts = !1,
        updateOfflineContactsSetting(),
        g_controller.g_settingsEmoji = "false" == $.cookie("settings_emoji") ? !1 : !0,
        updateEmojiSetting(),
        g_controller.g_settingsSounds = "false" == $.cookie("settings_sounds") ? !1 : !0,
        updateSoundSetting()
    } catch (b) {}
    setTimeout(loadScripts, 1E4)
}
function ui_sessionReady() {
    addEvent("chat", "session_ready");
    $("#x_loginPassword").val("");
    updateNewsFeed();
    "none" != $("#login").css("display") && ($("#trillian").show(),
    $(".ready").show(),
    $("#login").hide());
    octopusProtocol2() ? $("#x_menuDND").show() : $("#x_menuDND").hide();
    octopusProtocol4() ? $("#x_settingsAutoHistoryDiv").show() : $("#x_settingsAutoHistoryDiv").hide();
    domainUser() && octopusProtocol2() ? ($("#x_chatsPrivateGroupText").text("PRIVATE GROUP CHATS"),
    $("#x_chatsPrivateGroupAdd").text("Start a private group chat ...")) : ($("#x_chatsPrivateGroupText").text("GROUP CHATS"),
    $("#x_chatsPrivateGroupAdd").text("Start a group chat ..."),
    $("#x_chatsPublicGroup").hide(),
    $("#x_chatsPublicGroupAdd").hide());
    domainUser() ? ($(".domain_available").show(),
    $(".nondomain_available").hide(),
    g_inhouseServer ? ($(".inhouse_available").show(),
    $(".cloud_available").hide()) : ($(".inhouse_available").hide(),
    $(".cloud_available").show())) : ($(".domain_available").hide(),
    $(".nondomain_available").show(),
    $(".inhouse_available").hide(),
    $(".cloud_available").hide());
    audioAvailable() ? $(".audio_button").show() : $(".audio_button").hide();
    "1" == g_setting["contactlist.visible"] && updateContactlist(!0);
    settingsGet("contactlist.groupby", "service", function() {
        contactlistGroupByChange()
    });
    resize();
    domainUser() && g_displayname == g_username && g_membershipFirstName && g_membershipLastName && g_controller.membershipDisplayNameUpdate(g_membershipFirstName + " " + g_membershipLastName, "default");
    try {
        if (domainUser() && ($.cookie("settings_wizard_domain_show") || g_user && g_user.suspended || showModal("#x_welcomeModal"),
        !$.cookie("settings_wizard_groupchat_bind") && ($.cookie("settings_wizard_groupchat_bind", !0, {
            expires: 3650
        }),
        g_policy["trillian.groupchat.bind.impp"])))
            for (var a = g_policy["trillian.groupchat.bind.impp"].split(","), b = 0; b < a.length; b++) {
                var c = a[b].trim();
                if (0 < c.length) {
                    g_controller.messageWindowFromName("ASTRA", c) ? 0 == l_window.unreadMessages && (l_window.unreadMessages = 1,
                    g_view.ui_chatBadge(l_window.id, l_window.unreadMessages)) : (g_pendingGroupChatBadge = c,
                    groupchatSelect("ASTRA", c, g_username));
                    break
                }
            }
    } catch (d) {}
    window.location && "delete" == window.location.hash.substring(1) && ($("#x_menuPersonal").click(),
    $("#x_deleteUsername").click());
    g_domain && ui_domainAdminHash()
}
function ui_sessionLoggedout() {
    domainReset();
    $(".limitable").removeClass("limited");
    $(".ready").hide();
    $("#login").show();
    $("#trillian").hide();
    $("#settings").hide();
    $("#x_modeChat").addClass("active").siblings().removeClass("active");
    $("#x_filterChats").click();
    $(".admin_available").hide();
    $(".admin_notavailable").show();
    ui_errorStateClear();
    ui_messageNicklistClear();
    g_controller.focused(!0);
    $("#x_contacts").children().remove();
    $("#div_accounts").children().remove();
    $("#messages").children().remove();
    $("#chats div[window]").remove();
    $("#x_alertCount").text("").hide();
    $("#x_loginPassword").val("");
    $("#x_loginUsername").prop("disabled", !1);
    $("#x_loginPassword").prop("disabled", !1);
    $("#login .button").removeClass("disabled");
    $("#x_ad").hide().text("");
    $("#x_ad").removeClass("expired");
    g_adVisible = !1;
    $("#x_adminGroupChatMemberModalMember").text("");
    $("#add_account_medium").children("option").show().removeAttr("disabled");
    $("#add_account_medium").val($("#add_account_medium option:first").val());
    g_avatars = [];
    g_avatarsRequested = [];
    g_controller.windowTitleUpdate();
    resize()
}
function ui_sessionError(a) {
    addEvent("chat", "session_error", a);
    ui_sessionLoggedout();
    hideModal(g_currentModal);
    "suspended" == a ? (addEvent("chat", "domain_suspendedUser", g_username),
    $("#x_loginPassword").focus(),
    setAlert("<strong>Account suspended!</strong> Please contact your company to update your billing information."),
    $("#x_forgotUsernameError").click(function() {
        $("#x_forgotUsernameButton").click()
    }),
    $("#x_forgotPasswordError").click(function() {
        $("#x_forgotPasswordButton").click()
    })) : "password_invalid" == a ? ($("#x_loginPassword").focus(),
    setAlert("<strong>Invalid username or password!</strong> Please check your <span class='click' id='x_forgotUsernameError'>username</span> and <span class='click' id='x_forgotPasswordError'>password</span> and try again."),
    $("#x_forgotUsernameError").click(function() {
        $("#x_forgotUsernameButton").click()
    }),
    $("#x_forgotPasswordError").click(function() {
        $("#x_forgotPasswordButton").click()
    })) : "username_invalid" == a ? (setAlert("<strong>Invalid Trillian username.</strong> Please check your <span class='click' id='x_forgotUsernameError'>username</span> and try again."),
    $("#x_forgotUsernameError").click(function() {
        $("#x_forgotUsernameButton").click()
    })) : "maintenance" == a ? setAlert("Trillian is temporarily offline for maintenance.  Please try again in a little while.") : "sequence_out_of_range" == a || "sequence_stale" == a ? 0 < g_sessionLog.length ? (setAlert("You have signed in to Trillian for Web from another location or an error occurred.  If this continues to happen, please click here to <span class='click' id='x_sendDiagnosticLog'>send us your diagnostic log.</a>"),
    $("#x_sendDiagnosticLog").click(function() {
        sendDiagnosticLog();
        setAlert("Diagnostic log has been sent.  Thank you.")
    })) : setAlert("We are sorry, an error occurred. Please try signing in again.") : 0 < g_sessionLog.length ? (setAlert("We are sorry, an error occurred. Please try signing in again. To help us improve Trillian, please <span class='click' id='x_sendDiagnosticLog'>send us your diagnostic log.</a>"),
    $("#x_sendDiagnosticLog").click(function() {
        sendDiagnosticLog();
        setAlert("Diagnostic log has been sent.  Thank you.")
    })) : setAlert("We are sorry, an error occurred. Please try signing in again.");
    window.olark && -1 != g_username.indexOf("@") && olark("api.chat.updateVisitorStatus", {
        snippet: ["Username: " + g_username, "Error: " + a]
    })
}
$(".olark_button").click(function() {
    window.olark && (g_olarkHidden ? (g_olarkHidden = !1,
    olark("api.box.expand")) : (g_olarkHidden = !0,
    olark("api.box.hide")))
});
function ui_contactlistError(a, b, c, d, e) {
    if ("ambiguous" == b)
        for ($("#div_connectionChooser").children().remove(),
        hideModal("#contactSettingsModal"),
        showModal("#connectionChooserModal"),
        b = c.split(","),
        c = 0; c < b.length; c++)
            if (void 0 != b[c] && 0 != b[c].length)
                for (var f = 0; f < g_controller.g_accounts.length; f++) {
                    var g = g_controller.g_accounts[f].medium
                      , h = g_controller.g_accounts[f].name
                      , k = g_controller.g_accounts[f].medium + g_controller.g_accounts[f].name.replace(/[^A-Za-z0-9]/g, "_")
                      , l = g_controller.g_accounts[f].connection;
                    l == b[c] && (k = "connectionChooser" + k,
                    $("#div_connectionChooser").append("<div class='choice' id='" + k + "'>" + h + " (" + mediumDisplay(g) + ")</div>"),
                    $("#" + k).data("type", a),
                    $("#" + k).data("medium", d),
                    $("#" + k).data("username", e),
                    $("#" + k).data("connectionID", l),
                    $("#" + k).click(function() {
                        hideModal("#connectionChooserModal");
                        "contactlistSelect" == $(this).data("type") ? g_controller.messageCreateWithID($(this).data("medium"), $(this).data("username"), $(this).data("connectionID")) : contactEditWithID($(this).data("medium"), $(this).data("username"), "default", $(this).data("connectionID"), $(this).data("account"))
                    }))
                }
}
$("#x_modeChat").click(function() {
    $(this).hasClass("active") || ($("#trillian").show(),
    $("#settings").hide(),
    $("#x_modeChat").addClass("active").siblings().removeClass("active"),
    $("#x_filterChats").click(),
    addStatisticEvent("chat"),
    g_controller.focused(!0),
    g_controller.windowTitleUpdate())
});
$(".trillian_button").click(function() {
    messageFocusNothing();
    $("#x_modeChat").click()
});
$("#x_version2").click(function() {
    addEvent("chat", "version_flash");
    setTimeout(function() {
        document.location = "https://www.trillian.im/web/2.0/"
    }, 100)
});
$("#x_version3").click(function() {
    addEvent("chat", "version_3");
    setTimeout(function() {
        document.location = "https://www.trillian.im/web/3.0/"
    }, 100)
});
$("#x_oldVersions").click(function() {
    $("#x_oldVersionList").toggle()
});
function ui_domainAdmin() {
    domainReset();
    g_domain = new Domain;
    g_domain.request(function() {
        if (g_domain.error)
            return domainReset(),
            !1;
        g_user.keepAlive();
        domainUpdate();
        $(".admin_available").show();
        $(".admin_notavailable").hide();
        g_user.suspended && g_domain.trial ? (addEvent("chat", "domain_suspendedAdmin", g_username),
        $("#x_domainBillingCancel").hide(),
        domainSelectBilling("trial", null, 0, 0, null, 0, "year"),
        $("#x_domainBillingHelp").show(),
        $("#x_domainBillingErrorMessage").text("Enter your billing information to continue using Trillian for Business.").show()) : ui_domainAdminHash()
    });
    window.olark && olark("api.chat.updateVisitorStatus", {
        snippet: ["Username: " + g_username, "Location: Domain Management"]
    })
}
function ui_domainAdminHash() {
    if (g_domain && g_user && g_domain.loaded && g_sessionReady && !g_user.suspended && window.location) {
        var a = window.location.hash.substring(1);
        "billing" == a ? ($("#x_menuDomain").click(),
        $("div[tab=domain_billing]").click()) : "users" == a ? ($("#x_menuDomain").click(),
        $("div[tab=users]").click()) : "downloads" == a && ($("#x_menuDomain").click(),
        $("div[tab=downloads]").click())
    }
}
$("#connectionChooserClose").click(function() {
    hideModal("#connectionChooserModal")
});
$("#div_pro_button").click(function() {
    addEvent("chat", "pro_button");
    window.open("https://www.trillian.im/download/#pro", "_blank")
});
$("#x_ad").click(function() {
    g_domain || (addEvent("chat", "pro_ad"),
    window.open("https://www.trillian.im/download/#pro", "_blank"))
});
$("#proUpgradeLifetime").click(function() {
    addEvent("chat", "pro_popup_lifetime");
    window.open("https://www.trillian.im/download/#pro", "_blank");
    hideModal("#proModal")
});
$("#proUpgradePro").click(function() {
    addEvent("chat", "pro_popup_pro");
    window.open("https://www.trillian.im/download/#pro", "_blank");
    hideModal("#proModal")
});
$("#proClose").click(function() {
    hideModal("#proModal")
});
function ui_formatMessage(a, b, c, d, e, f, g, h, k, l, m) {
    if (void 0 != c) {
        a || (a = " ");
        g = htmlEncode(a.toUpperCase());
        a = htmlEncode(a);
        var p = "<span class='time'>" + f + "</span>";
        l && (p = "<span class='bot'>Bot</span>");
        l = b + " " + f;
        k = k && "0" != k ? " color" + k : "";
        h = " time='" + h + "'";
        var n = null;
        e ? e && g_controller.g_avatars[e] && "pending" != g_controller.g_avatars[e] ? n = "<div class='avatar'><img iconhash='" + e + "' src='" + g_controller.g_avatars[e] + "'></div>" : (n = "<div class='avatar'><img iconhash='" + e + "' src='img/blank.gif'></div>",
        g_controller.avatarRequest(e, m, b, "default")) : (e = a.substr(0, 1).toUpperCase(),
        m = a.indexOf(" "),
        -1 != m && (e += a.substr(m + 1, 1).toUpperCase()),
        n = "<div class='avatar empty'>" + e + "</div>");
        switch (d) {
        case "information_notice":
            return "<div class='item information'" + h + ">" + c + "</div>";
        case "typing":
            return '<div class="item message message_avatar incoming typing' + k + '" from="' + b + '"' + h + '><div class="name" title="' + l + '">' + a + p + "</div>" + n + '<div class="arrow"></div><div class="bubble"><div class="typing text">' + c + "</div></div></div>";
        case "outgoing_groupMessageOffline":
        case "outgoing_groupMessageHistory":
        case "outgoing_groupMessage":
        case "outgoing_privateMessageOffline":
        case "outgoing_privateMessageHistory":
        case "outgoing_privateMessage":
            return 0 === c.indexOf("/me ") ? "<div class='emote item'" + h + "><b>" + a + "</b> " + c.substr(4) + "</div>" : 0 === c.indexOf("/ME ") ? "<div class='emote item'" + h + "><b>" + g + "</b> " + c.substr(4) + "</div>" : '<div class="item message outgoing' + k + '" from="_outgoing_' + b + '"' + h + '><div class="name" title="' + l + '">' + p + '</div><div class="arrow"></div><div class="bubble" title="' + f + '"><div class="text">' + c + "</div></div></div>";
        default:
        case "incoming_privateMessageOffline":
        case "incoming_privateMessageHistory":
            return 0 === c.indexOf("/me ") ? "<div class='emote item" + h + "'><b>" + a + "</b> " + c.substr(4) + "</div>" : 0 === c.indexOf("/ME ") ? "<div class='emote item'" + h + "><b>" + g + "</b> " + c.substr(4) + "</div>" : '<div class="item message message_avatar incoming' + k + '" from="' + b + '"' + h + '><div class="name" title="' + l + '">' + a + p + "</div>" + n + '<div class="arrow"></div><div class="bubble" title="' + f + '"><div class="text">' + c + "</div></div></div>";
        case "incoming_groupMessageOffline":
        case "incoming_groupMessageHistory":
        case "incoming_groupMessage":
            return 0 === c.indexOf("/me ") ? "<div class='emote item'" + h + "><b>" + a + "</b> " + c.substr(4) + "</div>" : 0 === c.indexOf("/ME ") ? "<div class='emote item'" + h + "><b>" + g + "</b> " + c.substr(4) + "</div>" : '<div class="item message message_avatar incoming' + k + '" from="' + b + '"' + h + '><div class="name" title="' + l + '">' + a + p + "</div>" + n + '<div class="arrow"></div><div class="bubble" title="' + f + '"><div class="text">' + c + "</div></div></div>"
        }
    }
}
function ui_interfaceOpen(a, b, c) {
    var d = $(".modal:visible").find(".interfaceOpen");
    if (d) {
        d.empty();
        d.data("xml", a);
        d.data("id", b);
        d.data("newwindow", c);
        a = $(a);
        var e = a.find("account").attr("medium");
        a = processInterfaceXmlNode(a, function(a, b) {
            switch (a) {
            case "fixed":
                if (-1 != ["Permissions", "Advanced", "XMPP", "Privacy", "Astra"].indexOf(b) || "JABBER" == e && "Server" == b)
                    return !0;
                break;
            case "boolean":
                if (-1 != "prefsPrivacyMessageAccept prefsPrivacyAutoApprove prefsOSCARIgnoreSystem prefsAstraSSO prefsAstraWebStatus prefsXMPPLegacySSL prefsXMPPSSLv3 prefsXMPPPriority prefsICQAuthorizationIgnore prefsMSNPAuthorizationIgnore prefsYMSGAuthorizationIgnore prefsMiscOverrideDisplayName prefsAstraResource prefsXMPPResource prefsContactPrivacyBlock".split(" ").indexOf(b))
                    return !0;
                break;
            case "text-single":
                if (-1 != ["prefsAstraResourceName", "prefsXMPPResourceName", "prefsXMPPPriorityValue", "prefsMiscOverrideDisplayNameName"].indexOf(b) || "JABBER" == e && ("prefsConnectionSettingsServerHost" == b || "prefsConnectionSettingsServerPort" == b))
                    return !0;
                break;
            case "choice":
                if (-1 != ["prefsContactPrivacyDefault", "prefsContactPrivacyBlock", "prefsContactPrivacyAllow"].indexOf(b))
                    return !0
            }
            return !1
        });
        d.html(a);
        $(".interfaceLoading:visible").hide();
        d.show();
        resizeModal();
        return !0
    }
}
function ui_displayname(a) {
    g_displayname = a;
    ui_updateIdentityName();
    updateNewsFeed()
}
function ui_updateIdentityName() {
    var a = g_displayname;
    g_statusMessage && 0 < g_statusMessage.length && (a += " - " + g_statusMessage.stripHtml());
    $("#x_identityName").text(a);
    g_controller.g_avatars.me || ui_avatarUpdate()
}
function ui_avatarUpdate() {
    if (g_controller.g_avatars.me)
        $("#x_emptyAvatar").hide(),
        $("#x_identityAvatar").html("<img class='avatar avatar30' src='" + g_controller.g_avatars.me + "'>"),
        $("#x_identityAvatar").show();
    else {
        var a = g_displayname ? g_displayname : g_username
          , b = a.substr(0, 1).toUpperCase()
          , c = a.indexOf(" ");
        -1 != c && (b += a.substr(c + 1, 1).toUpperCase());
        $("#x_identityAvatar").html("<span class='avatar avatar30 empty'>" + b + "</span>");
        $("#x_identityAvatar").show();
        $("#x_emptyAvatar").show()
    }
}
function ui_avatarShow(a, b, c, d) {
    $('img[iconhash="' + c + '"]').attr("src", d)
}
function ui_setWindowTitle(a) {
    document.title = a
}
function ui_notificationsAvailable() {
    g_notificationsAvailable = !0
}
function ui_notificationsAllowed() {
    g_notificationsAllowed = !0
}
function ui_historySet(a, b) {
    $("#historyDate").datepicker("refresh");
    var c = g_controller.messageWindow(g_messageIdFocus);
    if (c) {
        var d = (c.medium + ":" + c.username).toLowerCase()
          , e = $("#historyDate").datepicker("getDate");
        historyShowDay(c, e, d)
    }
}
$("#x_loginUsername").keyup(function() {
    if (g_pendingSignout)
        return !0;
    try {
        var a = $(this).val()
          , b = $.cookie("trillian_username");
        b && 0 < b.length && a != b && (g_pendingSignout = !0,
        (new User).signout())
    } catch (c) {}
});
$(".login .button").click(function() {
    login();
    return !1
});
$("#status").submit(function() {
    g_controller.statusSet();
    return !1
});
$("#historyToday").click(function(a) {
    if (domainUser() && 0 != g_domainSelectedConversationID)
        $("#historyDate").datepicker("setDate", "today"),
        a = new Date,
        domainShowHistoryDay(g_domainSelectedConversationID, a),
        $("#historyToday").hide();
    else {
        var b = g_controller.messageWindow(g_messageIdFocus);
        if (b) {
            var c = (b.medium + ":" + b.username).toLowerCase();
            $("#historyDate").datepicker("setDate", "today");
            a = new Date;
            historyShowDay(b, a, c);
            $("#historyToday").hide()
        }
    }
});
$(".contact_save").click(function(a) {
    (a = g_controller.messageWindow(g_messageIdFocus)) && g_controller.groupchatAdd(a.id, a.displayname, a.connection)
});
$(".contact_add").click(function(a) {
    (a = g_controller.messageWindow(g_messageIdFocus)) && g_controller.contactAdd(a.medium, a.username, "default", a.connection)
});
$(".contact_block").click(function(a) {
    (a = g_controller.messageWindow(g_messageIdFocus)) && g_controller.contactBlock(a.medium, a.username, a.connection)
});
$(".contact_history").click(function(a) {
    $(".lightmenu").hide();
    $("#x_contactSettings").removeClass("active");
    $("#x_membersButton").removeClass("active");
    if (!g_membershipPro)
        return showModal("#proModal"),
        !1;
    if (!g_privacyCloudLogging)
        return $("#historyToday").hide(),
        $("#x_historyConversationList").parent().hide(),
        showModal("#historyModal"),
        $("#historyTimeline").children().remove(),
        $("#historyTimeline").append("<div class='warning'>Cloud logging is turned off in settings.</div>"),
        $("#historyTimeline .warning").show(),
        !1;
    $("#historyDate").datepicker({
        prevText: "&#9664;",
        nextText: "&#9654;",
        beforeShowDay: function(a) {
            var b = g_controller.messageWindow(g_messageIdFocus);
            if (b) {
                b = (b.medium + ":" + b.username).toLowerCase();
                a = new Date(a);
                var c = new Date(a.getFullYear(),a.getMonth(),a.getDate() + 1);
                a = a.getTime();
                var c = c.getTime()
                  , g = !1;
                if (g_historyMessages[b])
                    for (var h = 0; h < g_historyMessages[b].length; h++) {
                        var k = g_historyMessages[b][h];
                        if (k.timestamp >= a && k.timestamp <= c) {
                            g = !0;
                            break
                        }
                    }
                return g ? [!0, "conversations", ""] : [!0, "", ""]
            }
        },
        onSelect: function(a, b) {
            var c = g_controller.messageWindow(g_messageIdFocus);
            if (c) {
                var g = (c.medium + ":" + c.username).toLowerCase();
                historyShowDay(c, a, g);
                c = new Date;
                g = new Date(a);
                c.getFullYear() == g.getFullYear() && c.getMonth() == g.getMonth() && c.getDate() == g.getDate() ? $("#historyToday").hide() : $("#historyToday").show()
            }
        },
        onChangeMonthYear: function(a, b, c) {
            (c = g_controller.messageWindow(g_messageIdFocus)) && g_controller.historyRequest(c, b, a)
        }
    });
    if (a = g_controller.messageWindow(g_messageIdFocus)) {
        var b = (a.medium + ":" + a.username).toLowerCase();
        $("#historyDate").datepicker("setDate", "today");
        var c = new Date;
        g_controller.historyRequest(a, c.getMonth() + 1, c.getFullYear());
        historyShowDay(a, c, b);
        $("#historyToday").hide();
        $("#x_historyConversationList").parent().hide();
        showModal("#historyModal")
    }
});
function historyShowDay(a, b, c) {
    var d = new Date(b)
      , e = new Date(d.getFullYear(),d.getMonth(),d.getDate() + 1)
      , d = d.getTime()
      , e = e.getTime()
      , f = 0
      , g = ""
      , h = 0;
    $("#historyTimeline").children().remove();
    if (g_historyMessages[c])
        for (var k = 0; k < g_historyMessages[c].length; k++) {
            var l = g_historyMessages[c][k];
            if (l.timestamp >= d && l.timestamp <= e) {
                var m = l.remote
                  , p = "incoming";
                -1 != l.type.indexOf("outgoing") && (p = "outgoing",
                a.echoName && 0 < a.echoName.length && (m = a.echoName));
                if (!domainUser()) {
                    var n = m.indexOf("@trillian.im");
                    -1 != n && (m = m.substr(0, n))
                }
                var q = !1;
                if (g != l.remote + p || 3E5 < l.timestamp - h)
                    g = l.remote + p,
                    h = l.timestamp,
                    q = !0;
                var n = ui_parseMessage(l.text, !1)
                  , r = new Date;
                r.setTime(l.timestamp);
                l = r.toLocaleTimeString();
                q = q ? "" : " style='visibility:hidden;'";
                m = $("<div class='message " + p + "'><div class='time'" + q + ">" + l + "</div><div class='name'" + q + ">" + m + "</div><div class='text'>" + n + "</div></div>");
                $("#historyTimeline").append(m);
                f++;
                -1 != n.indexOf("thumbnailNeeded") && m.find(".thumbnailNeeded").each(function() {
                    g_controller.mediaThumbnailRequest($(this).attr("original"), $(this))
                })
            }
        }
    0 == f && (g_historyPending ? $("#historyTimeline").append("<span class='empty'>Loading messages for " + (new Date(b)).toLocaleDateString() + "...</span>") : $("#historyTimeline").append("<span class='empty'>No messages found on " + (new Date(b)).toLocaleDateString() + ".</span>"));
    $(".modal_right").scrollTop(0)
}
$("#historyClose").click(function(a) {
    hideModal("#historyModal")
});
$("#x_chatName").click(function() {
    $(".contact_info").click()
});
$(".contact_info").click(function() {
    $(".lightmenu").hide();
    $("#x_contactSettings").removeClass("active");
    $("#x_membersButton").removeClass("active");
    var a = g_controller.messageWindow(g_messageIdFocus);
    a && contactEdit(a.medium, a.username, "default", a.account)
});
$("#contacts").on("click", ".contact", function(a) {
    a = $(this);
    var b = a.attr("medium")
      , c = a.attr("username")
      , d = a.attr("account");
    "1" == a.attr("isGroup") ? groupchatSelect(b, c, d) : g_controller.messageCreate(b, c);
    $("#contacts").scrollTop(0)
});
$("#x_loginUsername").keypress(function(a) {
    $("#x_loginPassword").val("");
    return !0
});
$("#search_editbox").keydown(function(a) {
    if (a.ctrlKey && 85 == a.which || 27 == a.which)
        return cancelSearch(!0),
        !1
});
function activeSelectionMove(a, b) {
    var c = null
      , d = !1
      , e = !1
      , f = a.get();
    b && (f = f.reverse());
    $(f).each(function() {
        c || (c = $(this));
        if (d)
            return $(this).addClass("active"),
            d = !1,
            e = !0,
            $(this)[0].scrollIntoView(!1),
            !1;
        $(this).hasClass("active") && ($(this).removeClass("active"),
        d = !0)
    });
    !e && c && (c.addClass("active"),
    c[0].scrollIntoView(!1))
}
$("#search_editbox").keyup(function(a) {
    if (40 == a.which)
        return activeSelectionMove($("#x_contacts .contact"), !1),
        !1;
    if (38 == a.which)
        return activeSelectionMove($("#x_contacts .contact"), !0),
        !1;
    if (13 == a.which)
        return $("#x_contacts .contact.active").click(),
        !1;
    searchFilter($(this).val())
});
$("#trillian .search .close").click(function() {
    cancelSearch(!0)
});
function cancelSearch(a) {
    contactlistGroupByChange();
    $(".search .close").hide();
    $("#search_editbox").val("");
    $("#x_edit").focus();
    a && $("#x_filterChats").click()
}
function messageFocusNext() {
    var a = 0
      , b = !1;
    $("#chats div[window]").each(function() {
        var c = $(this).attr("window");
        if (!c)
            return !0;
        a || (a = c);
        if (b)
            return b = !1,
            messageFocus(c, !0),
            !1;
        c == g_messageIdFocus && (b = !0)
    });
    if (b && a)
        return messageFocus(a, !0),
        !1
}
function ui_editboxDisable() {
    $(".right .edit").hide();
    $("#x_edit").prop("disabled", !0)
}
function ui_editboxEnable() {
    $(".right .edit").show();
    $("#x_edit").prop("disabled", !1)
}
function ui_chatDisable(a, b) {
    a ? ($("#x_editDisabled").show(),
    $("#x_editDisabled").text(b),
    $("#x_edit").hide()) : ($("#x_editDisabled").hide(),
    $("#x_editDisabled").text(""),
    $("#x_edit").show())
}
$("#x_edit").keydown(function(a) {
    if (40 == a.which)
        return $("#x_mentionsAutocomplete").is(":visible") && (activeSelectionMove($("#x_mentionsAutocomplete .contact"), !1),
        mentionsSelectionChanged()),
        $("#x_emojiAutocomplete").is(":visible") && (activeSelectionMove($("#x_emojiAutocomplete .emoji"), !1),
        emojiSelectionChanged()),
        !1;
    if (38 == a.which)
        return $("#x_mentionsAutocomplete").is(":visible") && (activeSelectionMove($("#x_mentionsAutocomplete .contact"), !0),
        mentionsSelectionChanged()),
        $("#x_emojiAutocomplete").is(":visible") && (activeSelectionMove($("#x_emojiAutocomplete .emoji"), !0),
        emojiSelectionChanged()),
        !1;
    if (37 == a.which) {
        if ($("#x_emojiAutocomplete").is(":visible"))
            return activeSelectionMove($("#x_emojiAutocomplete .emoji"), !0),
            emojiSelectionChanged(),
            !1
    } else if (39 == a.which) {
        if ($("#x_emojiAutocomplete").is(":visible"))
            return activeSelectionMove($("#x_emojiAutocomplete .emoji"), !1),
            emojiSelectionChanged(),
            !1
    } else {
        if (71 == a.which && a.ctrlKey)
            return g_controller.messageSendBuzz(),
            messageCloseAutocomplete(),
            a.preventDefault(),
            !1;
        if (a.ctrlKey && 85 == a.which)
            return $("#x_edit").val(""),
            !1;
        if (33 == a.which)
            return $(".messages").scrollTop($(".messages").scrollTop() - $(".messages").height()),
            !1;
        if (34 == a.which)
            return $(".messages").scrollTop($(".messages").scrollTop() + $(".messages").height()),
            !1;
        if (13 == a.which) {
            if ($("#x_mentionsAutocomplete").is(":visible"))
                return a = $("#x_mentionsAutocomplete .contact.active"),
                editSetCurrentWord(a.attr("username"), !0, !0),
                $("#x_mentionsAutocomplete").hide(),
                !1;
            if ($("#x_emojiAutocomplete").is(":visible"))
                return a = $("#x_emojiAutocomplete .emoji.active"),
                editSetCurrentWord(a.attr("for"), !0, !0),
                $("#x_emojiAutocomplete").hide(),
                !1;
            if (a.ctrlKey)
                return $(this).val($(this).val() + "\n"),
                !1;
            a = $.trim($("#x_edit").val());
            if (g_settingsEmoji && a)
                for (var b in g_emojiTextReplacement)
                    a = a.replace(new RegExp(b,"g"), g_emojiTextReplacement[b]);
            a && g_controller.messageSend(a) && $("#x_edit").val("");
            messageCloseAutocomplete();
            return !1
        }
        if (9 == a.which) {
            if ($("#x_mentionsAutocomplete").is(":visible"))
                return activeSelectionMove($("#x_mentionsAutocomplete .contact"), a.shiftKey ? !0 : !1),
                mentionsSelectionChanged(),
                !1;
            b = editCurrentWord();
            if ($("#x_emojiAutocomplete").is(":visible"))
                return activeSelectionMove($("#x_emojiAutocomplete .emoji"), a.shiftKey ? !0 : !1),
                emojiSelectionChanged(),
                !1;
            if (0 == b.indexOf(":"))
                return emojiSearch(b, $("#x_emojiAutocomplete"), !0),
                activeSelectionMove($("#x_emojiAutocomplete .emoji"), !1),
                emojiSelectionChanged(),
                !1;
            a.shiftKey && messageFocusNext();
            return !1
        }
    }
});
function mentionsSelectionChanged() {
    var a = $("#x_mentionsAutocomplete .contact.active");
    editSetCurrentWord(a.attr("username"), !0, !1)
}
function emojiSelectionChanged() {
    var a = $("#x_emojiAutocomplete .emoji.active");
    editSetCurrentWord(a.attr("for"), !0, !1)
}
$("#x_edit").keyup(function(a) {
    var b = $("#x_edit").val();
    g_controller.messageTyping(b);
    if (16 == a.which)
        return !1;
    if ($("#x_mentionsAutocomplete").is(":visible") || $("#x_emojiAutocomplete").is(":visible"))
        if (40 == a.which || 38 == a.which)
            return !1;
    if ($("#x_emojiAutocomplete").is(":visible") && (37 == a.which || 39 == a.which) || 9 == a.which)
        return !1;
    if (27 == a.which)
        return messageCloseAutocomplete(),
        !1;
    $(".emojibrowser").hide();
    a = editCurrentWord();
    mentionSearch(a, $("#x_mentionsAutocomplete"));
    emojiSearch(a, $("#x_emojiAutocomplete"), !1);
    $("#x_mentionsAutocomplete .contact").click(function() {
        var a = $(this);
        editSetCurrentWord(a.attr("username"), !0, !0);
        $("#x_mentionsAutocomplete").hide()
    });
    $("#x_emojiAutocomplete .emoji").click(function() {
        var a = $(this);
        editSetCurrentWord(a.attr("for"), !0, !0);
        $("#x_emojiAutocomplete").hide()
    })
});
function messageCloseAutocomplete() {
    $("#x_mentionsAutocomplete").hide();
    $("#x_emojiAutocomplete").hide();
    $(".emojibrowser").hide()
}
function editCurrentWord() {
    var a = $("#x_edit").val().toLowerCase()
      , b = $("#x_edit").textrange("get").position
      , c = a.lastIndexOf(" ", b - 1);
    -1 == c ? c = 0 : c++;
    b = a.indexOf(" ", b);
    -1 == b && (b = a.length);
    return a.substr(c, b - c)
}
function editSetCurrentWord(a, b, c) {
    if (b) {
        b = $("#x_edit").val().toLowerCase();
        var d = $("#x_edit").textrange("get").position
          , e = b.lastIndexOf(" ", d - 1);
        -1 == e ? e = 0 : e++;
        d = b.indexOf(" ", d);
        -1 == d && (d = b.length);
        $("#x_edit").textrange("set", e, d);
        a = 0 == e && d == b.length && ":" != a[a.length - 1] ? a + ":" : a + "";
        c && (a += " ");
        $("#x_edit").textrange("replace", a);
        $("#x_edit").textrange("setcursor", e + a.length)
    } else
        d = $("#x_edit").textrange("get").position,
        c && (a += " "),
        $("#x_edit").textrange("replace", a),
        $("#x_edit").textrange("setcursor", d + a.length)
}
$("#x_edit").blur(function() {
    setTimeout(function() {
        $("#x_edit").is(":focus") || $("#x_emojiAutocomplete").is(":focus") || ($("#x_mentionsAutocomplete").hide(),
        $("#x_emojiAutocomplete").hide())
    }, 500)
});
function emojiSearch(a, b, c) {
    if (!g_settingsEmoji || !a || "" == a || ":" != a[0])
        b.hide();
    else if (!(3 > a.length) || b.is(":visible") || c) {
        b.children().remove();
        a = a.toLowerCase();
        c = [];
        var d = "<span class='emojis'>", e = g_emojiAutocomplete, f;
        for (f in e)
            -1 != f.toLowerCase().indexOf(a.substr(1)) && (":" == a.slice(-1) && 0 != f.toLowerCase().indexOf(a) || c.push(f));
        if (0 < c.length) {
            c.sort();
            for (a = 0; a < c.length; a++)
                d += "<span class='emoji' for=\"" + c[a] + "\"><span class='" + g_emojiAutocomplete[c[a]] + "'></span>" + c[a] + "</span>";
            b.append(d + "</span>");
            b.show()
        } else
            b.hide()
    }
}
function mentionSearch(a, b) {
    if (a && "" != a && "@" == a[0]) {
        b.children().remove();
        var c = messageWindow(g_messageIdFocus);
        if (c.nicks) {
            var d = c.nicks.slice(0)
              , e = [];
            d.sort(function(a, b) {
                return a.displayname.toLowerCase().localeCompare(b.displayname.toLowerCase())
            });
            d.unshift({
                name: "all",
                displayname: "Everyone in room"
            });
            for (var f = 0; f < d.length; f++)
                d[f].name.toLowerCase().startsWith(a.substring(1)) ? e.push(d[f]) : d[f].displayname.toLowerCase().startsWith(a.substring(1)) && e.push(d[f]);
            if (0 < e.length) {
                for (f = 0; f < Math.min(5, e.length); f++) {
                    var d = e[f].name
                      , g = e[f].name.indexOf("@");
                    -1 != g && (d = d.substring(0, g));
                    var d = "@" + d
                      , g = e[f].displayname
                      , h = e[f].status
                      , k = null
                      , l = getContact(c.medium, e[f].name);
                    l && (k = l.iconhash);
                    b.append(mentionHtml(d, g, h, k))
                }
                b.find(".contact").first().addClass("active");
                b.show()
            } else
                b.hide()
        } else
            b.hide()
    } else
        b.hide()
}
$("html").on("dragenter", function(a) {
    if (a.originalEvent.dataTransfer && a.originalEvent.dataTransfer.types && 0 < a.originalEvent.dataTransfer.types.length && (!a.originalEvent.dataTransfer.types.contains || a.originalEvent.dataTransfer.types.contains("Files")) && (a.originalEvent.dataTransfer.types.contains || "Files" == a.originalEvent.dataTransfer.types[0]))
        return g_dragHtml = !0,
        g_currentModal || -1 == g_messageIdFocus || $(".drop").show(),
        a.preventDefault(),
        !1
});
$("html").on("dragover", function(a) {
    g_dragHtml = !0;
    a.originalEvent.dataTransfer.dropEffect = "none";
    a.preventDefault();
    return !1
});
$("html").on("dragleave", function(a) {
    g_dragHtml = !1;
    setTimeout(function() {
        g_dragHtml || g_dragDropZone || $(".drop").hide()
    }, 100);
    return !1
});
$(".drop").on("dragenter", function(a) {
    g_dragDropZone = !0;
    a.preventDefault();
    return !1
});
$(".drop").on("dragover", function(a) {
    g_dragDropZone = !0;
    a.originalEvent.dataTransfer.dropEffect = g_currentModal ? "none" : "copy";
    a.preventDefault();
    return !1
});
$(".drop").on("dragleave", function(a) {
    g_dragDropZone = !1;
    a.preventDefault();
    return !1
});
$(".drop").on("drop", function(a) {
    $(".drop").hide();
    var b = g_controller.messageWindow(g_messageIdFocus);
    if (b)
        return a.preventDefault(),
        a.originalEvent.dataTransfer && a.originalEvent.dataTransfer.files && 0 < a.originalEvent.dataTransfer.files.length && attachFile(b, a.originalEvent.dataTransfer.files[0]),
        !1
});
function attachFile(a, b) {
    var c = !1;
    b.type ? "image/png" == b.type || "image/jpg" == b.type || "image/jpeg" == b.type || "image/gif" == b.type ? (addEvent("chat", "file_attach_type_image"),
    c = !0) : addEvent("chat", "file_attach_type_" + b.type) : addEvent("chat", "file_attach_type_unknown");
    if (domainUser()) {
        if (c && "server" != g_policy["trillian.media"])
            return addEvent("chat", "file_attach_domain_images_not_allowed"),
            $("#adminTextShowModal .header").html("<h4>Media Warning</h4>"),
            $("#adminTextShowModal .body").text("Images are not allowed to be uploaded from this device.  Contact your company to enable image transfers."),
            $("#adminTextShowModal .body").removeClass("modalFullHeight"),
            $("#adminTextShowModal .body").css("height", "auto"),
            showModal("#adminTextShowModal"),
            !1;
        if (!c && "server" != g_policy["trillian.filetransfer"])
            return addEvent("chat", "file_attach_domain_images_only"),
            $("#adminTextShowModal .header").html("<h4>Media Warning</h4>"),
            $("#adminTextShowModal .body").text("Only images are set up to be uploaded from this device.  Contact your company to enable other file types."),
            $("#adminTextShowModal .body").removeClass("modalFullHeight"),
            $("#adminTextShowModal .body").css("height", "auto"),
            showModal("#adminTextShowModal"),
            !1
    } else if (!c)
        return addEvent("chat", "file_attach_nondomain_images_only"),
        $("#adminTextShowModal .header").html("<h4>Media Warning</h4>"),
        $("#adminTextShowModal .body").html('Only images may be uploaded from this device.  <a href="/business/" target="_blank">Trillian for Business</a> offers more media upload options from Trillian for Web.'),
        $("#adminTextShowModal .body").removeClass("modalFullHeight"),
        $("#adminTextShowModal .body").css("height", "auto"),
        showModal("#adminTextShowModal"),
        !1;
    if (26214400 < b.size)
        return addEvent("chat", "file_attach_file_size"),
        $("#adminTextShowModal .header").html("<h4>Media Warning</h4>"),
        $("#adminTextShowModal .body").html("The maximum media file size is 25 MB."),
        $("#adminTextShowModal .body").removeClass("modalFullHeight"),
        $("#adminTextShowModal .body").css("height", "auto"),
        showModal("#adminTextShowModal"),
        !1;
    if (b.name)
        a.pendingImageName = b.name;
    else {
        var d = "";
        b.type ? "image/png" == b.type ? d = ".png" : "image/jpg" == b.type || "image/jpeg" == b.type ? d = ".jpg" : "image/gif" == b.type ? d = ".gif" : "audio/ogg" == b.type ? d = ".ogg" : "audio/wav" == b.type && (d = ".wav") : d = ".unknown";
        a.pendingImageName = "file[" + (new Date).getTime() + "]" + d
    }
    addEvent("chat", "file_attach_start");
    a.pendingImageType = b.type ? b.type : "application/octet-stream";
    $(".edit_attachment .attachment").contents().remove();
    var e = b.size + " bytes";
    1073741824 < b.size ? e = (b.size / 1073741824).toFixed(1) + " GB" : 1048576 < b.size ? e = (b.size / 1048576).toFixed(1) + " MB" : 1024 < b.size && (e = (b.size / 1024).toFixed(1) + " KB");
    if (c)
        d = new FileReader,
        d.onload = function(b) {
            var c = new Image;
            c.onload = function() {
                var b = document.createElement("canvas");
                if (b && b.getContext) {
                    b.width = 128;
                    b.height = 128;
                    var d = b.getContext("2d");
                    d && (d.fillStyle = "#FFFFFF",
                    d.fillRect(0, 0, 128, 128),
                    d.drawImage(c, 0, 0, 128, 128),
                    b = b.toDataURL("image/png"),
                    d = b.indexOf("base64,"),
                    -1 != d && (a.pendingImageThumbnail = b.substr(d + 7)))
                }
            }
            ;
            c.src = b.currentTarget.result;
            $(".edit_attachment .attachment").append(c);
            $(".edit_attachment .attachment").append(a.pendingImageName + " <span class='size'>(" + e + ")</span>");
            $(".edit_attachment").show();
            $(".editbox").hide();
            a.pendingImageMessage = "<a href='#' class='base64_image'><img class=\"image\" src=\"" + b.currentTarget.result + '"></a>'
        }
        ,
        d.readAsDataURL(b);
    else {
        var f = "img/files/file.png"
          , g = "pdf doc xls xlsx docx txt".split(" ")
          , d = a.pendingImageName.indexOf(".");
        -1 != d && (d = a.pendingImageName.substring(d + 1, a.pendingImageName.length),
        -1 != g.indexOf(d) && (f = "img/files/" + d + ".png"));
        c = new Image;
        c.onload = function() {
            var b = document.createElement("canvas");
            if (b && b.getContext) {
                b.width = 48;
                b.height = 48;
                var d = b.getContext("2d");
                d && (d.drawImage(c, 0, 0, 48, 48),
                b = b.toDataURL("image/png"),
                d = b.indexOf("base64,"),
                -1 != d && (a.pendingImageThumbnail = b.substr(d + 7)))
            }
        }
        ;
        c.src = f;
        $(".edit_attachment .attachment").append(c);
        $(".edit_attachment .attachment").append(a.pendingImageName + " <span class='size'>(" + e + ")</span>");
        $(".edit_attachment").show();
        $(".editbox").hide();
        a.pendingImageMessage = "<div class='thumbnail file'><img class='mediaThumbnail' src=\"" + f + "\"><div class='mediaName'>" + a.pendingImageName + "</div><div class='mediaSize'>" + e + "</div></div>"
    }
    d = new FileReader;
    d.onload = function(b) {
        var c = null
          , c = window.btoa ? window.btoa(b.currentTarget.result) : $.base64.encode(b.currentTarget.result);
        a.pendingImage = c
    }
    ;
    d.readAsBinaryString(b);
    return !0
}
$("#x_fileInput").on("change", function(a) {
    var b = g_controller.messageWindow(g_messageIdFocus);
    b && (attachFile(b, a.target.files[0]) || $(this).val(""))
});
$("#x_edit").on("paste", function(a) {
    var b = g_controller.messageWindow(g_messageIdFocus);
    if (b && a.originalEvent.clipboardData && a.originalEvent.clipboardData.items) {
        a = a.originalEvent.clipboardData;
        for (var c = 0; c < a.items.length; c++)
            if ("file" == a.items[c].kind)
                return attachFile(b, a.items[c].getAsFile()),
                !1
    }
});
$(".file_button").click(function() {
    $("#x_fileInput").click()
});
$(".edit_attachment .cancel").click(function(a) {
    $(".edit_attachment").hide();
    $(".edit_attachment .attachment").contents().remove();
    $(".editbox").show();
    if (a = g_controller.messageWindow(g_messageIdFocus))
        a.pendingImage = null,
        a.pendingImageMessage = null,
        a.pendingImageName = null,
        a.pendingImageType = null,
        a.pendingImageThumbnail = null
});
$(".edit_attachment .send").click(function(a) {
    $(".edit_attachment").hide();
    $(".edit_attachment .attachment").contents().remove();
    $(".editbox").show();
    (a = g_controller.messageWindow(g_messageIdFocus)) && g_controller.messageSendPendingImage(a)
});
$("#x_loginUsername, #x_loginPassword").on("keydown", function(a) {
    if (13 == a.which)
        return $("#login .button").addClass("active"),
        !0
});
$("#x_loginUsername, #x_loginPassword").on("keyup", function(a) {
    if (13 == a.which)
        return $("#login .button").removeClass("active"),
        login(),
        !1
});
function hideMenu() {
    $(".menu").hide();
    $(".showing").removeClass("showing")
}
$(".menu.blocker").click(function() {
    hideMenu();
    return !0
});
$(".identity_button").click(function() {
    $(".identity.menu").is(":visible") ? ($(".menu.blocker, .identity.menu").hide(),
    $(this).removeClass("showing")) : ($(".menu.blocker, .identity.menu").show(),
    $(this).addClass("showing"));
    return !1
});
$("#x_downloadModalClose").click(function() {
    hideModal("#x_downloadModal")
});
$(window).blur(function(a) {
    g_controller.browserFocused && g_controller.browserFocused(!1);
    hideMenu()
});
$(window).focus(function(a) {
    g_controller.browserFocused && g_controller.browserFocused(!0)
});
$("html").click(function(a) {
    hideMenu();
    return !0
});
$("#x_welcomeModalClose").click(function() {
    domainUser() && g_domain && 1 == g_domain.users.length ? domainUserInvite(!0) : hideModal("#x_welcomeModal");
    try {
        $.cookie("settings_wizard_domain_show", !0, {
            expires: 3650
        })
    } catch (a) {}
});
$("#x_welcomePrivateChatModalClose").click(function() {
    hideModal("#x_welcomePrivateChatModal");
    try {
        $.cookie("settings_message_wizard_privatechat_shown", !0, {
            expires: 3650
        })
    } catch (a) {}
});
$("#x_welcomeGroupChatModalClose").click(function() {
    hideModal("#x_welcomeGroupChatModal");
    try {
        $.cookie("settings_message_wizard_groupchat_shown", !0, {
            expires: 3650
        })
    } catch (a) {}
});
$("#x_chatsPublicGroup, #x_chatsPublicGroupAdd").click(function() {
    addStatisticEvent("chatlist_public_add");
    if (domainUser() && octopusProtocol2()) {
        for (var a = -1, b = 0; b < g_accounts.length; b++)
            g_accounts[b] && void 0 != g_accounts[b].status && "offline" != g_accounts[b].status.toLowerCase() && "ASTRA" == g_accounts[b].medium && (a = g_accounts[b].connection);
        -1 != a && groupchatList(g_username, "ASTRA", a);
        $("#x_newChatGroupChatName").val("");
        $("#x_newGroupChatDisplayNameSet").attr("checked", "checked");
        $("#x_newGroupChatMemberAdd").removeAttr("checked");
        $("#x_newGroupChatMemberRemove").removeAttr("checked");
        $("#x_newGroupChatList").removeAttr("checked");
        $("#x_newGroupChatMessageSend").removeAttr("checked");
        $("#x_newGroupChatTopicSet").removeAttr("checked");
        0 == g_policy["trillian.groupchat.create.impp"] ? $("#x_newPublicGroupChatModalCreate").hide() : $("#x_newPublicGroupChatModalCreate").show();
        showModal("#x_newPublicGroupChatModal")
    }
});
$("#x_newPublicGroupChatModalClose").click(function() {
    hideModal("#x_newPublicGroupChatModal")
});
function ui_groupchatListResponse(a) {
    $("#x_groupchatList").children().remove();
    var b = [];
    a = $.parseXML(a);
    $(a).find("gc").each(function() {
        var a = {}
          , c = parseInt($(this).attr("f"));
        a.name = decodeURIComponent($(this).attr("n"));
        a.displayname = decodeURIComponent($(this).attr("d"));
        a.inviteonly = c & 2048 ? !0 : !1;
        a.topic = decodeURIComponent($(this).attr("t"));
        b.push(a)
    });
    var c = 0
      , d = a = "";
    if (0 < b.length) {
        b.sort(function(a, b) {
            return a.displayname.toLowerCase().localeCompare(b.displayname.toLowerCase())
        });
        for (var e = 0; e < b.length; e++) {
            var f = b[e]
              , g = htmlEncode("Display Name: " + f.displayname + "\nName: " + f.name + "\nTopic: " + f.topic + "\n");
            -1 != g_controller.getContactEnum("ASTRA", f.name) ? (c++,
            a += '<tr class="click groupchat_existing" title="' + g + '" name="' + htmlEncode(f.name) + '"><td>' + htmlEncode(f.displayname) + " <span class='topic'>" + htmlEncode(f.topic) + "</span></td></tr>") : f.inviteonly || (c++,
            d += '<tr class="click groupchat_join" title="' + g + '" name="' + htmlEncode(f.name) + '"><td>' + htmlEncode(f.displayname) + " <span class='topic'>" + htmlEncode(f.topic) + "</span></td></tr>")
        }
    }
    0 == c ? 0 != g_policy["trillian.groupchat.create.impp"] ? $("#x_newPublicGroupChatModalCreate").click() : $("#x_groupchatList").html("<span class='noresults'>No public group chats found.</span>") : (c = "",
    0 < d.length && (c += "<table><colgroup><col></colgroup><tr><th>GROUP CHATS YOU CAN JOIN</th></tr>" + d + "</table><br/>"),
    0 < a.length && (c += "<table><colgroup><col></colgroup><tr><th>GROUP CHATS YOU ALREADY BELONG TO</th></tr>" + a + "</table>"),
    $("#x_groupchatList").html(c),
    $("#x_groupchatList .groupchat_existing").click(function() {
        groupchatSelect("ASTRA", $(this).attr("name"), g_username);
        $("#x_newPublicGroupChatModalClose").click()
    }),
    $("#x_groupchatList .groupchat_join").click(function() {
        for (var a = -1, b = 0; b < g_accounts.length; b++)
            g_accounts[b] && void 0 != g_accounts[b].status && "offline" != g_accounts[b].status.toLowerCase() && "ASTRA" == g_accounts[b].medium && (a = g_accounts[b].connection);
        groupchatJoin("ASTRA", $(this).attr("name"), a);
        $("#x_newPublicGroupChatModalClose").click()
    }),
    resizeModal())
}
$("#x_newPublicGroupChatModalCreate").click(function() {
    replaceModal("#x_newPublicGroupChatModal", "#x_newPublicGroupChatCreateModal")
});
$("#x_newPublicGroupChatCreateModalCreate").click(function() {
    for (var a = -1, b = 0; b < g_accounts.length; b++)
        g_accounts[b] && void 0 != g_accounts[b].status && "offline" != g_accounts[b].status.toLowerCase() && "ASTRA" == g_accounts[b].medium && (a = g_accounts[b].connection);
    var b = $("#x_newChatGroupChatName").val()
      , c = 0;
    $("#x_newGroupChatDisplayNameSet").is(":checked") && (c |= GroupChatFlagDisableDisplayNameSet);
    $("#x_newGroupChatMemberAdd").is(":checked") && (c |= GroupChatFlagDisableMemberAdd);
    $("#x_newGroupChatMemberRemove").is(":checked") && (c |= GroupChatFlagDisableMemberRemove);
    $("#x_newGroupChatList").is(":checked") && (c |= GroupChatFlagDisableList);
    $("#x_newGroupChatMessageSend").is(":checked") && (c |= GroupChatFlagDisableMessageSend);
    $("#x_newGroupChatTopicSet").is(":checked") && (c |= GroupChatFlagDisableTopicSet);
    groupchatCreate("ASTRA", b, c, a);
    hideModal("#x_newPublicGroupChatCreateModal")
});
$("#x_newPublicGroupChatCreateModalCancel").click(function() {
    hideModal("#x_newPublicGroupChatCreateModal")
});
$("#x_newChatHelp").click(function() {
    var a = domainUser() && octopusProtocol2();
    0 == g_policy["trillian.groupchat.join.impp"] && (a = !1);
    var b = null
      , b = domainUser() ? a ? $("#x_newChatModal .helper.domain_public_groupchat_available") : $("#x_newChatModal .helper.domain_public_groupchat_notavailable") : $("#x_newChatModal .helper.nondomain_public_groupchat_notavailable");
    b.toggle();
    (a = b.is(":visible")) ? $(this).addClass("active") : $(this).removeClass("active");
    a = $("#x_newChatModal").width() + (a ? 430 : 0);
    a > $(window).width() && (a = $(window).width());
    $("#x_newChatModal").animate({
        "margin-left": a / 2 * -1
    })
});
$("#x_newPublicGroupChatHelp").click(function() {
    var a = domainUser() && octopusProtocol2();
    0 == g_policy["trillian.groupchat.join.impp"] && (a = !1);
    var b = null
      , b = domainUser() ? a ? $("#x_newPublicGroupChatModal .helper.domain_public_groupchat_available") : $("#x_newPublicGroupChatModal .helper.domain_public_groupchat_notavailable") : $("#x_newPublicGroupChatModal .helper.nondomain_public_groupchat_notavailable");
    b.toggle();
    (a = b.is(":visible")) ? $(this).addClass("active") : $(this).removeClass("active");
    a = $("#x_newPublicGroupChatModal").width() + (a ? 430 : 0);
    a > $(window).width() && (a = $(window).width());
    $("#x_newPublicGroupChatModal").animate({
        "margin-left": a / 2 * -1
    })
});
$("#x_newPublicGroupChatCreateHelp").click(function() {
    addStatisticEvent("groupchat_new_public_help");
    showModalHelper("#x_newPublicGroupChatCreateModal", "#x_newPublicGroupChatCreateHelp")
});
$("#x_contactSettingsGroupChatHelp").click(function() {
    addStatisticEvent("groupchat_contact_settings_help");
    showModalHelper("#contactSettingsModal", "#x_contactSettingsGroupChatHelp")
});
$("#x_contactAddHelp").click(function() {
    addStatisticEvent("contact_add_help");
    showModalHelper("#x_contactAddModal", "#x_contactAddHelp")
});
function tokenSearchForConnection(a, b, c, d, e) {
    var f = $("#x_newChatList")
      , g = [];
    c.each(function() {
        g[$(this).attr("username")] = !0
    });
    var h = null;
    if (d)
        for (var h = [], k = 0; k < d.length; k++)
            h[d[k].name.toLowerCase()] = !0;
    f.children().remove();
    for (var l = 0 == g_policy["trillian.groupchat.create.impp"] ? !1 : !0, m = g_controller.g_contacts, p = [], n = [], k = 0; k < m.length; k++) {
        var q = m[k];
        if (1 != n[q.medium + ":" + q.realname] && (n[q.medium + ":" + q.realname] = !0,
        !(q.isGroup && !e || !l && e && !q.isGroup || h && 1 == h[q.realname] || a && 0 < a.length && 1 == g[q.realname] || b && b.medium != q.medium))) {
            var r = 0;
            if (a && 0 < a.length) {
                if (r = g_controller.contactMatchScore(q, a),
                0 == r)
                    continue
            } else
                r = contactStatusScore(q),
                q.isGroup && (r = 100);
            var t = {};
            t.search_score = r;
            t.contact = q;
            t.displayname = q.displayname;
            t.selected = 1 == g[q.realname] ? !0 : !1;
            p.push(t)
        }
    }
    p.sort(g_controller.contactSearchSort);
    for (k = 0; k < p.length; k++)
        b = contactHtml(p[k].contact),
        p[k].selected && b.addClass("selected"),
        f.append(b),
        requestAvatarWhenAppears(p[k].contact, "#x_newChatList");
    a && 0 < a.length && f.find(".contact").first().addClass("active");
    $("#x_newChatList .contact").click(function() {
        var a = $(this);
        $("#x_newChatTo").val("");
        if (1 == g[a.attr("username")])
            c.each(function() {
                if ($(this).attr("username") == a.attr("username"))
                    return $(this).remove(),
                    !1
            });
        else {
            "1" != a.attr("isGroup") && "ASTRA" == a.attr("medium") && l ? $("#x_newChatTokens .token[isGroup=1]").remove() : $("#x_newChatTokens .token").remove();
            var b = $("<span class='token' title='" + a.attr("username") + "' medium='" + a.attr("medium") + "' username='" + a.attr("username") + "' isGroup='" + a.attr("isGroup") + "' account='" + a.attr("account") + "'><span class='text'>" + a.find(".name").text() + "</span></span>");
            b.click(function() {
                $(this).remove();
                $("#x_newChatTo").focus()
            });
            $("#x_newChatTo").before(b)
        }
        tokenSearchForConnection($("#x_newChatTo").val(), getAccountByConnection($("#x_newChatFrom").val()), $("#x_newChatTokens .token"), d, e);
        $("#x_newChatTo").focus()
    })
}
$("#x_chatsPrivateAdd, #x_chatsPrivate, #x_chatsPrivateGroup, #x_chatsPrivateGroupAdd").click(function() {
    $("#x_newChatFrom").children().remove();
    var a = "x_chatsPrivateGroupAdd" == $(this).attr("id") || "x_chatsPrivateGroup" == $(this).attr("id") ? !0 : !1;
    a ? addStatisticEvent("chatlist_private_group_add") : addStatisticEvent("chatlist_private_add");
    for (var b = 0, c = -1, d = 0; d < g_accounts.length; d++)
        if (g_accounts[d] && void 0 != g_accounts[d].status && "offline" != g_accounts[d].status.toLowerCase()) {
            if ("ASTRA" == g_accounts[d].medium)
                c = g_accounts[d].connection;
            else if (a)
                continue;
            $("#x_newChatFrom").append('<option value="' + g_accounts[d].connection + '">' + g_accounts[d].name + " (" + mediumDisplay(g_accounts[d].medium) + ")</option>");
            b++
        }
    1 < b || -1 == c ? $("#x_newChatFromDiv").show() : $("#x_newChatFromDiv").hide();
    $("#x_newChatFrom").val(c);
    $("#x_newChatTo").val("");
    tokenSearchForConnection($("#x_newChatTo").val(), getAccountByConnection($("#x_newChatFrom").val()), $("#x_newChatTokens .token"), null, a);
    a ? $("#x_newChatModal .header h4").text("New Group Chat") : $("#x_newChatModal .header h4").text("New Private Chat");
    $("#x_newChatLabel").text("To");
    $("#x_newChatStart").text("Chat");
    $("#x_newChatHelp").show();
    $("#x_newChatWarning").hide();
    showModal("#x_newChatModal");
    $("#x_newChatTo").focus()
});
$("#x_newChatFrom").change(function() {
    $("#x_newChatTo").val("");
    $("#x_newChatTokens .token").remove();
    tokenSearchForConnection($("#x_newChatTo").val(), getAccountByConnection($("#x_newChatFrom").val()), $("#x_newChatTokens .token"), null, "New Group Chat" == $("#x_newChatModal .header h4").text())
});
$("#x_newChatTo").keydown(function(a) {
    if (13 == a.which || 9 == a.which) {
        if (0 == $("#x_newChatTo").val().length)
            return 13 == a.which && $("#x_newChatStart").click(),
            !1;
        a = $("#x_newChatList .contact.active");
        $("#x_newChatTo").val("");
        "1" == a.attr("isGroup") || "ASTRA" != a.attr("medium") ? $("#x_newChatTokens .token").remove() : $("#x_newChatTokens .token[isGroup=1]").remove();
        a = $("<span class='token' title='" + a.attr("username") + "' medium='" + a.attr("medium") + "' username='" + a.attr("username") + "' isGroup='" + a.attr("isGroup") + "' account='" + a.attr("account") + "'><span class='text'>" + a.find(".name").text() + "</span></span>");
        a.click(function() {
            $(this).remove();
            $("#x_newChatTo").focus()
        });
        $("#x_newChatTo").before(a);
        var b = getAccountByConnection($("#x_newChatFrom").val());
        a = null;
        "Add People" == $("#x_newChatModal .header h4").text() && (b = messageWindow(g_messageIdFocus),
        a = b.nicks,
        b = getAccountByConnection(b.connection));
        tokenSearchForConnection($("#x_newChatTo").val(), b, $("#x_newChatTokens .token"), a, "New Group Chat" == $("#x_newChatModal .header h4").text());
        return !1
    }
    if (8 == a.which && "" == $("#x_newChatTo").val())
        return $("#x_newChatTokens .token").last().remove(),
        b = getAccountByConnection($("#x_newChatFrom").val()),
        a = null,
        "Add People" == $("#x_newChatModal .header h4").text() && (b = messageWindow(g_messageIdFocus),
        a = b.nicks,
        b = getAccountByConnection(b.connection)),
        tokenSearchForConnection($("#x_newChatTo").val(), b, $("#x_newChatTokens .token"), a, "New Group Chat" == $("#x_newChatModal .header h4").text()),
        !1;
    if (40 == a.which)
        return activeSelectionMove($("#x_newChatList .contact"), !1),
        !1;
    if (38 == a.which)
        return activeSelectionMove($("#x_newChatList .contact"), !0),
        !1
});
$("#x_newChatTo").keyup(function(a) {
    if (40 == a.which || 38 == a.which || 27 == a.which)
        return !1;
    getAccountByConnection($("#x_newChatFrom").val());
    a = null;
    "Add People" == $("#x_newChatModal .header h4").text() && (a = messageWindow(g_messageIdFocus).nicks);
    tokenSearchForConnection($(this).val(), getAccountByConnection($("#x_newChatFrom").val()), $("#x_newChatTokens .token"), a, "New Group Chat" == $("#x_newChatModal .header h4").text())
});
$("#x_newChatStart").click(function() {
    var a = [];
    $("#x_newChatTokens .token").each(function() {
        a.push({
            realname: $(this).attr("username"),
            medium: $(this).attr("medium"),
            isGroup: "1" == $(this).attr("isGroup") ? !0 : !1,
            account: $(this).attr("account")
        })
    });
    if (0 == a.length)
        $("#x_newChatTo").focus();
    else {
        if ("Add People" == $("#x_newChatModal .header h4").text()) {
            for (var b = "", c = 0; c < a.length; c++)
                a[c].realname.toLowerCase() != g_username.toLowerCase() && (0 < b.length && (b += "&"),
                b += a[c].realname);
            var d = messageWindow(g_messageIdFocus);
            d && groupchatMembersAddRequest("ASTRA", getAstraConnection().connection, b, g_messageIdFocus)
        } else {
            for (c = b = 0; c < a.length; c++)
                a[c].realname.toLowerCase() != g_username.toLowerCase() && b++;
            if (1 >= b)
                for (c = 0; c < a.length; c++) {
                    if (a[c].realname.toLowerCase() != g_username.toLowerCase() || 0 == b) {
                        if (d = messageFromNames(a[c].medium, a[c].realname)) {
                            messageFocus(d.id, !0);
                            $("#x_newChatCancel").click();
                            return
                        }
                        a[c].isGroup ? groupchatSelect(a[c].medium, a[c].realname, a[c].account) : messageCreate(a[c].medium, a[c].realname)
                    }
                }
            else {
                b = "";
                for (c = 0; c < a.length; c++)
                    a[c].realname.toLowerCase() != g_username.toLowerCase() && (0 < b.length && (b += "&"),
                    b += a[c].realname);
                if (d = messageFromNames("ASTRA", b)) {
                    messageFocus(d.id, !0);
                    $("#x_newChatCancel").click();
                    return
                }
                groupchatRequest("ASTRA", getAstraConnection().connection, b)
            }
        }
        $("#x_newChatCancel").click()
    }
});
$("#x_newChatCancel").click(function() {
    hideModal("#x_newChatModal")
});
$("#x_filterContacts").click(function() {
    addStatisticEvent("contacts");
    $(this).addClass("active").siblings().removeClass("active");
    showContactList(!0);
    $("#search_editbox").focus();
    return !1
});
$("#x_contactSort").click(function() {
    $(".contact_sort.lightmenu").is(":visible") ? $(".contact_sort.lightmenu").hide() : ($(".lightmenu").hide(),
    $(".contact_sort.lightmenu").show());
    return !1
});
$("#x_muteOneHour").click(function() {
    var a = messageWindow(g_messageIdFocus);
    a && g_controller.messageMute(a, 3600);
    $(".contact_settings.lightmenu").hide();
    $("#x_contactSettings").removeClass("active")
});
$("#x_muteUntil8").click(function() {
    var a = messageWindow(g_messageIdFocus);
    if (a) {
        var b = new Date
          , c = null
          , c = 8 <= b.getHours() ? new Date(b.getFullYear(),b.getMonth(),b.getDate() + 1,8,0,0,0) : new Date(b.getFullYear(),b.getMonth(),b.getDate(),8,0,0,0)
          , b = parseInt((c.getTime() - b.getTime()) / 1E3);
        g_controller.messageMute(a, b)
    }
    $(".contact_settings.lightmenu").hide();
    $("#x_contactSettings").removeClass("active")
});
$("#x_muteForever").click(function() {
    var a = messageWindow(g_messageIdFocus);
    a && g_controller.messageMute(a, 2147483647);
    $(".contact_settings.lightmenu").hide();
    $("#x_contactSettings").removeClass("active")
});
$("#x_unmute").click(function() {
    var a = messageWindow(g_messageIdFocus);
    a && g_controller.messageMute(a, 0);
    $(".contact_settings.lightmenu").hide();
    $("#x_contactSettings").removeClass("active")
});
$("#x_contactSettings").click(function() {
    $("#x_members").hide();
    $("#x_membersButton").removeClass("active");
    $(".contact_settings.lightmenu").is(":visible") ? ($(".contact_settings.lightmenu").hide(),
    $("#x_contactSettings").removeClass("active")) : ($(".lightmenu").hide(),
    $(".contact_settings.lightmenu").show(),
    $("#x_contactSettings").addClass("active"));
    return !1
});
$(".click").mousedown(function() {
    return !1
});
$("#x_filterChats").click(function() {
    addStatisticEvent("chats");
    $(".lightmenu").hide();
    $("#x_contactSettings").removeClass("active");
    $("#x_membersButton").removeClass("active");
    $("#chats").show();
    $("#contacts").hide();
    cancelSearch(!1);
    $(this).addClass("active").siblings().removeClass("active");
    return !1
});
function updateSoundSetting() {
    g_controller.g_settingsSounds ? $("#x_notificationsSoundsValue").html("Play on Message Receipt") : $("#x_notificationsSoundsValue").html("Off")
}
$("#x_notificationsSoundsToggle").click(function() {
    g_controller.g_settingsSounds = !g_controller.g_settingsSounds;
    try {
        g_controller.g_settingsSounds ? $.cookie("settings_sounds", !0, {
            expires: 3650
        }) : $.cookie("settings_sounds", !1, {
            expires: 3650
        })
    } catch (a) {}
    updateSoundSetting()
});
$("#x_notificationsDesktopToggle").click(function() {
    try {
        (g_notificationsEnabled = !g_notificationsEnabled) ? $.cookie("disable_notifications", !0, {
            expires: 3650
        }) : $.removeCookie("disable_notifications")
    } catch (a) {}
    updateNotificationsSetting();
    return !0
});
function updateNotificationsSetting() {
    g_notificationsAllowed || g_notificationsAvailable ? g_notificationsAllowed ? (g_notificationsEnabled ? $("#x_notificationsDesktopValue").text("Shown on Message Receipt") : $("#x_notificationsDesktopValue").text("Off"),
    $("#x_notificationsDesktopToggle").show()) : ($("#x_notificationsDesktopValue").text("Notifications must be enabled for Trillian within your browser"),
    $("#x_notificationsDesktopToggle").hide()) : ($("#x_notificationsDesktopValue").text("Notifications are not available in your browser."),
    $("#x_notificationsDesktopToggle").hide())
}
function updateEmojiSetting() {
    g_controller.g_settingsEmoji ? ($("#x_chatwindowSettingsEmojiValue").html("Emoji art supplied by <a href='http://emojione.com'>Emoji One</a>"),
    $(".emoji_button").show()) : ($("#x_chatwindowSettingsEmojiValue").html("Off"),
    $(".emoji_button").hide())
}
$("#x_chatwindowSettingsEmojiToggle").click(function() {
    g_controller.g_settingsEmoji = !g_controller.g_settingsEmoji;
    try {
        g_controller.g_settingsEmoji ? $.cookie("settings_emoji", !0, {
            expires: 3650
        }) : $.cookie("settings_emoji", !1, {
            expires: 3650
        })
    } catch (a) {}
    updateEmojiSetting()
});
function updateOfflineContactsSetting() {
    g_controller.g_showOfflineContacts ? ($("#x_filterContactsOffline").text("Hide Offline Contacts"),
    $("#x_contactlistSettingsOfflineValue").text("Shown in All Contacts")) : ($("#x_filterContactsOffline").text("Show Offline Contacts"),
    $("#x_contactlistSettingsOfflineValue").text("Hidden"))
}
$("#x_contactlistSettingsOfflineToggle").click(function() {
    g_controller.g_showOfflineContacts = !g_controller.g_showOfflineContacts;
    try {
        g_controller.g_showOfflineContacts ? $.cookie("settings_contacts_offline", !0, {
            expires: 3650
        }) : $.cookie("settings_contacts_offline", !1, {
            expires: 3650
        })
    } catch (a) {}
    updateOfflineContactsSetting();
    updateContactlist(!0)
});
$("#x_filterContactsOffline").click(function() {
    g_controller.g_showOfflineContacts = !g_controller.g_showOfflineContacts;
    try {
        g_controller.g_showOfflineContacts ? $.cookie("settings_contacts_offline", !0, {
            expires: 3650
        }) : $.cookie("settings_contacts_offline", !1, {
            expires: 3650
        })
    } catch (a) {}
    updateOfflineContactsSetting();
    updateContactlist(!0);
    $(".lightmenu").hide();
    $("#x_contactSettings").removeClass("active");
    $("#x_membersButton").removeClass("active")
});
$("#x_contactlistSettingsSortChange").click(function() {
    $("#adminTextChangeModal .header").html("<h4>Contact List Sort</h4>");
    $("#adminTextChangeModal .body .label").text("Sort Contacts");
    $("#adminTextChangeModal .body .value select").html('<option id="x_contactlistSettingsSortAlphabet" value="abc">by Alphabet</option><option id="x_contactlistSettingsSortGroup" value="groups">by Group</option><option id="x_contactlistSettingsSortService" value="service">by Service</option><option id="x_contactlistSettingsSortStatus" value="status">by Status</option>');
    "service" == g_setting["contactlist.groupby"] ? $("#x_contactlistSettingsSortService").attr("selected", "selected") : "groups" == g_setting["contactlist.groupby"] ? $("#x_contactlistSettingsSortGroup").attr("selected", "selected") : "abc" == g_setting["contactlist.groupby"] ? $("#x_contactlistSettingsSortAlphabet").attr("selected", "selected") : "status" == g_setting["contactlist.groupby"] && $("#x_contactlistSettingsSortStatus").attr("selected", "selected");
    g_textChangeSet = function() {
        var a = $("#adminTextChangeModal .body .value select").val();
        settingSet("contactlist.groupby", a, "service");
        contactlistGroupByChange();
        showContactList(!0);
        hideModal("#adminTextChangeModal")
    }
    ;
    showModal("#adminTextChangeModal")
});
$("#x_filterContactsService").click(function() {
    settingSet("contactlist.groupby", "service", "service");
    contactlistGroupByChange();
    showContactList(!0)
});
$("#x_filterContactsStatus").click(function() {
    settingSet("contactlist.groupby", "status", "service");
    contactlistGroupByChange();
    showContactList(!0)
});
$("#x_filterContactsAlphabet").click(function() {
    settingSet("contactlist.groupby", "abc", "service");
    contactlistGroupByChange();
    showContactList(!0)
});
$("#x_filterContactsGroup").click(function() {
    settingSet("contactlist.groupby", "groups", "service");
    contactlistGroupByChange();
    showContactList(!0)
});
function showContactList(a) {
    a && updateContactlist(!0);
    $("#contacts").show();
    $("#chats").hide();
    $(".lightmenu").hide();
    $("#x_contactSettings").removeClass("active");
    $("#x_membersButton").removeClass("active");
    $("#x_filterContacts").addClass("active").siblings().removeClass("active")
}
$("#x_menuPersonal").click(function() {
    $("#trillian").hide();
    $("#settings").show();
    $("#x_menuPersonal").addClass("active").siblings().removeClass("active");
    $(".personal").show();
    $(".domain").hide();
    selectTab("trillian");
    addStatisticEvent("settings");
    settings()
});
$("#x_menuDomain").click(function() {
    $("#trillian").hide();
    $("#settings").show();
    $("#x_menuDomain").addClass("active").siblings().removeClass("active");
    $(".personal").hide();
    $(".domain").show();
    selectTab("users");
    addStatisticEvent("admin");
    g_controller.focused(!1);
    g_controller.windowTitleUpdate()
});
$("#x_menuSignOut").click(function() {
    hideMenu();
    showModal("#signOutModal");
    return !1
});
$("#x_menuOnline").click(function() {
    g_controller.statusOnline()
});
$("#x_menuAway").click(function() {
    g_controller.statusAway()
});
$("#x_menuDND").click(function() {
    g_controller.statusDND()
});
$("#x_menuInvisible").click(function() {
    g_controller.statusInvisible()
});
$("#x_menuName").click(function() {
    $("#settingsNameFirst").val(g_membershipFirstName);
    $("#settingsNameLast").val(g_membershipLastName);
    $("#settingsNameDisplay").val(g_displayname);
    showModal("#settingsNameModal");
    $("#settingsNameFirst").focus()
});
$("#settingsNameSet").click(function() {
    g_controller.membershipDisplayNameUpdate($("#settingsNameDisplay").val(), "default");
    g_controller.membershipNamesUpdate($("#settingsNameFirst").val(), $("#settingsNameLast").val());
    hideModal("#settingsNameModal")
});
$("#settingsNameCancel").click(function() {
    hideModal("#settingsNameModal")
});
$("#x_menuStatus").click(function() {
    $("#settingsStatusMessage").val(g_controller.g_statusMessage);
    showModal("#settingsStatusModal");
    $("#settingsStatusMessage").focus()
});
$("#settingsStatusSet").click(function() {
    g_controller.setStatus($("#settingsStatusMessage").val());
    hideModal("#settingsStatusModal")
});
$("#settingsStatusCancel").click(function() {
    hideModal("#settingsStatusModal")
});
function domainWarning(a) {
    a ? ($("#x_domainPageWarning").html(a).show(),
    $("#x_domainPageWarning").attr("title", $("#x_domainPageWarning").text()),
    resize()) : $("#x_domainPageWarning").is(":visible") && ($("#x_domainPageWarning").hide(),
    resize())
}
function selectTab(a) {
    addStatisticEvent(a);
    $("[tab=" + a + "]").addClass("active").siblings("[tab]").removeClass("active");
    $("[page=" + a + "]").show().siblings("[page]").hide();
    "accounts" == a && (ui_newAccountAvailable() ? $("#accountAdd").show() : $("#accountAdd").hide(),
    accounts());
    domainWarning(null);
    domainUser() && "domain_billing" == a && (g_domain.requestSchedule(function() {
        domainFillSchedule()
    }),
    g_domain.requestBilling(function() {
        fillInvoiceList($("#x_domainBillingList"), g_domain.invoices)
    }),
    invoiceUpdateWarning());
    "billing" == a && g_user.requestBilling(function() {
        fillInvoiceList($("#x_invoiceList"), g_user.invoices)
    });
    "imagehistory" != a || g_imageHistory || (g_imageHistory = new ImageHistory,
    g_imageHistory.requestImages($("#x_mediaList"), $("#x_mediaListLoading"), $("#x_mediaListMore")));
    domainUser() && "groupchats" == a && g_domain.requestGroupChats(!1, function() {
        domainFillGroupChatList()
    });
    domainUser() && "accounts" == a && domainWarning("Your company may be able to monitor these accounts.");
    "selected_user" != a && ($("div[tab=selected_user]").hide(),
    g_domainSelectedUser = null);
    "selected_policy" != a && $("div[tab=selected_policy]").hide();
    "selected_group" != a && $("div[tab=selected_group]").hide();
    "selected_groupchat" != a && $("div[tab=selected_groupchat]").hide();
    if ("" != $("#x_domainUserListSearchInput").val() || 0 != g_domainSelectedUserGroup)
        $("#x_domainUserListSearchInput").val(""),
        g_domainSelectedUserGroup = 0,
        domainFillUserList();
    "" != $("#x_domainGroupChatListSearchInput").val() && ($("#x_domainGroupChatListSearchInput").val(""),
    domainFillGroupChatList());
    "" != $("#x_domainPolicyListSearchInput").val() && ($("#x_domainPolicyListSearchInput").val(""),
    domainFillPolicyList())
}
$("#settings .left .tabs").on("click", "div[tab]:not(.active)", function() {
    var a = $(this).attr("tab");
    selectTab(a)
});
$("#x_menuAvatar").click(function() {
    $("#x_currentAvatar").attr("src", "img/blank.gif");
    $("#x_gravatarAvatar").attr("src", "img/blank.gif");
    $("#x_fileAvatar").attr("src", "img/blank.gif");
    $("#x_noAvatar").attr("src", "img/blank.gif");
    g_controller.g_avatars.me ? ($("#x_currentAvatar").attr("src", g_controller.g_avatars.me),
    $("#x_currentAvatarDiv .unknown").hide()) : ($("#x_currentAvatar").attr("src", "img/blank.gif"),
    $("#x_currentAvatarDiv .unknown").show());
    $("#x_currentAvatarDiv").addClass("active").siblings().removeClass("active");
    showModal("#settingsAvatarModal");
    g_avatar = new Avatar;
    g_avatar.setLocation("x_currentAvatarDiv");
    g_avatar.response = function(a, b) {}
    ;
    g_fileAvatar = new Avatar;
    g_fileAvatar.setLocation("x_fileAvatarDiv");
    g_fileAvatar.response = function(a, b) {
        $("#x_fileAvatarDiv .unknown").hide()
    }
    ;
    g_membershipEmail && 0 != g_membershipEmail.length ? $("#x_gravatarAvatarDiv").show() : $("#x_gravatarAvatarDiv").hide();
    g_avatar.isLocalImageSupported() || ($("#x_fileAvatarDiv").hide(),
    $("#settingsAvatarFileInput").hide());
    g_avatar.isWebcamSupported() || $("#settingsAvatarWebcam").hide()
});
$("#x_fileAvatarDiv").click(function() {
    $("#x_fileAvatarDiv").addClass("active").siblings().removeClass("active");
    $("#settingsAvatarFileInput").click();
    return !1
});
$("#settingsAvatarFileInput").change(function() {
    $("#x_fileAvatarDiv").addClass("active").siblings().removeClass("active");
    g_fileAvatar.localImage(this.files);
    return !1
});
$("#x_currentAvatarDiv").click(function() {
    $(this).addClass("active").siblings().removeClass("active");
    return !1
});
$("#x_noAvatarDiv").click(function() {
    $(this).addClass("active").siblings().removeClass("active");
    return !1
});
$("#x_gravatarAvatarDiv").click(function() {
    $(this).addClass("active").siblings().removeClass("active");
    $("#x_gravatarAvatarDiv .unknown").text("Loading ...");
    g_gravatarAvatar || (g_gravatarAvatar = new Avatar,
    g_gravatarAvatar.response = function(a, c) {
        $("#x_gravatarAvatarDiv .unknown").hide()
    }
    ,
    g_gravatarAvatar.setLocation("x_gravatarAvatarDiv"));
    var a = g_membershipEmail.toLowerCase()
      , a = md5(a);
    g_gravatarAvatar.imageSetURL("https://www.gravatar.com/avatar/" + a + "?s=96")
});
$("#settingsAvatarSet").click(function() {
    var a = $("#settingsAvatarModal .avatar_zone.active").attr("id");
    "x_currentAvatarDiv" == a ? hideModal("#settingsAvatarModal") : "x_gravatarAvatarDiv" == a ? setAvatarFromAvatarObject(g_gravatarAvatar) : "x_fileAvatarDiv" == a ? setAvatarFromAvatarObject(g_fileAvatar) : "x_noAvatarDiv" == a && (avatarUpdate("", "default"),
    hideModal("#settingsAvatarModal"))
});
function setAvatarFromAvatarObject(a) {
    if ((null != a.result_url || null != a.result_base64) && "" != a.result_url) {
        if (a.result_url) {
            $.getJSON("avatar.php?url=" + a.result_url, function(a) {
                avatarUpdate(a.avatar, "default")
            }).error(function(a) {});
            hideModal("#settingsAvatarModal");
            return
        }
        avatarUpdate(a.result_base64, "default")
    }
    hideModal("#settingsAvatarModal")
}
$("#settingsAvatarCancel").click(function() {
    hideModal("#settingsAvatarModal")
});
$("#settingsPhoneVerifyShow").click(function() {
    showModal("#settingsPhoneVerifyModal");
    $("#settingsPhoneVerifyCode").focus()
});
$("#settingsPhoneVerifySet").click(function() {
    if ($("#settingsPhoneVerifySet").hasClass("disabled"))
        return !1;
    var a = $("#settingsPhoneVerifyCode").val();
    $("#settingsPhoneVerifyCode").removeAttr("disabled");
    $("#settingsPhoneVerifyCode").removeClass("error");
    if ("" == $("#settingsPhoneVerifyCode").val())
        return $("#settingsPhoneCountry").addClass("error"),
        $("#settingsPhoneCountry").focus(),
        !1;
    $("#settingsPhoneVerifyCode").attr("disabled", !0);
    $("#settingsPhoneVerifySet").addClass("disabled");
    phoneVerify(g_username, g_password, g_membershipPhone, a, function(a, c) {
        $("#settingsPhoneVerifyCode").removeAttr("disabled");
        $("#settingsPhoneVerifySet").removeClass("disabled");
        "success" == a ? (g_membershipPhoneVerified = !0,
        ui_membershipUpdate(),
        membershipGet(),
        hideModal("#settingsPhoneVerifyModal"),
        $("#settingsPhoneVerifyCode").val("")) : ($("#settingsPhoneVerifyCode").addClass("error"),
        alert("Error when verifying phone number."))
    })
});
$("#settingsPhoneVerifyCancel").click(function() {
    hideModal("#settingsPhoneVerifyModal")
});
$("#settingsPhoneShow").click(function() {
    showModal("#settingsPhoneModal");
    $("#settingsPhoneCountry").focus()
});
function updatePhoneStatus() {
    var a = $("#settingsPhoneCountry").val() + $("#settingsPhoneNumber").val()
      , a = a.replace(/\D/g, "")
      , a = "+" + a;
    "+" == a[0] && 12 == a.length && "1" == a[1] && (a = a.substring(0, 2) + " (" + a.substring(2, 5) + ") " + a.substring(5, 8) + "-" + a.substring(8, 12));
    $("#settingsPhoneModal .status").text(a)
}
$("#settingsPhoneCountry, #settingsPhoneNumber").keyup(function() {
    updatePhoneStatus()
});
$("#settingsPhoneSet").click(function() {
    if ($("#settingsPhoneSet").hasClass("disabled"))
        return !1;
    var a = $("#settingsPhoneCountry").val() + $("#settingsPhoneNumber").val()
      , a = a.replace(/\D/g, "")
      , a = "+" + a;
    $("#settingsPhoneCountry").removeAttr("disabled");
    $("#settingsPhoneNumber").removeAttr("disabled");
    $("#settingsPhoneCountry").removeClass("error");
    $("#settingsPhoneNumber").removeClass("error");
    if ("" == $("#settingsPhoneCountry").val())
        return $("#settingsPhoneCountry").addClass("error"),
        $("#settingsPhoneCountry").focus(),
        !1;
    if ("" == $("#settingsPhoneNumber").val())
        return $("#settingsPhoneNumber").addClass("error"),
        $("#settingsPhoneNumber").focus(),
        !1;
    $("#settingsPhoneCountry").attr("disabled", !0);
    $("#settingsPhoneNumber").attr("disabled", !0);
    $("#settingsPhoneSet").addClass("disabled");
    phoneSet(g_username, g_password, a, "us", function(b, c) {
        $("#settingsPhoneCountry").removeAttr("disabled");
        $("#settingsPhoneNumber").removeAttr("disabled");
        $("#settingsPhoneSet").removeClass("disabled");
        "success" == b ? (g_membershipPhone = a,
        g_membershipPhoneVerified = !1,
        ui_membershipUpdate(),
        membershipGet(),
        hideModal("#settingsPhoneModal"),
        $("#settingsPhoneCountry").val(""),
        $("#settingsPhoneNumber").val("")) : ($("#settingsPhoneCountry").addClass("error"),
        $("#settingsPhoneNumber").addClass("error"),
        alert("Error when setting phone number."))
    })
});
$("#settingsPhoneCancel").click(function() {
    hideModal("#settingsPhoneModal");
    $("#settingsPhoneCountry").val("");
    $("#settingsPhoneNumber").val("")
});
$("#settingsEmailShow").click(function() {
    showModal("#settingsEmailModal");
    $("#settingsEmailEmail").focus()
});
$("#settingsEmailChange").click(function() {
    if ($("#settingsEmailChange").hasClass("disabled"))
        return !1;
    var a = $("#settingsEmailEmail").val()
      , b = $("#settingsEmailPassword").val();
    $("#settingsEmailEmail").removeAttr("disabled");
    $("#settingsEmailPassword").removeAttr("disabled");
    $("#settingsEmailChange").removeClass("disabled");
    $("#settingsEmailEmail").removeClass("error");
    $("#settingsEmailPassword").removeClass("error");
    if (!isValidEmail(a))
        return $("#settingsEmailEmail").addClass("error"),
        $("#settingsEmailEmail").focus(),
        !1;
    if (b != g_password)
        return $("#settingsEmailPassword").addClass("error"),
        $("#settingsEmailPassword").focus(),
        !1;
    $("#settingsEmailEmail").attr("disabled", !0);
    $("#settingsEmailPassword").attr("disabled", !0);
    $("#settingsEmailChange").addClass("disabled");
    changeEmail(g_username, b, a, function(b, d) {
        $("#settingsEmailEmail").removeAttr("disabled");
        $("#settingsEmailPassword").removeAttr("disabled");
        $("#settingsEmailChange").removeClass("disabled");
        $("#settingsEmailEmail").removeClass("error");
        $("#settingsEmailPassword").removeClass("error");
        "success" == b ? (g_membershipEmail = a,
        ui_membershipUpdate(),
        membershipGet(),
        hideModal("#settingsEmailModal"),
        $("#settingsEmailEmail").val(""),
        $("#settingsEmailPassword").val("")) : ($("#settingsEmailEmail").addClass("error"),
        alert("Error when setting email address."))
    })
});
$("#settingsEmailCancel").click(function() {
    hideModal("#settingsEmailModal");
    $("#settingsEmailEmail").val("");
    $("#settingsEmailPassword").val("")
});
$("#x_deleteUsername").click(function() {
    showModal("#x_deleteUsernameModal");
    $("#x_deleteUsernameUsername").focus()
});
$("#x_deleteUsernameCodeEmail").click(function() {
    $("#x_deleteUsernameModal .warning").text("");
    $("#x_deleteUsernameModal .warning").hide();
    $("#x_deleteUsernameUsername").removeClass("error");
    $("#x_deleteUsernamePassword").removeClass("error");
    $("#x_deleteUsernameCode").removeClass("error");
    if (0 == $("#x_deleteUsernameUsername").val().length || $("#x_deleteUsernameUsername").val().toLowerCase() != g_username.toLowerCase())
        return $("#x_deleteUsernameUsername").addClass("error"),
        $("#x_deleteUsernameUsername").focus(),
        !1;
    if (0 == $("#x_deleteUsernamePassword").val().length)
        return $("#x_deleteUsernamePassword").addClass("error"),
        $("#x_deleteUsernamePassword").focus(),
        !1;
    $("#x_deleteUsernameDelete").addClass("disabled");
    $("#x_deleteUsernameCancel").addClass("disabled");
    $("#x_deleteUsernameUsername").attr("disabled", "disabled");
    $("#x_deleteUsernamePassword").attr("disabled", "disabled");
    $("#x_deleteUsernameCode").attr("disabled", "disabled");
    $("#x_deleteUsernameAgreement").attr("disabled", "disabled");
    (new User).deleteRequest($("#x_deleteUsernameUsername").val().toLowerCase(), $("#x_deleteUsernamePassword").val(), function(a, b) {
        $("#x_deleteUsernameDelete").removeClass("disabled");
        $("#x_deleteUsernameCancel").removeClass("disabled");
        $("#x_deleteUsernameUsername").removeAttr("disabled");
        $("#x_deleteUsernamePassword").removeAttr("disabled");
        $("#x_deleteUsernameCode").removeAttr("disabled");
        $("#x_deleteUsernameAgreement").removeAttr("disabled");
        a ? $("#x_deleteUsernameModal .warning").text("A delete code was sent to your email address.").show() : "unverified" == b ? $("#x_deleteUsernameModal .warning").text("Please confirm your email address before continuing.").show() : $("#x_deleteUsernameModal .warning").text("Please check your username and password.").show()
    })
});
$("#x_deleteUsernameDelete").click(function() {
    if ($(this).hasClass("disabled"))
        return !1;
    $("#x_deleteUsernameModal .warning").text("");
    $("#x_deleteUsernameModal .warning").hide();
    $("#x_deleteUsernameUsername").removeClass("error");
    $("#x_deleteUsernamePassword").removeClass("error");
    $("#x_deleteUsernameCode").removeClass("error");
    if (0 == $("#x_deleteUsernameUsername").val().length || $("#x_deleteUsernameUsername").val().toLowerCase() != g_username.toLowerCase())
        return $("#x_deleteUsernameUsername").addClass("error"),
        $("#x_deleteUsernameUsername").focus(),
        !1;
    if (0 == $("#x_deleteUsernamePassword").val().length)
        return $("#x_deleteUsernamePassword").addClass("error"),
        $("#x_deleteUsernamePassword").focus(),
        !1;
    if (0 == $("#x_deleteUsernameCode").val().length)
        return $("#x_deleteUsernameCode").addClass("error"),
        $("#x_deleteUsernameCode").focus(),
        !1;
    if (!$("#x_deleteUsernameAgreement").is(":checked"))
        return $("#x_deleteUsernameAgreement").addClass("error"),
        $("#x_deleteUsernameModal .warning").html("Please acknowledge that deleting your account is <b>permanent</b> and cannot be undone.").show(),
        !1;
    $("#x_deleteUsernameDelete").addClass("disabled");
    $("#x_deleteUsernameCancel").addClass("disabled");
    $("#x_deleteUsernameUsername").attr("disabled", "disabled");
    $("#x_deleteUsernamePassword").attr("disabled", "disabled");
    $("#x_deleteUsernameCode").attr("disabled", "disabled");
    $("#x_deleteUsernameAgreement").attr("disabled", "disabled");
    (new User).deleteAccount($("#x_deleteUsernameUsername").val(), $("#x_deleteUsernamePassword").val(), $("#x_deleteUsernameCode").val(), function(a, b) {
        $("#x_deleteUsernameDelete").removeClass("disabled");
        $("#x_deleteUsernameCancel").removeClass("disabled");
        $("#x_deleteUsernameUsername").removeAttr("disabled");
        $("#x_deleteUsernamePassword").removeAttr("disabled");
        $("#x_deleteUsernameCode").removeAttr("disabled");
        $("#x_deleteUsernameAgreement").removeAttr("disabled");
        a ? (ui_sessionLoggedout(),
        document.location = document.location.protocol + "//" + document.location.hostname + document.location.pathname) : $("#x_deleteUsernameModal .warning").text("Invalid username, password or code.").show()
    })
});
$("#x_deleteUsernameCancel").click(function() {
    if ($(this).hasClass("disabled"))
        return !1;
    hideModal("#x_deleteUsernameModal")
});
$("#settingsPasswordShow").click(function() {
    showModal("#settingsPasswordModal");
    $("#settingsPasswordOld").focus()
});
$("#settingsPasswordChange").click(function() {
    if ($("#settingsPasswordChange").hasClass("disabled"))
        return !1;
    var a = $("#settingsPasswordOld").val()
      , b = $("#settingsPasswordNew").val()
      , c = $("#settingsPasswordConfirm").val();
    $("#settingsPasswordOld").removeAttr("disabled");
    $("#settingsPasswordNew").removeAttr("disabled");
    $("#settingsPasswordConfirm").removeAttr("disabled");
    $("#settingsPasswordChange").removeClass("disabled");
    $("#settingsPasswordOld").removeClass("error");
    $("#settingsPasswordNew").removeClass("error");
    $("#settingsPasswordConfirm").removeClass("error");
    if (a != g_password)
        return $("#settingsPasswordOld").addClass("error"),
        $("#settingsPasswordOld").focus(),
        !1;
    if (b != c)
        return $("#settingsPasswordNew").addClass("error"),
        $("#settingsPasswordConfirm").addClass("error"),
        $("#settingsPasswordConfirm").focus(),
        !1;
    $("#settingsPasswordOld").attr("disabled", !0);
    $("#settingsPasswordNew").attr("disabled", !0);
    $("#settingsPasswordConfirm").attr("disabled", !0);
    $("#settingsPasswordChange").addClass("disabled");
    g_controller.passwordSet(b)
});
function ui_passwordSuccess() {
    hideModal("#settingsPasswordModal");
    g_password = $("#settingsPasswordNew").val();
    $("#settingsPasswordOld").removeAttr("disabled");
    $("#settingsPasswordNew").removeAttr("disabled");
    $("#settingsPasswordConfirm").removeAttr("disabled");
    $("#settingsPasswordChange").removeClass("disabled");
    $("#settingsPasswordOld").val("");
    $("#settingsPasswordNew").val("");
    $("#settingsPasswordConfirm").val("")
}
function ui_passwordFailure() {
    $("#settingsPasswordOld").removeAttr("disabled");
    $("#settingsPasswordNew").removeAttr("disabled");
    $("#settingsPasswordConfirm").removeAttr("disabled");
    $("#settingsPasswordChange").removeClass("disabled");
    $("#settingsPasswordNew").addClass("error");
    alert("Error when changing your password.")
}
$("#settingsPasswordCancel").click(function() {
    $("#settingsPasswordOld").val("");
    $("#settingsPasswordNew").val("");
    $("#settingsPasswordConfirm").val("");
    hideModal("#settingsPasswordModal")
});
function contactlistGroupByChange() {
    "service" == g_setting["contactlist.groupby"] ? ($("#x_filterContactsService").addClass("active").siblings().removeClass("active"),
    $("#x_contactlistSettingsSortValue").text("by Service")) : "groups" == g_setting["contactlist.groupby"] ? ($("#x_filterContactsGroup").addClass("active").siblings().removeClass("active"),
    $("#x_contactlistSettingsSortValue").text("by Group")) : "abc" == g_setting["contactlist.groupby"] ? ($("#x_filterContactsAlphabet").addClass("active").siblings().removeClass("active"),
    $("#x_contactlistSettingsSortValue").text("by Alphabet")) : "status" == g_setting["contactlist.groupby"] && ($("#x_filterContactsStatus").addClass("active").siblings().removeClass("active"),
    $("#x_contactlistSettingsSortValue").text("by Status"))
}
$("#accountAdd").click(function() {
    $("#add_account_username, #add_account_username_label, #add_account_password, #add_account_password_label").show();
    showModal("#accountAddModal");
    $("#add_account_medium").change()
});
function ui_addContactModal() {
    $(".lightmenu").hide();
    $("#x_contactSettings").removeClass("active");
    $("#x_membersButton").removeClass("active");
    $("#add_contact_medium").children().remove();
    for (var a = -1, b = 0; b < g_accounts.length; b++)
        g_accounts[b] && void 0 != g_accounts[b].status && "offline" != g_accounts[b].status.toLowerCase() && ("ASTRA" == g_accounts[b].medium && (a = g_accounts[b].connection),
        $("#add_contact_medium").append('<option value="' + g_accounts[b].connection + '">' + g_accounts[b].name + " (" + mediumDisplay(g_accounts[b].medium) + ")</option>"));
    $("#add_contact_medium").val(a);
    $("#add_contact_username").val("");
    showModal("#x_contactAddModal");
    $("#add_contact_medium").change();
    1 > $("#add_contact_medium").children().length ? ($("#addContact").hide(),
    $("#addContactImpossible").show(),
    $("#contactAddAdd").hide(),
    $("#x_contactAddModal .header h4").text("Can't Add Contact")) : (1 == $("#add_contact_medium").children().length ? ($("#addContact").show(),
    $("#add_contact_medium").parent().parent().hide()) : $("#addContact").show(),
    $("#addContactImpossible").hide(),
    $("#contactAddAdd").show(),
    $("#x_contactAddModal .header h4").text("Add Contact"),
    $("#add_contact_username").focus())
}
$("#add_contact_medium").on("change", function() {
    for (var a = null, b = $(this).val(), c = 0; c < g_accounts.length; c++)
        g_accounts[c].connection == b && (a = g_accounts[c].medium);
    switch (a) {
    case "ASTRA":
        domainUser() ? (l_label = "IM Address",
        l_placeholder = "e.g., tricia@trillian.im") : (l_label = "Username",
        l_placeholder = "e.g., tricia42");
        break;
    case "JABBER":
        l_label = "JID";
        l_placeholder = "e.g., tricia@jabber.org";
        break;
    case "AIM":
        l_label = "Screen Name";
        l_placeholder = "e.g., tricia42";
        break;
    case "ICQ":
        l_label = "UIN";
        l_placeholder = "e.g., 42424242";
        break;
    case "YAHOO":
        l_label = "Yahoo ID";
        l_placeholder = "e.g., tricia42";
        break;
    default:
        l_label = "Email",
        l_placeholder = "e.g., tricia@trillian.im"
    }
    $("#add_contact_username").attr("placeholder", l_placeholder);
    $("#add_contact_username_label").text(l_label);
    return !0
});
$("#contactAddCancel").click(function() {
    hideModal("#x_contactAddModal")
});
$("#contactAddAdd").click(function() {
    for (var a = null, b = $("#add_contact_medium").val(), c = $("#add_contact_username").val(), d = 0; d < g_accounts.length; d++)
        g_accounts[d].connection == b && (a = g_accounts[d].medium);
    g_controller.contactAdd(a, c, "default", b);
    hideModal("#x_contactAddModal")
});
$("#accountAddCancel").click(function() {
    hideModal("#accountAddModal");
    accounts()
});
$("#accountAddSave").click(function() {
    var a = $("#add_account_username").val()
      , b = $("#add_account_password").val()
      , c = $("#add_account_medium").val();
    "FACEBOOK" == c && -1 == a.indexOf("@") && (a += "@facebook.com");
    g_controller.accountAdd(c, a, "default", b);
    $("#add_account_username").val("");
    $("#add_account_password").val("");
    hideModal("#accountAddModal")
});
$("#add_account_medium").on("change", function() {
    var a = $(this).val();
    $("#add_account_username, #add_account_username_label, #add_account_password, #add_account_password_label").show();
    $("#add_account_facebook").hide();
    var b = "Email";
    switch (a) {
    case "ASTRA":
        b = "Username";
        break;
    case "JABBER":
        b = "JID";
        break;
    case "MYSPACE":
        b = "User ID";
        break;
    case "AIM":
        b = "Screen Name";
        break;
    case "ICQ":
        b = "UIN";
        break;
    case "YAHOO":
        b = "Yahoo ID";
        break;
    case "FACEBOOK":
        b = "Email"
    }
    $("#add_account_username").attr("placeholder", b);
    $("#add_account_username_label").text(b);
    return !0
});
$("#signOutCancel").click(function() {
    hideModal("#signOutModal")
});
$("#signOutConfirm").click(function() {
    hideModal("#signOutModal");
    g_controller.statusOffline(!0)
});
$("#accountDeleteCancel").click(function() {
    hideModal("#accountDeleteModal")
});
$("#accountDeleteConfirm").click(function() {
    var a = $(this).data("medium")
      , b = $(this).data("username")
      , c = $(this).data("identity");
    accountDeleteRequest(a, b, c);
    hideModal("#accountDeleteModal")
});
$("#accountSettingsCancel").click(function() {
    hideModal("#accountSettingsModal")
});
$("#accountSettingsSave").click(function() {
    var a = $(this).data("medium")
      , b = $(this).data("username")
      , c = $("#badpassword").val()
      , d = $(this).data("identity")
      , e = a + b.replace(/[^A-Za-z0-9]/g, "_");
    $("#" + e + "_edit").parent().find(".error_icon").length && (g_controller.calloutClear("accounts", a + b),
    $("#" + e + "_edit").parent().find(".error_icon").hide());
    $("#div_accounts").find(".error_icon:visible").length || $("#" + e + "_edit").parent().find(".error_icon").hide();
    c && (accountRetry(a, b, d, c),
    $("#badpassword").val(""));
    interfaceSave();
    accounts();
    hideModal("#accountSettingsModal")
});
$("#accountSettingsDelete").click(function() {
    var a = $(this).data("medium")
      , b = $(this).data("username")
      , c = $(this).data("identity");
    hideModal("#accountSettingsModal");
    accountDeleteAsk(a, b, c)
});
$("#contactSettingsCancel").click(function() {
    hideModal("#contactSettingsModal")
});
$("#contactSettingsSave").click(function() {
    var a = $("#contactSettingsModal").data("medium")
      , b = $("#contactSettingsModal").data("username")
      , c = $("#contactSettingsModal").data("identity")
      , d = $("#contactSettingsModal").data("account")
      , e = $("#contactSettingsModal").data("window")
      , f = g_controller.getContactEnum(a, b)
      , g = g_contacts[f].displayname
      , h = $("#contactSettingsModal:visible").find("#contactSettingsDisplayName").val();
    g != h && (g = "",
    g = "#" == b[0] ? "c=groupchatRename&medium=" + a + "&name=" + b + "&identity=" + c + "&displayname=" + h + "&medium=" + a + "&account=" + d : "c=contactlistRename&medium=" + a + "&username=" + b + "&identity=" + c + "&name=" + h,
    g_controller.addPacket(g),
    g_contacts[f].displayname = h);
    e && (a = messageWindow(e)) && a.group && (a.caps_topic_editable && (b = $("#x_contactSettingsTopic").val(),
    a.topic != b && messageSetTopic(e, b)),
    a.caps_groupchat_flags_editable && ($("#x_contactSettingsFlagDisableDisplayNameSet").is(":checked") != a.flag_disable_displayname_set && (a.flag_disable_displayname_set = !a.flag_disable_displayname_set,
    messageSetGroupChatFlag(a.id, "flag_disable_displayname_set", a.flag_disable_displayname_set)),
    $("#x_contactSettingsFlagDisableTopicSet").is(":checked") != a.flag_disable_topic_set && (a.flag_disable_topic_set = !a.flag_disable_topic_set,
    messageSetGroupChatFlag(a.id, "flag_disable_topic_set", a.flag_disable_topic_set)),
    $("#x_contactSettingsFlagDisableList").is(":checked") != a.flag_disable_list && (a.flag_disable_list = !a.flag_disable_list,
    messageSetGroupChatFlag(a.id, "flag_disable_list", a.flag_disable_list)),
    $("#x_contactSettingsFlagDisableMemberAdd").is(":checked") != a.flag_disable_member_add && (a.flag_disable_member_add = !a.flag_disable_member_add,
    messageSetGroupChatFlag(a.id, "flag_disable_member_add", a.flag_disable_member_add)),
    $("#x_contactSettingsFlagDisableMemberRemove").is(":checked") != a.flag_disable_member_remove && (a.flag_disable_member_remove = !a.flag_disable_member_remove,
    messageSetGroupChatFlag(a.id, "flag_disable_member_remove", a.flag_disable_member_remove)),
    $("#x_contactSettingsFlagDisableMessageSend").is(":checked") != a.flag_disable_message_send && (a.flag_disable_message_send = !a.flag_disable_message_send,
    messageSetGroupChatFlag(a.id, "flag_disable_message_send", a.flag_disable_message_send))));
    0 < $(".modal:visible .interfaceOpen").children().length && interfaceSave();
    $(".modal:visible .interfaceOpen").hide();
    hideModal("#contactSettingsModal")
});
$("#contactSettingsDelete").click(function() {
    var a = $("#contactSettingsModal").data("medium")
      , b = $("#contactSettingsModal").data("username")
      , c = $("#contactSettingsModal").data("identity")
      , d = $("#contactSettingsModal").data("connection");
    a && b && (hideModal("#contactSettingsModal"),
    g_controller.contactDeleteAsk(a, b, c, d))
});
$("#contactDeleteCancel").click(function() {
    hideModal("#contactDeleteModal")
});
$("#contactDeleteConfirm").click(function() {
    var a = $(this).data("medium")
      , b = $(this).data("username")
      , c = $(this).data("identity")
      , d = $(this).data("connection");
    contactDeleteRequest(a, b, c, d);
    hideModal("#contactDeleteModal");
    return !1
});
$(document).on("click", function(a) {
    if (window.getSelection && 0 < window.getSelection().toString().length)
        return !0;
    if (window.getSelection) {
        var b = window.getSelection();
        if (b && 0 < b.rangeCount && (b = b.getRangeAt(0)) && (b = b.cloneContents()) && (b = b.querySelector("img")) && "emoji" == b.getAttribute("class"))
            return !0
    }
    if (document.selection && document.selection.createRange().text && 0 < document.selection.createRange().text.length)
        return !0;
    $(a.target).is(":not(input)") && $(a.target).is(":not(textarea)") && ($("#login").is(":visible") ? $("#x_loginUsername").is(":disabled") || $("#x_loginUsername").focus() : $("#trillian").is(":visible") && $("#x_edit").focus());
    $(".emojibrowser").is(":visible") && 0 == $(".emojibrowser").find(a.target).length && messageCloseAutocomplete();
    $(".lightmenu").each(function() {
        $(this).is(":visible") && 0 == $(this).find(a.target).length && $(this).hide()
    });
    return !0
});
$(window).bind("resize", resize);
function resizeModal() {
    null != g_currentModal && g_currentModal.animate({
        top: $(window).height() / 2 - g_currentModal.height() / 2
    })
}
function showModal(a) {
    $("#x_edit").attr("disabled", !0);
    $(a).fadeIn("fast");
    $(".overlay").fadeIn("fast");
    g_currentModal = $(a);
    $(a).css("top", $(window).height() / 2 - $(a).height() / 2)
}
function replaceModal(a, b) {
    $(a).hide();
    $(b).show();
    g_currentModal = $(b);
    $(b).css("top", $(window).height() / 2 - $(b).height() / 2)
}
function showModalHelper(a, b) {
    $(a + " .helper").toggle();
    var c = $(a + " .helper").is(":visible");
    c ? $(b).addClass("active") : $(b).removeClass("active");
    c = $(a).width() + (c ? 430 : 0);
    c > $(window).width() && (c = $(window).width());
    $(a).animate({
        "margin-left": c / 2 * -1
    })
}
function hideModalHelper(a, b) {
    $(a + " .helper").hide();
    var c = $(a).width();
    c > $(window).width() && (c = $(window).width());
    $(a).css({
        "margin-left": c / 2 * -1
    });
    $(b).removeClass("active")
}
function hideModal(a) {
    g_nochats || $("#x_edit").removeAttr("disabled");
    $(a).fadeOut(function() {
        switch ($(this).attr("id")) {
        case "x_adminUsersSingleAddModal":
            $("#x_adminUsersSingleAddUsername").removeClass("error");
            $("#x_adminUsersSingleAddPassword").removeClass("error");
            $("#x_adminUsersSingleAddEmail").removeClass("error");
            $("#x_adminUsersSingleAddFirstname").removeClass("error");
            $("#x_adminUsersSingleAddLastname").removeClass("error");
            $("#x_adminUsersSingleAddError").text("").hide();
            $("#x_adminUsersSingleAddUsername").val("");
            $("#x_adminUsersSingleAddPassword").val("");
            $("#x_adminUsersSingleAddEmail").val("");
            $("#x_adminUsersSingleAddFirstname").val("");
            $("#x_adminUsersSingleAddLastname").val("");
            $("#x_adminUsersSingleAddUsername").focus();
            break;
        case "x_billingModal":
            resetBillingInvoice();
            $("#x_domainBillingCancel").show();
            break;
        case "settingsAvatarModal":
            g_fileAvatar = g_gravatarAvatar = g_avatar = null;
            $("#x_currentAvatarDiv img").removeAttr("src");
            $("#x_currentAvatarDiv .unknown").text("None").show();
            $("#x_facebookAvatarDiv img").removeAttr("src");
            $("#x_facebookAvatarDiv .unknown").text("Click to load").show();
            $("#x_gravatarAvatarDiv img").removeAttr("src");
            $("#x_gravatarAvatarDiv .unknown").text("Click to load").show();
            $("#x_fileAvatarDiv img").removeAttr("src");
            $("#x_fileAvatarDiv .unknown").text("Click to load").show();
            $("#x_noAvatarDiv img").removeAttr("src");
            $("#x_noAvatarDiv .unknown").text("Click to load").show();
            $("#settingsAvatarFileInput").val("");
            break;
        case "x_newPublicGroupChatModal":
            $("#x_groupchatList").children().remove();
            hideModalHelper("#x_newPublicGroupChatModal", "#x_newPublicGroupChatHelp");
            break;
        case "x_newPublicGroupChatCreateModal":
            hideModalHelper("#x_newPublicGroupChatCreateModal", "#x_newPublicGroupChatCreateHelp");
            break;
        case "x_newChatModal":
            hideModalHelper("#x_newChatModal", "#x_newChatHelp");
            $("#x_newChatTo").val("");
            $("#x_newChatTokens .token").remove();
            break;
        case "x_contactAddModal":
            hideModalHelper("#x_contactAddModal", "#x_contactAddHelp");
            break;
        case "x_adminGroupChatFlagsEditModal":
            hideModalHelper("#x_adminGroupChatFlagsEditModal", "#x_adminGroupChatFlagsEditHelp");
            break;
        case "contactSettingsModal":
            hideModalHelper("#contactSettingsModal", "#x_contactSettingsGroupChatHelp");
            break;
        case "signupModal":
            $("#div_signup").find("input").val("");
            $("#div_signup").find("input").removeClass("error");
            $("#signupModal .warning").text("");
            $("#signupModal .warning").hide();
            break;
        case "x_forgotUsernameModal":
            $("#x_forgotUsernameBody").find("input").val("");
            $("#x_forgotUsernameBody").find("input").removeClass("error");
            $("#x_forgotUsernameModal .warning").text("");
            $("#x_forgotUsernameModal .warning").hide();
            $("#x_forgotUsernameBody").show();
            $("#x_forgotUsernameSuccess").hide();
            $("#x_forgotUsernameRequest").show();
            $("#x_forgotUsernameCancel").text("Cancel");
            break;
        case "x_forgotPasswordModal":
            $("#x_forgotPasswordBody").find("input").val("");
            $("#x_forgotPasswordBody").find("input").removeClass("error");
            $("#x_forgotPasswordModal .warning").text("");
            $("#x_forgotPasswordModal .warning").hide();
            $("#x_forgotPasswordBody").show();
            $("#x_forgotPasswordSuccess").hide();
            $("#x_forgotPasswordRequest").show();
            $("#x_forgotPasswordCancel").text("Cancel");
            break;
        case "x_resetPasswordModal":
            $("#x_resetPasswordBody").find("input").val("");
            $("#x_resetPasswordBody").find("input").removeClass("error");
            $("#x_resetPasswordModal .warning").text("");
            $("#x_resetPasswordModal .warning").hide();
            break;
        case "x_deleteUsernameModal":
            $("#x_deleteUsernameBody").find("input").val("");
            $("#x_deleteUsernameBody").find("input").removeClass("error");
            $("#x_deleteUsernameModal .warning").text("");
            $("#x_deleteUsernameModal .warning").hide();
            break;
        case "x_adminUsersModal":
            g_domainUserInviteSimple = !0;
            $("#x_adminUsersSimple").show();
            $("#x_adminUsersBulk").hide();
            $("#x_adminUsersInput").removeClass("error");
            $("#x_adminUsersEmail1").removeClass("error");
            $("#x_adminUsersEmail1").val("");
            $("#x_adminUsersEmail2").val("");
            $("#x_adminUsersEmail3").val("");
            $("#x_adminUsersInput").val("");
            break;
        case "adminTextShowModal":
            $("#adminTextShowModal").removeClass("wide");
            $("#adminTextShowModal .body").removeClass("modalFullImage");
            $("#adminTextShowModal .body").addClass("modalFullHeight");
            resize();
            break;
        case "adminTextAreaModal":
            $("#adminTextAreaModalSet").removeClass("delete");
            $("#adminTextAreaModalSet").text("Set");
            break;
        case "adminTextEditModal":
            $("#adminTextEditModal .warning").text("");
            $("#adminTextEditModal .warning").hide();
            $("#adminTextEditModal").find("input").val("");
            $("#adminTextEditModal").find("input").removeClass("error");
            g_textEditSet = null;
            break;
        case "x_adminGroupChatSelectModal":
            $("#x_adminGroupChatSelectListSearchInput").val("");
            break;
        case "x_adminGroupNewModal":
            hideModalHelper("#x_adminGroupNewModal", "#x_adminGroupNewHelp");
            break;
        case "x_adminGroupChatNew":
            hideModalHelper("#x_adminGroupChatNew", "#x_adminGroupChatNewHelp");
            break;
        case "x_adminPolicyDelete":
            $("#x_adminPolicyDelete .body").text("");
            break;
        case "x_adminGroupDelete":
            $("#x_adminGroupDelete .body").text("");
            break;
        case "x_adminGroupChatMembersManageModal":
            hideModalHelper("#x_adminGroupChatMembersManageModal", "#x_adminGroupChatMembersManageHelp");
            break;
        case "x_domainPolicyDomainModal":
            hideModalHelper("#x_domainPolicyDomainModal", "#x_domainPolicyDomainHelp");
            break;
        case "x_domainPolicySettingsModal":
            hideModalHelper("#x_domainPolicySettingsModal", "#x_domainPolicySettingsHelp");
            break;
        case "x_domainPolicyIMSettingsModal":
            hideModalHelper("#x_domainPolicyIMSettingsModal", "#x_domainPolicyIMSettingsHelp");
            break;
        case "x_domainGroupChatPrivateListModal":
            hideModalHelper("#x_domainGroupChatPrivateListModal", "#x_domainGroupChatPrivateListHelp")
        }
    });
    $(".overlay").fadeOut();
    g_currentModal = null
}
$("#x_forgotPasswordButton").click(function() {
    addEvent("chat", "forgotpassword_show");
    showModal("#x_forgotPasswordModal");
    $("#x_forgotPasswordUsername").focus()
});
$("#x_forgotPasswordBody input").on("keydown", function(a) {
    13 == a.which && $("#x_forgotPasswordRequest").click();
    27 == a.which && $("#x_forgotPasswordCancel").click()
});
$("#x_forgotPasswordCancel").click(function() {
    hideModal("#x_forgotPasswordModal")
});
$("#x_forgotPasswordRequest").click(function() {
    $("#x_forgotPasswordBody").find("input").removeClass("error");
    $("#x_forgotPasswordModal .warning").text("");
    $("#x_forgotPasswordModal .warning").hide();
    var a = $("#x_forgotPasswordUsername").val()
      , b = $("#x_forgotPasswordEmail").val();
    if (!a)
        return $("#x_forgotPasswordUsername").addClass("error"),
        $("#x_forgotPasswordUsername").focus(),
        !1;
    if (!b)
        return $("#x_forgotPasswordEmail").addClass("error"),
        $("#x_forgotPasswordEmail").focus(),
        !1;
    $("#x_forgotPasswordEmail").attr("disabled", "disabled");
    $("#x_forgotPasswordRequest").addClass("disabled");
    $("#x_forgotPasswordRequest").text("Requesting ...");
    (new User).requestPassword(a, b, function(a, b) {
        $("#x_forgotPasswordEmail").removeAttr("disabled");
        $("#x_forgotPasswordRequest").removeClass("disabled");
        $("#x_forgotPasswordRequest").text("Request");
        addEvent("chat", "forgotpassword_" + a);
        "success" != a ? ($("#x_forgotPasswordUsername").addClass("error"),
        $("#x_forgotPasswordUsername").focus(),
        $("#x_forgotPasswordEmail").addClass("error"),
        $("#x_forgotPasswordModal .warning").html(b),
        $("#x_forgotPasswordModal .warning").fadeIn()) : ($("#x_forgotPasswordBody").hide(),
        $("#x_forgotPasswordSuccess").show(),
        $("#x_forgotPasswordRequest").hide(),
        $("#x_forgotPasswordCancel").text("Close"));
        resize()
    })
});
$("#x_forgotUsernameButton").click(function() {
    addEvent("chat", "forgotusername_show");
    null != g_currentModal ? replaceModal("#x_forgotPasswordModal", "#x_forgotUsernameModal") : showModal("#x_forgotUsernameModal");
    $("#x_forgotUsernameEmail").focus()
});
$("#x_forgotUsernameBody input").on("keydown", function(a) {
    13 == a.which && $("#x_forgotUsernameRequest").click();
    27 == a.which && $("#x_forgotUsernameCancel").click()
});
$("#x_forgotUsernameCancel").click(function() {
    hideModal("#x_forgotUsernameModal")
});
$("#x_forgotUsernameRequest").click(function() {
    $("#x_forgotUsernameBody").find("input").removeClass("error");
    $("#x_forgotUsernameModal .warning").text("");
    $("#x_forgotUsernameModal .warning").hide();
    var a = $("#x_forgotUsernameEmail").val();
    if (!a)
        return $("#x_forgotUsernameEmail").addClass("error"),
        $("#x_forgotUsernameEmail").focus(),
        !1;
    $("#x_forgotUsernameEmail").attr("disabled", "disabled");
    $("#x_forgotUsernameRequest").addClass("disabled");
    $("#x_forgotUsernameRequest").text("Requesting ...");
    (new User).requestUsername(a, function(a, c) {
        $("#x_forgotUsernameEmail").removeAttr("disabled");
        $("#x_forgotUsernameRequest").removeClass("disabled");
        $("#x_forgotUsernameRequest").text("Request");
        addEvent("chat", "forgotusername_" + a);
        "success" != a ? ($("#x_forgotUsernameEmail").addClass("error"),
        $("#x_forgotUsernameEmail").focus(),
        $("#x_forgotUsernameModal .warning").html(c),
        $("#x_forgotUsernameModal .warning").fadeIn()) : ($("#x_forgotUsernameBody").hide(),
        $("#x_forgotUsernameSuccess").show(),
        $("#x_forgotUsernameRequest").hide(),
        $("#x_forgotUsernameCancel").text("Close"));
        resize()
    })
});
$("#signup_button").click(function() {
    addEvent("chat", "signup_show");
    showModal("#signupModal");
    $("#au").focus();
    return !1
});
$("#div_signup input").on("keydown", function(a) {
    13 == a.which && $("#signupContinue").click();
    27 == a.which && $("#signupCancel").click()
});
$("#signupCancel").click(function() {
    hideModal("#signupModal")
});
$("#signupContinue").click(function() {
    $("#div_signup").find("input").removeClass("error");
    $("#signupModal .warning").text("");
    $("#signupModal .warning").hide();
    $("#au").val($("#au").val().toLowerCase());
    var a = $("#au").val()
      , b = $("#ap").val()
      , c = $("#apc").val()
      , d = $("#ae").val()
      , e = !1;
    6 > a.length ? (e = "#au",
    $("#au").addClass("error"),
    $("#signupModal .warning").text("Usernames must be at least 8 characters."),
    $("#signupModal .warning").fadeIn()) : 8 > b.length ? (e = "#ap",
    $("#ap").addClass("error"),
    $("#signupModal .warning").text("Passwords must be at least 8 characters."),
    $("#signupModal .warning").fadeIn()) : b != c ? (e = "#apc",
    $("#ap, #apc").addClass("error"),
    $("#signupModal .warning").text("Passwords do not match."),
    $("#signupModal .warning").fadeIn()) : d ? $("#x_signupAgreement").is(":checked") || (e = "#x_signupAgreement",
    $("#x_signupAgreement").addClass("error"),
    $("#signupModal .warning").text("You must agree to the Terms of Service."),
    $("#signupModal .warning").fadeIn()) : (e = "#ae",
    $("#ae").addClass("error"));
    if (e)
        return $(e).focus(),
        resize(),
        !1;
    $("#au, #ap, #apc, #ae").attr("disabled", "disabled");
    $("#signupContinue").addClass("disabled");
    $("#signupContinue").text("Signing up ...");
    register(a, b, d, function(c, d, e) {
        "success" != c && ($("#au, #ap, #apc, #ae").removeAttr("disabled"),
        $("#signupContinue").removeClass("disabled"),
        $("#signupContinue").text("Sign up"));
        switch (c) {
        case "invalid":
            $("#" + d).addClass("error");
            $("#" + d).focus();
            e && ($("#signupModal .warning").html(e),
            $("#signupModal .warning").fadeIn(),
            resize());
            break;
        case "error":
            $("#signupModal .warning").text("Error during registration.  Please try again.");
            $("#signupModal .warning").fadeIn();
            resize();
            break;
        case "failure":
            $("#signupModal .warning").html(e);
            $("#signupModal .warning").fadeIn();
            resize();
            d && "astra" == d && ($("#au").addClass("error"),
            $("#au").focus());
            break;
        case "success":
            hideModal("#signupModal"),
            g_controller.sessionLogin(a, b),
            ui_sessionLogin(a)
        }
        "failure" == c && d && "astra" == d ? addEvent("chat", "signup_failure_taken") : addEvent("chat", "signup_" + c);
        "success" == c && setTimeout(function() {
            $("#au, #ap, #apc, #ae").removeAttr("disabled");
            $("#signupContinue").removeClass("disabled");
            $("#signupContinue").text("Sign up")
        }, 1E3)
    })
});
$("#x_settingsStoreHistoryToggle").click(function() {
    if (!g_membershipPro)
        return showModal("#proModal"),
        !1;
    g_privacyCloudLogging = !g_privacyCloudLogging;
    ui_privacyCloudLoggingUpdate();
    g_controller.privacyCloudLoggingUpdate(g_privacyCloudLogging)
});
$("#x_settingsAutoHistoryToggle").click(function() {
    if (!g_membershipPro)
        return showModal("#proModal"),
        !1;
    g_privacyAutoHistory = !g_privacyAutoHistory;
    ui_privacyAutoHistoryUpdate();
    g_controller.privacyAutoHistoryUpdate(g_privacyAutoHistory)
});
$("#x_diagnosticLogToConsole").click(function() {
    g_controller.g_consoleLog = g_controller.g_consoleLog ? !1 : !0;
    g_controller.g_consoleLog ? $(this).append('<span id="debugging"> - logging to console </div>') : $("#debugging").remove()
});
$("#authRequests").on("click", ".authbutton", function() {
    var a = $(this).data("connection")
      , b = $(this).data("username")
      , c = $(this).data("medium")
      , d = $(this).hasClass("accept") ? "accept" : "reject";
    g_controller.authorizationResponse(a, b, d, c, "default")
});
function resize() {
    var a = 0
      , b = 0;
    $("#settings").is(":visible");
    $(".right .warning").is(":visible") && (a = 45);
    g_adVisible && (b = 30);
    var c = 0
      , d = 1126
      , e = 20
      , f = 310;
    $("#trillian").is(":visible") && (f = 210);
    if (!$("#login").is(":visible")) {
        1126 < $(this).width() ? ($(".limitable").addClass("limited"),
        $(".mode").show()) : ($(".limitable").removeClass("limited"),
        0 == b ? ($(".mode").hide(),
        e = 0) : ($(".mode").show(),
        e = 10),
        d = $(this).width());
        c = Math.max(f, $(this).height() - 50 - e - b);
        $(".modalFullHeight").css("height", c - 174);
        $(".modalFullImage").each(function() {
            var a = $(this).find("img");
            $(this).css("max-height", c - 174);
            $(this).css("max-width", d - 30);
            $(this).css("width", a[0].naturalWidth + 30);
            $(this).css("height", a[0].naturalHeight + 30);
            c - 174 > a[0].height && $(this).css("max-height", a[0].height);
            $("#adminTextShowModal").css("width", a[0].width + 30);
            $("#adminTextShowModal").css("min-width", "400px");
            a = Math.max(a[0].width + 30, 400);
            $("#adminTextShowModal").css("margin-left", -1 * a / 2)
        });
        g_messages_cached_element.css("min-height", c - 78 - 60);
        g_nicklist_cached_element.css("max-height", c - 400);
        g_chats_cached_element.css("height", c - 68 - 60);
        g_tabs_cached_element.css("height", c - 60);
        g_contacts_cached_element.css("height", c - 68 - 60);
        g_drop_cached_element.css("height", c);
        g_left_cached_element.height(c + "px");
        g_groups_cached_element.css("height", c);
        g_users_cached_element.css("height", c);
        g_right_cached_element.height(c - a + "px");
        g_welcome_cached_element.height(c - a + "px");
        g_welcome_cached_element.css("width", d - 280 + "px");
        g_messages_cached_element.css("width", d - 280 + "px");
        $("#x_chatName").css("max-width", d - 280 - 300);
        $("#x_editAttachment").css("max-width", d - 280 - 300);
        g_helpvalue_cached_element.css("max-width", Math.max(190, d - 280 - 360));
        try {
            g_bubble_cached_maxwidth_rule.style.maxWidth = g_messages_cached_element.width() - g_bubble_cached_displacement + "px"
        } catch (g) {}
        null == g_oldScrollLocation && (g_oldScrollLocation = g_messages_cached_element.scrollTop());
        g_messages_cached_element.scrollTop(g_oldScrollLocation + (g_window_old_size - c));
        g_window_old_size = c;
        g_oldScrollLocation = g_messages_cached_element.scrollTop();
        g_currentModal && g_currentModal.css("top", $(window).height() / 2 - g_currentModal.height() / 2)
    }
}
g_messages_cached_element.scroll(function(a) {
    g_oldScrollLocation = g_messages_cached_element.scrollTop()
});
function login() {
    var a = $.trim($("#x_loginUsername").val());
    $("#x_loginUsername").val(a);
    var a = $("#x_loginUsername").val()
      , b = $("#x_loginPassword").val();
    if (0 == a.length && 0 == b.length)
        return $("#x_loginUsername").focus();
    0 == a.length || 0 == b.length ? (0 == a.length ? $("#x_loginUsername").focus() : $("#x_loginPassword").focus(),
    setAlert("<strong>Invalid username or password!</strong> Please check your username and password and try again.")) : (addEvent("chat", "session_login", g_fullVersion),
    g_controller.sessionLogin(a, b),
    ui_sessionLogin(a))
}
function updateContactlist(a) {
    a ? buildContactlist() : g_contactlistUpdatePending || (g_contactlistUpdatePending = !0,
    setTimeout(buildContactlist, 1E3))
}
function buildContactlist() {
    var a = $("#contacts").scrollTop()
      , b = g_setting["contactlist.groupby"];
    g_contactlistUpdatePending = !1;
    $("#x_contacts").children().remove();
    for (var c = 0; c < $.fn.appear.checks.length; c++)
        $.fn.appear.windows[c].unbind("scroll", $.fn.appear.checks[c]);
    $.fn.appear.checks = [];
    $.fn.appear.windows = [];
    g_avatarsRequested = [];
    var d = []
      , e = []
      , f = []
      , g = []
      , h = ""
      , k = [];
    k.metacontact = !0;
    k.astra = !0;
    for (c = 0; c < g_controller.g_accounts.length; c++) {
        var l = g_controller.g_accounts[c].medium
          , m = g_controller.g_accounts[c].status;
        "offline" != m && m && 0 < m.length && (k[l.toLowerCase()] = !0)
    }
    for (var p = [], c = 0; c < g_controller.g_contacts.length; c++) {
        var n = g_controller.g_contacts[c];
        n.group && -1 != n.group.indexOf("metacontact:") && n.iconhash && 0 < n.iconhash.length && (p[n.group] || (p[n.group] = n))
    }
    for (c = 0; c < g_controller.g_contacts.length; c++)
        if (n = g_controller.g_contacts[c],
        (!n.group || -1 == n.group.indexOf("metacontact:")) && (g_controller.g_showOfflineContacts || "offline" != n.status && "auth" != n.status) && 1 == k[n.medium.toLowerCase()]) {
            "groups" == b && n.group != h && (l = "" == h ? !0 : !1,
            h = n.group,
            l ? $("#x_contacts").append("<div class='group first'>" + htmlEncode(h.toUpperCase()) + "</div>") : $("#x_contacts").append("<div class='group'>" + htmlEncode(h.toUpperCase()) + "</div>"));
            n.iconrealname = n.realname;
            n.iconmedium = n.medium;
            "METACONTACT" == n.medium && (l = p["metacontact:" + n.realname]) && (n.iconhash = l.iconhash,
            n.iconrealname = l.realname,
            n.iconmedium = l.medium);
            "groups" == b && ($("#x_contacts").append(contactHtml(n)),
            requestAvatarWhenAppears(n, "#x_contacts"));
            var q = l = n.medium;
            "ASTRA" == l && (q = "1_ASTRA");
            if ("ASTRA" == l && n.isGroup && (l = "Group Chats",
            q = "1_ASTRA:Group Chats",
            domainUser())) {
                var r = n.realname.substr(n.realname.indexOf("@") + 1);
                -1 == g_username.indexOf(r) ? (l = r + " Group Chats",
                q = "1_ASTRA:" + r + ":1_Group Chats") : (l = r + " Group Chats",
                q = "0_ASTRA:1_Group Chats")
            }
            if (domainUser() && "ASTRA" == l && -1 != n.realname.indexOf("@"))
                if (l = n.realname.substr(n.realname.indexOf("@") + 1),
                q = "0_ASTRA",
                null != n.servergroup) {
                    void 0 == d[l] && (d[l] = []);
                    void 0 == e[l] && (e[l] = q);
                    for (var q = q + ":0_", t = n.servergroup.split(":"), r = 0; r < t.length; r++) {
                        var u = decodeURIComponent(t[r]);
                        if (0 == u.length)
                            break;
                        l = u;
                        q += ":" + l;
                        void 0 == d[l] && (d[l] = []);
                        void 0 == e[l] && (e[l] = q)
                    }
                } else
                    -1 == g_username.indexOf(l) && (q = "1_ASTRA:" + l + ":0_");
            void 0 == d[l] && (d[l] = []);
            void 0 == e[l] && (e[l] = q);
            d[l].push(n);
            void 0 == f[n.status] && (f[n.status] = []);
            f[n.status].push(n);
            g.push(n)
        }
    if ("service" == b)
        for (h = Object.keys(d),
        h.sort(function(a, b) {
            var c = e[b];
            return e[a].toLowerCase().localeCompare(c.toLowerCase())
        }),
        c = 0; c < h.length; c++) {
            l = h[c];
            k = mediumDisplay(l);
            0 == c && g_domain && g_domain.domainname && l.toLowerCase() == g_domain.domainname.toLowerCase() ? $("#x_contacts").append("<div id='x_contactDomainInvite' class='group first click haschildren' title='" + k + "'>" + k.toUpperCase() + "<span class='add' title='Invite more users ...'>+</span></div>") : 0 == c ? $("#x_contacts").append("<div class='group first' title='" + k + "'>" + k.toUpperCase() + "</div>") : $("#x_contacts").append("<div class='group' title='" + k + "'>" + k.toUpperCase() + "</div>");
            d[l].sort(g_controller.contactSort);
            for (r = 0; r < d[l].length; r++)
                $("#x_contacts").append(contactHtml(d[l][r])),
                requestAvatarWhenAppears(d[l][r], "#x_contacts");
            $("#x_contactDomainInvite").click(function() {
                domainUserInvite(!1)
            })
        }
    g.sort(g_controller.contactSort);
    if ("abc" == b)
        for (c = 0; c < g.length; c++)
            $("#x_contacts").append(contactHtml(g[c])),
            requestAvatarWhenAppears(g[c], "#x_contacts");
    if ("status" == b) {
        b = [];
        for (m in f)
            "indexOf" != m && b.push(m);
        b.sort(g_controller.statusSort);
        for (c = 0; c < b.length; c++)
            for (m = b[c],
            0 == c ? $("#x_contacts").append("<div class='group first'>" + getStatusLabel(m).toUpperCase() + "</div>") : $("#x_contacts").append("<div class='group'>" + getStatusLabel(m).toUpperCase() + "</div>"),
            f[m].sort(g_controller.contactSort),
            r = 0; r < f[m].length; r++)
                $("#x_contacts").append(contactHtml(f[m][r])),
                requestAvatarWhenAppears(f[m][r], "#x_contacts")
    }
    domainUser() ? $("#x_contacts").append("<div id='x_contactGroupTextAdd' class='group click'><span>FEDERATED CONTACTS</span><span class='add' title='Add a contact ...'>+</span></div><div id='x_contactGroupAdd' class='textadd click'>Add a federated contact ...</div>") : $("#x_contacts").append("<div id='x_contactGroupTextAdd' class='group click'><span>MORE CONTACTS</span><span class='add' title='Add a contact ...'>+</span></div><div id='x_contactGroupAdd' class='textadd click'>Add a contact ...</div>");
    $("#x_contactGroupTextAdd, #x_contactGroupAdd").click(function() {
        ui_addContactModal()
    });
    a = Math.min(a, $("#x_contacts").height());
    a = Math.max(0, a);
    $("#contacts").scrollTop(a)
}
function accounts() {
    ui_accountsUpdate(!0)
}
function ui_accountsUpdate(a) {
    $("#div_accounts").children().remove();
    a && g_controller.g_accounts.sort(g_controller.accountSort);
    for (a = 0; a < g_controller.g_accounts.length; a++) {
        var b = ""
          , c = g_controller.g_accounts[a].medium
          , d = g_controller.g_accounts[a].name
          , e = g_controller.g_accounts[a].medium + g_controller.g_accounts[a].name.replace(/[^A-Za-z0-9]/g, "_")
          , f = g_controller.g_accounts[a].status
          , g = mediumDisplay(c);
        if ("FACEBOOK" != c || -1 != d.indexOf("@"))
            "offline" != f && f && 0 < f.length && (b = "checked"),
            f = "",
            "password-fail" == g_controller.g_accounts[a].alertType && (f = "<span class='alert'>Invalid username or password.</span>"),
            b = "<div class='account'><input type='checkbox' id='" + e + "' " + b + "><label class='checkbox' for='" + e + "'>" + g_controller.g_accounts[a].name + "</label><span class='medium'>" + g + "</span>" + f + "<span class='button helpbutton' id='" + e + "_edit'>Edit</span></div>",
            $("#div_accounts").append(b),
            $("#" + e).data("name", d),
            $("#" + e).data("medium", c),
            $("#" + e).data("identity", "default"),
            $("#" + e).change(function() {
                var a = this.checked ? "c=identityAccountConnect&username=" + encodeURIComponent($(this).data("name")) + "&medium=" + $(this).data("medium") + "&identity=default" : "c=identityAccountDisconnect&username=" + encodeURIComponent($(this).data("name")) + "&medium=" + $(this).data("medium") + "&identity=default";
                g_controller.addPacket(a)
            }),
            $("#" + e + "_edit").data("name", d),
            $("#" + e + "_edit").data("medium", c),
            $("#" + e + "_edit").click(function() {
                accountEdit($(this).data("medium"), $(this).data("name"), "default")
            })
    }
    updateNewsFeed();
    resizeModal()
}
function ui_errorStateClear() {
    $("#x_alertCount").text("").hide();
    return $("#settings div[tab]").removeClass("error")
}
function ui_errorStateSet(a, b) {
    if (!b)
        return $(".settings div[tab=" + a + "]").removeClass("error");
    $("#x_alertCount").text("!").show();
    return $("#settings div[tab=" + a + "]").addClass("error")
}
function ui_product_info(a, b, c, d) {
    a = a + " - Version " + b + " Build " + c + " (" + d + ")";
    $("#x_version").attr("title", a)
}
function ui_accountRemoved(a, b, c) {
    $("#" + a + b.replace(/[^A-Za-z0-9]/g, "_")).parent().remove()
}
function ui_updateAuthorizationRequests() {
    $("#x_authRequestHeader").hide();
    $("#authRequests").children().remove();
    for (var a = 0; a < g_controller.g_authrequest.length; a++) {
        var b = authrequestHtml(g_controller.g_authrequest[a].connection, g_controller.g_authrequest[a].username, g_controller.g_authrequest[a].displayname, g_controller.g_authrequest[a].iconhash, g_controller.g_authrequest[a].medium);
        $("#authRequests").append(b);
        g_controller.avatarRequest(g_controller.g_authrequest[a].iconhash, g_controller.g_authrequest[a].medium, g_controller.g_authrequest[a].username, "default");
        $("#x_authRequestHeader").show()
    }
}
function ui_newAccountAvailable() {
    return domainUser() ? "0" == g_policy["trillian.plugin.oscar"] && "0" == g_policy["trillian.plugin.facebook"] && "0" == g_policy["trillian.plugin.msn"] && "0" == g_policy["trillian.plugin.xmpp"] && "0" == g_policy["trillian.plugin.myspace"] && "0" == g_policy["trillian.plugin.yahoo"] ? !1 : !0 : !0
}
function ui_policyUpdate() {
    $("#chats div[window]").each(function() {
        var a = $(this).attr("window")
          , a = messageWindow(a);
        ui_addWindowToList($(this), a.group, !a.flag_disable_list, !1)
    });
    ui_updateWindowList();
    var a = messageWindow(g_messageIdFocus);
    a && ui_messageUpdateBanner(a);
    "server" == g_policy["trillian.filetransfer"] ? ($(".file_button").show(),
    $("#x_fileInput").attr("accept", "*")) : "server" == g_policy["trillian.media"] ? ($(".file_button").show(),
    $("#x_fileInput").attr("accept", "image/*")) : $(".file_button").hide();
    "0" == g_policy["trillian.password_changing"] ? $(".domain_policy_password").hide() : $(".domain_policy_password").show();
    "0" == g_policy["trillian.plugin.oscar"] ? ($("#add_account_medium").children("option[value^=AIM]").attr("disabled", "disabled"),
    $("#add_account_medium").children("option[value^=ICQ]").attr("disabled", "disabled")) : ($("#add_account_medium").children("option[value^=AIM]").removeAttr("disabled"),
    $("#add_account_medium").children("option[value^=ICQ]").removeAttr("disabled"));
    "0" == g_policy["trillian.plugin.facebook"] ? $("#add_account_medium").children("option[value^=FACEBOOK]").attr("disabled", "disabled") : $("#add_account_medium").children("option[value^=FACEBOOK]").removeAttr("disabled");
    "0" == g_policy["trillian.plugin.msn"] ? $("#add_account_medium").children("option[value^=MSN]").attr("disabled", "disabled") : $("#add_account_medium").children("option[value^=MSN]").removeAttr("disabled");
    "0" == g_policy["trillian.plugin.xmpp"] ? ($("#add_account_medium").children("option[value^=JABBER]").attr("disabled", "disabled"),
    $("#add_account_medium").children("option[value^=GOOGLE]").attr("disabled", "disabled")) : ($("#add_account_medium").children("option[value^=JABBER]").removeAttr("disabled"),
    $("#add_account_medium").children("option[value^=GOOGLE]").removeAttr("disabled"));
    "0" == g_policy["trillian.plugin.yahoo"] ? $("#add_account_medium").children("option[value^=YAHOO]").attr("disabled", "disabled") : $("#add_account_medium").children("option[value^=YAHOO]").removeAttr("disabled");
    $("#add_account_medium option:not([disabled])").show();
    $("#add_account_medium option:disabled").hide();
    $("#add_account_medium").val($("#add_account_medium option:not([disabled]):first").val())
}
function authrequestHtml(a, b, c, d, e) {
    var f = $(document.createElement("div"));
    f.attr("title", b);
    f.addClass("helpline");
    var g = $(document.createElement("span"));
    g.addClass("avatar");
    g.appendTo(f);
    var h = $(document.createElement("img"));
    h.attr("iconhash", d);
    h.attr("src", "img/blank.gif");
    h.appendTo(g);
    d = $(document.createElement("span"));
    d.addClass("helplabel");
    d.text(c);
    d.appendTo(f);
    c = $(document.createElement("span"));
    c.addClass("helpbutton");
    c.appendTo(f);
    d = $(document.createElement("span"));
    d.addClass("button authbutton accept");
    d.text("Accept and Add");
    d.data("connection", a);
    d.data("username", b);
    d.data("medium", e);
    d.appendTo(c);
    d = $(document.createElement("span"));
    d.addClass("button authbutton reject delete");
    d.text("Dismiss");
    d.data("connection", a);
    d.data("username", b);
    d.data("medium", e);
    d.appendTo(c);
    a = $(document.createElement("img"));
    a.css("float", "right");
    a.css("margin-top", "12px");
    a.attr("src", "img/mediums/" + e + ".png");
    a.appendTo(f);
    return f
}
function settings() {
    g_sendDiagnosticLog = !1;
    $("#x_sendDiagnosticLogDevice").text("Send Diagnostic Log");
    $("#displayname_editbox").val(g_controller.g_displayname);
    updateNotificationsSetting();
    $("#settings").show();
    g_controller.focused(!1);
    $("#trillian").hide();
    g_controller.windowTitleUpdate()
}
function setAlert(a) {
    $("#x_loginError").html(a).show()
}
function accountDeleteRequest(a, b, c) {
    g_controller.accountRemove(a, b, c);
    return !0
}
function accountDeleteAsk(a, b, c) {
    $("#div_delete_account").html("Are you sure you want to delete <b>" + htmlEncode(b) + "</b> on " + mediumDisplay(a) + "?</center>");
    $("#accountDeleteConfirm").data("medium", a);
    $("#accountDeleteConfirm").data("username", b);
    $("#accountDeleteConfirm").data("identity", c);
    showModal("#accountDeleteModal")
}
function accountEdit(a, b, c) {
    $("#div_edit_account_title").text(b);
    $("#accountSettingsModal .interfaceOpen").empty();
    $("#accountSettingsModal .interfaceLoading").show();
    $("#accountSettingsProblem").text("").hide();
    $("#accountSettingsPassword").hide();
    $("#badpassword").val("");
    for (var d = 0; d < g_controller.g_accounts.length; d++)
        if (g_controller.g_accounts[d].medium == a && g_controller.g_accounts[d].name == b && g_controller.g_accounts[d].alertType) {
            var e = g_controller.g_accounts[d].alertType
              , f = g_controller.g_accounts[d].alertText;
            $("#accountSettingsProblem").text(f).show();
            "password-fail" == e && ($("#accountSettingsPassword").show(),
            setTimeout(function() {
                $("#badpassword").focus()
            }, 250))
        }
    showModal("#accountSettingsModal");
    $("#accountSettingsMessage").text("").hide();
    "ASTRA" == a ? $("#accountSettingsDelete").hide() : $("#accountSettingsDelete").show();
    $("#accountSettingsDelete, #accountSettingsSave").data("medium", a);
    $("#accountSettingsDelete, #accountSettingsSave").data("username", b);
    $("#accountSettingsDelete, #accountSettingsSave").data("identity", c);
    g_controller.accountSettings(a, b, c);
    return !0
}
function contactEdit(a, b, c, d) {
    contactEditWithID(a, b, c, -1, d)
}
function contactEditWithID(a, b, c, d, e) {
    $("#contactSettingsModal").data("medium", a);
    $("#contactSettingsModal").data("username", b);
    $("#contactSettingsModal").data("identity", c);
    $("#contactSettingsModal").data("account", e);
    $("#contactSettingsModal").data("connection", d);
    if (e = g_controller.g_contacts[g_controller.getContactEnum(a, b)]) {
        var f = e.displayname;
        "#" == b[0] ? ($("#div_edit_contact_title").text(f + " on " + mediumDisplay(a)),
        $("#contactSettingsDelete").hide()) : ($("#div_edit_contact_title").text(b + " on " + mediumDisplay(a)),
        "astra" == a.toLowerCase() && domainUser() && domainMatches(g_username, b) ? $("#contactSettingsDelete").hide() : $("#contactSettingsDelete").show());
        $("#x_contactSettingsName").val(b);
        var g = messageWindow(g_messageIdFocus);
        g && g.group && g.username == b && octopusProtocol2() ? ($("#contactSettingsModal").data("window", g_messageIdFocus),
        $("#x_contactSettingsTopicDiv").show(),
        $("#x_contactSettingsTopic").val(g.topic),
        $("#x_contactSettingsGroupFlagsDiv").show(),
        $("#x_contactSettingsGroupChatHelp").show(),
        g.caps_topic_editable ? $("#x_contactSettingsTopic").removeAttr("disabled") : $("#x_contactSettingsTopic").attr("disabled", "disabled"),
        g.flag_disable_displayname_set ? $("#x_contactSettingsFlagDisableDisplayNameSet").attr("checked", "checked") : $("#x_contactSettingsFlagDisableDisplayNameSet").removeAttr("checked"),
        g.flag_disable_topic_set ? $("#x_contactSettingsFlagDisableTopicSet").attr("checked", "checked") : $("#x_contactSettingsFlagDisableTopicSet").removeAttr("checked"),
        g.flag_disable_list ? $("#x_contactSettingsFlagDisableList").attr("checked", "checked") : $("#x_contactSettingsFlagDisableList").removeAttr("checked"),
        g.flag_disable_member_add ? $("#x_contactSettingsFlagDisableMemberAdd").attr("checked", "checked") : $("#x_contactSettingsFlagDisableMemberAdd").removeAttr("checked"),
        g.flag_disable_member_remove ? $("#x_contactSettingsFlagDisableMemberRemove").attr("checked", "checked") : $("#x_contactSettingsFlagDisableMemberRemove").removeAttr("checked"),
        g.flag_disable_message_send ? $("#x_contactSettingsFlagDisableMessageSend").attr("checked", "checked") : $("#x_contactSettingsFlagDisableMessageSend").removeAttr("checked"),
        g.caps_groupchat_flags_editable ? ($("#x_contactSettingsFlagDisableDisplayNameSet").removeAttr("disabled"),
        $("#x_contactSettingsFlagDisableTopicSet").removeAttr("disabled"),
        $("#x_contactSettingsFlagDisableList").removeAttr("disabled"),
        $("#x_contactSettingsFlagDisableMemberAdd").removeAttr("disabled"),
        $("#x_contactSettingsFlagDisableMemberRemove").removeAttr("disabled"),
        $("#x_contactSettingsFlagDisableMessageSend").removeAttr("disabled")) : ($("#x_contactSettingsFlagDisableDisplayNameSet").attr("disabled", "disabled"),
        $("#x_contactSettingsFlagDisableTopicSet").attr("disabled", "disabled"),
        $("#x_contactSettingsFlagDisableList").attr("disabled", "disabled"),
        $("#x_contactSettingsFlagDisableMemberAdd").attr("disabled", "disabled"),
        $("#x_contactSettingsFlagDisableMemberRemove").attr("disabled", "disabled"),
        $("#x_contactSettingsFlagDisableMessageSend").attr("disabled", "disabled")),
        (g = g_domain ? g_domain.getPolicy(g_domain.policy) : null) && "1" == g.value["trillian.groupchat.join.impp"] ? $("#x_contactSettingsFlagDisableList").parent().show() : $("#x_contactSettingsFlagDisableList").parent().hide()) : ($("#x_contactSettingsTopicDiv").hide(),
        $("#x_contactSettingsGroupFlagsDiv").hide(),
        $("#x_contactSettingsGroupChatHelp").hide(),
        !octopusProtocol2() && g && g.group && g.username == b && $("#contactSettingsDisplayName").attr("disabled", "disabled"));
        $("#contactSettingsDisplayName").val(f);
        $("#contactSettingsModal .interfaceOpen").empty();
        $("#contactSettingsModal .interfaceLoading").show();
        e.isGroup || g_controller.contactSettings(a, b, c, d);
        showModal("#contactSettingsModal");
        return !0
    }
}
function contactDeleteRequest(a, b, c, d, e) {
    if ("#" == b[0])
        g_controller.groupchatRemove(a, b, c, d);
    else
        for (g_controller.contactRemove(a, b, c),
        c = 0; c < g_messageWindows.length; c++)
            g_messageWindows[c].medium == a && g_messageWindows[c].username == b && g_controller.messageClose(g_messageWindows[c].id, !0);
    $("#x_contacts").find("[medium=" + a + "][username='" + b + "']").remove();
    hideModal("#contactDeleteModal")
}
function contactDeleteAsk(a, b, c, d) {
    if ("#" == b[0]) {
        var e = g_controller.g_contacts[g_controller.getContactEnum(a, b)];
        $("#div_delete_contact").html("Are you sure you want to delete the group chat <b>" + htmlEncode(e.displayname) + "</b> on " + mediumDisplay(a) + "?</center>")
    } else
        $("#div_delete_contact").html("Are you sure you want to delete <b>" + htmlEncode(decodeURIComponent(b)) + "</b> on " + mediumDisplay(a) + "?</center>");
    $("#contactDeleteConfirm").data("medium", a);
    $("#contactDeleteConfirm").data("username", b);
    $("#contactDeleteConfirm").data("identity", c);
    $("#contactDeleteConfirm").data("connection", d);
    showModal("#contactDeleteModal")
}
$("#x_groupchatAdd").click(function() {
    $("#x_newChatFrom").children().remove();
    var a = messageWindow(g_messageIdFocus)
      , b = getAccountByConnection(a.connection);
    $("#x_newChatFrom").append('<option value="' + b.connection + '">' + b.name + " (" + mediumDisplay(b.medium) + ")</option>");
    $("#x_newChatFromDiv").hide();
    $("#x_newChatFrom").val(b);
    $("#x_newChatTo").val("");
    tokenSearchForConnection($("#x_newChatTo").val(), b, $("#x_newChatTokens .token"), a.nicks, !1);
    $("#x_newChatModal .header h4").text("Add People");
    $("#x_newChatLabel").text("Contacts");
    $("#x_newChatStart").text("Add");
    $("#x_newChatHelp").hide();
    $("#x_newChatWarning").show();
    showModal("#x_newChatModal");
    $("#x_newChatTo").focus()
});
$("#x_groupchatLeave").click(function() {
    var a = messageWindow(g_messageIdFocus);
    g_controller.groupchatLeave(a.medium, a.username, getAstraConnection().connection, "default")
});
function interfaceSave() {
    var a = $(".interfaceOpen:visible").data("xml")
      , b = $(".interfaceOpen:visible").data("id")
      , c = $("<result>" + a + "</result>");
    $(".interfaceOpen:visible").find("input").each(function() {
        if ("INPUT" == $(this).prop("nodeName")) {
            var a = $(this).attr("id");
            switch ($(this).attr("type")) {
            case "radio":
                var b = $(this).prop("checked") ? "1" : "0";
                c.find("field[var=" + a + "]").find("value").text(b);
                break;
            case "checkbox":
                b = $(this).prop("checked") ? "1" : "0";
                c.find("field[var=" + a + "]").find("value").text(b);
                break;
            default:
                b = $(this).val(),
                c.find("field[var=" + a + "]").find("value").text(b)
            }
        }
    });
    a = c.html().replace(/"/g, '"');
    a = $.base64.encode(a);
    a = encodeURIComponent(a);
    g_controller.addPacket("c=interfaceResult&id=" + b + "&xml=" + a)
}
function processInterfaceXmlChildren(a, b) {
    var c = $(a)
      , d = "";
    g_iteration++;
    c.children().length && c.children().each(function() {
        d += processInterfaceXmlNode(this, b, g_iteration)
    });
    return d
}
function processInterfaceXmlNode(a, b, c) {
    a = $(a);
    switch (a.prop("nodeName").toUpperCase()) {
    case "INTERFACE":
    case "PAGE":
    case "X":
    case "CS:CLUSTER":
        return processInterfaceXmlChildren(a, b);
    case "FIELD":
        return processInterfaceXmlField(a, b, c);
    case "CONTACT":
        return b = a.attr("name"),
        c = a.attr("medium"),
        a = a.attr("section"),
        '<contact medium="' + c + '" username="' + b + '" section="' + a + '"></contact>';
    case "ACCOUNT":
        return b = a.attr("name"),
        c = a.attr("medium"),
        '<account medium="' + c + '" username="' + b + '"></account>';
    default:
        return ""
    }
}
function processInterfaceXmlField(a, b, c) {
    var d = $(a);
    a = d.attr("type");
    var e = "";
    switch (a) {
    case "fixed":
        d = d.find("value").text();
        b(a, d) && (e = "<h4>" + d + "</h4>\n");
        break;
    case "text-single":
        var f = d.attr("var")
          , g = d.attr("label")
          , d = d.find("value").text();
        b(a, f) && (e = "<div>",
        e = (g ? e + ('<span class="label">' + g + "</span>") : e + '<span class="label"></span>') + ('<span class="value"><input type="text" id="' + f + '" value="' + d + '"></span>'),
        e += "</div>");
        break;
    case "boolean":
        f = d.attr("var");
        g = d.attr("label");
        d = d.find("value").text();
        c = 0 == d || "off" == d ? "" : "checked";
        -1 != g.indexOf("%") && (d = g.indexOf("%"),
        g = g.substring(0, d));
        b(a, f) && (e = '<div class="checkbox"><input type="checkbox" id="' + f + '" ' + c + '/><label for="' + f + '">' + g + "</label></div>");
        break;
    case "choice":
        f = d.attr("var"),
        g = d.attr("label"),
        d = d.find("value").text(),
        d = 0 == d || "off" == d ? "" : "checked",
        b(a, f) && (e = '<div class="checkbox"><input name="' + c + '" type="radio" id="' + f + '" ' + d + '/><label for="' + f + '">' + g + "</label></div>")
    }
    return e
}
function searchresultHtml(a, b, c, d, e, f) {
    c = $(document.createElement("div"));
    c.addClass("contact");
    f = $(document.createElement("div"));
    f.addClass("card");
    var g = $(document.createElement("div"));
    g.addClass("avatar");
    var h = $(document.createElement("img"));
    h.attr("src", "img/blank.gif");
    var k = g_controller.g_avatars[e];
    k && "pending" != k ? h.attr("src", k) : setTimeout(function() {
        h.attr("iconhash", e);
        g_controller.avatarRequest(e, d, a, "default")
    }, 10);
    h.attr("id", e);
    h.appendTo(g);
    g.append("<span class='border'></span>");
    k = $(document.createElement("div"));
    k.addClass("name");
    k.text(b);
    var l = $(document.createElement("div"));
    l.addClass("mediumstatus");
    var m = $(document.createElement("img"));
    m.addClass("medium");
    m.attr("src", "img/mediums/" + d + ".png");
    m.appendTo(l);
    m = $(document.createElement("div"));
    m.addClass("username");
    a != b && "#" != a[0] ? m.text(a).addClass("shown") : k.addClass("solo");
    f.append(g).append(l).append(k).append(m);
    c.append(f);
    return c
}
function mentionHtml(a, b, c, d) {
    var e = $(document.createElement("div"));
    e.addClass("contact");
    e.addClass("click");
    e.attr("username", a);
    e.attr("status", getStatusSimplified(c));
    c = $(document.createElement("div"));
    c.addClass("bottom");
    var f = $(document.createElement("span"));
    f.addClass("avatar");
    f.addClass("avatar30");
    if (d) {
        var g = $(document.createElement("img"));
        g.attr("src", "img/blank.gif");
        g.attr("iconhash", d);
        d && g_controller.g_avatars[d] && "pending" != g_controller.g_avatars[d] && g.attr("src", g_controller.g_avatars[d]);
        f.append(g)
    } else
        d = b.substr(0, 1).toUpperCase(),
        g = b.indexOf(" "),
        -1 != g && (d += b.substr(g + 1, 1).toUpperCase()),
        "Everyone in room" == b && (d = "@"),
        f.addClass("empty"),
        f.text(d);
    d = $(document.createElement("span"));
    d.addClass("name");
    d.text(b);
    d.addClass("solo");
    b = $(document.createElement("span"));
    b.addClass("realname");
    b.text(a);
    b.appendTo(d);
    a = $(document.createElement("span"));
    a.addClass("status");
    e.append(c).append(f).append(d).append(a);
    return e
}
function contactHtml(a) {
    var b = $(document.createElement("div"));
    b.addClass("contact");
    b.addClass("click");
    b.attr("medium", a.medium);
    b.attr("username", a.realname);
    b.attr("isGroup", a.isGroup ? "1" : "0");
    b.attr("account", a.account);
    a.isGroup && b.attr("groupchat", "1");
    b.attr("status", getStatusSimplified(a.status));
    var c = $(document.createElement("div"));
    c.addClass("bottom");
    var d = a.displayname;
    a.isGroup || a.displayname.toLowerCase() == a.realname.toLowerCase() || (d = a.displayname + " (" + a.realname + ")");
    "metacontact" != a.medium.toLowerCase() && (d += " on " + mediumDisplay(a.medium));
    d += "\nStatus: " + getStatusLabel(a.status);
    a.status_message && (d += "\nStatus Message: " + a.status_message.stripHtml());
    b.attr("title", d);
    d = $(document.createElement("span"));
    d.addClass("avatar");
    d.addClass("avatar30");
    if (a.iconhash) {
        var e = $(document.createElement("img"));
        e.attr("src", "img/blank.gif");
        e.attr("iconhash", a.iconhash);
        a.iconhash && g_controller.g_avatars[a.iconhash] && "pending" != g_controller.g_avatars[a.iconhash] && e.attr("src", g_controller.g_avatars[a.iconhash]);
        d.append(e)
    } else {
        var e = a.displayname.substr(0, 1).toUpperCase()
          , f = a.displayname.indexOf(" ");
        -1 != f && (e += a.displayname.substr(f + 1, 1).toUpperCase());
        a.isGroup && (e = "#");
        d.addClass("empty");
        d.text(e)
    }
    e = $(document.createElement("span"));
    e.addClass("name");
    e.text(a.displayname);
    a.status_message && 0 != a.status_message.length || e.addClass("solo");
    f = $(document.createElement("span"));
    f.addClass("status");
    var g = $(document.createElement("span"));
    g.addClass("message");
    a.status_message && g.text(a.status_message.stripHtml());
    var h = $(document.createElement("span"));
    h.addClass("medium");
    var k = $(document.createElement("img"));
    if ("METACONTACT" == a.medium) {
        for (var l = null, m = 0; m < g_controller.g_contacts.length; m++) {
            var p = g_controller.g_contacts[m];
            if (p.group && -1 != p.group.indexOf("metacontact:" + a.realname)) {
                l = p;
                break
            }
        }
        l && k.attr("src", "img/mediums/" + l.medium + ".png")
    } else
        k.attr("src", "img/mediums/" + a.medium + ".png");
    k.appendTo(h);
    k = $(document.createElement("span"));
    k.addClass("mute");
    l = isMuted(a.mutedUntil);
    0 < l && (k.html(g_muteSVG),
    setTimeout(function() {
        ui_contactlistMute(a)
    }, l + 1E3));
    b.append(c).append(d).append(e).append(h).append(f).append(g).append(k);
    return b
}
function updateNewsFeed() {
    var a = g_membershipFirstName;
    if (!a) {
        var a = g_displayname ? g_displayname : g_username
          , b = a.indexOf(" ");
        -1 != b && (a = g_displayname.substring(0, b))
    }
    b = new Date;
    9 == b.getMonth() && 28 <= b.getDate() ? $("#x_newsFeedGreeting").text("Happy Halloween, " + a + "!") : 17 <= b.getHours() || 4 > b.getHours() ? $("#x_newsFeedGreeting").text("Good Evening, " + a + "!") : 12 > b.getHours() ? $("#x_newsFeedGreeting").text("Good Morning, " + a + "!") : 12 <= b.getHours() && 17 > b.getHours() ? $("#x_newsFeedGreeting").text("Good Afternoon, " + a + "!") : $("#x_newsFeedGreeting").text("Welcome, " + a + "!");
    var a = domainUser() && g_domain && 1 == g_domain.users.length ? !0 : !1
      , c = 0
      , d = 0
      , e = 0;
    if (a)
        $("#x_newsFeedChats").hide();
    else {
        var f = domainUser() && octopusProtocol2();
        0 == g_policy["trillian.groupchat.join.impp"] && (f = !1);
        for (b = 0; b < g_messageWindows.length; b++) {
            var g = g_messageWindows[b];
            g.group ? g.flag_disable_list || !f ? d++ : c++ : e++
        }
        b = 1 == d + c ? "group chat" : "group chats";
        f = 1 == e ? "private chat" : "private chats";
        0 == e && 0 == d && 0 == c ? $("#x_newsFeedChats").html("You have <b>no open chats</b>.  Use the controls on the left to start a new chat.") : 0 == d && 0 == c ? $("#x_newsFeedChats").html("You have <b>" + e + "</b> " + f + " open.  Use the controls on the left to start a new chat or open an existing one.") : 0 == e ? $("#x_newsFeedChats").html("You have <b>" + parseInt(c + d) + "</b> " + b + " open.  Use the controls on the left to start a new chat or open an existing one.") : $("#x_newsFeedChats").html("You have <b>" + parseInt(c + d) + "</b> " + b + " and <b>" + e + "</b> " + f + " open.  Use the controls on the left to start a new chat or open an existing one.");
        $("#x_newsFeedChats").show();
        $("#x_newsFeedChatsAction").click(function() {
            addStatisticEvent("newsfeed_private");
            $("#x_chatsPrivate").click();
            return !1
        })
    }
    "invisible" == g_status ? ($("#x_newsFeedStatus").html("You are <b>invisible</b> to other contacts.  <a href='#' id='x_newsFeedStatusAction'>Change?</a>"),
    $("#x_newsFeedStatus").show(),
    $("#x_newsFeedStatus").attr("status", g_status)) : "dnd" == g_status ? ($("#x_newsFeedStatus").html("You are set to <b>do not disturb</b> and muting all notifications.  <a href='#' id='x_newsFeedStatusAction'>Change?</a>"),
    $("#x_newsFeedStatus").show(),
    $("#x_newsFeedStatus").attr("status", g_status)) : ($("#x_newsFeedStatus").html(""),
    $("#x_newsFeedStatus").hide());
    $("#x_newsFeedStatusAction").click(function() {
        addStatisticEvent("newsfeed_status");
        $(".identity_button").click();
        return !1
    });
    1 >= g_controller.g_devices.length ? $("#x_newsFeedDevices").html("You are only connected from your web browser.  You can also access Trillian from <a href='#' id='x_newsFeedDevicesAction'>desktop and mobile devices</a>.") : $("#x_newsFeedDevices").html("You are connected from <b>" + g_controller.g_devices.length + "</b> devices.  You can access Trillian from <a href='#' id='x_newsFeedDevicesAction'>desktop and mobile devices</a>.");
    $("#x_newsFeedDevices").show();
    $("#x_newsFeedDevicesAction").click(function() {
        addStatisticEvent("newsfeed_download");
        showModal("#x_downloadModal");
        return !1
    });
    if (domainUser())
        $("#x_newsFeedAccounts").hide();
    else {
        for (b = d = c = 0; b < g_accounts.length; b++)
            !g_accounts[b] || "FACEBOOK" == g_accounts[b].medium && -1 == g_accounts[b].name.indexOf("@") || (c++,
            void 0 != g_accounts[b].status && "offline" != g_accounts[b].status.toLowerCase() && d++);
        d == g_accounts.length ? $("#x_newsFeedAccounts").hide() : ($("#x_newsFeedAccounts").show(),
        $("#x_newsFeedAccounts").html("You are connected to <b>" + d + " of " + c + "</b> accounts.  You can manage your IM accounts in Settings from the top toolbar."))
    }
    domainUser() ? g_domain ? !a && g_domain.trialAlmostExpired ? ($("#x_newsFeedPro").show(),
    $("#x_newsFeedPro").html("You are using the <b>trial version</b> of Trillian for Business.  <a href='#' id='x_newsFeedProAction'>Upgrade today.</a>"),
    $("#x_newsFeedProAction").click(function() {
        addStatisticEvent("newsfeed_domain_pro");
        addEvent("chat", "domain_trialAdNewsFeed");
        domainSelectBilling("trial", null, 0, 0, null, 0, "year");
        return !1
    })) : $("#x_newsFeedPro").hide() : g_user && g_user.domain_trial ? ($("#x_newsFeedPro").show(),
    $("#x_newsFeedPro").html("Your company is using the <b>trial version</b> of Trillian for Business.  Tell your company to <b>upgrade today</b>.")) : $("#x_newsFeedPro").hide() : g_newsFeedPro ? ($("#x_newsFeedPro").show(),
    $("#x_newsFeedPro").html(g_newsFeedPro),
    $("#x_newsFeedProAction").click(function() {
        addStatisticEvent("newsfeed_pro");
        addEvent("chat", "pro_adNewsFeed");
        window.open("https://www.trillian.im/download/#pro", "_blank");
        return !1
    })) : $("#x_newsFeedPro").hide();
    if (domainUser() && g_domain && g_domain.domainname) {
        $("#x_newsFeedAdmin").show();
        for (b = c = 0; b < g_domain.users.length; b++)
            g_domain.users[b].deleted && c++;
        c = g_domain.users.length - c;
        b = g_domain.licensesAvailable;
        a ? ($("#x_newsFeedAdmin").html("You are an administrator for <b>" + g_domain.domainname + "</b>.  <a href='#' id='x_newsFeedAdminAction'>Invite some users to your company</a> to get started!"),
        $("#x_newsFeedAdminAction").click(function() {
            addStatisticEvent("newsfeed_admin");
            addEvent("chat", "newsfeed_adminAction");
            domainUserInvite(!1);
            return !1
        })) : g_domain.trial ? $("#x_newsFeedAdmin").html("You are an administrator for <b>" + g_domain.domainname + "</b>.  Administrative options can be found by clicking 'Admin' in the top toolbar.") : $("#x_newsFeedAdmin").html("You are an administrator for <b>" + g_domain.domainname + "</b> with <b>" + b + "</b> licenses available.  Administrative options can be found by clicking 'Admin' in the top toolbar.")
    } else
        $("#x_newsFeedAdmin").hide();
    $(".olark_available").is(":visible") ? $("#x_newsFeedHelp").html("Questions?  We're here to <b>help!</b>  <a href='/contact/' id='x_newsFeedHelpEmail' target='_blank'>Drop us an email</a> or <a href='#' id='x_newsFeedHelpChat'>chat with us live</a>.") : $("#x_newsFeedHelp").html("Questions?  We're here to <b>help!</b>  <a href='/contact/' id='x_newsFeedHelpEmail' target='_blank'>Drop us an email</a> anytime.");
    $("#x_newsFeedHelpChat").click(function() {
        addStatisticEvent("newsfeed_olark");
        $(".olark_button").click();
        return !1
    })
}
function isMuted(a) {
    if (!a || 0 == a || "0" == a)
        return 0;
    var b = parseInt((new Date).getTime());
    return b < parseInt(a) ? (a = parseInt(a) - b,
    a = Math.min(a, 864E6)) : 0
}
function requestAvatarWhenAppears(a, b) {
    if ("" != a.iconhash && a.iconhash && 1 != g_avatarsRequested[a.iconhash + ":" + b]) {
        var c = $(b)
          , d = c.find('img[iconhash="' + a.iconhash + '"]');
        0 != d.length && (g_avatarsRequested[a.iconhash + ":" + b] = !0,
        d.appear(function() {
            a.iconmedium ? g_controller.avatarRequest(a.iconhash, a.iconmedium, a.iconrealname, "default") : g_controller.avatarRequest(a.iconhash, a.medium, a.realname, "default")
        }, {
            parent: c.parent()
        }))
    }
}
function getStatusSimplified(a) {
    if (!a)
        return "";
    switch (a.toLowerCase()) {
    case "away":
        return "away";
    case "do not disturb":
        return "dnd";
    case "busy":
        return "dnd";
    case "invisible":
        return "invisible";
    case "mobile":
        return "mobile";
    case "online":
        return "online";
    case "auth":
        return "auth";
    case "offline":
        return "offline";
    default:
        return a.toLowerCase()
    }
}
function getStatusLabel(a) {
    switch (a.toLowerCase()) {
    case "online":
        return "Online";
    case "auth":
        return "Awaiting Authorization";
    case "offline":
        return "Offline";
    case "away":
        return "Away";
    case "mobile":
        return "Mobile";
    case "do not disturb":
        return "Do Not Disturb";
    default:
        return a
    }
}
function mediumDisplay(a) {
    return "ASTRA" == a.toUpperCase() ? "Trillian" : "AIM" == a.toUpperCase() ? "AIM&reg;" : "FACEBOOK" == a.toUpperCase() ? "Facebook" : "GOOGLE" == a.toUpperCase() ? "Google Talk" : "ICQ" == a.toUpperCase() ? "ICQ&reg;" : "JABBER" == a.toUpperCase() ? "Jabber / XMPP" : "MYSPACE" == a.toUpperCase() ? "MySpaceIM" : "MSN" == a.toUpperCase() ? "Windows Live Messenger" : "YAHOO" == a.toUpperCase() ? "Yahoo!&reg; Messenger" : "METACONTACT" == a.toUpperCase() ? "Metacontacts" : "SKYPE" == a.toUpperCase() ? "Skype" : a
}
window.onbeforeunload = function(a) {
    if (!$("#login").is(":visible")) {
        if (a = a || window.event)
            a.returnValue = "You are still connected to Trillian.  Leaving will disconnect you.";
        return "You are still connected to Trillian.  Leaving will disconnect you."
    }
}
;
$.fn.preload = function() {
    this.each(function() {
        $("<img/>")[0].src = this
    })
}
;
function createSVG() {
    $.browser.msie && 8 == $.browser.version || (g_muteSVG = '<svg width="16" height="12"><rect y="4" width="6" height="4" style="fill:#969696;"/><polygon points="0,6 6,1 6,11" style="fill:#969696;"/><line x1="8" y1="4" x2="12" y2="8" style="stroke:#969696;stroke-width:1.5"/><line x1="8" y1="8" x2="12" y2="4" style="stroke:#969696;stroke-width:1.5"/></svg>',
    g_onSVG = '<svg state="on" width="16" height="16"><rect width="16" height="16" style="stroke-width:1;stroke:#969696;fill:transparent;"/><polyline points="4,8 8,12 12,3" style="stroke-width:2;stroke:#969696;fill:transparent;"/></svg>',
    g_offSVG = '<svg state="off" width="16" height="16"><rect width="16" height="16" style="stroke-width:1;stroke:#969696;fill:transparent;"/></svg>',
    g_closeSVG = '<svg width="8" height="8"><line x1="0" y1="0" x2="8" y2="8" style="stroke-width:2;stroke:#969696"/><line x1="0" y1="8" x2="8" y2="0" style="stroke-width:2;stroke:#969696"/></svg>',
    g_lockSVG = '<svg width="10" height="13"><rect x="2" y="1" rx="3" ry="3" width="6" height="10" style="fill:transparent;stroke:white;stroke-width:2;"/><rect x="0" y="5" rx="2" ry="2" width="10" height="8" style="fill:white;"/></svg>',
    $("#x_domainBillingPurchase").html("Purchase&nbsp;&nbsp;" + g_lockSVG),
    $(".search .close").html(g_closeSVG))
}
function hookIntoEmojiBrowser() {
    var a = $(".emojibrowser .emojis")
      , b = $(".emojibrowser .explanationText")
      , c = $(".emojibrowser .explanationImage");
    b.text("Type ':' and TAB for fast access");
    c.html(null);
    a.find("span.emoji").mouseenter(function() {
        b.text($(this).find("span").attr("for"));
        c.html($(this).html())
    }).mouseleave(function() {
        b.text("Type ':' and TAB for fast access");
        c.html(null)
    });
    $("#x_emoji").click(function() {
        addEvent("chat", "emoji_button");
        addStatisticEvent("emoji_button");
        $("#x_emojibrowser").toggle();
        $("#x_edit").focus();
        return !1
    });
    $(".emojibrowser .categories .category").mouseenter(function() {
        b.text($(this).attr("title"));
        c.html($(this).html())
    }).mouseleave(function() {
        b.text("Type ':' and TAB for fast access");
        c.html(null)
    });
    $(".emojibrowser .categories .category").click(function() {
        addEvent("chat", "emoji_category");
        addStatisticEvent("emoji_category");
        $(this).siblings().removeClass("selected");
        $(this).addClass("selected");
        var a = $(this).attr("for")
          , a = $(".emojibrowser .emojis .category[category=" + a + "]").position().top + $(".emojibrowser .emojis").scrollTop();
        g_emojiScrolling = !0;
        $(".emojibrowser .emojis").animate({
            scrollTop: a
        }, 250, function() {
            g_emojiScrolling = !1
        })
    });
    $(".emojibrowser .emojis").scroll(function() {
        if (g_emojiScrolling)
            return !1;
        var a = $(".emojibrowser .emojis .category").first();
        $(".emojibrowser .emojis .category").each(function() {
            if (10 >= $(this).position().top)
                a = $(this);
            else
                return !1
        });
        var b = a.attr("category");
        $(".emojibrowser .categories .category[for=" + b + "]").addClass("selected").siblings().removeClass("selected")
    });
    $(".emojibrowser .emoji").click(function() {
        addEvent("chat", "emoji_insert");
        addStatisticEvent("emoji_insert");
        editSetCurrentWord($(this).find("span").attr("for"), !1, !0);
        return !1
    })
}
function preloadImages() {
    $(["img/group_closed.png", "img/group_open.png", "img/logo_blue.png", "img/logo_white_small.png", "img/close.png"]).preload();
    $("img/mediums/FACEBOOK.png img/mediums/GOOGLE.png img/mediums/MYSPACE.png img/mediums/YAHOO.png img/mediums/ICQ.png img/mediums/AIM.png img/mediums/JABBER.png img/mediums/ASTRA.png img/mediums/MSN.png".split(" ")).preload();
    $("img/files/xls.png img/files/xlsx.png img/files/zip.png img/files/file.png img/files/doc.png img/files/docx.png img/files/pdf.png img/files/txt.png".split(" ")).preload();
    $("img/icons/billing.png img/icons/billing@2x.png img/icons/billing_active.png img/icons/billing_active@2x.png img/icons/dashboard.png img/icons/dashboard@2x.png img/icons/dashboard_active.png img/icons/dashboard_active@2x.png img/icons/downloads.png img/icons/downloads@2x.png img/icons/downloads_active.png img/icons/downloads_active@2x.png img/icons/groupchats.png img/icons/groupchats@2x.png img/icons/groupchats_active.png img/icons/groupchats_active@2x.png img/icons/groups.png img/icons/groups@2x.png img/icons/groups_active.png img/icons/groups_active@2x.png img/icons/indent.png img/icons/settings.png img/icons/settings@2x.png img/icons/settings_active.png img/icons/settings_active@2x.png img/icons/history.png img/icons/history@2x.png img/icons/history.png img/icons/history@2x.png img/icons/users.png img/icons/users@2x.png img/icons/users_active.png img/icons/users_active@2x.png".split(" ")).preload()
}
function addEvent(a, b, c, d) {
    g_consoleLog && console.log("Event: " + a + ": " + b + ": " + (c ? c : "") + ": " + (d ? d : ""));
    void 0 != window._gat && void 0 != window._gat._getTrackerByName && void 0 != _gat._getTrackerByName()._trackEvent && _gat._getTrackerByName()._trackEvent(a, b, c, d)
}
window.onerror = function(a, b, c) {
    addEvent("javascript", b + "_" + c, a)
}
;
String.prototype.startsWith || (String.prototype.startsWith = function(a, b) {
    b = b || 0;
    return this.lastIndexOf(a, b) === b
}
);
String.prototype.Delinkify = function() {
    return this.replace(/<a[^>]*href=['"]?([^>'" ]*)[^>]*>[^<]*<\/a>/, "$1 ")
}
;
String.prototype.BRify = function() {
    return this.replace(/\n/g, "<br>")
}
;
String.prototype.spaceify = function() {
    return this.replace(/  /g, " &nbsp;")
}
;
String.prototype.stripHtml = function() {
    return this.replace(/<\/?(a|em|i|div|span|font|p|hr|ul|li|table|tbody|tr|td|form|body|head|html|meta|title|script|link|input|embed|object|big|small|h1|h2|h3|h4|h5|!)[^>]*>/ig, "").replace(/<\/?b>/ig, "")
}
;
String.prototype.mentionify = function(a) {
    if (this.match(/http/) || !a || 0 == a.length)
        return this.toString();
    var b, c = "@all", d, e = new RegExp("\\B" + c + "\\b","gi");
    b = this.replace(e, "<a class='mention local' title='Everyone in room'>" + c + "</a>");
    for (var f = 0; f < a.length; f++)
        c = a[f].name,
        d = a[f].name.indexOf("@"),
        -1 != d && (c = c.substring(0, d)),
        c = "@" + c,
        d = "<a class='mention " + (a[f].local ? "local" : "") + "' title='" + a[f].displayname + "'>" + c + "</a>",
        e = new RegExp("\\B" + c + "\\b","gi"),
        b = b.replace(e, d);
    return b
}
;
String.prototype.URLify = function() {
    return this.replace(/(http(s?):\/\/)?(www\.([-A-Z0-9+&@#\/%?='~_|!:,.;]*)([-A-Z0-9+&@#\/%=~_|])+)/ig, "http$2://$3")
}
;
String.prototype.linkify = function() {
    return this.replace(/((http|https|telnet|ftp|irc|xmpp|itms|mailto|file):\/\/([-A-Z0-9+&@#\/%?='~_|!:,.;]*)([-A-Z0-9+&@#\/%=~_|])+)/ig, '<a href="$1" target="_blank">$1</a>')
}
;
String.prototype.imgify = function() {
    var a;
    a = this.replace(/((<a href="[^"]+"[^>]+)>)https?:\/\/(ft.trillian.im\/[^<]+)<\/a>/ig, '$2 class="thumbnail mediaLightbox"><img class="image" src="https://s3.amazonaws.com/$3"/></a>');
    var b = new RegExp('((<a href="[^"]+"[^>]+)>)(' + "https://media.trillian.im/media/?m=".replace("?", "\\?") + "[^<]+)</a>","gi");
    a = a.replace(b, '$2 class="thumbnail"><img class="image thumbnailNeeded mediaThumbnail loading" original="$3" src="img/blank.gif"/><div class="mediaName"></div><div class="mediaSize"></div></a>');
    0 < g_mediaURL.length && (b = new RegExp('((<a href="[^"]+"[^>]+)>)(' + g_mediaURL.replace("?", "\\?") + "[^<]+)</a>","gi"),
    a = a.replace(b, '$2 class="thumbnail"><img class="image thumbnailNeeded mediaThumbnail loading" original="$3" src="img/blank.gif"/><div class="mediaName"></div><div class="mediaSize"></div></a>'));
    a = a.replace(/(<a href="[^"]+".*>)https?:\/\/(youtu.be\/|[^\/]*youtube\.com\/[^<]*v=)([^&<"]+)[^<]*<\/a>/ig, '<div class="youtube"><span class="play">&#x25b6;</span>$1<img src="https://img.youtube.com/vi/$3/hqdefault.jpg"></a></div>');
    a = a.replace(/((<a href="[^"]+"[^>]+)>)https?:\/\/flic\.kr\/p\/(img\/)?([^<?&_.]+)(_[stm])?(\.(jpg|png|gif|tif|jpeg|tiff))?<\/a>/ig, '$2 class="thumbnail"><img class="image" src="https://flic.kr/p/img/$4_m.jpg"/></a>');
    a = a.replace(/((<a href="[^"]+"[^>]+)>)https?:\/\/(i\.)?imgur\.com\/(?!(a\/)|(gallery\/))([^\/<]+\/)*([^<.]+)(\.[^<]+)?<\/a>/ig, '$2 class="thumbnail"><img class="image" src="https://i.imgur.com/$7m.jpg"></a>');
    a = a.replace(/((<a href="[^"]+"[^>]+)>)https?:\/\/yfrog.com\/([^.<]+)<\/a>/ig, '$2 class="thumbnail"><img class="image" src="https://yfrog.com/$3:medium"></div></div></a>');
    return a = a.replace(/((<a href="[^"]+"[^>]+)>)https?:\/\/fbcdn-sphotos-a\.akamaihd\.net\/([^\/]*\/)([0-9-_\/]+)(_[a-z])?.jpg<\/a>/ig, '$2 class="thumbnail"><img class="image" src="https://fbcdn-sphotos-a.akamaihd.net/$3s320x320/$4_n.jpg"></a>')
}
;
String.prototype.noEntities = function() {
    return this.match(/http/) ? this.toString() : this.replace(/(&gt;)/g, ">").replace(/(&lt;)/g, "<").replace(/(&quot;)/g, '"').replace(/(&apos;)/g, "'").replace(/(&amp;)/g, "&")
}
;
String.prototype.colorify = function() {
    return this.match(/http/) ? this.toString() : this.replace(/(#\b[0-9A-F]{6}\b)/ig, '$1 <div class="color" style="background-color:$1">&nbsp;</div>')
}
;
String.prototype.emotify = function() {
    if (this.match(/http/) || !g_settingsEmoji)
        return this.toString();
    var a = this, b;
    for (b in g_emojiImageReplacement)
        a = a.split(b).join('<span class="emoji ' + g_emojiImageReplacement[b] + '" title="' + b + '">' + b + "</span>&zwnj;");
    return a = a.replace(/\(\+\)/g, "&#x2714;").replace(/\(-\)/g, "&#x2718;").replace(/\(\.\)/g, "&bull;")
}
;
function Avatar() {}
Avatar.prototype.setLocation = function(a) {
    this.img = $("#" + a + " img");
    this.originalSrc = this.img.attr("src");
    this.changed = !1;
    this.result_base64 = this.result_url = null;
    var b = this;
    this.isLocalImageSupported() && (this.img.bind("dragover", function(a) {
        $(this).css({
            opacity: .4
        });
        return !1
    }),
    this.img.bind("dragenter", function(a) {
        $(this).css({
            opacity: .4
        });
        return !1
    }),
    this.img.bind("dragleave", function(a) {
        $(this).css({
            opacity: 1
        });
        return !1
    }),
    this.img.bind("dragend", function(a) {
        $(this).css({
            opacity: 1
        });
        return !1
    }),
    this.img.bind("drop", function(a) {
        $(this).css({
            opacity: 1
        });
        a = a || window.event;
        a.preventDefault();
        a = a.originalEvent || a;
        b.localImage(a.files || a.dataTransfer.files)
    }))
}
;
Avatar.prototype.isCanvasSupported = function() {
    var a = document.createElement("canvas");
    return !(!a.getContext || !a.getContext("2d"))
}
;
Avatar.prototype.imageSetURL = function(a, b) {
    var c = this;
    c.changed = !0;
    if (b) {
        var d = new Image;
        $(d).load(function() {
            var a = document.createElement("canvas");
            a.width = 96;
            a.height = 96;
            var b = 0
              , g = 0
              , h = 96
              , k = 96;
            d.width > d.height ? (h = d.width / d.height,
            h *= 96,
            k = 96,
            b = (96 - h) / 2) : d.width < d.height && (h = d.height / d.width,
            k = 96 * h,
            h = 96,
            g = (96 - k) / 2);
            var l = a.getContext("2d");
            l.mozImageSmoothingEnabled = !0;
            l.webkitImageSmoothingEnabled = !0;
            l.drawImage(d, b, g, h, k);
            a = a.toDataURL("image/png");
            b = a.replace(/^data:image\/(png|jpg);base64,/, "");
            c.result_url = null;
            c.result_base64 = b;
            c.response(null, b);
            c.img.attr("src", a)
        });
        d.src = a
    } else
        this.result_url = a,
        this.result_base64 = null,
        this.response(a),
        this.img.attr("src", a)
}
;
Avatar.prototype.isLocalImageSupported = function() {
    return this.isCanvasSupported() && window.FileReader ? !0 : !1
}
;
Avatar.prototype.isWebcamSupported = function() {
    return !1
}
;
Avatar.prototype.webcamStart = function(a) {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    var b = this;
    navigator.getUserMedia({
        audio: !1,
        video: !0
    }, function(c) {
        b.img.hide();
        $(a).show();
        $(a).attr("src", window.URL.createObjectURL(c))
    }, function() {})
}
;
Avatar.prototype.webcamStop = function(a) {
    $(a).removeAttr("src");
    $(a).hide();
    this.img.show()
}
;
Avatar.prototype.localImage = function(a) {
    if (window.FileReader) {
        var b = this
          , c = new FileReader;
        c.onload = function(a) {
            b.imageSetURL(a.target.result, !0)
        }
        ;
        c.onerror = function(a) {}
        ;
        c.readAsDataURL(a[0])
    }
}
;
function User() {
    this.reset()
}
User.prototype.reset = function() {
    this.signedin = this.error = !1;
    this.displayname = this.phone = this.email = this.avatar = this.lastname = this.firstname = null;
    this.phone_verified = this.invited = this.email_verified = !1;
    this.expiration = null;
    this.suspended = this.domain_user = this.domain_admin = this.lifetime = this.grandfathered = this.pro = !1;
    this.domain = this.username = this.usernameWithoutDomain = this.shortFullname = this.fullname = null;
    this.invoices = [];
    this.billingRequested = !1
}
;
User.prototype.signin = function(a, b, c, d) {
    var e = this;
    e.reset();
    log("Backend: User.signin: " + a + ".");
    $.post("/api/user/0.1/index.php/signin", {
        username: a,
        password: encodeURIComponent(b)
    }, function(a, b, h) {
        b = $(a).find("response").text();
        "success" == b ? e.processSigninResult(!0, a) : (e.processSigninResult(!1, a),
        b && "maintenance" == b && (e.errorReason = "maintenance"));
        log("Backend: User.signin: " + b);
        c && c(d)
    }, "xml").error(function(a, b, h) {
        log("Backend: Error: User.signin: " + a + ": " + b + ": " + h);
        e.signedin = !1;
        e.error = !0;
        e.errorReason = "server";
        c && c(d)
    })
}
;
User.prototype.alreadySignedin = function(a) {
    var b = this;
    b.reset();
    log("Backend: User.alreadySignedin");
    $.post("/api/user/0.1/index.php/signedin", "", function(c, d, e) {
        d = $(c).find("response").text();
        null == d || "" == d ? b.processSigninResult(!1, c) : b.processSigninResult(!0, c);
        log("Backend: User.alreadySignedin: " + d);
        a()
    }, "xml").error(function(c, d, e) {
        log("Backend: Error: User.alreadySignedin: " + c + ": " + d + ": " + e);
        b.signedin = !1;
        b.error = !0;
        b.errorReason = "server";
        a()
    })
}
;
User.prototype.processSigninResult = function(a, b) {
    a ? (this.signedin = !0,
    this.firstname = $(b).find("response").attr("firstname"),
    this.lastname = $(b).find("response").attr("lastname"),
    this.avatar = $(b).find("response").attr("avatar"),
    this.email = $(b).find("response").attr("email"),
    this.phone = $(b).find("response").attr("phone"),
    this.displayname = $(b).find("response").attr("nickname"),
    this.email_verified = 1 == $(b).find("response").attr("email_verified") ? !0 : !1,
    this.invited = 1 == $(b).find("response").attr("invited") ? !0 : !1,
    this.phone_verified = 1 == $(b).find("response").attr("phone_verified") ? !0 : !1,
    this.expiration = $(b).find("response").attr("expiration"),
    this.pro = 1 == $(b).find("response").attr("pro") ? !0 : !1,
    this.grandfathered = 1 == $(b).find("response").attr("grandfathered") ? !0 : !1,
    this.lifetime = 1 == $(b).find("response").attr("lifetime") ? !0 : !1,
    this.domain_admin = 1 == $(b).find("response").attr("domain_admin") ? !0 : !1,
    this.suspended = 1 == $(b).find("response").attr("suspended") ? !0 : !1,
    this.domain_trial = 1 == $(b).find("response").attr("domain_trial") ? !0 : !1,
    this.domain_user = (this.username = $(b).find("response").attr("username")) && -1 != this.username.indexOf("@") && "trillian.im" != this.username.substring(this.username.indexOf("@") + 1, this.username.length) ? !0 : !1,
    -1 != this.username.indexOf("@") && (this.domain = this.username.substring(this.username.indexOf("@") + 1, this.username.length),
    this.usernameWithoutDomain = this.username.substr(0, this.username.indexOf("@"))),
    this.firstname && 0 < this.firstname.length && this.lastname && 0 < this.lastname.length ? this.fullname = this.firstname + " " + this.lastname : this.firstname && 0 < this.firstname.length ? this.fullname = this.firstname : this.lastname && 0 < this.lastname.length && (this.fullname = this.lastname),
    this.firstname && 0 < this.firstname.length && this.lastname && 0 < this.lastname.length ? this.shortFullname = this.firstname + " " + this.lastname.substr(0, 1) : this.firstname && 0 < this.firstname.length ? this.shortFullname = this.firstname : this.lastname && 0 < this.lastname.length && (this.shortFullname = this.lastname)) : (this.signedin = !1,
    this.error = !0,
    this.errorReason = "password_invalid",
    b && "suspended" == $(b).text() && (this.errorReason = "suspended"))
}
;
User.prototype.signout = function() {
    $.get("/api/user/0.1/index.php/signout")
}
;
User.prototype.keepAlive = function() {
    var a = this;
    setTimeout(function() {
        a.signedin && (log("Backend: User.keepAlive"),
        $.post("/api/user/0.1/index.php/signedin", "", function(b, c, d) {
            b = $(b).find("response").text();
            log("Backend: User.keepAlive: " + b);
            b && 0 != b.length && a.keepAlive()
        }, "xml").error(function(a, c, d) {
            log("Backend: Error: User.keepAlive: " + a + ": " + c + ": " + d)
        }))
    }, 3E6)
}
;
User.prototype.requestUsername = function(a, b) {
    log("Backend: User.requestUsername");
    addEvent("chat", "user_requestUsername");
    $.post("/api/user/0.1/index.php/username", {
        ae: a
    }, function(a, d, e) {
        a = $(a).find("response").text();
        d = null;
        "maintenance" == a ? d = "Temporarily offline for maintenance." : "missing" == a ? d = "No username associated with that email address." : "success" != a && (d = "Error when requesting username.");
        log("Backend: User.requestUsername: " + a + ", " + d);
        b(a, d)
    }, "xml").error(function(a, d, e) {
        log("Backend: Error: User.requestUsername: " + a + ": " + d + ": " + e);
        b("server", "Connection error when requesting username.")
    })
}
;
User.prototype.requestPassword = function(a, b, c) {
    log("Backend: User.requestPassword");
    addEvent("chat", "user_requestPassword");
    $.post("/api/user/0.1/index.php/security/email", {
        au: a,
        ae: b
    }, function(a, b, f) {
        a = $(a).find("response").text();
        b = null;
        "maintenance" == a ? b = "Temporarily offline for maintenance." : "suspended" == a ? b = "Domain suspended.  Please contact your domain administrator." : "mismatch" == a ? b = "Username and email do not match." : "success" != a && (b = "Error when requesting password.");
        log("Backend: User.requestPassword: " + a + ", " + b);
        c(a, b)
    }, "xml").error(function(a, b, f) {
        log("Backend: Error: User.requestPassword: " + a + ": " + b + ": " + f);
        c("server", "Connection error when requesting password.")
    })
}
;
User.prototype.requestBilling = function(a) {
    var b = this;
    b.billingRequested || (b.invoices = [],
    b.billingRequested = !0,
    log("Backend: User.requestBilling"),
    $.get("/api/user/0.1/index.php/billing/invoices", function(c) {
        0 == c.error && (b.invoices = c.invoices);
        log("Backend: User.requestBilling: " + c.invoices);
        a()
    }, "json").error(function(b, d, e) {
        log("Backend: Error: User.requestBilling: " + b + ": " + d + ": " + e);
        a()
    }))
}
;
User.prototype.confirmEmail = function(a, b, c) {
    var d = encodeURIComponent(a);
    b = encodeURIComponent(b);
    b = "username=" + d + "&challenge=" + b + g_postVersion;
    log("Backend: User.confirmEmail: " + d);
    $.ajax({
        url: "/api/user/0.1/index.php/email/verify",
        type: "POST",
        data: b,
        dataType: "xml",
        success: function(b) {
            b = $(b).find("response").text();
            log("Backend: User.confirmEmail: " + b);
            -1 != b.indexOf("success") ? (addEvent("chat", "emailConfirm_success"),
            c(!0)) : (addEvent("chat", "emailConfirm_" + b, a),
            c(!1))
        },
        error: function(a, b, d) {
            log("Backend: Error: User.confirmEmail: " + a + ": " + b + ": " + d);
            addEvent("chat", "emailConfirm_error");
            c(!1)
        }
    })
}
;
User.prototype.resetPassword = function(a, b, c, d, e) {
    var f = encodeURIComponent(a);
    d = encodeURIComponent(d);
    c = encodeURIComponent(c);
    b = encodeURIComponent(b);
    b = "au=" + f + "&np=" + d + "&ae=" + c + "&ac=" + b + g_postVersion;
    log("Backend: User.resetPassword: " + f);
    $.ajax({
        url: "/api/user/0.1/index.php/change/password",
        type: "POST",
        data: b,
        dataType: "xml",
        success: function(b) {
            b = $(b).find("response").text();
            log("Backend: User.resetPassword: " + b);
            -1 != b.indexOf("success") ? (addEvent("chat", "passwordChange_success"),
            e(!0)) : (addEvent("chat", "passwordChange_" + b, a),
            e(!1))
        },
        error: function(a, b, c) {
            log("Backend: Error: User.resetPassword: " + a + ": " + b + ": " + c);
            addEvent("chat", "passwordChange_error");
            e(!1)
        }
    })
}
;
User.prototype.deleteRequest = function(a, b, c) {
    a = encodeURIComponent(a);
    b = encodeURIComponent(b);
    b = "au=" + a + "&ap=" + b + g_postVersion;
    log("Backend: User.deleteRequest: " + a);
    $.ajax({
        url: "/api/user/0.1/index.php/delete/request",
        type: "POST",
        data: b,
        dataType: "xml",
        success: function(a) {
            a = $(a).find("response").text();
            log("Backend: User.deleteRequest: " + a);
            "success" == a ? (addEvent("admin", "deleteRequest_success"),
            c(!0, null)) : "unverified" == a ? (addEvent("admin", "deleteRequest_unverified"),
            c(!1, "unverified")) : (addEvent("chat", "deleteRequest_" + a),
            c(!1, null))
        },
        error: function(a, b, f) {
            log("Backend: Error: User.deleteRequest: " + a + ": " + b + ": " + f);
            addEvent("chat", "deleteRequest_error");
            c(!1, null)
        }
    })
}
;
User.prototype.deleteAccount = function(a, b, c, d) {
    addEvent("chat", "deleteAccount_start", a);
    a = encodeURIComponent(a);
    b = encodeURIComponent(b);
    encodeURIComponent(c);
    c = "au=" + a + "&ap=" + b + "&code=" + c + g_postVersion;
    log("Backend: User.deleteAccount: " + a);
    $.ajax({
        url: "/api/user/0.1/index.php/delete/confirm",
        type: "POST",
        data: c,
        dataType: "xml",
        success: function(a) {
            a = $(a).find("response").text();
            log("Backend: User.deleteAccount: " + a);
            "success" == a ? d(!0) : (addEvent("chat", "deleteAccount_" + a),
            d(!1))
        },
        error: function(a, b, c) {
            log("Backend: Error: User.deleteAccount: " + a + ": " + b + ": " + c);
            addEvent("chat", "deleteAccount_error");
            d(!1)
        }
    })
}
;
var GroupChatFlagNone = 0
  , GroupChatFlagDeleted = 1
  , MemberFlagOp = 1
  , MemberFlagVoice = 2
  , MemberFlagBot = 4;
function Domain() {
    this.reset()
}
Domain.prototype.reset = function() {
    this.error = !1;
    this.companyName = this.createdAt = this.errorReason = null;
    this.licensesTotal = this.licensesAvailable = 0;
    this.trialAlmostExpired = this.trial = !1;
    this.trialExpires = null;
    this.users = [];
    this.usersSearch = [];
    this.groups = [];
    this.groupchats = [];
    this.groupchatsRequested = null;
    this.policy = 0;
    this.policies = [];
    this.domainname = null;
    this.invoices = [];
    this.billingRequested = !1;
    this.queuedUsers = [];
    this.nextPendingID = 1;
    this.scheduleRequested = !1;
    this.scheduleFrequency = this.scheduleAmount = this.scheduleDate = 0;
    this.scheduleMethod = "";
    this.scheduleYear = this.scheduleMonth = 0;
    this.loaded = !1
}
;
Domain.prototype.request = function(a) {
    var b = this;
    b.reset();
    log("Backend: Domain.request.");
    $.get("/api/domain/0.1/index.php/", function(c, d, e) {
        log("Backend: Domain.request: " + c + ".");
        b.companyName = c.name;
        b.domainname = c.domainname;
        b.createdAt = new Date(1E3 * c.since);
        b.trial = c.trial;
        b.trialExpires = new Date(1E3 * c.trial_expires);
        b.licensesAvailable = c.available;
        b.licensesTotal = c.licenses;
        b.policy = c.policy;
        d = Math.round((new Date).getTime() / 1E3);
        10 > Math.round((g_domain.trialExpires.getTime() / 1E3 - d) / 86400) && b.trial ? b.trialAlmostExpired = !0 : b.trialAlmostExpired = !1;
        b.users = c.users;
        b.users || (b.users = []);
        b.usersSearch = [];
        b.updateUsersNames();
        for (d = 0; d < c.policies.length; d++)
            e = new Policy,
            e.process(c.policies[d]),
            b.policies.push(e);
        for (d = 0; d < c.groups.length; d++)
            e = new Group,
            e.process(c.groups[d]),
            e.domaingroup = e.name == b.domainname ? 1 : 0,
            b.groups.push(e);
        b.groups || (b.groups = []);
        e = new Group;
        e.id = 0;
        e.name = null;
        e.displayname = c.domainname;
        e.parent = 0;
        e.policy = c.policy;
        e.domaingroup = 0;
        b.groups.unshift(e);
        b.groupchats = c.groupchats;
        b.groupchats || (b.groupchats = []);
        b.groupchatsRequested = new Date;
        b.updateMembersForGroupchats();
        b.usersUpdated();
        b.loaded = !0;
        a()
    }, "json").error(function(c, d, e) {
        log("Backend: Error: Domain.request: " + c + ", " + d + ", " + e + ".");
        b.error = !0;
        b.errorReason = "server";
        a()
    })
}
;
Domain.prototype.updateUsersNames = function() {
    for (var a = 0; a < this.users.length; a++) {
        var b = this.users[a];
        "0000000000000000000000000000000000000000" == b.iconhash && (b.iconhash = null);
        this.updateUserNames(b);
        this.usersSearch[b.username.toLowerCase()] = b
    }
    this.users.sort(function(a, b) {
        return a.sortBy.localeCompare(b.sortBy)
    })
}
;
Domain.prototype.updateUserNames = function(a) {
    a.fullname = a.firstname + " " + a.lastname;
    0 == $.trim(a.fullname).length && (a.fullname = a.displayname);
    0 == $.trim(a.fullname).length && (a.fullname = a.username);
    a.shortFullname = a.fullname;
    a.firstname && (a.shortFullname = a.firstname);
    a.sortBy = a.firstname.toLowerCase() + a.lastname.toLowerCase();
    0 == a.sortBy.length && (a.sortBy = a.fullname.toLowerCase());
    g_username.toLowerCase() == a.username ? a.myself = !0 : a.myself = !1;
    var b = a.username.indexOf("@");
    a.usernameWithoutDomain = a.username.substring(0, b)
}
;
Domain.prototype.requestUsers = function(a) {
    var b = this;
    log("Backend: Domain.requestUsers.");
    $.get("/api/domain/0.1/index.php/users/", function(c) {
        log("Backend: Domain.requestUsers: " + c + ".");
        b.users = c;
        b.users || (b.users = []);
        b.usersSearch = [];
        b.updateUsersNames();
        b.usersUpdated();
        a()
    }, "json").error(function(c, d, e) {
        log("Backend: Error: Domain.requestUsers: " + c + ", " + d + ", " + e + ".");
        b.usersUpdated();
        a()
    })
}
;
Domain.prototype.requestPolicies = function(a) {
    var b = this;
    log("Backend: Domain.requestPolicies.");
    $.get("/api/domain/0.1/index.php/policies/", function(c) {
        log("Backend: Domain.requestPolicies: " + c + ".");
        b.policies = [];
        for (var d = 0; d < c.length; d++) {
            var e = new Policy;
            e.process(c[d]);
            b.policies.push(e)
        }
        b.usersUpdated();
        a()
    }, "json").error(function(b, d, e) {
        log("Backend: Error: Domain.requestPolicies: " + b + ", " + d + ", " + e + ".");
        a()
    })
}
;
Domain.prototype.updateMembersForGroupchats = function() {
    for (var a = 0; a < this.groupchats.length; a++) {
        var b = this.groupchats[a]
          , c = b.members.slice(0);
        b.members = [];
        for (var d = 0; d < c.length; d++) {
            var e = new GroupChatMember;
            e.process(c[d]);
            b.members.push(e)
        }
    }
}
;
Domain.prototype.requestGroupChats = function(a, b) {
    var c = this;
    !a && c.groupchatsRequested && 6E4 > (new Date).getTime() - c.groupchatsRequested || (log("Backend: Domain.requestGroupchats."),
    $.get("/api/domain/0.1/index.php/groupchats/", function(a) {
        log("Backend: Domain.requestGroupChats: " + a + ".");
        c.groupchats = a;
        c.groupchats || (c.groupchats = []);
        c.groupchatsRequested = new Date;
        c.updateMembersForGroupchats();
        c.usersUpdated();
        b()
    }, "json").error(function(a, c, f) {
        log("Backend: Error: Domain.requestGroupChats: " + a + ", " + c + ", " + f + ".");
        b()
    }))
}
;
Domain.prototype.requestGroups = function(a) {
    var b = this;
    log("Backend: Domain.requestGroups.");
    $.get("/api/domain/0.1/index.php/groups/", function(c) {
        log("Backend: Domain.requestGroups: " + c + ".");
        b.groups = [];
        for (var d = 0; d < c.length; d++) {
            var e = new Group;
            e.process(c[d]);
            e.domaingroup = e.name == b.domainname ? 1 : 0;
            b.groups.push(e)
        }
        e = new Group;
        e.id = 0;
        e.name = null;
        e.displayname = b.domainname;
        e.parent = 0;
        e.policy = b.policy;
        e.domaingroup = 0;
        b.groups.unshift(e);
        b.usersUpdated();
        a()
    }, "json").error(function(b, d, e) {
        log("Backend: Error: Domain.requestGroups: " + b + ", " + d + ", " + e + ".");
        a()
    })
}
;
Domain.prototype.requestSchedule = function(a) {
    var b = this;
    b.scheduleRequested || (b.scheduleDate = 0,
    b.scheduleAmount = 0,
    b.scheduleFrequency = 0,
    b.scheduleMethod = "",
    b.scheduleMonth = 0,
    b.scheduleYear = 0,
    b.scheduleRequested = !0,
    log("Backend: Domain.requestSchedule."),
    $.get("/api/domain/0.1/index.php/schedule/", function(c) {
        log("Backend: Domain.requestSchedule: " + c + ".");
        c.schedules && c.schedules[0] && (b.scheduleDate = c.schedules[0].next,
        b.scheduleAmount = c.schedules[0].amount,
        b.scheduleFrequency = c.schedules[0].frequency,
        b.scheduleMethod = c.schedules[0].method,
        b.scheduleMonth = parseInt(c.schedules[0].month),
        b.scheduleYear = parseInt(c.schedules[0].year) + 2E3);
        a()
    }, "json").error(function(b, d, e) {
        log("Backend: Error: Domain.requestSchedule: " + b + ", " + d + ", " + e + ".");
        a()
    }))
}
;
Domain.prototype.getUser = function(a) {
    return this.usersSearch[a.toLowerCase()]
}
;
Domain.prototype.getPolicy = function(a) {
    for (var b = 0; b < this.policies.length; b++)
        if (this.policies[b].id == a)
            return this.policies[b];
    return null
}
;
Domain.prototype.getGroup = function(a) {
    for (var b = 0; b < this.groups.length; b++)
        if (this.groups[b].id == a)
            return this.groups[b];
    return null
}
;
Domain.prototype.getGroupChat = function(a) {
    if (!a || 0 == a.length)
        return null;
    for (var b = 0; b < this.groupchats.length; b++)
        if (this.groupchats[b].name == a)
            return this.groupchats[b];
    return null
}
;
Domain.prototype.getUserGroupChats = function(a) {
    for (var b = [], c = 0; c < this.groupchats.length; c++)
        for (var d = this.groupchats[c], e = 0; e < d.members.length; e++)
            d.members[e].name.toLowerCase() == a.toLowerCase() && b.push(d);
    return b
}
;
Domain.prototype.removeUserFromGroupChats = function(a) {
    for (var b = 0; b < this.groupchats.length; b++)
        for (var c = this.groupchats[b], d = 0; d < c.members.length; d++) {
            var e = c.members[d];
            e.name.toLowerCase() == a.username.toLowerCase() && this.removeGroupChatMember(c, e)
        }
}
;
Domain.prototype.deleteUser = function(a) {
    var b = this.getUser(a);
    b && !b.deleted && (b.deleted = !0,
    this.licensesAvailable++,
    log("Backend: Domain.deleteUser: " + a + "."),
    addEvent("chat", "domain_deleteUser"),
    $.post("/api/domain/0.1/index.php/user/delete", {
        du: a
    }, null, "xml"),
    this.removeUserFromGroupChats(b))
}
;
Domain.prototype.undeleteUser = function(a) {
    var b = this.getUser(a);
    b && b.deleted && (b.deleted = !1,
    this.licensesAvailable--,
    log("Backend: Domain.undeleteUser: " + a + "."),
    addEvent("chat", "domain_undeleteUser"),
    $.post("/api/domain/0.1/index.php/user/undelete", {
        du: a
    }, null, "xml"),
    this.addUserToGroupChatsFromPolicy(b.username, b.policy))
}
;
Domain.prototype.promoteUser = function(a) {
    var b = this.getUser(a);
    b && (b.domain_admin = !0,
    log("Backend: Domain.promoteUser: " + a + "."),
    addEvent("chat", "domain_promoteUser"),
    $.post("/api/domain/0.1/index.php/user/promote", {
        du: a,
        pr: "domain_admin"
    }, null, "xml"))
}
;
Domain.prototype.demoteUser = function(a) {
    var b = this.getUser(a);
    b && (b.domain_admin = !1,
    log("Backend: Domain.demoteUser: " + a + "."),
    addEvent("chat", "domain_demoteUser"),
    $.post("/api/domain/0.1/index.php/user/demote", {
        du: a,
        pr: "domain_admin"
    }, null, "xml"))
}
;
Domain.prototype.setGroupParent = function(a, b) {
    a.parent = b;
    log("Backend: Domain.setGroupParent: " + a + ", " + b + ".");
    addEvent("chat", "domain_setGroupParent");
    $.post("/api/domain/0.1/index.php/group/parent", {
        group: a.id,
        parent: b
    }, null, "xml")
}
;
Domain.prototype.setGroupDisplayName = function(a, b) {
    a.displayname = b;
    log("Backend: Domain.setGroupDisplayName: " + a + ", " + b + ".");
    addEvent("chat", "domain_setGroupDisplayName");
    $.post("/api/domain/0.1/index.php/group/displayname", {
        group: a.id,
        displayname: encodeURIComponent(b)
    }, null, "xml")
}
;
Domain.prototype.setGroupChatDisplayName = function(a, b) {
    a.displayname = b;
    this.updateGroupChatDisplayName(a);
    this.updateGroupChatSortString(a);
    addEvent("chat", "domain_setGroupChatDisplayName");
    log("Backend: Domain.setGroupChatDisplayName: " + a + ", " + b + ".");
    $.post("/api/domain/0.1/index.php/groupchat/displayname", {
        groupchat: a.name,
        displayname: encodeURIComponent(b)
    }, null, "xml")
}
;
Domain.prototype.setGroupChatTopic = function(a, b) {
    a.topic = b;
    log("Backend: Domain.setGroupChatTopic: " + a + ", " + b + ".");
    addEvent("chat", "domain_setGroupChatTopic");
    $.post("/api/domain/0.1/index.php/groupchat/topic", {
        groupchat: a.name,
        topic: encodeURIComponent(b)
    }, null, "xml")
}
;
Domain.prototype.setGroupChatFlag = function(a, b, c, d) {
    a.flags = c ? a.flags | b : a.flags & ~b;
    d && (this.updateGroupChatSortString(a),
    log("Backend: Domain.setGroupChatFlag: " + a + ", " + b + ", " + c + "."),
    addEvent("chat", "domain_setGroupChatFlag"),
    $.post("/api/domain/0.1/index.php/groupchat/flags", {
        groupchat: a.name,
        flags: a.flags
    }, null, "xml"))
}
;
Domain.prototype.setGroupChatMemberFlag = function(a, b, c) {
    b.flags = c;
    b.updateSortAndName();
    log("Backend: Domain.setGroupChatMemberFlag: " + a + ", " + b + ", " + c + ".");
    addEvent("chat", "domain_setGroupChatMemberFlag");
    $.post("/api/domain/0.1/index.php/groupchat/member/flags", {
        groupchat: a.name.toLowerCase(),
        member: b.name.toLowerCase(),
        flags: c
    }, null, "xml")
}
;
Domain.prototype.removeGroupChatMember = function(a, b, c) {
    for (var d = 0; d < a.members.length; d++)
        if (a.members[d].name.toLowerCase() == b.name.toLowerCase()) {
            a.members.splice(d, 1);
            break
        }
    this.updateGroupChatDisplayName(a);
    this.updateGroupChatSortString(a);
    log("Backend: Domain.removeGroupChatMember: " + a + ", " + b + ".");
    addEvent("chat", "domain_removeGroupChatMember");
    $.post("/api/domain/0.1/index.php/groupchat/member/remove", {
        groupchat: a.name.toLowerCase(),
        member: b.name.toLowerCase()
    }, c, "xml")
}
;
Domain.prototype.addGroupChatMember = function(a, b, c, d) {
    for (var e = 0; e < a.members.length; e++) {
        var f = a.members[e];
        if (f.name.toLowerCase() == b.name.toLowerCase()) {
            d && d();
            return
        }
    }
    f = new GroupChatMember;
    f.name = b.name.toLowerCase();
    f.user = b.user;
    f.flags = c;
    f.updateSortAndName();
    a.members.push(f);
    this.updateGroupChatDisplayName(a);
    this.updateGroupChatSortString(a);
    log("Backend: Domain.addGroupChatMember: " + a + ", " + b + ", " + c + ".");
    addEvent("chat", "domain_addGroupChatMember");
    $.post("/api/domain/0.1/index.php/groupchat/member/add", {
        groupchat: a.name.toLowerCase(),
        member: b.name.toLowerCase(),
        flags: c
    }, d, "xml")
}
;
Domain.prototype.enableGroupChat = function(a, b, c) {
    this.setGroupChatFlag(a, GroupChatFlagDeleted, !b, !0);
    a.deleted = !b;
    this.updateGroupChatSortString(a);
    a.deleted ? this.removeGroupChatMembers(a, 0, a.members.length, c) : c && c(1)
}
;
Domain.prototype.removeGroupChatMembers = function(a, b, c, d) {
    if (a)
        if (0 == a.members.length)
            d && d(1);
        else {
            d && c && d(b / c);
            var e = this;
            this.removeGroupChatMember(a, a.members[0], function() {
                e.removeGroupChatMembers(a, b + 1, c, d)
            })
        }
    else
        d && d(1)
}
;
Domain.prototype.setUserPolicy = function(a, b) {
    var c = this.getUser(a);
    c && c.policy != b && (c.policy = b,
    log("Backend: Domain.setUserPolicy: " + a + ", " + b + "."),
    addEvent("chat", "domain_setUserPolicy"),
    $.post("/api/domain/0.1/index.php/user/policy", {
        username: a,
        policy: b
    }, null, "xml"),
    c.deleted || this.addUserToGroupChatsFromPolicy(c.username, c.policy),
    this.usersUpdated())
}
;
Domain.prototype.addUserToGroupChatsFromPolicy = function(a, b) {
    var c = g_domain.getPolicy(b);
    if (c)
        for (var c = c.value["trillian.groupchat.bind.impp"].split(","), d = 0; d < c.length; d++) {
            var e = c[d].trim();
            if (e = g_domain.getGroupChat(e)) {
                var f = new GroupChatMember;
                f.name = a;
                g_domain.addGroupChatMember(e, f, 0)
            }
        }
}
;
Domain.prototype.setUserGroup = function(a, b) {
    var c = this.getUser(a);
    c && (c.group = b,
    log("Backend: Domain.setUserGroup: " + a + ", " + b + "."),
    addEvent("chat", "domain_setUserGroup"),
    $.post("/api/domain/0.1/index.php/user/group", {
        username: a,
        group: b
    }, function(a, b, c) {}, "xml"),
    this.usersUpdated())
}
;
Domain.prototype.setUserNames = function(a, b, c) {
    var d = this.getUser(a);
    d && (d.firstname = b,
    d.lastname = c,
    this.updateUserNames(d),
    addEvent("chat", "domain_setUserNames"),
    log("Backend: Domain.setUserNames: " + a + ", " + b + ", " + c + "."),
    $.post("/api/domain/0.1/index.php/user/names", {
        username: a,
        firstname: encodeURIComponent(b),
        lastname: encodeURIComponent(c)
    }, function(a, b, c) {}, "xml"),
    this.usersUpdated())
}
;
Domain.prototype.emailUserPassword = function(a) {
    log("Backend: Domain.emailUserPassword: " + a + ".");
    addEvent("chat", "domain_emailUserPassword");
    $.post("/api/domain/0.1/index.php/user/password/email", {
        username: a
    }, function(a, c, d) {}, "xml")
}
;
Domain.prototype.resetUserPassword = function(a, b) {
    log("Backend: Domain.resetUserPassword: " + a + ".");
    addEvent("chat", "domain_resetUserPassword");
    $.post("/api/domain/0.1/index.php/user/password/reset", {
        username: a,
        password: encodeURIComponent(b)
    }, function(a, b, e) {}, "xml")
}
;
Domain.prototype.changeUserPassword = function(a, b, c, d) {
    b && 0 != b.length ? c && 0 != c.length ? (addEvent("chat", "domain_changeUserPassword"),
    log("Backend: Domain.changeUserPassword: " + a + "."),
    $.post("/api/domain/0.1/index.php/user/password/change", {
        username: a,
        oldpassword: encodeURIComponent(b),
        newpassword: encodeURIComponent(c)
    }, function(a, b, c) {
        "success" == $(a).find("response").text() ? d(!0) : d(!1)
    }, "xml")) : d(!1) : d(!1)
}
;
Domain.prototype.checkUserPassword = function(a, b, c) {
    b && 0 != b.length ? this.getUser(a) && (addEvent("chat", "domain_checkUserPassword"),
    log("Backend: Domain.checkUserPassword: " + a + "."),
    $.post("/api/domain/0.1/index.php/user/password/check", {
        username: a,
        password: encodeURIComponent(b)
    }, function(a, b, f) {
        "success" == $(a).find("response").text() ? c(!0) : c(!1)
    }, "xml")) : c(!1)
}
;
Domain.prototype.resendWelcomeEmail = function(a) {
    log("Backend: Domain.resendWelcomeEmail: " + a + ".");
    addEvent("chat", "domain_resendWelcomeEmail");
    $.post("/api/domain/0.1/index.php/user/welcome", {
        username: a
    }, null, "xml")
}
;
Domain.prototype.addPolicy = function(a, b) {
    log("Backend: Domain.addPolicy: " + a + ".");
    addEvent("chat", "domain_addPolicy");
    $.post("/api/domain/0.1/index.php/policy/add", {
        name: encodeURIComponent(a)
    }, function(a, d, e) {
        b()
    }, "xml")
}
;
Domain.prototype.addGroup = function(a, b, c) {
    log("Backend: Domain.addGroup: " + a + ", " + b + ".");
    addEvent("chat", "domain_addGroup");
    $.post("/api/domain/0.1/index.php/group/add", {
        displayname: encodeURIComponent(a),
        policy: b
    }, function(a, b, f) {
        c()
    }, "xml")
}
;
Domain.prototype.deleteGroup = function(a, b) {
    var c = g_domain.getGroup(a);
    !c || 0 < c.users.length || 0 < c.groups.length || (log("Backend: Domain.deleteGroup: " + c + " (" + c.id + ")."),
    addEvent("chat", "domain_deleteGroup"),
    $.post("/api/domain/0.1/index.php/group/delete", {
        group: c.id
    }, function(a, c, f) {
        b()
    }, "xml"))
}
;
Domain.prototype.addGroupChat = function(a, b, c) {
    log("Backend: Domain.addGroupChat: " + a + ", " + b + ".");
    addEvent("chat", "domain_addGroupChat");
    $.post("/api/domain/0.1/index.php/groupchat/add", {
        displayname: encodeURIComponent(a),
        flags: b
    }, function(a, b, f) {
        c()
    }, "xml")
}
;
Domain.prototype.isValidDomainUsername = function(a) {
    if (!a)
        return !1;
    -1 != a.indexOf("@") && (a = a.substring(0, a.indexOf("@")));
    return 1 > a.length || 64 < a.length || !a.match(/^[a-z0-9_.\-\+]+$/i) ? !1 : "a" <= a.charAt(0) && "z" >= a.charAt(0) || "A" <= a.charAt(0) && "Z" >= a.charAt(0) ? -1 != a.indexOf("..") || "." == a.charAt(0) || "." == a.charAt(a.length - 1) || "_" == a.charAt(a.length - 1) ? !1 : !0 : !1
}
;
Domain.prototype.requestBilling = function(a) {
    var b = this;
    b.billingRequested || (b.billingRequested = !0,
    log("Backend: Domain.requestBilling."),
    $.get("/api/user/0.1/index.php/billing/invoices", function(c) {
        log("Backend: Domain.requestBilling: " + c + ".");
        0 == c.error && (b.invoices = c.invoices);
        a()
    }, "json").error(function(b, d, e) {
        log("Backend: Error: Domain.requestBilling: " + b + ", " + d + ", " + e + ".");
        a()
    }))
}
;
Domain.prototype.queueUserClear = function() {
    this.queuedUsers = []
}
;
Domain.prototype.dequeueUser = function(a) {
    for (var b = 0; b < this.queuedUsers.length; b++)
        if (this.queuedUsers[b].username.toLowerCase() == a.toLowerCase()) {
            this.queuedUsers.splice(b, 1);
            break
        }
}
;
Domain.prototype.queueUserCount = function(a) {
    return this.queuedUsers.length
}
;
Domain.prototype.queueUser = function(a, b) {
    var c = {};
    c.username = a;
    c.email = b;
    c.password = this.generatePassword();
    c.done = 0;
    c.error = 0;
    c.pending = 0;
    c.post_id = ++this.nextPendingID;
    this.queuedUsers.push(c)
}
;
Domain.prototype.addUser = function(a, b, c, d, e, f) {
    log("Backend: Domain.addUser: " + a + ", " + b + ", " + d + ", " + e + ".");
    var g = this;
    $.post("/api/domain/0.1/index.php/user/add", {
        nu: a,
        np: c,
        ne: b,
        nf: d,
        nl: e,
        email: 0
    }, function(b) {
        var c = $(b).find("response").text();
        $(b).find("response").attr("id");
        -1 != c.indexOf("success") ? (g.addUserToGroupChatsFromPolicy(a, g.policy),
        f(!0)) : f(!1)
    }, "xml").error(function(a, b, c) {
        log("Backend: Error: Domain.addUser: " + a + ": " + b + ": " + c);
        f(!1)
    })
}
;
Domain.prototype.addUsers = function(a) {
    if (0 != this.queuedUsers.length)
        for (var b = this, c = 0; c < this.queuedUsers.length; c++) {
            var d = this.queuedUsers[c];
            if (!d.done && !d.error) {
                if (d.pending)
                    return;
                a();
                d.pending = 1;
                log("Backend: Domain.addUsers: " + d.username + ", " + d.email + ", " + d.post_id + ".");
                $.post("/api/domain/0.1/index.php/user/add", {
                    nu: d.username,
                    np: d.password,
                    ne: d.email,
                    id: d.post_id,
                    email: 1
                }, function(c) {
                    var f = $(c).find("response").text();
                    $(c).find("response").attr("id");
                    d.pending = 0;
                    d.done = 1;
                    -1 != f.indexOf("success") ? d.error = 0 : d.error = 1;
                    b.addUserToGroupChatsFromPolicy(d.username, b.policy);
                    b.addUsers(a)
                }, "xml").error(function(c, f, g) {
                    log("Backend: Error: Domain.addUsers: " + c + ": " + f + ": " + g);
                    d.pending = 0;
                    d.error = 1;
                    d.done = 1;
                    b.addUsers(a)
                });
                return
            }
        }
    a()
}
;
Domain.prototype.addUsersStatus = function(a) {
    for (var b = 0, c = 0; c < this.queuedUsers.length; c++)
        this.queuedUsers[c].done && b++;
    a(b, this.queuedUsers.length)
}
;
Domain.prototype.addUsersComplete = function() {
    for (var a = 0, b = 0; b < this.queuedUsers.length; b++)
        this.queuedUsers[b].done && a++;
    return a == this.queuedUsers.length ? !0 : !1
}
;
Domain.prototype.generatePassword = function() {
    Math.seedrandom();
    for (var a = "", b = 0; 12 > b; b++)
        a += "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz!@#$^&*():;".charAt(Math.floor(72 * Math.random()));
    return a
}
;
Domain.prototype.pathNameForGroup = function(a) {
    if (0 == a.parent)
        return a.displayname;
    for (var b = 0; b < this.groups.length; b++) {
        var c = this.groups[b];
        if (c.id == a.parent)
            return this.pathNameForGroup(c) + " &rsaquo; " + a.displayname
    }
    return a.displayname
}
;
Domain.prototype.usersUpdated = function() {
    for (var a = 0; a < this.policies.length; a++)
        this.policies[a].users = [],
        this.policies[a].groups = [];
    for (a = 0; a < this.groups.length; a++) {
        var b = this.groups[a];
        b.users = [];
        b.groups = []
    }
    for (a = 0; a < this.groups.length; a++) {
        for (var b = this.groups[a], c = 0; c < this.policies.length; c++)
            if (b.policy == this.policies[c].id) {
                this.policies[c].groups.push(b);
                break
            }
        for (c = 0; c < this.groups.length; c++)
            if (b.parent == this.groups[c].id) {
                this.groups[c].groups.push(b);
                break
            }
        b.pathname = this.pathNameForGroup(b)
    }
    for (a = 0; a < this.users.length; a++) {
        b = this.users[a];
        for (c = 0; c < this.policies.length; c++)
            if (b.policy == this.policies[c].id) {
                this.policies[c].users.push(b);
                break
            }
        for (c = 0; c < this.groups.length; c++)
            if (b.group == this.groups[c].id) {
                this.groups[c].users.push(b);
                break
            }
    }
    for (a = 0; a < this.groupchats.length; a++)
        c = this.groupchats[a],
        b = c.name.indexOf("@"),
        c.nameWithoutDomain = -1 != b ? c.name.substr(0, b) : c.name,
        c.deleted = (c.flags & GroupChatFlagDeleted) == GroupChatFlagDeleted ? !0 : !1,
        this.updateGroupChatDisplayName(c),
        this.updateGroupChatSortString(c)
}
;
Domain.prototype.updateGroupChatDisplayName = function(a) {
    var b = 0
      , c = !1;
    a.displaynameComputed = a.displayname;
    a.displayname || (c = !0,
    0 == a.members.length && (a.displaynameComputed = a.name));
    for (var d = 0; d < a.members.length; d++) {
        var e = a.members[d];
        e.bot || (e.user = this.getUser(e.name));
        e.updateSortAndName();
        if (c) {
            var f = e.nameWithoutDomain;
            e.user && (f = e.user.shortFullname);
            0 < a.displaynameComputed.length && (a.displaynameComputed += ", ");
            a.displaynameComputed += f;
            b++;
            5 <= b && (5 < a.members.length && (a.displaynameComputed += ", +" + (a.members.length - b)),
            c = !1)
        }
    }
}
;
Domain.prototype.groupChatFlagsPrivate = function(a) {
    return (a & GroupChatFlagDisableList) == GroupChatFlagDisableList || (a & GroupChatFlagDisableMemberAdd) == GroupChatFlagDisableMemberAdd ? !0 : !1
}
;
Domain.prototype.updateGroupChatSortString = function(a) {
    var b = this.groupChatFlagsPrivate(a.flags) ? "b_" : "a_"
      , c = a.deleted ? "b_" : "a_";
    "1" != this.getPolicy(this.policy).value["trillian.groupchat.list"] && (b = "a_");
    a.sortBy = c + b + a.displaynameComputed
}
;
Domain.prototype.userSetup = function(a, b, c, d, e, f) {
    var g = encodeURIComponent(a);
    d = encodeURIComponent(d);
    var h = encodeURIComponent(a);
    b && 0 < b.length && (h = encodeURIComponent(b));
    b = encodeURIComponent(e);
    c = encodeURIComponent(c);
    $.ajax({
        url: "/api/user/0.1/index.php/change/password",
        type: "POST",
        data: "cm=1&au=" + g + "&np=" + d + "&ae=" + h + "&ac=" + b + "&name=" + c + "&send=business" + g_postVersion,
        dataType: "xml",
        success: function(b) {
            b = $(b).find("response").text();
            -1 != b.indexOf("success") ? (addEvent("chat", "domainWelcome_success"),
            f(!0, b)) : -1 != b.indexOf("already") ? (addEvent("chat", "domainWelcome_" + b, a),
            f(!0, b)) : (addEvent("chat", "domainWelcome_" + b, a),
            f(!1, b))
        },
        error: function(a, b, c) {
            addEvent("chat", "domainWelcome_error");
            f(!1, null)
        }
    })
}
;
Domain.prototype.domainCreate = function(a, b, c, d, e, f) {
    var g = encodeURIComponent(a);
    c = encodeURIComponent(c);
    d = encodeURIComponent(d);
    e = encodeURIComponent(e);
    b = encodeURIComponent(b);
    $.ajax({
        url: "/api/domain/0.1/index.php/signup/",
        type: "POST",
        data: "id=1&challenge=" + e + "&company=" + d + "&password=" + c + "&email=" + g + "&name=" + b + g_postVersion,
        dataType: "xml",
        success: function(b) {
            b = $(b).find("response").text();
            -1 != b.indexOf("success") ? (addEvent("chat", "domainCreate_success"),
            f(!0, b)) : (addEvent("chat", "domainCreate_" + b, a),
            f(!1, b))
        },
        error: function(a, b, c) {
            addEvent("chat", "domainCreate_error");
            f(!1, null)
        }
    })
}
;
function History() {
    this.reset()
}
History.prototype.reset = function() {
    this.username = !1;
    this.conversations = []
}
;
History.prototype.request = function(a, b, c) {
    var d = this;
    d.reset();
    d.username = a;
    var e = b ? {
        groupchat: a
    } : {
        username: a
    };
    log("Backend: History.request: " + a + ", " + b + ".");
    $.post("/api/domain/0.1/index.php/history", e, function(a, b, e) {
        $(a).find("conversation").each(function() {
            var a = {
                group: !1
            };
            a.id = $(this).attr("id");
            a.medium = $(this).attr("medium");
            a.account = $(this).attr("account");
            a.name = $(this).attr("name");
            a.revision = $(this).attr("revision");
            a.messages = [];
            a.weeks = [];
            $(this).find("week").each(function() {
                var b = {};
                b.year = $(this).attr("year");
                b.week = $(this).attr("week");
                b.requested = !1;
                a.weeks.push(b)
            });
            d.conversations.push(a)
        });
        $(a).find("groupconversation").each(function() {
            var a = {
                group: !0
            };
            a.id = $(this).attr("id");
            a.medium = $(this).attr("medium");
            a.name = $(this).attr("name");
            a.revision = $(this).attr("revision");
            a.messages = [];
            a.weeks = [];
            $(this).find("week").each(function() {
                var b = {};
                b.year = $(this).attr("year");
                b.week = $(this).attr("week");
                b.requested = !1;
                a.weeks.push(b)
            });
            d.conversations.push(a)
        });
        c()
    }, "xml").error(function(a, b, d) {
        log("Backend: Error: History.request: " + a + ", " + b + ", " + d + ".");
        c()
    })
}
;
History.prototype.getConversation = function(a) {
    for (var b = 0; b < this.conversations.length; b++)
        if (this.conversations[b].id == a)
            return this.conversations[b];
    return null
}
;
History.prototype.requestHistory = function(a, b, c, d, e) {
    if (b = this.getConversation(b)) {
        var f = new Date(d,c - 1,0)
          , g = new Date(d,0,0);
        c = new Date(d,c,0);
        var h = new Date(c.getFullYear(),0,0)
          , f = Math.floor(dateSubtract(g, f) / 7)
          , g = Math.floor(dateSubtract(h, c) / 7 + 1);
        if (d != c.getFullYear()) {
            for (; 0 <= g; g--)
                this.requestHistoryWeek(a, b, g, c.getFullYear(), e);
            g = 53
        }
        for (; g >= f; g--)
            this.requestHistoryWeek(a, b, g, d, e)
    }
}
;
History.prototype.requestHistoryWeek = function(a, b, c, d, e) {
    for (var f = !1, g = 0; g < b.weeks.length; g++)
        if (b.weeks[g].week == c && b.weeks[g].year == d) {
            if (b.weeks[g].requested)
                return;
            f = b.weeks[g].requested = !0;
            break
        }
    f && (f = {
        username: a,
        conversation: b.id,
        week: c,
        year: d
    },
    g = "/api/domain/0.1/index.php/history/conversation",
    b.group && (g = "/api/domain/0.1/index.php/history/groupconversation",
    f = {
        groupchat: a,
        conversation: b.id,
        week: c,
        year: d
    }),
    log("Backend: History.requestHistoryWeek: " + g + ", " + f + "."),
    $.post(g, f, function(a, c, d) {
        $(a).find("message").each(function() {
            var a = {};
            a.timestamp = $(this).attr("timestamp");
            a.type = $(this).attr("type");
            a.from = $(this).attr("from");
            a.text = $(this).text();
            b.messages.push(a)
        });
        b.messages.sort(function(a, b) {
            return a.timestamp - b.timestamp
        });
        e(b.id)
    }, "xml").error(function(a, c, d) {
        log("Backend: Error: History.requestHistoryWeek: " + a + ", " + c + ", " + d + ".");
        e(b.id)
    }))
}
;
History.prototype.historyForConversation = function(a) {
    if (a = this.getConversation(a))
        return a.messages
}
;
var DEFAULT_POLICIES = [];
DEFAULT_POLICIES["trillian.autoupdate"] = 0;
DEFAULT_POLICIES["trillian.history.disclaimer"] = 0;
DEFAULT_POLICIES["trillian.history.disclaimer.text"] = "Notice%3A%20All%20messages%20sent%20and%20received%20by%20this%20user%20are%20being%20recorded.";
DEFAULT_POLICIES["trillian.history.groupchat"] = 1;
DEFAULT_POLICIES["trillian.plugin.oscar"] = 1;
DEFAULT_POLICIES["trillian.plugin.facebook"] = 1;
DEFAULT_POLICIES["trillian.plugin.irc"] = 1;
DEFAULT_POLICIES["trillian.plugin.linkedin"] = 1;
DEFAULT_POLICIES["trillian.plugin.skype"] = 1;
DEFAULT_POLICIES["trillian.plugin.msn"] = 1;
DEFAULT_POLICIES["trillian.plugin.rendezvous"] = 1;
DEFAULT_POLICIES["trillian.plugin.foursquare"] = 1;
DEFAULT_POLICIES["trillian.plugin.xmpp"] = 1;
DEFAULT_POLICIES["trillian.plugin.myspace"] = 1;
DEFAULT_POLICIES["trillian.plugin.twitter"] = 1;
DEFAULT_POLICIES["trillian.plugin.yahoo"] = 1;
DEFAULT_POLICIES["trillian.filetransfer"] = "p2p";
DEFAULT_POLICIES["trillian.filetransfer.oscar"] = 1;
DEFAULT_POLICIES["trillian.filetransfer.irc"] = 1;
DEFAULT_POLICIES["trillian.filetransfer.skype"] = 1;
DEFAULT_POLICIES["trillian.filetransfer.msn"] = 1;
DEFAULT_POLICIES["trillian.filetransfer.rendezvous"] = 1;
DEFAULT_POLICIES["trillian.filetransfer.xmpp"] = 1;
DEFAULT_POLICIES["trillian.filetransfer.yahoo"] = 1;
DEFAULT_POLICIES["trillian.settings.plugins"] = 1;
DEFAULT_POLICIES["trillian.settings.skins"] = 1;
DEFAULT_POLICIES["trillian.settings.status"] = 1;
DEFAULT_POLICIES["trillian.mail"] = 1;
DEFAULT_POLICIES["trillian.mail.oscar"] = 1;
DEFAULT_POLICIES["trillian.mail.xmpp"] = 1;
DEFAULT_POLICIES["trillian.mail.msn"] = 1;
DEFAULT_POLICIES["trillian.mail.yahoo"] = 1;
DEFAULT_POLICIES["trillian.mail.facebook"] = 1;
DEFAULT_POLICIES["trillian.mail.myspace"] = 1;
DEFAULT_POLICIES["trillian.groupchat.oscar"] = 1;
DEFAULT_POLICIES["trillian.groupchat.irc"] = 1;
DEFAULT_POLICIES["trillian.groupchat.xmpp"] = 1;
DEFAULT_POLICIES["trillian.groupchat.skype"] = 1;
DEFAULT_POLICIES["trillian.groupchat.msn"] = 1;
DEFAULT_POLICIES["trillian.groupchat.yahoo"] = 1;
DEFAULT_POLICIES["trillian.groupchat.join.impp"] = 1;
DEFAULT_POLICIES["trillian.media"] = "server";
DEFAULT_POLICIES["trillian.federation"] = 1;
DEFAULT_POLICIES["trillian.voice"] = 1;
DEFAULT_POLICIES["trillian.groupchat.bind.impp"] = "";
DEFAULT_POLICIES["trillian.groupchat.create.impp"] = 1;
function Policy() {
    this.reset()
}
Policy.prototype.reset = function() {
    this.users = [];
    this.value = [];
    this.data = null;
    this.id = -1;
    this.name = null
}
;
Policy.prototype.process = function(a) {
    this.reset();
    if (void 0 != a.data) {
        this.data = a.data;
        this.name = a.name;
        this.id = a.id;
        this.value = [];
        for (var b in DEFAULT_POLICIES)
            "indexOf" != b && (this.value[b] = DEFAULT_POLICIES[b]);
        a = $.base64.decode(a.data).split("\n");
        for (b = 0; b < a.length; b++) {
            var c = String(a[b]);
            0 != c.length && (c = c.split(" "),
            2 == c.length && (parseInt(c[1]) == c[1] ? this.value[c[0]] = parseInt(c[1]) : this.value[c[0]] = c[1]))
        }
    }
}
;
Policy.prototype.toString = function() {
    var a = [], b;
    for (b in this.value)
        "indexOf" != b && a.push(b);
    a.sort();
    var c = "";
    for (b = 0; b < a.length; b++)
        DEFAULT_POLICIES[a[b]] != this.value[a[b]] && (c += a[b] + " " + this.value[a[b]] + "\n");
    return c
}
;
Policy.prototype.update = function() {
    if (-1 != this.id) {
        var a = $.base64.encode(this.toString());
        log("Backend: Policy.update: " + this.id + ", " + a + ".");
        addEvent("chat", "domain_updatePolicy");
        $.post("/api/domain/0.1/index.php/policy/set", {
            policy: this.id,
            data: a
        }, null, "xml")
    }
}
;
Policy.prototype.setName = function(a) {
    -1 != this.id && this.name && "" != this.name && (this.name = a,
    log("Backend: Policy.setName: " + this.id + ", " + a + "."),
    addEvent("chat", "domain_setPolicyName"),
    $.post("/api/domain/0.1/index.php/policy/name", {
        policy: this.id,
        name: encodeURIComponent(a)
    }, null, "xml"))
}
;
Policy.prototype.addInitialGroupChat = function(a, b) {
    for (var c = 0, d = this.value["trillian.groupchat.bind.impp"].split(","), e = 0; e < d.length; e++) {
        var f = d[e].trim();
        if (0 != f.length) {
            if (f.toLowerCase() == a.toLowerCase())
                return;
            c++
        }
    }
    this.value["trillian.groupchat.bind.impp"] = 0 < c ? this.value["trillian.groupchat.bind.impp"] + ("," + a) : a;
    this.update();
    f = g_domain.getGroupChat(a);
    this.addInitialGroupChatMembers(f, 0, b)
}
;
Policy.prototype.addInitialGroupChatMembers = function(a, b, c) {
    if (a)
        if (b >= this.users.length)
            c && c(1);
        else {
            var d = this;
            c && c(b / d.users.length);
            if (d.users[b].deleted)
                d.addInitialGroupChatMembers(a, b + 1, c);
            else {
                var e = new GroupChatMember;
                e.name = d.users[b].username;
                g_domain.addGroupChatMember(a, e, 0, function() {
                    d.addInitialGroupChatMembers(a, b + 1, c)
                })
            }
        }
    else
        c && c(1)
}
;
Policy.prototype.removeInitialGroupChat = function(a) {
    for (var b = "", c = this.value["trillian.groupchat.bind.impp"].split(","), d = 0; d < c.length; d++) {
        var e = c[d].trim();
        0 != e.length && e.toLowerCase() != a.toLowerCase() && (b = 0 < b.length ? b + ("," + e) : e)
    }
    this.value["trillian.groupchat.bind.impp"] = b;
    this.update()
}
;
Policy.prototype.deletePolicy = function(a) {
    0 < this.users.length || 0 < this.groups.length || (log("Backend: Policy.deletePolicy: " + this.id + "."),
    addEvent("chat", "domain_deletePolicy"),
    $.post("/api/domain/0.1/index.php/policy/delete", {
        policy: this.id
    }, function(b, c, d) {
        a()
    }, "xml"))
}
;
Policy.prototype.userCount = function() {
    for (var a = 0, b = 0; b < this.users.length; b++)
        this.users[b].deleted || a++;
    return a
}
;
function Group() {
    this.reset()
}
Group.prototype.reset = function() {
    this.users = [];
    this.groups = [];
    this.id = -1;
    this.displayname = this.name = null;
    this.domaingroup = this.policy = this.parent = 0;
    this.closed = !1
}
;
Group.prototype.process = function(a) {
    this.reset();
    this.id = a.id;
    this.name = a.name;
    this.parent = a.parent;
    this.displayname = a.displayname;
    this.policy = a.policy
}
;
Group.prototype.userCount = function() {
    for (var a = 0, b = 0; b < this.users.length; b++)
        this.users[b].deleted || a++;
    return a
}
;
function GroupChatMember() {
    this.reset()
}
GroupChatMember.prototype.reset = function() {
    this.user = this.name = null;
    this.flags = 0;
    this.sortBy = null;
    this.bot = this.voice = this.op = 0;
    this.nameWithoutDomain = this.type = this.avatarURL = this.displayname = null
}
;
GroupChatMember.prototype.process = function(a) {
    this.reset();
    this.name = a.name;
    this.displayname = "" != a.displayname ? a.displayname : this.name;
    this.user = a.user;
    this.flags = a.flags;
    this.avatarURL = "" != a.avatarURL ? a.avatarURL : null;
    this.updateSortAndName()
}
;
GroupChatMember.prototype.updateSortAndName = function() {
    this.user && (this.displayname = this.user.fullname);
    this.displayname || (this.displayname = this.name);
    var a = this.name.indexOf("@");
    this.nameWithoutDomain = -1 != a ? this.name.substr(0, a) : this.name;
    this.sortBy = "";
    this.sortBy = this.op && this.voice ? "a_" : this.op ? "b_" : this.voice ? "c_" : "d_";
    this.sortBy += this.displayname;
    this.bot = this.voice = this.op = !1;
    this.type = "Normal";
    (this.flags & MemberFlagOp) == MemberFlagOp && (this.flags & MemberFlagVoice) == MemberFlagVoice ? (this.voice = this.op = !0,
    this.type = "Op & Voice") : (this.flags & MemberFlagOp) == MemberFlagOp ? (this.op = !0,
    this.type = "Op") : (this.flags & MemberFlagVoice) == MemberFlagVoice && (this.voice = !0,
    this.type = "Voice");
    (this.flags & MemberFlagBot) == MemberFlagBot && (this.bot = !0)
}
;
var g_domainSelectedUser = null
  , g_domainSelectedUserGroup = 0
  , g_domainSelectedPolicy = null
  , g_domainSelectedGroup = null
  , g_domainSelectedGroupChat = null
  , g_domainSelectedGroupChatMember = null
  , g_domainSelectedConversationID = 0
  , g_domainSelectedConversationName = 0
  , g_domainSelectedHistoryUsername = null
  , g_domainSelectedGroupChatMemberListPending = null
  , g_domainSelectedPrivateGroupChats = []
  , g_domainSkipAdminCheck = !1
  , g_textEditSet = null
  , g_textAreaSet = null
  , g_textAreaCancel = null
  , g_textChangeSet = null;
function domainReset() {
    g_domain = null;
    $("#x_domainPoliciesCount").text("");
    $("#x_domainTrialAd").text("");
    $("#x_domainTrialAd").hide();
    $("#x_domainUsersChange").show();
    $("#x_domainUserListSearchInput").val("");
    $("#x_domainUserList").html("<img src='img/spinner.gif'>");
    $("#x_domainUserListPending").text("");
    $("#x_domainPolicyListSearchInput").val("");
    $("#x_domainPolicyList").html("<img src='img/spinner.gif'>");
    $("#x_domainUserSelected").text("");
    $("#x_domainSelectedUserHeader").text("");
    $("#x_domainSelectedUsername").text("");
    $("#x_domainSelectedEmail").text("");
    $("#x_domainSelectedName").text("");
    $("#x_domainSelectedPolicy").text("");
    $("#x_domainSelectedGroup").text("");
    $("#x_domainSelectedType").text("");
    domainResetPayment();
    $("#x_domainPolicySelected").text("");
    $("#x_domainSelectedPolicyHeader").text("");
    $("#x_domainGroupSelected").text("");
    $("#x_domainSelectedGroupHeader").text("");
    $("div[tab=selected_user]").hide();
    $("div[tab=selected_policy]").hide();
    $("div[tab=selected_group]").hide();
    $("div[tab=selected_groupchat]").hide();
    resetBillingInvoice()
}
function domainUserUpdate() {
    $("#x_domainUsersCount").text(g_domain.licensesTotal - g_domain.licensesAvailable);
    updateNewsFeed()
}
function domainUpdate() {
    $("#x_domainManagerAvatar").attr("src", g_user.avatar);
    g_controller.windowTitleUpdate();
    domainUserUpdate();
    domainFillUserList();
    domainFillGroupChatList();
    domainFillPolicyList();
    g_domain.trial ? $("#x_domainUsersChange").hide() : $("#x_domainUsersChange").show();
    if (g_domain.trial && g_domain.trialAlmostExpired) {
        var a = ""
          , a = Math.round((new Date).getTime() / 1E3)
          , a = Math.round((g_domain.trialExpires.getTime() / 1E3 - a) / 86400);
        0 > a ? (a *= -1,
        a = 0 == a ? "today" : 1 == a ? a + " day ago" : a + " days ago",
        $("#x_ad").html("Your trial expired <b>" + a + "</b>.  Some features have been disabled.  <b>Upgrade now!</b>"),
        $("#x_ad").addClass("expired")) : (a = 0 == a ? "today" : 1 == a ? "in " + a + " day" : "in " + a + " days",
        $("#x_ad").html("Your trial will expire <b>" + a + "</b>.  <b>Upgrade now!</b>"),
        $("#x_ad").removeClass("expired"));
        $("#x_ad").removeClass("wizard");
        $("#x_ad").show();
        g_adVisible = !0
    } else
        1 == g_domain.users.length ? ($("#x_ad").html('<img width="16" height="16" src="img/icons/fire.png">It\'s dangerous to chat alone!  Consider inviting some co-workers to get started.'),
        $("#x_ad").addClass("wizard"),
        $("#x_ad").show(),
        g_adVisible = !0) : ($("#x_ad").hide(),
        $("#x_ad").removeClass("expired"),
        $("#x_ad").removeClass("wizard"),
        g_adVisible = !1);
    resize()
}
$("#adminTextChangeModalSet").click(function() {
    g_textChangeSet && g_textChangeSet();
    g_textChangeSet = null
});
$("#adminTextChangeModalCancel").click(function() {
    hideModal("#adminTextChangeModal")
});
$("#adminTextEditModalSet").click(function() {
    g_textEditSet && g_textEditSet()
});
$("#adminTextEditModalCancel").click(function() {
    hideModal("#adminTextEditModal")
});
$("#adminTextAreaModalSet").click(function() {
    $(this).hasClass("disabled") || (g_textAreaSet && g_textAreaSet(),
    g_textAreaSet = null)
});
$("#adminTextAreaModalCancel").click(function() {
    $(this).hasClass("disabled") || (g_textAreaCancel ? (g_textAreaCancel(),
    g_textAreaCancel = null) : hideModal("#adminTextAreaModal"))
});
$("#adminTextShowModalClose").click(function() {
    hideModal("#adminTextShowModal")
});
$("#x_domainPlanPaymentTrialBuy").click(function() {
    addEvent("chat", "domain_trialPaymentBuy");
    domainSelectBilling("trial", null, 0, 0, null, 0, "year")
});
$("#x_ad").click(function() {
    g_domain && ($(this).hasClass("wizard") ? (addStatisticEvent("ad_wizard"),
    addEvent("chat", "domain_wizardAd"),
    domainUserInvite(!1)) : (addEvent("chat", "domain_trialAd"),
    domainSelectBilling("trial", null, 0, 0, null, 0, "year")))
});
var g_domainUserInviteSimple = !0
  , g_domainUserInviteWizard = !1;
function domainUserRow(a) {
    var b = a.fullname.substr(0, 1).toUpperCase()
      , c = a.fullname.indexOf(" ");
    -1 != c && (b += a.fullname.substr(c + 1, 1).toUpperCase());
    var d = "offline"
      , e = getContact("ASTRA", a.username);
    e && (d = e.status);
    var c = getStatusSimplified(d)
      , f = "";
    a.deleted ? f = "Disabled" : a.invited ? f = "Invitation Sent" : (f = getStatusLabel(d),
    e && e.status_message && 0 < e.status_message.length && (f = e.status_message.stripHtml()));
    d = a.iconhash ? '<img src="/api/user/0.1/index.php/s3/avatar/' + a.iconhash + '">' : "";
    b = "<span class='avatar avatar30 empty'>" + b + "</span>";
    a.iconhash && (b = "<span class='avatar avatar30'>" + d + "</span>");
    f = "Name: " + a.fullname + "\nUsername: " + a.username + "\nStatus: " + f + "";
    d = "";
    a.domain_admin && (f += "\nType: Admin",
    d = "<span class='admin'>Admin</span>");
    f = htmlEncode(f);
    return "<td class='image' status='" + c + "'>" + b + "</td><td class='name' title='" + f + "'>" + htmlEncode(a.fullname) + d + "</td><td class='status' status='" + c + "' title='" + f + "'><span class='status'></span></td>"
}
function domainContactStatusUpdate(a) {
    if (g_user && g_user.domain_admin && g_domain) {
        var b = $("#x_domainUserList tr[username='" + a.realname + "']");
        if (b) {
            var c = g_domain.getUser(a.realname);
            c && b.html(domainUserRow(c))
        }
        if (g_domainSelectedUser && g_domainSelectedUser.toLowerCase() == a.realname.toLowerCase()) {
            c = g_domain.getUser(g_domainSelectedUser);
            a = "offline";
            if (c = getContact("ASTRA", c.username))
                a = c.status;
            $("div[page=selected_user]").attr("status", getStatusSimplified(a))
        }
    }
}
function domainGroupDisplayname(a, b) {
    var c = a.displayname.toUpperCase();
    if (!a.parent)
        return c;
    for (var d = 0; d < b.length; d++) {
        var e = b[d];
        if (e.id == a.parent && a != e && 0 != a.parent) {
            c = domainGroupDisplayname(e, b) + " &rsaquo; " + c;
            break
        }
    }
    return c
}
function domainGroupDepth(a, b) {
    if (!a.parent)
        return 0;
    for (var c = 1, d = 0; d < b.length; d++) {
        var e = b[d];
        if (e.id == a.parent && a != e && 0 != a.parent) {
            c += domainGroupDepth(e, b);
            break
        }
    }
    return c
}
function domainFillUserList() {
    for (var a = [], b = g_domain.groups.slice(0), c = [], d = 0, e = 0; e < b.length; e++) {
        var f = b[e]
          , g = domainGroupDepth(f, b)
          , h = domainGroupDisplayname(f, b)
          , k = f.id == g_domainSelectedUserGroup ? " selected" : ""
          , l = f.displayname
          , m = " settings_available";
        0 == f.id ? (l = g_domain.companyName ? g_domain.companyName : g_domain.domainname,
        m = "") : f.domaingroup && (l = "USERS WITHOUT A GROUP",
        m = " separated" + m,
        g = "0");
        a[f.id] = {};
        a[f.id].groupHtml = "<tr class='group click" + m + " indent" + g + k + "' group='" + f.id + "'><td class='name'>" + l.toUpperCase() + "</td><td class='count_settings'><span class='count'>%num%</span><span class='icon settings'>&nbsp;</span></td></tr>";
        a[f.id].group = f;
        a[f.id].count = 0;
        a[f.id].sortString = 0 == f.id ? "a_" : f.domaingroup ? "c_" : "b_" + h
    }
    k = -1 == g_domainSelectedUserGroup ? " selected" : "";
    b = {};
    b.groupHtml = "<tr class='separated group click indent0" + k + "' group='-1'><td class='name'>DISABLED USERS</td><td class='count_settings'><span class='count'>%num%</span></td></tr>";
    b.group = null;
    b.count = 0;
    b.sortString = "d_";
    k = $.trim($("#x_domainUserListSearchInput").val()).toLowerCase();
    for (e = 0; e < g_domain.users.length; e++) {
        g = g_domain.users[e];
        f = g.group;
        h = a[f];
        g.deleted && (h = b);
        g.deleted || d++;
        h.count++;
        if (0 < k.length) {
            if (-1 == g.username.toLowerCase().indexOf(k) && -1 == g.fullname.toLowerCase().indexOf(k) && -1 == h.sortString.substring(2).toLowerCase().indexOf(k))
                continue
        } else if (-1 == g_domainSelectedUserGroup) {
            if (!g.deleted)
                continue
        } else {
            if (g.deleted)
                continue;
            if (0 != g_domainSelectedUserGroup && f != g_domainSelectedUserGroup)
                continue
        }
        c.push(g)
    }
    f = "";
    g = 0;
    for (e in c) {
        if (500 == g) {
            f += '<tr><td class="eof" colspan="3">Limiting to the first 500 users.  Please search for a particular user.</td></tr>';
            break
        }
        f += "<tr class='click user" + (c[e].deleted ? " disabled" : "") + "' username='" + htmlEncode(c[e].username) + "'>" + domainUserRow(c[e]) + "</tr>";
        ++g
    }
    k ? f = 0 == g ? f + ('<tr class="empty"><td colspan="3">No users found for search &quot;' + k + "&quot;.  <span class='clearsearch click'>Click to clear search.</span></td></tr>") : f + ('<tr><td class="eof" colspan="3">End of results for &quot;' + k + "&quot;.  <span class='clearsearch click'>Click to clear search.</span></td></tr>") : 0 == g && (f += '<tr class="empty"><td colspan="3">No users found within the selected group. <span class=\'allusers click\'>Click to view all users.</span></td></tr>');
    g = [];
    for (e in a)
        a[e].groupHtml = 0 == a[e].group.id ? a[e].groupHtml.replace("%num%", d) : a[e].groupHtml.replace("%num%", a[e].count),
        g.push(a[e]);
    g.sort(function(a, b) {
        return a.sortString.localeCompare(b.sortString)
    });
    a = "<table><colgroup><col><col class='narrow'></colgroup>";
    if (k)
        a += "<tr class='group indent0 selected' group='search'><td class='name'>&quot;" + k.toUpperCase() + "&quot;</td><td class='count'>" + c.length + "</td></tr>";
    else {
        for (e = 0; e < g.length; e++)
            a += g[e].groupHtml;
        0 < b.count && (b.groupHtml = b.groupHtml.replace("%num%", b.count),
        a += b.groupHtml)
    }
    a += "</table>";
    $("#x_domainGroupList").html(a);
    c = "<table><colgroup><col class='narrower'><col><col class='narrow'></colgroup>" + f + "</table>";
    $("#x_domainUserList").html(c);
    $("#x_domainUserListSearch").show();
    $("#x_domainUserList .user").click(function() {
        addStatisticEvent("users_select");
        domainSelectUser($(this).attr("username"), !1)
    });
    $("#x_domainUserList .clearsearch").click(function() {
        addStatisticEvent("users_search_clear");
        $("#x_domainUserListSearchInput").val("");
        domainFillUserList()
    });
    $("#x_domainUserList .allusers").click(function() {
        addStatisticEvent("users_group_all");
        g_domainSelectedUserGroup = 0;
        domainFillUserList()
    });
    $("#x_domainGroupList .group").click(function() {
        addStatisticEvent("users_group_filter");
        if ("search" == $(this).attr("group"))
            return !1;
        g_domainSelectedUserGroup = $(this).attr("group");
        domainFillUserList()
    });
    $("#x_domainGroupList .settings").click(function() {
        addStatisticEvent("users_group");
        if ("search" == $(this).attr("group"))
            return !1;
        domainSelectGroup($(this).parent().parent().attr("group"))
    });
    domainFillPolicyList()
}
$("#x_domainUserListSearchInput").keyup(function() {
    domainFillUserList()
});
function domainSelectUser(a, b) {
    g_domainSelectedUser = a;
    var c = g_domain.getUser(a);
    $("div[tab=selected_user]").show();
    $("#x_domainUserSelected").text(c.fullname);
    $("#x_domainSelectedUserHeader").text(c.fullname);
    $("[tab=selected_user]").addClass("active").siblings("[tab]").removeClass("active");
    $("[page=selected_user]").show().siblings("[page]").hide();
    $("#x_domainSelectedUsername").text(c.username);
    $("#x_domainSelectedEmail").text(c.email);
    var d = "offline"
      , e = getContact("ASTRA", c.username);
    e && (d = e.status);
    $("div[page=selected_user]").attr("status", getStatusSimplified(d));
    c.myself ? domainWarning("This is your own account.  Some features are not available in this area.") : c.deleted ? domainWarning(c.fullname + " is currently disabled and will not be able to sign in.") : c.invited ? domainWarning(c.fullname + " has not yet responded to the invitiation email.") : domainWarning(null);
    c.iconhash ? (d = '<img src="/api/user/0.1/index.php/s3/avatar/' + c.iconhash + '">',
    $("#x_domainSelectedUserAvatar").removeClass("empty"),
    $("#x_domainSelectedUserAvatar").html(d)) : (d = c.fullname.substr(0, 1).toUpperCase(),
    e = c.fullname.indexOf(" "),
    -1 != e && (d += c.fullname.substr(e + 1, 1).toUpperCase()),
    $("#x_domainSelectedUserAvatar").addClass("empty"),
    $("#x_domainSelectedUserAvatar").text(d));
    c.email.toLowerCase() != c.username.toLowerCase() ? $("#x_domainSelectedEmailVisible").show() : $("#x_domainSelectedEmailVisible").hide();
    $("#x_domainSelectedName").text(c.firstname + " " + c.lastname);
    c.invited ? $("#x_domainSelectedResend").show() : $("#x_domainSelectedResend").hide();
    $("#x_domainSelectedResent").hide();
    $("#x_domainSelectedPolicy").text("");
    for (d = 0; d < g_domain.policies.length; d++)
        if (g_domain.policies[d].id == c.policy) {
            $("#x_domainSelectedPolicy").text(g_domain.policies[d].name);
            break
        }
    $("#x_domainSelectedGroup").text("");
    for (d = 0; d < g_domain.groups.length; d++)
        if (g_domain.groups[d].id == c.group) {
            g_domain.groups[d].domaingroup ? $("#x_domainSelectedGroup").text("None") : $("#x_domainSelectedGroup").text(g_domain.groups[d].displayname);
            break
        }
    c.domain_admin ? ($("#x_domainSelectedType").text("Administrator"),
    $("#x_domainSelectedPromote").hide(),
    $("#x_domainSelectedDemote").show()) : ($("#x_domainSelectedType").text("Normal"),
    $("#x_domainSelectedPromote").show(),
    $("#x_domainSelectedDemote").hide());
    c.deleted ? ($("#x_domainSelectedEnable").show(),
    $("#x_domainSelectedDisable").hide()) : ($("#x_domainSelectedEnable").hide(),
    $("#x_domainSelectedDisable").show());
    c.myself ? ($("#x_domainSelectedPromote").hide(),
    $("#x_domainSelectedDemote").hide(),
    $("#x_domainSelectedEnable").hide(),
    $("#x_domainSelectedDisable").hide(),
    $("#x_domainSelectedPasswordChange").hide(),
    $("#x_domainSelectedNameEdit").hide()) : ($("#x_domainSelectedPasswordChange").show(),
    $("#x_domainSelectedNameEdit").show());
    b || ($("#x_domainUserListSearchInput").val(""),
    domainFillUserList())
}
$("#x_domainSelectedResend").click(function() {
    addStatisticEvent("users_resend");
    $("#x_domainSelectedResend").hide();
    $("#x_domainSelectedResent").show();
    g_domain.resendWelcomeEmail(g_domainSelectedUser)
});
$("#x_domainSelectedHistory").click(function() {
    addStatisticEvent("users_history");
    domainShowHistoryForUser(g_domainSelectedUser)
});
$("#x_domainSelectedEnable").click(function() {
    addStatisticEvent("users_enable");
    g_domain.undeleteUser(g_domainSelectedUser);
    domainFillUserList();
    domainUserUpdate();
    domainSelectUser(g_domainSelectedUser, !0)
});
$("#x_domainSelectedDisable").click(function() {
    addStatisticEvent("users_disable");
    var a = g_domain.getUserGroupChats(g_domainSelectedUser);
    0 < a.length ? ($("#adminTextAreaModal .header").html("<h4>Disable User?</h4>"),
    1 == a.length ? $("#adminTextAreaModal .body").html("<b>" + g_domainSelectedUser + "</b> will also be removed from <b>" + a.length + "</b> group chat.  Are you sure?") : $("#adminTextAreaModal .body").html("<b>" + g_domainSelectedUser + "</b> will also be removed from <b>" + a.length + "</b> group chats.  Are you sure?"),
    $("#adminTextAreaModalSet").addClass("delete"),
    $("#adminTextAreaModalSet").text("Disable"),
    g_textAreaSet = function() {
        deleteSelectedUser();
        hideModal("#adminTextAreaModal")
    }
    ,
    g_textAreaCancel = function() {
        hideModal("#adminTextAreaModal")
    }
    ,
    showModal("#adminTextAreaModal")) : deleteSelectedUser()
});
function deleteSelectedUser() {
    g_domain.deleteUser(g_domainSelectedUser);
    domainFillUserList();
    domainUserUpdate();
    domainSelectUser(g_domainSelectedUser, !0)
}
$("#x_domainSelectedPromote").click(function() {
    addStatisticEvent("users_admin");
    g_domain.promoteUser(g_domainSelectedUser);
    domainFillUserList();
    domainSelectUser(g_domainSelectedUser, !0)
});
$("#x_domainSelectedDemote").click(function() {
    addStatisticEvent("users_noadmin");
    g_domain.demoteUser(g_domainSelectedUser);
    domainFillUserList();
    domainSelectUser(g_domainSelectedUser, !0)
});
$("#x_domainSelectedNameEdit").click(function() {
    addStatisticEvent("users_name");
    var a = g_domain.getUser(g_domainSelectedUser);
    $("#x_adminTextNameFirstEdit").val(a.firstname);
    $("#x_adminTextNameLastEdit").val(a.lastname);
    showModal("#x_adminTextNameEditModal");
    $("#x_adminTextNameFirstEdit").focus()
});
$("#x_adminTextNameEditModalSet").click(function() {
    addStatisticEvent("users_name_set");
    g_domain.setUserNames(g_domainSelectedUser, $.trim($("#x_adminTextNameFirstEdit").val()), $.trim($("#x_adminTextNameLastEdit").val()));
    domainFillUserList();
    domainSelectUser(g_domainSelectedUser, !0);
    hideModal("#x_adminTextNameEditModal")
});
$("#x_adminTextNameEditModalCancel").click(function() {
    addStatisticEvent("users_name_cancel");
    hideModal("#x_adminTextNameEditModal")
});
$("#x_domainSelectedPasswordChange").click(function() {
    $("#x_adminPasswordChangeEmail").attr("selected", !0);
    domainPasswordChangeUpdate();
    showModal("#x_adminPasswordChangeModal")
});
$("#x_adminPasswordChangeSelect").change(function() {
    domainPasswordChangeUpdate()
});
function domainPasswordChangeUpdate() {
    if ($("#x_adminPasswordChangeEmail").is(":selected")) {
        $("#x_adminPasswordChangeModal .header h4").text("Reset Password");
        $("#x_adminPasswordChangeModalSet").text("Send");
        $("#x_adminPasswordChangePasswordExistingDiv").hide();
        $("#x_adminPasswordChangePasswordNewDiv").hide();
        var a = g_domain.getUser(g_domainSelectedUser);
        $("#x_adminPasswordChangeWarning").text("A password reset link will be sent to " + a.email + ".").show()
    } else
        $("#x_adminPasswordChangeChange").is(":selected") ? ($("#x_adminPasswordChangeModal .header h4").text("Change Password"),
        $("#x_adminPasswordChangeModalSet").text("Change"),
        $("#x_adminPasswordChangePasswordExistingDiv").show(),
        $("#x_adminPasswordChangePasswordExisting").focus(),
        $("#x_adminPasswordChangePasswordNewDiv").show(),
        $("#x_adminPasswordChangeWarning").hide()) : $("#x_adminPasswordChangeReset").is(":selected") ? ($("#x_adminPasswordChangeModal .header h4").text("Reset Password"),
        $("#x_adminPasswordChangeModalSet").text("Change"),
        $("#x_adminPasswordChangePasswordExistingDiv").hide(),
        $("#x_adminPasswordChangePasswordNewDiv").show(),
        $("#x_adminPasswordChangePasswordNew").focus(),
        $("#x_adminPasswordChangeWarning").text("Resetting the password will remove all third party IM accounts.").show()) : $("#x_adminPasswordChangeCheck").is(":selected") && ($("#x_adminPasswordChangeModal .header h4").text("Check Password"),
        $("#x_adminPasswordChangeModalSet").text("Check"),
        $("#x_adminPasswordChangePasswordExistingDiv").show(),
        $("#x_adminPasswordChangePasswordExisting").focus(),
        $("#x_adminPasswordChangePasswordNewDiv").hide(),
        $("#x_adminPasswordChangeWarning").hide())
}
$("#x_adminPasswordChangeModalSet").click(function() {
    if ($("#x_adminPasswordChangeEmail").is(":selected"))
        g_domain.emailUserPassword(g_domainSelectedUser),
        hideModal("#x_adminPasswordChangeModal");
    else if ($("#x_adminPasswordChangeChange").is(":selected")) {
        $("#x_adminPasswordChangeWarning").text("").hide();
        var a = $("#x_adminPasswordChangePasswordExisting").val()
          , b = $("#x_adminPasswordChangePasswordNew").val();
        isValidPassword(b) ? isValidPasswordCharacters(b) ? ($("#x_adminPasswordChangeSelect").attr("disabled", "disabled"),
        $("#x_adminPasswordChangePasswordExisting").attr("disabled", "disabled"),
        $("#x_adminPasswordChangePasswordNew").attr("disabled", "disabled"),
        $("#x_adminPasswordChangeModalSet").addClass("disabled"),
        g_domain.changeUserPassword(g_domainSelectedUser, a, b, function(a) {
            $("#x_adminPasswordChangeSelect").removeAttr("disabled");
            $("#x_adminPasswordChangePasswordExisting").removeAttr("disabled");
            $("#x_adminPasswordChangePasswordNew").removeAttr("disabled");
            $("#x_adminPasswordChangeModalSet").removeClass("disabled");
            a ? ($("#x_adminPasswordChangePasswordExisting").val(""),
            $("#x_adminPasswordChangePasswordNew").val(""),
            hideModal("#x_adminPasswordChangeModal")) : ($("#x_adminPasswordChangeWarning").text("Old password does not match.").show(),
            $("#x_adminPasswordChangePasswordExisting").focus())
        })) : ($("#x_adminPasswordChangeWarning").text("New password must contain lowercase, uppercase and numbers.").show(),
        $("#x_adminPasswordChangePasswordNew").focus()) : ($("#x_adminPasswordChangeWarning").text("New password must be at least 8 characters.").show(),
        $("#x_adminPasswordChangePasswordNew").focus())
    } else
        $("#x_adminPasswordChangeReset").is(":selected") ? ($("#x_adminPasswordChangeWarning").text("").hide(),
        b = $("#x_adminPasswordChangePasswordNew").val(),
        isValidPassword(b) ? isValidPasswordCharacters(b) ? (g_domain.resetUserPassword(g_domainSelectedUser, b),
        $("#x_adminPasswordChangePasswordNew").val(""),
        hideModal("#x_adminPasswordChangeModal")) : ($("#x_adminPasswordChangeWarning").text("New password must contain lowercase, uppercase and numbers.").show(),
        $("#x_adminPasswordChangePasswordNew").focus()) : ($("#x_adminPasswordChangeWarning").text("New password must be at least 8 characters.").show(),
        $("#x_adminPasswordChangePasswordNew").focus())) : $("#x_adminPasswordChangeCheck").is(":selected") && ($("#x_adminPasswordChangeWarning").text("").hide(),
        $("#x_adminPasswordChangeSelect").attr("disabled", "disabled"),
        $("#x_adminPasswordChangePasswordExisting").attr("disabled", "disabled"),
        $("#x_adminPasswordChangeModalSet").addClass("disabled"),
        g_domain.checkUserPassword(g_domainSelectedUser, $("#x_adminPasswordChangePasswordExisting").val(), function(a) {
            $("#x_adminPasswordChangePasswordExisting").val("");
            $("#x_adminPasswordChangeSelect").removeAttr("disabled");
            $("#x_adminPasswordChangePasswordExisting").removeAttr("disabled");
            $("#x_adminPasswordChangeModalSet").removeClass("disabled");
            a ? $("#x_adminPasswordChangeWarning").text("Password matches.").show() : ($("#x_adminPasswordChangeWarning").text("Password does not match.").show(),
            $("#x_adminPasswordChangePasswordExisting").focus())
        }))
});
$("#x_adminPasswordChangeModalCancel").click(function() {
    hideModal("#x_adminPasswordChangeModal")
});
$("#x_domainSelectedPolicyEdit").click(function() {
    addStatisticEvent("users_policy");
    var a = g_domain.getUser(g_domainSelectedUser);
    $("#adminTextChangeModal .header").html("<h4>Change Policy</h4>");
    $("#adminTextChangeModal .body .label").text("Policy");
    for (var b = "", c = 0; c < g_domain.policies.length; c++) {
        var d = "";
        g_domain.policies[c].id == a.policy && (d = " selected");
        b += "<option" + d + ' value="' + g_domain.policies[c].id + '">' + htmlEncode(g_domain.policies[c].name) + "</option>"
    }
    $("#adminTextChangeModal .body .value select").html(b);
    g_textChangeSet = function() {
        var a = $("#adminTextChangeModal .body .value select").val();
        g_domain.setUserPolicy(g_domainSelectedUser, a);
        domainFillUserList();
        domainSelectUser(g_domainSelectedUser, !0);
        hideModal("#adminTextChangeModal")
    }
    ;
    showModal("#adminTextChangeModal")
});
function selectedGroupAdd(a, b, c) {
    for (var d = "", e = 0; e < g_domain.groups.length; e++) {
        var f = g_domain.groups[e]
          , g = "";
        if (0 != f.id && f.parent == a) {
            f.id == b && (g = " selected");
            var h = f.displayname;
            f.domaingroup && (h = "None");
            d += "<option" + g + ' value="' + f.id + '">' + c + htmlEncode(h) + "</option>";
            d += selectedGroupAdd(f.id, b, c + "&nbsp;&nbsp;")
        }
    }
    return d
}
$("#x_domainSelectedGroupEdit").click(function() {
    addStatisticEvent("users_group");
    var a = g_domain.getUser(g_domainSelectedUser);
    $("#adminTextChangeModal .header").html("<h4>Change Group</h4>");
    $("#adminTextChangeModal .body .label").text("Group");
    a = selectedGroupAdd(0, a.group, "");
    $("#adminTextChangeModal .body .value select").html(a);
    g_textChangeSet = function() {
        var a = $("#adminTextChangeModal .body .value select").val();
        g_domain.setUserGroup(g_domainSelectedUser, a);
        domainFillUserList();
        domainSelectUser(g_domainSelectedUser, !0);
        hideModal("#adminTextChangeModal")
    }
    ;
    showModal("#adminTextChangeModal")
});
$("#x_adminUsersBulkChoice").click(function() {
    addStatisticEvent("users_bulk");
    $("#x_adminUsersSimple").hide();
    $("#x_adminUsersBulk").show();
    g_domainUserInviteSimple = !1;
    $("#x_adminUsersInput").focus();
    return !1
});
$("#x_domainUsersSingleAdd").click(function() {
    addStatisticEvent("users_single");
    $("#x_adminUsersSingleAddDomain").text("@" + g_domain.domainname);
    replaceModal("#x_adminUsersModal", "#x_adminUsersSingleAddModal");
    $("#x_adminUsersSingleAddUsername").focus();
    return !1
});
$("#x_adminUsersSingleAddRefresh").click(function() {
    $("#x_adminUsersSingleAddError").html("Remember to <b>save this password</b>!  You will not be able to see it again.").show();
    $("#x_adminUsersSingleAddPassword").val(g_domain.generatePassword())
});
$("#x_adminUsersSingleAddAdd").click(function() {
    if ($(this).hasClass("disabled"))
        return !1;
    var a = $("#x_adminUsersSingleAddUsername").val()
      , b = $("#x_adminUsersSingleAddPassword").val()
      , c = $("#x_adminUsersSingleAddEmail").val()
      , d = $("#x_adminUsersSingleAddFirstname").val()
      , e = $("#x_adminUsersSingleAddLastname").val();
    $("#x_adminUsersSingleAddUsername").removeClass("error");
    $("#x_adminUsersSingleAddPassword").removeClass("error");
    $("#x_adminUsersSingleAddEmail").removeClass("error");
    $("#x_adminUsersSingleAddFirstname").removeClass("error");
    $("#x_adminUsersSingleAddLastname").removeClass("error");
    $("#x_adminUsersSingleAddError").text("").hide();
    if (0 >= g_domain.licensesAvailable)
        return addStatisticEvent("users_single_invalid_license"),
        $("#x_adminUsersSingleAddError").html("You currently have <b>0 licenses available</b>.  <a href='#' id='x_adminUsersUpgrade'>Upgrade to add more.</a>").show(),
        $("#x_adminUsersUpgrade").click(function() {
            hideModal("#x_adminUsersSingleAddModal");
            addStatisticEvent("users_single_upgrade");
            $("#x_domainUsersChange").click()
        }),
        !1;
    if (0 == a.length || !g_domain.isValidDomainUsername(a))
        return addStatisticEvent("users_single_invalid_username"),
        -1 != a.indexOf("@") ? $("#x_adminUsersSingleAddError").text("Please provide only the username portion not including the domain.").show() : -1 != a.indexOf("..") ? $("#x_adminUsersSingleAddError").text("Usernames cannot contain multiple periods in a row.").show() : $("#x_adminUsersSingleAddError").text("Letters, numbers, and basic symbols are allowed.  Usernames must begin with a letter.").show(),
        $("#x_adminUsersSingleAddUsername").addClass("error"),
        $("#x_adminUsersSingleAddUsername").focus(),
        !1;
    for (var f = a + "@" + g_domain.domainname, f = $.trim(f).toLowerCase(), a = 0; a < g_domain.users.length; a++)
        if (f == g_domain.users[a].username)
            return addStatisticEvent("users_single_invalid_conflict"),
            $("#x_adminUsersSingleAddError").text("This username already exists in your domain.").show(),
            $("#x_adminUsersSingleAddUsername").addClass("error"),
            $("#x_adminUsersSingleAddUsername").focus(),
            !1;
    if (8 > b.length || 64 < b.legnth)
        return addStatisticEvent("users_single_invalid_password"),
        $("#x_adminUsersSingleAddError").text("Passwords must be 8-64 characters.").show(),
        $("#x_adminUsersSingleAddPassword").addClass("error"),
        $("#x_adminUsersSingleAddPassword").focus(),
        !1;
    if (0 != c.length && !isValidEmail(c))
        return addStatisticEvent("users_single_invalid_email"),
        $("#x_adminUsersSingleAddError").text("Invalid email address.  The email address will be used for password recovery.").show(),
        $("#x_adminUsersSingleAddEmail").addClass("error"),
        $("#x_adminUsersSingleAddEmail").focus(),
        !1;
    if (0 == d.length && 0 == e.length)
        return addStatisticEvent("users_single_invalid_first"),
        $("#x_adminUsersSingleAddError").text("Please provide a name for this user.").show(),
        $("#x_adminUsersSingleAddFirstname").addClass("error"),
        $("#x_adminUsersSingleAddFirstname").focus(),
        !1;
    0 == c.length && (c = g_user.email);
    $("#x_adminUsersSingleAddUsername").attr("disabled", "disabled");
    $("#x_adminUsersSingleAddPassword").attr("disabled", "disabled");
    $("#x_adminUsersSingleAddEmail").attr("disabled", "disabled");
    $("#x_adminUsersSingleAddFirstname").attr("disabled", "disabled");
    $("#x_adminUsersSingleAddLastname").attr("disabled", "disabled");
    $("#x_adminUsersSingleAddClose").addClass("disabled");
    $("#x_adminUsersSingleAddAdd").addClass("disabled");
    g_domain.addUser(f, c, b, d, e, function(a) {
        $("#x_adminUsersSingleAddUsername").removeAttr("disabled");
        $("#x_adminUsersSingleAddPassword").removeAttr("disabled");
        $("#x_adminUsersSingleAddEmail").removeAttr("disabled");
        $("#x_adminUsersSingleAddFirstname").removeAttr("disabled");
        $("#x_adminUsersSingleAddLastname").removeAttr("disabled");
        $("#x_adminUsersSingleAddClose").removeClass("disabled");
        $("#x_adminUsersSingleAddAdd").removeClass("disabled");
        a && ($("#x_adminUsersSingleAddUsername").val(""),
        $("#x_adminUsersSingleAddPassword").val(""),
        $("#x_adminUsersSingleAddEmail").val(""),
        $("#x_adminUsersSingleAddFirstname").val(""),
        $("#x_adminUsersSingleAddLastname").val(""),
        $("#x_adminUsersSingleAddUsername").focus(),
        $("#x_adminUsersSingleAddError").html("User <b>" + f + "</b> successfully added.  You may add another or close.").show(),
        g_domain.request(function() {
            domainUpdate()
        }))
    })
});
$("#x_adminUsersSingleAddClose").click(function() {
    if ($(this).hasClass("disabled"))
        return !1;
    addStatisticEvent("users_single_close");
    hideModal("#x_adminUsersSingleAddModal")
});
$("#x_domainUsersInvite").click(function() {
    addStatisticEvent("users_invite");
    domainUserInvite(!1)
});
function domainUserInvite(a) {
    $("#x_adminUsersBack").hide();
    $("#x_adminUsersInvite").hide();
    $("#x_adminUsersInput").attr("placeholder", "e.g., tricia@" + g_domain.domainname + ", arthur.dent@gmail.com");
    $("#x_adminUsersEmail1").attr("placeholder", "e.g. tricia@" + g_domain.domainname);
    $("#x_adminUsersEmail2").attr("placeholder", "e.g. zaphod@" + g_domain.domainname);
    a ? ($("#x_adminUsersClose").hide(),
    $("#x_adminUsersNext").show().text("Skip"),
    g_domainUserInviteWizard = !0,
    $("#x_adminUsersLabelNormal").hide(),
    $("#x_adminUsersLabelWizard").show()) : ($("#x_adminUsersClose").show().text("Cancel"),
    $("#x_adminUsersNext").show().text("Next"),
    g_domainUserInviteWizard = !1,
    $("#x_adminUsersLabelNormal").show(),
    $("#x_adminUsersLabelWizard").hide());
    $("#x_adminUsersStatus").text("");
    $("#x_adminUsersConfirmation").text("");
    $("#x_adminUsersConfirmation").hide();
    g_currentModal ? replaceModal(g_currentModal, "#x_adminUsersModal") : showModal("#x_adminUsersModal");
    $("#x_adminUsersEmail1").focus()
}
$("#x_adminUsersEmail1").keyup(function() {
    g_domainUserInviteWizard && (0 < $("#x_adminUsersEmail1").val().length ? $("#x_adminUsersNext").show().text("Next") : $("#x_adminUsersNext").show().text("Skip"))
});
$("#x_adminUsersNext").click(function() {
    addStatisticEvent("users_invite_next");
    var a = null;
    if ($("#x_adminUsersInput").is(":visible")) {
        a = $("#x_adminUsersInput").val();
        if (0 == a.length)
            return $("#x_adminUsersInput").addClass("error"),
            !1;
        $("#x_adminUsersInput").removeClass("error");
        a = a.split(/[,;\n ]/);
        $("#x_adminUsersBulk").hide()
    } else {
        var b = $("#x_adminUsersEmail1").val()
          , c = $("#x_adminUsersEmail2").val()
          , d = $("#x_adminUsersEmail3").val();
        if (0 == b.length && g_domainUserInviteWizard)
            return addStatisticEvent("users_invite_skip"),
            hideModal("#x_adminUsersModal"),
            !0;
        if (0 == b.length || !isValidEmail(b))
            return $("#x_adminUsersEmail1").addClass("error"),
            !1;
        $("#x_adminUsersEmail1").removeClass("error");
        a = [];
        0 < b.length && a.push(b);
        0 < c.length && a.push(c);
        0 < d.length && a.push(d);
        $("#x_adminUsersSimple").hide()
    }
    $("#x_adminUsersBack").css("display", "inline-block");
    $("#x_adminUsersNext").hide();
    $("#x_adminUsersInvite").css("display", "inline-block");
    $("#x_adminUsersConfirmation").show();
    $("#x_adminUsersLabelNormal").hide();
    $("#x_adminUsersLabelWizard").hide();
    g_domain.queueUserClear();
    for (var e = {}, b = 0; b < g_domain.users.length; b++)
        e[g_domain.users[b].username] = 1;
    for (var f = d = c = "", g = 0, h = 0, k = 0, b = 0; b < a.length; b++) {
        var l = $.trim(a[b]).toLowerCase();
        if (0 < l.length) {
            if (-1 != l.indexOf("@")) {
                if (l.substring(l.indexOf("@") + 1, l.length) != g_domain.domainname) {
                    f += "<tr class='invalid'><td class='click needed' email='" + l + "'>Click to set ...</td><td>" + htmlEncode(l) + "</td></tr>";
                    h++;
                    k++;
                    addStatisticEvent("users_invite_different_domain");
                    continue
                }
            } else
                l += "@" + g_domain.domainname;
            g_domain.isValidDomainUsername(l) ? 1 == e[l] ? (d || (d = "<tr><th colspan=2>EXISTING USERNAMES</th></tr>"),
            d += "<tr class='invalid'><td colspan=2><strike>" + htmlEncode(l) + "</strike></td></tr>",
            h++,
            addStatisticEvent("users_invite_invalid_already")) : (e[l] = 1,
            f += "<tr class='valid'><td>" + htmlEncode(l) + "</td><td>" + htmlEncode(l) + "</td></tr>",
            g++,
            addStatisticEvent("users_invite_valid"),
            g_domain.queueUser(l, l)) : (c || (c = "<tr><th colspan=2>INVALID USERNAMES</th></tr>"),
            c += "<tr class='invalid'><td colspan=2><strike>" + htmlEncode(l) + "</strike></td></tr>",
            h++,
            addStatisticEvent("users_invite_invalid_domain"))
        }
    }
    "" != f && (f = "<tr><th>PENDING USERNAMES</th><th>EMAIL</th></tr>" + f);
    $("#x_adminUsersConfirmation").html("<table><colgroup><col><col></colgroup>" + f + c + d + "</table>");
    $("#x_adminUsersConfirmation .needed").click(function() {
        addStatisticEvent("users_invite_invalid_domain_start");
        var a = $(this)
          , b = $(this).attr("email");
        $("#adminTextEditModal .header").html("<h4>Set Username for " + b + "</h4>");
        $("#adminTextEditModal .body .label").text("Username");
        var c = b.indexOf("@")
          , c = -1 != c ? b.substr(0, c) + "@" + g_domain.domainname : "user@" + g_domain.domainname;
        a.attr("username") ? $("#adminTextEditModal .body .value input").val(a.attr("username")) : $("#adminTextEditModal .body .value input").val(c);
        g_textEditSet = function() {
            addStatisticEvent("users_invite_invalid_domain_set");
            var c = $("#adminTextEditModal .body .value input").val()
              , c = $.trim(c).toLowerCase();
            -1 == c.indexOf("@") ? (addStatisticEvent("users_invite_invalid_domain_set_index"),
            $("#adminTextEditModal .warning").text("Invalid username.  Make sure it contains your domain and no spaces.").show()) : c.substring(c.indexOf("@") + 1, c.length) != g_domain.domainname ? (addStatisticEvent("users_invite_invalid_domain_set_domain"),
            $("#adminTextEditModal .warning").text("Invalid username.  Make sure it matches your domain name.").show()) : g_domain.isValidDomainUsername(c) ? e[c] && a.attr("username") != c ? (addStatisticEvent("users_invite_invalid_domain_set_taken"),
            $("#adminTextEditModal .warning").text("Username is already taken, please pick a different one.").show()) : (addStatisticEvent("users_invite_invalid_domain_set_done"),
            a.attr("username") && (g_domain.dequeueUser(a.attr("username")),
            delete e[a.attr("username")],
            k++),
            e[c] = b,
            a.text(c),
            a.attr("username", c),
            a.removeClass("needed"),
            k--,
            g_domain.queueUser(c, b),
            hideModal("#adminTextEditModal"),
            inviteUsersUpdate(k)) : (addStatisticEvent("users_invite_invalid_domain_set_username"),
            $("#adminTextEditModal .warning").text("Invalid username.  Make sure it contains your domain and no spaces.").show())
        }
        ;
        showModal("#adminTextEditModal");
        $("#adminTextEditModal .body .value input").focus()
    });
    inviteUsersUpdate(k)
});
function inviteUsersUpdate(a) {
    var b = g_domain.queueUserCount()
      , c = b + " pending users.";
    1 == b && (c = "1 pending user.");
    $("#x_adminUsersStatus").text(c);
    $("#x_adminUsersError").hide();
    addStatisticEvent("users_invite_pending_" + b);
    a ? (1 == a ? $("#x_adminUsersError").html("It looks like you've added <b>" + a + " user</b> without a company email address.  Although this will work fine, please also assign a username for this user before proceeding.") : $("#x_adminUsersError").html("It looks like you've added <b>" + a + " users</b> without company email addresses.  Although this will work fine, please also assign a username for these users before proceeding."),
    $("#x_adminUsersError").show(),
    $("#x_adminUsersInvite").hide()) : 0 == b ? $("#x_adminUsersInvite").hide() : 0 > g_domain.licensesAvailable - b ? (a = "Unable to invite <b>" + b + "</b> users. Only <b>" + g_domain.licensesAvailable + "</b> spots are available.  <a href='#' id='x_adminUsersUpgrade'>Upgrade to more users.</a>",
    1 == b && (a = "You currently have <b>" + g_domain.licensesAvailable + "</b> spots available.  <a href='#' id='x_adminUsersUpgrade'>Upgrade to more users.</a>"),
    $("#x_adminUsersError").html(a),
    $("#x_adminUsersError").show(),
    $("#x_adminUsersInvite").hide(),
    $("#x_adminUsersUpgrade").click(function() {
        hideModal("#x_adminUsersModal");
        addStatisticEvent("users_invite_upgrade");
        $("#x_domainUsersChange").click()
    })) : ($("#x_adminUsersError").hide(),
    $("#x_adminUsersInvite").show());
    resizeModal()
}
$("#x_adminUsersBack").click(function() {
    addStatisticEvent("users_invite_back");
    $("#x_adminUsersStatus").text("");
    $("#x_adminUsersError").hide();
    $("#x_adminUsersBack").hide();
    $("#x_adminUsersNext").css("display", "inline-block");
    $("#x_adminUsersInvite").hide();
    g_domainUserInviteSimple ? ($("#x_adminUsersSimple").show(),
    $("#x_adminUsersBulk").hide()) : ($("#x_adminUsersSimple").hide(),
    $("#x_adminUsersBulk").show());
    $("#x_adminUsersConfirmation").hide();
    g_domainUserInviteWizard ? ($("#x_adminUsersLabelNormal").hide(),
    $("#x_adminUsersLabelWizard").show()) : ($("#x_adminUsersLabelNormal").show(),
    $("#x_adminUsersLabelWizard").hide());
    resizeModal()
});
$("#x_adminUsersInvite").click(function() {
    addStatisticEvent("users_invite_invite");
    $("#x_adminUsersStatus").text("");
    $("#x_adminUsersBack").hide();
    $("#x_adminUsersInvite").hide();
    $("#x_adminUsersClose").hide();
    $("#x_adminUsersConfirmation").html("<table><tr><th id='x_adminUsersInviteProgress'>PROGRESS</th></tr><tr><td id='x_adminUsersInviteStatus'></td></tr></table>");
    resizeModal();
    addEvent("chat", "domain_usersAdd");
    g_domain.addUsers(function() {
        g_domain.addUsersStatus(function(a, b) {
            var c = "Inviting user " + Math.min(a + 1, b) + " of " + b + "...";
            $("#x_adminUsersInviteStatus").text(c)
        });
        if (g_domain.addUsersComplete()) {
            addStatisticEvent("users_invite_done");
            for (var a = 0, b = "<table><tr><th colspan=2>RESULTS</th></tr>", c = 0; c < g_domain.queuedUsers.length; c++) {
                var d = g_domain.queuedUsers[c];
                d.error ? b += "<tr class='invalid'><td><strike>" + htmlEncode(d.username) + "</strike></td><td>Error</td></tr>" : (a++,
                b += "<tr class='valid'><td>" + htmlEncode(d.username) + "</td><td>Invited</td></tr>")
            }
            b += "</table>";
            1 == a ? $("#x_adminUsersStatus").text(a + " user invited.") : $("#x_adminUsersStatus").text(a + " users invited.");
            $("#x_adminUsersConfirmation").html(b);
            $("#x_adminUsersInput").val("");
            $("#x_adminUsersClose").text("Close");
            $("#x_adminUsersClose").show();
            resizeModal();
            g_domain.request(function() {
                domainUpdate()
            })
        }
    })
});
$("#x_adminUsersClose").click(function() {
    addStatisticEvent("users_invite_close");
    hideModal("#x_adminUsersModal")
});
$("#x_domainSelectedGroupDisplayNameEdit").click(function() {
    var a = g_domain.getGroup(g_domainSelectedGroup);
    $("#adminTextEditModal .header").html("<h4>Edit Name</h4>");
    $("#adminTextEditModal .body .label").text("Name");
    $("#adminTextEditModal .body .value input").val(a.displayname);
    g_textEditSet = function() {
        var b = $("#adminTextEditModal .body .value input").val();
        g_domain.setGroupDisplayName(a, b);
        $("#x_domainSelectedGroupDisplayName").text(a.displayname);
        $("#x_domainGroupSelected").text(a.displayname);
        $("#x_domainSelectedGroupHeader").text(a.displayname);
        domainFillUserList();
        hideModal("#adminTextEditModal")
    }
    ;
    showModal("#adminTextEditModal");
    $("#adminTextEditModal .body .value input").focus()
});
$("#x_adminGroupNewHelp").click(function() {
    showModalHelper("#x_adminGroupNewModal", "#x_adminGroupNewHelp")
});
$("#x_domainGroupAdd").click(function() {
    $("#x_adminGroupName").removeClass("error");
    $("#x_adminGroupName").val("");
    showModal("#x_adminGroupNewModal");
    $("#x_adminGroupName").focus()
});
$("#x_adminGroupCreate").click(function() {
    var a = $("#x_adminGroupName").val();
    0 == a.length ? $("#x_adminGroupName").addClass("error") : (g_domain.addGroup(a, g_domain.policy, function() {
        g_domain.requestGroups(function() {
            domainFillUserList()
        })
    }),
    hideModal("#x_adminGroupNewModal"))
});
$("#x_adminGroupCancel").click(function() {
    hideModal("#x_adminGroupNewModal")
});
function domainSelectGroup(a) {
    g_domainSelectedGroup = a;
    var b = g_domain.getGroup(a);
    $("div[tab=selected_user]").hide();
    $("div[tab=selected_group]").show();
    $("#x_domainGroupSelected").text(b.displayname);
    $("#x_domainSelectedGroupHeader").text(b.displayname);
    $("[tab=selected_group]").addClass("active").siblings("[tab]").removeClass("active");
    $("[page=selected_group]").show().siblings("[page]").hide();
    domainWarning(null);
    $("#x_domainSelectedGroupDisplayName").text(b.displayname);
    0 == a || b.domaingroup ? ($("#x_domainSelectedGroupDisplayNameEdit").hide(),
    $("#x_domainSelectedGroupDelete").hide(),
    $("#x_domainSelectedGroupContainer").hide()) : ($("#x_domainSelectedGroupDisplayNameEdit").show(),
    $("#x_domainSelectedGroupDelete").show(),
    $("#x_domainSelectedGroupContainer").show());
    $("#x_domainSelectedGroupPolicy").text("");
    for (a = 0; a < g_domain.policies.length; a++)
        if (g_domain.policies[a].id == b.policy) {
            $("#x_domainSelectedGroupPolicy").text(g_domain.policies[a].name);
            break
        }
    $("#x_domainSelectedGroupGroup").text("");
    for (a = 0; a < g_domain.groups.length; a++)
        if (g_domain.groups[a].id == b.parent) {
            0 == g_domain.groups[a].id ? $("#x_domainSelectedGroupGroup").text("None") : $("#x_domainSelectedGroupGroup").text(g_domain.groups[a].displayname);
            break
        }
}
function domainGroupGroupEditList(a, b, c, d, e, f) {
    d.id == a.id && (e = !0);
    var g = d.parent == a.id ? " selected" : ""
      , h = e ? " disabled" : ""
      , k = "";
    0 == a.id ? (k = "<option" + g + h + ' value="' + a.id + '">' + f + "None</option>",
    k += "<option disabled>&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;</option>") : (k = "<option" + g + h + ' value="' + a.id + '">' + f + htmlEncode(a.displayname) + "</option>",
    f += "&nbsp;&nbsp;");
    for (g = 0; g < b.length; g++)
        h = b[g],
        h.parent == c && a != h && (h.domaingroup || (k += domainGroupGroupEditList(h, b, h.id, d, e, f)));
    return k
}
$("#x_domainSelectedGroupGroupEdit").click(function() {
    var a = g_domain.getGroup(g_domainSelectedGroup);
    $("#adminTextChangeModal .header").html("<h4>Change Group</h4>");
    $("#adminTextChangeModal .body .label").text("Group");
    var b = g_domain.groups.slice(0);
    b.sort(function(a, b) {
        return a.displayname.localeCompare(b.displayname)
    });
    for (var c = "", d = 0; d < b.length; d++) {
        var e = b[d];
        0 == e.id && (c += domainGroupGroupEditList(e, b, e.id, a, !1, ""))
    }
    $("#adminTextChangeModal .body .value select").html(c);
    g_textChangeSet = function() {
        var b = $("#adminTextChangeModal .body .value select").val();
        g_domain.setGroupParent(a, b);
        domainSelectGroup(g_domainSelectedGroup);
        domainFillUserList();
        hideModal("#adminTextChangeModal")
    }
    ;
    showModal("#adminTextChangeModal")
});
$("#x_domainSelectedGroupPolicyEdit").click(function() {
    var a = g_domain.getGroup(g_domainSelectedGroup);
    $("#adminTextChangeModal .header").html("<h4>Change Policy</h4>");
    $("#adminTextChangeModal .body .label").text("Policy");
    for (var b = "", c = 0; c < g_domain.policies.length; c++) {
        var d = "";
        g_domain.policies[c].id == a.policy && (d = " selected");
        b += "<option" + d + ' value="' + g_domain.policies[c].id + '">' + htmlEncode(g_domain.policies[c].name) + "</option>"
    }
    $("#adminTextChangeModal .body .value select").html(b);
    g_textChangeSet = function() {
        var b = $("#adminTextChangeModal .body .value select").val();
        g_domain.setGroupPolicy(a, b);
        domainSelectGroup(g_domainSelectedGroup);
        hideModal("#adminTextChangeModal")
    }
    ;
    showModal("#adminTextChangeModal")
});
$("#x_domainSelectedGroupDelete").click(function() {
    var a = g_domain.getGroup(g_domainSelectedGroup);
    if (0 == a.groups.length && 0 == a.users.length)
        $("#x_adminGroupDelete .body").text('Are you sure you want to delete the group "' + a.displayname + '"?'),
        $("#x_adminGroupDeleteConfirm").show();
    else {
        var b = 1 == a.groups.length ? "1 group" : a.groups.length + " groups"
          , c = 1 == a.users.length ? "1 user" : a.users.length + " users";
        $("#x_adminGroupDelete .body").text('Unable to delete the group "' + a.displayname + '".  It is associated with ' + b + " and " + c + ".  Please remove all associations first before deleting.");
        $("#x_adminGroupDeleteConfirm").hide()
    }
    showModal("#x_adminGroupDelete")
});
$("#x_adminGroupDeleteConfirm").click(function() {
    hideModal("#x_adminGroupDelete");
    $("[tab=groups]").addClass("active").siblings("div[tab]").removeClass("active");
    $("[page=groups]").show().siblings(".page").hide();
    selectTab("users");
    g_domain.deleteGroup(g_domainSelectedGroup, function() {
        g_domain.requestGroups(function() {
            domainFillUserList()
        })
    })
});
$("#x_adminGroupDeleteCancel").click(function() {
    hideModal("#x_adminGroupDelete")
});
var GroupChatFlagDisableDisplayNameSet = 256
  , GroupChatFlagDisableTopicSet = 512
  , GroupChatFlagDisableList = 1024
  , GroupChatFlagDisableMemberAdd = 2048
  , GroupChatFlagDisableMemberRemove = 4096
  , GroupChatFlagDisableMessageSend = 8192;
$("#x_domainGroupChatTopicEdit").click(function() {
    addStatisticEvent("groupchat_topic");
    var a = g_domain.getGroupChat(g_domainSelectedGroupChat);
    $("#adminTextEditModal .header").html("<h4>Edit Topic</h4>");
    $("#adminTextEditModal .body .label").text("Topic");
    $("#adminTextEditModal .body .value input").val(a.topic);
    g_textEditSet = function() {
        var b = $("#adminTextEditModal .body .value input").val();
        g_domain.setGroupChatTopic(a, b);
        a.topic && 0 < a.topic.length ? $("#x_domainGroupChatTopic").removeClass("placeholder").text(a.topic) : $("#x_domainGroupChatTopic").addClass("placeholder").text("Set a topic to let everyone know what this chat should be used for");
        domainFillGroupChatList();
        hideModal("#adminTextEditModal")
    }
    ;
    showModal("#adminTextEditModal");
    $("#adminTextEditModal .body .value input").focus()
});
$("#x_domainGroupChatDisplayNameEdit").click(function() {
    addStatisticEvent("groupchat_name");
    var a = g_domain.getGroupChat(g_domainSelectedGroupChat);
    $("#adminTextEditModal .header").html("<h4>Edit Name</h4>");
    $("#adminTextEditModal .body .label").text("Name");
    $("#adminTextEditModal .body .value input").val(a.displayname);
    g_textEditSet = function() {
        var b = $("#adminTextEditModal .body .value input").val();
        g_domain.setGroupChatDisplayName(a, b);
        $("#x_domainGroupChatDisplayName").text(a.displayname);
        $("#x_domainGroupChatSelected").text(a.displaynameComputed);
        $("#x_domainSelectedGroupChatHeader").text(a.displaynameComputed);
        domainFillGroupChatList();
        hideModal("#adminTextEditModal")
    }
    ;
    showModal("#adminTextEditModal");
    $("#adminTextEditModal .body .value input").focus()
});
$("#x_domainGroupChatAdd").click(function() {
    addStatisticEvent("groupchat_add");
    $("#adminGroupChatName").removeClass("error");
    $("#adminGroupChatName").val("");
    $("#adminGroupChatFlagDisableDisplayNameSet").attr("checked", "checked");
    $("#adminGroupChatFlagDisableTopicSet").removeAttr("checked");
    $("#adminGroupChatFlagDisableList").removeAttr("checked");
    $("#adminGroupChatFlagDisableMemberAdd").removeAttr("checked");
    $("#adminGroupChatFlagDisableMemberRemove").removeAttr("checked");
    $("#adminGroupChatFlagDisableMessageSend").removeAttr("checked");
    showModal("#x_adminGroupChatNew");
    $("#adminGroupChatName").focus()
});
$("#adminGroupChatCreate").click(function() {
    addStatisticEvent("groupchat_add_set");
    var a = $("#adminGroupChatName").val();
    if (0 == a.length)
        $("#adminGroupChatName").addClass("error");
    else {
        var b = 0;
        $("#adminGroupChatFlagDisableDisplayNameSet").attr("checked") && (b |= GroupChatFlagDisableDisplayNameSet);
        $("#adminGroupChatFlagDisableTopicSet").attr("checked") && (b |= GroupChatFlagDisableTopicSet);
        $("#adminGroupChatFlagDisableList").attr("checked") && (b |= GroupChatFlagDisableList);
        $("#adminGroupChatFlagDisableMemberAdd").attr("checked") && (b |= GroupChatFlagDisableMemberAdd);
        $("#adminGroupChatFlagDisableMemberRemove").attr("checked") && (b |= GroupChatFlagDisableMemberRemove);
        $("#adminGroupChatFlagDisableMessageSend").attr("checked") && (b |= GroupChatFlagDisableMessageSend);
        g_domain.addGroupChat(a, b, function() {
            g_domain.requestGroupChats(!0, function() {
                domainFillGroupChatList()
            })
        });
        hideModal("#x_adminGroupChatNew")
    }
});
$("#adminGroupChatCancel").click(function() {
    addStatisticEvent("groupchat_add_cancel");
    hideModal("#x_adminGroupChatNew")
});
$("#x_adminGroupChatMembersManageHelp").click(function() {
    addStatisticEvent("groupchat_manage_help");
    showModalHelper("#x_adminGroupChatMembersManageModal", "#x_adminGroupChatMembersManageHelp")
});
$("#x_adminGroupChatNewHelp").click(function() {
    addStatisticEvent("groupchat_new_help");
    showModalHelper("#x_adminGroupChatNew", "#x_adminGroupChatNewHelp")
});
function domainGroupChatCountStringSimple(a) {
    for (var b = 0, c = 0; c < a.length; c++)
        a[c].bot || b++;
    return b
}
function domainGroupChatMembersString(a, b) {
    var c = " bots";
    1 == a && (c = " bot");
    var d = " members";
    1 == b && (d = " member");
    return 0 < a && 0 < b ? b + d + ", " + a + c : 0 < a ? a + c : 0 < b ? b + d : "0 members"
}
function domainGroupChatCountString(a) {
    for (var b = 0, c = 0, d = 0; d < a.length; d++)
        a[d].bot ? c++ : b++;
    return domainGroupChatMembersString(c, b)
}
function domainFillGroupChatList() {
    if (0 < g_domain.groupchats.length) {
        var a = "<table><colgroup><col class='narrower'><col><col class='narrow'></colgroup>"
          , b = "<tr><th class='group first' colspan='2'>GROUP CHATS</th><th class='group first'>MEMBERS</th></tr>"
          , c = "<tr><th class='group' colspan='2'>DISABLED GROUP CHATS</th><th class='group'>MEMBERS</th></tr>"
          , d = 0
          , e = 0
          , f = 0
          , g = $.trim($("#x_domainGroupChatListSearchInput").val()).toLowerCase();
        g_domain.groupchats.sort(function(a, b) {
            return a.sortBy < b.sortBy ? -1 : a.sortBy > b.sortBy ? 1 : 0
        });
        for (var h = 0; h < g_domain.groupchats.length; h++) {
            var k = g_domain.groupchats[h];
            if (g_domain.groupChatFlagsPrivate(k.flags))
                f++;
            else {
                if (0 < g.length && -1 == k.displaynameComputed.toLowerCase().indexOf(g) && -1 == k.topic.toLowerCase().indexOf(g)) {
                    for (var l = !1, m = 0; m < k.members.length; m++) {
                        var p = k.members[m];
                        if (-1 != p.name.toLowerCase().indexOf(g) || p.user && -1 != p.user.fullname.toLowerCase().indexOf(g)) {
                            l = !0;
                            break
                        }
                    }
                    if (!l)
                        continue
                }
                l = domainGroupChatCountStringSimple(k.members);
                m = htmlEncode(k.topic);
                p = htmlEncode(k.displaynameComputed);
                l = "<tr class='click groupchat" + (k.deleted ? " disabled" : "") + "' name='" + k.name + "'><td class='image'><span class='avatar avatar30 empty'>#</span></td><td class='name' title='" + p + " " + m + "'>" + p + " <span class='topic'>" + m + "</td><td class='count'>" + l + "</td>";
                l += "</tr>";
                k.deleted ? (c += l,
                e++) : (b += l,
                d++)
            }
        }
        0 < d && (a += b);
        0 < f && (a += "<tr><th class='group' colspan='3'>PRIVATE GROUP CHATS</th></tr><tr class='textadd'><td colspan='3' class='click' id='x_domainGroupChatListPrivate'>Manage private group chats ...</td>");
        0 < e && (a += c);
        a += "</table>";
        $("#x_domainGroupChatsCount").text(parseInt(d))
    } else
        a = "<div class='noresults'>No group chats found.</div>",
        $("#x_domainGroupChatsCount").text("0");
    $("#x_domainGroupChatList").html(a);
    $("#x_domainGroupChatListSearch").show();
    $("#x_domainGroupChatList .groupchat").click(function() {
        addStatisticEvent("groupchat_select");
        domainSelectGroupChat($(this).attr("name"))
    });
    $("#x_domainGroupChatListPrivate").click(function() {
        addStatisticEvent("groupchat_private_list");
        domainFillPrivateGroupChatList();
        showModal("#x_domainGroupChatPrivateListModal")
    })
}
function domainFillPrivateGroupChatList() {
    if (0 < g_domain.groupchats.length) {
        var a = "<table><colgroup><col class='narrower'><col class='narrower'><col><col class='narrow'></colgroup>"
          , b = "<tr><th class='group' colspan='3'>PRIVATE GROUP CHATS</th><th class='group'>MEMBERS</th></tr>"
          , c = "<tr><th class='group' colspan='3'>DISABLED PRIVATE GROUP CHATS</th><th class='group'>MEMBERS</th></tr>"
          , d = 0
          , e = 0
          , f = $.trim($("#x_domainGroupChatPrivateListSearchInput").val()).toLowerCase();
        g_domain.groupchats.sort(function(a, b) {
            return a.sortBy < b.sortBy ? -1 : a.sortBy > b.sortBy ? 1 : 0
        });
        for (var g = 0; g < g_domain.groupchats.length; g++) {
            var h = g_domain.groupchats[g];
            if (g_domain.groupChatFlagsPrivate(h.flags)) {
                if (0 < f.length && -1 == h.displaynameComputed.toLowerCase().indexOf(f) && -1 == h.topic.toLowerCase().indexOf(f)) {
                    for (var k = !1, l = 0; l < h.members.length; l++) {
                        var m = h.members[l];
                        if (-1 != m.name.toLowerCase().indexOf(f) || m.user && -1 != m.user.fullname.toLowerCase().indexOf(f)) {
                            k = !0;
                            break
                        }
                    }
                    if (!k)
                        continue
                }
                k = htmlEncode(h.topic);
                l = htmlEncode(h.displaynameComputed);
                m = "";
                m = 1 == g_domainSelectedPrivateGroupChats[h.name] ? "<td class='checkbox' state='on'>" + g_onSVG + "</td>" : "<td class='checkbox' state='off'>" + g_offSVG + "</td>";
                k = "<tr class='click groupchat" + (h.deleted ? " disabled" : "") + "' name='" + h.name + "'>" + m + "<td class='image'><span class='avatar avatar30 empty'>#</span></td><td class='name' title='" + l + " " + k + "'>" + l + " <span class='topic'>" + k + "</td><td class='count'>" + h.members.length + "</td>";
                k += "</tr>";
                h.deleted ? (c += k,
                e++) : (b += k,
                d++)
            }
        }
        0 < d && (a += b);
        0 < e && (a += c);
        a += "</table>"
    } else
        a = "<div class='noresults'>No private group chats found.</div>";
    $("#x_domainGroupChatPrivateList").html(a);
    $("#x_domainGroupChatPrivateListSearch").show();
    $("#x_domainGroupChatPrivateList .groupchat").click(function() {
        addStatisticEvent("groupchat_private_select");
        "off" == $(this).find(".checkbox").attr("state") ? ($(this).find(".checkbox").attr("state", "on"),
        $(this).find(".checkbox").html(g_onSVG),
        g_domainSelectedPrivateGroupChats[$(this).attr("name")] = !0) : ($(this).find(".checkbox").attr("state", "off"),
        $(this).find(".checkbox").html(g_offSVG),
        delete g_domainSelectedPrivateGroupChats[$(this).attr("name")]);
        updatePrivateGroupChatsStatus();
        return !1
    });
    $("#x_domainGroupChatPrivateListManage").click(function() {
        addStatisticEvent("groupchat_private_manage");
        if ($(this).attr("disabled"))
            return !1;
        var a = 0, b;
        for (b in g_domainSelectedPrivateGroupChats)
            a++;
        if (1 < a)
            return !1;
        for (b in g_domainSelectedPrivateGroupChats) {
            g_domainSelectedPrivateGroupChats = [];
            hideModal("#x_domainGroupChatPrivateListModal");
            domainSelectGroupChat(b);
            break
        }
    });
    updatePrivateGroupChatsStatus()
}
function updatePrivateGroupChatsStatus() {
    var a = 0, b = 0, c;
    for (c in g_domainSelectedPrivateGroupChats)
        g_domain.getGroupChat(c).deleted || b++,
        a++;
    0 < a ? (0 < b ? $("#x_domainGroupChatPrivateListDelete").text("Disable " + b + " Group Chat" + (1 == b ? "" : "s")).show() : $("#x_domainGroupChatPrivateListDelete").text("").hide(),
    1 == a ? $("#x_domainGroupChatPrivateListManage").removeClass("disabled") : $("#x_domainGroupChatPrivateListManage").addClass("disabled")) : ($("#x_domainGroupChatPrivateListDelete").text("").hide(),
    $("#x_domainGroupChatPrivateListManage").addClass("disabled"))
}
function disableGroupChatList(a, b) {
    if (0 == a.length)
        b();
    else {
        var c = a.shift()
          , d = c.groupchat;
        disableGroupChat(d, c.policies, !1, function(c) {
            $("#adminTextAreaModal .header").html("<h4>Removing Members</h4>");
            $("#adminTextAreaModal .body").html("Removing members of group chat " + d.displaynameComputed + " (" + (100 * c).toFixed() + "% complete)...");
            1 == c && disableGroupChatList(a, b)
        })
    }
}
$("#x_domainGroupChatPrivateListDelete").click(function() {
    addStatisticEvent("groupchat_private_delete");
    var a = [], b = 0, c = 0, d = 0, e;
    for (e in g_domainSelectedPrivateGroupChats) {
        var f = g_domain.getGroupChat(e);
        if (!f.deleted) {
            for (var g = [], h = 0; h < g_domain.policies.length; h++)
                for (var k = g_domain.policies[h], l = k.value["trillian.groupchat.bind.impp"].split(","), m = 0; m < l.length; m++)
                    if (l[m].toLowerCase() == f.name.toLowerCase()) {
                        g.push(k);
                        d++;
                        break
                    }
            h = {};
            h.groupchat = f;
            h.policies = g;
            a.push(h);
            c++
        }
        b++
    }
    $("#adminTextAreaModal .header").html("<h4>Disable Group Chats?</h4>");
    0 < d ? $("#adminTextAreaModal .body").html("Disabling a group chat will remove its members and remove it from any associated policies.  Are you sure you wish to disable <b>" + c + "</b> group chat" + (1 == c ? "" : "s") + "?") : $("#adminTextAreaModal .body").html("Disabling a group chat will remove its members.  Are you sure you wish to disable <b>" + c + "</b> group chat" + (1 == c ? "" : "s") + "?");
    $("#adminTextAreaModalSet").addClass("delete");
    $("#adminTextAreaModalSet").text("Disable " + c + " Group Chat" + (1 == c ? "" : "s"));
    g_textAreaSet = function() {
        g_domainSelectedPrivateGroupChats = [];
        $("#adminTextAreaModalSet").addClass("disabled");
        $("#adminTextAreaModalCancel").addClass("disabled");
        disableGroupChatList(a, function() {
            $("#adminTextAreaModalSet").removeClass("delete");
            $("#adminTextAreaModalSet").removeClass("disabled");
            $("#adminTextAreaModalCancel").removeClass("disabled");
            domainFillPrivateGroupChatList();
            replaceModal("#adminTextAreaModal", "#x_domainGroupChatPrivateListModal")
        })
    }
    ;
    g_textAreaCancel = function() {
        replaceModal("#adminTextAreaModal", "#x_domainGroupChatPrivateListModal")
    }
    ;
    replaceModal("#x_domainGroupChatPrivateListModal", "#adminTextAreaModal")
});
$("#x_domainGroupChatPrivateListHelp").click(function() {
    addStatisticEvent("groupchat_private_help");
    showModalHelper("#x_domainGroupChatPrivateListModal", "#x_domainGroupChatPrivateListHelp")
});
$("#x_domainGroupChatPrivateListCancel").click(function() {
    addStatisticEvent("groupchat_private_cancel");
    g_domainSelectedPrivateGroupChats = [];
    hideModal("#x_domainGroupChatPrivateListModal")
});
$("#x_domainGroupChatPrivateListSearchInput").keyup(function() {
    domainFillPrivateGroupChatList()
});
$("#x_domainGroupChatListSearchInput").keyup(function() {
    domainFillGroupChatList()
});
$("#x_domainGroupChatSettingsChange").click(function() {
    addStatisticEvent("groupchat_settings");
    var a = g_domain.getGroupChat(g_domainSelectedGroupChat);
    (a.flags & GroupChatFlagDisableDisplayNameSet) == GroupChatFlagDisableDisplayNameSet ? $("#x_adminGroupChatFlagsEditDisableDisplayNameSet").attr("checked", "checked") : $("#x_adminGroupChatFlagsEditDisableDisplayNameSet").removeAttr("checked");
    (a.flags & GroupChatFlagDisableMemberAdd) == GroupChatFlagDisableMemberAdd ? $("#x_adminGroupChatFlagsEditDisableMemberAdd").attr("checked", "checked") : $("#x_adminGroupChatFlagsEditDisableMemberAdd").removeAttr("checked");
    (a.flags & GroupChatFlagDisableMemberRemove) == GroupChatFlagDisableMemberRemove ? $("#x_adminGroupChatFlagsEditDisableMemberRemove").attr("checked", "checked") : $("#x_adminGroupChatFlagsEditDisableMemberRemove").removeAttr("checked");
    (a.flags & GroupChatFlagDisableList) == GroupChatFlagDisableList ? $("#x_adminGroupChatFlagsEditDisableList").attr("checked", "checked") : $("#x_adminGroupChatFlagsEditDisableList").removeAttr("checked");
    (a.flags & GroupChatFlagDisableMessageSend) == GroupChatFlagDisableMessageSend ? $("#x_adminGroupChatFlagsEditDisableMessageSend").attr("checked", "checked") : $("#x_adminGroupChatFlagsEditDisableMessageSend").removeAttr("checked");
    (a.flags & GroupChatFlagDisableTopicSet) == GroupChatFlagDisableTopicSet ? $("#x_adminGroupChatFlagsEditDisableTopicSet").attr("checked", "checked") : $("#x_adminGroupChatFlagsEditDisableTopicSet").removeAttr("checked");
    $("#x_adminGroupChatFlagsEditDisableMemberAdd").removeAttr("disabled");
    $("#x_adminGroupChatFlagsEditDisableMemberRemove").removeAttr("disabled");
    $("#x_adminGroupChatFlagsEditDisableList").removeAttr("disabled");
    showModal("#x_adminGroupChatFlagsEditModal")
});
$("#x_adminGroupChatFlagsEditSet").click(function() {
    addStatisticEvent("groupchat_flags_set");
    var a = g_domain.getGroupChat(g_domainSelectedGroupChat);
    g_domain.setGroupChatFlag(a, GroupChatFlagDisableDisplayNameSet, $("#x_adminGroupChatFlagsEditDisableDisplayNameSet").attr("checked") ? !0 : !1, !1);
    g_domain.setGroupChatFlag(a, GroupChatFlagDisableMemberAdd, $("#x_adminGroupChatFlagsEditDisableMemberAdd").attr("checked") ? !0 : !1, !1);
    g_domain.setGroupChatFlag(a, GroupChatFlagDisableMemberRemove, $("#x_adminGroupChatFlagsEditDisableMemberRemove").attr("checked") ? !0 : !1, !1);
    g_domain.setGroupChatFlag(a, GroupChatFlagDisableList, $("#x_adminGroupChatFlagsEditDisableList").attr("checked") ? !0 : !1, !1);
    g_domain.setGroupChatFlag(a, GroupChatFlagDisableMessageSend, $("#x_adminGroupChatFlagsEditDisableMessageSend").attr("checked") ? !0 : !1, !1);
    g_domain.setGroupChatFlag(a, GroupChatFlagDisableTopicSet, $("#x_adminGroupChatFlagsEditDisableTopicSet").attr("checked") ? !0 : !1, !0);
    hideModal("#x_adminGroupChatFlagsEditModal");
    domainSelectGroupChat(g_domainSelectedGroupChat);
    domainFillGroupChatList()
});
$("#x_adminGroupChatFlagsEditCancel").click(function() {
    addStatisticEvent("groupchat_flags_cancel");
    hideModal("#x_adminGroupChatFlagsEditModal")
});
$("#x_adminGroupChatFlagsEditHelp").click(function() {
    addStatisticEvent("groupchat_flags_help");
    showModalHelper("#x_adminGroupChatFlagsEditModal", "#x_adminGroupChatFlagsEditHelp")
});
$("#x_domainGroupChatListHelp").click(function() {
    addStatisticEvent("groupchat_help");
    showModal("#x_domainGroupChatListHelpModal")
});
$("#x_domainGroupChatListHelpCancel").click(function() {
    addStatisticEvent("groupchat_help_cancel");
    hideModal("#x_domainGroupChatListHelpModal")
});
function domainSelectGroupChatWarning() {
    var a = g_domain.getGroupChat(g_domainSelectedGroupChat);
    a.deleted ? domainWarning(a.displaynameComputed + " is currently disabled.  Some features are not available and users will not be able to join it.") : domainWarning(null)
}
function domainSelectGroupChat(a) {
    g_domainSelectedGroupChat = a;
    a = g_domain.getGroupChat(a);
    $("div[tab=selected_user]").hide();
    $("div[tab=selected_group]").hide();
    $("div[tab=selected_policy]").hide();
    $("div[tab=selected_groupchat]").show();
    $("#x_domainGroupChatSelected").text(a.displaynameComputed);
    $("#x_domainSelectedGroupChatHeader").text(a.displaynameComputed);
    $("[tab=selected_groupchat]").addClass("active").siblings("[tab]").removeClass("active");
    $("[page=selected_groupchat]").show().siblings("[page]").hide();
    domainSelectGroupChatWarning();
    $("#x_domainGroupChatName").text(a.name);
    $("#x_domainGroupChatName").attr("title", a.name);
    $("#x_domainGroupChatDisplayName").text(a.displayname);
    a.topic && 0 < a.topic.length ? $("#x_domainGroupChatTopic").removeClass("placeholder").text(a.topic) : $("#x_domainGroupChatTopic").addClass("placeholder").text("Set a topic to let everyone know what this chat should be used for");
    a.deleted ? ($("#x_domainGroupChatEnable").show(),
    $("#x_domainGroupChatDisable").hide(),
    $("#x_domainGroupChatMembersManage").addClass("disabled")) : ($("#x_domainGroupChatEnable").hide(),
    $("#x_domainGroupChatDisable").show(),
    $("#x_domainGroupChatMembersManage").removeClass("disabled"));
    var b = null
      , c = "No restrictions";
    if ((a.flags & GroupChatFlagDisableDisplayNameSet) == GroupChatFlagDisableDisplayNameSet || (a.flags & GroupChatFlagDisableTopicSet) == GroupChatFlagDisableTopicSet || (a.flags & GroupChatFlagDisableMemberAdd) == GroupChatFlagDisableMemberAdd || (a.flags & GroupChatFlagDisableMemberRemove) == GroupChatFlagDisableMemberRemove || (a.flags & GroupChatFlagDisableMessageSend) == GroupChatFlagDisableMessageSend)
        c = "Some restrictions";
    b = (a.flags & GroupChatFlagDisableDisplayNameSet) == GroupChatFlagDisableDisplayNameSet ? "\u2611" : "\u2610";
    b += " Chat name may only be set by operators\n";
    b = (a.flags & GroupChatFlagDisableMemberAdd) == GroupChatFlagDisableMemberAdd ? b + "\u2611" : b + "\u2610";
    b += " Do not allow people to join on their own\n";
    b = (a.flags & GroupChatFlagDisableMemberRemove) == GroupChatFlagDisableMemberRemove ? b + "\u2611" : b + "\u2610";
    b += " Do not allow people to leave on their own\n";
    (a.flags & GroupChatFlagDisableList) == GroupChatFlagDisableList ? (b += "\u2611",
    c = "Some restrictions") : b += "\u2610";
    b += " Do not show group chat in list\n";
    b = (a.flags & GroupChatFlagDisableMessageSend) == GroupChatFlagDisableMessageSend ? b + "\u2611" : b + "\u2610";
    b += " Only approved users may talk\n";
    b = (a.flags & GroupChatFlagDisableTopicSet) == GroupChatFlagDisableTopicSet ? b + "\u2611" : b + "\u2610";
    b += " Topic may only be set by operators\n";
    $("#x_domainGroupChatSettings").attr("title", b);
    $("#x_domainGroupChatSettings").text(c);
    domainFillGroupChatMemberList(a)
}
function domainFillGroupChatMemberList(a) {
    if (0 == a.members.length)
        $("#x_domainGroupChatMembers").text("No members");
    else {
        $("#x_domainGroupChatMembers").text(domainGroupChatCountString(a.members));
        var b = "";
        a = a.members.slice(0);
        a.sort(function(a, b) {
            return a.sortBy.localeCompare(b.sortBy)
        });
        for (var c = 0; c < a.length; c++) {
            var d = a[c];
            d.bot || (b = d.op || d.voice ? b + (d.displayname + " (" + d.type + ")\n") : b + (d.displayname + "\n"))
        }
        $("#x_domainGroupChatMembers").attr("title", b)
    }
}
$("#x_adminGroupChatMemberModalSet").click(function() {
    addStatisticEvent("groupchat_members_set");
    hideModal("#x_adminGroupChatMemberModal");
    var a = $("#x_adminGroupChatMemberModalOp").attr("checked")
      , b = $("#x_adminGroupChatMemberModalVoice").attr("checked");
    if (g_domainSelectedGroupChatMember.op != a && g_domainSelectedGroupChatMember.voice != b) {
        var c = g_domain.getGroupChat(g_domainSelectedGroupChat);
        g_domain.setGroupChatMemberFlag(c, g_domainSelectedGroupChatMember, (a ? MemberFlagOp : 0) | (b ? MemberFlagVoice : 0));
        domainFillGroupChatMemberList(c)
    }
});
$("#x_adminGroupChatMemberModalCancel").click(function() {
    addStatisticEvent("groupchat_members_cancel");
    hideModal("#x_adminGroupChatMemberModal")
});
$("#x_adminGroupChatMemberModalRemoveMember").click(function() {
    addStatisticEvent("groupchat_members_remove");
    hideModal("#x_adminGroupChatMemberModal");
    var a = g_domain.getGroupChat(g_domainSelectedGroupChat);
    g_domain.removeGroupChatMember(a, g_domainSelectedGroupChatMember);
    domainFillGroupChatMemberList(a);
    $("#x_domainGroupChatSelected").text(a.displaynameComputed);
    $("#x_domainSelectedGroupChatHeader").text(a.displaynameComputed);
    domainFillGroupChatList()
});
$("#x_adminGroupChatMembersListSearchInput").keyup(function() {
    domainGroupChatMembersManageFillList()
});
function domainGroupChatMembersManageFillList() {
    var a = "<table><colgroup><col class='narrower'><col class='narrower'><col><col class='narrower'><col class='narrower'></colgroup><tr><th colspan=3>USER</th><th>OP</th><th>VOICE</th></tr>"
      , b = $.trim($("#x_adminGroupChatMembersListSearchInput").val()).toLowerCase()
      , c = ""
      , d = ""
      , e = 0
      , f = 0
      , g = {}
      , h = g_domain.users.slice(0);
    h.sort(function(a, b) {
        return a.fullname.localeCompare(b.fullname)
    });
    for (var k = 0; k < h.length; k++) {
        var l = h[k];
        if (!(0 < b.length && -1 == l.username.toLowerCase().indexOf(b) && -1 == l.fullname.toLowerCase().indexOf(b))) {
            for (var m = !1, p = !1, n = !1, q = 0; q < g_domainSelectedGroupChatMemberListPending.length; q++) {
                var r = g_domainSelectedGroupChatMemberListPending[q];
                if (r.name == l.username) {
                    n = !0;
                    m = r.op;
                    p = r.voice;
                    g[r.name] = !0;
                    break
                }
            }
            if (!l.deleted || n) {
                var t = l.fullname.substr(0, 1).toUpperCase()
                  , u = l.fullname.indexOf(" ");
                -1 != u && (t += l.fullname.substr(u + 1, 1).toUpperCase());
                q = l.iconhash ? '<img src="/api/user/0.1/index.php/s3/avatar/' + l.iconhash + '">' : "";
                t = "<span class='avatar avatar30 empty'>" + t + "</span>";
                l.iconhash && (t = "<span class='avatar avatar30'>" + q + "</span>");
                r = "<tr class='click user" + (l.deleted ? " disabled" : "") + (n ? " checked" : "") + "' username='" + l.username + "' title='" + l.fullname + " (" + l.username + ")'><td class='checkbox'>" + (n ? g_onSVG : g_offSVG) + "</td><td class='image'>" + t + "</td><td class='name'>" + l.fullname + "</td><td class='op'>" + (m ? g_onSVG : g_offSVG) + "</td><td class='voice'>" + (p ? g_onSVG : g_offSVG) + "</td></tr>";
                n ? (c += r,
                e++) : (300 <= f ? 300 == f && (d += '<tr><td class="eof" colspan="5">Limiting remaining items, please search for a particular member.</td></tr>') : d += r,
                f++)
            }
        }
    }
    for (q = 0; q < g_domainSelectedGroupChatMemberListPending.length; q++)
        r = g_domainSelectedGroupChatMemberListPending[q],
        0 < b.length && r.name.toLowerCase().indexOf(b) || g[r.name] || (t = r.displayname.substr(0, 1).toUpperCase(),
        u = r.displayname.indexOf(" "),
        -1 != u && (t += r.displayname.substr(u + 1, 1).toUpperCase()),
        t = "<span class='avatar avatar30 empty'>" + t + "</span>",
        r.avatarURL && (t = "<span class='avatar avatar30'><img src='" + r.avatarURL + "'></span>"),
        e = "user checked",
        f = "checkbox",
        h = "",
        r.bot && (f = "checkbox disabled",
        e += " bot",
        h = "<span class='bot'>Bot</span>"),
        r = "<tr class='" + e + "' username='" + htmlEncode(r.name) + "'><td class='" + f + "'>" + g_onSVG + "</td><td class='image'>" + t + "</td><td class='name'>" + htmlEncode(r.displayname) + h + "</td><td class='op'>" + (r.op ? g_onSVG : g_offSVG) + "</td><td class='voice'>" + (r.voice ? g_onSVG : g_offSVG) + "</td></tr>",
        c += r);
    a += c + d + "</table>";
    $("#x_adminGroupChatMembersList").html(a);
    $("#x_adminGroupChatMembersList .op").click(function(a) {
        addStatisticEvent("groupchat_members_op");
        a = new GroupChatMember;
        a.name = $(this).parent().attr("username");
        for (var b = -1, c = 0; c < g_domainSelectedGroupChatMemberListPending.length; c++)
            if (g_domainSelectedGroupChatMemberListPending[c].name == a.name) {
                b = c;
                a.op = g_domainSelectedGroupChatMemberListPending[c].op;
                g_domainSelectedGroupChatMemberListPending[c].op = !a.op;
                break
            }
        a.op = !a.op;
        $(this).html(a.op ? g_onSVG : g_offSVG);
        c = $(this).parent().find(".checkbox");
        -1 == b && (c.html(g_onSVG),
        $(this).parent().addClass("checked"),
        g_domainSelectedGroupChatMemberListPending.push(a));
        domainGroupChatMembersManageStatusUpdate();
        return !1
    });
    $("#x_adminGroupChatMembersList .voice").click(function(a) {
        addStatisticEvent("groupchat_members_voice");
        a = new GroupChatMember;
        a.name = $(this).parent().attr("username");
        for (var b = -1, c = 0; c < g_domainSelectedGroupChatMemberListPending.length; c++)
            if (g_domainSelectedGroupChatMemberListPending[c].name == a.name) {
                b = c;
                a.voice = g_domainSelectedGroupChatMemberListPending[c].voice;
                g_domainSelectedGroupChatMemberListPending[c].voice = !a.voice;
                break
            }
        a.voice = !a.voice;
        $(this).html(a.voice ? g_onSVG : g_offSVG);
        c = $(this).parent().find(".checkbox");
        -1 == b && (c.html(g_onSVG),
        $(this).parent().addClass("checked"),
        g_domainSelectedGroupChatMemberListPending.push(a));
        domainGroupChatMembersManageStatusUpdate();
        return !1
    });
    $("#x_adminGroupChatMembersList .user").click(function(a) {
        addStatisticEvent("groupchat_members_select");
        a = new GroupChatMember;
        a.name = $(this).attr("username");
        for (var b = -1, c = 0; c < g_domainSelectedGroupChatMemberListPending.length; c++)
            if (g_domainSelectedGroupChatMemberListPending[c].name == a.name) {
                if (g_domainSelectedGroupChatMemberListPending[c].bot)
                    return;
                b = c;
                break
            }
        c = $(this).find(".checkbox");
        -1 != b ? (c.html(g_offSVG),
        $(this).removeClass("checked"),
        $(this).find(".voice").html(g_offSVG),
        $(this).find(".op").html(g_offSVG),
        g_domainSelectedGroupChatMemberListPending.splice(b, 1)) : (c.html(g_onSVG),
        $(this).addClass("checked"),
        g_domainSelectedGroupChatMemberListPending.push(a));
        domainGroupChatMembersManageStatusUpdate()
    });
    domainGroupChatMembersManageStatusUpdate()
}
function domainGroupChatMembersManageStatusUpdate() {
    var a = 0
      , b = 0;
    $("#x_adminGroupChatMembersList .user").each(function() {
        $(this).hasClass("bot") ? b++ : $(this).hasClass("checked") && a++
    });
    $("#x_adminGroupChatMembersManageStatus").text(domainGroupChatMembersString(b, a))
}
$("#x_domainGroupChatMembersManage").click(function() {
    if (!$(this).hasClass("disabled")) {
        addStatisticEvent("groupchat_members_manage");
        var a = g_domain.getGroupChat(g_domainSelectedGroupChat);
        a.deleted || (g_domainSelectedGroupChatMemberListPending = a.members.slice(0),
        domainGroupChatMembersManageFillList(),
        showModal("#x_adminGroupChatMembersManageModal"))
    }
});
$("#x_adminGroupChatMembersManageModalSet").click(function() {
    addStatisticEvent("groupchat_members_set");
    hideModal("#x_adminGroupChatMembersManageModal");
    for (var a = !1, b = g_domain.getGroupChat(g_domainSelectedGroupChat), c = b.members.slice(0), d = 0; d < c.length; d++) {
        for (var e = c[d], f = 0, g = !1, h = 0; h < g_domainSelectedGroupChatMemberListPending.length; h++) {
            var k = g_domainSelectedGroupChatMemberListPending[h];
            if (k.name == e.name) {
                f = (k.op ? MemberFlagOp : 0) | (k.voice ? MemberFlagVoice : 0) | (k.bot ? MemberFlagBot : 0);
                g = !0;
                g_domainSelectedGroupChatMemberListPending.splice(h, 1);
                break
            }
        }
        g ? e.flags != f && (e.flags = f,
        g_domain.setGroupChatMemberFlag(b, e, f)) : (g_domain.removeGroupChatMember(b, e),
        a = !0)
    }
    for (h = 0; h < g_domainSelectedGroupChatMemberListPending.length; h++)
        k = g_domainSelectedGroupChatMemberListPending[h],
        f = (k.op ? MemberFlagOp : 0) | (k.voice ? MemberFlagVoice : 0) | (k.bot ? MemberFlagBot : 0),
        g_domain.addGroupChatMember(b, k, f),
        a = !0;
    a && (domainFillGroupChatMemberList(b),
    domainFillGroupChatList(b),
    $("#x_domainGroupChatSelected").text(b.displaynameComputed),
    $("#x_domainSelectedGroupChatHeader").text(b.displaynameComputed))
});
$("#x_adminGroupChatMembersManageModalCancel").click(function() {
    addStatisticEvent("groupchat_members_cancel");
    hideModal("#x_adminGroupChatMembersManageModal")
});
$("#x_domainGroupChatHistory").click(function() {
    addStatisticEvent("groupchat_history");
    domainShowHistoryForGroupChat(g_domainSelectedGroupChat)
});
$("#x_domainGroupChatEnable").click(function() {
    addStatisticEvent("groupchat_enable");
    var a = g_domain.getGroupChat(g_domainSelectedGroupChat);
    g_domain.enableGroupChat(a, !0, null);
    a.deleted ? ($("#x_domainGroupChatEnable").show(),
    $("#x_domainGroupChatDisable").hide(),
    $("#x_domainGroupChatMembersManage").addClass("disabled")) : ($("#x_domainGroupChatEnable").hide(),
    $("#x_domainGroupChatDisable").show(),
    $("#x_domainGroupChatMembersManage").removeClass("disabled"));
    domainSelectGroupChatWarning();
    domainFillGroupChatList()
});
$("#x_domainGroupChatDisable").click(function() {
    addStatisticEvent("groupchat_disable");
    for (var a = g_domain.getGroupChat(g_domainSelectedGroupChat), b = [], c = 0; c < g_domain.policies.length; c++)
        for (var d = g_domain.policies[c], e = d.value["trillian.groupchat.bind.impp"].split(","), f = 0; f < e.length; f++)
            if (e[f].toLowerCase() == a.name.toLowerCase()) {
                b.push(d);
                break
            }
    0 == a.members.length && 0 == b.length ? disableGroupChat(a, b, !0, null) : ($("#adminTextAreaModal .header").html("<h4>Disable Group Chat?</h4>"),
    c = 1 == a.members.length ? "member" : "members",
    d = 1 == b.length ? "policy" : "policies",
    0 < b.length && 0 < a.members.length ? $("#adminTextAreaModal .body").html("Disabling this group chat will remove <b>" + a.members.length + " " + c + "</b> and remove it as an associated group chat from <b>" + b.length + " " + d + "</b>.") : 0 == b.length ? $("#adminTextAreaModal .body").html("Disabling this group chat will remove <b>" + a.members.length + " " + c + "</b>.") : 0 == a.members.length && $("#adminTextAreaModal .body").html("Disabling this group chat will remove it as an associated group chat from <b>" + b.length + " " + d + "</b>."),
    $("#adminTextAreaModalSet").addClass("delete"),
    $("#adminTextAreaModalSet").text("Disable"),
    g_textAreaSet = function() {
        disableGroupChat(a, b, !0, function(a) {
            $("#adminTextAreaModalSet").addClass("disabled");
            $("#adminTextAreaModalCancel").addClass("disabled");
            $("#adminTextAreaModal .header").html("<h4>Removing Members</h4>");
            $("#adminTextAreaModal .body").html("Removing members of group chat (" + (100 * a).toFixed() + "% complete)...");
            1 == a && ($("#adminTextAreaModalSet").removeClass("delete"),
            $("#adminTextAreaModalSet").removeClass("disabled"),
            $("#adminTextAreaModalCancel").removeClass("disabled"),
            hideModal("#adminTextAreaModal"))
        })
    }
    ,
    showModal("#adminTextAreaModal"))
});
function disableGroupChat(a, b, c, d) {
    g_domain.enableGroupChat(a, !1, function(e) {
        if (1 == e) {
            for (var f = 0; f < b.length; f++)
                b[f].removeInitialGroupChat(a.name);
            c && (a.deleted ? ($("#x_domainGroupChatEnable").show(),
            $("#x_domainGroupChatDisable").hide(),
            $("#x_domainGroupChatMembersManage").addClass("disabled")) : ($("#x_domainGroupChatEnable").hide(),
            $("#x_domainGroupChatDisable").show(),
            $("#x_domainGroupChatMembersManage").removeClass("disabled")),
            domainSelectGroupChatWarning());
            domainFillGroupChatMemberList(a);
            domainFillGroupChatList()
        }
        d && d(e)
    })
}
;function domainFillPolicyList() {
    $("#x_domainPoliciesCount").text(g_domain.policies.length);
    for (var a = "<table><colgroup><col><col class='narrow'></colgroup><tr><th>NAME</th><th>USERS</th></tr>", b = $.trim($("#x_domainPolicyListSearchInput").val()).toLowerCase(), c = 0; c < g_domain.policies.length; c++) {
        var d = g_domain.policies[c];
        if (!(0 < b.length && -1 == d.name.toLowerCase().indexOf(b))) {
            var e = "";
            d.id == g_domain.policy && (e = "<span class='admin'>Default</span>");
            d = "<tr class='click policy' policy_id='" + d.id + "'><td class='name'>" + htmlEncode(d.name) + e + "</td><td class='count'>" + d.userCount() + "</td>";
            d += "</tr>";
            a += d
        }
    }
    a += "</table>";
    $("#x_domainPolicyList").html(a);
    $("#x_domainPolicyListSearch").show();
    $("#x_domainPolicyList .policy").click(function() {
        addStatisticEvent("policy_select");
        domainSelectPolicy($(this).attr("policy_id"))
    })
}
$("#x_domainPolicyListSearchInput").keyup(function() {
    domainFillPolicyList()
});
$("#x_domainSelectedPolicyDelete").click(function() {
    addStatisticEvent("policy_delete");
    var a = g_domain.getPolicy(g_domainSelectedPolicy);
    if (0 == a.groups.length && 0 == a.users.length)
        $("#x_adminPolicyDelete .body").text('Are you sure you want to delete the policy "' + a.name + '"?'),
        $("#x_adminPolicyDeleteConfirm").show();
    else {
        var b = 1 == a.groups.length ? "1 group" : a.groups.length + " groups"
          , c = 1 == a.users.length ? "1 user" : a.users.length + " users";
        $("#x_adminPolicyDelete .body").text('Unable to delete the policy "' + a.name + '".  It is associated with ' + b + " and " + c + ".  Please remove all associations first before deleting.");
        $("#x_adminPolicyDeleteConfirm").hide()
    }
    showModal("#x_adminPolicyDelete")
});
$("#x_adminPolicyDeleteConfirm").click(function() {
    addStatisticEvent("policy_delete_confirm");
    hideModal("#x_adminPolicyDelete");
    $("[tab=policies]").addClass("active").siblings("div[tab]").removeClass("active");
    $("[page=policies]").show().siblings(".page").hide();
    selectTab("policies");
    g_domain.getPolicy(g_domainSelectedPolicy).deletePolicy(function() {
        g_domain.requestPolicies(function() {
            domainFillPolicyList()
        })
    })
});
$("#x_adminPolicyDeleteCancel").click(function() {
    addStatisticEvent("policy_delete_cancel");
    hideModal("#x_adminPolicyDelete")
});
function domainSelectPolicy(a) {
    g_domainSelectedPolicy = a;
    var b = g_domain.getPolicy(a);
    $("div[tab=selected_user]").hide();
    $("div[tab=selected_group]").hide();
    $("div[tab=selected_policy]").show();
    $("#x_domainPolicySelected").text(b.name);
    $("#x_domainSelectedPolicyHeader").text(b.name);
    $("[tab=selected_policy]").addClass("active").siblings("[tab]").removeClass("active");
    $("[page=selected_policy]").show().siblings("[page]").hide();
    domainWarning(null);
    $("#x_domainPolicyName").text(b.name);
    $("#x_domainPolicyUserCountHeader").show();
    for (var c = 0, d = 0; d < b.users.length; d++)
        b.users[d].deleted || c++;
    $("#x_domainPolicyUserCount").text(c);
    0 == c ? $("#x_domainPolicyUserCountView").hide() : $("#x_domainPolicyUserCountView").show();
    $("#x_domainPolicyGroupCount").text(b.groups.length);
    b.id == g_domain.policy ? ($("#x_domainPolicyNameEdit").hide(),
    $("#x_domainPolicyDomainHeader").show(),
    $("#x_domainSelectedPolicyDelete").hide()) : ($("#x_domainPolicyNameEdit").show(),
    $("#x_domainPolicyDomainHeader").hide(),
    $("#x_domainSelectedPolicyDelete").show());
    c = "No restrictions";
    a = "";
    "1" == b.value["trillian.federation"] ? a += "\u2611 Allow federation with Trillian users\n" : (a += "\u2610 Allow federation with Trillian users\n",
    c = "Some restrictions");
    "1" == b.value["trillian.history.groupchat"] ? a += "\u2611 Enable group chat cloud history" : (a += "\u2610 Enable group chat cloud history",
    c = "Some restrictions");
    $("#x_domainPolicyDomainSettings").attr("title", a);
    $("#x_domainPolicyDomainSettings").text(c);
    c = "No restrictions";
    a = "";
    "1" == b.value["trillian.history.cloud"] ? a += "\u2611 Enable cloud history\n" : (a += "\u2610 Enable cloud history\n",
    c = "Some restrictions");
    "1" == b.value["trillian.history.disclaimer"] ? a += "\u2611 Enable chat history disclaimer\n" : (a += "\u2610 Enable chat history disclaimer\n",
    c = "Some restrictions");
    a += '    "' + decodeURIComponent(b.value["trillian.history.disclaimer.text"]) + '"\n';
    "off" != b.value["trillian.filetransfer"] ? a += "\u2611 Enable file transfers\n" : (a += "\u2610 Enable file transfers\n",
    c = "Some restrictions");
    "1" == b.value["trillian.groupchat.create.impp"] ? a += "\u2611 Enable group chat creation\n" : (a += "\u2610 Enable group chat creation\n",
    c = "Some restrictions");
    "1" == b.value["trillian.groupchat.join.impp"] ? a += "\u2611 Enable group chat joining\n" : (a += "\u2610 Enable group chat joining\n",
    c = "Some restrictions");
    "off" != b.value["trillian.media"] ? a += "\u2611 Enable image transfers\n" : (a += "\u2610 Enable image transfers\n",
    c = "Some restrictions");
    "1" == b.value["trillian.mail"] ? a += "\u2611 Enable mail notification\n" : (a += "\u2610 Enable mail notification\n",
    c = "Some restrictions");
    "1" == b.value["trillian.autoupdate"] ? a += "\u2611 Enable software auto-update\n" : (a += "\u2610 Enable software auto-update\n",
    c = "Some restrictions");
    "1" == b.value["trillian.voice"] ? a += "\u2611 Enable voice calls\n" : (a += "\u2610 Enable voice calls\n",
    c = "Some restrictions");
    "1" == b.value["trillian.settings.plugins"] ? a += "\u2611 Show settings for plugins\n" : (a += "\u2610 Show settings for plugins\n",
    c = "Some restrictions");
    "1" == b.value["trillian.settings.skins"] ? a += "\u2611 Show settings for skins\n" : (a += "\u2610 Show settings for skins\n",
    c = "Some restrictions");
    "1" == b.value["trillian.settings.status"] ? a += "\u2611 Show settings for status changing" : (a += "\u2610 Show settings for status changing",
    c = "Some restrictions");
    $("#x_domainPolicySettings").attr("title", a);
    $("#x_domainPolicySettings").text(c);
    a = "Network\t\tFT\tGroup\tMail\n";
    "1" == b.value["trillian.plugin.oscar"] ? a += "\u2611 AIM, ICQ" : (a += "\u2610 AIM, ICQ",
    c = "Some restrictions");
    "1" == b.value["trillian.filetransfer.oscar"] ? a += "\t\u2611" : (a += "\t\u2610",
    c = "Some restrictions");
    "1" == b.value["trillian.groupchat.oscar"] ? a += "\t\u2611" : (a += "\t\u2610",
    c = "Some restrictions");
    "1" == b.value["trillian.mail.oscar"] ? a += "\t\u2611" : (a += "\t\u2610",
    c = "Some restrictions");
    a += "\n";
    "1" == b.value["trillian.plugin.rendezvous"] ? a += "\u2611 Bonjour" : (a += "\u2610 Bonjour",
    c = "Some restrictions");
    "1" == b.value["trillian.filetransfer.rendezvous"] ? a += "\t\u2611" : (a += "\t\u2610",
    c = "Some restrictions");
    a += "\n";
    "1" == b.value["trillian.plugin.facebook"] ? a += "\u2611 Facebook" : (a += "\u2610 Facebook",
    c = "Some restrictions");
    "1" == b.value["trillian.mail.facebook"] ? a += "\t     \t     \t\u2611" : (a += "\t     \t     \t\u2610",
    c = "Some restrictions");
    a += "\n";
    "1" == b.value["trillian.plugin.foursquare"] ? a += "\u2611 Foursquare" : (a += "\u2610 Foursquare",
    c = "Some restrictions");
    a += "\n";
    "1" == b.value["trillian.plugin.irc"] ? a += "\u2611 IRC      " : (a += "\u2610 IRC      ",
    c = "Some restrictions");
    "1" == b.value["trillian.filetransfer.irc"] ? a += "\t\u2611" : (a += "\t\u2610",
    c = "Some restrictions");
    "1" == b.value["trillian.groupchat.irc"] ? a += "\t\u2611" : (a += "\t\u2610",
    c = "Some restrictions");
    a += "\n";
    "1" == b.value["trillian.plugin.xmpp"] ? a += "\u2611 XMPP  " : (a += "\u2610 XMPP  ",
    c = "Some restrictions");
    "1" == b.value["trillian.filetransfer.xmpp"] ? a += "\t\u2611" : (a += "\t\u2610",
    c = "Some restrictions");
    "1" == b.value["trillian.groupchat.xmpp"] ? a += "\t\u2611" : (a += "\t\u2610",
    c = "Some restrictions");
    "1" == b.value["trillian.mail.xmpp"] ? a += "\t\u2611" : (a += "\t\u2610",
    c = "Some restrictions");
    a += "\n";
    "1" == b.value["trillian.plugin.linkedin"] ? a += "\u2611 LinkedIn" : (a += "\u2610 LinkedIn",
    c = "Some restrictions");
    a += "\n";
    "1" == b.value["trillian.plugin.myspace"] ? a += "\u2611 MySpace IM" : (a += "\u2610 MySpace IM",
    c = "Some restrictions");
    "1" == b.value["trillian.mail.myspace"] ? a += "\t     \t     \t\u2611" : (a += "\t     \t     \t\u2610",
    c = "Some restrictions");
    a += "\n";
    "1" == b.value["trillian.plugin.skype"] ? a += "\u2611 Skype  " : (a += "\u2610 Skype  ",
    c = "Some restrictions");
    "1" == b.value["trillian.filetransfer.skype"] ? a += "\t\u2611" : (a += "\t\u2610",
    c = "Some restrictions");
    "1" == b.value["trillian.groupchat.skype"] ? a += "\t\u2611" : (a += "\t\u2610",
    c = "Some restrictions");
    a += "\n";
    "1" == b.value["trillian.plugin.twitter"] ? a += "\u2611 Twitter" : (a += "\u2610 Twitter",
    c = "Some restrictions");
    a += "\n";
    "1" == b.value["trillian.plugin.msn"] ? a += "\u2611 MSN    " : (a += "\u2610 MSN    ",
    c = "Some restrictions");
    "1" == b.value["trillian.filetransfer.msn"] ? a += "\t\u2611" : (a += "\t\u2610",
    c = "Some restrictions");
    "1" == b.value["trillian.groupchat.msn"] ? a += "\t\u2611" : (a += "\t\u2610",
    c = "Some restrictions");
    "1" == b.value["trillian.mail.msn"] ? a += "\t\u2611" : (a += "\t\u2610",
    c = "Some restrictions");
    a += "\n";
    "1" == b.value["trillian.plugin.yahoo"] ? a += "\u2611 Yahoo!" : (a += "\u2610 Yahoo!",
    c = "Some restrictions");
    "1" == b.value["trillian.filetransfer.yahoo"] ? a += "\t\u2611" : (a += "\t\u2610",
    c = "Some restrictions");
    "1" == b.value["trillian.groupchat.yahoo"] ? a += "\t\u2611" : (a += "\t\u2610",
    c = "Some restrictions");
    "1" == b.value["trillian.mail.yahoo"] ? a += "\t\u2611" : (a += "\t\u2610",
    c = "Some restrictions");
    $("#x_domainPolicyIMSettings").attr("title", a);
    $("#x_domainPolicyIMSettings").text(c);
    var e = "No associated group chats"
      , c = 0;
    a = "";
    b = b.value["trillian.groupchat.bind.impp"].split(",");
    for (d = 0; d < b.length; d++) {
        var f = b[d].trim();
        if (f = g_domain.getGroupChat(f))
            f = htmlEncode(f.displaynameComputed),
            c++,
            a += f + "\n"
    }
    0 < c && (e = c + " associated group chat" + (1 != c ? "s" : ""));
    $("#x_domainPolicyInitialGroupChats").attr("title", a);
    $("#x_domainPolicyInitialGroupChats").text(e)
}
$("#x_adminGroupChatSelectListSearchInput").keyup(function() {
    updateSelectedPolicyGroupListModal()
});
function updateSelectedPolicyGroupListModal() {
    var a = g_domain.getPolicy(g_domainSelectedPolicy).value["trillian.groupchat.bind.impp"].split(",");
    if (0 < g_domain.groupchats.length) {
        var b = "<table><colgroup><col><col class='narrow'></colgroup><tr><th>NAME</th><th>USERS</th></tr>"
          , c = $.trim($("#x_adminGroupChatSelectListSearchInput").val()).toLowerCase();
        g_domain.groupchats.sort(function(a, b) {
            return a.sortBy < b.sortBy ? -1 : a.sortBy > b.sortBy ? 1 : 0
        });
        for (var d = 0; d < g_domain.groupchats.length; d++) {
            var e = g_domain.groupchats[d];
            if (!e.deleted) {
                for (var f = !1, g = 0; g < a.length; g++)
                    if (a[g].trim().toLowerCase() == e.name.toLowerCase()) {
                        f = !0;
                        break
                    }
                if (!f) {
                    if (0 < c.length && -1 == e.displaynameComputed.toLowerCase().indexOf(c) && -1 == e.topic.toLowerCase().indexOf(c)) {
                        f = !1;
                        for (g = 0; g < e.members.length; g++) {
                            var h = e.members[g];
                            if (-1 != h.name.toLowerCase().indexOf(c) || h.user && -1 != h.user.fullname.toLowerCase().indexOf(c)) {
                                f = !0;
                                break
                            }
                        }
                        if (!f)
                            continue
                    }
                    g = htmlEncode(e.topic);
                    f = htmlEncode(e.displaynameComputed);
                    e = "<tr class='click groupchat' name='" + e.name + "' displayname='" + f + "'><td class='name' title='" + f + " " + g + "'>" + f + " <span class='topic'>" + g + "</td><td class='count'>" + e.members.length + "</td>";
                    e += "</tr>";
                    b += e
                }
            }
        }
        b += "</table>"
    } else
        b = "<div class='empty'>No group chats found.</div>";
    $("#x_adminGroupChatSelectList").html(b);
    $("#x_adminGroupChatSelectList .groupchat").click(function() {
        addStatisticEvent("policy_groupchat_select");
        for (var a = $(this).attr("displayname"), b = $(this).attr("name"), c = g_domain.getPolicy(g_domainSelectedPolicy), d = g_domain.getGroupChat(b), e = [], f = 0; f < c.users.length; f++) {
            var g = !1;
            if (!c.users[f].deleted) {
                for (var h = 0; h < d.members.length; h++)
                    if (c.users[f].username.toLowerCase() == d.members[h].name.toLowerCase()) {
                        g = !0;
                        break
                    }
                g || e.push(c.users[f])
            }
        }
        0 < e.length ? ($("#adminTextAreaModal .header").html("<h4>Select a Group Chat</h4>"),
        1 == e.length ? $("#adminTextAreaModal .body").html("Are you sure you wish to add <b>" + e.length + " user</b> of this policy to the group chat <b>" + a + "</b>?") : $("#adminTextAreaModal .body").html("Are you sure you wish to add <b>" + e.length + " users</b> of this policy to the group chat <b>" + a + "</b>?"),
        $("#adminTextAreaModalSet").text("Select"),
        g_textAreaSet = function() {
            c.addInitialGroupChat(b, function(a) {
                $("#adminTextAreaModalSet").addClass("disabled");
                $("#adminTextAreaModalCancel").addClass("disabled");
                $("#adminTextAreaModal .header").html("<h4>Adding Users</h4>");
                $("#adminTextAreaModal .body").html("Adding users of policy to group chat (" + (100 * a).toFixed() + "% complete)...");
                1 == a && ($("#adminTextAreaModalSet").removeClass("disabled"),
                $("#adminTextAreaModalCancel").removeClass("disabled"),
                domainPolicyInitialGroupChatsFillList(),
                replaceModal("#adminTextAreaModal", "#x_domainPolicyInitialGroupChatsModal"),
                domainSelectPolicy(g_domainSelectedPolicy))
            })
        }
        ,
        g_textAreaCancel = function() {
            replaceModal("#adminTextAreaModal", "#x_adminGroupChatSelectModal")
        }
        ,
        replaceModal("#x_adminGroupChatSelectModal", "#adminTextAreaModal"),
        $("#x_adminGroupChatSelectListSearchInput").val("")) : (c.addInitialGroupChat(b),
        domainPolicyInitialGroupChatsFillList(),
        replaceModal("#x_adminGroupChatSelectModal", "#x_domainPolicyInitialGroupChatsModal"),
        domainSelectPolicy(g_domainSelectedPolicy))
    })
}
$("#x_domainPolicyDomainSettingsChange").click(function() {
    addStatisticEvent("policy_domain_settings");
    var a = g_domain.getPolicy(g_domainSelectedPolicy);
    "1" == a.value["trillian.history.groupchat"] ? $("#x_domainPolicyDomainHistoryGroupchat").attr("checked", "checked") : $("#x_domainPolicyDomainHistoryGroupchat").removeAttr("checked");
    "1" == a.value["trillian.federation"] ? $("#x_domainPolicyDomainFederation").attr("checked", "checked") : $("#x_domainPolicyDomainFederation").removeAttr("checked");
    showModal("#x_domainPolicyDomainModal")
});
$("#x_domainPolicyDomainHelp").click(function() {
    addStatisticEvent("policy_domain_settings_help");
    showModalHelper("#x_domainPolicyDomainModal", "#x_domainPolicyDomainHelp")
});
$("#x_domainPolicyDomainSet").click(function() {
    addStatisticEvent("policy_domain_settings_set");
    var a = g_domain.getPolicy(g_domainSelectedPolicy);
    a.value["trillian.history.groupchat"] = $("#x_domainPolicyDomainHistoryGroupchat").attr("checked") ? "1" : "0";
    a.value["trillian.federation"] = $("#x_domainPolicyDomainFederation").attr("checked") ? "1" : "0";
    a.update();
    domainSelectPolicy(g_domainSelectedPolicy);
    hideModal("#x_domainPolicyDomainModal")
});
$("#x_domainPolicyDomainCancel").click(function() {
    addStatisticEvent("policy_domain_settings_cancel");
    hideModal("#x_domainPolicyDomainModal")
});
$("#x_domainPolicyIMSettingsChange").click(function() {
    addStatisticEvent("policy_im_settings");
    var a = g_domain.getPolicy(g_domainSelectedPolicy);
    "1" == a.value["trillian.plugin.oscar"] ? $("#x_domainPolicyIMSettingsPluginOscar").html(g_onSVG) : $("#x_domainPolicyIMSettingsPluginOscar").html(g_offSVG);
    "1" == a.value["trillian.filetransfer.oscar"] ? $("#x_domainPolicyIMSettingsFiletransferOscar").html(g_onSVG) : $("#x_domainPolicyIMSettingsFiletransferOscar").html(g_offSVG);
    "1" == a.value["trillian.groupchat.oscar"] ? $("#x_domainPolicyIMSettingsGroupchatOscar").html(g_onSVG) : $("#x_domainPolicyIMSettingsGroupchatOscar").html(g_offSVG);
    "1" == a.value["trillian.mail.oscar"] ? $("#x_domainPolicyIMSettingsMailOscar").html(g_onSVG) : $("#x_domainPolicyIMSettingsMailOscar").html(g_offSVG);
    "1" == a.value["trillian.plugin.rendezvous"] ? $("#x_domainPolicyIMSettingsPluginRendezvous").html(g_onSVG) : $("#x_domainPolicyIMSettingsPluginRendezvous").html(g_offSVG);
    "1" == a.value["trillian.filetransfer.rendezvous"] ? $("#x_domainPolicyIMSettingsFiletransferRendezvous").html(g_onSVG) : $("#x_domainPolicyIMSettingsFiletransferRendezvous").html(g_offSVG);
    "1" == a.value["trillian.plugin.facebook"] ? $("#x_domainPolicyIMSettingsPluginFacebook").html(g_onSVG) : $("#x_domainPolicyIMSettingsPluginFacebook").html(g_offSVG);
    "1" == a.value["trillian.mail.facebook"] ? $("#x_domainPolicyIMSettingsMailFacebook").html(g_onSVG) : $("#x_domainPolicyIMSettingsMailFacebook").html(g_offSVG);
    "1" == a.value["trillian.plugin.foursquare"] ? $("#x_domainPolicyIMSettingsPluginFoursquare").html(g_onSVG) : $("#x_domainPolicyIMSettingsPluginFoursquare").html(g_offSVG);
    "1" == a.value["trillian.plugin.irc"] ? $("#x_domainPolicyIMSettingsPluginIRC").html(g_onSVG) : $("#x_domainPolicyIMSettingsPluginIRC").html(g_offSVG);
    "1" == a.value["trillian.filetransfer.irc"] ? $("#x_domainPolicyIMSettingsFiletransferIRC").html(g_onSVG) : $("#x_domainPolicyIMSettingsFiletransferIRC").html(g_offSVG);
    "1" == a.value["trillian.groupchat.irc"] ? $("#x_domainPolicyIMSettingsGroupchatIRC").html(g_onSVG) : $("#x_domainPolicyIMSettingsGroupchatIRC").html(g_offSVG);
    "1" == a.value["trillian.plugin.xmpp"] ? $("#x_domainPolicyIMSettingsPluginXMPP").html(g_onSVG) : $("#x_domainPolicyIMSettingsPluginXMPP").html(g_offSVG);
    "1" == a.value["trillian.filetransfer.xmpp"] ? $("#x_domainPolicyIMSettingsFiletransferXMPP").html(g_onSVG) : $("#x_domainPolicyIMSettingsFiletransferXMPP").html(g_offSVG);
    "1" == a.value["trillian.groupchat.xmpp"] ? $("#x_domainPolicyIMSettingsGroupchatXMPP").html(g_onSVG) : $("#x_domainPolicyIMSettingsGroupchatXMPP").html(g_offSVG);
    "1" == a.value["trillian.mail.xmpp"] ? $("#x_domainPolicyIMSettingsMailXMPP").html(g_onSVG) : $("#x_domainPolicyIMSettingsMailXMPP").html(g_offSVG);
    "1" == a.value["trillian.plugin.linkedin"] ? $("#x_domainPolicyIMSettingsPluginLinkedIn").html(g_onSVG) : $("#x_domainPolicyIMSettingsPluginLinkedIn").html(g_offSVG);
    "1" == a.value["trillian.plugin.myspace"] ? $("#x_domainPolicyIMSettingsPluginMySpace").html(g_onSVG) : $("#x_domainPolicyIMSettingsPluginMySpace").html(g_offSVG);
    "1" == a.value["trillian.mail.myspace"] ? $("#x_domainPolicyIMSettingsMailMySpace").html(g_onSVG) : $("#x_domainPolicyIMSettingsMailMySpace").html(g_offSVG);
    "1" == a.value["trillian.plugin.skype"] ? $("#x_domainPolicyIMSettingsPluginSkype").html(g_onSVG) : $("#x_domainPolicyIMSettingsPluginSkype").html(g_offSVG);
    "1" == a.value["trillian.filetransfer.skype"] ? $("#x_domainPolicyIMSettingsFiletransferSkype").html(g_onSVG) : $("#x_domainPolicyIMSettingsFiletransferSkype").html(g_offSVG);
    "1" == a.value["trillian.groupchat.skype"] ? $("#x_domainPolicyIMSettingsGroupchatSkype").html(g_onSVG) : $("#x_domainPolicyIMSettingsGroupchatSkype").html(g_offSVG);
    "1" == a.value["trillian.plugin.twitter"] ? $("#x_domainPolicyIMSettingsPluginTwitter").html(g_onSVG) : $("#x_domainPolicyIMSettingsPluginTwitter").html(g_offSVG);
    "1" == a.value["trillian.plugin.msn"] ? $("#x_domainPolicyIMSettingsPluginMSN").html(g_onSVG) : $("#x_domainPolicyIMSettingsPluginMSN").html(g_offSVG);
    "1" == a.value["trillian.filetransfer.msn"] ? $("#x_domainPolicyIMSettingsFiletransferMSN").html(g_onSVG) : $("#x_domainPolicyIMSettingsFiletransferMSN").html(g_offSVG);
    "1" == a.value["trillian.groupchat.msn"] ? $("#x_domainPolicyIMSettingsGroupchatMSN").html(g_onSVG) : $("#x_domainPolicyIMSettingsGroupchatMSN").html(g_offSVG);
    "1" == a.value["trillian.mail.msn"] ? $("#x_domainPolicyIMSettingsMailMSN").html(g_onSVG) : $("#x_domainPolicyIMSettingsMailMSN").html(g_offSVG);
    "1" == a.value["trillian.plugin.yahoo"] ? $("#x_domainPolicyIMSettingsPluginYahoo").html(g_onSVG) : $("#x_domainPolicyIMSettingsPluginYahoo").html(g_offSVG);
    "1" == a.value["trillian.filetransfer.yahoo"] ? $("#x_domainPolicyIMSettingsFiletransferYahoo").html(g_onSVG) : $("#x_domainPolicyIMSettingsFiletransferYahoo").html(g_offSVG);
    "1" == a.value["trillian.groupchat.yahoo"] ? $("#x_domainPolicyIMSettingsGroupchatYahoo").html(g_onSVG) : $("#x_domainPolicyIMSettingsGroupchatYahoo").html(g_offSVG);
    "1" == a.value["trillian.mail.yahoo"] ? $("#x_domainPolicyIMSettingsMailYahoo").html(g_onSVG) : $("#x_domainPolicyIMSettingsMailYahoo").html(g_offSVG);
    "off" == a.value["trillian.filetransfer"] ? $(".policy_ft").hide() : $(".policy_ft").show();
    "1" != a.value["trillian.mail"] ? $(".policy_mail").hide() : $(".policy_mail").show();
    "off" == a.value["trillian.filetransfer"] && "1" != a.value["trillian.mail"] ? ($("#x_domainPolicyIMSettingsWarning").text("File transfers and mail are turned off globally.").show(),
    $(".policy_item").attr("colspan", "3"),
    $("#x_domainPolicyIMSettingsNetworkHeader").attr("colspan", "4")) : "off" == a.value["trillian.filetransfer"] ? ($("#x_domainPolicyIMSettingsWarning").text("File transfers are turned off globally.").show(),
    $(".policy_item").attr("colspan", "2"),
    $("#x_domainPolicyIMSettingsNetworkHeader").attr("colspan", "3")) : "1" != a.value["trillian.mail"] ? ($("#x_domainPolicyIMSettingsWarning").text("Mail is turned off globally.").show(),
    $(".policy_item").attr("colspan", "2"),
    $("#x_domainPolicyIMSettingsNetworkHeader").attr("colspan", "3")) : ($("#x_domainPolicyIMSettingsWarning").text("").hide(),
    $(".policy_item").attr("colspan", "1"),
    $("#x_domainPolicyIMSettingsNetworkHeader").attr("colspan", "2"));
    $("#x_domainPolicyIMSettingsModal").find(".on_off.master").each(function() {
        "on" == $(this).find("svg").attr("state") ? $(this).siblings(".on_off").find("svg").show() : $(this).siblings(".on_off").find("svg").hide()
    });
    showModal("#x_domainPolicyIMSettingsModal")
});
$("#x_domainPolicyIMSettingsModal .on_off").click(function() {
    "on" == $(this).find("svg").attr("state") ? $(this).html(g_offSVG) : $(this).html(g_onSVG)
});
$("#x_domainPolicyIMSettingsModal .on_off.master").click(function() {
    "on" == $(this).find("svg").attr("state") ? $(this).siblings(".on_off").find("svg").show() : $(this).siblings(".on_off").find("svg").hide()
});
$("#x_domainPolicyIMSettingsHelp").click(function() {
    addStatisticEvent("policy_im_settings_help");
    showModalHelper("#x_domainPolicyIMSettingsModal", "#x_domainPolicyIMSettingsHelp")
});
$("#x_domainPolicyIMSettingsSet").click(function() {
    addStatisticEvent("policy_im_settings_set");
    var a = g_domain.getPolicy(g_domainSelectedPolicy);
    a.value["trillian.plugin.oscar"] = "on" == $("#x_domainPolicyIMSettingsPluginOscar").find("svg").attr("state") ? "1" : "0";
    a.value["trillian.filetransfer.oscar"] = "on" == $("#x_domainPolicyIMSettingsFiletransferOscar").find("svg").attr("state") ? "1" : "0";
    a.value["trillian.groupchat.oscar"] = "on" == $("#x_domainPolicyIMSettingsGroupchatOscar").find("svg").attr("state") ? "1" : "0";
    a.value["trillian.mail.oscar"] = "on" == $("#x_domainPolicyIMSettingsMailOscar").find("svg").attr("state") ? "1" : "0";
    a.value["trillian.plugin.rendezvous"] = "on" == $("#x_domainPolicyIMSettingsPluginRendezvous").find("svg").attr("state") ? "1" : "0";
    a.value["trillian.filetransfer.rendezvous"] = "on" == $("#x_domainPolicyIMSettingsFiletransferRendezvous").find("svg").attr("state") ? "1" : "0";
    a.value["trillian.plugin.facebook"] = "on" == $("#x_domainPolicyIMSettingsPluginFacebook").find("svg").attr("state") ? "1" : "0";
    a.value["trillian.mail.facebook"] = "on" == $("#x_domainPolicyIMSettingsMailFacebook").find("svg").attr("state") ? "1" : "0";
    a.value["trillian.plugin.foursquare"] = "on" == $("#x_domainPolicyIMSettingsPluginFoursquare").find("svg").attr("state") ? "1" : "0";
    a.value["trillian.plugin.irc"] = "on" == $("#x_domainPolicyIMSettingsPluginIRC").find("svg").attr("state") ? "1" : "0";
    a.value["trillian.filetransfer.irc"] = "on" == $("#x_domainPolicyIMSettingsFiletransferIRC").find("svg").attr("state") ? "1" : "0";
    a.value["trillian.groupchat.irc"] = "on" == $("#x_domainPolicyIMSettingsGroupchatIRC").find("svg").attr("state") ? "1" : "0";
    a.value["trillian.plugin.xmpp"] = "on" == $("#x_domainPolicyIMSettingsPluginXMPP").find("svg").attr("state") ? "1" : "0";
    a.value["trillian.filetransfer.xmpp"] = "on" == $("#x_domainPolicyIMSettingsFiletransferXMPP").find("svg").attr("state") ? "1" : "0";
    a.value["trillian.groupchat.xmpp"] = "on" == $("#x_domainPolicyIMSettingsGroupchatXMPP").find("svg").attr("state") ? "1" : "0";
    a.value["trillian.mail.xmpp"] = "on" == $("#x_domainPolicyIMSettingsMailXMPP").find("svg").attr("state") ? "1" : "0";
    a.value["trillian.plugin.linkedin"] = "on" == $("#x_domainPolicyIMSettingsPluginLinkedIn").find("svg").attr("state") ? "1" : "0";
    a.value["trillian.plugin.myspace"] = "on" == $("#x_domainPolicyIMSettingsPluginMySpace").find("svg").attr("state") ? "1" : "0";
    a.value["trillian.mail.myspace"] = "on" == $("#x_domainPolicyIMSettingsMailMySpace").find("svg").attr("state") ? "1" : "0";
    a.value["trillian.plugin.skype"] = "on" == $("#x_domainPolicyIMSettingsPluginSkype").find("svg").attr("state") ? "1" : "0";
    a.value["trillian.filetransfer.skype"] = "on" == $("#x_domainPolicyIMSettingsFiletransferSkype").find("svg").attr("state") ? "1" : "0";
    a.value["trillian.groupchat.skype"] = "on" == $("#x_domainPolicyIMSettingsGroupchatSkype").find("svg").attr("state") ? "1" : "0";
    a.value["trillian.plugin.twitter"] = "on" == $("#x_domainPolicyIMSettingsPluginTwitter").find("svg").attr("state") ? "1" : "0";
    a.value["trillian.plugin.msn"] = "on" == $("#x_domainPolicyIMSettingsPluginMSN").find("svg").attr("state") ? "1" : "0";
    a.value["trillian.filetransfer.msn"] = "on" == $("#x_domainPolicyIMSettingsFiletransferMSN").find("svg").attr("state") ? "1" : "0";
    a.value["trillian.groupchat.msn"] = "on" == $("#x_domainPolicyIMSettingsGroupchatMSN").find("svg").attr("state") ? "1" : "0";
    a.value["trillian.mail.msn"] = "on" == $("#x_domainPolicyIMSettingsMailMSN").find("svg").attr("state") ? "1" : "0";
    a.value["trillian.plugin.yahoo"] = "on" == $("#x_domainPolicyIMSettingsPluginYahoo").find("svg").attr("state") ? "1" : "0";
    a.value["trillian.filetransfer.yahoo"] = "on" == $("#x_domainPolicyIMSettingsFiletransferYahoo").find("svg").attr("state") ? "1" : "0";
    a.value["trillian.groupchat.yahoo"] = "on" == $("#x_domainPolicyIMSettingsGroupchatYahoo").find("svg").attr("state") ? "1" : "0";
    a.value["trillian.mail.yahoo"] = "on" == $("#x_domainPolicyIMSettingsMailYahoo").find("svg").attr("state") ? "1" : "0";
    a.update();
    domainSelectPolicy(g_domainSelectedPolicy);
    hideModal("#x_domainPolicyIMSettingsModal")
});
$("#x_domainPolicyIMSettingsCancel").click(function() {
    addStatisticEvent("policy_im_settings_cancel");
    hideModal("#x_domainPolicyIMSettingsModal")
});
$("#x_domainPolicySettingsChange").click(function() {
    addStatisticEvent("policy_settings");
    var a = g_domain.getPolicy(g_domainSelectedPolicy);
    "1" == a.value["trillian.history.cloud"] ? $("#x_domainPolicySettingsHistoryCloud").attr("checked", "checked") : $("#x_domainPolicySettingsHistoryCloud").removeAttr("checked");
    "1" == a.value["trillian.history.disclaimer"] ? $("#x_domainPolicySettingsHistoryDisclaimer").attr("checked", "checked") : $("#x_domainPolicySettingsHistoryDisclaimer").removeAttr("checked");
    $("#x_domainPolicySettingsHistoryDisclaimer, label[for=x_domainPolicySettingsHistoryDisclaimer]").attr("title", decodeURIComponent(a.value["trillian.history.disclaimer.text"]));
    $("#x_domainPolicySettingsHistoryDisclaimerEdit").attr("title", decodeURIComponent(a.value["trillian.history.disclaimer.text"]));
    "off" != a.value["trillian.filetransfer"] ? $("#x_domainPolicySettingsFiletransfer").attr("checked", "checked") : $("#x_domainPolicySettingsFiletransfer").removeAttr("checked");
    "1" == a.value["trillian.groupchat.create.impp"] ? $("#x_domainPolicySettingsGroupChatCreate").attr("checked", "checked") : $("#x_domainPolicySettingsGroupChatCreate").removeAttr("checked");
    "1" == a.value["trillian.groupchat.join.impp"] ? $("#x_domainPolicySettingsGroupChatJoin").attr("checked", "checked") : $("#x_domainPolicySettingsGroupChatJoin").removeAttr("checked");
    "off" != a.value["trillian.media"] ? $("#x_domainPolicySettingsMedia").attr("checked", "checked") : $("#x_domainPolicySettingsMedia").removeAttr("checked");
    "1" == a.value["trillian.mail"] ? $("#x_domainPolicySettingsMail").attr("checked", "checked") : $("#x_domainPolicySettingsMail").removeAttr("checked");
    "1" == a.value["trillian.autoupdate"] ? $("#x_domainPolicySettingsAutoupdate").attr("checked", "checked") : $("#x_domainPolicySettingsAutoupdate").removeAttr("checked");
    "1" == a.value["trillian.voice"] ? $("#x_domainPolicySettingsVoice").attr("checked", "checked") : $("#x_domainPolicySettingsVoice").removeAttr("checked");
    "1" == a.value["trillian.settings.plugins"] ? $("#x_domainPolicySettingsSettingsPlugins").attr("checked", "checked") : $("#x_domainPolicySettingsSettingsPlugins").removeAttr("checked");
    "1" == a.value["trillian.settings.skins"] ? $("#x_domainPolicySettingsSettingsSkins").attr("checked", "checked") : $("#x_domainPolicySettingsSettingsSkins").removeAttr("checked");
    "1" == a.value["trillian.settings.status"] ? $("#x_domainPolicySettingsSettingsStatus").attr("checked", "checked") : $("#x_domainPolicySettingsSettingsStatus").removeAttr("checked");
    showModal("#x_domainPolicySettingsModal")
});
$("#x_domainPolicySettingsHelp").click(function() {
    addStatisticEvent("policy_settings_help");
    showModalHelper("#x_domainPolicySettingsModal", "#x_domainPolicySettingsHelp")
});
$("#x_domainPolicySettingsSet").click(function() {
    addStatisticEvent("policy_settings_set");
    var a = g_domain.getPolicy(g_domainSelectedPolicy);
    a.value["trillian.history.cloud"] = $("#x_domainPolicySettingsHistoryCloud").attr("checked") ? "1" : "0";
    a.value["trillian.history.disclaimer"] = $("#x_domainPolicySettingsHistoryDisclaimer").attr("checked") ? "1" : "0";
    a.value["trillian.filetransfer"] = $("#x_domainPolicySettingsFiletransfer").attr("checked") ? "p2p" : "off";
    a.value["trillian.groupchat.create.impp"] = $("#x_domainPolicySettingsGroupChatCreate").attr("checked") ? "1" : "0";
    a.value["trillian.groupchat.join.impp"] = $("#x_domainPolicySettingsGroupChatJoin").attr("checked") ? "1" : "0";
    a.value["trillian.media"] = $("#x_domainPolicySettingsMedia").attr("checked") ? "server" : "off";
    a.value["trillian.mail"] = $("#x_domainPolicySettingsMail").attr("checked") ? "1" : "0";
    a.value["trillian.autoupdate"] = $("#x_domainPolicySettingsAutoupdate").attr("checked") ? "1" : "0";
    a.value["trillian.voice"] = $("#x_domainPolicySettingsVoice").attr("checked") ? "1" : "0";
    a.value["trillian.settings.plugins"] = $("#x_domainPolicySettingsSettingsPlugins").attr("checked") ? "1" : "0";
    a.value["trillian.settings.skins"] = $("#x_domainPolicySettingsSettingsSkins").attr("checked") ? "1" : "0";
    a.value["trillian.settings.status"] = $("#x_domainPolicySettingsSettingsStatus").attr("checked") ? "1" : "0";
    a.update();
    domainSelectPolicy(g_domainSelectedPolicy);
    hideModal("#x_domainPolicySettingsModal")
});
$("#x_domainPolicySettingsCancel").click(function() {
    addStatisticEvent("policy_settings_cancel");
    hideModal("#x_domainPolicySettingsModal")
});
function domainPolicyInitialGroupChatsFillList() {
    for (var a = g_domain.getPolicy(g_domainSelectedPolicy), b = "", c = a.value["trillian.groupchat.bind.impp"].split(","), d = 0; d < c.length; d++) {
        var e = c[d].trim()
          , f = g_domain.getGroupChat(e);
        if (f)
            var g = htmlEncode(f.topic)
              , f = htmlEncode(f.displaynameComputed)
              , b = b + ("<tr><td groupchat='" + e + "' title='" + f + " " + g + "'>" + f + " <span class='topic'>" + g + "</span><span groupchat='" + e + "' class='button helpbutton'>Remove</span></td></tr>")
    }
    b = 0 == b.length ? b + "<div class='noresults'>No associated group chats for this policy.</div>" : "<tr><th>ASSOCIATED GROUP CHATS</th></tr>" + b;
    $("#x_domainPolicyGroupchatInitial").html(b);
    $("#x_domainPolicyGroupchatInitial .button").click(function() {
        addStatisticEvent("policy_groupchat_initial_remove");
        var b = $(this).attr("groupchat");
        a.removeInitialGroupChat(b);
        domainSelectPolicy(g_domainSelectedPolicy);
        domainPolicyInitialGroupChatsFillList()
    })
}
$("#x_domainPolicyInitialGroupChatsChange").click(function() {
    addStatisticEvent("policy_groupchat_initial");
    domainPolicyInitialGroupChatsFillList();
    showModal("#x_domainPolicyInitialGroupChatsModal")
});
$("#x_domainPolicyInitialGroupChatsHelp").click(function() {
    addStatisticEvent("policy_groupchat_initial_help");
    showModalHelper("#x_domainPolicyInitialGroupChatsModal", "#x_domainPolicyInitialGroupChatsHelp")
});
$("#x_domainPolicyInitialGroupChatsClose").click(function() {
    addStatisticEvent("policy_groupchat_initial_close");
    hideModal("#x_domainPolicyInitialGroupChatsModal")
});
$("#x_domainSelectedPolicyInitialGroupChatsAdd").click(function() {
    addStatisticEvent("policy_groupchat_initial_add");
    updateSelectedPolicyGroupListModal();
    replaceModal("#x_domainPolicyInitialGroupChatsModal", "#x_adminGroupChatSelectModal")
});
$("#x_adminGroupChatSelectModalCancel").click(function() {
    addStatisticEvent("policy_groupchat_initial_add_cancel");
    replaceModal("#x_adminGroupChatSelectModal", "#x_domainPolicyInitialGroupChatsModal")
});
$("#x_domainPolicyNameEdit").click(function() {
    addStatisticEvent("policy_name_edit");
    var a = g_domain.getPolicy(g_domainSelectedPolicy);
    $("#adminTextEditModal .header").html("<h4>Edit Policy Name</h4>");
    $("#adminTextEditModal .body .label").text("Name");
    $("#adminTextEditModal .body .value input").val(a.name);
    g_textEditSet = function() {
        var b = $("#adminTextEditModal .body .value input").val();
        a.setName(b);
        $("#x_domainPolicyName").text(a.name);
        $("#x_domainPolicySelected").text(a.name);
        $("#x_domainSelectedPolicyHeader").text(a.name);
        domainFillPolicyList();
        hideModal("#adminTextEditModal")
    }
    ;
    showModal("#adminTextEditModal");
    $("#adminTextEditModal .body .value input").focus()
});
$("#x_domainPolicySettingsHistoryDisclaimerEdit").click(function() {
    addStatisticEvent("policy_disclaimer_edit");
    var a = g_domain.getPolicy(g_domainSelectedPolicy);
    $("#adminTextAreaModal .header").html("<h4>Edit Disclaimer Text</h4>");
    $("#adminTextAreaModal .body .value textarea").val(decodeURIComponent(a.value["trillian.history.disclaimer.text"]));
    g_textAreaSet = function() {
        var b = $("#adminTextAreaModal .body .value textarea").val();
        0 < b.length && (a.value["trillian.history.disclaimer.text"] = encodeURIComponent(b),
        a.update(),
        domainSelectPolicy(g_domainSelectedPolicy));
        hideModal("#adminTextAreaModal")
    }
    ;
    replaceModal("#x_domainPolicySettingsModal", "#adminTextAreaModal");
    $("#adminTextEditModal .body .value textarea").focus()
});
$("#x_domainPolicyAdd").click(function() {
    addStatisticEvent("policy_add");
    $("#adminPolicyName").removeClass("error");
    $("#adminPolicyName").val("");
    showModal("#adminPolicyNew");
    $("#adminPolicyName").focus()
});
$("#adminPolicyCreate").click(function() {
    addStatisticEvent("policy_add_set");
    var a = $("#adminPolicyName").val();
    0 == a.length ? $("#adminPolicyName").addClass("error") : (g_domain.addPolicy(a, function() {
        g_domain.requestPolicies(function() {
            domainFillPolicyList()
        })
    }),
    hideModal("#adminPolicyNew"))
});
$("#adminPolicyCancel").click(function() {
    addStatisticEvent("policy_add_set_cancel");
    hideModal("#adminPolicyNew")
});
$("#x_domainPolicyUserCountView").click(function() {
    addStatisticEvent("policy_users");
    var a = g_domain.getPolicy(g_domainSelectedPolicy);
    $("#adminTextShowModal .header").html("<h4>Users of Policy &quot;" + a.name + "&quot;</h4>");
    for (var b = "<table><tr><th>NAME</th><th>USERNAME</th></tr>", c = 0; c < a.users.length; c++) {
        var d = a.users[c];
        d.deleted || (b += "<tr class='user' username='" + htmlEncode(d.username) + "'><td class='name' title='" + htmlEncode(d.fullname) + "'>" + htmlEncode(d.fullname) + "</td><td class='username'>" + htmlEncode(d.username) + "</td></tr>")
    }
    b += "</table>";
    $("#adminTextShowModal .body").html(b);
    showModal("#adminTextShowModal")
});
$("#x_domainPolicyListHelp").click(function() {
    addStatisticEvent("policy_help");
    showModal("#x_domainPolicyListHelpModal")
});
$("#x_domainPolicyListHelpCancel").click(function() {
    addStatisticEvent("policy_help_cancel");
    hideModal("#x_domainPolicyListHelpModal")
});
function domainShowHistoryForUser(a) {
    $("#x_historyConversationList").parent().hide();
    $("#historyTimeline").parent().show();
    $("#historyDate").parent().show();
    $("#historyToday").hide();
    $("#historyDate").hide();
    $("#historyTimeline").html("<span class='empty'><img src='img/spinner.gif'></span>");
    g_domainSelectedHistoryUsername = a;
    var b = g_domain.getUser(a);
    $("#x_historyTitle").text("Conversations for " + b.fullname);
    b.history = new History;
    b.history.request(a, !1, function() {
        if (a == g_domainSelectedHistoryUsername) {
            for (var c = "<table>", d = 0, e = [], f = 0; f < b.history.conversations.length; f++) {
                var g = b.history.conversations[f]
                  , h = g.name
                  , k = g.name;
                if ("astra" == g.medium) {
                    var l = g_domain.getUser(h);
                    l && (h = l.fullname,
                    k = l.sortBy)
                }
                g.displayname = h;
                g.sortBy = k
            }
            b.history.conversations.sort(function(a, b) {
                return a.sortBy.localeCompare(b.sortBy)
            });
            for (f = 0; f < b.history.conversations.length; f++) {
                g = b.history.conversations[f];
                h = g.displayname;
                k = b.username;
                if (g.group) {
                    if (k = g_domain.getGroupChat(g.name))
                        h = k.displaynameComputed;
                    k = g.name
                }
                var l = g.weeks[0]
                  , m = g.weeks[g.weeks.length - 1]
                  , l = (new Date(l.year,0,7 * l.week,0,0,0,0)).toLocaleMonthString()
                  , m = (new Date(m.year,0,7 * m.week,0,0,0,0)).toLocaleMonthString()
                  , p = l;
                l != m && (p = l + " - " + m);
                h = "<tr class='click conversation' conversation_request='" + htmlEncode(k) + "' conversation_id='" + g.id + "' conversation_name='" + htmlEncode(h) + "' conversation_medium='" + g.medium + "'><td class='name' title='" + htmlEncode(g.name) + "'>" + htmlEncode(h) + "</td><td class='duration'>" + p + "</td></tr>";
                k = g.medium + "_" + g.group;
                l = null;
                for (m = 0; m < e.length; m++)
                    if (e[m].title == k) {
                        l = e[m];
                        break
                    }
                l || (l = {},
                l.title = k,
                l.html = g.group ? "<tr><th colspan=2>GROUP CHATS ON " + mediumDisplay(g.medium).toUpperCase() + "</th></tr>" : "<tr><th colspan=2>" + htmlEncode(g.account).toUpperCase() + " ON " + mediumDisplay(g.medium).toUpperCase() + "</th></tr>",
                e.push(l));
                l.html += h;
                d++
            }
            for (f = 0; f < e.length; f++)
                c += e[f].html;
            c = 0 == d ? "No conversations found." : c + "</table>";
            $("#x_historyConversationList").html(c);
            $("#x_historyConversationList .conversation").click(function() {
                $("#x_historyTitle").html(htmlEncode($(this).attr("conversation_name") + " on " + mediumDisplay($(this).attr("conversation_medium"))));
                $("#historyTimeline").parent().show();
                $("#historyDate").parent().show();
                $("#x_historyConversationList").parent().hide();
                domainShowHistory(b.history, $(this).attr("conversation_request"), $(this).attr("conversation_id"));
                showModal("#historyModal")
            });
            $("#historyTimeline").parent().hide();
            $("#historyDate").parent().hide();
            $("#x_historyConversationList").parent().show();
            resize()
        }
    });
    showModal("#historyModal")
}
function domainShowHistoryForGroupChat(a) {
    g_domainSelectedConversationName = a;
    $("#x_historyConversationList").parent().hide();
    $("#historyTimeline").parent().show();
    $("#historyDate").parent().show();
    $("#historyToday").hide();
    $("#historyDate").hide();
    $("#historyTimeline").html("<span class='empty'><img src='img/spinner.gif'></span>");
    var b = g_domain.getGroupChat(a);
    $("#x_historyTitle").text(b.displaynameComputed + " on " + mediumDisplay("ASTRA"));
    b.history = new History;
    b.history.request(b.name, !0, function() {
        b.name == g_domainSelectedConversationName && (0 < b.history.conversations.length ? domainShowHistory(b.history, b.name, b.history.conversations[0].id) : ($("#historyTimeline").html("<span class='empty'>No history found for " + htmlEncode(b.displaynameComputed) + ".</span>"),
        $("#historyToday").hide(),
        $("#historyDate").hide()))
    });
    showModal("#historyModal")
}
function domainShowHistory(a, b, c) {
    g_domainSelectedConversationID = c;
    g_domainSelectedConversationName = b;
    g_domainSelectedHistory = a;
    $("#x_historyConversationList").parent().hide();
    $("#historyTimeline").parent().show();
    $("#historyDate").parent().show();
    $("#historyDate").show();
    $("#historyDate").datepicker({
        prevText: "&#9664;",
        nextText: "&#9654;",
        beforeShowDay: function(a) {
            a = new Date(a);
            var b = new Date(a.getFullYear(),a.getMonth(),a.getDate() + 1);
            a = a.getTime();
            for (var b = b.getTime(), c = !1, d = g_domainSelectedHistory.historyForConversation(g_domainSelectedConversationID), k = 0; k < d.length; k++) {
                var l = d[k];
                if (l.timestamp >= a && l.timestamp <= b) {
                    c = !0;
                    break
                }
            }
            return c ? [!0, "conversations", ""] : [!0, "", ""]
        },
        onSelect: function(a, b) {
            domainShowHistoryDay(g_domainSelectedConversationID, a);
            var c = new Date
              , d = new Date(a);
            c.getFullYear() == d.getFullYear() && c.getMonth() == d.getMonth() && c.getDate() == d.getDate() ? $("#historyToday").hide() : $("#historyToday").fadeIn()
        },
        onChangeMonthYear: function(a, b, c) {
            var d = g_domainSelectedConversationName;
            g_domainSelectedHistory.requestHistory(g_domainSelectedConversationName, g_domainSelectedConversationID, b, a, function() {
                if (d.toLowerCase() == g_domainSelectedConversationName.toLowerCase()) {
                    $("#historyDate").datepicker("refresh");
                    var a = $("#historyDate").datepicker("getDate");
                    domainShowHistoryDay(g_domainSelectedConversationID, a)
                }
            })
        }
    });
    $("#historyDate").datepicker("setDate", "today");
    var d = g_domainSelectedConversationName;
    a = new Date;
    g_domainSelectedHistory.requestHistory(g_domainSelectedConversationName, g_domainSelectedConversationID, a.getMonth() + 1, a.getFullYear(), function() {
        if (d.toLowerCase() == g_domainSelectedConversationName.toLowerCase()) {
            $("#historyDate").datepicker("refresh");
            var a = $("#historyDate").datepicker("getDate");
            domainShowHistoryDay(g_domainSelectedConversationID, a)
        }
    });
    domainShowHistoryDay(g_domainSelectedConversationID, a);
    $("#historyToday").hide();
    showModal("#historyModal")
}
function domainShowHistoryDay(a, b) {
    var c = new Date(b)
      , d = new Date(c.getFullYear(),c.getMonth(),c.getDate() + 1)
      , c = c.getTime()
      , d = d.getTime()
      , e = 0
      , f = "";
    $("#historyTimeline").children().remove();
    var g = g_domainSelectedHistory.getConversation(a)
      , h = {}
      , k = g.account
      , l = g.name;
    if ("ASTRA" == g.medium.toUpperCase()) {
        if (g.account) {
            var m = g_domain.getUser(g.account);
            m && (k = m.fullname)
        }
        var p = g_domain.getUser(l);
        p && (l = p.fullname)
    }
    for (var p = g_domainSelectedHistory.historyForConversation(a), n = 0; n < p.length; n++) {
        var q = p[n];
        if (q.timestamp >= c && q.timestamp <= d) {
            var r = q.remote
              , t = q.remote
              , u = "incoming";
            g.group ? (u = "incoming",
            r = t = q.from,
            g_domainSelectedUser && g_domainSelectedUser == t ? u = "outgoing" : g_domainSelectedUser || g_username != t || (u = "outgoing"),
            h[t] || (m = g_domain.getUser(t),
            h[t] = m ? m.fullname : t),
            t = h[t]) : q.type && -1 != q.type.indexOf("outgoing") ? (u = "outgoing",
            t = k) : t = l;
            m = !1;
            f != r + u && (f = r + u,
            m = !0);
            var r = ui_parseMessage(q.text, !1)
              , x = new Date;
            x.setTime(q.timestamp);
            q = x.toLocaleTimeString();
            m = m ? "" : " style='visibility:hidden;'";
            $("#historyTimeline").append("<div class='message " + u + "'><div class='time'" + m + ">" + q + "</div><div class='name'" + m + ">" + t + "</div><div class='text'>" + r + "</div></div>");
            e++
        }
    }
    0 == e && (g_historyPending ? $("#historyTimeline").append("<span class='empty'>Loading messages for " + (new Date(b)).toLocaleDateString() + "...</span>") : $("#historyTimeline").append("<span class='empty'>No messages found on " + (new Date(b)).toLocaleDateString() + ".</span>"));
    $(".modal_right").scrollTop(0)
}
;var g_invoice = null
  , g_showSavings = !0
  , g_failedInvoices = null
  , g_domainBillingType = null
  , g_cardNeedsUpdate = !1;
function domainFillSchedule() {
    g_cardNeedsUpdate = !1;
    $("#x_domainPlanPaymentLoading").hide();
    if (0 != g_domain.scheduleAmount && 0 != g_domain.scheduleDate) {
        $("#x_domainPlanPayment").show();
        $("#x_domainPlanPaymentUsers").text(g_domain.licensesTotal + " users");
        $("#x_domainPlanPaymentAmount").text("$" + g_domain.scheduleAmount);
        var a = " (Expires: " + g_domain.scheduleMonth + "/" + g_domain.scheduleYear + ")";
        2020 == g_domain.scheduleYear && (a = "");
        var b = g_domain.scheduleMethod;
        "skipjack" == g_domain.scheduleMethod.toLowerCase() ? (g_cardNeedsUpdate = !0,
        b = "Credit Card (Needs to be updated)") : "stripe" == g_domain.scheduleMethod.toLowerCase() && (b = "Credit Card" + a);
        $("#x_domainPlanPaymentMethod").text(b);
        a = (new Date(1E3 * g_domain.scheduleDate)).toLocaleShortDateString();
        $("#x_domainPlanPaymentDate").text(a);
        $("#x_domainPlanPaymentBilling").text("yearly" == g_domain.scheduleFrequency ? "Yearly" : "Monthly");
        $("[tab=domain_billing]").hasClass("active") && g_cardNeedsUpdate && invoiceUpdateWarning()
    } else
        g_domain.trial ? ($("#x_domainPlanPaymentTrial").show(),
        $("#x_domainPlanPaymentTrialExpiration").text(g_domain.trialExpires.toLocaleShortDateString())) : $("#x_domainPlanPaymentNone").show()
}
function fillInvoiceList(a, b) {
    g_failedInvoices = null;
    var c = 0
      , d = "<table>"
      , e = "<tr><th>TRANSACTIONS</th><th>METHOD</th><th>DATE</th><th>STATUS</th><th>AMOUNT</th></tr>"
      , f = b.slice(0);
    f.sort(function(a, b) {
        return b.date - a.date
    });
    for (var g = 0; g < f.length; g++) {
        var h = f[g];
        if (0 != h.paid || 0 != h.due) {
            var k = h.payment_method;
            switch (k) {
            case "STRIPE":
                k = "Credit Card";
                break;
            case "SKIPJACK":
                k = "Credit Card";
                break;
            case "PAYPAL":
                k = "PayPal";
                break;
            case "ECHECK":
                k = "E-Check";
                break;
            case "CHECK":
                k = "Check";
                break;
            case "TRIALPAY":
                k = "TrialPay";
                break;
            case "ADJUSTMENT":
                k = "Adjustment";
                break;
            case "ITUNES":
                k = "App Store";
                break;
            case "ANDROIDMARKET":
                k = "Google Play"
            }
            var l = !1
              , m = h.payment_status;
            switch (m) {
            case "COMPLETED":
                m = "Paid";
                l = !0;
                break;
            case "REFUNDED":
                m = "Refunded";
                l = !0;
                break;
            case "PENDING":
                m = "Pending";
                break;
            case "SUBMITTED":
                m = "Incomplete";
                l = !0;
                break;
            case "NOT SUBMITTED":
                m = "Not Submitted";
                break;
            case "ERROR":
                m = "Error";
                break;
            case "DECLINED":
                m = "Declined"
            }
            0 != h.due && void 0 != h.due && (k = "",
            m = "Past Due",
            l = !0,
            g_failedInvoices ? g_failedInvoices.push(h) : g_failedInvoices = Array(h));
            var p = "class='";
            "Paid" == m && (p += "click invoice ");
            "Past Due" == m && (p += "click past_due ");
            p += "'";
            l && (l = (new Date(1E3 * h.date)).toLocaleShortDateString(),
            e += "<tr " + p + " status='" + m + "' invoice='" + h.mask + "' price='" + h.total + "' date='" + l + "'><td>" + h.mask + "</td><td>" + k + "</td><td>" + l + "</td><td>" + m + "</td><td>$" + h.total + "</td></tr>",
            c++)
        }
    }
    0 == c ? d = "<span class='noresults'>No billing history found.</span>" : (0 != c && (d += e),
    d += "</table>");
    a.html(d);
    a.find(".invoice").click(function() {
        "Paid" == $(this).attr("status") && window.open("https://www.trillian.im/buy/receipts.php?p=" + $(this).attr("invoice"), "_blank")
    });
    a.find(".past_due").click(function() {
        domainSelectBilling("invoice", $(this).attr("invoice"), "$" + $(this).attr("price"), $(this).attr("price"), $(this).attr("date"), $(this).attr("date"))
    });
    g_failedInvoices ? ($("#x_domainPlanPaymentMethodChange").show(),
    $("#x_domainPlanPaymentUsersChange").hide()) : ($("#x_domainPlanPaymentMethodChange").show(),
    $("#x_domainPlanPaymentUsersChange").show());
    $("[tab=domain_billing]").hasClass("active") && invoiceUpdateWarning()
}
function invoiceUpdateWarning() {
    g_failedInvoices ? domainWarning("Please update your credit card information as some payments have failed to process.") : g_cardNeedsUpdate ? domainWarning("The credit card on file needs to be updated.") : domainWarning(null)
}
function domainResetPayment() {
    $("#x_domainPlanPaymentLoading").show();
    $("#x_domainPlanPayment").hide();
    $("#x_domainPlanPaymentNone").hide();
    $("#x_domainPlanPaymentTrial").hide();
    $("#x_domainPlanPaymentUsersChange").hide();
    $("#x_domainPlanPaymentMethodChange").hide();
    $("#x_domainPlanPaymentUsers").text("");
    $("#x_domainPlanPaymentAmount").text("");
    $("#x_domainPlanPaymentMethod").text("");
    $("#x_domainPlanPaymentDate").text("");
    $("#x_domainPlanPaymentBilling").text("");
    $("#x_domainPlanPaymentTrialExpiration").text("");
    $("#x_domainBillingList").html("<img src='img/spinner.gif'>")
}
function cardTypeIncomplete(a) {
    a = a.replace(/ /g, "");
    return a.match(/^4[0-9]+/g) ? "visa" : a.match(/^5[1-5]+/g) ? "mastercard" : a.match(/^3[47]+/g) ? "amex" : a.match(/^3(?:0[0-5]|[68][0-9])+/g) ? "diners" : a.match(/^6(?:011|5[0-9]{2})+/g) ? "discover" : a.match(/^(?:2131|1800|35\d{3})+/g) ? "jcb" : null
}
$(".numbers").keypress(function(a) {
    if (48 <= a.which && 57 >= a.which)
        return 0;
    32 <= a.which && 126 >= a.which && a.preventDefault()
});
$("#x_domainBillingUsers").change(function() {
    updateBillingInvoice()
});
$("#x_domainBillingBilled").change(function() {
    updateBillingInvoice()
});
$("#x_domainBillingTax").change(function() {
    updateBillingInvoice()
});
$("#x_domainBillingCancel").click(function(a) {
    hideModal("#x_billingModal")
});
$("#x_domainBillingPurchase").click(function(a) {
    resetBillingInvoiceErrors();
    a = $("#x_domainBillingUsers").val();
    if ("user" == g_domainBillingType || "trial" == g_domainBillingType) {
        var b = g_domain.licensesTotal - g_domain.licensesAvailable;
        if (b > a)
            return addEvent("chat", "domainBilling_user_count"),
            $("#x_domainBillingUsers").addClass("error"),
            $("#x_domainBillingUsers").focus(),
            $("#x_domainBillingErrorMessage").html("Please increase your users or disable some users as this plan will not fit your current setup.  You currently have <b>" + b + "</b> active users.").show(),
            0
    }
    if ("user" == g_domainBillingType && a == g_domain.licensesTotal)
        return addEvent("chat", "domainBilling_user_count_match"),
        $("#x_domainBillingUsers").addClass("error"),
        $("#x_domainBillingUsers").focus(),
        $("#x_domainBillingErrorMessage").text("Nothing to do as the user count matches your existing user count.").show(),
        0;
    if (0 == $("#x_domainBillingName").val().length)
        return addEvent("chat", "domainBilling_name_length"),
        $("#x_domainBillingName").addClass("error"),
        $("#x_domainBillingName").focus(),
        0;
    if (0 == $("#x_domainBillingCredit").val().length || null == cardTypeIncomplete($("#x_domainBillingCredit").val()))
        return 0 == $("#x_domainBillingCredit").val().length ? addEvent("chat", "domainBilling_credit_length") : addEvent("chat", "domainBilling_credit_invalid"),
        $("#x_domainBillingCredit").addClass("error"),
        $("#x_domainBillingCredit").focus(),
        0 != $("#x_domainBillingCredit").val().length && $("#x_domainBillingErrorMessage").text("Invalid credit card number.").show(),
        0;
    var b = (new Date).getFullYear() - 2E3
      , c = (new Date).getMonth() + 1
      , d = $("#x_domainBillingMonth").val()
      , e = $("#x_domainBillingYear").val();
    if (null == d || 0 == d.length || 12 < d)
        return addEvent("chat", "domainBilling_payment_month_invalid"),
        $("#x_domainBillingMonth").addClass("error"),
        $("#x_domainBillingMonth").focus(),
        12 < d && $("#x_domainBillingErrorMessage").text("Invalid month.").show(),
        0;
    if (null == e || 0 == e.length)
        return addEvent("chat", "domainBilling_payment_year_invalid"),
        $("#x_domainBillingYear").addClass("error"),
        $("#x_domainBillingYear").focus(),
        0;
    if (d < c && e == b || e < b)
        return addEvent("chat", "domainBilling_payment_credit_expired"),
        $("#x_domainBillingMonth").addClass("error"),
        $("#x_domainBillingYear").addClass("error"),
        $("#x_domainBillingMonth").focus(),
        $("#x_domainBillingErrorMessage").text("Expired card.").show(),
        0;
    if (3 > $("#x_domainBillingCSC").val().length)
        return addEvent("chat", "domainBilling_payment_credit_csc_length"),
        $("#x_domainBillingCSC").addClass("error"),
        $("#x_domainBillingCSC").focus(),
        $("#x_domainBillingErrorMessage").html("Invalid <a href='http://en.wikipedia.org/wiki/Card_security_code' onclick=\"addEvent('download','outbound_csc_error'); return true;\" target='_blank'>CSC</a>.").show(),
        0;
    b = "year" == $("#x_domainBillingBilled").val() ? 1 : 0;
    c = $("#x_domainBillingTax").is(":checked") ? 1 : 0;
    domainBillingEnable(!1);
    "trial" == g_domainBillingType ? domainPurchaseTrial(a, b, $("#x_domainBillingName").val(), $("#x_domainBillingCredit").val(), $("#x_domainBillingMonth").val(), $("#x_domainBillingYear").val(), $("#x_domainBillingCSC").val(), c) : "method" == g_domainBillingType ? domainPurchaseUpdate(g_failedInvoices, $("#x_domainBillingInitialPrice").attr("price"), $("#x_domainBillingName").val(), $("#x_domainBillingCredit").val(), $("#x_domainBillingMonth").val(), $("#x_domainBillingYear").val(), $("#x_domainBillingCSC").val()) : "user" == g_domainBillingType ? domainPurchaseUsers(a, $("#x_domainBillingInitialPrice").attr("price"), $("#x_domainBillingName").val(), $("#x_domainBillingCredit").val(), $("#x_domainBillingMonth").val(), $("#x_domainBillingYear").val(), $("#x_domainBillingCSC").val(), c) : "invoice" == g_domainBillingType && domainPurchaseInvoice($("#x_domainBillingInvoice").val(), $("#x_domainBillingInitialPrice").attr("price"), $("#x_domainBillingName").val(), $("#x_domainBillingCredit").val(), $("#x_domainBillingMonth").val(), $("#x_domainBillingYear").val(), $("#x_domainBillingCSC").val())
});
function domainBillingEnable(a) {
    a ? ($("#x_domainBillingUsers").removeAttr("disabled"),
    $("#x_domainBillingBilled").removeAttr("disabled"),
    $("#x_domainBillingTax").removeAttr("disabled"),
    $("#x_domainBillingName").removeAttr("disabled"),
    $("#x_domainBillingCredit").removeAttr("disabled"),
    $("#x_domainBillingMonth").removeAttr("disabled"),
    $("#x_domainBillingYear").removeAttr("disabled"),
    $("#x_domainBillingCSC").removeAttr("disabled"),
    $("#x_domainBillingPurchase").removeClass("disabled"),
    $("#x_domainBillingPurchase").html("Purchase&nbsp;&nbsp;" + g_lockSVG)) : ($("#x_domainBillingUsers").attr("disabled", "disabled"),
    $("#x_domainBillingBilled").attr("disabled", "disabled"),
    $("#x_domainBillingTax").attr("disabled", "disabled"),
    $("#x_domainBillingName").attr("disabled", "disabled"),
    $("#x_domainBillingCredit").attr("disabled", "disabled"),
    $("#x_domainBillingMonth").attr("disabled", "disabled"),
    $("#x_domainBillingYear").attr("disabled", "disabled"),
    $("#x_domainBillingCSC").attr("disabled", "disabled"),
    $("#x_domainBillingPurchase").addClass("disabled"),
    $("#x_domainBillingPurchase").text("Purchasing..."))
}
function updateBillingInvoice() {
    if ("method" == g_domainBillingType) {
        if (g_failedInvoices) {
            $("#x_domainBillingInitialPriceDiv").show();
            for (var a = 1 == g_failedInvoices.length ? "Invoice" : "Invoices", b = g_failedInvoices.length + " Past Due " + a + "\n", c = 0, d = 0; d < g_failedInvoices.length; d++)
                var e = g_failedInvoices[d]
                  , c = c + parseInt(e.total)
                  , f = (new Date(1E3 * e.date)).toLocaleShortDateString()
                  , b = b + (f + " (" + e.mask + "): $" + e.total + "\n");
            $("#x_domainBillingInitialPrice").attr("price", c);
            $("#x_domainBillingInitialPrice").attr("title", b);
            $("#x_domainBillingInitialPrice").val("$" + c.toFixed(2) + " (" + g_failedInvoices.length + " Past Due " + a + ")")
        }
    } else {
        c = $("#x_domainBillingUsers").val();
        a = "year" == $("#x_domainBillingBilled").val() ? 1 : 0;
        e = $("#x_domainBillingTax").is(":checked");
        f = 2;
        a && (f *= .9);
        b = 0;
        if (null == c) {
            for (var g = g_domain.licensesTotal - g_domain.licensesAvailable, h = !1, c = 1E3, d = 10; 100 > d; d += 10)
                if (g < d)
                    if (c = d,
                    "user" != g_domainBillingType || h)
                        break;
                    else
                        h = !0;
            if (1E3 == c)
                for (d = 100; 500 > d; d += 50)
                    if (g < d)
                        if (c = d,
                        "user" != g_domainBillingType || h)
                            break;
                        else
                            h = !0;
            if (1E3 == c)
                for (d = 500; 1E3 >= d; d += 100)
                    if (g < d)
                        if (c = d,
                        "user" != g_domainBillingType || h)
                            break;
                        else
                            h = !0
        }
        $("#x_domainBillingUsers").text("");
        g = "";
        for (d = 5; 100 > d; d += 5)
            if (0 == d % 10 || 5 == d || 15 == d || 25 == d) {
                h = parseFloat(f * d) + parseFloat(f * d) * (6.35 * (e ? 1 : 0) / 100);
                a && (h *= 12);
                h = parseFloat(h).toFixed(2);
                0 == parseFloat(h).toFixed(2) - parseFloat(h).toFixed(0) && (h = parseFloat(h).toFixed(0));
                var k = d == c ? " selected" : ""
                  , g = g + ("<option value='" + d + "'" + k + ">" + d + " Users</option>")
                  , k = "";
                a && g_showSavings && (k = h / .9 - h,
                k = parseFloat(k).toFixed(2),
                0 == parseFloat(k).toFixed(2) - parseFloat(k).toFixed(0) && (k = parseFloat(k).toFixed(0)),
                k = " ($" + k + " savings!)");
                d == c && ($("#x_domainBillingPrice").val("$" + h + " / " + (a ? "Year" : "Month") + k),
                b = h)
            }
        for (d = 100; 500 > d; d += 5)
            if (0 == d % 10 || 155 == d || 165 == d)
                h = parseFloat(f * d) + parseFloat(f * d) * (6.35 * (e ? 1 : 0) / 100),
                a && (h *= 12),
                h = parseFloat(h).toFixed(2),
                0 == parseFloat(h).toFixed(2) - parseFloat(h).toFixed(0) && (h = parseFloat(h).toFixed(0)),
                k = d == c ? " selected" : "",
                g += "<option value='" + d + "'" + k + ">" + d + " Users</option>",
                k = "",
                a && g_showSavings && (k = h / .9 - h,
                k = parseFloat(k).toFixed(2),
                0 == parseFloat(k).toFixed(2) - parseFloat(k).toFixed(0) && (k = parseFloat(k).toFixed(0)),
                k = " ($" + k + " savings!)"),
                d == c && ($("#x_domainBillingPrice").val("$" + h + " / " + (a ? "Year" : "Month") + k),
                b = h);
        for (d = 500; 1E3 >= d; d += 100)
            h = parseFloat(f * d) + parseFloat(f * d) * (6.35 * (e ? 1 : 0) / 100),
            a && (h *= 12),
            h = parseFloat(h).toFixed(2),
            0 == parseFloat(h).toFixed(2) - parseFloat(h).toFixed(0) && (h = parseFloat(h).toFixed(0)),
            k = d == c ? " selected" : "",
            g += "<option value='" + d + "'" + k + ">" + d + " Users</option>",
            k = "",
            a && g_showSavings && (k = h / .9 - h,
            k = parseFloat(k).toFixed(2),
            0 == parseFloat(k).toFixed(2) - parseFloat(k).toFixed(0) && (k = parseFloat(k).toFixed(0)),
            k = " ($" + k + " savings!)"),
            d == c && ($("#x_domainBillingPrice").val("$" + h + " / " + (a ? "Year" : "Month") + k),
            b = h);
        $("#x_domainBillingUsers").html(g);
        d = new Date(parseInt($("#x_domainBillingDate").attr("time")));
        d = dateSubtract(new Date, d);
        0 > d ? ($("#x_domainBillingInitialPrice").attr("price", b),
        $("#x_domainBillingInitialPrice").val("$" + b)) : (c = $("#x_domainBillingPrice").attr("price"),
        b -= c,
        0 >= b ? ($("#x_domainBillingInitialPrice").attr("price", "0"),
        $("#x_domainBillingInitialPrice").val("$0")) : (c = 365,
        a || (c = 30),
        a = b * Math.min(1, d / c),
        d = " (prorated for " + d + " day" + (1 == d ? "" : "s") + ")",
        $("#x_domainBillingInitialPrice").attr("price", a.toFixed(2)),
        $("#x_domainBillingInitialPrice").val("$" + a.toFixed(2) + d)))
    }
}
function resetBillingInvoice() {
    $("#x_domainBillingCSC").val("");
    $("#x_domainBillingYear").val("");
    $("#x_domainBillingMonth").val("");
    $("#x_domainBillingCredit").val("");
    $("#x_domainBillingName").val("");
    resetBillingInvoiceErrors()
}
function resetBillingInvoiceErrors() {
    $("#x_domainBillingErrorMessage").text("").hide();
    $("#x_domainBillingCSC").removeClass("error");
    $("#x_domainBillingYear").removeClass("error");
    $("#x_domainBillingMonth").removeClass("error");
    $("#x_domainBillingCredit").removeClass("error");
    $("#x_domainBillingName").removeClass("error");
    $("#x_domainBillingUsers").removeClass("error")
}
function domainPurchaseError(a) {
    switch (a) {
    case "invalid_cn":
    case "invalid_card_number":
        $("#x_domainBillingErrorMessage").text("Invalid credit card number.").show();
        $("#x_domainBillingCredit").addClass("error");
        $("#x_domainBillingCredit").focus();
        break;
    case "invalid_bn":
    case "invalid_card_name":
        $("#x_domainBillingErrorMessage").text("Invalid name.").show();
        $("#x_domainBillingName").addClass("error");
        $("#x_domainBillingName").focus();
        break;
    case "invalid_cv":
    case "invalid_card_code":
        $("#x_domainBillingErrorMessage").html("Invalid <a href='http://en.wikipedia.org/wiki/Card_security_code' onclick=\"addEvent('chat','outbound_csc_error'); return true;\" target='_blank'>CSC</a>.").show();
        $("#x_domainBillingCSC").addClass("error");
        $("#x_domainBillingCSC").focus();
        break;
    case "invalid_cy":
    case "invalid_card_year":
        $("#x_domainBillingErrorMessage").text("Invalid year.").show();
        $("#x_domainBillingYear").addClass("error");
        $("#x_domainBillingYear").focus();
        break;
    case "invalid_cm":
    case "invalid_card_month":
        $("#x_domainBillingErrorMessage").text("Invalid month.").show();
        $("#x_domainBillingMonth").addClass("error");
        $("#x_domainBillingMonth").focus();
        break;
    case "declined":
        $("#x_domainBillingErrorMessage").text("Your card has been declined.").show();
        $("#x_domainBillingCredit").addClass("error");
        $("#x_domainBillingCredit").focus();
        break;
    default:
        $("#x_domainBillingErrorMessage").text("Error during purchase.  Please try again.").show()
    }
}
function domainPurchaseUpdate(a, b, c, d, e, f, g) {
    d = d.replace(/ /g, "");
    c = "card_name=" + encodeURIComponent(c) + "&card_number=" + d + "&card_month=" + e + "&card_year=" + f + "&card_code=" + g + "&update_schedule=1";
    if (a && 0 < b) {
        e = null;
        for (f = 0; f < a.length; f++)
            e = e ? e + ("," + encodeURIComponent(a[f].mask)) : encodeURIComponent(a[f].mask);
        c += "&invoices=" + e + "&initial_payment=" + b
    }
    $.ajax({
        url: "/api/domain/0.1/index.php/cc",
        type: "POST",
        data: c,
        dataType: "xml",
        success: function(a) {
            a = $(a).find("response").text();
            "success" == a ? (addEvent("chat", "domainBillingUpdate_success", g_username),
            purchaseSuccess(null, !0, null)) : (addEvent("chat", "domainBillingUpdate_" + a, g_username),
            domainPurchaseError(a));
            domainBillingEnable(!0)
        },
        error: function(a, b, c) {
            addEvent("chat", "domainBillingUpdate_connectionError", g_username);
            $("#x_domainBillingErrorMessage").text("Please check your connection").show();
            domainBillingEnable(!0)
        }
    })
}
function domainPurchaseInvoice(a, b, c, d, e, f, g) {
    d = d.replace(/ /g, "");
    c = encodeURIComponent(c);
    e = "invoices=" + encodeURIComponent(a) + "&initial_payment=" + b + "&card_name=" + c + "&card_number=" + d + "&card_month=" + e + "&card_year=" + f + "&card_code=" + g + "&updated_schedule=0";
    $.ajax({
        url: "/api/domain/0.1/index.php/cc",
        type: "POST",
        data: e,
        dataType: "xml",
        success: function(c) {
            c = $(c).find("response").text();
            "success" == c ? (addEvent("chat", "domainBillingInvoice_success", g_username),
            purchaseSuccess("$" + b, !0, a)) : (addEvent("chat", "domainBillingInvoice_" + c, g_username),
            domainPurchaseError(c));
            domainBillingEnable(!0)
        },
        error: function(a, b, c) {
            addEvent("chat", "domainBillingInvoice_connectionError", g_username);
            $("#x_domainBillingErrorMessage").text("Please check your connection").show();
            domainBillingEnable(!0)
        }
    })
}
function domainPurchaseUsers(a, b, c, d, e, f, g, h) {
    d = d.replace(/ /g, "");
    c = encodeURIComponent(c);
    $.ajax({
        url: "/api/domain/0.1/index.php/cc",
        type: "POST",
        data: "user_count=" + a + "&initial_payment=" + b + "&card_name=" + c + "&card_number=" + d + "&card_month=" + e + "&card_year=" + f + "&card_code=" + g + "&connecticut=" + h + "&update_schedule=1",
        dataType: "xml",
        success: function(a) {
            a = $(a).find("response").text();
            "success" == a ? (addEvent("chat", "domainBillingUsers_success", g_username),
            purchaseSuccess(null, !1, null)) : (addEvent("chat", "domainBillingUsers_" + a, g_username),
            domainPurchaseError(a));
            domainBillingEnable(!0)
        },
        error: function(a, b, c) {
            addEvent("chat", "domainBillingUsers_connectionError", g_username);
            $("#x_domainBillingErrorMessage").text("Please check your connection").show();
            domainBillingEnable(!0)
        }
    })
}
function domainPurchaseTrial(a, b, c, d, e, f, g, h) {
    d = d.replace(/ /g, "");
    var k = "CLOUDMONTH";
    b && (k = "CLOUDYEAR");
    k = encodeURIComponent(k);
    b = encodeURIComponent(c);
    $.ajax({
        url: "/api/domain/0.1/index.php/cc",
        type: "POST",
        data: "user_count=" + a + "&card_name=" + b + "&card_number=" + d + "&card_month=" + e + "&card_year=" + f + "&card_code=" + g + "&product_code=" + k + "&connecticut=" + h,
        dataType: "xml",
        success: function(a) {
            var b = $(a).find("response").text();
            "success" == b ? (addEvent("chat", "domainBilling_success", g_username),
            b = $(a).find("response").attr("price"),
            a = $(a).find("response").attr("invoice"),
            purchaseSuccess("$" + b + " / " + ("CLOUDYEAR" == k ? "year" : "month"), !1, a)) : (addEvent("chat", "domainBilling_" + b, g_username),
            domainPurchaseError(b));
            domainBillingEnable(!0)
        },
        error: function(a, b, c) {
            addEvent("chat", "domainBilling_connectionError", g_username);
            $("#x_domainBillingErrorMessage").text("Please check your connection").show();
            domainBillingEnable(!0)
        }
    })
}
$("#purchaseInvoice").click(function() {
    window.open("https://www.trillian.im/buy/receipts.php?p=" + g_invoice, "_blank")
});
$("#purchaseClose").click(function() {
    hideModal("#purchaseThankyouModal")
});
function purchaseSuccess(a, b, c) {
    hideModal("#x_billingModal");
    g_invoice = c;
    domainResetPayment();
    g_domain.request(function() {
        domainUpdate();
        g_domain.requestSchedule(function() {
            domainFillSchedule()
        });
        g_domain.requestBilling(function() {
            fillInvoiceList($("#x_domainBillingList"), g_domain.invoices)
        })
    });
    c ? ($("#x_purchasePrice").html("of <b>" + a + "</b>"),
    $("#purchaseInvoice").show()) : ($("#x_purchasePrice").html(""),
    $("#purchaseInvoice").hide());
    showModal("#purchaseThankyouModal")
}
function domainSelectBilling(a, b, c, d, e, f, g) {
    resetBillingInvoice();
    $("#x_domainBillingHelp").hide();
    g_domainBillingType = a;
    "trial" == a ? ($("#x_domainBillingUsersDiv").show(),
    $("#x_domainBillingBilledDiv").show(),
    $("#x_domainBillingInvoiceDiv").hide(),
    $("#x_domainBillingInvoiceDateDiv").hide(),
    $("#x_domainBillingDateDiv").hide(),
    $("#x_domainBillingPriceDiv").show(),
    $("#x_domainBillingPrice").attr("price", d),
    $("#x_domainBillingInitialPriceDiv").hide(),
    $("#x_domainBillingTaxDiv").show(),
    $("#x_domainBillingHeader").text("Purchase Trillian for Business"),
    $("#x_domainBillingSelected").text("Upgrade"),
    g_showSavings = !0,
    updateBillingInvoice()) : "method" == a ? ($("#x_domainBillingUsersDiv").hide(),
    $("#x_domainBillingBilledDiv").hide(),
    $("#x_domainBillingInvoiceDiv").hide(),
    $("#x_domainBillingInvoiceDateDiv").hide(),
    $("#x_domainBillingDateDiv").show(),
    $("#x_domainBillingPriceDiv").show(),
    $("#x_domainBillingPrice").attr("price", d),
    $("#x_domainBillingInitialPriceDiv").hide(),
    $("#x_domainBillingTaxDiv").hide(),
    $("#x_domainBillingHeader").text("Change Credit Card"),
    $("#x_domainBillingBilled").val(g),
    $("#x_domainBillingDate").val(e),
    $("#x_domainBillingDate").attr("time", f),
    $("#x_domainBillingPrice").val(c),
    g_showSavings = !1,
    updateBillingInvoice()) : "invoice" == a ? ($("#x_domainBillingUsersDiv").hide(),
    $("#x_domainBillingBilledDiv").hide(),
    $("#x_domainBillingInvoiceDiv").show(),
    $("#x_domainBillingInvoiceDateDiv").show(),
    $("#x_domainBillingDateDiv").hide(),
    $("#x_domainBillingInitialPriceDiv").show(),
    $("#x_domainBillingInitialPrice").attr("price", d),
    $("#x_domainBillingPriceDiv").hide(),
    $("#x_domainBillingTaxDiv").hide(),
    $("#x_domainBillingHeader").text("Pay Invoice"),
    $("#x_domainBillingInvoice").val(b),
    $("#x_domainBillingInvoiceDate").val(e),
    $("#x_domainBillingSelected").text(b),
    $("#x_domainBillingInitialPrice").val(c)) : "user" == a && ($("#x_domainBillingUsersDiv").show(),
    $("#x_domainBillingBilledDiv").hide(),
    $("#x_domainBillingInvoiceDiv").hide(),
    $("#x_domainBillingInvoiceDateDiv").hide(),
    $("#x_domainBillingDateDiv").show(),
    $("#x_domainBillingPriceDiv").show(),
    $("#x_domainBillingPrice").attr("price", d),
    $("#x_domainBillingInitialPriceDiv").show(),
    $("#x_domainBillingTaxDiv").show(),
    $("#x_domainBillingHeader").text("Change User Count"),
    $("#x_domainBillingBilled").val(g),
    $("#x_domainBillingDate").val(e),
    $("#x_domainBillingDate").attr("time", f));
    showModal("#x_billingModal")
}
$("#x_domainUsersChange").click(function() {
    $("[tab=domain_billing]").addClass("active").siblings("div[tab]").removeClass("active");
    $("[page=domain_billing]").show().siblings(".page").hide();
    selectTab("domain_billing")
});
$("#x_domainPlanPaymentUsersChange").click(function() {
    var a = (new Date(1E3 * g_domain.scheduleDate)).toLocaleShortDateString();
    domainSelectBilling("user", null, "$" + g_domain.scheduleAmount + " / " + ("yearly" == g_domain.scheduleFrequency ? "Year" : "Month"), g_domain.scheduleAmount, a, 1E3 * g_domain.scheduleDate, "yearly" == g_domain.scheduleFrequency ? "year" : "month");
    g_showSavings = !1;
    updateBillingInvoice()
});
$("#x_domainPlanPaymentMethodChange").click(function() {
    var a = (new Date(1E3 * g_domain.scheduleDate)).toLocaleShortDateString();
    domainSelectBilling("method", null, "$" + g_domain.scheduleAmount + " / " + ("yearly" == g_domain.scheduleFrequency ? "Year" : "Month"), g_domain.scheduleAmount, a, 1E3 * g_domain.scheduleDate, "yearly" == g_domain.scheduleFrequency ? "year" : "month")
});
$("#x_domainBillingHelp").click(function() {
    $(".olark_available").is(":visible") ? (addEvent("chat", "domainBilling_helpOlark", g_username),
    g_olarkHidden = !1,
    olark("api.box.expand")) : (addEvent("chat", "domainBilling_helpWeb", g_username),
    window.open("/contact/", "_blank"))
});
function getURLParameter(a) {
    a = decodeURIComponent((RegExp(a + "=(.+?)(&|$)").exec(location.search) || [, null])[1]);
    return "null" == a ? null : a
}
function processParameters() {
    var a = getURLParameter("type");
    if ("email_confirmation" == a) {
        var b = getURLParameter("au")
          , c = getURLParameter("ch");
        $("#x_loginUsername").val(b);
        $("#x_loginPassword").focus();
        var d = new User;
        d.confirmEmail(b, c, function(a) {
            a ? $("#x_loginStatus").text("The email address for " + b + " has been successfully confirmed.").show() : $("#x_loginStatus").text("Unable to confirm the email address for " + b + ".").show()
        });
        return !1
    }
    if ("domain_create" == a) {
        var b = getURLParameter("customer")
          , c = getURLParameter("challenge")
          , e = getURLParameter("company");
        b && 0 < b.length && c && 0 < c.length && e && 0 < e.length && ($("#x_domainCreateUsername").val(b),
        showModal("#x_domainCreateModal"),
        $("#x_domainCreateName").focus(),
        $("#x_domainCreateStart").click(function() {
            if ($(this).hasClass("disabled"))
                return !1;
            $("#x_domainCreateModal .warning").text("");
            $("#x_domainCreateModal .warning").hide();
            $("#x_domainCreateName").removeClass("error");
            $("#x_domainCreatePassword").removeClass("error");
            $("#x_domainCreatePasswordConfirm").removeClass("error");
            if (0 == $("#x_domainCreateName").val().length)
                return addEvent("chat", "domainCreate_nameLengthZero"),
                $("#x_domainCreateName").addClass("error"),
                $("#x_domainCreateName").focus(),
                !1;
            if (-1 == $("#x_domainCreateName").val().indexOf(" "))
                return addEvent("chat", "domainCreate_nameLengthSpace"),
                $("#x_domainCreateName").addClass("error"),
                $("#x_domainCreateName").focus(),
                $("#x_domainCreateModal .warning").text("Please enter first and last name.").show(),
                !1;
            if (8 > $("#x_domainCreatePassword").val().length || 64 < $("#x_domainCreatePassword").val().length)
                return addEvent("chat", "domainCreate_passwordLength"),
                $("#x_domainCreatePassword").addClass("error"),
                $("#x_domainCreatePassword").focus(),
                $("#x_domainCreateModal .warning").text("Your new password must be 8-64 characters.").show(),
                !1;
            if ($("#x_domainCreatePassword").val() != $("#x_domainCreatePasswordConfirm").val())
                return addEvent("chat", "domainCreate_passwordMatch"),
                $("#x_domainCreatePasswordConfirm").addClass("error"),
                $("#x_domainCreatePasswordConfirm").focus(),
                $("#x_domainCreateModal .warning").text("The two passwords do not match.").show(),
                !1;
            if (!$("#x_domainCreateAgreement").attr("checked"))
                return addEvent("chat", "domainCreate_checkbox"),
                $("#x_domainCreateAgreement").addClass("error"),
                $("#x_domainCreateModal .warning").text("You must agree to the Terms of Service.").show(),
                !1;
            $("#x_domainCreateName").attr("disabled", "disabled");
            $("#x_domainCreatePassword").attr("disabled", "disabled");
            $("#x_domainCreatePasswordConfirm").attr("disabled", "disabled");
            $("#x_domainCreateAgreement").attr("disabled", "disabled");
            $("#x_domainCreateStart").addClass("disabled");
            $("#x_domainCreateCancel").addClass("disabled");
            (new Domain).domainCreate(b, $("#x_domainCreateName").val(), $("#x_domainCreatePassword").val(), e, c, function(a, c) {
                $("#x_domainCreateName").removeAttr("disabled");
                $("#x_domainCreatePassword").removeAttr("disabled");
                $("#x_domainCreatePasswordConfirm").removeAttr("disabled");
                $("#x_domainCreateAgreement").removeAttr("disabled");
                $("#x_domainCreateStart").removeClass("disabled");
                $("#x_domainCreateCancel").removeClass("disabled");
                a ? (window.history && history && history.pushState && history.pushState(null, null, window.location.pathname),
                $("#x_loginUsername").val(b),
                $("#x_loginPassword").val($("#x_domainCreatePassword").val()),
                hideModal("#x_domainCreateModal"),
                login()) : "domain_exists_but_valid" == c ? ($("#x_loginUsername").val(b),
                $("#x_loginPassword").val($("#x_domainCreatePassword").val()),
                hideModal("#x_domainCreateModal"),
                login()) : "domain_exists" == c ? $("#x_domainCreateModal .warning").html("Domain has already been registered.  Please <a href='/contact/' target='_blank'>contact us</a> if you need assistance.").show() : $("#x_domainCreateModal .warning").html("Error during domain creation.  Please <a href='/contact/' target='_blank'>contact us</a> if you need assistance.").show()
            })
        }),
        $("#x_domainCreateCancel").click(function() {
            if ($(this).hasClass("disabled"))
                return !1;
            window.location = window.location.protocol + "//" + window.location.hostname + window.location.pathname;
            hideModal("#x_domainCreateModal")
        }));
        return !1
    }
    if ("domain_welcome" == a) {
        var b = getURLParameter("au")
          , f = getURLParameter("ae")
          , c = getURLParameter("ac");
        b && 0 < b.length && c && 0 < c.length && ($("#x_domainWelcomeUsername").val(b),
        showModal("#x_domainWelcomeModal"),
        $("#x_domainWelcomeName").focus(),
        $("#x_domainWelcomeCreate").click(function() {
            if ($(this).hasClass("disabled"))
                return !1;
            $("#x_domainWelcomeModal .warning").text("");
            $("#x_domainWelcomeModal .warning").hide();
            $("#x_domainWelcomeName").removeClass("error");
            $("#x_domainWelcomePassword").removeClass("error");
            $("#x_domainWelcomePasswordConfirm").removeClass("error");
            if (0 == $("#x_domainWelcomeName").val().length)
                return addEvent("chat", "domainWelcome_nameLengthZero"),
                $("#x_domainWelcomeName").addClass("error"),
                $("#x_domainWelcomeName").focus(),
                !1;
            if (-1 == $("#x_domainWelcomeName").val().indexOf(" "))
                return addEvent("chat", "domainWelcome_nameLengthSpace"),
                $("#x_domainWelcomeName").addClass("error"),
                $("#x_domainWelcomeName").focus(),
                $("#x_domainWelcomeModal .warning").text("Please enter first and last name.").show(),
                !1;
            if (8 > $("#x_domainWelcomePassword").val().length || 64 < $("#x_domainWelcomePassword").val().length)
                return addEvent("chat", "domainWelcome_passwordLength"),
                $("#x_domainWelcomePassword").addClass("error"),
                $("#x_domainWelcomePassword").focus(),
                $("#x_domainWelcomeModal .warning").text("Your new password must be 8-64 characters.").show(),
                !1;
            if ($("#x_domainWelcomePassword").val() != $("#x_domainWelcomePasswordConfirm").val())
                return addEvent("chat", "domainWelcome_passwordMatch"),
                $("#x_domainWelcomePasswordConfirm").addClass("error"),
                $("#x_domainWelcomePasswordConfirm").focus(),
                $("#x_domainWelcomeModal .warning").text("The two passwords do not match.").show(),
                !1;
            if (!$("#x_domainWelcomeAgreement").attr("checked"))
                return addEvent("chat", "domainWelcome_checkbox"),
                $("#x_domainWelcomeAgreement").addClass("error"),
                $("#x_domainWelcomeModal .warning").text("You must agree to the Terms of Service.").show(),
                !1;
            $("#x_domainWelcomeName").attr("disabled", "disabled");
            $("#x_domainWelcomePassword").attr("disabled", "disabled");
            $("#x_domainWelcomePasswordConfirm").attr("disabled", "disabled");
            $("#x_domainWelcomeAgreement").attr("disabled", "disabled");
            $("#x_domainWelcomeCreate").addClass("disabled");
            $("#x_domainWelcomeCancel").addClass("disabled");
            (new Domain).userSetup(b, f, $("#x_domainWelcomeName").val(), $("#x_domainWelcomePassword").val(), c, function(a, c) {
                $("#x_domainWelcomeName").removeAttr("disabled");
                $("#x_domainWelcomePassword").removeAttr("disabled");
                $("#x_domainWelcomePasswordConfirm").removeAttr("disabled");
                $("#x_domainWelcomeAgreement").removeAttr("disabled");
                $("#x_domainWelcomeCreate").removeClass("disabled");
                $("#x_domainWelcomeCancel").removeClass("disabled");
                a ? (window.history && history && history.pushState && history.pushState(null, null, window.location.pathname),
                $("#x_loginUsername").val(b),
                $("#x_loginPassword").val($("#x_domainWelcomePassword").val()),
                hideModal("#x_domainWelcomeModal"),
                login()) : $("#x_domainWelcomeModal .warning").text("Error during user creation.  Please re-request an invitation from your domain administrator.").show()
            })
        }),
        $("#x_domainWelcomeCancel").click(function() {
            if ($(this).hasClass("disabled"))
                return !1;
            window.location = window.location.protocol + "//" + window.location.hostname + window.location.pathname;
            hideModal("#x_domainWelcomeModal")
        }));
        return !1
    }
    if ("reset" == a && (b = getURLParameter("au"),
    c = getURLParameter("ac"),
    f = getURLParameter("ae"),
    b && 0 < b.length && c && 0 < c.length && f && 0 < f.length))
        return $("#x_resetPasswordUsername").val(b),
        showModal("#x_resetPasswordModal"),
        $("#x_resetPasswordPassword").focus(),
        $("#x_resetPasswordReset").click(function() {
            if ($(this).hasClass("disabled"))
                return !1;
            $("#x_resetPasswordModal .warning").text("");
            $("#x_resetPasswordModal .warning").hide();
            $("#x_resetPasswordPassword").removeClass("error");
            $("#x_resetPasswordPasswordRepeat").removeClass("error");
            $("#x_resetPasswordAgreement").removeClass("error");
            if (8 > $("#x_resetPasswordPassword").val().length || 64 < $("#x_resetPasswordPassword").val().length)
                return addEvent("chat", "passwordChange_passwordLength"),
                $("#x_resetPasswordPassword").addClass("error"),
                $("#x_resetPasswordPassword").focus(),
                $("#x_resetPasswordModal .warning").text("Your new password must be 8-64 characters.").show(),
                !1;
            if ($("#x_resetPasswordPassword").val() != $("#x_resetPasswordPasswordRepeat").val())
                return addEvent("chat", "passwordChange_passwordMatch"),
                $("#x_resetPasswordPasswordRepeat").addClass("error"),
                $("#x_resetPasswordPasswordRepeat").focus(),
                $("#x_resetPasswordModal .warning").text("The two passwords do not match.").show(),
                !1;
            if (!$("#x_resetPasswordAgreement").attr("checked"))
                return addEvent("chat", "passwordChange_checkbox"),
                $("#x_resetPasswordAgreement").addClass("error"),
                $("#x_resetPasswordModal .warning").text("Upon password reset, you must re-add your third-party IM accounts into Trillian.  Please acknowlege this fact.").show(),
                !1;
            $("#x_resetPasswordReset").addClass("disabled");
            $("#x_resetPasswordCancel").addClass("disabled");
            $("#x_resetPasswordPassword").attr("disabled", "disabled");
            $("#x_resetPasswordPasswordRepeat").attr("disabled", "disabled");
            $("#x_resetPasswordAgreement").attr("disabled", "disabled");
            (new User).resetPassword(b, c, f, $("#x_resetPasswordPassword").val(), function(a) {
                a ? (alert("Password successfully changed."),
                window.location = window.location.protocol + "//" + window.location.hostname + window.location.pathname + "?au=" + b) : ($("#x_resetPasswordModal .warning").text("Error during password reset.  Reset links expire, so make sure your link is current.").show(),
                $("#x_resetPasswordReset").removeClass("disabled"),
                $("#x_resetPasswordCancel").removeClass("disabled"),
                $("#x_resetPasswordPassword").removeAttr("disabled"),
                $("#x_resetPasswordPasswordRepeat").removeAttr("disabled"),
                $("#x_resetPasswordAgreement").removeAttr("disabled"))
            })
        }),
        $("#x_resetPasswordCancel").click(function() {
            if ($(this).hasClass("disabled"))
                return !1;
            window.location = window.location.protocol + "//" + window.location.hostname + window.location.pathname;
            hideModal("#x_resetPasswordModal")
        }),
        !1;
    if ((b = getURLParameter("au")) && 0 < b.length) {
        $("#x_loginUsername").val(b);
        $("#x_loginPassword").focus();
        try {
            var g = $.cookie("trillian_username");
            g && 0 < g.length && b != g && (g_pendingSignout = !0,
            d = new User,
            d.signout())
        } catch (h) {}
    }
    if (window.location)
        switch (window.location.hash.substring(1)) {
        case "password":
            $("#x_forgotPasswordButton").click();
            break;
        case "username":
            $("#x_forgotUsernameButton").click()
        }
}
;function ImageHistory() {
    this.nextImageID = this.nextImageLoad = 0;
    this.loading = !1
}
ImageHistory.prototype.requestImages = function(a, b, c) {
    var d = this
      , e = this.nextImageLoad;
    this.loading = !0;
    0 == e ? (c.hide(),
    c.click(function() {
        d.loading || d.requestImages(a, b, c)
    })) : c.text("Loading...");
    $.ajax({
        type: "POST",
        url: "/api/user/0.1/index.php/S3/list",
        data: {
            start: e,
            limit: 12
        },
        dataType: "json",
        success: function(f) {
            addEvent("chat", "imageRequest_" + e);
            b.hide();
            if (!f && 0 == d.nextImageLoad)
                return a.append("<span class='noresults'>No images found.</span>"),
                0;
            d.nextImageLoad += 12;
            if (f && f.img)
                for (i in f.img) {
                    var g = "https://s3.amazonaws.com/ft.trillian.im/" + f.img[i]
                      , h = "image_" + d.nextImageID++;
                    a.append("<span class='media' id='" + h + "' server_id='" + f.img[i] + "'><a href='http://ft.trillian.im/" + f.img[i] + "' target='_blank'><img src='" + g + "' border='0'></a><div class='delete'>&times;</div><span>");
                    $("#" + h + " .delete").click(function() {
                        var a = $(this).parent();
                        a.animate({
                            opacity: .1
                        });
                        $(this).remove();
                        $.ajax({
                            type: "POST",
                            url: "/api/user/0.1/index.php/S3/delete",
                            data: {
                                image: a.attr("server_id")
                            },
                            dataType: "json",
                            success: function(b) {
                                b.failure ? (a.animate({
                                    opacity: 1
                                }),
                                addEvent("chat", "imageDelete_failure")) : addEvent("chat", "imageDelete_success")
                            },
                            error: function(b, c, d) {
                                addEvent("chat", "imageDelete_error");
                                a.animate({
                                    opacity: 1
                                })
                            }
                        })
                    })
                }
            f && f.more ? (c.text("Load more images"),
            c.show()) : c.hide();
            d.loading = !1
        },
        error: function(b, c, e) {
            addEvent("chat", "imageRequest_error");
            a.append("Error when loading images.");
            d.loading = !1
        }
    })
}
;
var g_mediaStream = null
  , g_mediaRecorder = null
  , g_mediaRecorderBlob = null;
function audioAvailable() {
    return !1
}
$("#x_stopRecording").click(function() {
    g_controller.messageWindow(g_messageIdFocus) && g_mediaRecorder && (g_mediaRecorder.stop(),
    g_mediaStream.stop())
});
$(".audio_button").click(function() {
    var a = g_controller.messageWindow(g_messageIdFocus);
    a && (g_mediaRecorder && (g_mediaStream.stop(),
    g_mediaRecorder.stop(),
    g_mediaStream = g_mediaAnalyser = g_mediaRecorder = null),
    navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia,
    navigator.getUserMedia({
        audio: !0
    }, function(b) {
        $(".edit_recording").show();
        $(".editbox").hide();
        g_mediaStream = b;
        g_mediaRecorder = new MediaRecorder(b);
        g_mediaRecorder.mimeType = "audio/ogg";
        g_mediaRecorder.ondataavailable = function(b) {
            $(".edit_recording").hide();
            attachFile(a, b.data);
            g_mediaStream = g_mediaAnalyser = g_mediaRecorderBlob = g_mediaRecorder = null
        }
        ;
        g_mediaRecorder.start();
        var c = new AudioContext;
        b = c.createMediaStreamSource(b);
        g_mediaAnalyser = c.createAnalyser();
        b.connect(g_mediaAnalyser);
        g_mediaAnalyser.fftSize = 2048;
        recordingDraw()
    }, function(a) {
        g_mediaRecorder = null
    }))
});
function recordingDraw() {
    if (g_mediaStream) {
        var a = $("#x_recordingCanvas")[0].getContext("2d");
        requestAnimationFrame(recordingDraw);
        var b = g_mediaAnalyser.fftSize
          , c = new Uint8Array(b);
        g_mediaAnalyser.getByteTimeDomainData(c);
        a.fillStyle = "#0080e0";
        a.fillRect(0, 0, 300, 36);
        a.lineWidth = 2;
        a.strokeStyle = "#FFFFFF";
        a.beginPath();
        for (var d = 300 / b, e = 0, f = 0; f < b; f++) {
            var g = c[f] / 128 * 36 / 2;
            0 === f ? a.moveTo(e, g) : a.lineTo(e, g);
            e += d
        }
        a.lineTo(300, 18);
        a.stroke();
        a = Math.floor(g_mediaAnalyser.context.currentTime / 60);
        b = Math.floor(g_mediaAnalyser.context.currentTime % 60);
        10 > b && (b = "0" + b);
        $("#x_recordingTime").text(a + ":" + b)
    }
}
;
