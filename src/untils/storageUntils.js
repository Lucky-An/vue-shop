import UUID from 'uuidjs'

export function getUUID() {
    let uuid = localStorage.getItem("UUID_KEY")
    if (!uuid) {
        uuid = UUID.generate()
        localStorage.setItem("UUID_KEY", uuid)
    }
    return uuid
}