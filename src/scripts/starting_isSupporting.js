export function isStartingStyleSupported() {
    const style = document.createElement('style');
    document.head.appendChild(style);

    try {
        style.sheet.insertRule('@starting-style { body { color: red; } }', 0);
        return true;
    } catch (e) {
        return false;
    } finally {
        document.head.removeChild(style);
    }
}
