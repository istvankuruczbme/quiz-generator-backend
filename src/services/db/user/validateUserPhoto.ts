export default function validateUserPhoto(photoUrl: unknown): void {
	if (photoUrl == undefined) throw new Error("user/photo-url-missing");
	if (typeof photoUrl !== "string") throw new Error("user/invalid-photo-url");
}
