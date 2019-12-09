export function setTimer() {
    setInterval(function () {
        var now = new Date();
        const offsetMs = now.getTimezoneOffset() * 60 * 1000;
        const dateLocal = new Date(now.getTime() - offsetMs);
        var str = dateLocal.toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " ");
        console.log(str);
    }, 60000);
}